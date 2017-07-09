/* global test, expect */
const plugin = require("../src");
const path = require("path");
const fs = require("fs");
const babel = require("babel-core");

const files = fs.readdirSync(path.join(__dirname, "error"));

(files || []).forEach(function(file) {
    test("error-" + file, function() {
        var e;
        try {
            babel.transformFileSync(path.join(__dirname, "error", file), {presets: ["env"], plugins: [plugin]})
        } catch (ex) {
            e = ex;
        }
        expect(e).toBeDefined();
    })
})

