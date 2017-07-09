//eslint-disable-next-line no-unused-vars
function render(oRm, sTitle, aRows) {
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
}
