//yep,
const jan = 'january'
const feb = 'february'
const mar = 'march'
const apr = 'april'
const may = 'may'
const jun = 'june'
const jul = 'july'
const aug = 'august'
const sep = 'september'
const oct = 'october'
const nov = 'november'
const dec = 'december'

module.exports = {
  'new years eve': [dec, 31],
  'new years': [jan, 1],
  'new years day': [jan, 1],
  'inauguration day': [jan, 20],
  'australia day': [jan, 26],
  'national freedom day': [feb, 1],
  'groundhog day': [feb, 2],
  'rosa parks day': [feb, 4],
  'valentines day': [feb, 14],
  'saint valentines day': [feb, 14],
  'st valentines day ': [feb, 14],
  'saint patricks day': [mar, 17],
  'st patricks day': [mar, 17],
  'april fools': [apr, 1],
  'april fools day': [apr, 1],
  'emancipation day': [apr, 16],
  'tax day': [apr, 15], //US
  'labour day': [may, 1],
  'cinco de mayo': [may, 5],
  'national nurses day': [may, 6],
  'harvey milk day': [may, 22],
  'victoria day': [may, 24],
  juneteenth: [jun, 19],
  'canada day': [jul, 1],
  'independence day': [jul, 4],
  'independents day': [jul, 4],
  'bastille day': [jul, 14],
  'purple heart day': [aug, 7],
  'womens equality day': [aug, 26],
  '16 de septiembre': [sep, 16],
  'dieciseis de septiembre': [sep, 16],
  'grito de dolores': [sep, 16],
  halloween: [oct, 31],
  'all hallows eve': [oct, 31],
  'day of the dead': [oct, 31], // Ranged holiday [nov, 2],
  'dia de muertos': [oct, 31], // Ranged holiday [nov, 2],
  'veterans day': [nov, 11],
  'st andrews day': [nov, 30],
  'saint andrews day': [nov, 30],
  'all saints day': [nov, 1],
  'all sts day': [nov, 1],
  'armistice day': [nov, 11],
  'rememberance day': [nov, 11],
  'christmas eve': [dec, 24],
  christmas: [dec, 25],
  xmas: [dec, 25],
  'boxing day': [dec, 26],
  'st stephens day': [dec, 26],
  'saint stephens day': [dec, 26],

  // Fixed religious and cultural holidays
  // Catholic + Christian
  epiphany: [jan, 6],
  'orthodox christmas day': [jan, 7],
  'orthodox new year': [jan, 14],
  'assumption of mary': [aug, 15],
  'all souls day': [nov, 2],
  'feast of the immaculate conception': [dec, 8],
  'feast of our lady of guadalupe': [dec, 12],

  // Kwanzaa
  kwanzaa: [dec, 26], // Ranged holiday [jan, 1],

  // Pagan / metal 🤘
  imbolc: [feb, 2],
  beltaine: [may, 1],
  lughnassadh: [aug, 1],
  samhain: [oct, 31]
}
