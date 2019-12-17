# ko-projections

[![NPM](https://img.shields.io/npm/v/ko-projections.svg)](https://www.npmjs.com/package/ko-projections)
![WTFPL](https://img.shields.io/npm/l/ko-projections.svg)
[![Travis](https://img.shields.io/travis/Profiscience/ko-projections.svg)](https://travis-ci.org/Profiscience/ko-projections)
[![Coverage Status](https://coveralls.io/repos/github/Profiscience/ko-projections/badge.svg?branch=master)](https://coveralls.io/github/Profiscience/ko-projections?branch=master)
[![Dependency Status](https://img.shields.io/david/Profiscience/ko-projections.svg)](https://david-dm.org/Profiscience/ko-projections)
[![Peer Dependency Status](https://img.shields.io/david/peer/Profiscience/ko-projections.svg?maxAge=2592000)](https://david-dm.org/Profiscience/ko-projections#info=peerDependencies&view=table)
[![Greenkeeper badge](https://badges.greenkeeper.io/Profiscience/ko-projections.svg)](https://greenkeeper.io/)
[![NPM Downloads](https://img.shields.io/npm/dt/ko-projections.svg?maxAge=2592000)](http://npm-stat.com/charts.html?package=ko-projections&author=&from=&to=)

> NOTICE: This repo is deprecated. Prefer the following pattern.
>
> ```typescript
> import { flow } from 'lodash'
> import { map, filter } from 'lodash/fp'
> import ko from 'knockout'
>
> const flippedAndFilteredFoos = ko.pureComputed(() => flow(
>   map((foo) => {
>     foo.text = foo.text.split('').reverse().join('')
>     return foo
>   }),
>   filter((foo) => foo.id % 2 === (wantsOdds() ? 1 : 0))
> )(foos))
> ```

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
