import axios from "axios";
import app from "../main";
const instance = axios.create({
	baseURL: "/",
	config: {
		apiUrl: "",
	},
});

instance.interceptors.request.use((config) => {
	app.$Progress.start();
	return config;
});

instance.interceptors.response.use(
	(response) => {
		app.$Progress.finish();
		return Promise.resolve(response);
	},
	(error) => {
		app.$Progress.finish();
		return Promise.reject(error);
	},
);

export default instance;
