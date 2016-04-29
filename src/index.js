'use strict'

const _ = require('lodash')
const ko = require('knockout')

function KodashWrapper(obs) {
  this.obs = obs
}

KodashWrapper.prototype.wrapProtoFn = function(protoFn) {
  return function() {
    const protoFnArgs = []
    for (let i = 0; i < arguments.length; ++i) {
      protoFnArgs[i] = arguments[i]
    }

    return ko.pureComputed(() => {
      return protoFn.bind(_(this.obs()))(...protoFnArgs).value()
    }).extend({
      _: true
    })
  }
}
_.mixin(KodashWrapper.prototype, _(_.prototype)
  .mapValues((protoFn) => KodashWrapper.prototype.wrapProtoFn(protoFn))
  .value())

ko.extenders._ = (obs) => {
  obs._ = new KodashWrapper(obs)
  return obs
}
