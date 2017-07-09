sap.ui.define([
   "sap/ui/core/Control"
], function(Control) {

    return Control.extend("sample.controls.FormElement", {
        metadata: {
            library: "sample.controls",
            properties: {
                label: {type: "string", defaultValue: ""}
            },
            aggregations: {
                field: {type: "sap.ui.core.Control", multiple: false}
            },
            defaultAggregation: "field"
        },

        renderer: function(oRm, oC) {
            oRm.render(
                <div ui5ControlData={ oC } class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">{ oC.getLabel() }</label>
                    </div>
                    <div class="field-body">
                        <ui5Control>{ oC.getField() }</ui5Control>
                    </div>
                </div>
            );
        }
    });
});
