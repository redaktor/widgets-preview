import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import * as css from '../theme/material/smoke.m.css';
export type Smoking = 'yes'|'no'|'dedicated'|'separated'|'isolated'|'outside';
export interface SmokeProperties { smoking?: Smoking; }

const noSmokingO = { 'xmlns:xlink': 'http://www.w3.org/1999/xlink', 'xml:space': 'preserve' }
const noSmoking = <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="28px" height="28px" viewBox="0 0 56 56" enable-background="new 0 0 56 56" {...noSmokingO}>
<g id="g5" transform="translate(-30.253,-31.61)">
	<rect fill="var(--text,#000000)" x="38.491" y="55.423" width="25.204" height="4.03"/>
	<path ill="none" stroke="var(--text,#000000)" stroke-width="1.3509" stroke-linejoin="round" stroke-miterlimit="10" d="
		M55.808,39.323c-2.393,0-3.368,1.937-3.368,3.431c0,1.702,1.399,3.535,4.054,3.379c-0.918,1.558-0.113,4.089,2.062,4.089
		c0.008,0,3.629,0,3.629,0c1.937,0,2.939,1.029,2.939,2.62v1.851"/>
	<path fill="none" stroke="var(--text,#000000)" stroke-width="1.3509" stroke-linejoin="round" stroke-miterlimit="10" d="
		M56.97,40.638c2.432,0,4.047,1.689,4.047,3.759c0,0.801-0.303,1.77-0.91,2.609h2.146c3.117,0,4.978,2.598,4.978,5.201v2.484"/>
	<line fill="none" stroke="var(--text,#000000)" stroke-width="1.3509" stroke-linejoin="round" stroke-miterlimit="10" x1="65.124" y1="55.358" x2="65.124" y2="59.438"/>
	<line fill="none" stroke="var(--text,#000000)" stroke-width="1.3509" stroke-linejoin="round" stroke-miterlimit="10" x1="67.235" y1="55.358" x2="67.235" y2="59.438"/>
	<rect x="55.706" y="38.25" fill="var(--bg,#FFFFFF)" width="1.35" height="3.341"/>
	<line fill="none" stroke="var(--bg,#FFFFFF)" stroke-width="5.6341" stroke-miterlimit="10" x1="67.989" y1="69.258" x2="38.974" y2="40.246"/>
	<path fill="none" stroke="#DC0005" stroke-width="5.0195" stroke-miterlimit="10" d="M53.307,74.807
		c-11.048,0-20.004-8.957-20.004-20.004c0-11.048,8.956-20.004,20.004-20.004c11.047,0,20.002,8.956,20.002,20.004
		C73.312,65.85,64.355,74.807,53.307,74.807z"/>
	<path fill="none" stroke="var(--text,#000000)" stroke-width="5.0195" stroke-miterlimit="10" d="M53.307,54.803"/>
	<line fill="none" stroke="#DC0005" stroke-width="5" stroke-miterlimit="10" x1="67.939" y1="69.227" x2="38.925" y2="40.214"/>
</g>
</svg>;

const factory = create({theme}).properties<SmokeProperties>();
export const Smoke = factory(function smoke({middleware: {theme}, properties}) {
	const { smoking = 'yes' } = properties();
	const themedCss = theme.classes(css);
	return <div classes={[themedCss.root, smoking !== 'yes' && css[smoking]]}>
	  {smoking === 'no' ? noSmoking : <div classes={themedCss.smokeWrapper}></div>}
	</div>
});

export default Smoke;
