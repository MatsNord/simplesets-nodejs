var config = module.exports;
config["web-module"] = {
    environment: "browser",
    rootPath: "./",
    sources: ["src/simplesetsmodule.js"],
    tests: ["test/test_sets.js"],
    libs: ["lib/require.js"],
    extensions: [require("buster-amd")]
};



//config["Browser tests"] = {
//    //autoRun: false,
//	rootPath :"./",
//    environment: "browser",
//    sources:["src/simplesetsmodule.js"],
//    tests: ["test/test_sets.js"],
//    lib: ["lib/require.js"],
//    extensions: [require("buster-amd")]
//};

//config["Server tests"] = {
//    extends: "Browser tests",
 //   environment: "node"
//};

//var config = module.exports;
//
//config["Browser tests"] = {
//    rootPath: "../",
//    sources: ["src/**/*.js"],
//    tests: ["test/**/*.js"],
//    extensions: [require("buster-amd")]
//};
