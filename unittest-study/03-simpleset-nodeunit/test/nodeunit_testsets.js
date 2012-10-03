var assert = require('assert');
var sets   = require('../lib/simplesets');

exports['Set() Create simplesets'] = function (test) {
    var s1 = new sets.Set([1, 2, 3]);
    var s2 = new sets.Set();
    test.done();
};

exports['has() returns false for nullsets'] = function (test) {
    var nullset = new sets.Set();
    assert.equal(nullset.has(), false);
    assert.equal(nullset.has(null), false);
    assert.equal(nullset.has([null]), false);
    assert.equal(nullset.has([]), false);
    assert.equal(nullset.has([0]), false);
    assert.equal(nullset.has(0), false);
    test.done();
};

exports['sise() returns  correct size'] = function (test) {
    var s1 = new sets.Set([1, 2, 3]);
    var s2 = new sets.Set();
    var s3 = new sets.Set([]);
    assert.equal(s1.size(), 3);
    assert.equal(s2.size(), 0);
    assert.equal(s3.size(), 0);
    test.done();
};

exports['remove() removes an element from set'] = function (test) {
    var s1 = new sets.Set( [1, 2, 3] );
    s1.remove(2);
    assert.equal(s1.size(), 2);
    assert.equal(s1.has( 1 ), true);
    test.done();
};

exports['add() adds an element to set'] = function (test) {
    var s1 = new sets.Set( );
    s1.add( 42 );
    assert( s1.has( 42 ) );
    test.done();
};


exports['equals() consider sets with similar content as equal'] = function (test) {
    var s1 = new sets.Set( [ 1, 2, 3 ] );
    var s2 = new sets.Set( [ 42 ] );
    assert.ok(s1.equals(new sets.Set([1, 2, 3])));
    assert.ok(s2.equals(s2));
    assert.ok(s1.equals(s1.copy()));
    assert.ok(!s1.equals(s2));
    test.done();
};

exports['copy() creates a copy'] = function (test) {
    var s1 = new sets.Set( [1, 2, 3] );
    assert.ok(s1.copy() !== s1);
    test.done();
};

exports['copy() creates a copy'] = function (test) {
    var s1 = new sets.Set( [1, 2, 3] );
    assert.deepEqual(s1.copy(), s1);
    test.done();
};

exports['array() returns the set content as array'] = function (test) {
    var s1 = new sets.Set( [1, 2, 3] );
    assert.strictEqual(typeof s1.array(), typeof [1, 2, 3]);
    test.done();
};


exports['superset() / subset() is complementary'] = function (test){
    var s1 = new sets.Set([1, 2, 3, "1", "2", "3"]);
    var s1sub = new sets.Set([1,"3", 2]);
    var s2 = new sets.Set([1,42]);
    assert.ok(s1.issuperset(s1sub));
    assert.ok(!s1sub.issuperset(s1));
    assert.ok(s1sub.issubset(s1));
    assert.ok(!s2.issubset(s1));
    test.done();

};

exports['subset() tests'] = function (test) {
    var s1 = new sets.Set([1, 2, 3, "1", "2", "3"]);
    var s1sub = new sets.Set([1, "3", 2]);
    test.done();

};

exports['union() union two sets with no duplicates'] = function (test) {
    var s1 = new sets.Set([1, 2, 3, "1", "2", "3"]);
    var s2 = new sets.Set([3, "1", "foo"]);
    var nullset = new sets.Set();
    assert.ok(s1.union(s2).equals(new sets.Set([1, 2, 3, "1", "2", "3", "foo"])));
    assert.ok(nullset.union(nullset.copy()).size() === 0);
    test.done();
};

exports['intersection() '] = function (test) {
    var s1 = new sets.Set([1, 2, 3, "1", "2", "3"]);
    var s2 = new sets.Set([3, "1", "foo"]);
    // we have already tested equals, so it is OK to use,
    // we cannot use array() to test, because sets may reorder items.
    assert.ok(s1.intersection(s2).equals(new sets.Set(["1", 3])));
    test.done();
};

exports['difference() - the elements in set 1 that is not in set 2: s1.difference(s2) '] = function (test) {
    var s1 = new sets.Set([1, 2, 3, "1", "2", "3"]);
    var s2 = new sets.Set([3, "1", "foo"]);
    assert.ok(s1.difference(s2).equals(new sets.Set([1, 2, "2", "3"])));
    // Does not need to triangulate, but it shows the symmetry
    assert.ok(s2.difference(s1).equals(new sets.Set(["foo"])));
    test.done();
};

exports['symmetric_difference() - the union without the intersection'] = function (test) {
    var s1 = new sets.Set([1, 2, 3, "1", "2", "3"]);
    var s2 = new sets.Set([3, "1", "foo"]);
    assert.ok(s1.symmetric_difference(s2).equals(new sets.Set([1, 2, "2", "3", "foo"])));
    test.done();
};


