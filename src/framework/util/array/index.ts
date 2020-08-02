/* import * as jsonPointer from 'json-pointer'; TODO */

/* TODO :
http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html
*/
function _createTree(array: any[], rootNodes: any[], idProperty: string) {
  var tree: any[] = [];
  for (var n in rootNodes) {
    var node = rootNodes[n];
    var childNode = array[node[idProperty]];
    if (!node && !rootNodes.hasOwnProperty(n)) { continue; }
    if (childNode) {
      node.children = _createTree(array, childNode, idProperty);
    }
    tree.push(node);
  }
  return tree;
};

function _groupByParents(array: any[], options: any) {
  return array.reduce(function(prev, item) {
    var parentId = item[options.parentProperty] || options.rootID;

    if (parentId && prev.hasOwnProperty(parentId)) {
      prev[parentId].push(item);
      return prev;
    }

    prev[parentId] = [item];
    return prev;
  }, {});
};

export function flatten(...arr: any[]): any[] {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}

export function flattenTree(arr: any[], cKey = 'children') {
  if (!Array.isArray(arr)) { arr = [arr]; }
  const flatTree = (o: any) => {
  	if (Array.isArray(o[cKey]) && o[cKey].length) {
    	arr = arr.concat(o[cKey]);
      o[cKey].map(flatTree);
    }
  }
  arr.map(flatTree);
  return arr;
}

/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a nested
 * data structure
 *
 * @name arrayToTree
 * @function
 *
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 *     a parent node could be found. Default: 'parent_id'
 *  - `idProperty` (String): An unique node identifier. Default: 'id'
 *
 * @return {Array} Result of transformation
 */

export function toTree(data: any, options?: any) {
  if (typeof data != 'object') {
    return [{
      id: 'root',
      parent: null,
      children: [],
      value: data
    }];
  } else {
    /* TODO FIXME - plain objects and maps ... */
    if (!Array.isArray(data)) {
      data = [data];
    }
  }
  options = {...{
    idProperty: 'id', // The property used as unique id
    parentProperty: 'parent', // The property used to describe parent ids
    id: 'root', // used for primitives
    rootID: '$0' // used internal
  }, ...options};

  var grouped = _groupByParents(data, options);
  return _createTree(grouped, grouped[options.rootID], options.idProperty);
};

/* for reduce TODO FIXME DOC */
export function toObject(keys?: string[]) {
  return (keys && Array.isArray(keys)) ?
    (o: any, v: any, i: number) => { o[keys[i]] = v; return (o||{}); } :
    (o: any, v: any, i: number) => { o[i] = v; return (o||{}); };
}

/* array.length TODO FIXME */
export function hasL(a: any, l?: number) {
	if (!l) l = 0;
	return (a && a instanceof Array && a.length > l) ? a.length : 0;
}
