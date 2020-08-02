import { lang } from '../../dojo/core';
import { dumpError } from '../util';

import URL from '../url';

import i18n, { Messages } from '@dojo/framework/i18n';
import provider from './authProviders/flickr';
i18n(provider, 'de').then((locales: Messages) => {
  console.log(locales);
}, (e: Error) => {
  dumpError(e);
});
