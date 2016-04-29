'use strict';

var _ = require('lodash');
var ko = require('knockout');

function KodashWrapper(obs) {
  this.obs = obs;
}

KodashWrapper.prototype.wrapProtoFn = function (protoFn) {
  return function () {
    var _this = this;

    var protoFnArgs = [];
    for (var i = 0; i < arguments.length; ++i) {
      protoFnArgs[i] = arguments[i];
    }

    return ko.pureComputed(function () {
      return protoFn.bind(_(_this.obs())).apply(undefined, protoFnArgs).value();
    }).extend({
      _: true
    });
  };
};
_.mixin(KodashWrapper.prototype, _(_.prototype).mapValues(function (protoFn) {
  return KodashWrapper.prototype.wrapProtoFn(protoFn);
}).value());

ko.extenders._ = function (obs) {
  obs._ = new KodashWrapper(obs);
  return obs;
};