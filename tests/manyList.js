"use strict";
const pep = require('apep');
const pep_md = require('../index');
const assert = require('assert');

const listRe = (middle) =>
    new RegExp('^(1\. ' + middle + '\n)*$');;

const times = (x, f) => {
    for (var i = 0; i < x; ++i)
        f();
};

const assertIsList = (expected, g) => {
    const found = g.run();
    assert.ok(found.match(listRe(expected)), found);
};

describe('manyList', function () {
    it('Should put single value generator into lists.', () => {
        times(20, () => {
            assertIsList('a',
                pep_md.orderedList('a'));

        });
    });

    it('Should put mult value generators into lists.', () => {
        times(20, () => {
            assertIsList('abc',
                pep_md.manyOrderedList(['a', 'b', 'c']));
        });
    });
});