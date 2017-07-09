/* global oRm */
var bInclude = false;
oRm.render(
    <div>
    {
        bInclude && <span>I am here!</span>
    }
    </div>
);

bInclude = true;
oRm.render(
    <div>
    {
        bInclude && <span>I am here!</span>
    }
    </div>
);
