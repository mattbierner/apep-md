"use strict";
const pep = require('apep');
const pep_sep = require('apep-std-sep');

const lineBreak = pep.str('\n');

/**
    Headers
*/
export const h1 = pep_sep.between('# ', lineBreak);
export const h2 = pep_sep.between('## ', lineBreak);
export const h3 = pep_sep.between('### ', lineBreak);
export const h4 = pep_sep.between('#### ', lineBreak);
export const h5 = pep_sep.between('##### ', lineBreak);
export const h6 = pep_sep.between('###### ', lineBreak);

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
    Direct link
*/
export const link = (text, link) =>
    pep.seq('[', text, '](', link, ')'); 

/**
    Link to a definition.
*/
export const reference = (text, id) =>
    pep.seq('[', text, '][', id, ']'); 

/**
    Definition of a link
*/
export const linkDefinition = (id, def) =>
    pep.seq('[', id, ']: ', def); 

/**
    Output each generator as its own block section.
*/
export const paragraphs = pep_sep.sepBy.bind(null, pep.str('\n\n'));

/**
    Output each generator as its own sentence.
*/
export const sentences = pep_sep.sepBy.bind(null, pep.str(' '));


const list = (start) => {
    const sepInner = pep.seq(lineBreak, start);
    return (...generators) => 
        pep.seq(
            start,
            pep_sep.sepBy(sepInner, ...generators),
            lineBreak);
};

/**
    Put the result of each generator into a list.

    @param ...generators One or more generators.
*/
export const orderedList = list(pep.str('1. '));
export const unorderedList = list(pep.str('* '));
 
const manyList = (many, start) => {
    const makeList = x => pep.seq(start, pep.lit(x), lineBreak);
    return (g, prob) =>
        many(pep.join(g)).chain(makeList);
};

/**
    Run a generator zero or more times, putting results into a list.

    @param g Generator.
    @param prob See `pep.many`.
*/
export const manyOrderedList = manyList(pep.many, pep.str('1. '));
export const manyUnorderedList = manyList(pep.many, pep.str('* '));

/**
    Run a generator one or more times, putting results into a list.

    @param g Generator.
    @param prob See `pep.many`.
*/
export const many1OrderedList = manyList(pep.many1, pep.str('1. '));
export const many1UnorderedList = manyList(pep.many1, pep.str('* '));