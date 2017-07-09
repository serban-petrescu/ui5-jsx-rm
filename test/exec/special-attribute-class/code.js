/* global oRm */
var bIsBold = false;
oRm.render(
    <span class={ {bold: bIsBold} }>My Text</span>
);

bIsBold = true;
oRm.render(
    <span class={ {bold: bIsBold} }>My Text</span>
);

oRm.render(
    <span class="bold">My Text</span>
);

oRm.render(
    <span class={ ["bold", "italic"] }>My Text</span>
);
