import { create, defer } from '@dojo/framework/core/vdom';
import { ActivityPubObject, ActivityPubObjectNormalized, Labeled } from '../common/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub } from '../common/activityPubUtil';

const icache = createICacheMiddleware<{
  normalized: ActivityPubObjectNormalized;
}>();
const factory = create({ defer, i18n, icache }).properties<{
  userLocale?: string;
	locales?: Labeled[];
}>();

export const ActivityPubCachingMiddleware = factory(({ properties, middleware: { defer, i18n, icache }}) => ({
  ...i18n,
  _set: i18n.set,
  getLocales() {
    const o = icache.get('normalized') ? icache.get('normalized') : this.normalized(properties());
    return !!o ? o.locales : []
  },
  set(locale: string) {
    if (locale !== this.get()) { this._set({locale}) } // TODO ,rtl
    return this.normalized(properties(), locale, true)
  },
  normalized(o: ActivityPubObject, locale?: string, _invalidate = false) {
      const { locale: userLocale = 'en' } = properties();
      if (!locale) { locale = userLocale }
      if (locale !== this.get()) { this._set({locale}) } // TODO ,rtl
			if (!_invalidate) {
      	const cachedValue = icache.get('normalized');
      	if (!!cachedValue) { return cachedValue }
			}
			return icache.set('normalized', normalizeActivityPub(o, locale))
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
	}
}));

export default ActivityPubCachingMiddleware;
