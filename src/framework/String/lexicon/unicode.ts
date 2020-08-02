// a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek
// unicode characters to english ascii.
// approximate visual (not semantic or phonetic) relationship between
// unicode and ascii characters :
// http://en.wikipedia.org/wiki/List_of_Unicode_characters
// https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E

/*
// https://code.djangoproject.com/browser/django/trunk/django/contrib/admin/media/js/urlify.js
// currency
'€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
'₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee',
'₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
'₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
'₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
'円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
"$": 'dollar', '₹': 'indian rupee',
// symbols
'©':'(c)', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': '(r)', '†': '+',
'“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', 'ƒ': 'f', '™': 'tm',
'℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a', '•': '*',
'∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
'<': 'less', '>': 'greater',
*/

let compact: any = {
  '_': 'ـ',
  '!': '¡',
  '?': '¿Ɂ',
  'and': '&',
  '0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'۸','9':'٩',
  A: 'ĀĂĄǍǞǠǺȀȂȦȺΆΑΔΛАѦӐӒÀÁÂÃÅẠẢẤẦẨẪẬẮẰẲẴẶɅ',
  a: 'ªàáâãåāăąǎǟǡǻȁȃȧάαλаѧӑӓƛạảấầẩẫậắằẳẵặآأاى',
  ae: 'ÄäæÆ',
  B: 'ÞɃƁƂƄΒϦБЪЬѢҌҔƤ',
  b: 'ßþƀƃƅβϐϧбъьѣҍҕƥƾب',
  C: 'ÇĆĈĊČƆƇȻϽϾϿϹЄҀҪ',
  c: '¢©çćĉċčɔƈȼͻͼͽϲєҁҫ',
  Ch: 'Ч', ch: 'ч', Cz: 'Ц', cz: 'ц',
  D: 'ДÐĎĐƉƊƋǷ',
  d: 'дδðďđɖɗȡƌƿدض', dh: 'ذ',
  E: 'ÈÉÊËĒĔĖĘĚƎƏƐȄȆȨɆΈΕΞΣΡЀЕЭҼҾӖӘӚӬẸẺẼẾỀỂỄỆ',
  e: 'èéêëēĕėęěǝəɛȅȇȩɇέεξσϱϵ϶ѐеэҽҿӗәӛӭẹẻẽếềểễệءعэ',
  F: 'ФƑϜӺҒӶ',
  f: 'φƒϝӻғӷſفф',
  G: 'ГĜĞĠĢƓǤǦǴ',
  g: 'гĝğġģɠǥǧǵ', gh: 'غ',
  H: 'ХĤĦǶȞΉΗЂЊЋНҢҤҺӉ',
  h: 'хĥħƕȟήηђњћнңҥһӊحه',
  I: 'ИÌÍÎÏĨĪĬĮİIƖƗȈȊΊΪΪІЇỈỊ',
  i: 'иìíîïĩīĭįi̇ıɩɨȉȋίΐϊιіїỉịإ',
  J: 'ЙĴJ̌ɈͿĲЈ',
  j: 'йĴĵǰȷɉϳјĳج',
  K: 'ĶƘǨΚЌКҚҜҞҠ',
  k: 'ķĸƙǩκќкқҝҟҡك', kh: 'خ',
  L: 'ЛĹĻĽĿŁȽǏΙӀ',
  l: 'лĺļľŀłƚƪǀǐȴιӏل',
  M: 'ΜϺМӍ',
  m: 'μϻмӎم',
  N: 'НÑŃŅŇʼNŊƝȠǸΝΠΉΗϞЍЙҊӅӢӤ',
  n: 'нñńņňŉŋɲƞǹȵνπήηϟѝйҋӆӣӥن',
  O: 'ÒÓÔÕØÐŌŎŐƟƠǑǪǬǾȌȎȪȬȮȰΌΘΟΣΦϘϬϴОѲӦӨӪΏŒỌỎỐỒỔỖỘỚỜỞỠỢ',
  o: 'òóôõøðōŏőɵơǒǫǭǿȍȏȫȭȯȱόθοσϕϙϭоѳӧөӫ¤ƍώœọỏốồổỗộớờởỡợ',
  oe: 'Öö',
  P: 'ПƤǷΡϷҎÞ',
  p: 'пƥƿρϸϼҏþ',
  Q: 'Ɋ',
  q: 'ɋق',
  R: 'РŔŖŘƦȐȒɌЃҐر',
  r: 'рŕŗřʀȑȓɍѓґ',
  S: 'СŚŜŞŠƧȘⱾΣϚϞϨЅ',
  s: 'сśŝşšƨșȿςϛϟϩѕسص',
  Sh: 'Ш', sh: 'шش', Shh: 'Щ', shh: 'щ',
  ss: 'ßẞ',
  T: 'ŢŤŦƬƮȚȾΓΤϮТҬ',
  t: 'ţťŧƫƭʈțȶⱦγτϯт҂ҭةتط', th: 'ث',
  U: 'УΜÙÚÛŨŪŬŮŲƯƱƲǓǕǗǙǛȔȖɄΫ́ΫΎΘЏҴҶӋӇỤỦỨỪỬỮỰ',
  u: 'уµùúûũūŭůųưʊʋǔǖǘǚǜȕȗʉΰμυϋύϑџҵҷӌӈụủứừửữự',
  Ue: 'ÜŰ',
  ue: 'üű',
  V: 'ВѴѶ',
  v: 'вνѵѷ',
  W: 'ŴƜΩΏΠϢѠѾ',
  w: 'ŵɯωώϖϣѡѿؤو',
  X: 'ΧϏΚҲӼӾ',
  x: '×χϗϰҳӽӿ',
  Y: 'ÝŸŶƳȲɎΎΥΫΓΨЎѰҮҰӮӰӲỲỴỶỸЫ',
  y: 'ýÿŷƴȳɏύυϋγψϒϓϔўѱүұӯӱӳỳỵỷỹئيы',
  Ya: 'Я', ya: 'я', Yo: 'Ё', yo: 'ё', Yu: 'Ю', yu: 'ю',
  Z: 'ŹŻŽƩƵȤⱿΖЗ',
  z: 'źżžʃƶȥɀζزظз',
  Zh: 'Ж',
  zh: 'ж'
};
// decompress data
let unicode: any = {};
for (const k in compact) {
  compact[k].split('').map((s: string) => { unicode[s] = k })
}
export default unicode;
/*
function killUnicode(str: string) {
  return Array.from(str).map((s: string) => (!!unicode[s] ? unicode[s] : s)).join('');
};
*/
