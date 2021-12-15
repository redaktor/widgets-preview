import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import intlAddress, { Region, addressFormats } from './util';
export interface AddressProperties {
	address: any;
	region?: Region;
	type?: 'personal'|'business';
	separator?: string;
	itemClasses?: string | string[];
}

const factory = create({ theme, i18nActivityPub }).properties<AddressProperties>();
export const IntlAddress = factory(function _address({properties, middleware: { theme, i18nActivityPub }}) {
	const {
		address, type = 'personal', separator: s, itemClasses = []
	} = properties();
	let { region } = properties();
	if (!address) { return '' }
	if (!region) {
		const locale: {region: Region} = (Intl && !!(Intl as any).Locale) ?
			new (Intl as any).Locale(i18nActivityPub.get().locale||'en-Latn-US') : 'US';
		region = locale.region;
	}

	console.log(region, Object.keys(addressFormats));

	const separator = s || <br />;
	return <span classes={[theme.uiColor('cyan'), theme.variant()]}>
		{intlAddress(address, region, type).map((a, i, addrA) => <virtual>
			{a.map((o) => <span classes={itemClasses} itemprop={o.itemprop}>
				{o.value}{' '}
			</span>)}
			{i < addrA.length - 1 && (separator||'')}
		</virtual>)}
	</span>;
})
export default IntlAddress;
