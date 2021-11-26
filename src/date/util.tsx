import { ldPartial } from '../_ld';
export function getLdDates(ld: any/*WithContext<Event>*/, messages: any = {}) {
	const { dateCreated, contentReferenceTime, expires } = ldPartial(ld, 'schema', true);
	const { contentCreated } = ldPartial(ld, 'dc', true);
	const { published, updated } = ld;
	const dates = [
		[contentCreated, 'contentCreated', 'create'],
		[dateCreated, 'created', 'create'],
		[contentReferenceTime, 'contentReferenceTime', 'calendar'],
		[published, 'published', 'published'],
		[updated, 'updated', 'update'],
		[expires, 'expires', 'timing']
	].reduce((date, a) => {
		let [d, type, icon] = a;
		if (!!d && !Array.isArray(d)) { d = [d] }
		if (!d || !d.length) { return date }
		return date.concat(d.map((date: string) => {
			const label = (messages.hasOwnProperty(type) && messages[type]) || messages.date;
			const title = (messages.hasOwnProperty(`${type}Title`) && messages[`${type}Title`]) || '';
			return [date, label, title, icon]
		}));
	}, []).filter((dA) => !!dA.length && !!dA[0]);

	return dates
}
