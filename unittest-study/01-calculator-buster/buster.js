var config = exports; // Vanity

config["Browser tests"] = {
	rootPath :"./",
    environment: "browser",
    sources: ["src/calculator.js"],
    tests: ["test/calculator.js"]
};

config["Server tests"] = {
    extends: "Browser tests",
    environment: "node"
};

