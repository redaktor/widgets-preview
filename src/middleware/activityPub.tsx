import { create, defer } from '@dojo/framework/core/vdom';
import { ActivityPubObject, ActivityPubObjectNormalized, Labeled } from '../common/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { normalizeActivityPub } from '../common/activityPubUtil';

const icache = createICacheMiddleware<{
  normalized: ActivityPubObjectNormalized;
}>();
const factory = create({ defer, icache }).properties<{
  userLocale?: string;
	locales: Labeled[];
}>();

export const ActivityPubCachingMiddleware = factory(({ properties, middleware: { defer, icache }}) => ({
  normalized(o: ActivityPubObject, locale?: string, _invalidate = false) {
      const { userLocale } = properties();
			if (!_invalidate) {
      	const cachedValue = icache.get('normalized');
      	if (!!cachedValue) { return cachedValue }
			}
			return icache.set('normalized', normalizeActivityPub(o, locale||userLocale))
			/*
      // Cache miss from server (isStale):
      const promise = fetchExternalValue(value);
      // Pause further widget rendering
      defer.pause();
      promise.then((result) => {
          // Cache the value for subsequent renderings
          icache.set('normalized', normalizeActivityPub(result));
          // Resume widget rendering once the value is available
          defer.resume();
      });
			*/
  },
	invalidate(o: ActivityPubObject, locale?: string) {
		return this.normalized(o, locale, true)
	},
  getLocales() {
    const o = icache.get('normalized') ? icache.get('normalized') : this.normalized(properties());
    return !!o ? o.locales : []
  },
  getLocale() {
    const o = icache.get('normalized') ? icache.get('normalized') : this.normalized(properties());
    return !!o ? o.locale : []
  },
  setLocale(locale: string) {
    return this.normalized(properties(), locale, true)
  }
}));

export default ActivityPubCachingMiddleware;
