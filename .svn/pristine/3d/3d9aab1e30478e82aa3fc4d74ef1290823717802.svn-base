import authService from "./auth.service";
import store from "@/store";
import AxiosStatic from "axios";
// import constant from "@/common/constant";
const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const GRAPH_SCOPES = [
	"user.read",
	"openid",
	"profile",
	"email",
	"files.read.all",
	"files.readwrite.all",
	"sites.read.all",
	"sites.readwrite.all",
];

class GraphService {
	async headers(raw = { "Content-Type": "application/json" }) {
		let headers = Object.assign({}, raw);
		this.accessToken = await authService.acquireToken(GRAPH_SCOPES);
		headers.authorization = `bearer ${this.accessToken}`;
		return headers;
	}
	constructor() {
		this.axios = AxiosStatic;
		this.accessToken = "";
	}
	async getUser() {
		let response = await this._callGraphApi_Async(`/me`);
		return response;
	}
	async getDrive() {
		let response = await this._callGraphApi_Async(`/me/drive`);
		return response;
	}
	async uploadFile(filename, file, parentId = "root") {
		let headers = await this.headers();
		let response = await this._callGraphApi_Async(
			`/me/drive/${parentId}:/${filename}:/content`,
			"PUT",
			headers,
			file,
		);
		return response;
	}

	/**
	 *
	 * @param {string} itemId
	 * @param {File} file
	 * @param {string} description
	 * @param {string} conflictBehavior
	 * @returns {object}
	 */
	async createUploadSession(
		itemId,
		fileName,
		fileSize,
		parentId = "root",
		deferCommit = false,
		description = "",
		conflictBehavior = "replace",
	) {
		let headers = await this.headers();
		let response = await this._callGraphApi_Async(
			`/me/drive/${parentId}:/${itemId}:/createUploadSession`,
			"POST",
			headers,
			{
				name: fileName,
				fileSize: fileSize,
				description: description,
				"@microsoft.graph.conflictBehavior": conflictBehavior,
				deferCommit: deferCommit,
			},
		);
		return response;
	}

	async putFile(uploadUrl, blob, start) {
		let headers = await this.headers({
			"Content-Range":
				`bytes ${start}-` + (blob.size - 1) + `/${blob.size}`,
		});
		// let data = new FormData();
		// data.append(constant.keys.bytes, blob);
		let response = await this._callGraphApi_Async(
			uploadUrl,
			"PUT",
			headers,
			blob,
		);
		return response;
	}
	async downloadFile(fileName, parentId = "root") {
		let headers = await this.headers();
		let response = await this._downloadGraphApi_Async(
			`/me/drive/${parentId}:/${fileName}:/content?select=@microsoft.graph.downloadUrl`,
			"GET",
			headers,
			{},
			"blob",
		);
		return response;
	}
	async getDownloadUrlByFileId(fileId) {
		let headers = await this.headers();
		let response = await this._downloadGraphApi_Async(
			`/me/drive/items/${fileId}?select=@microsoft.graph.downloadUrl`,
			"GET",
			headers,
			{},
			"blob",
		);
		return response;
	}
	async _callGraphApi_Async(
		url,
		method = "GET",
		headers = false,
		data = {},
		contentType = "application/json",
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(`${GRAPH_BASE}${url}`);
		let _headers = headers;
		if (!headers) {
			_headers = await this.headers();
		}
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: method,
					headers: _headers,
					data: data,
					contentType: contentType,
				},
				config,
			);
			if (!response.status) {
				return {};
			}
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

	async _downloadGraphApi_Async(
		url,
		method = "GET",
		headers = false,
		data = {},
		contentType = "application/json",
		config = {},
		reject = (error) => {
			console.log(error);
		},
	) {
		store.state.loading = true;
		let _url = await Promise.resolve(`${GRAPH_BASE}${url}`);
		let _headers = headers;
		if (!headers) {
			_headers = await this.headers();
		}
		let response;
		try {
			response = await this.axios(
				{
					url: _url,
					method: method,
					headers: _headers,
					data: data,
					contentType: contentType,
				},
				config,
			);
			if (!response.status) {
				return {};
			}
			return response;
		} catch (rs) {
			if (reject instanceof Function) {
				return reject(rs);
			}
			return null;
		} finally {
			store.state.loading = false;
		}
	}
}
const graphService = new GraphService();
export default graphService;
