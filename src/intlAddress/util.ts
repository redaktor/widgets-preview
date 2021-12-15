type AddressLine = (string|{attr: string; transforms: ((s:string) => any)[]})[];
type AddressFormats = {
  [iso: string]: AddressLine[] | {business: AddressLine[], personal: AddressLine[]}
};
const commaSuffix = (s: string) => `${s},`;
const capitalize = (s: string) => s.toUpperCase();

const [H, T, F, S, L, FL, SL, N, A, AR, C, CO, C2, P, PR, ST] = [
  'honorific', 'title', 'firstName', 'secondName',
  'lastName', 'firstLastName', 'secondLastName', 'name' /* all */,
  'streetAddress', 'streetAddressRest', 'addressLocality' /* city */,
  'addressCountry', 'ISO3166', 'postalCode', 'addressRegion', 'areaServed'
];
const formats: AddressFormats = {
  // Argentina
  AR: [[H,F,S,FL],[SL],[N],[A,AR],[P,C],[ST],[CO]],
  // Australia
  AU: [[H,F,S,L],[N],[A],[AR],[{attr:C, transforms:[commaSuffix]},ST,P],[CO]],
  // Bulgaria
  BG: [[CO],[ST],[P,C],[A],[AR],[N],[H,F,S,L]],
  // Brazil
  BR: [[N],[H,F,S,L],[A,AR],[P,C,ST],[CO]],
  // Canada
  "fr-CA": [[H,F,L],[A,AR],[C,PR],[P],[CO]],
  "en-CA": [[H,F,L],[N],[A,AR],[{attr:C, transforms:[commaSuffix]}, PR, P],[CO]],
  // Switzerland
  CH: [[H,F,L],[A,AR],[P,C],[CO]],
  // China
  CN: [[CO],[PR,C],[A,AR],[N],[L,F,H]],
  // Czechia
  CZ: [[H,F,S,L],[N],[A],[AR],[P,C],[CO]],
  // Germany
  DE: [[N],[H,T,F,L],[A],[AR],[],[C2,P,C],[CO]],
  // Denmark
  DK: [[H,T,F,S,L],[N],[A],[AR],[C2,P,C],[CO]],
  // Spain
  ES: [[H,F,S,FL],[SL],[N],[A,AR],[P,C],[CO]],
  // Finland
  FI: [[T,F,S,L],[N],[A],[AR],[P,C],[CO]],
  // France
  FR: [[H,F,L],[N],[A],[AR],[P,C],[CO]],
  // Greece
  GR: [[T,F,S,L],[N],[A],[AR],[P,C],[CO]],
  // Croatia
  HR: [[H,F,S,L],[N],[A],[AR],[P,C],[CO]],
  // Hungary
  HU: {
    business: [[H,L,F,S],[N],[P,C],[A],[AR],[ST],[CO]],
    personal: [[H,L,F],[C],[A,AR],[P],[ST],[CO]]
  },
  // Italy
  IT: [[H,F,L],[N],[A,AR],[],[C2,P,C,PR],[CO]],
  // Japan,
  JP: [[CO],[P,PR,C],[A,AR],[N],[L,F,H]],
  // South Korea,
  KR: [[CO],['do','si','dong','gu','addressNum'],[N],[L,F,H]],
  // Malaysia
  MY: [[H,F,S,L],[N],[A],[AR],[P,C],[ST,CO]],
  // Netherlands
  NL: {
    business: [[N],['t.a.v.',T,F,S,L],[A],[AR],[P,C],[CO]],
    personal: [[T,F,S,L],[N],[A],[AR],[P,C],[CO]]
  },
  // Norway
  NO: {
    business: [[N],[A],[F,L],[AR],[P,C],[CO]],
    personal: [[T,F,L],[A,AR],[P,{attr:C, transforms:[capitalize]}],[CO]]
  },
  // Poland
  PL: [[H,F,S,L],[N],[A],[AR],[P,C],[CO]],
  // Portugal
  PT: [[H,F,S,L],[N],[A],[AR],[P,C],[CO]],
  // Romania
  RO: [[H,F,S,L],[N],[A],[AR],[P,C],[ST],[CO]],
  // Russia
  RU: [[CO],['republic',ST,PR,C],[A],[AR],[N],[L],[F,S]],
  // Sweden
  SE: {
    business: [[N],[F,L],[A],[AR],[P,C],[CO]],
    personal: [[T,F,L],[A,AR],[P, {attr:C,transforms:[capitalize]}],[CO]]
  },
  // Turkey
  TR: [[H,F,S,L],[N],[A],[AR],[{attr:P, transforms:[commaSuffix]}, C],[CO]],
  // United States
  US: [
    [H,F,S,L],[N],[A],[AR],[{attr:C, transforms:[commaSuffix]},ST,P],
    [{ attr: CO, transforms: [capitalize] }]
  ]
}

export const addressFormats = {
  ...formats,
  CA: formats['en-CA'],
  RS: formats.HR, /* Serbia */
  SI: formats.HR, /* Slovenia */
  KP: formats.KR, /* North Korea */
  // Bolivia, Chile, Colombia, Ecuador, Guyana, Paraguay, Peru, Uruguay, Venezuela:
  BO: formats.AR, CL: formats.AR, CO: formats.AR, EC: formats.AR, GY: formats.AR,
  PY: formats.AR, PE: formats.AR, UY: formats.AR, VE: formats.AR
};

export type Region = keyof typeof addressFormats;
/* TODO contactType */
export default function intlAddress(schemaPartial: any, region: Region, type: 'personal'|'business' = 'personal'): {itemprop:string; value:string;}[][] {
  const o: any = {};
  for (let k in schemaPartial) {
    const splits = k.split('schema:');
    const key = splits[splits.length-1];
    if (Array.isArray(schemaPartial[k])) {
      if (key === 'streetAddress') {
        const [streetAddress, ...streetAddressRest] = schemaPartial[k];
        o.streetAddress = streetAddress;
        o.streetAddressRest = streetAddressRest;
      } else {
        o[key] = schemaPartial[k].join(' ')
      }
    } else if (typeof schemaPartial[k] === 'string') {
      o[key] = schemaPartial[k].trim()
    } else {
      console.log(key, typeof key)
      o[key] = ''
    }
  }
  if (!o.streetAddress && !!o.postOfficeBoxNumber) {
    o.streetAddress = `P.O. Box ${o.postOfficeBoxNumber}`
  }
  if (!o.addressCountry && !!o.ISO3166) {
    const splits = o.ISO3166.split('-');
    if (!Intl || !(Intl as any).DisplayNames) {
      const mapping = require('./fallbackCountry').iso3166Countries;
      o.addressCountry = mapping[splits[splits.length-1]]||'';
    } else {
      const regionNames = new (Intl as any).DisplayNames(['en'], {type: 'region'});
      o.addressCountry = regionNames.of(splits[splits.length-1])||'';
    }
  } else if (!!o.addressCountry && !o.ISO3166) {
    if (!Intl || !(Intl as any).DisplayNames) {
      const mapping = require('./fallbackCountry').countriesIso3166;
      const key = o.addressCountry.toLowerCase();
      o.ISO3166 = mapping.hasOwnProperty(key) ? mapping[key] : '';
    }
  }
  if (!o.areaServed && !!o.addressRegion) { o.areaServed = o.addressRegion }

  const formatedAddressArray = Array.isArray(addressFormats[region]) ? addressFormats[region] :
    (typeof addressFormats[region] === 'object' && addressFormats[region].hasOwnProperty(type) ?
      ((addressFormats as any)[region][type]) : (formats.US||[])) || (formats.US||[]);

  return formatedAddressArray.map((a: any[]) => {
    return a.map((so) => {
      if (typeof so === 'string' && o.hasOwnProperty(so)) {
        const value = (Array.isArray(o[so]) ? o[so].join(' ') :
          (typeof o[so] === 'string' ? o[so] : '')).replace(/,,/g, ',');
        return { itemprop: so, value }
      }
      if (typeof so === 'object' && o.hasOwnProperty(so.attr)) {
        const itemprop = so.attr;
        let value = (Array.isArray(o[itemprop]) ? o[itemprop].join(' ') :
          (typeof o[itemprop] === 'string' ? o[itemprop] : '')).replace(/,,/g, ',');
        so.transforms.forEach((fn: (s:string) => any) => { value = fn(value) })
        return { itemprop, value }
      }
      return ''
    }).filter((o: any) => !!a && typeof o === 'object' && !!o.value.length)
  }).filter((a: any[]) => !!a && !!a.length)
}
