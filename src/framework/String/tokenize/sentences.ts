import line from '../regex/regexLine';
import punctuations from '../regex/regexPunctuations';
import periodDigit from '../regex/regexPeriodDigit';
import periodPrefix from '../regex/regexPeriodPrefix';
import isAbbreviation from '../regex/abbreviation';

/*
async function renderWidget() {
    const container = document.getElementById("widget");
    if (container !== null) {
        const widget = await import("./widget");
        widget.render(container);
    }
}

renderWidget();


export const periodPrefixes: any = `id|xy|${TLDs}|${fileExtensions}`;
new RegExp(String.raw`\b(${abbreviations})[.] ?$`, 'i')
*/

export default function splitSentences(s: string) {
  const text = `${s}`;
  let sentences: string[] = [];
  if (!text) { return sentences }
  const chunks = [];
  const splits = [];
  // first, split by newline
  const lines = text.split(line);
  const l = lines.length;
  for (let i = 0; i < l; i++) {
    // split by period, question-mark, and exclamation-mark
    const arr = lines[i].split(punctuations);
    for (let o = 0; o < arr.length; o++) { splits.push(arr[o]) }
  }
  // filter-out the grap ones
  for (let i = 0; i < splits.length; i++) {
    let s: any = splits[i]
    if (!s || !s.length) { continue }
    // this is meaningful whitespace
    if (!s) {
      // add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) {
        // add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    }
    // else, only whitespace, no terms, no sentence
    chunks.push(s)
  }
  // detection of non-sentence chunks:
  // loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    const c: string = chunks[i];
    const isOK = periodDigit.test(c);
    const isAbbr = isAbbreviation(c); /*|| this.i18n.periodSuffix.test(c.trim());*/// FIXME

    console.log(c, isOK, isAbbr);

    // should this chunk be combined with the next one?
    let isAbbrChunk = i < chunks.length-1 && !isOK && !!isAbbr;
    if (!isAbbrChunk && i < chunks.length-1) {
      const lastW = c.match(/\b(\w+)\W*$/);
      const abbrMulti = `${lastW && lastW[1] ? lastW[1] : ''}${chunks[i + 1] || ''}`
        .replace(/\s|[.]/g,'');
      //isAbbrChunk = (`${this.i18n.abbreviations}|`.indexOf(`${abbrMulti}|`) > -1); // FIXME
    }

    /* TODO FIXME
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
    if (isAbbrChunk) {
      chunks[i + 1] = c + (chunks[i + 1] || '');
    } else if (c && c.length > 0) {
      // this chunk is a proper sentence..
      sentences.push(c);
      chunks[i] = '';
    }
    if (i > 0 && periodPrefix.test(c)) { // TODO
      chunks[i - 1] = chunks[i - 1] + c;
      chunks[i] = '';
    }
  }
  // if we never got a sentence, return the given text
  return (sentences.length === 0) ? [text] : sentences
}
