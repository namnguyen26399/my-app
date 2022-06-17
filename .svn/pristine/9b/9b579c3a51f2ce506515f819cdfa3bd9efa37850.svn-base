<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-row>
			<v-col>
				<v-form>
					<v-jsf
						aria-disabled="true"
						v-model="model"
						:schema="schema"
						@change="handle()"
					/>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						class="rounded-pill"
						@click.stop="save"
					>
						{{ $t("button.save") }}
					</v-btn>
					<v-btn
						color="blue darken-1 rounded-pill"
						text
						@click.stop="restore"
					>
						{{ $t("button.restore") }}
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import VJsf from "@koumoul/vjsf/lib/VJsf";
import store from "@/store";
import globalService from "@/services/global.service";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";

export default {
	name: "ThemeConfigVue",
	components: {
		VJsf,
		BreadcrumbsVue,
	},
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
	},
	data() {
		return {
			model: store.state.config.theme,
			schema: {
				type: "object",
				properties: {
					primary: {
						type: "string",
						title: this.$t("title.primary"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
					secondary: {
						type: "string",
						title: this.$t("title.secondary"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
					accent: {
						type: "string",
						title: this.$t("title.accent"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
					error: {
						type: "string",
						title: this.$t("title.error"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
					info: {
						type: "string",
						title: this.$t("title.info"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
					success: {
						type: "string",
						title: this.$t("title.success"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
					warning: {
						type: "string",
						title: this.$t("title.warning"),
						format: "hexcolor",
						"x-props": {
							showSwatches: true,
							hideCanvas: true,
							hideInputs: true,
							hideModeSwitch: true,
						},
					},
				},
			},
		};
	},
	methods: {
		restore() {
			this.$vuetify.theme.themes.light = {
				primary: "#C62828",
				secondary: "#424242",
				accent: "#82B1FF",
				error: "#FF5252",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FFC107",
			};
			this.model = this.$vuetify.theme.themes.light;
		},
		async save() {
			let response;
			let tmp = Object.assign({}, store.state.config.theme);
			tmp.primary = this.model.primary;
			tmp.secondary = this.model.secondary;
			tmp.accent = this.model.accent;
			tmp.error = this.model.error;
			tmp.info = this.model.info;
			tmp.success = this.model.success;
			tmp.warning = this.model.warning;
			try {
				if (!store.state.config.theme || !store.state.config.theme.id) {
					response = await globalService.postData_Async(
						`/api/theme-configs`,
						tmp,
					);
				} else {
					response = await globalService.putData_Async(
						`/api/theme-configs/${store.state.config.theme.id}`,
						tmp,
					);
				}
				if (!response || !response.state) {
					this.toastError(this.$t("error.update_fail"));
				}
				this.toastSuccess(this.$t("success.updated"));
				store.state.config.theme = response.data;
				this.$vuetify.theme.themes.light = this.model;
			} catch (error) {
				this.toastError(error);
			}
		},
		handle() {
			this.$vuetify.theme.themes.light = this.model;
		},
	},
};
</script>
