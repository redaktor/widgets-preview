import { GridUnit, GridColor } from './interfaces';
import { hex2rgb, bestTextColor } from '../../framework/color';
const _COLOR: {keys: any[], defaults: GridColor[], length: number} = { /* TODO TS*/
  keys: [
    'red','deep_orange','orange','amber','yellow','lime',
    'light_green','green','teal','cyan', 'light','light_blue',
    'blue_grey','blue','indigo','deep_purple','purple','pink','brown'
  ],
  defaults: [],
  length: 0
}
_COLOR.defaults = _COLOR.keys.map((key) => {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(`--r-${key}`);
  const rgb = hex2rgb(hex);
  const rgba = `rgba(${rgb.join(',')},64%)`;
  const text = bestTextColor(rgb);
  return { key, text, hex, rgba, style: `--r-hex: ${hex}; --r-rgba: ${rgba}; --r-text: ${text};` }
});
_COLOR.length = _COLOR.defaults.length;
export const COLOR = _COLOR;

export function createArr(direction: number, arr: any[] = []) {
  for (let i = 1; i <= direction; i++) {
    arr.push({ unit: '1fr' });
  }
  return arr
}

export function _groupedUnits(templateUnitArray = [{ unit: '1fr' }]) {
  const templateArray = templateUnitArray.map(i => i.unit);
  const groups = [[templateArray.shift()]];
  for (const templateUnit of templateArray) {
    const lastGroup = groups[groups.length - 1];
    (lastGroup.indexOf(templateUnit) !== -1) ?
      lastGroup.push(templateUnit) :
      groups.push([templateUnit]);
  }
  return groups;
};
export function createRepetition(groups: any[][], maxRepetition = 1) {
  return groups.map(g =>
    g.length === maxRepetition ? g.join(' ') : `repeat(${g.length}, ${g[0]})`)
    .join(' ');
}
export function groupedUnits(u: GridUnit[]) {
  return createRepetition(_groupedUnits(u))
}

export function parseRepetition(s: string) {
  let length = 1;
  return s.split(/[)]? /).reduce((a: string[], u) => {
    const rep = /repeat[(](\d.*) ?,/.exec(u);
    // console.log(u,rep)
    if (length > 1) {
      a = a.concat(Array.apply(null, {length}).map(() => u))
    }
    length = (!!rep && rep.length === 2) ? parseInt(rep[1], 10) : 1;
    length === 1 && a.push(u);
    return a
  }, [])
}
