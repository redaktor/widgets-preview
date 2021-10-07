
import API from "../core/decorator";
export const schemaMin = {"type":"object","properties":{"_constructor":{"$ref":"#/definitions/constructor1"},"tokens":{"$ref":"#/definitions/tokens"},"has":{"$ref":"#/definitions/has"},"get":{"$ref":"#/definitions/get"},"set":{"$ref":"#/definitions/set"},"remove":{"$ref":"#/definitions/remove"},"dict":{"$ref":"#/definitions/dict"},"walk":{"$ref":"#/definitions/walk"},"compile":{"$ref":"#/definitions/compile"},"escape":{"$ref":"#/definitions/escape"},"unescape":{"$ref":"#/definitions/unescape"},"parse":{"$ref":"#/definitions/parse"}},"additionalProperties":false,"definitions":{"constructor1":{"type":"object","additionalProperties":false},"tokens":{"type":"object","properties":{"0":{"title":"pointer"}},"additionalProperties":false},"has":{"type":"object","properties":{"0":{"title":"pointer"}},"additionalProperties":false,"required":["0"]},"get":{"type":"object","properties":{"0":{"title":"pointer"}},"additionalProperties":false},"set":{"type":"object","properties":{"0":{"title":"pointer"},"1":{"title":"value"},"2":{"title":"replacing","type":"boolean"}},"additionalProperties":false,"required":["0","1"]},"remove":{"type":"object","properties":{"0":{"title":"pointer"}},"additionalProperties":false,"required":["0"]},"dict":{"type":"object","properties":{"0":{"title":"descend"}},"additionalProperties":false},"walk":{"type":"object","properties":{"0":{"title":"iterator"},"1":{"title":"descend"}},"additionalProperties":false,"required":["0"]},"compile":{"type":"object","properties":{"0":{"title":"refTokens","type":"array","items":{"type":"string"}}},"additionalProperties":false,"required":["0"]},"escape":{"type":"object","properties":{"0":{"title":"str","type":"string"}},"additionalProperties":false,"required":["0"]},"unescape":{"type":"object","properties":{"0":{"title":"str","type":"string"}},"additionalProperties":false,"required":["0"]},"parse":{"type":"object","properties":{"0":{"title":"pointer","type":"string"}},"additionalProperties":false,"required":["0"]}},"$schema":"http://json-schema.org/draft-07/schema#"};
export const initializers = {
tokens: function(this: any, ...args: any[]) { return [''] },
has: function(this: any, ...args: any[]) { return [void 0] },
get: function(this: any, ...args: any[]) { return [void 0] },
set: function(this: any, ...args: any[]) { return [void 0, void 0, true] },
remove: function(this: any, ...args: any[]) { return [void 0] },
dict: function(this: any, ...args: any[]) { return [void 0] },
walk: function(this: any, ...args: any[]) { return [void 0, function (value: any) {
		var type = Object.prototype.toString.call(value);
		return type === '[object Object]' || type === '[object Array]';
	}] },
compile: function(this: any, ...args: any[]) { return [void 0] },
escape: function(this: any, ...args: any[]) { return [void 0] },
unescape: function(this: any, ...args: any[]) { return [void 0] },
parse: function(this: any, ...args: any[]) { return [void 0] },
};
export default API(schemaMin, initializers);
