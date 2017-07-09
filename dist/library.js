"use strict";

/* global sample */
sap.ui.define(["jquery.sap.global"], function () {

    /**
    * Sample JSX-based controls..
    *
    * @namespace
    * @name sample.controls
    * @author Serban Petrescu
    * @public
    */
    sap.ui.getCore().initLibrary({
        name: "sample.controls",
        dependencies: ["sap.ui.core"],
        types: ["sample.controls.HeroSize", "sample.controls.Color"],
        interfaces: [],
        controls: ["sample.controls.Hero", "sample.controls.Form", "sample.controls.FormElement", "sample.controls.Select", "sample.controls.Footer"],
        elements: [],
        noLibraryCSS: true
    });

    sample.controls.HeroSize = {
        Small: "Small",
        Medium: "Medium",
        Large: "Large",
        FullHeight: "FullHeight"
    };

    sample.controls.Color = {
        Primary: "Primary",
        Info: "Info",
        Success: "Success",
        Warning: "Warning",
        Danger: "Danger",
        Light: "Light",
        Dark: "Dark"
    };

    return sample.controls;
});
//# sourceMappingURL=library.js.map