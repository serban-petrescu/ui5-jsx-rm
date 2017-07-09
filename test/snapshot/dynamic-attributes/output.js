"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRm, oC) {
    (function () {
        oRm.write("<button ");
        oRm.writeAttribute("id", "myButton");
        oRm.writeAttributeEscaped("type", oC.isButton() ? "button" : "submit");
        oRm.writeClasses();
        oRm.write(">");
        oRm.writeEscaped("Click me!");
        oRm.write("</button>");
    })();
}
