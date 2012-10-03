/**
 * Created with JetBrains WebStorm.
 * User: mats
 * Date: 10/2/12
 * Time: 1:43 AM
 * To change this template use File | Settings | File Templates.
 */
var config = module.exports;

config["Browser tests"] = {
    rootPath: "./",
    sources: ["src/**/*.js"],
    tests: ["test/test_sets.js"],
    extensions: [require("buster-jstestdriver")]
};