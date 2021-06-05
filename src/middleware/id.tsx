import { create } from '@dojo/framework/core/vdom';
import { uuid } from '@dojo/framework/core/util';
import { icache } from '@dojo/framework/core/middleware/icache';

const factory = create({ icache }).properties();

export const IdMiddleware = factory(({ properties, middleware: { icache }}) => ({
  getId(property = 'default') {
    return icache.getOrSet(property, `${uuid()}_${property}`);
  }
}));

export default IdMiddleware;
