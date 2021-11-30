const PL = 'n, plural, offset:0 ';
export default {
	now: `à l'instant`,
	minute: `{type, select,
	ago {{${PL}
		=0 {à l'instant}
		=1 {il y a 1 minute}
		other {il y a # minutes}}}
	agoShort {{${PL}
		=0 {à l'instant}
		other {il y a # minutes}}}
	aheadShort {{${PL}
		=0 {dans un instant}
		other {dans # minutes}}}
	other {{${PL}
		=0 {à l'instant dans un instant}
		=1 {dans 1 minute}
		other {dans # minutes}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {il y a 1 heure}
		other {il y a # heures}}}
	agoShort {{${PL}
		other {il y a # heures}}}
	aheadShort {{${PL}
		other {dans # heures}}}
	other {{${PL}
		=1 {dans 1 heure}
		other {dans # heures}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {il y a 1 jour}
		other {il y a # jours}}}
	agoShort {{${PL}
		other {il y a # jours}}}
	aheadShort {{${PL}
		other {dans # jours}}}
	other {{${PL}
		=1 {dans 1 jour}
		other {dans # jours}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {il y a 1 semaine}
		other {il y a # semaines}}}
	agoShort {{${PL}
		other {il y a # semaines}}}
	aheadShort {{${PL}
		other {dans # semaines}}}
	other {{${PL}
		=1 {dans 1 semaine}
		other {dans # semaines}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {il y a 1 mois}
		other {il y a # mois}}}
	agoShort {{${PL}
		other {il y a # mois}}}
	aheadShort {{${PL}
		other {dans # mois}}}
	other {{${PL}
		=1 {dans 1 mois}
		other {dans # mois}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {il y a 1 an}
		other {il y a # ans}}}
	agoShort {{${PL}
		other {il y a # ans}}}
	aheadShort {{${PL}
		other {dans # ans}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {dans # ans}}}}`
};
