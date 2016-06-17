import ko from 'knockout'
import test from 'ava'
import './src'

test('extenders/ko-projections basic functionality', (t) => {
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

  t.truthy(isLazy, 'is lazy')
  t.deepEqual(flippedFoos(), [
    { id: 1, text: 'oof' },
    { id: 2, text: 'rab' },
    { id: 3, text: 'zab' },
    { id: 4, text: 'xuq' }
  ], 'calls ko-projections prototype func')
})

test('extenders/ko-projections chainability', (t) => {
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

  t.truthy(isLazy)
  t.deepEqual(flippedAndFilteredFoos(), [
    { id: 2, text: 'rab' },
    { id: 4, text: 'xuq' }
  ])
})

test('extenders/ko-projections non-chainable functions', (t) => {
  t.plan(5)

  const foos = ko.observableArray([
    { id: 1, text: 'foo' },
    { id: 2, text: 'bar' },
    { id: 3, text: 'baz' },
    { id: 4, text: 'qux' }
  ]).extend({
    _: true
  })

  let isLazy = true
  const fooFunc = foos
    ._.each(() => {
      isLazy = false
      t.truthy(true)
    })

  t.truthy(isLazy)
  fooFunc()
})

test('extenders/ko-projections non-chainable functions that return undefined', (t) => {
  t.plan(1)

  const foos = ko.observableArray([
    { id: 1, text: 'foo' },
    { id: 2, text: 'bar' },
    { id: 3, text: 'baz' },
    { id: 4, text: 'qux' }
  ]).extend({
    _: true
  })

  foos._.find((f) => f.id === 5)()
  t.pass()
})

test('extenders/ko-projections works w/ dependency chain', (t) => {
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

  t.truthy(isLazy)

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
})

// Haven't decided yet if this is worth implementing...
//
// test('extenders/ko-projections can selectively extend', (t) => {
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
//   t.truthy(typeof foos._map === 'function')
//   t.truthy(typeof foos._filter !== 'function')
// })
