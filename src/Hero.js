sap.ui.define([
   "sap/ui/core/Control",
   "sample/controls/library"
], function(Control, library) {

    return Control.extend("sample.controls.Hero", {
        metadata: {
            library: "sample.controls",
            properties: {
                title: {type: "string"},
                subtitle: {type: "string"},
                color: {type: "sample.controls.Color", defaultValue: library.Color.Primary},
                size: {type: "sample.controls.HeroSize", defaultValue: library.HeroSize.Small}
            },
            aggregations: {
                headerNavItems: {type: "sap.ui.core.Item", multiple: true},
                footerNavItems: {type: "sap.ui.core.Item", multiple: true}
            }
        },

        renderer: function(oRm, oC) {
            oRm.render(
                <section ui5ControlData={ oC }
                    class={{
                        "hero": true,
                        "is-primary": oC.getColor() === library.Color.Primary,
                        "is-info": oC.getColor() === library.Color.Info,
                        "is-success": oC.getColor() === library.Color.Success,
                        "is-warning": oC.getColor() === library.Color.Warning,
                        "is-danger": oC.getColor() === library.Color.Danger,
                        "is-light": oC.getColor() === library.Color.Light,
                        "is-dark": oC.getColor() === library.Color.Dark,
                        "is-medium": oC.getSize() === library.HeroSize.Medium,
                        "is-large": oC.getSize() === library.HeroSize.Large,
                        "is-fullheight": oC.getSize() === library.HeroSize.FullHeight,
                    }}>
                    <div class="hero-head">
                        <header class="nav">
                        <div class="container">
                            <div class="nav-right nav-menu">
                            {
                                (oC.getHeaderNavItems() || []).forEach(i => (
                                    <a class="nav-item is-active">{ i.getText() }</a>
                                ))
                            }
                            </div>
                        </div>
                        </header>
                    </div>

                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <h1 class="title">{ oC.getTitle() }</h1>
                            <h2 class="subtitle">{ oC.getSubtitle() }</h2>
                        </div>
                    </div>
                    <div class="hero-foot">
                        <nav class="tabs">
                        <div class="container">
                            <ul>
                            {
                                (oC.getFooterNavItems() || []).forEach(i => (
                                    <li><a>{ i.getText() }</a></li>
                                ))
                            }
                            </ul>
                        </div>
                        </nav>
                    </div>
                </section>
            );
        }

    });

})
