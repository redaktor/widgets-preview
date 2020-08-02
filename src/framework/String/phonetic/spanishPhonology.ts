import fromStringOrArray from './fromStringOrArray';
/**
 * spanish-pronunciation-rules-php -
 * a PHP function that converts a Spanish word (UTF-8 encoded) into IPA phonetic transcription symbols.
 * Supported locales: ES (Spain), MX (Mexico)
 * Written by Timur Baytukalov, http://easypronunciation.com/en/
 * Contact me at: http://easypronunciation.com/en/contacts
 * License: http://www.gnu.org/licenses/gpl.html
 * @version 0.1
 *
 * JS port from https://github.com/easypronunciation/spanish-pronunciation-rules-php
 *
 * Sample usage:
 * const ipa = convert_spanish_word_to_phonetic_transcription ('amigo', 'ES'); // returns 'amiɣo'
 */

const replacements: any = {
 a:'a', á:'A', e:'e', é:'E', f:'f', h:'', í:'I', j:'x', k:'k', m:'m', ñ:'ɲ',
 o:'o', ó:'O', p:'p', q:'k', t:'t', ú:'U', w:'w'
};
const replaceRegex: RegExp = new RegExp(`[${Object.keys(replacements).join(']|[')}]`, 'g');
// regular expression pattern to check if we have a word:
const wordRegex = new RegExp('[A-Za-zÀ-ÿ]');
// localized pronunciation variants:
const localizedVars: any = { ES: 'θ', MX: 's' };
const codes: any = {
  transcripts: {m:1, n:1, ɲ:1},
  vowels: { a:1, e:1, i:1, o:1, u:1, á:1, é:1, í:1, ó:1, ú:1 },
  s_z: { l:1, m:1, n:1, b:1, d:1, g:1 },
  n_m: { b:1, f:1, m:1, p:1, v:1 },
  _c_and_g: { e:1, i:1, é:1, í:1 },
  _i: { a:1, e:1, o:1, u:1, á:1, é:1, ó:1, ú:1 },
  _u: { a:1, e:1, o:1, i:1, á:1, é:1, ó:1, í:1 },
  _n: { g:1,j:1,k:1,qu:1,qú:1 },
  _n_: { ch:1, hí:1, hi:1, ll:1},
  _nc: { a:1, o:1, u:1, á:1, ó:1, ú:1 },
  _r: {n:1,l:1,s:1}
};
function spanishPhonetic (word: string, index?: number, arr?: any[], locale = 'ES') {
	if (!word.match(wordRegex)) { return ''	}
  const values: string[] = [];
	word = word.toLowerCase();
  const l = word.length;
  loop: for (let i = 0; i < l; i++) {
    const [prev, char, next] = [word.charAt(i-1), word.charAt(i), word.charAt(i+1)];
    const lastValue = values[values.length - 1];
    // if letter is pronounced the same way by all Spanish speakers:
    if (replacements[char]) {
			values.push(replacements[char]);
			continue loop;
		}
    switch (char) {
      case 'z':
        values.push(localizedVars[locale]);
			continue loop;
      case 'b':
      case 'v':
        values.push((!i || codes.transcripts[lastValue]) ? 'b' : 'β');
      continue loop;
      case 'c':
        if (codes._c_and_g[word.charAt(i+1)]) {
          values.push(localizedVars[locale]);
          continue loop;
        }
        if (word.charAt(i+1) === 'h') {
          values.push('ʧ');
          i++;
          continue loop;
        }
        values.push('k');
      continue loop;
      case 'd':
        values.push((!i || lastValue === 'n' || lastValue === 'l') ? 'd' : 'ð');
      continue loop;
      case 'g':
        if (codes._c_and_g[word.charAt(i+1)]) {
          values.push('x');
          continue loop;
        }
        values.push((!i || prev === 'n' || prev === 'l') ? 'g' : 'ɣ');
      continue loop;
      case 'i':
        values.push((codes._i[word.charAt(i+1)]) ? 'j' : 'i');
      continue loop;
      case 'l':
        if (word.charAt(i+1) === 'l') {
          values.push('ʎ');
          i++;
          continue loop;
        }
        values.push('l');
      continue loop;
      case 'n':
        const nextButOne = word.charAt(i+2);
        const nextTwo = `${next}${nextButOne}`;
        if (codes.n_m[next]) {
  				values.push('m');
  				continue loop;
  			}
  			if ((next === 'c' && codes._nc[nextButOne]) || codes._n[next] ||
        codes._n[nextTwo]) {
  				values.push('ŋ');
  				continue loop;
  			}
  			values.push((next === 'y' || codes._n_[nextTwo]) ? 'ɲ' : 'n');
			continue loop;
      case 'r':
        if ((!i) || codes._r[lastValue] || next === 'r') {
          values.push('r');
          if (next === 'r') { i++ }
          continue loop;
        }
        values.push('ɾ');
      continue loop;
      case 's':
        values.push(codes.s_z[next] ? 'z' : 's');
			continue loop;
      case 'u':
        if (!((prev === 'g' && codes._c_and_g[next]) || (prev === 'q'))) {
          values.push(codes._u[next] ? 'w' : 'u'); /* only if pronounced */
        }
      continue loop;
      case 'ü':
        values.push(codes._u[next] ? 'w' : 'u');
      continue loop;
      case 'x':
        values.push((i === 2 && /^m[eé]xic/.test(word)) ? 'x' : 'ks');
      continue loop;
      case 'y':
        values.push(codes.vowels[next] ? 'ʝ' : (l && (i === l) ? 'Y' : 'i'));
      continue loop;
    }
  }
  let phonetic = values.join('');
	// the following is to normalize the phonetic transcription to the IPA standard
	const normalizeToIPA: any = { A:'a', E:'e', I:'i', O:'o', U:'u', Y:'i' };
	for (var original in normalizeToIPA) {
		const pattern = new RegExp(original);
		phonetic = phonetic.replace(pattern, normalizeToIPA[original]);
	}
	return phonetic;
}

export default function spanishPhonology(pattern: string | string[]) {
  return fromStringOrArray(pattern, spanishPhonetic)
}
