const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: ["vuetify", "@koumoul/vjsf"],
	pluginOptions: {
		i18n: {
			locale: "vi",
			fallbackLocale: "vi",
			localeDir: "locales",
			enableInSFC: false,
			includeLocales: false,
			enableBridge: true,
		},
	},
	configureWebpack: {},
	filenameHashing: true,
});
