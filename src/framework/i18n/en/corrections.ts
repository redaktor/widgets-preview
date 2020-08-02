export default function corrections() {
  // ambig prepositions/conjunctions
  if (this.has('so')) {
    // so funny
    this.match('so #Adjective').match('so').tag('Adverb', 'so-adv');
    // so the
    this.match('so #Noun').match('so').tag('Conjunction', 'so-conj');
    // do so
    this.match('do so').match('so').tag('Noun', 'so-noun');
  }
  // the ambiguous word 'that' and 'which'
  if (this.has('(that|which)')) {
    // remind john that
    this.match('#Verb #Adverb? #Noun (that|which)').lastTerm.tag('Preposition', 'that-prep');
    // that car goes
    this.match('(that|which) #Noun #Verb').firstTerm.tag('Determiner', 'that-determiner');
    // things that provide
    // this.match('#Plural (that|which) #Adverb? #Verb').term(1).tag('Preposition', 'noun-that');
  }
  // Determiner-signals
  if (this.has('#Determiner')) {
    // the wait to vote
    this.match('(the|this) #Verb #Preposition .').term(1).tag('Noun', 'correction-determiner1');
    // the swim
    this.match('(the|those|these) (#Infinitive|#PresentTense|#PastTense)').term(1).tag('Noun', 'correction-determiner2');
    // a staggering cost
    this.match('(a|an) #Gerund').term(1).tag('Adjective', 'correction-a|an');
    this.match('(a|an) #Adjective (#Infinitive|#PresentTense)').term(2).tag('Noun', 'correction-a|an2');
    // some pressing issues
    this.match('(some #Verb #Plural').term(1).tag('Noun', 'correction-determiner6');
    // the orange.
    this.match('#Determiner #Adjective$').term(1).tag('Noun', 'the-adj-1');
    // the orange is
    this.match('#Determiner #Adjective (#Copula|#PastTense|#Auxiliary)').term(1).tag('Noun', 'the-adj-2');
    // the nice swim
    this.match('(the|this|those|these) #Adjective #Verb').term(2).tag('Noun', 'the-adj-verb');
    // the truly nice swim
    this.match('(the|this|those|these) #Adverb #Adjective #Verb').term(3).tag('Noun', 'correction-determiner4');
    // a stream runs
    this.match('(the|this|a|an) #Infinitive #Adverb? #Verb').term(1).tag('Noun', 'correction-determiner5');
    // a sense of
    this.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');
    // the threat of force
    this.match('#Determiner #Noun of #Verb').term(3).tag('Noun', 'noun-of-noun');
  }

  // like
  if (this.has('like')) {
    this.match('just like').term(1).tag('Preposition', 'like-preposition');
    // folks like her
    this.match('#Noun like #Noun').term(1).tag('Preposition', 'noun-like');
    // look like
    this.match('#Verb like').term(1).tag('Adverb', 'verb-like');
    // exactly like
    this.match('#Adverb like').term(1).tag('Adverb', 'adverb-like');
  }

  if (this.has('#Value')) {
    // half a million
    this.match('half a? #Value').tag('Value', 'half-a-value'); // quarter not ready
    this.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
    // all values are either ordinal or cardinal
    // this.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');
    // money
    this.match('#Value+ #Currency').tag('Money', 'value-currency').lastTerm.tag('Unit', 'money-unit');
    this.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');
    // 1 800 PhoneNumber
    this.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value');
    // (454) 232-9873
    this.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber');
  }

  if (this.has('#Noun')) {
    // 'more' is not always an adverb
    this.match('more #Noun').tag('Noun', 'more-noun');
    // the word 'second'
    this.match('second #Noun').term(0).untag('Unit').tag('Ordinal', 'second-noun');
    // he quickly foo
    this.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');
    // fix for busted-up phrasalVerbs
    this.match('#Noun #Particle').term(1).tag('Preposition', 'repair-noPhrasal');
    // John & Joe's
    this.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun');
    // Aircraft designer
    this.match('#Noun #Actor').tag('Actor', 'thing-doer');
    // my buddy
    this.match('#Possessive #FirstName').term(1).untag('Person', 'possessive-name');
    // this rocks
    this.match('(this|that) #Plural').term(1).tag('PresentTense', 'this-verbs');
    // organization
    if (this.has('#Organization')) {
      this.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
      this.match('#Organization #Country').tag('Organization', 'org-country');
      this.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
    }
  }

  if (this.has('#Verb')) {
    // still make
    this.match('still #Verb').term(0).tag('Adverb', 'still-verb');
    // 'u' as pronoun
    this.match('u #Verb').term(0).tag('Pronoun', 'u-pronoun-1');
    // is no walk
    this.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');
    // different views than
    this.match('#Verb than').term(0).tag('Noun', 'correction');
    // her polling
    this.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');
    // is eager to go
    this.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');
    // the word 'how'
    this.match('how (#Copula|#Modal|#PastTense)').term(0).tag('QuestionWord', 'how-question');
    // is mark hughes
    this.match('#Copula #Infinitive #Noun').term(1).tag('Noun', 'is-pres-noun');

    this.match('#Infinitive #Copula').term(0).tag('Noun', 'infinitive-copula');
    // went to sleep
    this.match('#Verb to #Verb').lastTerm.tag('Noun', 'verb-to-verb');
    // support a splattering of auxillaries before a verb
    let advb = '(#Adverb|not)+?';
    if (this.has(advb)) {
      // had walked
      this.match(`(has|had) ${advb} #PastTense`).not('#Verb$').tag('Auxiliary', 'had-walked');
      // was walking
      this.match(`#Copula ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'copula-walking');
      // been walking
      this.match(`(be|been) ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'be-walking');
      // would walk
      this.match(`(#Modal|did) ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'modal-verb');
      // would have had
      this.match(`#Modal ${advb} have ${advb} had ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-have');
      // would be walking
      this.match(`(#Modal) ${advb} be ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
      // would been walking
      this.match(`(#Modal|had|has) ${advb} been ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
      // infinitive verbs suggest plural nouns - 'XYZ walk to the store'
      // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
    }
  }

  if (this.has('#Adjective')) {
    // still good
    this.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
    // big dreams, critical thinking
    this.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');
    // will secure our
    this.match('will #Adjective').term(1).tag('Verb', 'will-adj');
  }

  if (this.has('#TitleCase')) {
    // FitBit Inc
    this.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv');
    // Foo District
    this
      .match('#TitleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)')
      .tag('Region', 'foo-district');
    // District of Foo
    this.match('(district|region|province|municipality|territory|burough|state) of #TitleCase').tag('Region', 'district-of-Foo');
  }

  // West Norforlk
  this.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk');

  // misc:
  // foot/feet
  this.match('(foot|feet)').tag('Noun', 'foot-noun');
  this.match('#Value (foot|feet)').term(1).tag('Unit', 'foot-unit');
  // 'u' as pronoun
  this.match('#Conjunction u').term(1).tag('Pronoun', 'u-pronoun-2');
  // 'a/an' can mean 1
  this.match('(a|an) (#Duration|#Value)').ifNo('#Plural').term(0).tag('Value', 'a-is-one');
  // swear-words as non-expression POS
  // nsfw
  this.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  this.match('#Determiner (shit|damn|hell)').term(1).tag('Noun', 'swears-noun');
  this.match('(shit|damn|fuck) (#Determiner|#Possessive|them)').term(0).tag('Verb', 'swears-verb');
  this.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective');
  // 6 am
  this.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day');
  // timezones
  this.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone');
  // canadian dollar, Brazilian pesos
  this.match('#Demonym #Currency').tag('Currency', 'demonym-currency');
  return this
}
