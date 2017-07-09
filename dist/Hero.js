"use strict";

sap.ui.define(["sap/ui/core/Control", "sample/controls/library"], function (Control, library) {

    return Control.extend("sample.controls.Hero", {
        metadata: {
            library: "sample.controls",
            properties: {
                title: { type: "string" },
                subtitle: { type: "string" },
                color: { type: "sample.controls.Color", defaultValue: library.Color.Primary },
                size: { type: "sample.controls.HeroSize", defaultValue: library.HeroSize.Small }
            },
            aggregations: {
                headerNavItems: { type: "sap.ui.core.Item", multiple: true },
                footerNavItems: { type: "sap.ui.core.Item", multiple: true }
            }
        },

        renderer: function renderer(oRm, oC) {
            (function () {
                oRm.write("<section ");
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
                })({
                    "hero": true,
                    "is-primary": oC.getColor() === library.Color.Primary,
                    "is-info": oC.getColor() === library.Color.Info,
                    "is-success": oC.getColor() === library.Color.Success,
                    "is-warning": oC.getColor() === library.Color.Warning,
                    "is-danger": oC.getColor() === library.Color.Danger,
                    "is-light": oC.getColor() === library.Color.Light,
                    "is-dark": oC.getColor() === library.Color.Dark,
                    "is-medium": oC.getSize() === library.HeroSize.Medium,
                    "is-large": oC.getSize() === library.HeroSize.Large,
                    "is-fullheight": oC.getSize() === library.HeroSize.FullHeight
                });

                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("hero-head");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<header ");
                oRm.addClass("nav");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("container");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("nav-right");
                oRm.addClass("nav-menu");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(((oC.getHeaderNavItems() || []).forEach(function (i) {
                    return (function () {
                        oRm.write("<a ");
                        oRm.addClass("nav-item");
                        oRm.addClass("is-active");
                        oRm.writeClasses();
                        oRm.write(">");
                        oRm.writeEscaped((i.getText()) || "");
                        oRm.write("</a>");
                    })();
                })) || "");
                oRm.write("</div>");
                oRm.write("</div>");
                oRm.write("</header>");
                oRm.write("</div>");
                oRm.write("<div ");
                oRm.addClass("hero-body");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("container");
                oRm.addClass("has-text-centered");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<h1 ");
                oRm.addClass("title");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped((oC.getTitle()) || "");
                oRm.write("</h1>");
                oRm.write("<h2 ");
                oRm.addClass("subtitle");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped((oC.getSubtitle()) || "");
                oRm.write("</h2>");
                oRm.write("</div>");
                oRm.write("</div>");
                oRm.write("<div ");
                oRm.addClass("hero-foot");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<nav ");
                oRm.addClass("tabs");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<div ");
                oRm.addClass("container");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<ul ");
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(((oC.getFooterNavItems() || []).forEach(function (i) {
                    return (function () {
                        oRm.write("<li ");
                        oRm.writeClasses();
                        oRm.write(">");
                        oRm.write("<a ");
                        oRm.writeClasses();
                        oRm.write(">");
                        oRm.writeEscaped((i.getText()) || "");
                        oRm.write("</a>");
                        oRm.write("</li>");
                    })();
                })) || "");
                oRm.write("</ul>");
                oRm.write("</div>");
                oRm.write("</nav>");
                oRm.write("</div>");
                oRm.write("</section>");
            })();
        }

    });
});
//# sourceMappingURL=Hero.js.map