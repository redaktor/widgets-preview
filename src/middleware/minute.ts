import { create, invalidator } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
declare global {
  var redaktorMinuteInterval: number;
}


export type i18nKey = 'now'|'minute'|'hour'|'day'|'week'|'month'|'year';
export type i18nFormat = [i18nKey, {n: number, type: string}];
export interface TimeRelativeProperties {
	/** Date */
	date: number | Date | string;
	isLive?: boolean;
}
export interface TimeRelativeIcache {
	isSubscribed: boolean;
  isShort: boolean;
  result: i18nFormat;
	id: string;
}
const icache = createICacheMiddleware<TimeRelativeIcache>();
const factory = create({ icache, invalidator }).properties<TimeRelativeProperties>();

const UV = [
  60,
  3600,
  86400,
  7*86400,
  (365/7/12)*7*86400,
  12*(365/7/12)*7*86400
];
const UNITS: [number,number,string][] = ['minute','hour','day','week','month'].map((s,i) => {
  return [UV[i+1],UV[i],s]
});

export const intervalKey = Symbol.for('redaktorMinuteInterval');
export const timeagoMiddleware = factory(({ middleware: { icache, invalidator }, properties }) => {
  const { get, set, getOrSet } = icache;
  const { date: d, isLive = true } = properties();
  const date = (d instanceof Date) ? d.getTime() : (typeof d === 'string' ? Date.parse(d) : d);
  return {
		start(isShort = false) {
      set('isShort', isShort, false);
      if (!isLive || !!get('isSubscribed') || !window || !window.dispatchEvent) { return }
      const result = getOrSet('result', this.format(true), false);
      const [i18nType, {n = 0}] = result;
      getOrSet('id', `${i18nType}${n}`, false);
      this.subscribe();
			if (global.hasOwnProperty(intervalKey)) { return }
      const minuteEvent = new Event('redaktorMinute');
			const time = new Date();
			const msRemaining = (60 - time.getSeconds()) * 1000;
			(global as any)[intervalKey] = setTimeout(function() {
        window.dispatchEvent(minuteEvent);
		    (global as any)[intervalKey] = setInterval(() => window.dispatchEvent(minuteEvent), 60000);
			}, msRemaining);
		},
    subscribe() {
      if (get('isSubscribed') || !window || !window.dispatchEvent) { return false }
			set('isSubscribed', true, false);
			window.addEventListener('redaktorMinute', () => this.update(this.format(true)), false);
      return true
    },
		unsubscribe() {
      if (!get('isSubscribed') || !window || !window.dispatchEvent) { return false }
			set('isSubscribed', false, false);
			window.removeEventListener('redaktorMinute', () => this.update(this.format(true)), false);
      return true
		},
    update(resultArray: i18nFormat) {
      const [i18nType, {n = 0}] = resultArray;
      const id = `${i18nType}${n}`;
      if (id !== get('id')) {
        set('id', id, false);
        set('result', resultArray, false)
        return invalidator()
      }
    },
		format(isUpdate = false): i18nFormat {
      const result = get('result');
      if (!isUpdate && result) { return result }
      if (typeof date !== 'number' || isNaN(date)) { return ['now',{n:0, type:''}] }
			const now = Date.now();
			const diff = date-now;
      const diffAbsS = Math.abs(diff/1000);
			const isAgo = diff < 0;

			let i18nTypeArray: [number,string] = [UV[UV.length-1], 'year'];
			for (let a of UNITS) {
				if (diffAbsS < a[0]) {
					i18nTypeArray = [a[1],a[2]];
					break;
				}
			}
			const [toTypeFactor, i18nType] = i18nTypeArray;
			const n = diffAbsS < 31622400 ? Math.round(diffAbsS/toTypeFactor) :
        Number((diffAbsS/toTypeFactor).toFixed(1));
      const type = `${isAgo ? 'ago' : 'ahead'}${get('isShort') ? 'Short' : ''}`;

			return [(i18nType as i18nKey), {n, type}];
		}
  };
});

export default timeagoMiddleware;
