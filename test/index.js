
const assert = require('assert');

const idna = require('..');

it('should throw error for non-exists table', () => {

    assert.throws(() => idna.getLabel(49, false, false));

});

it('should not throw for exists table', () => {

    assert.doesNotThrow(() => idna.getLabel(49, false, true));
    assert.doesNotThrow(() => idna.getLabel(49, true, false));
    assert.doesNotThrow(() => idna.getLabel(49, true, true));

});

it('should return UNDEF for not defined codes in tables', () => {

    assert.equal('UNDEF', idna.getLabel(45, true, true));
    assert.equal('UNDEF', idna.getLabel(2785, true, true));
    assert.equal('UNDEF', idna.getLabel(49, false, true));
    assert.equal('UNDEF', idna.getLabel(21, true, false));

});

it('should return PVALID for defined codes in tables', () => {

    assert.equal('PVALID', idna.getLabel(49, true, true));
    assert.equal('PVALID', idna.getLabel(224, true, true));
    assert.equal('PVALID', idna.getLabel(255, true, true));
    assert.equal('PVALID', idna.getLabel(1005, true, true));
    assert.equal('PVALID', idna.getLabel(2795, true, true));
    assert.equal('PVALID', idna.getLabel(223, false, true));

});


it('should return CONTEXTO for defined codes in tables', () => {

    assert.equal('CONTEXTO', idna.getLabel(183, true, true));
    assert.equal('CONTEXTO', idna.getLabel(885, true, true));
    assert.equal('CONTEXTO', idna.getLabel(1523, true, true));
    assert.equal('CONTEXTO', idna.getLabel(1524, true, true));
    assert.equal('CONTEXTO', idna.getLabel(1637, true, true));

});

it('should return DISALLOWED for defined codes in tables', () => {

    assert.equal('DISALLOWED', idna.getLabel(46, true, false));
    assert.equal('DISALLOWED', idna.getLabel(65, true, false));
    assert.equal('DISALLOWED', idna.getLabel(66, true, false));
    assert.equal('DISALLOWED', idna.getLabel(90, true, false));
    assert.equal('DISALLOWED', idna.getLabel(6101, true, false));

});

