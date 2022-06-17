import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueDraggable from "vuedraggable";
import VueProgressBar from "vue-progressbar";
import i18n from "./i18n";
import VJsf from "@koumoul/vjsf";
import axios from "./plugins/axios";
import VueAxios from "vue-axios";
import globalService from "./services/global.service";
import moment from "vue-moment";
import VueToast from "vue-toast-notification";
import iBaseComponent from "./mixins/iBaseComponent.mixin";
import TreeItemVue from "./components/TreeItem.vue";
import NavItemVue from "./components/NavItem.vue";

import "@koumoul/vjsf/dist/main.css";
import "vue-toast-notification/dist/theme-sugar.css";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/main.css";
import BreadcrumbsVue from "./components/Breadcrumbs.vue";
import OrgchartTreeVue from "./components/OrgchartTree.vue";
import DeleteDialogVue from "./components/DeleteDialog.vue";
import TabVue from "./components/Tab.vue";
import SelectListVue from "./components/SelectList.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "./components/form-control/form-control";
import "./components/components";
// don't forget to import CSS styles
import "tiptap-vuetify/dist/main.css";
// Vuetify's CSS styles
import "vuetify/dist/vuetify.min.css";

// load third-party dependencies (markdown-it, vuedraggable)
// you can also load them separately based on your needs
// import "@koumoul/vjsf/dist/third-party.js";
const options = {
	color: "#D50000",
	failedColor: "#B71C1C",
	thickness: "5px",
	transition: {
		speed: "0.2s",
		opacity: "1s",
		termination: 300,
	},
	autoRevert: true,
	location: "top",
	inverse: false,
};

Vue.use(VueProgressBar, options);
Vue.use(VueAxios, axios);
Vue.use(globalService);
Vue.use(moment);
Vue.use(VueToast);
Vue.mixin(iBaseComponent);
Vue.component("VJsf", VJsf);
Vue.component(VueDraggable);
Vue.component("tree-item", TreeItemVue);
Vue.component("nav-item", NavItemVue);
Vue.component("vue-breadcrumbs", BreadcrumbsVue);
Vue.component("vue-orgchart-tree", OrgchartTreeVue);
Vue.component("vue-delete-dialog", DeleteDialogVue);
Vue.component("vue-tab", TabVue);
Vue.component("vue-select-list", SelectListVue);
Vue.component("vue-perfect-scrollbar", VuePerfectScrollbar);
Vue.config.productionTip = true;
const vue = new Vue({
	router,
	store,
	i18n,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");

Vue.use(TiptapVuetifyPlugin, {
	// the next line is important! You need to provide the Vuetify Object to this place.
	vuetify, // same as "vuetify: vuetify"
	// optional, default to 'md' (default vuetify icons before v2.0.0)
	iconsGroup: "mdi",
});

vue.$vuetify.theme.dark = false;
export default vue;
