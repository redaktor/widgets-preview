const test = require('tape')
const spacetime = require('./lib')

test('daytime-consistent', (t) => {
  let s = spacetime.now()
  let times = ['morning', 'afternoon', 'evening', 'night']
  times.forEach((daytime) => {
    s = s.dayTime(daytime)
    t.equal(s.dayTime(), daytime, daytime + ' is ' + daytime)
  })
  t.end()
})

test('daytime-sanity-test', (t) => {
  let s = spacetime.now()
  let time = '2am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '7am'
  s = s.time(time)
  t.equal(s.dayTime(), 'morning', time + ' is morning')

  time = '7:01am'
  s = s.time(time)
  t.equal(s.dayTime(), 'morning', time + ' is morning')

  time = '11:59am'
  s = s.time(time)
  t.equal(s.dayTime(), 'morning', time + ' is morning')

  time = '12:00pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'afternoon', time + ' is afternoon')

  time = '12:01pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'afternoon', time + ' is afternoon')

  time = '2:47pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'afternoon', time + ' is afternoon')

  time = '6pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'evening', time + ' is evening')

  time = '6:02pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'evening', time + ' is evening')

  time = '9:07pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'evening', time + ' is evening')

  time = '11pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '12am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '12:00am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '12:01am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  t.end()
})
