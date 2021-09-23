import { create } from '@dojo/framework/core/vdom';
import { ActivityPubObject, ActivityPubObjectNormalized, Labeled } from '../common/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub, defaultContext } from '../common/activityPubUtil';
const testdoc = {
  "@context": [
    "https://www.w3.org/ns/activitystreams",
  	{"schema": "http://schema.org/"}
  ],
  "summary": "Sally offered the Foo object",
  "type": "Offer",
  "actor": {
    "type": "Person",
    "id": "http://sally.example.org",
    "summary": "Sally"
  },
  "object": "http://example.org/foo",
  "schema:name": "bla"
};

interface LocalesProperties extends ActivityPubObject {
  userLocale?: string;
	locales?: Labeled[];
}

const icache = createICacheMiddleware<{
  [id: string]: ActivityPubObjectNormalized;
  normalized: ActivityPubObjectNormalized;
  '@context': any;
}>();
const factory = create({ i18n, icache }).properties<LocalesProperties>();

export const ActivityPubCachingMiddleware = factory(({ properties, middleware: { i18n, icache }}) => {

  function setI18n(locale?: string) {
    const { locale: userLocale = 'en'} = properties();
    if (!locale) { locale = userLocale }

    if ((locale && !i18n.get().locale) || locale !== i18n.get().locale) {
      // TODO workaround for bug https://github.com/dojo/framework/issues/906 :
      const bugLocale = locale.split('-')[0];
      i18n.set({locale: bugLocale});
    } // TODO ,rtl

    return locale;
  }

  function normalized<P>(locale?: string, _invalidate = false): (P & LocalesProperties & ActivityPubObjectNormalized) {
    if (!!locale) { locale = setI18n(locale); }
    const { id, '@context': c = icache.getOrSet('@context', defaultContext) } = properties();
    if (!id) {
      const ap = normalizeActivityPub(properties(), locale);
      if (!!c) { icache.set('@context', c); }
      return {...ap, locale} as any
    }
    if (!_invalidate) {
      const cachedValue = icache.get(id);
      if (!!cachedValue) { return cachedValue as any }
    }
    const ap = normalizeActivityPub(properties(), locale);
    if (!!c) { icache.set('@context', c); }
    console.log('context', icache.get('@context'));
    return icache.set(id, {...ap, '@context': icache.get('@context'), locale}) as (P & LocalesProperties & ActivityPubObjectNormalized)

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
      const key = properties().id;
      if (!key) { return [] }
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
