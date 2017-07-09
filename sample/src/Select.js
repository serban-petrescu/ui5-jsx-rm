sap.ui.define([
   "sap/ui/core/Control"
], function(Control) {

    return Control.extend("sample.controls.Select", {
        metadata: {
            library: "sample.controls",
            properties: {
                selectedKey: {type: "string", defaultValue: ""}
            },
            aggregations: {
                items: {type: "sap.ui.core.Item", multiple: true}
            },
            defaultAggregation: "items"
        },

        onAfterRendering: function () {
            this.$("select").on("change", function() {
                this.setProperty("selectedKey", this.$("select").val(), true);
            }.bind(this))
        },

        renderer: function(oRm, oC) {
            function isSelected(val) {
                return (oC.getSelectedKey() === val ? {selected: "selected"} : {});
            }

            oRm.render(
                <div ui5ControlData={ oC } class="field">
                    <p class="control">
                        <span class="select">
                        <select id={ oC.getId() + "-select" }>
                            <option value="" { ...isSelected("") }></option>
                            {
                                (oC.getItems() || []).forEach(i => (
                                    <option value={ i.getKey() } { ...isSelected(i.getKey()) }>
                                        { i.getText() }
                                    </option>
                                ))
                            }
                        </select>
                        </span>
                    </p>
                </div>
            );
        }
    });
});
