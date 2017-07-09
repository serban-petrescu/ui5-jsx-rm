# JSX to UI5 Render Manager [![Build Status](https://travis-ci.org/serban-petrescu/ui5-jsx-rm.svg?branch=master)](https://travis-ci.org/serban-petrescu/ui5-jsx-rm) [![Coverage Status](https://coveralls.io/repos/github/serban-petrescu/ui5-jsx-rm/badge.svg?branch=master)](https://coveralls.io/github/serban-petrescu/ui5-jsx-rm?branch=master) [![License](https://img.shields.io/github/license/serban-petrescu/ui5-jsx-rm.svg)](https://github.com/serban-petrescu/ui5-jsx-rm/blob/master/LICENSE)
Babel plugin for converting JSX to UI5 render manager calls.

## Usage
You can install the plugin through npm: `npm install spet-ui5-jsx-rm --save-dev` and then use it as any other [babel plugin](https://babeljs.io/docs/plugins/). It should be used together with a [babel preset](https://babeljs.io/docs/plugins/#presets-official-presets) that can support arrow functions (as the transpilation produces arrow functions).

### Example
Assuming that you have a `webapp` folder with our js files and you want to transpile them into the `dist` folder, you should first make a `.babelrc` file with the following content:
```javascript
{
    "presets": ["env"],
    "plugins": ["spet-ui5-jsx-rm"]
}
```
Then you can run the following command in your terminal of choice: `babel webapp --out-dir dist`.

### Tips
When using babel to transpile code which cannot natively run in the browser (like JSX), you should use a tool for watching your files for changes and recompiling them automatically. Babel has a [--watch](https://babeljs.io/docs/usage/cli/#babel-compile-files) flag for this. Alternatively, you can use a task runner like [Grunt](https://gruntjs.com/) to do more advanced stuff (like serving the files on a simple web server and doing live reload).

## Features
### Basic HTML tags
You can use all the regular HTML tags directly inside your .js files (wrapped into a render manager `.render` method call).

Input:
```javascript
function (oRm) {
    oRm.render(<div></div>);
}
```
Output:
```javascript
function (oRm) {
    oRm.write("<div ");
    oRm.writeClasses();
    oRm.write(">");
    oRm.write("</div>");
}
```

### Dynamic RenderManager detection
The plugin expects you to wrap your JSX inside a `render` call. The identifier on which you do this call will be used throughout the transpilation process (for that particular JSX tree). 

Input:
```javascript
function render(oRm) {
    oRm.render(<div></div>);
    
    var oRenderManager = oRm;
    oRenderManager.render(<div></div>)
}
```
Output:
```javascript
function render(oRm) {
    oRm.write("<div ");
    oRm.writeClasses();
    oRm.write(">");
    oRm.write("</div>");
    
    var oRenderManager = oRm;
    oRenderManager.write("<div ");
    oRenderManager.writeClasses();
    oRenderManager.write(">");
    oRenderManager.write("</div>");
}
```
### Embedded JavaScript expressions 
Expressions (e.g. conditionals, `forEach` iterations) can be used for specifying attribute values, child nodes, etc.

Input:
```javascript
function render(oRenderManager, bInclude) {
    oRenderManager.render(
        <div> { bInclude && <span>I am here!</span> } </div>
    );
}
```
Output:
```javascript
function render(oRenderManager, bInclude) {
    oRenderManager.write("<div ");
    oRenderManager.writeClasses();
    oRenderManager.write(">");
    oRenderManager.writeEscaped((bInclude && (function () {
        oRenderManager.write("<span ");
        oRenderManager.writeClasses();
        oRenderManager.write(">");
        oRenderManager.writeEscaped("I am here!");
        oRenderManager.write("</span>");
    })()) || "");
    oRenderManager.write("</div>");
}
```
### Dynamic class and style specification
The styles and clases for a given html node can either be specified directly as a string or they can be build dynamically. 
#### Classes
When building the classes of a html node dynamically, you can use a JavaScript expression which either returns:
- an array of strings (each string is interpreted as a class).
- a map between string-keys (which indicate the class names) and boolean-values (`true` means that the class should be applied to the DOM, `false` otherwise).

Example:
```javascript
function render(oRenderManager) {
    oRenderManager.render(
        <div class="bold red">Plain</div>
        <div class={ ["bold", "red"] }>With Array</div>
        <div class={ { bold: true, red: true } }>With Object</div>
    );
}
```
#### Styles
When building the style of a html node dynamically, you can use a JavaScript expression which either returns:
- an array of objects. Each object should have a `name` property and a `value` property. If the value is null, then the style is not applied.
- a map betwen string-keys (which indicate the style names) and any-values (which give the style value; if a value is null, then the corresponding style is not applied).

Example:
```javascript
function render(oRenderManager) {
    oRenderManager.render(
        <div style="color: red">Plain</div>
        <div style={ [{name: "color", value: "red"}] }>With Array</div>
        <div style={ { color: "red" } }>With Object</div>
    );
}
```
### UI5-specific constructs 
UI5-specific constructs (child controls, control data, accessibility state) can be used through "special" attributes or tags.
#### Control / element data
To write control or element data to the DOM, a set of special element attributes can be used: `ui5ControlData` and `ui5ElementData`. They expect a JSX expression which will result in a control or an element.

Input:
```javascript
function render(oRenderManager, oControl) {
    oRenderManager.render(
        <div ui5ControlData={ oControl }></div>
    );
}
```
Output:
```javascript
function (oRenderManager, oControl) {
    oRenderManager.write("<div ");
    oRenderManager.writeControlData(oControl);
    oRenderManager.writeClasses();
    oRenderManager.write(">");
    oRenderManager.write("</div>");
}
```
#### Child controls
Child controls may also be rendered using a special tag: `ui5Control`.

Input:
```javascript
function render(oRm, oC) {
    oRm.render(
        <ui5Control>{ oC }</ui5Control>
    );
}
```
Output:
```javascript
function render(oRm, oC) {
    oRm.renderControl(oC);
}
```
#### Accessibility state
Calls to the [writeAccessibilityState](https://sapui5.hana.ondemand.com/sdk/#docs/api/symbols/sap.ui.core.RenderManager.html#writeAccessibilityState) method of the render manager can be achived using a special attribute `ui5AccessibilityData`. It should be assigned a JavaScript expression which returns an object with two properties: `element` and `props` (which are then passed to the corresponding parameters of the render manager method). 
#### Spread attributes
To enable the usage of dynamic attributes, the [spread attributes](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes) syntax may be used.
## Samples
You can check out the [sample](https://github.com/serban-petrescu/ui5-jsx-rm/tree/master/sample) folder for a working library of controls based on JSX renderers. The transpiled code is running on [GitHub Pages here](https://serban-petrescu.github.io/ui5-jsx-rm/).
Smaller snippets of code can be found in the [test](https://github.com/serban-petrescu/ui5-jsx-rm/tree/master/test) folder. In the `snapshot` subfolder, you can find JSX renderers together with the corresponding transpiled code and in the `exec` subfolder you can find JSX renderers together with the resulting HTML code.
