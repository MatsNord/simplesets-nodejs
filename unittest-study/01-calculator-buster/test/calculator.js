if (typeof require == "function" && typeof module == "object") {
    buster = require("buster");
    require("../src/calculator");
}

var assert = buster.assert;

buster.testCase("Calcualtor", {
    setUp: function () {
        this.calculator =  Calculator();
    },

    "should add two numbers": function () {
        assert.equals(this.calculator.add(1, 2), 1+2);
    },

   "calculator should exist":function () {
        var calculator = this.calculator;
        assert.isObject( calculator );
    },
    "adds two numbers": function(){
        var calculator = this.calculator;
        assert.equals( 1+2 , calculator.add( 1,2 ) );
    },
    "substracts two numbers": function(){
        var calculator = this.calculator;
        assert.equals( 1-2 , calculator.sub( 1,2 ) );
    },
    "multiplies two numbers": function(){
        var calculator = this.calculator;
        assert.equals( 1*2 , calculator.mult( 1,2 ) );
    },
    "divides two numbers": function(){
        var calculator = this.calculator;
        assert.equals( 1/2 , calculator.div( 1,2 ) );
    },
    "throw exception for anything else than numbers": function(){
        var calculator = this.calculator;
        assert.exception( function () {
            calculator.add( "1",2 );
            }
        );
    }
});
