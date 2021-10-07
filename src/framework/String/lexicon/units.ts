export type Unit = [string[], string, number?];
export interface CategoryUnit {
  metric: Unit[];
  us?: Unit[];
  nautical?: Unit[];
  digital?: Unit[];
  _pow?: {_2:string, _3:string};
}
export interface Units {
  time: CategoryUnit;
  mass: CategoryUnit;
  thermodynamicTemperature: CategoryUnit;
  length : CategoryUnit;
  amountOfSubstance: CategoryUnit;
	electricCurrent: CategoryUnit;
	luminousIntensity: CategoryUnit;
  planeAngle: CategoryUnit;
	solidAngle: CategoryUnit;
	pressure: CategoryUnit;
	energy: CategoryUnit;
	power: CategoryUnit;
	force: CategoryUnit;
	magneticField: CategoryUnit;
	magneticFlux: CategoryUnit;
	inductance: CategoryUnit;
	voltage: CategoryUnit;
	electricCapacitance: CategoryUnit;
	electricConductance: CategoryUnit;
	electricResistance: CategoryUnit;
	frequency: CategoryUnit;
	luminousIlluminance: CategoryUnit;
	luminousFlux: CategoryUnit;
	radioactivity: CategoryUnit;
	radioactivityAbsorbedDose: CategoryUnit;
	radioactivityEquivalentDose: CategoryUnit;
	catalyticActivity: CategoryUnit;
}
export interface Metric {
  prefix: [number, string, string, number?][];
  regex: string[];
}

const units: Units = {
	// symbols, wordRegex, siBase (optional, default:0)
	// symbols[0] is the returned symbol
	// note : 1 ambiguity: the degrees sign (angle, thermodynamicTemperature etc.)
	time: {
		// note: this becomes {dates gregorian or other} and auto metric +
		metric: [
      [['s','\\u0022','\\u2033'],'se(?:co|ku)nde?n?']
    ]
	},
	mass: {
		metric: [
			// siBase: kg (historic reasons)
			[['g'],'gramm?e?',3],
			[['t'],'(?:metris?ch?e? )?tonne[sn]?(?: métrique)?',6]
		],
		us: [
			[['gr'],'grain'],
			[['dwt'],'pennyweight'],
			[['dr'],'dram'],
			[['oz'],'[ou]n[cz]e'],
			[['oz t'],'troy [ou]n[cz]e'],
			[['lb t'],'troy p[fo]und'],
			[['lb'],'p[fo]und'], // de: see TODO pound below
			[['st'],'stone'],
			[['cwt'],'hundredweight|cental|zentner'],
			[['TON'],'(?:short ?|net ?)?ton[\\W]'], // (2,000 pounds)
			[['long ton'],'(?:long ?|gross |weight )ton'] // (2,240 pounds, historic)
		]
		// !TODO both don't fit in metric conversion range:
		// carat = 0,2 g
		// note the german pound is ambiguous with US and its values: "informal" means 0,5 kg but it is 0,453 592 37 !
		// historically it depends on the region (e.g. bavaria:0,56, hamburg:0,484609) - ignored for now.
	},
	thermodynamicTemperature: { // TODO : colorTemp. and noiseTemp. (Kelvin Home Alone)...
		metric: [
			[['K'], 'kelvin'],
			[['C'], 'celsius'], // calculation: ['-',273.15]
		],
		us: [
			[['° ?F'], 'fahrenheit'] // conflict w. farad F
		]
	},
	length: {
		_pow: {_2:'area', _3:'volume'},
		metric: [ // calculation: [1/299792458, 'time'],
			[['m'],'meters?|m[eè]tre',1],
			[['l'],'liters?|litre',1]
		],
		us: [
			[['p'],'point|punkt'],
			[['P\\u0338'],'pica'],
			[['in'],'inch', (1 / 12)],
			[['ft'],'f(?:oo|ee)t|fu(?:ß|ss)',1],
			[['yd'],'yards?', 3],
			[['mi'],'me?ill?es?', 5280]
			// us land, e.g. chain?, acre-foot
			// us fluid, e.g. fl. ounces, pints, quarts, gallons
			// us dry
		],
		nautical: [
			[['ftm'],'fathom|faden|klafter|brasse',6],
			[['shackle'],'shackle|shot',90],
			[['cb'],'c[aâ]ble|kabel',608.00524934383],
			[['NM'],'(?:nautical |nautische )me?ile|nmi|mille nautique',6076.12],
			[['nl'],'nautical league|nautische liga|ligue nautique',18228.3]
		],
		digital: [
			[['px'],'pixel'],
			[['pt'],'point|punkt'],
			[['em'],'quad|geviert'],
			[['rem'],'root em']
		]
	},
	amountOfSubstance: { metric: [[['mol'],'mole']] },
	electricCurrent: { metric: [[['A'], 'ampere|ampère']] },
	luminousIntensity: {
		metric: [[['cd'],'candela']]
		// lumen
	},
	planeAngle: { metric: [[['rad'],'radiant?']] },
	solidAngle: { metric: [[['sr'],'st[eé]radiant?']] },
	pressure: {
		metric: [[['Pa'],'pascal']]
		// bar
	},
	energy: { metric: [[['J'],'joule']] },
	power: { metric: [[['W'],'watt']] },
	force: {
		metric: [[['N'],'newton']]
		// dyn|dyne
	},
	magneticField: { metric: [[['T'],'tesla']] },
	magneticFlux: { metric: [[['Wb'],'weber']] },
	inductance: { metric: [[['H'],'henry']] },
	voltage: { metric: [[['V'],'volt']] },
	electricCapacitance: { metric: [[['F'],'farad']] },
	electricConductance: { metric: [[['S'],'siemens']] },
	electricResistance: { metric: [[['O','\\u2126'],'ohm']] },
	frequency: {
		metric: [[['Hz'],'hertz']]
		// revolutions per minute
	},
	luminousIlluminance: { metric: [[['lx'],'lux|beleuchtungsstärke|éclairement']] },
	luminousFlux: { metric: [[['lm'],'lumen|lumina|lumière']] },
	radioactivity: {
		metric: [[['Bq'],'becquerel']]
		// ...
	},
	radioactivityAbsorbedDose: {
		metric: [[['Gy'],'gray']]
		// rad
	},
	radioactivityEquivalentDose: { metric: [[['Sv'],'sievert']] },
	catalyticActivity: { metric: [[['kat'],'katal']] },
	// currency/währung, loudness/lautheit, bandRate/tonheit, bpm
	/* TODO
	Richter
	megaparsec [Mpc]
	Kiloparsec [kpc]
	Parsec [pc]
	Lichtjahr [ly]
	astronomical unit [AU]
	Liga [lea]
	Fermi [f]
	Arpent
	Twip
	ALN
	Kaliber
	Ken
	Reed
	Planck-Länge
	http://physics.nist.gov/cuu/Units/outside.html +
	GtCO2eq, MTU, toe, gilbert, bushel
	1 board-foot = 1 ft × 1 ft × 1 in = 2.360 dm3
	1 British thermal unit (Btu) ≈ 1055 J
	1 calorie (cal) = 4.184 J
	1 food calorie (kilocalorie, large calorie) (kcal, Cal) = 4.184 kJ
	1 foot-pound (energy) ≈ 1.356 J
	1 hand = 10.16 cm // finger // nail
	1 horsepower ≈ 745.7 W
	1 R-value (ft2·°F·h/Btu) ≈ 0.1761 RSI (K·m2/W)
	1 slug = 1 lbf·s2/ft
	1 U (rack unit) = 1.75 in
	*/
};

// TODO https://en.wikipedia.org/wiki/Imperial_and_US_customary_measurement_systems#Units_in_use
const m: Metric = {
	prefix: [
		// pow, symbol, wordRegex, 2pow (computing, optional)
		// terra for typos in 'latin' languages, it's greek, let's be tolerant? ;)
		[1e24,'Y','yotta',80],
		[1e21,'Z','zetta',70],
		[1e18,'E','e(?:ks|x)a',60],
		[1e15,'P','peta',50],
		[1e12,'T','te[r]+a',40],
		[1e9, 'G','giga',30],
		[1e6, 'M','mega',20],
		[1e3, 'k','kilo',10],
		[1e2, 'h','he[ck]to'],
		[10, 'da','de[ck]a'],
		// --- baseUnit --------------
		[-10, 'd','de[cz][yi]'],
		[1e-2, 'c','[cz]ent[yi]'],
		[1e-3, 'm','milli'],
		[1e-6, 'u|μ','mikro'],
		[1e-9, 'n','nano'],
		[1e-12,'p','pi[ck]o'],
		[1e-15,'f','femto'],
		[1e-18,'a','atto'],
		[1e-21,'z','zepto'],
		[1e-24,'y','yokto']
	],
  regex: []
}
m.regex = [
	['(', m.prefix.map((a) => a[2]).join(')|('), ')'].join(''),
	['(', m.prefix.map((a) => a[1]).join(')|('), ')'].join('')
];
export const metric = m;

export const unitDefinitions = Object.keys(units).reduce((o: any, category) => {
  Object.keys(units[category as keyof typeof units]).forEach((system) => {
    if (Array.isArray((units as any)[category][system])) {
      (units as any)[category][system].forEach((a: Unit) => {
        const name = a[0][0].replace(' ?','');
        o[name] = {name, system, category, definition: a}
      });
    }
  });
  return o;
}, {});
export type Category = keyof typeof units;
export type UnitName = 's'|'g'|'t'|'gr'|'dwt'|'dr'|'oz'|'oz t'|'lb t'|'lb'|'st'|'cwt'|'TON'|'long ton'|
  'K'|'C'|'°F'|'m'|'l'|'p'|'in'|'ft'|'yd'|'mi'|'ftm'|'shackle'|'cb'|'NM'|'nl'|'px'|'pt'|'em'|'rem'|
  'mol'|'A'|'cd'|'rad'|'sr'|'Pa'|'J'|'W'|'N'|'T'|'Wb'|'H'|'V'|'F'|'S'|'O'|'Hz'|'lx'|'lm'|'Bq'|'Gy'|
  'Sv'|'kat';
export default units;
