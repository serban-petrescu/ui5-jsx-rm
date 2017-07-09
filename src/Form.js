sap.ui.define([
   "sap/ui/core/Control"
], function(Control) {

    return Control.extend("sample.controls.Form", {
        metadata: {
            library: "sample.controls",
            aggregations: {
                elements: {type: "sample.controls.FormElement", multiple: true}
            },
            defaultAggregation: "elements"
        },

        renderer: function(oRm, oC) {
            oRm.render(
                <div ui5ControlData={ oC } class={ {container: true, "is-fluid": true} }>
                {
                    (oC.getElements() || []).forEach(e => (
                        <ui5Control>{ e }</ui5Control>
                    ))
                }
                </div>
            );
        }
    });
});
