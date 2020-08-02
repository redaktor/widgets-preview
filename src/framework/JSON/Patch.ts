import {
	Operation, AddOP, RemoveOP, ReplaceOP, MoveOP, CopyOP, TestOP,
	Validator, PatchOptions
} from './interfaces';
import hasUndefined from '../lang/hasUndefined';
import isEqual from '../lang/isEqual';
import PatchError, { PatchErrorName } from './PatchError';
import { JSONpointer, parse, _S } from './Pointer';
import deepClone from './clone';

const PATCH_OPTIONS: PatchOptions = {
	validate: true,
	protectRoot: false,
	mutateDocument: false
}
enum OP {
	add = 'add',
	remove = 'remove',
	replace = 'replace',
	move = 'move',
	copy = 'copy',
	test = 'test'
}
export const JSONpatchOP = OP;

export default class JSONpatch extends JSONpointer {
	constructor (protected root: any = {}, protected options: PatchOptions = PATCH_OPTIONS) {
		super(root, {...{}, ...PATCH_OPTIONS, ...options})
	}
	as(value: any, pointer: _S) { return this.set(pointer, value) }
	// JSON PATCH CORE METHODS - TODO DOC
	add(op: AddOP<any>) { return this.set(op.path, op.value, false) }
	replace(op: ReplaceOP<any>) { return this.set(op.path, op.value) }
	remove(op: RemoveOP|any) { return super.remove(op.path) }
	copy(op: CopyOP) { return this.set(op.path, this.get(op.from)) }
	move(op: MoveOP) {
		super.remove(op.from);
		return this.set(op.path, this.get(op.from))
	}
	test(op: TestOP<any>) {
		if (!isEqual(this.get(op.path), op.value)) {
			throw new PatchError('TEST_OPERATION_FAILED');
		}
		return this
	}

	/**
	 * Apply a JSON Patch or single JSON Patch Operation on a JSON document.
	 * Returns the result of the operation(s).
	 * @param patch The patch or operation to apply
	 * @param validateOperation `false` is without validation, `true` to use default validation,
	 * 	or you can pass a `validateOperation` callback to be used for validation.
	 * @param mutateDocument Whether to mutate the original document or clone it before applying
	 * @return `result` after the operation
	 */
	apply<T>(
		patch: Operation[], validateOperation: boolean | Validator<T> = true,
		mutateDocument: boolean = true
	): any {
		if (typeof patch === 'object' && (<any>patch).op) { patch = [(<any>patch)] }
	  if(!Array.isArray(patch)) { throw new PatchError('SEQUENCE_NOT_AN_ARRAY') }
		const L = patch.length;
		const isCustomValidate = (typeof validateOperation === 'function');
		let validate: Validator<T>|undefined;
		if (validateOperation) {
			validate = isCustomValidate ? validateOperation : this.validator.bind(this);
	  }
		if (!mutateDocument) { this.root = deepClone(this.root) }
		for (let i = 0; i < L; i++) {
			console.log('do:', patch[i]);
			const valid = !validate || validate(patch[i], i, this.root);
			console.log('valid:', valid);
			valid && this.applyOperation(patch[i], !!validate);
			console.log('->:', this.root);
		}
		return this.root
	}

	/**
	 * Validates a single operation. Called from `jsonpatch.validate`. Throws `PatchError` in case of an error.
	 * @param {object} operation - operation object (patch)
	 * @param {number} index - index of operation in the sequence
	 */
	 validator(o: Operation, index: number, root = this.root): boolean {
		 const patchErr = (type: PatchErrorName) => new PatchError(type, '', index, o, this.root);
	   if (typeof o !== 'object' || o === null || Array.isArray(o)) {
	     throw patchErr('OPERATION_NOT_AN_OBJECT');
	   } else if (!OP[o.op]) {
	     throw patchErr('OPERATION_OP_INVALID');
	   } else if (typeof o.path !== 'string' || (o.path.indexOf('/') !== 0 && !!o.path.length)) {
	     throw patchErr('OPERATION_PATH_INVALID');
	   } else if (o.op === OP.add || o.op === OP.replace || o.op === OP.test) {
	     if (o.value === undefined) { throw patchErr('OPERATION_VALUE_REQUIRED') }
			 if (hasUndefined(o.value)) { throw patchErr('OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED') }
		 } else if (o.op === OP.move || o.op === OP.copy) {
	     if (typeof o.from !== 'string') { throw patchErr('OPERATION_FROM_REQUIRED') }
			 if (!this.has(o.from)) { throw patchErr('OPERATION_FROM_UNRESOLVABLE') }
	   }
		 if (o.op === OP.add) {
			 const hasParentObj = (typeof this.get(parse(o.path).slice(0, -1)) === 'object');
			 if (!hasParentObj) {
         throw patchErr('OPERATION_PATH_CANNOT_ADD');
       }
     } else if (o.op === OP.replace || o.op === OP.remove) {
       if (!this.has(o.path)) {
         throw patchErr('OPERATION_PATH_UNRESOLVABLE');
       }
     }

		 return true
	 }

	 private applyOperation<T>(o: Operation, validateOperation: boolean) {
		return (<any>this)[o.op](o, validateOperation)
 	}
}
