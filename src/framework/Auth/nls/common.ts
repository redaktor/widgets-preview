import has from '@dojo/framework/has/main';
const bundlePath = ((has('host-node') ? __dirname : 'src/Auth/nls') + '/common');
const locales = [ 'de' ];

const messages = {
  eSession: 'Error: Could not find a properly configured session middleware',
  eSessionSec: 'Error: Could not find a properly configured session token secret',
  eRequest: 'Error: Could not receive a "request token"',
  eAccess: 'Error: Could not exchange the given credential for an "access token"'
};
export default { bundlePath, locales, messages };
