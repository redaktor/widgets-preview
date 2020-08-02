const locales = {
  de: () => import('./de')
};

/* TODO FIXME - consolidate TPL for MailAuth ! */
const messages = {
  codeName: 'GPG message',
  messageForm: 'GPG - Sign this token with your private key',

  missingProp: 'Missing property:',
  missingKey: 'Missing public key: No GPG public key found',
  rejected: 'The GPG signature did not match !'
};
export default { locales, messages };
