const jsx = require("babel-plugin-syntax-jsx");
const Renderer = require("./Renderer");
const transformer = require("./transformer");

/**
 * Checks if the current path should be processed. Only the top-most JSXElement
 * of a chain of elements is processed.
 */
function shouldProcess(path) {
    return !!path.parent && path.parent.type !== "JSXElement";
}

/**
 * Builds an error handling function for the given path.
 */
function buildErrorHandler(path) {
    return function(node, text) {
        throw path.hub.file.buildCodeFrameError(node, text);
    }
}

/**
 * Transforms the given path (if it should be processed).
 */
function transform(path) {
    if (shouldProcess(path)) {
        const renderer = Renderer.forPath(path);
        transformer(path.node, renderer, buildErrorHandler(path));
        // replace the render call if present, else replace the JSX
        if (Renderer.isParent(path)) {
            path.parentPath.replaceWith(renderer.toFunctionCall());
        } else {
            path.replaceWith(renderer.toFunctionCall());
        }
    }
}

module.exports = {
    inherits: jsx,
    visitor: {
        JSXElement: {
            exit: transform
        }
    }
};
