import { Material } from '../common/util';

interface GridUnit { unit: string; }
export interface GridAxisProps { count: number; gap?: number; units?: GridUnit[]; }

export interface GridAxis {
  count: number; gap: number; units: GridUnit[]; errors: number[];
}
export interface GridChildArea {
  top: number; label: string; gridArea: [number, number, number, number]; color: GridColor;
}
export interface GridAreaInput {
  type: 'number'; min: number; max: number; label?: string; labelStatic?: boolean;
}
export interface GridColor {
  key: keyof typeof Material; hex: string; rgba: string; style: string; text: string;
}
export interface GridChild {
  srow: number; erow: number; scol: number; ecol: number; counts: any;
}
export interface InputEvent extends Event {
  target: HTMLInputElement;
}
export type Direction = 'row'|'col';
export type SettingsChange = Direction|'label'|'comment';
