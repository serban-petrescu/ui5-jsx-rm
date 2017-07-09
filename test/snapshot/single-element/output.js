"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRm) {
    (function () {
        oRm.write("<div ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("</div>");
    })();
}
