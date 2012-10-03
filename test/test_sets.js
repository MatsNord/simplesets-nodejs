define( ["src/amd/simplesetsmodule"], function ( sets ) {
    buster.testCase( "Sets", {

        setUp:function () {
        },
        "Set() creates simplesets":function () {
            var s1 = new sets.Set( [1, 2, 3] );
            var s2 = new sets.Set();
            assert.isObject( s2 );
            assert.isObject( s1 );
        },

        "size() return size of the set":function () {
            var s1 = new sets.Set( [1, 2, 3] );
            var s2 = new sets.Set();
            var s3 = new sets.Set( [] );
            assert.equals( s1.size(), 3 );
            assert.equals( s2.size(), 0 );
            assert.equals( s3.size(), 0 );
        },
        "has() return true if item is in the set":function () {
            var s1 = new sets.Set( [1, 2, 3] );
            assert.equals( s1.has( 1 ), true );
            assert.equals( s1.has( 4 ), false );
        },
        "has() return false for nullsests":function () {
            var nullset = new sets.Set();
            assert.equals( nullset.has(), false );
            assert.equals( nullset.has( null ), false );
            assert.equals( nullset.has( [null] ), false );
            assert.equals( nullset.has( [] ), false );
            assert.equals( nullset.has( [0] ), false );
            assert.equals( nullset.has( 0 ), false );
        },
        "remove() removes an element from set":function () {
            var s1 = new sets.Set( [1, 2, 3] );
            s1.remove( 2 );
            assert.equals( s1.size(), 2 );
            refute( s1.has( 2 ) );
        },
        "add() adds an element to set":function () {
            var s1 = new sets.Set();
            s1.add( 42 );
            assert.equals( s1.has( 42 ), true );
        },
        "copy() copies the set":function () {
            var s1 = new sets.Set( [1, 2, 3] );
            assert.equals( s1.copy(), s1 );
            refute.same( s1.copy(), s1 );
        },
        "equals() consider sets with similar content as equal":function () {
            var s1 = new sets.Set( [ 1, 2, 3 ] );
            var s2 = new sets.Set( [ 42 ] );
            assert( s1.equals( new sets.Set( [1, 2, 3] ) ) );
            assert( s2.equals( s2 ) );
            assert( s1.equals( s1.copy() ) );
            refute( s1.equals( s2 ) );
        },

        "array() returns the set content as array":function () {
            var s1 = new sets.Set( [1, 2, 3] );
            assert.equals( typeof s1.array(), typeof [1, 2, 3] );
        },

        "pop() pops a random element from set":function () {
            var s1 = new sets.Set( [ 3, 1, 2 ] );
            var nullset = new sets.Set();
            var e = s1.pop();
            refute( s1.has( e ) );
            assert.equals( s1.size(), 2 );
            assert.equals( nullset.pop(), null );
        },
        "pick() picks a random element from set, does not remove":function () {
            var s1 = new sets.Set( [ 3, 1, 2 ] );
            var nullset = new sets.Set();
            var e = s1.pick();
            assert( s1.has( e ) );
            assert.equals( s1.size(), 3 );
            assert.equals( nullset.pick(), null );
        },
        "sets should chain when add and remove items":function () {
            var s1 = new sets.StringSet();
            s1.add( 3 ).add( 4 ).remove( 3 );
            assert( s1.equals( new sets.StringSet( [4] ) ) );
        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "issuperset() should recognize supersets":function () {
            var superset = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s1 = new sets.Set( [1, "3", 2] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            assert( superset.issuperset( s1 ) );
            refute( superset.issuperset( s2 ) );
        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "issubset() should recognize subsets":function () {
            var s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var subset = new sets.Set( [1, "3", 2] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            assert( subset.issubset( s1 ) );
            refute( s2.issubset( s1 ) );
        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "union() creates a new set of all items which are members of either s1 or s2":function () {
            var s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            var nullset = new sets.Set();
            assert( s1.union( s2 ).equals( new sets.Set( [1, 2, 3, "1", "2", "3", "foo"] ) ) );
            assert( nullset.union( nullset.copy() ).size() === 0 );

        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "union() does not modify any set set":function () {
            var s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            assert( s1.union( s2 ) );
            assert( s1.equals( new sets.Set( [1, 2, 3, "1", "2", "3"] ) ) );
            assert( s2.equals( new sets.Set( [3, "1", "foo"] ) ) );
        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "difference() relative complement of s1 and s2, only items that is unique for s1 are returned":function () {
            var s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            assert( s1.difference( s2 ).equals( new sets.Set( [1, 2, "2", "3"] ) ) );
        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "intersection() all elements of s1 that also belong to s2, symmetrically":function () {
            var s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            assert( s1.intersection( s2 ).equals( new sets.Set( ["1", 3] ) ) );
            // Does not need to triangulate, but it shows the symmetry
            assert( s2.intersection( s1 ).equals( new sets.Set( ["1", 3] ) ) );
            refute( s1.intersection( s2 ).has( 1 ) );
            refute( s2.intersection( s1 ).has( "3" ) );
        },
        /*Refactor test only numbersets, break out tests of stringsets*/
        "symmetric_difference() all elements which are in either of the sets and not in their intersection":function () {
            var s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s2 = new sets.Set( [3, "1", "foo"] );
            assert( s1.symmetric_difference( s2 ).equals( new sets.Set( [1, 2, "2", "3", "foo"] ) ) );
            assert( s2.symmetric_difference( s1 ).equals( new sets.Set( [1, 2, "2", "3", "foo"] ) ) );
            refute( s1.intersection( s2 ).equals( new sets.Set( [1, 2, "2", "3", "foo"] ) ) );
        }
        /* Here should tests of stringset follow - the tests above should be refactored to not test on strings */

        /* At last, tests combination of strins and numbers, chaining, etcetera */
    } );
} );
