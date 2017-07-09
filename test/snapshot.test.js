const pluginTester = require("babel-plugin-tester");
const plugin = require("../src");
const path = require("path");

pluginTester({
  plugin,
  pluginName: "spet-ui5-jsx-rm",
  fixtures: path.join(__dirname, "snapshot"),
  babelOptions: {
      presets: ["env"]
  }
})



