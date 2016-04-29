# ko-projections

![NPM](https://img.shields.io/npm/v/ko-projections.svg)
![WTFPL](https://img.shields.io/npm/l/ko-projections.svg)
[![Travis](https://img.shields.io/travis/Profiscience/ko-projections.svg)](https://travis-ci.org/Profiscience/ko-projections)
[![Code Climate](https://codeclimate.com/repos/5722f999db67c30068003d60/badges/feedbd14a4dfe9b26554/gpa.svg)](https://codeclimate.com/repos/5722f999db67c30068003d60/feed)
[![Test Coverage](https://codeclimate.com/repos/5722f999db67c30068003d60/badges/feedbd14a4dfe9b26554/coverage.svg)](https://codeclimate.com/repos/5722f999db67c30068003d60/coverage)

#### Usage

```javascript
const foos = ko.observableArray([
  { id: 1, text: 'foo' },
  { id: 2, text: 'bar' },
  { id: 3, text: 'baz' },
  { id: 4, text: 'qux' }
]).extend({
  _: true
})

const wantsOdds = ko.observable(true)

const flippedAndFilteredFoos = foos
  ._.map((foo) => {
    foo.text = foo.text.split('').reverse().join('')
    return foo
  })
  ._.filter((foo) =>
    foo.id % 2 === (wantsOdds() ? 1 : 0))

flippedAndFilteredFoos()
// { id: 1, text: 'oof' },
// { id: 3, text: 'zab' }

wantsOdds(false)

flippedAndFilteredFoos()
// { id: 2, text: 'rab' },
// { id: 4, text: 'xuq' }
```
