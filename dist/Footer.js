"use strict";

sap.ui.define(["sap/ui/core/Control"], function (Control) {

    return Control.extend("sample.controls.Footer", {
        metadata: {
            library: "sample.controls"
        },

        renderer: function renderer(oRm, oC) {
            (function () {
                oRm.write("<footer ");
                oRm.writeControlData(oC);
                oRm.addClass("footer");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("container");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("content");
                oRm.addClass("has-text-centered");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<p ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<strong ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped("Bulma");
                oRm.write("</strong>");
                oRm.writeEscaped(" by ");
                oRm.write("<a ");
                oRm.writeAttribute("href", "http://jgthms.com");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped("Jeremy Thomas");
                oRm.write("</a>");
                oRm.writeEscaped(". The source code is licensed\n                            ");
                oRm.write("<a ");
                oRm.writeAttribute("href", "http://opensource.org/licenses/mit-license.php");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped("MIT");
                oRm.write("</a>");
                oRm.writeEscaped(".\n                        ");
                oRm.write("</p>");
                oRm.write("<p ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<strong ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped("JSX-UI5 Babel Plugin");
                oRm.write("</strong>");
                oRm.writeEscaped(" by ");
                oRm.write("<a ");
                oRm.writeAttribute("href", "http://serban-petrescu.github.io");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped("Serban Petrescu");
                oRm.write("</a>");
                oRm.writeEscaped(". The source code is licensed\n                            ");
                oRm.write("<a ");
                oRm.writeAttribute("href", "https://opensource.org/licenses/Apache-2.0");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped("Apache-2.0");
                oRm.write("</a>");
                oRm.writeEscaped(".\n                        ");
                oRm.write("</p>");
                oRm.write("</div>");
                oRm.write("</div>");
                oRm.write("</footer>");
            })();
        }
    });
});
//# sourceMappingURL=Footer.js.map