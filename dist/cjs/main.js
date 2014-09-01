"use strict";
var Ember = require("ember")["default"] || require("ember");
var jsonld = require("jsonld")["default"] || require("jsonld");

var slice = Array.prototype.slice;

function expand(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not expand, too few arguments.');
  }
  return promisify(jsonld.expand, slice.call(arguments));
}

exports.expand = expand;function compact(input, ctx) {
  if (arguments.length < 2) {
    throw new TypeError('Could not compact: too few arguments.');
  }
  var compactFn = function(input, ctx, options, callback) {
    // ensure only one value is returned in callback
    jsonld.compact(input, ctx, options, function(err, compacted) {
      callback(err, compacted);
    });
  };
  return promisify(compactFn, slice.call(arguments));
}

exports.compact = compact;function flatten(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not flatten: too few arguments.');
  }
  return promisify(jsonld.flatten, slice.call(arguments));
}

exports.flatten = flatten;function frame(input, aFrame) {
  if (arguments.length < 2) {
    throw new TypeError('Could not frame: too few arguments.');
  }
  return promisify(jsonld.frame, slice.call(arguments));
}

exports.frame = frame;function fromRDF(dataset) {
  if (arguments.length < 1) {
    throw new TypeError('Could not convert from RDF: too few arguments.');
  }
  return promisify(jsonld.fromRDF, slice.call(arguments));
}

exports.fromRDF = fromRDF;function toRDF(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not convert to RDF: too few arguments.');
  }
  return promisify(jsonld.toRDF, slice.call(arguments));
}

exports.toRDF = toRDF;function normalize(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not normalize: too few arguments.');
  }
  return promisify(jsonld.normalize, slice.call(arguments));
}

exports.normalize = normalize;function promisify(fn, args) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    fn.apply(null, args.concat(function(err, value) {
      if(!err) {
        resolve(value);
      } else {
        reject(err);
      }
    }));
  });
}