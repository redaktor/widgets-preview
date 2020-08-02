import { InputEvent, GridAxis, Direction, SettingsChange } from './interfaces';
import { createArr } from './util';
import { v, w, DNode, ThemedBase, theme } from '../common/Widget';
import TextInput from '../../widgets/text-input';
import * as css from './styles/gridmaker.m.css';
import * as uiCss from '../themes/redaktor-default/_ui.m.css';

export interface GridmakerSettingsProperties {
  label: string;
  comment: string;
  row: GridAxis;
  col: GridAxis;
  onChange?: (type: SettingsChange, value: GridAxis|string) => any;
}

@theme(css)
export default class GridmakerSettings<P extends GridmakerSettingsProperties = GridmakerSettingsProperties>
extends ThemedBase<P> {
  private _onChange(type: SettingsChange) {
    const { onChange } = this.properties;
    onChange && onChange(type, this.properties[type]);
    this.invalidate();
  }
  protected axisCountFn(type: Direction) {
    const p = this.properties;
    return (e: InputEvent) => {
      const count = e.target.valueAsNumber;
      if (count === p[type].count) { return }
      if (count < p[type].units.length) {
        const removeI = p[type].units.length - count;
        p[type].units.splice((removeI * -1), removeI)
      } else {
        const addI = count - p[type].units.length;
        p[type].units = p[type].units.concat(createArr(addI))
      }
      p[type].count = count;
      this._onChange(type)
    }
  }
  protected axisGapFn(type: Direction) {
    return (e: InputEvent) => {
      const gap = e.target.valueAsNumber;
      if (gap === this.properties[type].gap) { return }
      this.properties[type].gap = gap;
      this._onChange(type);
      // TODO - UGLY HACK, Safari has an issue w. (row-gap / column-gap) repaint :
      (<any>document).querySelector(`.${css.grid}`).style.webkitTransform = 'scale(1)';
    }
  }

  protected render(): DNode {
    const c = [
      ['row', 'count', 'Rows '], ['row', 'gap', 'Row Gap'],
      ['col','count','Columns'], ['col', 'gap', 'Column Gap']
    ].map((a: [Direction, 'count'|'gap', string]) => {
      const labelO = a.length < 3 ? {} : { label: a[2], labelStatic: true };
      const isCount = a[1] === 'count';
      return w(TextInput, {
        type: 'number',
        min: isCount ? 2 : 0,
        max: 128,
        key: `${a[0]}${a[1]}`,
        value: this.properties[a[0]][a[1]],
        ...labelO,
        responsive: false,
        onChange: isCount ? this.axisCountFn(a[0]) : this.axisGapFn(a[0])
      })
    });

    return v('section', {
      key: 'settingsSection',
      classes: [uiCss.flexRow, css.settingsSection],
    }, [
      v('div', { style:'flex:1;' }, [
        w(TextInput, {
          key: 'gridName',
          responsive: false,
          label: 'Name',
          onInput: (e: InputEvent) => {
            const { onChange } = this.properties;
            onChange && onChange('label', e.target.value);
            this.invalidate();
          },
          value: this.properties.label
        })
      ]),
      v('div', { style:'flex:0;', classes: [uiCss.flexRow, css.settingsInput] }, c)
    ]);
  }
}
