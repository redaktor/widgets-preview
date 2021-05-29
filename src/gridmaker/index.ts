/** based on https://github.com/sdras/cssgridgenerator */
import { GridChildArea, Direction, SettingsChange } from './interfaces';
import { groupedUnits } from './util';
import { GlobalEvent } from '../global-event/index';
import { v, w, DNode, theme, customElement } from '../common/Widget';
import { materialClass } from '../common/util';
import Container from '../container/index';
import Control from '../container/control';
import TextInput from '../inputText';
import GridmakerBase, { GridmakerProperties } from './base';
import Settings from './settings';
import Edit from './edit';
import * as controlCss from '../themes/redaktor-default/control.m.css';
import * as css from './styles/gridmaker.m.css';

/* TODO
mimax() Unit
---
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
      gap: `grid-gap: ${this.row.gap}px ${this.col.gap}px;`
    }
  }
  protected render(): DNode {
    const { label, comment, row, col, styles } = this;
		const { material = 'dark' } = this.properties
    const schema = this.color.key || 'secondary';

		const parentCSS = Object.keys(styles).reduce((s, k) =>
			`${s}\n  ${(<any>styles)[k]}`, `.${this.label} {\n  display: grid;`) + `\n}\n`;
		const childrenCSS = this.areas.reduce((s, o) => {
			// TODO vComment etc.
			const vColor = `  --r-color: "${o.color.key}";`;
			const gridArea = `  grid-area: ${o.gridArea.join(' / ')};`;
			return `${s}.${o.label} {\n${vColor}\n${gridArea}\n}\n`
		}, '');

		return w(Container, {
			material,
			title: 'Grid Maker',
			padding: [1,1,3,1],
			controls: [
				w(Control, { name: 'gridSettings', mode: 'settingsToggle', checked: true }),
				w(Control, { name: 'gridCode', mode: 'metaToggle' })
			],
			meta: w(Container, {
				material,
				padding: 1,
				spacing: [1,0,0,'64px']
			}, [
				v('pre', [
					v('code', [parentCSS]),
					!!childrenCSS ? v('code', [childrenCSS]) : null
				])
			])
		}, [
			v('div', {
				key: 'root',
	      style: this.color.style,
	      classes: [
					controlCss.container,
					...this.theme([css.root]),
					...this.getSchemaClasses(css, true)
				]
	    }, [

      // SETTINGS Section
			v('div', { classes: controlCss.settings }, [
				w(Settings, {
	        key: 'settingsSection',
					label, comment, row, col,
	        onChange: (t: SettingsChange, v: any) => { console.log(t,v); this[t] = v; }
	      })
			]),

      // GRID Drag Area
      // Column and Row Units
      this.colRowUnits('col'),
      this.colRowUnits('row'),

      // Grid Container
      v('div', { key: 'gridContainer', classes: [
				css.gridContainer,
				materialClass(material)
			] }, [
				//w(Control, { name: 'gridCode', mode: 'metaToggle', extraClasses: {root: css.codeCtrl} }),
        v('section', {
          key: 'grid',
					//id: 'gridxy',
          classes: [ css.grid, controlCss.content ],
          style: `${styles.col} ${styles.row} ${styles.gap}`
          /* TODO
          @touchstart.prevent='delegatedTouchPlaceChild'
          @touchend.prevent='delegatedTouchPlaceChild'
          */
        }, this.boxes()),
        v('section', {
          key: 'gridChildren',
          classes: [ css.grid, css.gridChild, controlCss.content ],
          style: `${styles.col} ${styles.row} ${styles.gap}`
        }, this.boxes(this.areas.length, false)),
        // Canvas Overlay
        this.renderCanvas(controlCss),
				/*
				v('div', { classes: [ css.meta, controlCss.meta ] }, [
					w(Container, { padding: 1 }, [
						v('pre', [
							v('code', [parentCSS]),
							v('code', [childrenCSS])
						])
					])
				]) */
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
			])
		]);
  }

  protected colRowUnits(type: Direction = 'col'): DNode {
    return v('section', {
      key: `${type}Units`,
      classes: [this.theme(type === 'col' ? css.colUnits : css.rowUnits), controlCss.content],
      style: `${this.styles[type]} ${this.styles.gap}`
    }, this.colRowInputs(type))
  }
  protected colRowInputs(type: Direction = 'col'): DNode[] {
    const label = {'col':'Column', 'row':'Row'};
    return this[type].units.map((o, i) =>
      v('span', { key: `${type}Unit_${i}` }, [
        w(TextInput, {
          //schema,
          key: `${type}UnitInput_${i}`,
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
