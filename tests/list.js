"use strict";
const pep = require('apep');
const pep_md = require('../index');
const assert = require('assert');

describe('list', function () {
    it('Should put single generator into list.', () => {
        assert.deepStrictEqual(
            "1. a\n",
            pep_md.orderedList('a').run());
        
        assert.deepStrictEqual(
            "1. abc\n",
            pep_md.orderedList(['a', 'b', 'c']).run());
    });

    it('Should put result of each generator into list.', () => {
        assert.deepStrictEqual(
            "1. a\n1. bc\n1. d\n",
            pep_md.orderedList('a', ['b', 'c'], 'd').run());
    });
});