"use strict";

sap.ui.define(["sap/ui/core/Control"], function (Control) {

    return Control.extend("sample.controls.FormElement", {
        metadata: {
            library: "sample.controls",
            properties: {
                label: { type: "string", defaultValue: "" }
            },
            aggregations: {
                field: { type: "sap.ui.core.Control", multiple: false }
            },
            defaultAggregation: "field"
        },

        renderer: function renderer(oRm, oC) {
            (function () {
                oRm.write("<div ");
                oRm.writeControlData(oC);
                oRm.addClass("field");
                oRm.addClass("is-horizontal");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("field-label");
                oRm.addClass("is-normal");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<label ");
                oRm.addClass("label");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped((oC.getLabel()) || "");
                oRm.write("</label>");
                oRm.write("</div>");
                oRm.write("<div ");
                oRm.addClass("field-body");
                oRm.writeClasses();
                oRm.write(">");
                oRm.renderControl(oC.getField());
                oRm.write("</div>");
                oRm.write("</div>");
            })();
        }
    });
});
//# sourceMappingURL=FormElement.js.map