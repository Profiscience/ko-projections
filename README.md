# ko-projections

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
