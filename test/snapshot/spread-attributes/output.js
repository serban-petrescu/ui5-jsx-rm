"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRm) {
    (function () {
        oRm.write("<div ");

        (function (mA) {
            var mAttr = mA || {};

            for (var sKey in mAttr) {
                if (mAttr.hasOwnProperty(sKey)) {
                    oRm.writeAttributeEscaped(sKey, mAttr[sKey]);
                }
            }
        })({ id: "myId" });

        oRm.writeClasses();
        oRm.write(">");
        oRm.write("</div>");
    })();
}
