export type eachFN = (collection: any, iteratee: eachCB, start?: number, end?: number, step?: number) => any;
export type reduceFN = (collection: any, iteratee: reduceCB, accumulator?: any, start?: number, end?: number, step?: number) => any;
export type eachCB = (v: any, i: number, _a: any[], next?: Symbol, stop?: Symbol) => any;
export type reduceCB = (accumulator?: any, v?: any, i?: number, _a?: any[], next?: Symbol, stop?: Symbol) => any;
export type keyCB = (v?: any, k?: string | number, _o?: any[]) => any;
export type vCB = (v: any) => any;


export type diuFN = (a: any[], ...valuesAndFn: any[]) => any;
export interface resultSet { R: any[], S: any }
