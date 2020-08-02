export default function condition() {
  const C = 'Condition';
  // 'if it really goes, I will..'
  let m = this.match('#'+C+' .{1,7} #ClauseEnd');
  // make sure it ends on a comma
  if (m.found && m.match('#Comma$')) { m.tag(C) }
  // 'go a bit further, if it then has a pronoun
  m = this.match('#'+C+' .{1,13} #ClauseEnd #Pronoun');
  if (m.found && m.match('#Comma$')) { m.not('#Pronoun$').tag(C, 'end-pronoun') }
  // if it goes then ..
  m = this.match('#'+C+' .{1,7} then');
  if (m.found) { m.not('then$').tag(C, 'cond-then') }
  // as long as ..
  m = this.match('as long as .{1,7} (then|#ClauseEnd)');
  if (m.found) { m.not('then$').tag(C, 'as-long-then') }
  // at the end of a sentence:
  // '..., if it really goes.'
  m = this.match('#Comma #'+C+' .{1,7} .$');
  if (m.found) { m.not('^#Comma').tag(C, 'comma-7-end') }
  // '... if so.'
  m = this.match('#'+C+' .{1,4}$');
  if (m.found) { m.tag(C, 'cond-4-end') }
  return this
}
