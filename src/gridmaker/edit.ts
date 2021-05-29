import { GridAxis, GridChildArea } from './interfaces';
import { v, w, DNode, ThemedBase, theme } from '../common/Widget';
import { CircularProgress } from '../../widgets/progress';
import TextInput from '../../widgets/inputText';
import * as css from './styles/gridmaker.m.css';
import * as uiCss from '../themes/redaktor-default/_ui.m.css';
export interface GridmakerEditProperties {
  open?: boolean;
  schema?: any;
  areas?: GridChildArea[];
  selected?: number;
  row: GridAxis;
  col: GridAxis;
  onChange?: (index: number, area: GridChildArea) => any;
}

@theme(css)
export default class GridmakerEdit<P extends GridmakerEditProperties = GridmakerEditProperties>
extends ThemedBase<P> {

  private _onChange(payload: any, i: number) {
    const { onChange, areas = [] } = this.properties;
    //console.log('EDIT', i, this.areas[i]);
    for (let k of Object.keys(payload)) {
      if (payload[k] === null) { delete payload[k] }
    }
    if (!Object.keys(payload).length) { return }
    this.invalidate();
    onChange && onChange(i, {...areas[i], ...payload})
  }

  protected render(): DNode {
    const {
      row, col, open = false, schema = 'secondary', areas = [], selected = 0
    } = this.properties;
    const { label = '', gridArea = [1,1,2,2] } = areas[selected] || {};
    const c = [
      ['row','start','Row'],['row','end'],['col','start','Column'],['col','end']
    ].map((a: ['row'|'col', 'start'|'end', string]) => {
      const labelO = a.length < 3 ? {} : { label: a[2], labelStatic: true }
      const isStart = a[1] === 'start', isRow = a[0] === 'row';
      const i = isStart ? (isRow ? 0 : 1) : (isRow ? 2 : 3);
      return w(TextInput, {
        type: 'number',
        min: isStart ? 1 : Math.max(2, gridArea[ isRow ? 0 : 1]+1),
        max: !isStart ? 128 : (a[0] === 'row' ? row : col).count,
        key: `${a[0]}_${a[1]}`,
        value: gridArea[i],
        leading: [v('span', { classes: uiCss.muted }, [isStart ? 'from' : 'to'])],
        ...labelO,
        responsive: false,
        onChange: this.editAreaFn(i)
      })
    });

    return v('section', {
      key: 'editSection',
      classes: [uiCss.flexRow, css.editSection, !open ? css.editClosed : css.editOpen]
    }, [
      v('div', {classes: uiCss.flex}, [
        // TODO FIXME color changer
        w(CircularProgress, {
          schema,
          key: 'editColorTrigger',
          indeterminate: false,
          value: 92,
          outputDisplay: 'none',
//          extraClasses: { wrapper: css.conicEnhance }
        }),
        w(TextInput, {
          schema,
          key: 'editName',
          responsive: false,
          label: 'Name',
          onInput: (o: any) => this._onChange({ label: o.value }, selected),
          value: label,
          //focus: () => !!open
        })
      ]),
      v('div', { classes: uiCss.flex}, [c[0], c[1]]),
      v('div', { classes: uiCss.flex}, [c[2], c[3]]),
      v('output', { classes: css.output }, [
        v('b', [`${selected}`]),
        v('i', [`${gridArea.join(' / ')}`])
      ])
    ]);
  }

  protected editAreaFn(n: number) {
    return (e: any) => {
      const { areas = [], selected = 0 } = this.properties;
      const { gridArea } = areas[selected];
      gridArea[n] = e.target.valueAsNumber;
      this._onChange({
        gridArea: gridArea.map((v, i) =>
          (i < 2 ? Math.max(1, v) : Math.max(2, gridArea[i === 2 ? 0 : 1]+1, v)))
      }, selected)
    }
  }
}
