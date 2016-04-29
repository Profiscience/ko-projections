'use strict'

const ko = require('knockout')
const test = require('tape')

require('./src')

test('extenders/kodash basic functionality', (t) => {
  t.plan(3)

  const foos = ko.observableArray([
    { id: 1, text: 'foo' },
    { id: 2, text: 'bar' },
    { id: 3, text: 'baz' },
    { id: 4, text: 'qux' }
  ]).extend({
    _: true
  })

  t.deepEqual(foos(), [
    { id: 1, text: 'foo' },
    { id: 2, text: 'bar' },
    { id: 3, text: 'baz' },
    { id: 4, text: 'qux' }
  ], 'initializes')

  let isLazy = true
  const flippedFoos = foos._.map((foo) => {
    isLazy = false
    foo.text = foo.text.split('').reverse().join('')
    return foo
  })

  t.assert(isLazy, 'is lazy')
  t.deepEqual(flippedFoos(), [
    { id: 1, text: 'oof' },
    { id: 2, text: 'rab' },
    { id: 3, text: 'zab' },
    { id: 4, text: 'xuq' }
  ], 'calls kodash prototype func')

  t.end()
})

test('extenders/kodash chainability', (t) => {
  t.plan(2)

  const foos = ko.observableArray([
    { id: 1, text: 'foo' },
    { id: 2, text: 'bar' },
    { id: 3, text: 'baz' },
    { id: 4, text: 'qux' }
  ]).extend({
    _: true
  })

  let isLazy = true
  const flippedAndFilteredFoos = foos
    ._.map((foo) => {
      isLazy = false
      foo.text = foo.text.split('').reverse().join('')
      return foo
    })
    ._.filter((foo) => {
      isLazy = false
      return foo.id % 2 === 0
    })

  t.assert(isLazy)
  t.deepEqual(flippedAndFilteredFoos(), [
    { id: 2, text: 'rab' },
    { id: 4, text: 'xuq' }
  ])

  t.end()
})

test('extenders/kodash works w/ dependency chain', (t) => {
  t.plan(3)

  const foos = ko.observableArray([
    { id: 1, text: 'foo' },
    { id: 2, text: 'bar' },
    { id: 3, text: 'baz' },
    { id: 4, text: 'qux' }
  ]).extend({
    _: true
  })

  let isLazy = true

  const wantsOdds = ko.observable(true)
  const flippedAndFilteredFoos = foos
    ._.map((foo) => {
      isLazy = false
      foo.text = foo.text.split('').reverse().join('')
      return foo
    })
    ._.filter((foo) => {
      isLazy = false
      return foo.id % 2 === (wantsOdds() ? 1 : 0)
    })

  t.assert(isLazy)

  t.deepEqual(flippedAndFilteredFoos(), [
    { id: 1, text: 'oof' },
    { id: 3, text: 'zab' }
  ])

  wantsOdds(false)
  ko.tasks.runEarly()

  t.deepEqual(flippedAndFilteredFoos(), [
    { id: 2, text: 'rab' },
    { id: 4, text: 'xuq' }
  ])

  t.end()
})

// Haven't decided yet if this is worth implementing...
//
// test('extenders/kodash can selectively extend', (t) => {
//   t.plan(2)
//
//   const foos = ko.observableArray([
//     { id: 1, text: 'foo' },
//     { id: 2, text: 'bar' },
//     { id: 3, text: 'baz' },
//     { id: 4, text: 'qux' }
//   ]).extend({
//     _: { map: true }
//   })
//
//   t.assert(typeof foos._map === 'function')
//   t.assert(typeof foos._filter !== 'function')
//
//   t.end()
// })
