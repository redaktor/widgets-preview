/** based on https://github.com/sdras/cssgridgenerator */
import { GridChildArea, Direction } from './interfaces';
import { groupedUnits } from './util';
import { GlobalEvent } from '../global-event/index';
import { v, w, DNode, theme, customElement } from '../common/Widget';
import { materialClass } from '../common/util';
import TextInput from '../inputText';
import GridmakerBase, { GridmakerProperties } from './base';
import Settings from './settings';
import Edit from './edit';
import * as css from './styles/gridmaker.m.css';
/* TODO
validate/coerce css class names
---
main form :
reset button, save button, load (split properties + child-state)
---
if grid gets smaller recheck areas and evt. delete obsolete w. warning
---
schema primary/secondary or dark/light
*/

@theme(css)
@customElement<GridmakerProperties>({
	tag: 'redaktor-Gridmaker',
	properties: [ 'theme', 'material', 'extraClasses' ],
	events: [ 'onResize' ]
})
export default class Gridmaker extends GridmakerBase<GridmakerProperties> {
  get styles() {
    const [row, col] = [this.row.units, this.col.units].map(groupedUnits);
    return {
      row: `grid-template-rows: ${row};`,
      col: `grid-template-columns: ${col};`,
      gap: `grid-column-gap: ${this.col.gap}px; grid-row-gap: ${this.row.gap}px;`
    }
  }
  protected render(): DNode {
    const { row, col, styles } = this;
    const schema = this.color.key || 'secondary';

    return v('div', {
      style: this.getColorStyle(),
      classes: [ ...this.theme([css.root]), materialClass(this.properties.material) ],
      key: 'root'
    }, [
      // SETTINGS Section
      w(Settings, {
        key: 'settingsSection', row, col,
        onChange: (t: Direction, v: any) => { this[t] = v; this.invalidate() },
        onLoad: () => {
          const parentCSS = Object.keys(styles).reduce((s, k) =>
            `${s} ${(<any>styles)[k]}`, '.parent { display: grid; ') + ' }';
          const childrenCSS = this.areas.reduce((s, o) => {
            // TODO vComment etc.
            const vColor = `--r-color: "${o.color.key}";`;
            const gridArea = `grid-area: ${o.gridArea.join(' / ')};`;
            return `${s} .${o.label} { ${vColor} ${gridArea} } `
          }, '');

          console.log(parentCSS); console.log(childrenCSS);

        }
      }),
      // GRID
      // Column and Row Units
      this.colRowUnits('col'),
      this.colRowUnits('row'),

      // Grid Container
      v('div', { key: 'gridContainer', classes: [ css.gridContainer ] }, [
        v('section', {
          key: 'grid',
          classes: [ css.grid ],
          style: `${styles.col} ${styles.row} ${styles.gap}`
          /* TODO
          @touchstart.prevent='delegatedTouchPlaceChild'
          @touchend.prevent='delegatedTouchPlaceChild'
          */
        }, this.boxes()),
        v('section', {
          key: 'gridChildren',
          classes: [ css.grid, css.gridChild ],
          style: `${styles.col} ${styles.row} ${styles.gap}`
        }, this.boxes(this.areas.length, false)),
        // Canvas Overlay
        this.renderCanvas()
      ]),
      // EDIT Section
      w(Edit, {
        key: 'editSection', row, col, schema,
        open: !!this.areas.length,
        areas: this.areas,
        selected: this.selected,
        onChange: (index: number, area: GridChildArea) => {
          this.areas[index] = area;
          this.invalidate()
        }
      }),
      w(GlobalEvent, {
        key: 'global',
        window: { resize: this._onResize }
      }),
      ...this.children
    ]);
  }

  protected colRowUnits(type: Direction = 'col'): DNode {
    return v('section', {
      key: `${type}Units`,
      classes: this.theme(type === 'col' ? css.colUnits : css.rowUnits),
      style: `${this.styles[type]} ${this.styles.gap}`
    }, this.colRowInputs(type))
  }
  protected colRowInputs(type: Direction = 'col'): DNode[] {
    const label = {'col':'Column', 'row':'Row'};
    return this[type].units.map((o, i) =>
      v('span', {}, [
        w(TextInput, {
          //schema,
          key: 'editName',
          responsive: true,
          extraClasses: { root: css.gridInput },
          onChange: (e: Event) => this.changeUnit(e, i, type),
          aria: {label: `Grid Template ${label[type]} Measurements`},
          value: o.unit
        }),
        this[type].errors.indexOf(i) === -1 ? null : // TODO i18n errors etc. :
          v('div', {classes: css.errors}, [`i18n('grid.realcssunit')`])
      ])
    )
  }
  private changeUnit(e: Event, i: number, direction: Direction) {
    const unit = (<HTMLInputElement>e.target).value;
    const check = this.units.reduce((b, uCheck) =>
      (!!b ? b : uCheck.test(unit)), false) || /minmax/.test(unit) ||
      parseInt(unit, 10) === 0 || ['auto','min-content','max-content'].includes(unit);
    if (!check) {
      this[direction].errors.push(i);
    } else {
      (direction === 'row' ? this.row.units : this.col.units)[i] = {unit};
      this[direction].errors.splice(this[direction].errors.indexOf(i), 1);
    }
    this.invalidate()
  }

  private _onResize = () => {
		this.properties.onResize && this.properties.onResize(); /* TODO FIXME (size: number) */
	}
}
