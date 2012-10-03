
function Calculator(){
    var context =  {
        add:function(a,b){
           this._checkParam(a);
           this._checkParam(b);
           return a + b;
        },
        sub: function(a,b) {
            this._checkParam(a);
            this._checkParam(b);
            return a - b;

        },
        mult: function(a,b) {
            this._checkParam(a);
            this._checkParam(b);
            return a * b;

        },
        div: function(a,b) {
            this._checkParam(a);
            this._checkParam(b);
            return a / b;

        },
        _checkParam: function ( p ){
            if ( typeof p !== "number" ) {
               throw  TypeError("Not a number");
            }
        }
    };

    return context;
};
