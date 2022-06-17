import constant from "@/common/constant";
import store from "@/store";
import AxiosStatic from "../plugins/axios";

class GlobalService {
	static get headers() {
		return {
			"Content-Type": "application/json",
		};
	}
	constructor() {
		this.axios = AxiosStatic;
	}
	async getLocalData_Async(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "GET",
				},
				config,
			);
			return response.data;
		} catch (reason) {
			if (reject instanceof Function) {
				return reject(reason);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	/**
	 *
	 * @param {string} url
	 * @param {object} config
	 * @param {Function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async getData_Async(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(store.state.config.apiUrl + url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "GET",
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	/**
	 *
	 * @param {string} url
	 * @param {Object} config
	 * @param {Function} reject
	 * @returns
	 */
	async getDataOutside_Async(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "GET",
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	/**
	 *
	 * @param {string} url
	 * @param {Object} config
	 * @param {Function} reject
	 * @returns
	 */
	async downloadStream_Async(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "GET",
					headers: GlobalService.headers,
					responseType: "stream",
				},
				config,
			);
			return response.data;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	/**
	 *
	 * @param {string} url
	 * @param {Object} config
	 * @param {Function} reject
	 * @returns
	 */
	async downloadBlob_Async(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "GET",
					headers: GlobalService.headers,
					responseType: "blob",
				},
				config,
			);
			return response.data;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	/**
	 * @param {string} url
	 * @param {object} data
	 * @param {object} config
	 * @param {function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async postData_Async(
		url,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(store.state.config.apiUrl + url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "POST",
					data: data,
				},
				config,
			);
			return response.data;
		} catch (reason) {
			if (reject instanceof Function) {
				return reject(reason);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}
	getData_NoAsync(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		let _url = store.state.config.apiUrl + url;
		return this.axios.get(_url, config).catch((reason) => {
			if (reject instanceof Function) {
				return reject(reason);
			}
			return null;
		});
	}
	postData_NoAsync(
		url,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		let _url = store.state.config.apiUrl + url;
		return this.axios.post(_url, data, config).catch((rs) => {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		});
	}

	/**
	 * @param {string} url
	 * @param {object} data
	 * @param {object} config
	 * @param {function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async putData_Async(
		url,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let response;
		try {
			let _url = await Promise.resolve(store.state.config.apiUrl + url);
			response = await this.axios(
				{
					url: _url,
					method: "PUT",
					data: data,
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (reason) {
			if (reject instanceof Function) {
				return reject(reason);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	putData_NoAsync(
		url,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		let _url = store.state.config.apiUrl + url;
		return this.axios.put(_url, data, config).catch((rs) => {
			reject(rs);
		});
	}

	/**
	 * @param {string} url
	 * @param {object} data
	 * @param {object} config
	 * @param {function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async deleteData_Async(
		url,
		data = {},
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let response;
		try {
			let _url = await Promise.resolve(store.state.config.apiUrl + url);
			response = await this.axios(
				{
					url: _url,
					method: "DELETE",
					data: data,
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	deleteData_NoAsync(
		url,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		let _url = store.state.config.apiUrl + url;
		return this.axios.delete(_url, config).catch((rs) => {
			reject(rs);
		});
	}

	/**
	 * @param {string} url
	 * @param {object} data
	 * @param {object} config
	 * @param {function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async patchData_Async(
		url,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(url);
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: "PATCH",
					data: data,
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}

	patchData_NoAsync(
		url,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		let _url = store.state.config.apiUrl + url;
		this.axios.patch(_url, data, config).catch((rs) => {
			reject(rs);
		});
	}

	/**
	 *
	 * @param {string} url
	 * @param {File} file
	 * @param {AxiosRequestConfig} config
	 * @param {Function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async upload_Async(
		url,
		file,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(store.state.config.apiUrl + url);
		let response;
		let formData = new FormData();
		formData.append("file", file);
		try {
			response = await this.axios(
				{
					url: _url,
					method: "POST",
					data: formData,
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (error) {
			reject(error);
		} finally {
			store.state.loading = false;
		}
	}

	/**
	 *
	 * @param {string} url
	 * @param {File} file
	 * @param {Object} data
	 * @param {AxiosRequestConfig} config
	 * @param {Function} reject
	 * @returns {{state:false,messgage:"",data:{}}}
	 */
	async uploadData_Async(
		url,
		file,
		data,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(store.state.config.apiUrl + url);
		let response;
		let formData = new FormData();
		formData.append(constant.keys.file, file);
		for (let key of Object.keys(data)) {
			formData.append(key, data[key]);
		}
		try {
			response = await this.axios(
				{
					url: _url,
					method: "POST",
					data: formData,
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (error) {
			reject(error);
		} finally {
			store.state.loading = false;
		}
	}

	async updateFile_Async(
		url,
		file,
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(store.state.config.apiUrl + url);
		let response;
		let formData = new FormData();
		formData.append(constant.keys.file, file);
		try {
			response = await this.axios(
				{
					url: _url,
					method: "PUT",
					data: formData,
					headers: GlobalService.headers,
				},
				config,
			);
			return response.data;
		} catch (error) {
			reject(error);
		} finally {
			store.state.loading = false;
		}
	}
}

const globalService = new GlobalService();

export default globalService;
