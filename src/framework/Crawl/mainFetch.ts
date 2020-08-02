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
/*

*/
export default class Fetcher extends EventEmitter {

}
