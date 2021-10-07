import * as fs from 'fs';
import * as util from 'util';
import * as sharp from 'sharp';
import * as Puppeteer from 'puppeteer';
import * as EventEmitter from 'events';
import { parse } from 'url';

const devices: any = require('puppeteer/DeviceDescriptors');
const rp = require('request-promise');
// @ts-ignore
const robotsParser = require('robots-parser');

const {
  delay,
  generateKey,
  checkDomainMatch,
  getRobotsUrl,
  getSitemapUrls,
  tracePublicAPI
} = require('./helper');
const PriorityQueue = require('./priority-queue');
const Crawler = require('./crawler');
const SessionCache = require('../cache/session');

/**
 * @type CrawlerConnectProperties
 *
 * Properties that can be set on a Crawler
 *
 * @property maxConcurrency <number> Maximum number of pages to open concurrently, defaults to 10.
 * @property maxRequest <number> Maximum number of requests, defaults to 0. Pass 0 to disable the limit.
 * @property exporter <Exporter> An exporter object which extends BaseExporter's interfaces to export results, default to null.
 * @property cache <Cache> A cache object which extends BaseCache's interfaces to remember and skip duplicate requests,
                          defaults to a SessionCache object.
 * @property persistCache <boolean> Whether to clear cache on closing or disconnecting from the Chromium instance,
                          defaults to false.
 * @property preRequest(options) <Function> Function to do anything like modifying options before each request.
                          You can also return false if you want to skip the request.
 * @property options <Object> crawler.queue()'s options with default values.
 * @property customCrawl(page, crawl) <Function> Function to customize crawled result, allowing access to Puppeteer's raw API.
 * @property page <Page> Puppeteer's raw API.
 * @property crawl <Function> Function to run crawling, which resolves to the result passed to onSuccess function.
 * @property onSuccess(result) <Function> Function to be called when evaluatePage() successes.
 * @property result <Object>

 * @property redirectChain <any[]>> Redirect chain of requests.
 * @property url <string> Requested url.
 * @property headers <Object> Request headers.
 * @property cookies <any[]>> List of cookies.
 * @property name <string>
 * @property value <string>
 * @property domain <string>
 * @property path <string>
 * @property expires <number> Unix time in seconds.
 * @property httpOnly <boolean>
 * @property secure <boolean>
 * @property session <boolean>
 * @property sameSite <string> "Strict" or "Lax".
 * @property response <Object>
 * @property ok <boolean> whether the status code in the range 200-299 or not.
 * @property status <string> status code of the request.
 * @property url <string> Last requested url.
 * @property headers <Object> Response headers.
 * @property options <Object> crawler.queue()'s options with default values.
 * @property result <Serializable> The result resolved from evaluatePage() option.
 * @property screenshot <Buffer> Buffer with the screenshot image, which is null when screenshot option not passed.
 * @property links <Array<string>> List of links found in the requested page.
 * @property depth <number> Depth of the followed links.
 * @property previousUrl <string> The previous request's url. The value is null for the initial request.
 * @property onError(error) <Function> Function to be called when request fails.
 * @property error <Error> Error object.
 * @property options <Object> crawler.queue()'s options with default values.
 * @property depth <number> Depth of the followed links.
 * @property previousUrl <string> The previous request's url. The value is null for the initial request.
 */

export interface CrawlerHeaders {
  [key:string]: string;
}
export interface CrawlerCookies {
  /* Cookie name, required*/
  name: string;
  /* Cookie value, required*/
  value: string;
  url?: string;
  domain?: string;
  path?: string;
  /* Unix time in seconds. */
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  /* "Strict" or "Lax". */
  sameSite?: string;
}
export interface CrawlerViewport {
  /* Page width in pixels. */
  width: number;
  /* Page height in pixels. */
  height: number;
  /* Specify device scale factor (can be thought of as dpr). Defaults to 1. */
  deviceScaleFactor?: number;
  /* Whether the meta viewport tag is taken into account. Defaults to false. */
  isMobile?: boolean;
  /* Specifies if viewport supports touch events. Defaults to false */
  hasTouch?: boolean;
  /* Specifies if viewport is in landscape mode. Defaults to false. */
  isLandscape?: boolean;
}
export interface CrawlerScreenshotClip {
  /* x-coordinate of top-left corner of clip area */
  x: number;
  /* y-coordinate of top-left corner of clip area */
  y: number;
  /* width of clipping area */
  width: number;
  /* height of clipping area */
  height: number;
}
export interface CrawlerScreenshot {
  /* The file path to save the image to. The type will be inferred from
  file extension. If path is a relative path, then it is resolved relative to
  current working directory. If no path is provided, the image won't be saved */
  path?: string;
  /* Specify screenshot type, can be either jpeg or png. Defaults to 'png'. */
  type?: string;
  /* The quality of the image, between 0-100. Not applicable to png images. */
  quality?: number;
  /* When true, takes a screenshot of the full scrollable page. Defaults to false. */
  fullPage?: boolean;
  /* An object which specifies clipping region of the page. */
  clip?: CrawlerScreenshotClip;
  /* Hides default white background and allows capturing screenshots
  with transparency. Defaults to false. */
  omitBackground?: boolean;
  /* The encoding of the image, can be either base64 or binary. Default: binary. */
  encoding?: string;
}
export interface CrawlerWait {
  /* A selector, predicate or timeout to wait for. */
  selectorOrFunctionOrTimeout: string|number|Function;
  /* Optional waiting parameters. */
  options?: Puppeteer.WaitForSelectorOptions;
  /* List of arguments to pass to the predicate function. */
  args?: string[];
}
export interface CrawlerRedirectChain {
  url: string;
  headers: Object;
}
export interface CrawlerResponse {
  ok: boolean;
  status: string;
  url: string;
  headers: Object;
}
export interface CrawlerError {
  /* crawler.queue()'s options with default values. */
  options: any; /* TODO */
  /* Depth of the followed links. */ /* TODO SET and rel= */
  depth: number;
  /* The previous request's url. The value is null for the initial request. */
  previousUrl: string;
}
export interface CrawlerResult extends CrawlerError {
  /* Redirect chain of requests. */
  redirectChain: CrawlerRedirectChain[];
  /* List of cookies. */
  cookies: CrawlerCookies[];
  /* Response */
  response: CrawlerResponse;
  /* The result resolved from evaluatePage() option. */
  result: any;
  /* Buffer with the screenshot image, which is null when screenshot option not passed. */
  screenshot: Buffer;
  /* List of links found in the requested page. */
  links: string[];
}

export interface CrawlerLaunchProperties extends Puppeteer.LaunchOptions {

}
export interface CrawlerConnectProperties extends Puppeteer.ConnectOptions {
  /* Maximum number of pages to open concurrently, defaults to 10. */
  maxConcurrency?: number;
  /* Maximum number of requests, defaults to 0. Pass 0 to disable the limit. */
  maxRequest?: number;
  /* An exporter object which extends BaseExporter's interfaces to export results,
  default to null. */
  exporter?: any | null; /* Exporter; TODO */
  /* A cache object which extends BaseCache's interfaces to remember and skip
  duplicate requests, defaults to a SessionCache object. */
  cache?: Cache;
  /* Whether to clear cache on closing or disconnecting from the Chromium instance,
  defaults to false. */
  persistCache?: boolean;
  /* Function to do anything like modifying options before each request.
  You can also return false if you want to skip the request. */
  preRequest?: (options: CrawlerConnectProperties) => any;
  /* Function to customize crawled result, allowing access to Puppeteer's raw API. */
  customCrawl?: (page: Puppeteer.Page, crawl: Function) => any;
  /* Function to be called when evaluatePage() successes. */
  onSuccess?: (result: CrawlerResult) => void;
  /* Function to be called when request fails. */
  onError?: (error: CrawlerError) => void;
}

type PuppeteerAll = CrawlerConnectProperties & CrawlerLaunchProperties;
export interface CrawlerProperties extends PuppeteerAll {
  /* Url to navigate to. The url should include scheme, e.g. https://. */
  url: string;
  /* Maximum depth for the crawler to follow links automatically, default to 1.
  Leave default to disable following links. */
  maxDepth?: number;
  /* Basic priority of queues, defaults to 1. Any larger number is preferred. */
  priority?: number;
  /* Whether to adjust priority based on its depth, defaults to true.
  Leave default to increase priority for higher depth (depth-first search). */
  depthPriority?: boolean;
  /* Whether to skip duplicate requests, default to true. Request is considered
  to match if url, userAgent, device & extraHeaders are strictly the same. */
  skipDuplicates?: boolean;
  /* Whether to skip requests already appeared in redirect chains of requests,
  default to false. This option is ignored when skipDuplicates is set false. */
  skipRequestedRedirect?: boolean;
  /* Whether to obey robots.txt, default to true. */
  obeyRobotsTxt?: boolean;
  /* Whether to use sitemap.xml to find locations, default to false. */
  followSitemapXml?: boolean;
  /* List of domains allowed to request.
  Pass null or leave default to skip checking allowed domain */
  allowedDomains?: (string|RegExp)[] | null;
  /* List of domains not allowed to request.
  Pass null or leave default to skip checking denied domain. */
  deniedDomains?: (string|RegExp)[] | null;
  /* Number of milliseconds after each request, defaults to 0.
  When delay is set, maxConcurrency option must be 1. */ /* TODO rateLimit ? */
  delay?: number;
  /* Navigation timeout in ms, defaults to 30 seconds, pass 0 to disable. */
  timeout?: number;


  /* When to consider navigation succeeded, defaults to load.
  See the Puppeteer's page.goto()'s waitUntil options for further details. */
  waitUntil?: Puppeteer.WaitForSelectorOptions;
  /* Wait for selector. See Puppeteer's page.waitFor() for further details. */
  waitFor?: CrawlerWait;
  /* TODO

  waitFor <Object> See Puppeteer's page.waitFor() for further details.
  selectorOrFunctionOrTimeout?: string|number|function; A selecctor, predicate or timeout to wait for.
  options?: Puppeteer.WaitForSelectorOptions; Optional waiting parameters.
  args <Array<Serializable>> List of arguments to pass to the predicate function.

  */
  /* Number of limit when retry fails, defaults to 3. */
  retryCount?: number;
  /* Number of milliseconds after each retry fails, defaults to 10000. */
  retryDelay?: number;
  /* Whether to automatically add jQuery tag to page, defaults to true. */
  jQuery?: boolean;
  /* Whether to enable browser cache for each request, defaults to true. */
  browserCache?: boolean;
  /* Device to emulate. Available devices are listed here. */
  device?: keyof typeof devices;
  /* Username for basic authentication. pass null if it's not necessary. */
  username?: string | null;
  /* Screenshot option, defaults to null.
  This option is passed to Puppeteer's page.screenshot().
  Pass null or leave default to disable screenshot. */
  screenshot?: CrawlerScreenshot | null;
  /* See Puppeteer's page.setViewport() for further details. {width, height} */
  viewport?: CrawlerViewport | null;
  /* Password for basic authentication. leave or pass null if it's not necessary. */
  password?: string | null;
  /* User agent string to override in this page. */
  userAgent?: string;
  /* An object containing additional headers to be sent with every request.
  All header values must be strings. */
  extraHeaders?: CrawlerHeaders;
  /* List of cookies to be sent with every request.
  Either url or domain must be specified for each cookie. */
  cookies?: CrawlerCookies[];
  /* Function to be evaluated in browsers.
  Return serializable object.
  If it's not serializable, the result will be undefined. */
  evaluatePage?: any; /* TODO */
}

/*
static tracePublicAPI(classType) {
  const className = classType.prototype.constructor.name.toLowerCase();
  const debugClass = debug(`hccrawler:${className}`);

  Reflect.ownKeys(classType.prototype).forEach(methodName => {
    if (methodName === 'constructor' || !isString(methodName) || startsWith(methodName, '_')) return;
    const method = Reflect.get(classType.prototype, methodName);
    if (!isFunction(method)) return;
    Reflect.set(classType.prototype, methodName, function (...args) {
      const argsText = args.map(Helper.stringifyArgument).join(', ');
      debugClass(`${methodName}(${argsText})`);
      return method.call(this, ...args);
    });
  });
  if (classType.Events) {
    const method = Reflect.get(classType.prototype, 'emit');
    Reflect.set(classType.prototype, 'emit', function (event, ...args) {
      const argsText = [JSON.stringify(event)].concat(args.map(Helper.stringifyArgument)).join(', ');
      debugClass(`emit(${argsText})`);
      return method.call(this, event, ...args);
    });
  }
}
*/

export default class HeadlessCrawler extends EventEmitter {
  static Events = {
    RequestStarted: 'requeststarted',
    RequestSkipped: 'requestskipped',
    RequestDisallowed: 'requestdisallowed',
    RequestFinished: 'requestfinished',
    RequestRetried: 'requestretried',
    RequestFailed: 'requestfailed',
    RobotsTxtRequestFailed: 'robotstxtrequestfailed',
    SitemapXmlRequestFailed: 'sitemapxmlrequestfailed',
    MaxDepthReached: 'maxdepthreached',
    MaxRequestReached: 'maxrequestreached',
    Disconnected: 'disconnected',
  };

  protected _defaultOptions: CrawlerProperties = {
    maxDepth: 1,
    maxConcurrency: 10,
    maxRequest: 0,
    priority: 0,
    delay: 0,
    retryCount: 3,
    retryDelay: 10000,
    timeout: 30000,
    jQuery: true,
    browserCache: true,
    persistCache: false,
    skipDuplicates: true,
    depthPriority: true,
    obeyRobotsTxt: true,
    followSitemapXml: false,
    skipRequestedRedirect: false,
    cookies: [],
    screenshot: null,
    viewport: null,
    url: ''
  }

  /**
   * @param {!Puppeteer.Browser} browser
   * @param {!Object} options
   */
  constructor(
    public options: CrawlerConnectProperties,
    protected _browser: Puppeteer.Browser,
    private _options: any = {},
    private _cache: any = {},
    private _queue: any = {},
    private _exporter: any = {},
    private _preRequest: any = null,
    private _requestedCount: number = 0,
    private _onSuccess: any = null,
    private _onError: any = null,
    private _customCrawl: any = null
  ) {
    super();

    this._options = Object.assign(this._options, options);
    this._cache = options.cache || new SessionCache();
    this._queue = new PriorityQueue({
      maxConcurrency: this._options.maxConcurrency,
      cache: this._cache,
    });
    this._exporter = options.exporter || null;
    this._requestedCount = 0;
    this._preRequest = options.preRequest || null;
    this._onSuccess = options.onSuccess || null;
    this._onError = options.onError || null;
    this._customCrawl = options.customCrawl || null;
    this._exportHeader();

    this._queue.on('pull', (
      _options: CrawlerConnectProperties, depth: number, previousUrl: string
    ) => this._startRequest(_options, depth, previousUrl));
    this._browser.on('disconnected', () => void this.emit(HeadlessCrawler.Events.Disconnected));
  }

  /**
   * @param {!Object=} options
   * @return {!Promise<!HeadlessCrawler>}
   */
  static async launch(options: CrawlerLaunchProperties & CrawlerProperties) {
    const {
      ignoreHTTPSErrors, headless, executablePath, slowMo, args, ignoreDefaultArgs,
      handleSIGINT, handleSIGTERM, handleSIGHUP, dumpio, userDataDir, env, devtools,
      ...CRAWL
    } = options;
    const LAUNCH: Puppeteer.LaunchOptions = {
      ignoreHTTPSErrors, headless, executablePath, slowMo, args, ignoreDefaultArgs,
      handleSIGINT, handleSIGTERM, handleSIGHUP, dumpio, userDataDir, env, devtools
    }
    const browser = await Puppeteer.launch(LAUNCH);
    const crawler = new HeadlessCrawler(CRAWL, browser);
    await crawler.init();
    return crawler;
  }

  /**
   * @param {!Object=} options
   * @return {!Promise<!HeadlessCrawler>}
   */
  static async connect(options: Puppeteer.ConnectOptions) {
    const { browserWSEndpoint, ignoreHTTPSErrors, ...CRAWL } = options;
    const CONNECT = { browserWSEndpoint, ignoreHTTPSErrors };
    const browser = await Puppeteer.connect(CONNECT);
    const crawler = new HeadlessCrawler(CRAWL, browser);
    await crawler.init();
    return crawler;
  }

  /**
   * @return {!string}
   */
  static executablePath() {
    return Puppeteer.executablePath();
  }

  /**
   * @return {!Array<!string>}
   */
  static defaultArgs() {
    return Puppeteer.defaultArgs();
  }


  /**
   * @return {!Promise}
   */
  async init() {
    await this._cache.init();
    this._queue.init();
  }

  /**
   * @param {?Object|?Array<!string>|?string} options
   * @return {!Promise}
   */
  async queue(optionsOrURIs: string | any[]) {
    const options = Array.isArray(optionsOrURIs) ? optionsOrURIs : [optionsOrURIs];
    const queued = (options).map(async (_option) => {
      const queueOption = typeof _option === 'string' ? { url: _option } : _option;

      const CONSTRUCTOR_OPTIONS = [
        'browserWSEndpoint', 'ignoreHTTPSErrors', 'slowMo', 'ignoreHTTPSErrors',
        'headless', 'executablePath', 'slowMo', 'args', 'ignoreDefaultArgs',
        'handleSIGINT', 'handleSIGTERM', 'handleSIGHUP', 'dumpio', 'userDataDir',
        'env', 'devtools',

        'maxConcurrency', 'maxRequest', 'cache', 'exporter', 'persistCache',
        'preRequest', 'onSuccess', 'onError', 'customizeCrawl',
      ];
      CONSTRUCTOR_OPTIONS.forEach(option => {
        if (queueOption && queueOption[option]) {
          throw new Error(`Overriding ${option} is not allowed!`)
        }
      });
      const mergedOptions = Object.assign({}, this._options, queueOption);
      if (mergedOptions.evaluatePage) {
        mergedOptions.evaluatePage = `(${mergedOptions.evaluatePage})()`
      }
      if (!mergedOptions.url) {
        throw new Error('Url must be defined!');
      }
      if (mergedOptions.device && mergedOptions.device !== 'default' &&
        !devices[mergedOptions.device]) {
          throw new Error('Specified device is not supported!');
      }
      if (mergedOptions.delay > 0 && mergedOptions.maxConcurrency !== 1) {
        throw new Error('Max concurrency must be 1 when delay is set!')
      }
      mergedOptions.url = parse(mergedOptions.url).href;
      await this._push(omit(mergedOptions, CONSTRUCTOR_OPTIONS), 1, null);
    });
    await Promise.all(queued)
  }

  /**
   * @return {!Promise}
   */
  async close() {
    this._queue.end();
    await this._browser.close();
    await this._endExporter();
    await this._clearCacheOnEnd();
    await this._closeCache();
  }

  /**
   * @return {!Promise}
   */
  async disconnect() {
    this._queue.end();
    await this._browser.disconnect();
    await this._endExporter();
    await this._clearCacheOnEnd();
    await this._closeCache();
  }

  /**
   * @return {!Promise<!string>}
   */
  version() {
    return this._browser.version();
  }

  /**
   * @return {!Promise<!string>}
   */
  userAgent() {
    return this._browser.userAgent();
  }

  /**
   * @return {!string}
   */
  wsEndpoint() {
    return this._browser.wsEndpoint();
  }

  /**
   * @return {!Promise}
   */
  async onIdle() {
    await this._queue.onIdle();
  }

  /**
   * @param {!number} maxRequest
   */
  setMaxRequest(maxRequest: number) {
    this._options.maxRequest = maxRequest;
  }

  pause() {
    this._queue.pause();
  }

  resume() {
    this._queue.resume();
  }

  /**
   * @return {!Promise}
   */
  async clearCache() {
    await this._cache.clear();
  }

  /**
   * @return {!boolean}
   */
  isPaused() {
    return this._queue.isPaused();
  }

  /**
   * @return {!Promise<!number>}
   */
  queueSize() {
    return this._queue.size();
  }

  /**
   * @return {!number}
   */
  pendingQueueSize() {
    return this._queue.pending();
  }

  /**
   * @return {!number}
   */
  requestedCount() {
    return this._requestedCount;
  }

  /**
   * @param {!Object} options
   * @return {!Promise<!Crawler>}
   * @param {!number} depth
   * @param {string} previousUrl
   * @private
   */
  async _newCrawler(options: any, depth: number, previousUrl: string) {
    const page = await this._browser.newPage();
    return new Crawler(page, options, depth, previousUrl);
  }
  /**
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @return {!Promise}
   */
  async _push(options: any, depth: number, previousUrl: string) {
    let { priority } = options;
    if (!priority && options.depthPriority) priority = depth;
    await this._queue.push(options, depth, previousUrl, priority);
  }

  /**
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @return {!Promise}
   * @private
   */
  async _startRequest(options: any, depth: number, previousUrl: string) {
    const skip = await this._skipRequest(options);
    if (skip) {
      this.emit(HeadlessCrawler.Events.RequestSkipped, options);
      await this._markRequested(options);
      return;
    }
    const allowed = await this._checkAllowedRobots(options, depth, previousUrl);
    if (!allowed) {
      this.emit(HeadlessCrawler.Events.RequestDisallowed, options);
      await this._markRequested(options);
      return;
    }
    await this._followSitemap(options, depth, previousUrl);
    const links = await this._request(options, depth, previousUrl);
    this._checkRequestCount();
    await this._followLinks(links, options, depth);
    await delay(options.delay);
  }

  /**
   * @param {!Object} options
   * @return {!Promise<!boolean>}
   * @private
   */
  async _skipRequest(options: any) {
    const allowedDomain = this._checkAllowedDomains(options);
    if (!allowedDomain) return true;
    const requested = await this._checkRequested(options);
    if (requested) return true;
    const shouldRequest = await this._shouldRequest(options);
    if (!shouldRequest) return true;
    return false;
  }

  /**
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @param {!number=} retryCount
   * @return {!Promise<!Array<!string>>}
   * @private
   */
  async _request(options: any, depth: number, previousUrl: string, retryCount = 0) {
    this.emit(HeadlessCrawler.Events.RequestStarted, options);
    const crawler = await this._newCrawler(options, depth, previousUrl);
    try {
      const res = await this._crawl(crawler);
      await crawler.close();
      this.emit(HeadlessCrawler.Events.RequestFinished, options);
      const requested = await this._checkRequestedRedirect(options, res.response);
      await this._markRequested(options);
      await this._markRequestedRedirects(options, res.redirectChain, res.response);
      if (requested) return [];
      this._exportLine(res);
      await this._success(res);
      return res.links;
    } catch (error) {
      await crawler.close();
      Object.assign(error, { options, depth, previousUrl });
      if (retryCount >= options.retryCount) {
        this.emit(HeadlessCrawler.Events.RequestFailed, error);
        await this._error(error);
        return [];
      }
      this.emit(HeadlessCrawler.Events.RequestRetried, options);
      await delay(options.retryDelay);
      return this._request(options, depth, previousUrl, retryCount + 1);
    }
  }

  /**
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @return {!Promise<!boolean>}
   * @private
   */
  async _checkAllowedRobots(options: any, depth: number, previousUrl: string) {
    if (!options.obeyRobotsTxt) return true;
    const robot = await this._getRobot(options, depth, previousUrl);
    const userAgent = await this._getUserAgent(options);
    return robot.isAllowed(options.url, userAgent);
  }

  /**
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @return {!Promise}
   * @private
   */
  async _followSitemap(options: any, depth: number, previousUrl: string) {
    if (!options.followSitemapXml) return;
    const robot = await this._getRobot(options, depth, previousUrl);
    const sitemapUrls = robot.getSitemaps();

    await Promise.resolve(sitemapUrls.map(async (sitemapUrl: string) => {
      const sitemapXml = await this._getSitemapXml(sitemapUrl, options, depth, previousUrl);
      const urls = getSitemapUrls(sitemapXml);
      await Promise.all(urls.map(async (url: string) => {
        await this._push(Object.assign({}, options, { url }), depth, options.url);
      }));
    }));
  }

  /**
   * @param {!string} sitemapUrl
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @return {!Promise<!string>}
   */
  async _getSitemapXml(sitemapUrl: string, options: any, depth: number, previousUrl: string) {
    let sitemapXml = await this._cache.get(sitemapUrl);
    if (!sitemapXml) {
      try {
        sitemapXml = await rp(sitemapUrl);
      } catch (error) {
        Object.assign(error, { options, depth, previousUrl });
        this.emit(HeadlessCrawler.Events.SitemapXmlRequestFailed, error);
        sitemapXml = '';
      } finally {
        await this._cache.set(sitemapUrl, '1');
      }
    }
    return sitemapXml;
  }

  /**
   * @param {!Object} options
   * @param {!number} depth
   * @param {string} previousUrl
   * @return {!Promise}
   * @private
   */
  async _getRobot(options: any, depth: number, previousUrl: string) {
    const robotsUrl = getRobotsUrl(options.url);
    let robotsTxt = await this._cache.get(robotsUrl);
    if (!robotsTxt) {
      try {
        robotsTxt = await rp(robotsUrl);
      } catch (error) {
        Object.assign(error, { options, depth, previousUrl });
        this.emit(HeadlessCrawler.Events.RobotsTxtRequestFailed, error);
        robotsTxt = '';
      } finally {
        await this._cache.set(robotsUrl, robotsTxt);
      }
    }
    return robotsParser(robotsUrl, robotsTxt);
  }

  /**
   * @param {!Object} options
   * @return {!Promise<!string>}
   * @private
   */
  async _getUserAgent(options: any) {
    if (options.userAgent) return options.userAgent;
    if (devices[options.device]) return devices[options.device].userAgent;
    return this.userAgent();
  }

  /**
   * @param {!Object} options
   * @return {!boolean}
   * @private
   */
  _checkAllowedDomains(options: any) {
    const { hostname } = parse(options.url);
    if (options.deniedDomains && checkDomainMatch(options.deniedDomains, hostname)) return false;
    if (options.allowedDomains && !checkDomainMatch(options.allowedDomains, hostname)) return false;
    return true;
  }

  /**
   * @param {!Object} options
   * @return {!Promise<!boolean>}
   * @private
   */
  async _checkRequested(options: any) {
    if (!options.skipDuplicates) return false;
    const key = generateKey(options);
    const value = await this._cache.get(key);
    return !!value;
  }

  /**
   * @param {!Object} options
   * @param {!Object} response
   * @return {!Promise<!boolean>}
   * @private
   */
  async _checkRequestedRedirect(options: any, response: any) {
    if (!options.skipRequestedRedirect) return false;
    const requested = await this._checkRequested(Object.assign({}, options, { url: response.url }));
    return requested;
  }

  /**
   * @param {!Object} options
   * @return {!Promise}
   * @private
   */
  async _markRequested(options: any) {
    if (!options.skipDuplicates) return;
    const key = generateKey(options);
    await this._cache.set(key, '1');
  }

  /**
   * @param {!Object} options
   * @param {!Array<!Object>} redirectChain
   * @param {!Object} response
   * @return {!Promise}
   * @private
   */
  async _markRequestedRedirects(options: any, redirectChain: any, response: any) {
    if (!options.skipRequestedRedirect) return;
    await Promise.all(redirectChain.map(async (request: any) => {
      await this._markRequested(Object.assign({}, options, { url: request.url }));
    }));
    await this._markRequested(Object.assign({}, options, { url: response.url }));
  }

  /**
   * @param {!Object} options
   * @return {!Promise<?boolean>}
   * @private
   */
  async _shouldRequest(options: any) {
    if (!this._preRequest) return true;
    return this._preRequest(options);
  }

  /**
   * @param {!Object} result
   * @return {!Promise}
   * @private
   */
  async _success(result: any) {
    if (!this._onSuccess) return;
    await this._onSuccess(result);
  }

  /**
   * @param {!Error} error
   * @return {!Promise}
   * @private
   */
  async _error(error: Error) {
    if (!this._onError) return;
    await this._onError(error);
  }


  /**
   * @param {!Crawler} crawler
   * @return {!Promise<!Object>}
   */
  async _crawl(crawler: any) {
    if (!this._customCrawl) return crawler.crawl();
    const crawl = () => crawler.crawl.call(crawler);
    return this._customCrawl(crawler.page(), crawl);
  }

  /**
   * @param {!Array<!string>} urls
   * @param {!Object} options
   * @param {!number} depth
   * @return {!Promise}
   * @private
   */
  async _followLinks(urls: string[], options: any, depth: number) {
    if (depth >= options.maxDepth) {
      this.emit(HeadlessCrawler.Events.MaxDepthReached);
      return;
    }
    await Promise.all(urls.map(async url => {
      const _options = Object.assign({}, options, { url });
      const skip = await this._skipRequest(_options);
      if (skip) return;
      await this._push(_options, depth + 1, options.url);
    }));
  }

  /**
   * @private
   */
  _checkRequestCount() {
    this._requestedCount += 1;
    if (this._options.maxRequest && this._requestedCount >= this._options.maxRequest) {
      this.emit(HeadlessCrawler.Events.MaxRequestReached);
      this.pause();
    }
  }

  /**
   * @private
   */
  _exportHeader() {
    if (!this._exporter) return;
    this._exporter.writeHeader();
  }

  /**
   * @param {!Object} res
   * @private
   */
  _exportLine(res: any) {
    if (!this._exporter) return;
    this._exporter.writeLine(res);
  }

  /**
   * @return {!Promise}
   * @private
   */
  async _endExporter() {
    if (!this._exporter) return;
    await new Promise((resolve, reject) => {
      this._exporter.onEnd().then(resolve).catch(reject);
      this._exporter.writeFooter();
      this._exporter.end();
    });
  }

  /**
   * @return {!Promise}
   * @private
   */
  async _clearCacheOnEnd() {
    if (this._options.persistCache) return;
    await this.clearCache();
  }

  /**
   * @return {!Promise}
   * @private
   */
  async _closeCache() {
    await this._cache.close();
  }
}

tracePublicAPI(HeadlessCrawler);

module.exports = HeadlessCrawler;
