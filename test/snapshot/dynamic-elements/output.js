"use strict";

//eslint-disable-next-line no-unused-vars
function render(oRm, sTitle, aRows) {
    (function () {
        oRm.write("<div ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("<span ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.writeEscaped((sTitle) || "");
        oRm.write("</span>");
        oRm.write("<table ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("<thead ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("<tr ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("<th ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.writeEscaped("Column");
        oRm.write("</th>");
        oRm.write("</tr>");
        oRm.write("</thead>");
        oRm.write("<tbody ");
        oRm.writeClasses();
        oRm.write(">");
        oRm.writeEscaped((aRows.forEach(function (sRow) {
            return (function () {
                oRm.write("<tr ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<td ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped((sRow) || "");
                oRm.write("</td>");
                oRm.write("</tr>");
            })();
        })) || "");
        oRm.write("</tbody>");
        oRm.write("</table>");
        oRm.write("</div>");
    })();
}
