import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import * as libphonenumber from 'google-libphonenumber';
import intlAddress, { Region } from './util';
import MD from '../MD';
import Icon from '../icon';
import * as css from '../theme/material/address.m.css';

export interface AddressProperties {
	address: any;
	additionalProperties?: string[];
	region?: Region;
	type?: 'personal'|'business';
	separator?: string;
	itemClasses?: string | string[];
}

const factory = create({ theme, i18nActivityPub }).properties<AddressProperties>();
export const IntlAddress = factory(function _address({properties, middleware: { theme, i18nActivityPub }}) {
	const {
		address, type = 'personal', separator: s, itemClasses = [], additionalProperties = [],
		size = 'm'
	} = properties();
	const themedCss = theme.classes(css);
	let { region } = properties();
	if (!address) { return '' }
	if (!region) {
		const locale: {region: Region} = (Intl && !!(Intl as any).Locale) ?
			new (Intl as any).Locale(i18nActivityPub.get().locale||'en-Latn-US') : 'US';
		region = locale.region;
	}

	const formattedAddress = intlAddress(address, region, type, additionalProperties);

	const contact = { telephone:1, email:1, faxNumber:1 } /* TODO profiles etc. */
	const additionalIcon: any = {
		faxNumber: 'page', availableLanguage: 'globe', hoursAvailable: 'timing'
		// contactType
		// hoursAvailable	OpeningHoursSpecification
	}
console.log('!', formattedAddress);

	const getPhoneLink = (nr: string|number) => {
		const s = `${nr}`;
		const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
		const phoneO = phoneUtil.parse(s, 'DE');
		if (!phoneUtil.isValidNumber(phoneO)) { return s }
		return <a href={`tel:${phoneUtil.format(phoneO, libphonenumber.PhoneNumberFormat.INTERNATIONAL)}`}>
			{s}
		</a>
	}

	const separator = s || <br />;
	return <span classes={[themedCss.root, theme.uiColor('cyan'), theme.uiSize(size), theme.variant()]}>
		{formattedAddress.map((a, i, addrA) => contact.hasOwnProperty(a[0].itemprop) ?
			<div classes={themedCss.contactWrapper}>
				{a.map((o) => {
					return <span classes={itemClasses} itemprop={o.itemprop}>
						{additionalIcon.hasOwnProperty(o.itemprop) &&
							<Icon type={additionalIcon[o.itemprop]} spaced="right" />
						}
						{o.itemprop === 'email' ?
							<MD components={{p:'span'}} content={o.value} /> :
							(o.itemprop === 'telephone' ? getPhoneLink(o.value) : o.value)
						}{' '}
					</span>
				})}
			</div> :
			<virtual>
				{a.map((o) => {
					return <span classes={itemClasses} itemprop={o.itemprop}>
						{additionalIcon.hasOwnProperty(o.itemprop) &&
							<Icon type={additionalIcon[o.itemprop]} spaced="right" />
						}
						{o.value}{' '}
					</span>
				})}
				{i < addrA.length - 1 && (separator||'')}
			</virtual>
		)}
	</span>;
})
export default IntlAddress;
