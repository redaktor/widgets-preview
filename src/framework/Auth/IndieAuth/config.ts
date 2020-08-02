/*
  Your baseUrl:
  Must be https (!)
  This is the URL where the main page of IndieAuth is available:
*/
export const baseUrl: string = 'https://redaktor.circinus.uberspace.de/redaktornode/';
/*
  Verify external providers:
  Allow extra time to follow e.g. SILO-shortened links and for flickr :
*/
export const verifyTimeout: number = 15000;
/*
  Mail and SMS tokens expire :
*/
export const expiration = {
  mail: (5 * 60 * 1000),
  sms : (4 * 60 * 1000)
};
