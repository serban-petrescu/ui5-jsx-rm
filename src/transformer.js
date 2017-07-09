const t = require("babel-types");

module.exports = function (nd, renderer, error) {

    /**
     * Retrieve the tag string for an element node.
     */
    function getElementTag(node) {
        if (node.openingElement && t.isJSXIdentifier(node.openingElement.name)) {
            return node.openingElement.name.name;
        } else {
            error(node.openingElement, "Unable to parse opening tag.");
        }
    }

    /**
     * Transforms the special attribute with the given name.
     */
    function transformSpecialAttribute(name, attribute) {
        if (t.isJSXExpressionContainer(attribute.value)) {
            let value = attribute.value.expression;
            switch (name) {
                case "ui5ControlData":
                    renderer.renderControlData(value);
                    break;
                case "ui5ElementData":
                    renderer.renderElementData(value);
                    break;
                case "ui5AccessibilityData":
                    renderer.handleAccessibilityData(value);
                    break;
                default:
                    error(attribute, "Unknown special attribute: '" + name + "'.");
            }
        } else {
            error(attribute, "Only expressions supported in special attributes.");
        }
    }

    /**
     * Transforms the style specification in either a plain attribute rendering
     * or a handler function call.
     */
    function transformStyles(value) {
        if (t.isStringLiteral(value)) {
            renderer.renderAttributeExpression("style", value);
        } else if (t.isJSXExpressionContainer(value)){
            renderer.handleStyles(value.expression);
        } else {
            error(value, "Unknown style specification type.");
        }
    }

    /**
     * Transforms the class specification into either a sequence of add-class
     * renderer calls or a handler function call.
     */
    function transformClasses(value) {
        if (t.isStringLiteral(value)) {
            value.value.split(" ").forEach(function(cls) {
                renderer.addClass(cls);
            });
        } else if (t.isJSXExpressionContainer(value)){
            renderer.handleClasses(value.expression);
        } else {
            error(value, "Unknown class specification type.");
        }
    }

    /**
     * Transforms a single "plain" (non-spread) attribute.
     */
    function transfromPlainAttribute(attribute) {
        let name = attribute.name.name;
        if (name.startsWith("ui5")) {
            transformSpecialAttribute(name, attribute);
        } else if (name === "style") {
            transformStyles(attribute.value);
        } else if (name === "class") {
            transformClasses(attribute.value);
        } else if (t.isStringLiteral(attribute.value)) {
            renderer.renderAttributeExpression(name, attribute.value);
        } else if (t.isJSXExpressionContainer(attribute.value)) {
            renderer.renderAttributeExpression(name, attribute.value.expression, true);
        } else {
            error(attribute, "Unable to process attribute value.");
        }
    }

    /**
     * Transforms a single attribute (either spread or "plain").
     */
    function transformAttribute(attribute) {
        if (t.isJSXAttribute(attribute)) {
            transfromPlainAttribute(attribute);
        } else if (t.isJSXSpreadAttribute(attribute)) {
            renderer.handleSpreadAttribute(attribute.argument);
        } else {
            error(attribute, "Unable to process attribute.");
        }
    }

    function transformAttributes(attributes) {
        attributes.forEach(transformAttribute);
    }

    function transformChild(node) {
        if (t.isJSXText(node)) {
            if (/\S/.test(node.value)) {
                renderer.renderPlain(node.value, true);
            }
        } else if (t.isJSXElement(node)) {
            transformElement(node);
        } else if (t.isJSXExpressionContainer(node)) {
            renderer.renderExpressionWithFallback(node.expression);
        } else {
            error(node, "Unknown JSX node type: '" + node.type + "'.");
        }
    }

    /**
     * Function for handlign special elements (tags).
     */
    function transformSpecialElement(tag, node) {
        if (node.children.length === 1 && t.isJSXExpressionContainer(node.children[0])) {
            if (tag === "ui5Control") {
                renderer.renderControl(node.children[0].expression);
            } else {
                error(node, "Unknown special element: '" + tag + "'.");
            }
        } else {
            error(node, "Only expressions supported in special elements.");
        }
    }

    function transformElement(node) {
        let tag = getElementTag(node);
        if (tag.startsWith("ui5")) {
            transformSpecialElement(tag, node);
        } else {
            renderer.renderPlain("<" + tag + " ");
            transformAttributes(node.openingElement.attributes || []);
            renderer.renderClasses();
            renderer.renderPlain(node.selfClosing ? "/>" : ">");
            (node.children || []).forEach(transformChild);
            if (node.closingElement && !node.selfClosing) {
                renderer.renderPlain("</" + tag + ">");
            }
        }
    }

    transformElement(nd);
};
