/* global oRm */
var sTitle = "Words";
var aRows = ["Row 1", "Row 2", "Row 3"];
oRm.render(
    <div>
        <span>{ sTitle }</span>
        <table>
            <thead>
                <tr><th>Column</th></tr>
            </thead>
            <tbody>
            {
                aRows.forEach(sRow => (<tr><td>{ sRow }</td></tr>))
            }
            </tbody>
        </table>
    </div>
);
