//eslint-disable-next-line no-unused-vars
function render(oRenderManager, bInclude) {
    oRenderManager.render(
        <div>
        {
            bInclude && <span>I am here!</span>
        }
        </div>
    );
}
