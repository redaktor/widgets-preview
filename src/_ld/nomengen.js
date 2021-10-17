const nomen = require('./Nomen.json');
const [f,m,n,a] = [[],[],[],[]];
const [_f,_m,_n,_a] = [{},{},{},{}];
for (let key in nomen) {
  const k = key.toLowerCase();
  if (nomen[key] === 'Fem' && !_f.hasOwnProperty(k)) {
    _f[k] = k;
    // f.push(k)
  }
  if (nomen[key] === 'Masc' && !_m.hasOwnProperty(k)) {
    _m[k] = k;
    // m.push(k)
  }
  if (nomen[key] === 'Neut' && !_n.hasOwnProperty(k)) {
    _n[k] = k;
    // n.push(k)
  }
  if (nomen[key] === 'Ambiguous' && !_a.hasOwnProperty(k)) {
    _a[k] = k;
    // a.push(k)
  }
  // Fem, Neut, Masc, Ambiguous
}
// const female = f.sort();
/*
const [_nKey, _nK] = [{},{}];
const neutral = [];
console.log(' ');
console.log('n', Object.keys(_n).length);
for (let key in _n) {
  let n = 2;
  while (n < 9) {
    n++;
    const k = key.slice(n * -1);
    if (!_nKey.hasOwnProperty(key) && !_nK.hasOwnProperty(k) &&
      !_m.hasOwnProperty(k) && !_f.hasOwnProperty(k) && !_a.hasOwnProperty(k)
    ) {
      _nK[k] = key;
      _nKey[key] = key;
      neutral.push(k);
    }
  }
}
console.log(neutral.join(','));
*/
/*
const [_aKey, _aK] = [{},{}];
const ambiguous = [];
console.log(' ');
console.log('a', Object.keys(_a).length);
for (let key in _a) {
  let n = 2;
  while (n < 9) {
    n++;
    const k = key.slice(n * -1);
    if (!_aKey.hasOwnProperty(key) && !_aK.hasOwnProperty(k) &&
      !_m.hasOwnProperty(k) && !_n.hasOwnProperty(k) && !_f.hasOwnProperty(k)
    ) {
      _aK[k] = key;
      _aKey[key] = key;
      ambiguous.push(k);
    }
  }
}
console.log(ambiguous.join(','));
*/


const [M,F,N] = [[{},{}],[{},{}],[{},{}]];
[M,F,N].forEach((a, i) => {
  for (let key in _n) {
    let n = 1;
    while (n < 9) {
      if (n === 2) { a.push({}) }
      n++;
      let k = key.slice(n * -1);
      a[a.length-1][k] = 1;
    }
  }
});
function hasEnding(a,i,k) {
  let hasProp = false;
  if (a[i].hasOwnProperty(k)) {
    hasProp = true
  }
  return hasProp
}


const [_ambiguousKey, _ambiguous] = [{},{}];
const ambiguous = [];
const ambiguousWords = [];
console.log(' ');
console.log('ambiguous', Object.keys(_n).length);
loop:
for (let key in _n) {
  let n = 3;
  while (n < 10) {
    n++;
    let k = key.slice(n * -1);
    let i = n;
    if (!_ambiguous.hasOwnProperty(k.replace(/e$/,'')) &&
      !_ambiguous.hasOwnProperty(k.substr(1).replace(/e$/,'')) && !_ambiguousKey.hasOwnProperty(key)
    ) {
      const [hasM,hasN,hasA] = [hasEnding(M,n,k),hasEnding(N,n,k),hasEnding(F,n,k)];
      if (!hasM && !hasN && !hasA) {
        _ambiguous[k] = key;
        _ambiguousKey[key] = key;
        ambiguous.push(k);
      } else if (n >= key.length && n < 10) {
        _ambiguous[k] = key;
        _ambiguousKey[key] = key;
        ambiguousWords.push(key);
      } else if (n === 10) {
        console.log('!', k, key, hasM, hasN, hasA)
      }
    }

  }
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const NEUTRAL = [];
ambiguous.filter(onlyUnique).forEach((s,i) => {
  if (i===100||i===1000||i===5000||i===10000) { console.log(i); }
  let hasShorter = false;
  ambiguous.forEach((_s) => {
    if (s!==_s && new RegExp(_s+'$').test(s)) {
      hasShorter = true
    }
  })
  if (!hasShorter) { NEUTRAL.push(s) }
});
console.log(NEUTRAL.filter(onlyUnique).sort().join(','));
console.log(' ');console.log(' ');console.log(ambiguousWords.length);
console.log(ambiguousWords.join(','));

/*
const [_femaleKey, _female] = [{},{}];
const female = [];
const femaleWords = [];
console.log(' ');
console.log('female', Object.keys(_f).length);
loop:
for (let key in _f) {
  let n = 3;
  while (n < 10) {
    n++;
    let k = key.slice(n * -1);
    let i = n;
    if (key.slice(-5) !== 'ungen' && key.slice(-5) !== 'innen' && key.slice(-5) !== 'anzen' &&
      !_female.hasOwnProperty(k.replace(/en$/,'')) && !_female.hasOwnProperty(k.replace(/n$/,'')) &&
      !_female.hasOwnProperty(k.substr(1).replace(/en$/,'')) && !_femaleKey.hasOwnProperty(key)
    ) {
      const [hasM,hasN,hasA] = [hasEnding(M,n,k),hasEnding(N,n,k),hasEnding(A,n,k)];
      if (!hasM && !hasN && !hasA) {
        _female[k] = key;
        _femaleKey[key] = key;
        female.push(k);
      } else if (n >= key.length && n < 10) {
        _female[k] = key;
        _femaleKey[key] = key;
        femaleWords.push(key);
      } else if (n === 10) {
        console.log('!', k, key, hasM, hasN, hasA)
      }
    }

  }
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const FEMALE = [];
female.filter(onlyUnique).forEach((s,i) => {
  if (i===100||i===1000||i===5000||i===10000) { console.log(i); }
  let hasShorter = false;
  female.forEach((_s) => {
    if (s!==_s && new RegExp(_s+'$').test(s)) {
      hasShorter = true
    }
  })
  if (!hasShorter) { FEMALE.push(s) }
});
console.log(FEMALE.filter(onlyUnique).sort().join(','));
console.log(' ');console.log(' ');console.log(femaleWords.length);
console.log(femaleWords.join(','));
*/
