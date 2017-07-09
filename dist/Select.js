"use strict";

sap.ui.define(["sap/ui/core/Control"], function (Control) {

    return Control.extend("sample.controls.Select", {
        metadata: {
            library: "sample.controls",
            properties: {
                selectedKey: { type: "string", defaultValue: "" }
            },
            aggregations: {
                items: { type: "sap.ui.core.Item", multiple: true }
            },
            defaultAggregation: "items"
        },

        onAfterRendering: function onAfterRendering() {
            this.$("select").on("change", function () {
                this.setProperty("selectedKey", this.$("select").val(), true);
            }.bind(this));
        },

        renderer: function renderer(oRm, oC) {
            function isSelected(val) {
                return oC.getSelectedKey() === val ? { selected: "selected" } : {};
            }

            (function () {
                oRm.write("<div ");
                oRm.writeControlData(oC);
                oRm.addClass("field");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<p ");
                oRm.addClass("control");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<span ");
                oRm.addClass("select");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<select ");
                oRm.writeAttributeEscaped("id", oC.getId() + "-select");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<option ");
                oRm.writeAttribute("value", "");

                (function (mA) {
                    var mAttr = mA || {};

                    for (var sKey in mAttr) {
                        if (mAttr.hasOwnProperty(sKey)) {
                            oRm.writeAttributeEscaped(sKey, mAttr[sKey]);
                        }
                    }
                })(isSelected(""));

                oRm.writeClasses();
                oRm.write(">");
                oRm.write("</option>");
                oRm.writeEscaped(((oC.getItems() || []).forEach(function (i) {
                    return (function () {
                        oRm.write("<option ");
                        oRm.writeAttributeEscaped("value", i.getKey());

                        (function (mA) {
                            var mAttr = mA || {};

                            for (var sKey in mAttr) {
                                if (mAttr.hasOwnProperty(sKey)) {
                                    oRm.writeAttributeEscaped(sKey, mAttr[sKey]);
                                }
                            }
                        })(isSelected(i.getKey()));

                        oRm.writeClasses();
                        oRm.write(">");
                        oRm.writeEscaped((i.getText()) || "");
                        oRm.write("</option>");
                    })();
                })) || "");
                oRm.write("</select>");
                oRm.write("</span>");
                oRm.write("</p>");
                oRm.write("</div>");
            })();
        }
    });
});
//# sourceMappingURL=Select.js.map