interface mfBase {
	value?: string;
	markup?: string;
	representative?: boolean;
	$ref: string;
	type: string[];
	properties: any;
	children: any[];
}
export interface hXApp extends mfBase {}
export interface hCard extends mfBase {}

export interface indieAuthProvider { /* TODO : me.set vs. setUrl ... */
  id: string;
  url: string;
  userId: string;
  display: string;
  title: string;
  originalUrl: string;
  text: string;
  rels: string[];
  key: string;
  valid: boolean;
  errors?: any[];
  me?: {
  	templates: string[];
  	target: string;
  	set: any;
  	query: any;
  	[propName: string]: any;
  },
  svg: string;
  setUrl: string;
  [propName: string]: any;
}
export interface indieAuthProviders {
  [propName: string]: indieAuthProvider;
}
interface indieAuthBest {
  title: string;
  icon: string;
  markup: string;
  hCard: hCard;
  hXApp: hXApp;
}

interface indieAuthUrlRes {
	statusCode: number;
	data: {
		url: string;
		best: indieAuthBest;
    [propName: string]: any;
	}
}
interface indieAuthMeBest extends indieAuthBest {
  providerCount: number;
	verifyCount: number;
  providers: {
    [propName: string]: indieAuthProvider;
  }
}
interface indieAuthMeRes extends indieAuthUrlRes {
	data: {
    url: string;
    best: indieAuthMeBest;
    rels?: any;
    'rel-urls'?: any;
  }
}

export interface indieAuthData {
	date: Date|string; /* TODO : string in the end */
  client_id: indieAuthUrlRes;
  me: indieAuthUrlRes;
  [propName: string]: any;
}
