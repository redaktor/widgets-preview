import { create } from '@dojo/framework/core/vdom';
import { AsObject, AsObjectNormalized, Labeled } from '../common/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import { defaultContext } from '../_ld/as';
import { normalizeAs, omitSymbol } from '../common/activityPubUtil';

interface LocalesProperties extends AsObject {
  userLocale?: string;
	locales?: Labeled[];
}

const icache = createICacheMiddleware<{
  [id: string]: AsObjectNormalized;
  normalized: AsObjectNormalized;
  '@context': any;
}>();
const factory = create({ i18n, icache }).properties<LocalesProperties>();

export const AsCachingMiddleware = factory(({ properties, middleware: { i18n, icache }}) => {

  if (!i18n.get() || !i18n.get().locale) {
    i18n.set({
			locale: new Intl.NumberFormat().resolvedOptions().locale || navigator.language || 'en-us', rtl: false
		});
  }

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

  function normalized<P>(locale?: string, _invalidate = false): (P & LocalesProperties & AsObjectNormalized) {
    if (!!locale) { locale = setI18n(locale); }
    const { id = null, '@context': c = icache.getOrSet('@context', defaultContext) } = properties();
    if (!id) {
      const ap = normalizeAs(properties(), locale);
      if (!!c) { icache.set('@context', c); }
      return {...ap, locale} as any
    }
    if (!_invalidate) {
      const cachedValue = icache.get(id);
      if (!!cachedValue) { return cachedValue as any }
    }
    const ap = normalizeAs(properties(), locale);
    if (!!c) { icache.set('@context', c); }
    // console.log('context', icache.get('@context'));
    return icache.set(id, {...ap, '@context': icache.get('@context'), locale}) as (P & LocalesProperties & AsObjectNormalized)

    /*
    // Cache miss from server (isStale):
    const promise = fetchExternalValue(value);
    // Pause further widget rendering
    defer.pause();
    promise.then((result) => {
        // Cache the value for subsequent renderings
        icache.set('normalized', normalizeAs(result));
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
    omit: () => {
      const { id } = properties();
      if (!!id) {
        const o: any = icache.get(id);
        return (o && omitSymbol && o[omitSymbol]) || new Set(properties().omitProperties||[])
      }
      return new Set(properties().omitProperties||[])
    },
    normalized
  }
});

export default AsCachingMiddleware;
