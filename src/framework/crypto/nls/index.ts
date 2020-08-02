const locales = {
  de: () => import('./de')
};

const messages = {
  yourPW: `Your password`,
  scores: `scores`,
  // known warnings
  zxcvbn_b650cc59: `Straight rows of keys are easy to guess!`,
  zxcvbn_223a3503: `Short keyboard patterns are easy to guess!`,
  zxcvbn_2ffd818f: `Repeats like "mimimi" are easy to guess!`,
  zxcvbn_cd8df245: `Repeats like "abcabcabc" are only slightly harder to guess than "abc"!`,
  zxcvbn_82618fe9: `Sequences like "abc" or "6543" are easy to guess!`,
  zxcvbn_5587ab99: `Recent years are easy to guess!`,
  zxcvbn_6ad47ea8: `Dates are often easy to guess!`,
  zxcvbn_6f46b03b: `This is a top-10 common password!`,
  zxcvbn_acb43cee: `This is a top-100 common password!`,
  zxcvbn_db5735c6: `This is a very common password!`,
  zxcvbn_6587648a: `This is similar to a commonly used password!`,
  zxcvbn_5e908a41: `A word by itself is easy to guess!`,
  zxcvbn_5e199e28: `Names and surnames by themselves are easy to guess!`,
  zxcvbn_37ef74f0: `Common names and surnames are easy to guess!`,
  // known suggestions
  zxcvbn_7b213d01: `Use a few words, avoid common phrases.`,
  zxcvbn_491034d4: `No need for symbols, digits, or uppercase letters.`,
  zxcvbn_62089321: `Add another word or two. Uncommon words are better.`,
  zxcvbn_4f86e029: `Use a longer keyboard pattern with more turns.`,
  zxcvbn_49d4bbde: `Avoid repeated words and characters.`,
  zxcvbn_0fe0383b: `Avoid sequences.`,
  zxcvbn_dde33d39: `Avoid recent years.`,
  zxcvbn_e0c8c1cd: `Avoid years that are associated with you.`,
  zxcvbn_b82a8043: `Avoid dates and years that are associated with you.`,
  zxcvbn_5251e95b: `All-uppercase is almost as easy to guess as all-lowercase.`,
  zxcvbn_95bcf9ea: `Capitalization doesn't help very much.`,
  zxcvbn_6e18ff4f: `Reversed words aren't much harder to guess.`,
  zxcvbn_affbaac9: `Predictable substitutions like '@' instead of 'a' don't help very much.`
};

export default { locales, messages };
