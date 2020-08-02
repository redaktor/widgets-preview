//
const miscSearch: string[] = ['#Value of #Month'];
const preps: string = 'in|by|before|for|during|at|on|until|after|of|within|all';
const miscDays: any = { today: 0, tomorrow: 1, yesterday: -1 }
const weekDays: any = {
  long: {sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6},
  short: {sun:0,mon:1,tue:2,tues:2,wed:3,weds:3,thu:4,thurs:4,fri: 5,sat: 6}
}
const months: any = {
  long: {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6,
    august: 7, september: 8, october: 9, november: 10, december: 11
  },
  short: {
    jan: 0, feb: 1, febr: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6,
    aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11
  }
};
export const dates = { miscSearch, preps, miscDays, weekDays, months };

export default function date() {
  //console.log('.DATE', this.out('text'), this.match);
  // ensure a year is approximately typical for common years
  // please change in one thousand years
  const tagYear = (v: any, reason: string) => {
    v.list.forEach(() => {
      let num = parseInt(this.terms[0].normal, 10);
      if (num && num > 1000 && num < 3000) {
        this.terms[0].tag('Year', reason);
      }
    });
  };
  // same, but for less-confident values
  const tagYearSafer = (v: any, reason: string) => {
    v.list.forEach(() => {
      let num = parseInt(this.terms[0].normal, 10);
      if (num && num > 1990 && num < 2030) {
        this.terms[0].tag('Year', reason);
      }
    });
  };
  const thisNext = '(last|next|this|previous|current|upcoming|coming)';
  const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
  const seasons = '(spring|summer|winter|fall|autumn)';
  // ambiguous month - person forms
  let people = '(january|april|may|june|summer|autumn|jan|sep)';
  if (this.has(people)) {
    // give to april
    this.match(`#Infinitive #Determiner? #Adjective? #Noun? (to|for) ${people}`).lastTerm.tag('Person', 'ambig-person');
    // remind june
    this.match(`#Infinitive ${people}`).lastTerm.tag('Person', 'infinitive-person');
    // may waits for
    this.match(`${people} #PresentTense (to|for)`).firstTerm.tag('Person', 'ambig-active');
    // april will
    this.match(`${people} #Modal`).firstTerm.tag('Person', 'ambig-modal');
    // would april
    this.match(`#Modal ${people}`).lastTerm.tag('Person', 'modal-ambig');
    // with april
    this.match(`(that|with|for) ${people}`).term(1).tag('Person', 'that-month');
    // it is may
    this.match(`#Copula ${people}`).term(1).tag('Person', 'is-may');
    // may is
    this.match(`${people} #Copula`).term(0).tag('Person', 'may-is');
    // april the 5th
    this.match(`${people} the? #Value`).term(0).tag('Month', 'person-value');
    // wednesday april
    this.match(`#Date ${people}`).term(1).tag('Month', 'correction-may');
    // may 5th
    this.match(`${people} the? #Value`).firstTerm.tag('Month', 'may-5th');
    // 5th of may
    this.match(`#Value of ${people}`).lastTerm.tag('Month', '5th-of-may');
    // by april
    this.match(`${preps} ${people}`).ifNo('#Holiday').term(1).tag('Month', 'preps-month');
    // this april
    this.match(`(next|this|last) ${people}`).term(1).tag('Month', 'correction-may'); // maybe not 'this'
  }
  // ambiguous month - verb-forms
  let verbs = '(may|march)';
  if (this.has(verbs)) {
    // quickly march
    this.match(`#Adverb ${verbs}`).lastTerm.tag('Infinitive', 'ambig-verb');
    this.match(`${verbs} #Adverb`).lastTerm.tag('Infinitive', 'ambig-verb');
    // all march
    this.match(`${preps} ${verbs}`).lastTerm.tag('Month', 'in-month');
    // this march
    this.match(`(next|this|last) ${verbs}`).lastTerm.tag('Month', 'this-month');
    this.match(`${verbs} the? #Value`).firstTerm.tag('Month', 'march-5th');
    this.match(`#Value of? ${verbs}`).lastTerm.tag('Month', '5th-of-march');
    if (this.has('march')) {
      // march to
      this.match('march (up|down|back|to|toward)').term(0).tag('Infinitive', 'march-to');
      // must march
      this.match('#Modal march').term(1).tag('Infinitive', 'must-march');
    }
  }
  // sun 5th
  if (this.has('sun')) {
    // sun feb 2
    this.match('sun #Date').firstTerm.tag('WeekDay', 'sun-feb');
    // sun the 5th
    this.match('sun the #Ordinal').tag('Date').firstTerm.tag('WeekDay', 'sun-the-5th');
    // the sun
    this.match('#Determiner sun').lastTerm.tag('Singular', 'the-sun');
  }
  // sat, nov 5th
  if (this.has('sat')) {
    // sat november
    this.match('sat #Date').firstTerm.tag('WeekDay', 'sat-feb');
    // this sat
    this.match(`${preps} sat`).lastTerm.tag('WeekDay', 'sat');
  }
  // months:
  if (this.has('#Month')) {
    // June 5-7th
    this.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange');
    // 5th of March
    this.match('#Value of #Month').tag('Date', 'value-of-month');
    // 5 March
    this.match('#Cardinal #Month').tag('Date', 'cardinal-month');
    // march 5 to 7
    this.match('#Month #Value to #Value').tag('Date', 'value-to-value');
    // march the 12th
    this.match('#Month the #Value').tag('Date', 'month-the-value');
  }
  // console.log('.TERMS',this); console.log(this.terms);
  this.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  this.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  // months:
  if (this.has('#Value')) {
    // for 4 months
    this.match('for #Value #Duration').tag('Date', 'for-x-duration');
    // values
    this.match('#Value #Abbreviation').tag('Value', 'value-abbr');
    this.match('a #Value').tag('Value', 'a-value');
    this.match('(minus|negative) #Value').tag('Value', 'minus-value');
    this.match('#Value grand').tag('Value', 'value-grand');
    // this.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');// not ready
    this.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
    this.match('(hundred|thousand|million|billion|trillion) and #Value').tag('Value', 'magnitude-and-value');
    this.match('#Value point #Value').tag('Value', 'value-point-value');
    // for four days
    this.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');
    this.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value');
    this.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date');
    // may twenty five
    let vs = this.match('#TextValue #TextValue');
    if (vs.found && vs.has('#Date')) {
      vs.tag('#Date', 'textvalue-date');
    }
    // two days before
    this.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');
    // two years old
    this.match('#Value #Duration old').untag('Date', 'val-years-old');
  }
  // time: TODO abbrev
  if (this.has('#Time')) {
    this.match('#Cardinal #Time').tag('Time', 'value-time');
    this.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
    // 2pm est
    this.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
    this.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  }
  // seasons
  if (this.has(seasons)) {
    this.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season');
    this.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season');
  }
  // rest-dates
  if (this.has('#Date')) {
    // june the 5th
    this.match('#Date the? #Ordinal').tag('Date', 'correction-date');
    // last month
    this.match(`${thisNext} #Date`).tag('Date', 'thisNext-date');
    // by 5 March
    this.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
    // tomorrow before 3
    this.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal');
    // saturday am
    this.match('#Date (am|pm)').term(1).untag('Verb').untag('Copula').tag('Time', 'date-am');
    this.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
    this.match('#Date #Preposition #Date').tag('Date', 'date-prep-date');
    // start of june
    this.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date');
    // fifth week in 1998
    this.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in-date');
    // early in june
    this.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening');
  }
  // year/cardinal tagging
  if (this.has('#Cardinal')) {
    let v = this.match(`#Date #Value #Cardinal`).lastTerm;
    if (v.found) {
      tagYear(v, 'date-value-year');
    }
    // scoops up a bunch
    v = this.match(`#Date+ #Cardinal`).lastTerm;
    if (v.found) {
      tagYear(v, 'date-year');
    }
    // feb 8 2018
    v = this.match(`#Month #Value #Cardinal`).lastTerm;
    if (v.found) {
      tagYear(v, 'month-value-year');
    }
    // feb 8 to 10th 2018
    v = this.match(`#Month #Value to #Value #Cardinal`).lastTerm;
    if (v.found) {
      tagYear(v, 'month-range-year');
    }
    // in 1998
    v = this.match(`(in|of|by|during|before|starting|ending|for|year) #Cardinal`).lastTerm;
    if (v.found) {
      tagYear(v, 'in-year');
    }
    // was 1998 and...
    v = this.match(`#Cardinal !#Plural`).firstTerm;
    if (v.found) {
      tagYearSafer(v, 'year-unsafe');
    }
  }
  // fix over-greedy
  if (this.has('#Date')) {
    let date = this.match('#Date+').splitOn('Clause');
    if (date.has('(#Year|#Time)') === false) {
      // 12 february 12
      date.match('#Value (#Month|#Weekday) #Value').lastTerm.untag('Date');
    }
  }
  return this
}
