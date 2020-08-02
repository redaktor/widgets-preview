import authorization_endpoint from '../authProviders/authorization_endpoint';
import askubuntu from '../authProviders/askubuntu';
import flickr from '../authProviders/flickr';
import github from '../authProviders/github';
import pgpkey from '../authProviders/gpg';
/* import google from '../authProviders/google'; */
import instagram from '../authProviders/instagram';
import mail from '../authProviders/mail';
/* import sms from '../authProviders/sms'; */
import stackexchange from '../authProviders/stackexchange';
import stackoverflow from '../authProviders/stackoverflow';
import superuser from '../authProviders/superuser';
import twitter from '../authProviders/twitter';
import youtube from '../authProviders/youtube';

/* TODO TS +
  DOC Providers

please note : google deprecated original google plus idea on 24th Jan 2017
It is currently not possible to use google
*/
const indieAuthProviders: any = {
  authorization_endpoint: authorization_endpoint,
  askubuntu: askubuntu,
  flickr: flickr,
  github: github,
  /* google: google, */
  instagram: instagram,
  mail: mail,
  pgpkey: pgpkey,
  /* sms: sms, */
  stackexchange: stackexchange,
  stackoverflow: stackoverflow,
  superuser: superuser,
  twitter: twitter,
  youtube: youtube
};
export default indieAuthProviders;
