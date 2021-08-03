import { create } from '@dojo/framework/core/vdom';
import { ActivityPubObject, ActivityPubObjectNormalized, Labeled } from '../common/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub } from '../common/activityPubUtil';

interface LocalesProperties extends ActivityPubObject {
  userLocale?: string;
	locales?: Labeled[];
}

const icache = createICacheMiddleware<{
  [id: string]: ActivityPubObjectNormalized;
  normalized: ActivityPubObjectNormalized;
}>();
const factory = create({ i18n, icache }).properties<LocalesProperties>();

export const ActivityPubCachingMiddleware = factory(({ properties, middleware: { i18n, icache }}) => {

  const setI18n = (locale?: string) => {
    const { locale: userLocale = 'en'} = properties();
    if (!locale) { locale = userLocale }
    if ((locale && !i18n.get().locale) || locale !== i18n.get().locale) {
      // TODO workaround for bug https://github.com/dojo/framework/issues/906 :
      const bugLocale = locale.split('-')[0];
      i18n.set({locale: bugLocale});
    } // TODO ,rtl
    return locale;
  }

  const normalized = (locale?: string, _invalidate = false) => {
    locale = setI18n(locale);
    const { id = 'normalized' } = properties();
    if (!_invalidate) {
      const cachedValue = icache.get(id);
      if (!!cachedValue) { return cachedValue }
    }

    const n = {...normalizeActivityPub(properties(), locale), locale};
    console.log(n);
    return icache.set(id, n)
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
  }

  return {
    ...i18n,
    getLocales() {
      const key = properties().id || 'normalized';
      const o = icache.get(key) ? icache.get(key) : this.normalized();
      return !!o ? o.locales : []
    },
    setLocale(locale: string) {
      return normalized(locale, true)
    },
    normalized
  }
});

export default ActivityPubCachingMiddleware;
