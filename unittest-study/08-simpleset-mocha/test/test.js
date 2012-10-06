/**
 * Created with JetBrains WebStorm.
 * User: mats
 * Date: 10/6/12
 * Time: 11:36 PM
 * To change this template use File | Settings | File Templates.
 */
//var assert = require("assert");
var expect = require('chai').expect,
    sets = require("../lib/simplesets.js");

describe("Simple sets", function () {

    it("states the obvious", function () {
        expect(true).to.equal(true);
    });

    it("is a object", function () {
        expect(sets).to.exist;
    });

    it("creates a set when new Set() is called", function () {
        expect(new sets.Set()).to.exist;
    });
});

describe("Simples Sets operation", function () {

    beforeEach(function () {

        this.s1 = new sets.Set([1, 2, 3]);
        this.s2 = new sets.Set([ 42 ]);
        this.nullset = new sets.Set();
    });

    describe("size", function () {

        it("knows its size", function () {
            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;
            expect(s1.size()).to.equal(3);
            expect(new sets.Set([]).size()).to.equal(0);
        });

        it("knows that undefined sets are zero sized", function () {
            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;
            expect(nullset.size()).to.equal(0);
        });

    });

    describe("has", function () {

        it("knows what it contains", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            expect(s1.has(1)).to.be.true;
            expect(s1.has(4)).to.be.false;
        });
    });

    describe("remove", function () {


        it("is able to remove items", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            s1.remove(2);

            expect(s1.size()).to.equal(2);
            expect(s1.has(2)).to.be.false;
        });
    });

    describe("add", function () {

        it("can add an item a set", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            var su = s1.copy();
            su.add(4);

            expect(su.array()).to.include(4);
            expect(su.size()).to.equal(s1.size() + 1);
        });

        it("can add item to nullset", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            nullset.add(42);

            expect(nullset.has(42)).to.be.true;
        });
    });

    describe("copy", function () {

        it("can copy itself", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            expect(s1.copy()).to.eql(s1);
        });
        it("copy is not clone", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            expect(s1.copy()).to.not.equal(s1);
        });
    });

    describe("equals", function () {

        it("can be compared by content", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            expect((new sets.Set([1, 2, 3]).equals(new sets.Set([1, 2, 3])))).to.be.true;
            expect(s2.equals(s2)).to.be.true;
            expect(s1.equals(s1.copy())).to.be.true;
            expect(s1.equals(s2)).to.be.false;
        });
    });
    describe("array", function () {

        it("returns its content as array", function () {

            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

            expect(s1.array()).to.be.an.instanceof(Array);
        });
    });

    describe("pop", function () {

        it("returns a random element", function () {

            var s1 = this.s1, nullset = this.nullset;

            var e = s1.pop();

            expect(e).to.match(/[1-3]/);
            expect(nullset.pop()).to.be.null;
        });

        it("removes the element", function () {

            var s1 = this.s1, nullset = this.nullset;

            var e = s1.pop();

            expect(s1.has(e)).to.be.false;
            expect(s1.size()).to.equal(2);
        });
    });

    describe("pick", function () {

        it("returns an random element", function () {
            var s1 = this.s1, nullset = this.nullset;

            var e = s1.pick();
            expect(e).to.match(/[1-3]/);
            expect(nullset.pick()).to.be.null;
        });

        it("does not remove the element", function () {
            var s1 = this.s1, s2 = this.s2, nullset = this.nullset;            var e = s1.pick();
            expect(s1.has(e)).ok;
            expect(s1.size()).to.equal(3);
        });
    });

     describe ( "union", function(){

         beforeEach(function (){

             this.s1 = new sets.Set( [1, 2, 3, "1", "2", "3"] );
             this.s2 = new sets.Set( [3, "1", "foo"] );
             this.nullset = new sets.Set();
         });

         it( "creates a new set of all items which are members of either s1 or s2", function () {

             var s1 = this.s1, s2 = this.s2, nullset = this.nullset;

             expect( s1.union( s2 ).equals( new sets.Set( [1, 2, 3, "1", "2", "3", "foo"] ) ) ).to.be.true;
             expect( nullset.union( nullset.copy() ).size() === 0 ).to.be.true;
         });

         it( "does not modify any set set", function () {

             var s1 = this.s1, s2 = this.s2;

             expect( s1.union( s2 ) ).to.be.defined;
             expect( s1.equals( new sets.Set( [1, 2, 3, "1", "2", "3"] ) ) ).to.be.true;
             expect( s2.equals( new sets.Set( [3, "1", "foo"] ) ) ).to.be.true;
         } );
    });
});

