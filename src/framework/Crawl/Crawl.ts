import * as Puppeteer from 'puppeteer';

export class Content {
	/**
   * @param {!Puppeteer.Page} page
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   */
	constructor (protected page: Puppeteer.Page, options: any, depth: number, previousUrl: string
		//protected root: any = {}, protected options: PatchOptions = POINTER_OPTIONS
	) {
	//	this.options = {...{}, ...POINTER_OPTIONS, ...options};
	}


}
export default Content;
