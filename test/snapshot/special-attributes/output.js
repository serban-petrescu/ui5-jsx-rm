"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRm, oC) {
    (function () {
        oRm.write("<div ");

        (function (oSpec) {
            if (oSpec.element) {
                oRm.writeAccessibilityState(oSpec.element, oSpec.props);
            } else {
                oRm.writeAccessibilityState(oSpec.props);
            }
        })({ element: oC, props: { role: "separator" } });

        oRm.writeControlData(oC);
        oRm.writeElementData(oC);

        (function (mC) {
            var mClasses = mC || {};

            if (mClasses instanceof Array) {
                for (var i = 0; i < mClasses.length; ++i) {
                    if (mClasses[i]) {
                        oRm.addClass(mClasses[i]);
                    }
                }
            } else {
                for (var sKey in mClasses) {
                    if (mClasses.hasOwnProperty(sKey) && mClasses[sKey]) {
                        oRm.addClass(sKey);
                    }
                }
            }
        })({ myClass: true });

        (function (mS) {
            var mStyles = mS || {};

            if (mStyles instanceof Array) {
                for (var i = 0; i < mStyles.length; ++i) {
                    if (mStyles[i] && mStyles[i].name && mStyles[i].value !== null) {
                        oRm.addStyle(mStyles[i].name, mStyles[i].value);
                    }
                }
            } else {
                for (var sKey in mStyles) {
                    if (mStyles.hasOwnProperty(sKey) && mStyles[sKey] !== null) {
                        oRm.addStyle(sKey, mStyles[sKey]);
                    }
                }
            }

            oRm.writeStyles();
        })({ width: "100%" });

        oRm.writeClasses();
        oRm.write(">");
        oRm.write("<div ");
        oRm.addClass("my-class");
        oRm.addClass("b");
        oRm.writeAttribute("style", "width: 100%");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("</div>");
        oRm.write("</div>");
    })();
}
