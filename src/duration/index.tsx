import { create, tsx } from '@dojo/framework/core/vdom';

const UNITS = {
  YEAR: 31536000,
  MONTH: 2628000,
  DAY: 86400,
  HOUR: 3600,
  MINUTE: 60,
  SECOND: 1
}

const YEAR_UNIT = 'years'
const MONTH_UNIT = 'months'
const DAY_UNIT = 'days'
const HOUR_UNIT = 'hours'
const MINUTE_UNIT = 'minutes'
const SECOND_UNIT = 'seconds'
const IS_NEGATIVE_UNIT = 'isNegative'

const emptyPeriod = {
  [YEAR_UNIT]: 0,
  [MONTH_UNIT]: 0,
  [DAY_UNIT]: 0
}

const emptyTime = {
  [HOUR_UNIT]: 0,
  [MINUTE_UNIT]: 0,
  [SECOND_UNIT]: 0
}

// Regex taken from https://www.w3.org/TR/xmlschema11-2/#duration-lexical-space
const isValidXsdDuration = (str: string) =>
/^-?P((([0-9]+Y([0-9]+M)?([0-9]+D)?|([0-9]+M)([0-9]+D)?|([0-9]+D))(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S)))?)|(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S))))$/.test(
  str
);

const isNonEmptyString = (input: any) => (typeof input === 'string' && !!input.length);
const isNegative = (str: string) => str[0] === '-';
const stripFirstChar = (str: string) => str.slice(1)
const unitToSeconds = (unit: string, amount: number) => UNITS[unit.toUpperCase() as keyof typeof UNITS] * amount

const parseUnit = (unit: string, amount: string|number) => {
  const amt = getNr(amount)
  return unitToSeconds(unit, amt)
}

const getNr = (amount: number|string) => {
	if (typeof amount === 'number') { return amount }
  const amt = parseFloat(amount)
  if (isNaN(amt)) { return 0 }
  return amt
}

const parsePeriod = (period: string) => {
	const [, year = '', month = '', day = ''] = /^(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?$/g.exec(period) || [];
  return (
    parseUnit('year', year) + parseUnit('month', month) + parseUnit('day', day)
  )
}

const parseTime = (time: string) => {
  const [, hour = '', minute = '', second = ''] =
    /^(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/g.exec(time) || []

  return (
    parseUnit('hour', hour) +
    parseUnit('minute', minute) +
    parseUnit('second', second)
  )
}

const parse = (str: string) => {
  const neg = isNegative(str)
  const duration = neg ? stripFirstChar(str) : str
  const splitDuration = duration.split('T')
  const period = stripFirstChar(splitDuration[0])
  const time = splitDuration[1]

  let output = 0
  if (isNonEmptyString(period)) { output += parsePeriod(period) }
  if (isNonEmptyString(time)) { output += parseTime(time) }
  return neg ? -output : output
}

interface DurationProperties {
	duration?: string;
	/* default false */
	format?: boolean;
}

const factory = create({}).properties<DurationProperties>();
export const Duration = factory(function Name({ properties }) {
	const { duration = 'PT1S', format = false } = properties();
	if (typeof duration !== 'string') {
    throw new TypeError('expected duration to be a string')
  }
  // Return null for invalid duration
  if (!isValidXsdDuration(duration)) { return null }
  // Parse valid duration
  return (format ? formatTime(parse(duration))||'' : parse(duration))||0
});
export function parseDuration(duration: number|string) {
	if (typeof duration === 'number') { return duration }
	return parse(duration)
}
export function formatTime(sec: number) {
	if (!sec) { return '' }
  const hours   = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - (hours * 3600)) / 60);
  const seconds = sec - (hours * 3600) - (minutes * 60);
	const m0 = minutes < 10 ? '0' : '';
	const s0 = seconds < 10 ? '0' : '';
  return (hours === 0 ? '' : `${hours}:`) + `${m0}${minutes}:${s0}${seconds}`;
};

export default Duration;
