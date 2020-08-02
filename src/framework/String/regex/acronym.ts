export const oneLetterAcronym:RegExp = /^[A-Z]\.$/;
export const noPeriodAcronym:RegExp = /[A-Z]{3}$/;
export const periodAcronym:RegExp = /([A-Z]\.)+[A-Z]?$/;
export default function isAcronym(s: string) {
  return !![oneLetterAcronym, noPeriodAcronym, periodAcronym].filter((r) => r.test(s)).length
}
