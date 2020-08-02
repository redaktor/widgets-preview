import { GridAxis, GridChildArea, GridColor, GridChild } from './interfaces';
import { COLOR, createArr } from './util';
import MetaBase from '@dojo/framework/core/meta/Base';
import watch from '@dojo/framework/core/decorators/watch';
import { beforeProperties } from '@dojo/framework/core/decorators/beforeProperties';
import { Intersection } from "@dojo/framework/core/meta/intersection";
import { v, DNode, RedaktorWidgetBase, ThemedProperties } from '../common/Widget';
import { Material } from '../common/util';
import * as css from './styles/gridmaker.m.css';

/**
 * @type GridmakerProperties
 *
 * Properties that can be set on a Gridmaker component
 *
 * @property material
 * @property onResize       Called when the divider is dragged; should be used to update `size`
 */
export interface GridmakerProperties extends ThemedProperties {
  label?: string;
  comment?: string;
  row?: GridAxis;
  column?: GridAxis;
  areas?: GridChildArea[];
  selected?: number;
  material?: Material | keyof typeof Material;
	onResize?(): void; /* TODO FIXME (size: number) */
}

class CTX extends MetaBase {
	get(key: string | number) {
		const node = this.getNode(key) as HTMLCanvasElement;
    return node ? node.getContext('2d') : undefined;
  }
}

export default class GridmakerBase<P extends GridmakerProperties = GridmakerProperties>
extends RedaktorWidgetBase<P> {
  protected units = [
    'fr','px','%','em','rem','vw','vh','vmin','q','mm','cm','in','pt','pc','ex','ch'
  ].map((u) => new RegExp(u+'$'));
  // state
  @watch() protected label: string = 'grid-container';
  @watch() protected comment: string = '';
  @watch() protected row: GridAxis = { count: 5, gap: 0, units: [], errors: [] };
  @watch() protected col: GridAxis = { count: 7, gap: 0, units: [], errors: [] };
  @watch() protected selected: number = -1;
  protected areas: GridChildArea[] = [];

  protected child: GridChild = { srow:0, erow:0, scol:0, ecol:0, counts:{} };
  // tmp draw
  protected color: GridColor;
  private ctx: any;
  private rect: [number /*x*/, number /*y*/, number /*w*/, number /*h*/] = [0,0,0,0];
  private colors: GridColor[] = [];
  private drag = false;

  @beforeProperties()
	protected gridBeforeProperties(props: GridmakerProperties): GridmakerProperties {
    const {row = this.row, column: col = this.col} = props;
    if (!row.units.length) { row.units = createArr(row.count) }
    if (!col.units.length) { col.units = createArr(col.count) }
    this.row = row;
    this.col = col;
    if (!this.colors.length) {
      this.colors = JSON.parse(JSON.stringify(COLOR.defaults));
      this.pickFruit()
    }
		return props;
	}

  /* Drawing stuff */
  protected renderCanvas(controlCss?: any): DNode {
    const c = this.meta(CTX).get('canvas');
    const { isIntersecting } = this.meta(Intersection).get('root');
  	if (c && c.canvas.width !== c.canvas.offsetWidth && isIntersecting) {
      c.canvas.width = c.canvas.offsetWidth;
      c.canvas.height = c.canvas.offsetHeight;
  	}
    const canvas = v('canvas', {
      key: 'canvas',
      classes: [css.canvas, controlCss ? controlCss.content : null],
      onmousedown: this.mouseDown,
      onmouseup: this.mouseUp,
      onmousemove: this.mouseMove
    });
    this.ctx = this.meta(CTX).get('canvas');
    return canvas;
  }
  protected pickFruit() {
    const rand = Math.floor(Math.random() * this.colors.length);
    this.color = this.colors[ rand ];
    this.colors.splice(rand, 1);
    return this.color
  }
  /*
  protected getColorStyle() {
    const { keys, defaults } = COLOR;
    const i = keys.indexOf(this.color.key);
    const conic = (i < 1 ? keys : keys.slice(i).concat(keys.slice(0, i))).map((k,j) => {
      return `var(--r-${k}, ${defaults[j].hex})`
    });

    return `${this.color.style}--r-gradient: conic-gradient(${conic.join(',')});`
  }
  */
  protected mouseDown(e: MouseEvent) {
    this.drag = (!e.button && !e.ctrlKey);
    if (!this.drag) { return }
    const { offsetLeft, offsetTop } = this.ctx.canvas;
    this.rect[0] = e.offsetX - offsetLeft;
    this.rect[1] = e.offsetY - offsetTop;
    this.placeChild(e);
  }
  protected mouseMove(e: MouseEvent) {
    if (!this.drag) { return }
    const { width, height, offsetLeft, offsetTop } = this.ctx.canvas;
    this.rect[2] = (e.offsetX - offsetLeft) - this.rect[0];
    this.rect[3] = (e.offsetY - offsetTop) - this.rect[1];
    this.ctx.clearRect(0, 0, width, height);
    this.draw();
  }
  protected mouseUp(e: MouseEvent) {
    if (!this.drag) { return }
    this.drag = false;
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.placeChild(e);
  }

  protected draw() {
    this.ctx.setLineDash([6]);
    this.ctx.strokeStyle = this.color.hex;
    this.ctx.fillStyle = this.color.rgba;
    this.ctx.fillRect(...this.rect);
    this.ctx.strokeRect(...this.rect);
  }
  /* <-- drawing */

  protected placeChild(e: MouseEvent, startend: 's'|'e' = (this.drag ? 's' : 'e')) {
    const i = this.getBox(e);
    let R = <'srow'|'erow'>`${startend}row`, C = <'scol'|'ecol'>`${startend}col`;
    // built an object first because I might use this for something else
    this.child[R] = Math.ceil(i / this.col.count);
    this.child[C] = i - (this.child[R] - 1) * this.col.count;
    if (startend === 's') {
      this.pickFruit();
    } else {
      const { srow, erow, scol, ecol } = this.child;
      // flip starts and ends if dragged in the opposite direction
      const [startRow, endRow] = srow <= erow ? [srow, erow] : [erow, srow];
      const [startCol, endCol] = scol <= ecol ? [scol, ecol] : [ecol, scol];
      const k = `_${startRow}_${startCol}`;
      !this.child.counts[k] ? this.child.counts[k] = 1 : this.child.counts[k]++;
      this.areas.push({
        top: this.child.counts[k] - 1,
        label: `div${this.areas.length}`,
        color: this.color,
        gridArea: [startRow, startCol, endRow + 1, endCol + 1]
      });
      this.selectChild()
    }
  }
  protected removeChild(i: number) {
    this.areas.splice(i, 1);
    this.selectChild()
  }
  protected selectChild(i: number = (this.areas.length - 1)) {
    if (i < 0) {
      this.selected = -1;
      return
    }
    this.selected = i;
    this.color = this.areas[i].color; //this.meta(Focus).set('editName'); // TODO
  }

  protected boxes(length: number = this.col.count * this.row.count, isParent = true) {
    return Array.apply(null, {length}).map((o: any, i: number) => {
      const key = `box${i}`;
      return isParent ? v('div', { key, classes: key }) : this.getChildNode(i)
    })
  }
  protected getBox(e: MouseEvent) {
    return document.elementsFromPoint(e.clientX, e.clientY).reduce((i, el: HTMLElement) => {
      const arr = el.className.split('box');
      return arr.length === 2 && arr[0] === '' ? parseInt(arr[1], 10) + 1 : (i > -1 ? i : -1)
    }, -1)
  }
  protected getChildNode(i: number) {
    const key = `child${i}`;
    const { label, top, gridArea, color } = this.areas[i];
    const style = `${color.style} --t: ${top}; grid-area: ${gridArea.join(' / ')};`;
    const c = [
      v('button', { classes: css.label, onclick: () => this.selectChild(i) }, [ `.${label}` ]),
      v('button', { classes: css.close, onclick: () => this.removeChild(i) }, [`×`])
    ]
    return v('div', {
      key, style, classes: [key, i === this.selected ? css.selected : null]
    }, c)
  }
}
/*
delegatedTouchPlaceChild(ev: any) {
  const target = document.elementFromPoint(
    ev.changedTouches[0].clientX,
    ev.changedTouches[0].clientY
  );
  const startend = ev.type === 'touchstart' ? 's' : 'e';
  //this.placeChild(target.dataset.id, startend);
}
*/
