"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pep = require('apep');
var pep_sep = require('apep-std-sep');

var lineBreak = pep.str('\n');

/**
    Headers
*/
var h1 = exports.h1 = pep_sep.between('# ', lineBreak);
var h2 = exports.h2 = pep_sep.between('## ', lineBreak);
var h3 = exports.h3 = pep_sep.between('### ', lineBreak);
var h4 = exports.h4 = pep_sep.between('#### ', lineBreak);
var h5 = exports.h5 = pep_sep.between('##### ', lineBreak);
var h6 = exports.h6 = pep_sep.between('###### ', lineBreak);

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
    Direct link
*/
var link = exports.link = function link(text, _link) {
    return pep.seq('[', text, '](', _link, ')');
};

/**
    Link to a definition.
*/
var reference = exports.reference = function reference(text, id) {
    return pep.seq('[', text, '][', id, ']');
};

/**
    Definition of a link
*/
var linkDefinition = exports.linkDefinition = function linkDefinition(id, def) {
    return pep.seq('[', id, ']: ', def);
};

/**
    Output each generator as its own block section.
*/
var paragraphs = exports.paragraphs = pep_sep.sepBy.bind(null, pep.str('\n\n'));

/**
    Output each generator as its own sentence.
*/
var sentences = exports.sentences = pep_sep.sepBy.bind(null, pep.str(' '));

var list = function list(start) {
    var sepInner = pep.seq(lineBreak, start);
    return function () {
        for (var _len = arguments.length, generators = Array(_len), _key = 0; _key < _len; _key++) {
            generators[_key] = arguments[_key];
        }

        return pep.seq(start, pep_sep.sepBy.apply(pep_sep, [sepInner].concat(generators)), lineBreak);
    };
};

/**
    Put the result of each generator into a list.

    @param ...generators One or more generators.
*/
var orderedList = exports.orderedList = list(pep.str('1. '));
var unorderedList = exports.unorderedList = list(pep.str('* '));

var manyList = function manyList(many, start) {
    var makeList = function makeList(x) {
        return pep.seq(start, pep.lit(x), lineBreak);
    };
    return function (g, prob) {
        return many(pep.join(g)).chain(makeList);
    };
};

/**
    Run a generator zero or more times, putting results into a list.

    @param g Generator.
    @param prob See `pep.many`.
*/
var manyOrderedList = exports.manyOrderedList = manyList(pep.many, pep.str('1. '));
var manyUnorderedList = exports.manyUnorderedList = manyList(pep.many, pep.str('* '));

/**
    Run a generator one or more times, putting results into a list.

    @param g Generator.
    @param prob See `pep.many`.
*/
var many1OrderedList = exports.many1OrderedList = manyList(pep.many1, pep.str('1. '));
var many1UnorderedList = exports.many1UnorderedList = manyList(pep.many1, pep.str('* '));
//# sourceMappingURL=index.js.map
