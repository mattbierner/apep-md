"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pep = require('apep');
var pep_sep = require('apep-std-sep');

/**
    Italicize the result of a generator.
*/
var italic = exports.italic = pep_sep.between('*', '*');

/**
    Bold the result of a generator.
*/
var bold = exports.bold = pep_sep.between('**', '**');

/**
    Strike through the result of a generator.
*/
var strike = exports.strike = pep_sep.between('~~', '~~');

/**
    Output each generator as its own block section.
*/
var paragraphs = exports.paragraphs = pep_sep.sepBy.bind(null, '\n\n');

var list = function list(start) {
    return function () {
        for (var _len = arguments.length, generators = Array(_len), _key = 0; _key < _len; _key++) {
            generators[_key] = arguments[_key];
        }

        return pep.seq(start, pep_sep.sepBy.apply(pep_sep, [start].concat(generators)));
    };
};

/**
*/
var orderedList = exports.orderedList = list(pep.str('1. '));
var unorderedList = exports.unorderedList = list(pep.str('* '));

var manyList = function manyList(many, start) {
    var makeList = function makeList(x) {
        return pep.seq(start, pep.list(x));
    };
    return function (g, prob) {
        return many(pep.join(g)).chain(makeList);
    };
};

/**
*/
var manyOrderedList = exports.manyOrderedList = manyList(pep.many, pep.str('1. '));
var manyUnorderedList = exports.manyUnorderedList = manyList(pep.many, pep.str('* '));

/**
*/
var many1OrderedList = exports.many1OrderedList = manyList(pep.many1, pep.str('1. '));
var many1UnorderedList = exports.many1UnorderedList = manyList(pep.many1, pep.str('* '));
//# sourceMappingURL=index.js.map
