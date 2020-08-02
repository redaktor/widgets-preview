export function bitapScore(pattern: string, { errors = 0, current = 0, expected = 0, distance = 100 }) {
  const accuracy = errors / pattern.length;
  const proximity = Math.abs(expected - current);
  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy
  }
  return accuracy + (proximity / distance)
}
export function matchedIndices(matchmask: any[] = [], minMatchCharLength = 1) {
  let matchedIndices = [];
  let [start, end, i] = [-1, -1, 0];
  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start === -1) {
      start = i
    } else if (!match && start !== -1) {
      end = i - 1
      if ((end - start) + 1 >= minMatchCharLength) {
        matchedIndices.push([start, end + 1])
      }
      start = -1
    }
  }
  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && (i - start) >= minMatchCharLength) {
    matchedIndices.push([start, i])
  }
  return matchedIndices
}

export default function bitapSearch (text: string, pattern: string, patternAlphabet: any,
  { location = 0, distance = 100, threshold = 0.6, findAllMatches = false, minMatchCharLength = 1 }) {
  //console.log(text);
  const expected = location;
  // Set starting location at beginning text and initialize the alphabet.
  const textLen = text.length;
  // Highest score beyond which we give up.
  let currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  let bestLocation = text.indexOf(pattern, expected);
  let current = bestLocation;
  const patternLen = pattern.length;
  // a mask of the matches
  const matchMask = [];
  for (let i = 0; i < textLen; i += 1) {
    matchMask[i] = 0
  }
  if (bestLocation !== -1) {
    let score = bitapScore(pattern, { errors: 0, current, expected, distance });
    currentThreshold = Math.min(score, currentThreshold);
    // What about in the other direction? (speed up)
    current = bestLocation = text.lastIndexOf(pattern, expected + patternLen);
    if (bestLocation !== -1) {
      let score = bitapScore(pattern, { errors: 0, current, expected, distance });
      currentThreshold = Math.min(score, currentThreshold)
    }
  }
  // Reset the best location
  bestLocation = -1;
  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;
  const mask = 1 << (patternLen - 1);
  for (let errors = 0; errors < patternLen; errors += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    let binMin = 0;
    let binMid = binMax;
    while (binMin < binMid) {
      const current = expected + binMid;
      const score = bitapScore(pattern, { errors, current, expected, distance });
      if (score <= currentThreshold) {
        binMin = binMid
      } else {
        binMax = binMid
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin)
    }
    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;
    let start = Math.max(1, expected - binMid + 1);
    let finish = findAllMatches ? textLen : Math.min(expected + binMid, textLen) + patternLen;
    // Initialize the bit array
    let bitArr = Array(finish + 2);
    bitArr[finish + 1] = (1 << errors) - 1;
    for (let j = finish; j >= start; j -= 1) {
      let current = j - 1;
      let charMatch = patternAlphabet[text.charAt(current)];
      if (charMatch) {
        matchMask[current] = 1;
      }
      // First pass: exact match
      bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;
      // Subsequent passes: fuzzy match
      if (errors !== 0) {
        bitArr[j] |= (((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1) | lastBitArr[j + 1]
      }
      if (bitArr[j] & mask) {
        const lengthProximity = text.length > pattern.length ?
          (text.length / pattern.length / distance) : (pattern.length / text.length / distance);
        const score = bitapScore(pattern, { errors, current, expected, distance });
        finalScore =  Math.min(score + lengthProximity, 1);
        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = current;
          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expected) { break }
          // When passing `bestLocation`, don't exceed our current distance from `expected`.
          start = Math.max(1, 2 * expected - bestLocation)
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    const score = bitapScore(pattern, {
      errors: errors + 1,
      current: expected,
      expected,
      distance
    });
    // console.log('score', score, finalScore)
    if (score > currentThreshold) { break }
    lastBitArr = bitArr
  }

  // Count exact matches (those with a score of 0) to be "almost" exact
  return {
    isMatch: bestLocation >= 0,
    score: finalScore === 0 ? 0.001 : finalScore,
    matchedIndices: matchedIndices(matchMask, minMatchCharLength)
  }
}
