import TLDs from '../lexicon/abbreviations/TLD';
import fileExtensions from '../lexicon/abbreviations/fileExtension';
const periodPrefix:RegExp = new RegExp(`${TLDs}|${fileExtensions}`);
export default periodPrefix;
