const fns = require('../fns')
const days = require('../data/days')

//is it 'wednesday'?
const isDay = function (unit) {
  if (days.short().find((s) => s === unit)) {
    return true
  }
  if (days.long().find((s) => s === unit)) {
    return true
  }
  return false
}

// return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input
const every = function (start, unit = '', end) {
  if (!unit || !end) {
    return []
  }
  //cleanup unit param
  unit = fns.normalize(unit)
  //cleanup to param
  end = start.clone().set(end)
  //swap them, if they're backwards
  if (start.isAfter(end)) {
    let tmp = start
    start = end
    end = tmp
  }

  //support 'every wednesday'
  let d = start.clone()
  if (isDay(unit)) {
    d = d.next(unit)
    unit = 'week'
  } else {
    d = d.next(unit)
  }
  //okay, actually start doing it
  let result = []
  while (d.isBefore(end)) {
    result.push(d)
    d = d.add(1, unit)
  }
  return result
}
module.exports = every
