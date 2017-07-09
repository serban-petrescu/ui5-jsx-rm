//eslint-disable-next-line no-unused-vars
function render(oRm, oC) {
    oRm.render(
        <button id="myButton" type={ oC.isButton() ? "button" : "submit" }>Click me!</button>
    );
}
