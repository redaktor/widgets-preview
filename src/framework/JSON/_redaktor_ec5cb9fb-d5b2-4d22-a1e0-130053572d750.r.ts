
export interface constructor1 {
/**
 * @title name
*/
0: PatchErrorName;
/**
 * @title message
*/
1?: string;
/**
 * @title index
*/
2?: number;
/**
 * @title operation
*/
3?: any;
/**
 * @title tree
*/
4?: any;
}

export type _constructor = constructor1;



export interface _PatchError{
/** new PatchError(name: "SEQUENCE_NOT_AN_ARRAY" | "OPERATION_NOT_AN_OBJECT" | "OPERATION_OP_INVALID" | "OPERATION_PATH_INVALID" | "OPERATION_FROM_REQUIRED" | "OPERATION_VALUE_REQUIRED" | "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED" | ... 5 more ... | "TEST_OPERATION_FAILED", message: string, index: number, operation: any, tree: any)
 * @returns instance of PatchError
 */
_constructor?: _constructor;

}
export default _PatchError;

