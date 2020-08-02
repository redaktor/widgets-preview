export const rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
export const rsComboSymbolsRange = '\\u20d0-\\u20f0';
/**
* Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
* [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
*/
const comboMark = RegExp(`[${rsComboMarksRange}${rsComboSymbolsRange}]`, 'g');
export default comboMark;
