export default function possessive() {
  const isPossessive = (x: number) => {
    const afterWord = /[a-z]s'$/;
    const apostrophe = /[a-z]'s$/;
    // these are always contractions
    const blacklist: any = { "it's": 1, "that's": 1 };
    let a = [this.get(x), this.get(x + 1)];
    // these are always contractions, not possessive
    if (!!blacklist[a[0].normal]) { return false }
    // "spencers'" - this is always possessive - eg "flanders'"
    if (!!afterWord.test(a[0].normal)) { return true }
    // if no apostrophe s, return or some parts-of-speech can't be possessive
    if (!apostrophe.test(a[0].normal) || !!a[0].tags.Pronoun) { return false }
    // last word is possessive  - "better than spencer's" or next word is 'house'
    if (!a[1] || !!a[1].tags.Noun) { return true }
    // rocket's red glare
    return (a[1].tags.Adjective && this.get(x + 2) && this.get(x + 2).tags.Noun)
  };
  for(let i = 0; i < this.length; i++) {
    if (isPossessive(i)) {
      let t = this.get(i);
      // if it's not already a noun, co-erce it to one
      if (!t.tags['Noun']) { t.tag('Noun', 'possessive_pass') }
      t.tag('Possessive', 'possessive_pass');
    }
  }
  return this
}
