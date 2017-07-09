/* global test, expect */
const plugin = require("../src");
const path = require("path");
const fs = require("fs");
const babel = require("babel-core");

const files = fs.readdirSync(path.join(__dirname, "exec"));

function exec(file) {
    var res = babel.transformFileSync(file, {presets: ["env"], plugins: [plugin]});
    var rm = new RenderManager();
    (new Function("oRm", res.code))(rm);
    return rm.buffer;
}

(files || []).forEach(function(file) {
    var dir = path.join(__dirname, "exec", file);
    if (fs.lstatSync(dir).isDirectory()) {
        test("exec-" + file, function() {
            var res = exec(path.join(dir, "code.js"));
            var out = fs.readFileSync(path.join(dir, "output.html"), "utf-8");
            expect(res.trim()).toBe(out.trim().replace(/ *\n */g, ""));
        })
    }
})

function RenderManager() {
    this.buffer = "";
    this.styles = [];
    this.classes = [];
}

RenderManager.prototype.addClass = function (sClass) {
    this.classes.push(sClass);
};

RenderManager.prototype.addStyle = function (name, value) {
    this.styles.push({name, value});
};

RenderManager.prototype.renderControl = function (oC) {
    this.buffer += "<control>" + oC + "</control>";
};

RenderManager.prototype.write = RenderManager.prototype.writeEscaped = function (text) {
    this.buffer += text;
};

RenderManager.prototype.writeAttribute = RenderManager.prototype.writeAttributeEscaped = function (a, v) {
    this.buffer += " " + a + "=\"" + v + "\"";
};

RenderManager.prototype.writeControlData = function (c) {
    this.buffer += " control-data=\"" + c + "\"";
};

RenderManager.prototype.writeElementData = function (c) {
    this.buffer += " element-data=\"" + c + "\"";
};

RenderManager.prototype.writeClasses = function () {
    if (this.classes.length) {
        this.buffer += " class=\"" + this.classes.join(" ") + "\"";
        this.classes = [];
    }
}

RenderManager.prototype.writeStyles = function () {
    if (this.styles.length) {
        this.buffer += " style=\"" + this.styles.map(function(s){
            return s.name + ": " + s.value;
        }).join("; ") + "\"";
        this.styles = [];
    }
}
