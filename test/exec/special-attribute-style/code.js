/* global oRm */
var sColor = "red";
oRm.render(
    <span style={ {color: sColor} }>My Text</span>
);

sColor = "green"
oRm.render(
    <span style={ {color: sColor} }>My Text</span>
);

oRm.render(
    <span style={ [{name: "color", value: "red"}] }>My Text</span>
);

oRm.render(
    <span style="color: red">My Text</span>
);

