"use strict";
const pep = require('apep');
const pep_sep = require('apep-std-sep');

/**
    Italicize the result of a generator.
*/
export const italic = pep_sep.between('*', '*');

/**
    Bold the result of a generator.
*/
export const bold = pep_sep.between('**', '**');

/**
    Strike through the result of a generator.
*/
export const strike = pep_sep.between('~~', '~~');

/**
    Output each generator as its own block section.
*/
export const paragraphs = pep_sep.sepBy.bind(null, '\n\n');

const list = (start) =>
    (...generators) => 
        pep.seq(start, pep_sep.sepBy(start, ...generators));

/**
*/
export const orderedList = list(pep.str('1. '));
export const unorderedList = list(pep.str('* '));
 
const manyList = (many, start) => {
    const makeList = x => pep.seq(start, pep.list(x));
    return (g, prob) =>
        many(pep.join(g)).chain(makeList);
};

/**
*/
export const manyOrderedList = manyList(pep.many, pep.str('1. '));
export const manyUnorderedList = manyList(pep.many, pep.str('* '));

/**
*/
export const many1OrderedList = manyList(pep.many1, pep.str('1. '));
export const many1UnorderedList = manyList(pep.many1, pep.str('* '));