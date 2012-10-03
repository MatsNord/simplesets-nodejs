/**
 * Created with JetBrains WebStorm.
 * User: mats
 * Date: 9/30/12
 * Time: 12:09 AM
 * To change this template use File | Settings | File Templates.
 */
var config = module.exports;
config["web-module"] = {
    environment: "browser",
    rootPath: "./",
    sources: ["src/simplesetsmodule.js"],
    tests: ["specs/spec.js"],
    libs: ["lib/require.js"],
    extensions: [require("buster-amd")]
};