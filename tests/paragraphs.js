"use strict";
const pep = require('apep');
const pep_md = require('../index');
const assert = require('assert');

describe('paragraphs', function () {
    it('Should yield just value for single generator.', () => {
        assert.deepStrictEqual(
            [],
            Array.from(pep_md.paragraphs(pep.empty)));
    
        assert.deepStrictEqual(
            ['a'],
            Array.from(pep_md.paragraphs('a')));
        
        assert.deepStrictEqual(
            ['a', 'b', 'c'],
            Array.from(pep_md.paragraphs(['a', 'b', 'c'])));
    });
    
    it('Should put separators between generator arguments.', () => {
        assert.deepStrictEqual(
            ['a', '\n\n', 'b'],
            Array.from(pep_md.paragraphs('a', 'b')));
        
        assert.deepStrictEqual(
            ['a', '\n\n', 'b', 'c', '\n\n', 'd'],
            Array.from(pep_md.paragraphs('a', ['b', 'c'], 'd')));
    });
});