const t = require("babel-types");
const templates = require("./templates");

/**
 * Class which builds up the JavaScript code for a JSX expression based
 * on UI5 RenderManager calls.
 */
function Renderer(rm) {
    this.rm = rm;
    this.content = [];
}

Renderer.prototype.member = function(method) {
    return t.memberExpression(t.identifier(this.rm), t.identifier(method));
};

Renderer.prototype.call = function(name, args) {
    let member = this.member(name),
        call = t.callExpression(member, args);
    this.content.push(t.expressionStatement(call));
}

Renderer.prototype.renderExpression = function(expression, escaped) {
    this.call(escaped ? "writeEscaped" : "write", [expression]);
};

Renderer.prototype.renderPlain = function(value, escaped = false) {
    this.renderExpression(t.stringLiteral(value), escaped);
};

Renderer.prototype.renderExpressionWithFallback = function(expression) {
    let fallback = t.logicalExpression("||", t.parenthesizedExpression(expression), t.stringLiteral(""));
    this.renderExpression(fallback, true);
};

Renderer.prototype.renderAttributeExpression = function(name, expression, escaped = false) {
    this.call(escaped ? "writeAttributeEscaped" : "writeAttribute", [t.stringLiteral(name), expression]);
};

Renderer.prototype.handleStyles = function(expression) {
    this.content.push(templates.styles(t.identifier(this.rm), expression));
};

Renderer.prototype.handleAccessibilityData = function(expression) {
    this.content.push(templates.accessibility(t.identifier(this.rm), expression));
};

Renderer.prototype.handleClasses = function(expression) {
    this.content.push(templates.classes(t.identifier(this.rm), expression));
};

Renderer.prototype.handleSpreadAttribute = function(expression) {
    this.content.push(templates.attributes(t.identifier(this.rm), expression));
};


Renderer.prototype.addClass = function(cls) {
    this.call("addClass", [t.stringLiteral(cls)]);
};

Renderer.prototype.renderClasses = function() {
    this.call("writeClasses", []);
};

Renderer.prototype.renderControlData = function(expression) {
    this.call("writeControlData", [expression]);
};

Renderer.prototype.renderElementData = function(expression) {
    this.call("writeElementData", [expression]);
};

Renderer.prototype.renderControl = function(expression) {
    this.call("renderControl", [expression]);
};


Renderer.prototype.toFunctionCall = function() {
    let arrow = t.arrowFunctionExpression([], t.blockStatement(this.content));
    return t.callExpression(t.parenthesizedExpression(arrow), []);
};

function isRenderCall(node) {
    return t.isCallExpression(node) && t.isMemberExpression(node.callee) &&
        t.isIdentifier(node.callee.property, {name: "render"}) &&
        t.isIdentifier(node.callee.object);
}

function findRenderManager(path) {
    let parent = path.parentPath;
    while (parent && !isRenderCall(parent.node)) {
        parent = parent.parentPath;
    }
    return parent && parent.node ? parent.node.callee.object.name : "oRm";
}

Renderer.forPath = function(path) {
    return new Renderer(findRenderManager(path));
};

Renderer.isParent = function(path) {
    return !!path.parent && isRenderCall(path.parent);
};

module.exports = Renderer;
