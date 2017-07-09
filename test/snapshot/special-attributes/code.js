//eslint-disable-next-line no-unused-vars
function render(oRm, oC) {
    oRm.render(
        <div ui5AccessibilityData={ {element: oC, props: {role: "separator"}} }
            ui5ControlData={ oC }
            ui5ElementData={ oC }
            class={ {myClass: true} }
            style={ {width: "100%"} }>
            <div class="my-class b" style="width: 100%">
            </div>
        </div>
    );
}
