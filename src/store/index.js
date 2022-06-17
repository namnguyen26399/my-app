import Vue from "vue";
import Vuex from "vuex";
import globalService from "../services/global.service";
import app from "@/main";
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		initialized: false,
		loading: false,
		config: {
			apiUrl: "",
			theme: {},
			encrypt: false,
			azureAppId: "",
			appBar: false,
		},
	},
	getters: {},
	mutations: {},
	config: {
		apiUrl: "",
	},
	actions: {
		async initialize() {
			let response;
			try {
				response = await globalService.getLocalData_Async(
					"/json/config.json",
				);
				if (!response) {
					return;
				}
				this.state.initialized = true;
				this.state.config = response;
				response = await globalService.getData_Async(
					`/api/theme-configs/1`,
				);
				if (!response) {
					return;
				}
				if (!response.state) {
					return;
				}
				this.state.config.theme = response.data;
				app.$vuetify.theme.themes.light = response.data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	modules: {},
});
export default store;
