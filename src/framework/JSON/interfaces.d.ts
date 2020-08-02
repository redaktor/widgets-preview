export type Operation = AddOP<any> | RemoveOP | ReplaceOP<any> |
  MoveOP | CopyOP | TestOP<any>;

export interface Validator<T> {
  (operation: Operation, index: number, document: T): boolean;
}

// TODO
export interface OperationResult<T> {
  removed?: any;
  test?: boolean;
  newDocument: T;
}

export interface BaseOP {
  path: string;
}

export interface AddOP<T> extends BaseOP {
  op: 'add';
  value: T;
}

export interface RemoveOP extends BaseOP {
  op: 'remove';
}

export interface ReplaceOP<T> extends BaseOP {
  op: 'replace';
  value: T;
}

export interface MoveOP extends BaseOP {
  op: 'move';
  from: string;
}

export interface CopyOP extends BaseOP {
  op: 'copy';
  from: string;
}

export interface TestOP<T> extends BaseOP {
  op: 'test';
  value: T;
}

export interface PatchOptions {
  validate: boolean | Validator<any>;
  protectRoot?: boolean;
  mutateDocument?: boolean;
}
