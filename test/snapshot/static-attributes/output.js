"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRm) {
    (function () {
        oRm.write("<button ");
        oRm.writeAttribute("id", "myButton");
        oRm.writeAttribute("type", "button");
        oRm.writeClasses();
        oRm.write(">");
        oRm.writeEscaped("Click me!");
        oRm.write("</button>");
    })();
}
