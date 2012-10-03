var config = exports; // Vanity

config["Browser tests"] = {
	rootPath :"./",
    environment: "browser",
    sources: ["src/sets.js"],
    tests: ["test/test_sets_rw.js"]
};

config["Server tests"] = {
    extends: "Browser tests",
    environment: "node"
};