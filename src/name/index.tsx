import { create, tsx } from '@dojo/framework/core/vdom';
import { clampStrings } from '../common/activityPubUtil';
import Paginated from '../paginated';
import theme, { ViewportProperties } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as css from '../theme/material/name.m.css';

export interface NameProperties extends ViewportProperties {
	/** The property for the named group */
	name?: string[];
	/** The max. character count, default 200 */
	characters?: number;
	/** If row, names will be paginated, default false */
	isRow?: boolean;
	/* small typo, media captions */
	compact?: boolean;
}

const factory = create({ theme })
	.properties<NameProperties>();

export const Name = factory(function Name({ properties, children, middleware: { theme } }) {
	const {
		name = [],
		characters = 200,
		isRow = false,
		compact = false,
		size = 's'
	} = properties();

	const themedCss = theme.classes(css);
	const isMini = compact || (isRow && (size === 'xs' || size === 's')) || (!isRow && size === 'xs');
	const headlineClass = compact ? ui.m : (isMini ? ui.h5 : ui.h4);
	const typoClass = isMini ? ui.s : (size === 'l' || size === 'xl' ? ui.l : ui.m);
	const singleNames = name.length < 4;

	const namesPaginated = (!isRow && singleNames) ? '' :
		<Paginated key="names" property="name">

			{clampStrings(name, characters).map((_name, i) => typeof _name !== 'string' ? name :
				<h5 key={`name${i}`} classes={[themedCss.root, typoClass]}>{_name}</h5>)}
		</Paginated>;
	return <div key="root" classes={[themedCss.root, isRow ? themedCss.row : themedCss.column, compact && themedCss.compact]}>
		{isRow ?
			namesPaginated :
			(name && singleNames ? <header key="names" classes={ui.hgroup}>
				{name.length > 1 && <p key={`name1`} classes={[themedCss.kicker, typoClass]}>{name[1]}</p>}
				<h2 key={`name0`} classes={[themedCss.name, headlineClass]}>{name[0]}</h2>
				{name.length > 2 && <p key={`name2`} classes={[themedCss.byline, typoClass]}>{name[2]}</p>}
			</header> : namesPaginated)
		}
		{children()}
	</div>
});
export default Name;
