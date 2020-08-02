import { each } from '../Collection/each';

const REGEXPS: any = {
	default: /\S/,
  punctuations: /(\S.+?[.!?])(?=\s+|$)/g,
  line: /(\n+)/,
  periodDigit: /\d[.]\s*?$/,
  /* abbreviation  :: */
  oneLetter: /(^|\s|\.)[a-z][.]\s*?$/i,
  noVowel: /(^|\s|\.)[^aeiouy]+[.]\s*?$/i,
  acronym: /[ |.][A-Z].?( *)?$/i,
  ellipsis: /[.]\.+( +)?$/,
}
function splitBy(s: string, rName = 'default') {
  if (!REGEXPS[rName]) { return [s] }
  return array(s.split(REGEXPS[rName]))
}
export async function $splitSentences(text: string, sentences: string[] = []) {
    const s = String(text);
    if (!s) { return sentences }
    const chunks = array();
    // split by newline and punctuations
    const splits = splitBy(s, 'line').map((l) => splitBy(l, 'punctuations'))//.flatten();
    console.log(splits);
    // filter-out the grap ones
    each(splits, (sp, i, _a, next, stop) => {
    	if (!sp) { return next }
      // this is meaningful whitespace, add it to the last one or the next one ?
      if (!/\S/.test(sp)) {
        if (chunks[-1]) {
          chunks[-1] += sp;
          return next
        } else {
        	const nI = i + 1;
          if (splits[nI]) {
            splits[nI] = `${sp}${splits[nI]}`;
            return next
          }
        }
      } // else, only whitespace, no terms, no sentence
      chunks.push(sp)
    });
    console.log('c2', chunks); throw('')

		//const periodSuffix, abbreviations


    // detection of non-sentence chunks:
    // loop through these chunks, and join the non-sentence chunks back together ...
    /*
    each(chunks, (c, i, _a, next, stop) => {
    	const isOK = itIs(c,'periodDigit');
      const isAb = itIs(c,'abbreviation') || this.i18n.periodSuffix.test(c.trim());
      // should this chunk be combined with the next one?
      let isAbbrChunk = i < chunks.length-1 && !isOK && !!isAb;
      if (!isAbbrChunk && i < chunks.length-1) {
      	const lastW = c.match(/\b(\w+)\W*$/)[1] || '';
  			const abbrMulti = `${lastW}${chunks[i + 1] || ''}`.replace(/\s|[.]/g,'');
        isAbbrChunk = (`${this.i18n.abbreviations}|`.indexOf(`${abbrMulti}|`) > -1);
      }
      // TODO here
      if (isAbbrChunk) {
        chunks[i + 1] = c + (chunks[i + 1] || '');
      } else if (c && c.length > 0) {
        // this chunk is a proper sentence..
        sentences.push(c);
        chunks[i] = '';
      }
      if (i > 0 && !!itIs(c,'periodPrefix')) { // TODO
      	chunks[i - 1] = chunks[i - 1] + c;
        chunks[i] = '';
      }
    })
    */
    /* TODO FIXME extended checks
      -> isAbbrDigitChunk (e.g. lists - "2. Do a task" OR latin order 132. item)
      -> date // digit MIKE - SUN digit etc
      sun|jan|
      -> place
      in|mass|
      -> other
      is|as|
      '	foot
      '	minute
      ''	inch
      ''	second
    */
    // if we never got a sentence, return the given text
    return (!sentences.length) ? [text] : sentences
  }
