if (typeof require == "function" && typeof module == "object") {
    buster = require("buster");
    require("../src/sets");
}

var assert = buster.assert;

buster.testCase("Sets", {
        setUp: function () {
            this.sets = sets();
        },
        "basic set construction add, remove, size, copy, equals, and has.": function () {
            var sets = this.sets;
            var s1 = new sets.Set( [1, 2, 3] );
            var s2 = new sets.Set();
            assert.equals( s1.size(), 3 );

            assert.equals( s2.size(), 0 );
            assert.equals( s1.has( 2 ), true );
            assert.equals( s1.has( 4 ), false );
            assert.equals( s2.has( 1 ), false );
            s1.remove( 2 );
            s1.add( 42 );
            s2.add( 3 );
            s2.add( 4 );
            s2.remove( 3 );
            assert.equals( s1.has( 2 ), false );
            assert.equals( s2.has( 3 ), false );
            assert.equals( s2.has( 4 ), true );
            assert( s1.equals( new sets.Set( [42, 1, 3] ) ) );
            assert( s2.equals( s2 ) );
            assert( s1.equals( s1.copy() ) );
            assert( s1.copy() !== s1 );
            assert( !s1.equals( s2 ) );
            assert( typeof s1.array() == typeof [1, 2, 3] );

        },
        "test two-set operations, using mixed number and string keys": function () {
            var sets = this.sets;
            var s3 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
            var s4 = new sets.Set( [3, "1", "foo"] );
            var nullset = new sets.Set();
            var s3sub = new sets.Set( [1, "3", 2] );
            assert( s3.issuperset( s3sub ) );
            assert( !s3sub.issuperset( s3 ) );
            assert( s3sub.issubset( s3 ) );
            assert( !s4.issubset( s3 ) );
            assert( s3.union( s4 ).equals( new sets.Set( [1, 2, 3, "1", "2", "3", "foo"] ) ) );
            assert( s3.intersection( s4 ).equals( new sets.Set( ["1", 3] ) ) );
            assert( s3.difference( s4 ).equals( new sets.Set( [1, 2, "2", "3"] ) ) );
            assert( s3.symmetric_difference( s4 ).equals( new sets.Set( [1, 2, "2", "3", "foo"] ) ) );
            assert( nullset.union( nullset.copy() ).size() === 0 );
        },
        "tests Test the pop operation": function () {
            var sets = this.sets;
            var sa = new sets.Set( [3, 1, 4, 1, 5, 9] );
            var sb = new sets.Set();
            for ( var i = 0; i < 200; i++ ) {
                var sa_copy = sa.copy();
                sb.add( sa_copy.pop() );
                assert( sa_copy.size() === sa.size() - 1 );
            }
            assert( sb.issubset( sa ) );
        },
        "tests Test the pick operation, in much the same way": function () {
            var sets = this.sets;
            var sa = new sets.Set( [3, 1, 4, 1, 5, 9] );
            var sb = new sets.Set();
            var nullset = new sets.Set();

            for ( var i = 0; i < 200; i++ ) {
                var sa_old_size = sa.size();
                sb.add( sa.pick() );
                assert( sa.size() === sa_old_size );
            }

            assert( sb.issubset( sa ) );
            assert( nullset.pick() === null );
            assert( nullset.pop() === null );
            assert( nullset.issubset( nullset ) );
        },
        "tests Make sure add and remove return the set, for chaining": function () {
            var sets = this.sets;
            var s5 = new sets.Set();
            s5.add( 3 ).add( 4 ).remove( 3 );
            assert( s5.equals( new sets.Set( [4] ) ) );
        },

        "tests Test each() function": function () {
            var sets = this.sets;
            var set_test_each = function (s) {
                n = new sets.Set();
                s.each( function (x) {
                    assert( !n.has( x ) );
                    n.add( x );
                } );
                assert( n.equals( s ) );
                assert( s.equals( n ) );
            };
            set_test_each( new sets.Set( [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9] ) );
            set_test_each( new sets.Set( [1, 2, 3, "1", "2", "3", "foo"] ) );
            set_test_each( new sets.Set() );
            set_test_each( new sets.Set( {foo: 42} ) );
        },

        ///////////////////////
        // sets.StringSet tests
        ///////////////////////

        "tests Test basic set construction, add, remove, size, copy, equals, and has": function () {
            var sets = this.sets;
            var s1 = new sets.StringSet( [1, 2, 3] );
            var s2 = new sets.StringSet();
            assert.equals( s1.size(), 3 );
            assert.equals( s2.size(), 0 );
            assert.equals( s1.has( 2 ), true );
            assert.equals( s1.has( 4 ), false );
            assert.equals( s2.has( 1 ), false );
            s1.remove( 2 );
            s1.add( 42 );
            s2.add( 3 );
            s2.add( 4 );
            s2.remove( 3 );
            assert.equals( s1.has( 2 ), false );
            assert.equals( s2.has( 3 ), false );
            assert.equals( s2.has( 4 ), true );
            assert( s1.equals( new sets.StringSet( [42, 1, 3] ) ) );
            assert( s2.equals( s2 ) );
            assert( s1.equals( s1.copy() ) );
            assert( s1.copy() !== s1 );
            assert( !s1.equals( s2 ) );
            assert( typeof s1.array() == typeof [1, 2, 3] );
        },

        "tests Test two-set operations, using mixed number and string keys": function () {
            var sets = this.sets;
            var s3 = new sets.StringSet( [1, 2, 3, "11", "22", "33"] );
            var s4 = new sets.StringSet( [3, "11", "foo"] );
            var nullset = new sets.StringSet();
            var s3sub = new sets.StringSet( [1, "33", 2] );
            assert( s3.issuperset( s3sub ) );
            assert( !s3sub.issuperset( s3 ) );
            assert( s3sub.issubset( s3 ) );
            assert( !s4.issubset( s3 ) );
            assert( s3.intersection( s4 ).equals( new sets.StringSet( ["11", 3] ) ) );
            assert( s3.difference( s4 ).equals( new sets.StringSet( [1, 2, "22", "33"] ) ) );
            assert( s3.symmetric_difference( s4 ).equals( new sets.StringSet( [1, 2, "22", "33", "foo"] ) ) );
            assert( nullset.union( nullset.copy() ).size() === 0 );
        },

        "Test the pop operation": function () {
            var sets = this.sets;
            var sa = new sets.StringSet( [3, 1, 4, 1, 5, 9] );
            var sb = new sets.StringSet();

            for ( var i = 0; i < 200; i++ ) {
                var sa_copy = sa.copy();
                sb.add( sa_copy.pop() );
                assert( sa_copy.size() === sa.size() - 1 );
            }

            assert( sb.issubset( sa ) );
        },
        "Test the pick operation, in much the same way.": function () {
            var sets = this.sets;
            var sa = new sets.StringSet( [3, 1, 4, 1, 5, 9] );
            var sb = new sets.StringSet();
            var nullset = new sets.StringSet();

            for ( var i = 0; i < 200; i++ ) {
                var sa_old_size = sa.size();
                sb.add( sa.pick() );
                assert( sa.size() === sa_old_size );
            }

            assert( sb.issubset( sa ) );
            assert( nullset.pick() === null );
            assert( nullset.pop() === null );
            assert( nullset.issubset( nullset ) );
        },
        "tests Make sure add and remove return the set, for chaining.": function () {
            var sets = this.sets;
            var s5 = new sets.StringSet();
            s5.add( 3 ).add( 4 ).remove( 3 );
            assert( s5.equals( new sets.StringSet( [4] ) ) );
        },
        "tests Test each() function on stringsets": function () {
            var sets = this.sets;

            var stringset_test_each = function(s) {
                n = new sets.StringSet();
                s.each( function (x) {
                    assert( !n.has( x ) );
                    n.add( x );
                } );
                assert( n.equals( s ) );
                assert( s.equals( n ) );
            }
            stringset_test_each( new sets.StringSet( [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9] ) );
            stringset_test_each( new sets.StringSet( [1, 2, 3, "11", "22", "33", "foo"] ) );
            stringset_test_each( new sets.StringSet() );
            stringset_test_each( new sets.StringSet( {foo: 42} ) );
        
        }
    }
);

