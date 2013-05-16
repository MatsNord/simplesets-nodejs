//buster.spec.expose(); // Make some functions global


define( ["src/simplesetsmodule"], function ( sets ) {

    describe( "Simple sets", function () {

            it( "states the obvious", function () {
                expect( true ).toEqual( true );
            } );

            it( "is a object", function () {
                expect( sets ).toBeDefined();
            } );

            it( "creates a set when new Set() is called", function () {
                expect( new sets.Set() ).toBeDefined();
            } );
	});


            describe( "primary functions", function () {

                beforeEach( function () {
                    this.s1 = new sets.Set( [1, 2, 3] );
                    this.s2 = new sets.Set( [ 42 ] );
                    this.nullset = new sets.Set();
                } );

                it( "knows its size", function () {
                    var s1 = this.s1, nullset = this.nullset;
                    expect( s1.size() ).toEqual( 3 );
                    expect( nullset.size() ).toEqual( 0 );
                    var s3 = new sets.Set( 0 );
                    expect( s3.size() ).toEqual( 0 );
                } );

                it( "knows what it contains", function () {
                    var s1 = this.s1;
                    expect( s1.has( 1 ) ).toBeTruthy();
                    expect( s1.has( 4 ) ).toBeFalsy();
                } );

                it( "is able to remove items", function () {
                    var s1 = this.s1;
                    s1.remove( 2 );
                    expect( s1.size() ).toEqual( 2 );
                    expect( s1.has( 2 ) ).toBeFalsy();
                } );

                it( "can add items", function () {
                    var nullset = this.nullset;
                    this.nullset.add( 42 );
                    expect( nullset.has( 42 ) ).toBeTruthy();
                } );

                it( "can copy itself", function () {
                    var s1 = this.s1;
                    expect( s1.copy() ).toEqual( s1 );
                    expect( s1.copy() ).not.toBe( s1 );
                } );

                it( "can be compared by content", function () {
                    var s1 = this.s1, s2 = this.s2;
                    expect( s1.equals( new sets.Set( [1, 2, 3] ) ) ).toBeTruthy();
                    expect( s2.equals( s2 ) ).toBeTruthy();
                    expect( s1.equals( s1.copy() ) ).toBeTruthy();
                    expect( s1.equals( s2 ) ).not.toBeTruthy();
                } );

                it( "returns its content as array", function () {
                    var s1 = this.s1;
		    expect( typeof s1.array() ).toEqual(typeof [1, 2, 3] );	
//                    assert.equals( typeof s1.array(), typeof [1, 2, 3] );
                } );
            } );

            describe( "pop", function () {
                beforeEach( function () {
                    this.s1 = new sets.Set( [1, 2, 3] );
                    this.nullset = new sets.Set();
                } );

                it( "returns a random element", function () {
                    var s1 = this.s1, nullset = this.nullset;
                    var e = s1.pop();
                    expect( e ).toMatch( /[1-3]/ );
                    expect( nullset.pop() ).toBeNull();
                } );

                it( "removes the element", function () {
                    var s1 = this.s1, nullset = this.nullset;
                    var e = s1.pop();
                    expect( s1.has( e ) ).not.toMatch( /[1-3]/ );
                    expect( s1.size() ).toEqual( 2 );
                } );
            } );

            describe( "pick", function () {

                beforeEach( function () {
                    this.s1 = new sets.Set( [1, 2, 3] );
                    this.nullset = new sets.Set();
                } );

                it( "returns an random element", function () {
                    var s1 = this.s1, nullset = this.nullset;
                    var e = s1.pick();
                    expect( e ).toMatch( /[1-3]/ );
                    expect( nullset.pick() ).toBeNull();
                } );

                it( "does not remove the element", function () {
                    var s1 = this.s1, nullset = this.nullset;
                    var e = s1.pick();
                    expect( s1.has( e ) ).toBeTruthy();
                    expect( s1.size() ).toEqual( 3 );
                } );
            } );

            describe ( "union", function(){
                var s1, s2;
                beforeEach( function () {
                     s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
                     s2 = new sets.Set( [3, "1", "foo"] );
                } );

                it( "creates a new set of all items which are members of either s1 or s2", function () {
                    var nullset = new sets.Set();
                    expect( s1.union( s2 ).equals( new sets.Set( [1, 2, 3, "1", "2", "3", "foo"] ) ) ).toBeTruthy();
                    expect( nullset.union( nullset.copy() ).size() === 0 ).toBeTruthy();
                });

                it( "does not modify any set set", function () {
                    expect( s1.union( s2 ) ).toBeDefined();
                    expect( s1.equals( new sets.Set( [1, 2, 3, "1", "2", "3"] ) ) ).toBeTruthy();
                    expect( s2.equals( new sets.Set( [3, "1", "foo"] ) ) ).toBeTruthy();
                } );

            });
});
