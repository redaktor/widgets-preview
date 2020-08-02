export const singleQuote:RegExp = /[\u2018\u2019\u201A\u201B\u2032\u2035]+/g;
export const doubleQuote:RegExp = /[\u201C\u201D\u201E\u201F\u2033\u2036"]+/g;
export const startQuote:RegExp = /^["'\u201B\u201C\u2033\u201F\u2018]/;
export const endQuote:RegExp = /.["'\u201D\u2036\u2019]([;:,.])?$/;
export default function isQuote(s: string) {
  return !![singleQuote, doubleQuote, startQuote, endQuote].filter(
    (r) => r.test(s)
  ).length
}
