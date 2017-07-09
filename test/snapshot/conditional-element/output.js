"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRenderManager, bInclude) {
    (function () {
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
    })();
}
