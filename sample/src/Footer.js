sap.ui.define([
   "sap/ui/core/Control"
], function(Control) {

    return Control.extend("sample.controls.Footer", {
        metadata: {
            library: "sample.controls"
        },

        renderer: function(oRm, oC) {
            oRm.render(
                <footer ui5ControlData={ oC } class="footer">
                    <div class="container">
                        <div class="content has-text-centered">
                        <p>
                            <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                        </p>
                        <p>
                            <strong>JSX-UI5 Babel Plugin</strong> by <a href="http://serban-petrescu.github.io">Serban Petrescu</a>. The source code is licensed
                            <a href="https://opensource.org/licenses/Apache-2.0">Apache-2.0</a>.
                        </p>
                        </div>
                    </div>
                </footer>
            );
        }
    });
});
