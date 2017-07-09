"use strict";

sap.ui.define(["sap/ui/core/Control"], function (Control) {

    return Control.extend("sample.controls.Form", {
        metadata: {
            library: "sample.controls",
            aggregations: {
                elements: { type: "sample.controls.FormElement", multiple: true }
            },
            defaultAggregation: "elements"
        },

        renderer: function renderer(oRm, oC) {
            (function () {
                oRm.write("<div ");
                oRm.writeControlData(oC);

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
                })({ container: true, "is-fluid": true });

                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(((oC.getElements() || []).forEach(function (e) {
                    return (function () {
                        oRm.renderControl(e);
                    })();
                })) || "");
                oRm.write("</div>");
            })();
        }
    });
});
//# sourceMappingURL=Form.js.map