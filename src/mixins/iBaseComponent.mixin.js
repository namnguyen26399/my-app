import userService from "@/services/user.service";
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import moment from "moment";
import constant from "@/common/constant";
import authService from "@/modules/graph/services/auth.service";
import VueExcelXlsx from "vue-excel-xlsx";
import Vue from "vue";

Vue.use(VueExcelXlsx);
const iBaseComponent = {
	props: { required: {} },
	components: { VJsf },
	data() {
		return {
			valid: false,
			dateTimeFormat: `DD/MM/yyyy HH:mm`,
			dialog: {},
			requiredRules: [(v) => !!v || this.$t("error.please_fill_form")],
			validatorRules: {
				required: (value) => !!value || this.$t("validator.required"),
				maxLength255: (value) => {
					if (`${value}`.length > 255) {
						return this.$t("validator.max_length_255");
					}
					return true;
				},
				maxLength500: (value) => {
					if (`${value}`.length > 500) {
						return this.$t("validator.max_length_500");
					}
					return true;
				},

				notTrim: (value) => {
					if (value || !value)
						// let regex = /^[ ]+|[ ]+$/g;
						// if (regex.test(`${value}`)) {
						// 	return this.$t("validator.not_trim");
						// }
						return true;
				},
			},
			formError: false,
			microsoftUser: {},
			// m_files_icon: {
			// 	"": "mdi-folder",
			// 	"text/html": "mdi-language-html5",
			// 	"text/javascript": "mdi-nodejs",
			// 	"application/json": "mdi-code-json",
			// 	"application/pdf": "mdi-file-pdf-box",
			// 	"image/png": "mdi-file-image",
			// 	"text/plain": "mdi-file-document-outline",
			// 	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
			// 		"mdi-file-excel",
			// 	"application/vnd.ms-excel": "mdi-file-excel",
			// 	"application/vnd.openxmlformats-officedocument.presentationml.presentation":
			// 		"mdi-file-powerpoint",
			// 	"application/vnd.ms-powerpoint": "mdi-file-powerpoint",
			// 	"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			// 		"mdi-file-word",
			// 	"application/msword": "mdi-file-word",
			// 	"application/x-bzip": "mdi-folder-zip",
			// 	"application/vnd.rar": "mdi-folder-zip",
			// 	"application/zip": "mdi-folder-zip",
			// },
			m_files_icon: {
				"": "mdi-folder",
				html: "mdi-language-html5",
				js: "mdi-nodejs",
				json: "mdi-code-json",
				pdf: "mdi-file-pdf-box",
				png: "mdi-file-image",
				txt: "mdi-file-document-outline",
				xlsx: "mdi-file-excel",
				xls: "mdi-file-excel",
				ppt: "mdi-file-powerpoint",
				pptx: "mdi-file-powerpoint",
				docx: "mdi-file-word",
				doc: "mdi-file-word",
				zip: "mdi-folder-zip",
				rar: "mdi-folder-zip",
				tar: "mdi-folder-zip",
				gz: "mdi-folder-zip",
			},
			filterExist: false,
			userInfo: this.getUserInfo(),
		};
	},
	computed: {
		m_rules() {
			let _rules = [];
			if (this.required) {
				_rules.push(this.validatorRules.required);
			}
			_rules.push(this.validatorRules.maxLength255);
			_rules.push(this.validatorRules.notTrim);
			return _rules;
		},
		formatValue() {
			return moment(this.tempValue).format(this.m_format);
		},
	},
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
	},
	filters: {
		dateToString(date) {
			return date ? moment(date).format("DD/MM/yyyy HH:mm") : "";
		},
	},
	methods: {
		initialize() {
			if (process.env.VUE_APP_AZURE_APP_ID) {
				authService.configure(
					process.env.VUE_APP_AZURE_APP_ID,
					process.env.VUE_APP_AZURE_DUMMY,
				);
				this.microsoftUser = authService.user();
			}
		},
		getUserInfo() {
			return userService.getUserInfo();
		},
		getBreadscrumb() {
			let result = [];
			let currentPath = this.$router.currentRoute.path;
			for (const match of this.$router.currentRoute.matched) {
				if (!match.name) {
					continue;
				}
				if (
					result.filter((e) => {
						return e.text == match.name;
					}).length
				) {
					continue;
				}
				result.push({
					text: match.name,
					disabled: currentPath == match.path,
					to: match.path,
				});
			}
			return result;
		},
		errorLoad(message = this.$t("error.load")) {
			this.toastError(message);
			this.finishLoad();
		},
		errorUpdate(message = this.$t("error.update")) {
			this.toastError(message);
			this.finishLoad();
		},
		finishLoad() {
			this.loading = false;
		},
		getDateTimeFormat() {
			return this.dateTimeFormat;
		},
		toast(
			message = "",
			options = {
				message: message,
				type: "info",
				position: "top-right",
				duration: 3000,
				dismissible: "",
				queue: "",
				pauseOnHover: false,
				onClick: () => {},
				onDismiss: () => {},
			},
		) {
			this.$toast.default(message, options);
		},
		toastError(
			message = "",
			options = {
				message: message,
				type: "error",
				position: "top-right",
				duration: 3000,
				dismissible: "",
				queue: "",
				pauseOnHover: false,
				onClick: () => {},
				onDismiss: () => {},
			},
		) {
			this.toast(message, options);
		},
		toastSuccess(
			message = "",
			options = {
				message: message,
				type: "success",
				position: "top-right",
				duration: 3000,
				dismissible: "",
				queue: "",
				pauseOnHover: false,
				onClick: () => {},
				onDismiss: () => {},
			},
		) {
			this.toast(message, options);
		},
		getKeyFromValue(value = "") {
			return this.nonAccentVietnamese(value)
				.toLocaleLowerCase()
				.split(/[^a-zA-Z0-9]+/)
				.join("-");
		},
		getIdFromValue(value = "") {
			return this.nonAccentVietnamese(value)
				.toLocaleLowerCase()
				.split(/[^a-zA-Z0-9]+/)
				.join("_");
		},
		nonAccentVietnamese(value) {
			let str = value;
			str = str.toLowerCase();
			str = str.replace(
				/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g,
				"a",
			);
			str = str.replace(
				/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g,
				"e",
			);
			str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
			str = str.replace(
				/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g,
				"o",
			);
			str = str.replace(
				/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g,
				"u",
			);
			str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
			str = str.replace(/\u0111/g, "d");
			str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
			str = str.replace(/\u02C6|\u0306|\u031B/g, "");
			return `${str}`;
		},
		doNothing() {
			console.log("doNothing");
		},
		match(item, value) {
			let keys = Object.keys(item);
			for (let key of keys) {
				if (
					this.nonAccentVietnamese(`${item[key]}`).match(
						this.nonAccentVietnamese(`${value}`),
					)
				) {
					return true;
				}
			}
			return false;
		},

		/**
		 *
		 * @param {String} item
		 * @param {String} value
		 * @returns {Array|boolean}
		 */
		matchString(item, value) {
			return this.nonAccentVietnamese(`${item}`).match(
				this.nonAccentVietnamese(`${value}`),
			);
		},
		getAvatarText(value, number = 2) {
			if (!value) {
				return constant.default_organization;
			}
			let tmp = `${value}`;
			let values = tmp.split(constant.space);
			let index = 0;
			let result = "";
			while (index < values.length && index < number) {
				result = result.concat(values[index++].charAt(0).toUpperCase());
			}
			return result;
		},
		removeBlankId(value) {
			return value.filter((entry) => {
				if (!entry.id) {
					return null;
				}
				return entry;
			});
		},
		isObject(value) {
			if (typeof value == "object") return true;
			return false;
		},
		closeDialog() {
			this.$emit(constant.keys.close, true);
		},
		cancelDialog() {
			this.$emit(constant.keys.cancel, true);
		},
		saveDialog() {
			this.$emit(constant.keys.save, true);
		},
		onCloseDialog(value = true) {
			if (value) {
				for (let key in this.dialog) {
					this.dialog[key] = false;
				}
			}
		},
		onSaveDialog(value = true) {
			if (value) {
				this.onCloseDialog();
				this.initialize();
			}
		},
		validateRequiredForm() {
			this.formError = false;
			for (let key of Object.keys(this.form)) {
				if (!this.form[key]) {
					this.formError = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate(true);
			}
		},
		validateMaxLengthForm(maxLength = 255) {
			this.formError = false;
			for (let key of Object.keys(this.form)) {
				if (this.form[key] && `${this.form[key]}`.length > maxLength) {
					this.formError = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate(true);
			}
		},
		confirmDeleteDialog() {
			this.$emit(constant.keys.confirmDelete, true);
		},
		getPath(root, element) {
			if (!root || !root.length) {
				return false;
			}
			for (let item of root) {
				if (item.id == element.id) {
					return [item];
				}
				let result = this.getPath(item.children, element);
				if (!result) {
					continue;
				} else {
					return [item, ...result];
				}
			}
		},
		displayFileSize(size) {
			let value = size;
			let append = "bytes";
			if (size > 1024 * 1024 * 1024) {
				value = parseFloat(size / (1024 * 1024 * 1024)).toFixed(2);
				append = "GB";
			} else if (size > 1024 * 1024) {
				value = parseFloat(size / (1024 * 1024)).toFixed(2);
				append = "MB";
			} else if (size > 1024) {
				value = parseFloat(size / 1024).toFixed(2);
				append = "KB";
			}
			return `${value} ${append}`;
		},
		// "": "mdi-folder",
		// "text/html": "mdi-language-html5",
		// "text/javascript": "mdi-nodejs",
		// "application/json": "mdi-code-json",
		// "application/pdf": "mdi-file-pdf-box",
		// "image/png": "mdi-file-image",
		// "text/plain": "mdi-file-document-outline",
		// "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
		//     "mdi-file-excel",
		// "application/vnd.ms-excel": "mdi-file-excel",
		// "application/vnd.openxmlformats-officedocument.presentationml.presentation":
		//     "mdi-file-powerpoint",
		// "application/vnd.ms-powerpoint": "mdi-file-powerpoint",
		// "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		//     "mdi-file-word",
		// "application/msword": "mdi-file-word",
		// "application/x-bzip": "mdi-folder-zip",
		// "application/vnd.rar": "mdi-folder-zip",
		// "application/zip": "mdi-folder-zip",
		convertContentTypeToFileExtension(contentType) {
			switch (contentType) {
				case "application/pdf":
					return "pdf";
				case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
					return "xlsx";
				case "application/vnd.ms-excel":
					return "xls";
				case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
					return "pptx";
				case "application/vnd.ms-powerpoint":
					return "ppt";
				case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
					return "docx";
				case "application/msword":
					return "doc";
				default:
					return;
			}
		},
		// getJsonFields(headers) {           		//xuất file xls
		// 	let newObj = {};
		// 	let newHeaders = Object.assign([], headers);
		// 	newHeaders.pop();
		// 	for (const head of newHeaders) {
		// 		newObj[head.text] = {
		// 			callback: (val) => {
		// 				if (head.value.split(".").length > 1) {
		// 					let newVal = head.value.split(".");
		// 					for (let temp of newVal) {
		// 						val = val[temp];
		// 					}
		// 					return val;
		// 				} else if (head.value.includes("Date")) {
		// 					return `${moment(val[head.value]).format(
		// 						this.dateFormat,
		// 					)}`;
		// 				} else {
		// 					if (val[head.value] == true) {
		// 						return `Có`;
		// 					} else if (val[head.value] == false) {
		// 						return `Không`;
		// 					} else {
		// 						return `${val[head.value]}`;
		// 					}
		// 				}
		// 			},
		// 		};
		// 	}
		// 	return newObj;
		// },

		formatDate_V1(value) {
			return moment(value).format("DD/MM/yyyy");
		},
		checkTrueFalse(value) {
			if (value == true) return "Có";
			return "Không";
		},
		///// xuất file xlsx
		getJsonFields(headers) {
			let newObj = {};
			let newHeader = [];
			let newHeaders = Object.assign([], headers);
			newHeaders.pop();
			for (const head of newHeaders) {
				if (head.value.includes("Date")) {
					newObj = {
						label: head.text,
						field: head.value,
						dataFormat: this.formatDate_V1,
					};
				} else if (head.value.includes("Active")) {
					newObj = {
						label: head.text,
						field: head.value,
						dataFormat: this.checkTrueFalse,
					};
				} else {
					newObj = {
						label: head.text,
						field: head.value,
					};
				}
				newHeader.push(newObj);
			}

			return newHeader;
		},
		formatDate(value, dateFormat = "DD/MM/yyyy HH:mm") {
			if (!value) {
				return "";
			}
			return moment(value).format(dateFormat);
		},
		async handleButtonClick(event) {
			await event();
		},

		/**
		 *
		 * @param {Object} response
		 * @returns {boolean}
		 */
		preHandleResponse(response) {
			if (!response) {
				this.toastError(response);
				return false;
			}
			if (!response.state) {
				this.toastError(response.messgage);
				return false;
			}
			return true;
		},
		deleteItem() {
			this.dialog.delete = true;
		},
		onConfirmDelete() {
			this.dialog.delete = false;
		},
		cancel() {
			this.onCloseDialog();
		},
		createChild() {
			this.dialog.edit = true;
		},
		editItem() {
			this.dialog.edit = true;
		},
		validateUsername(value) {
			let regex = /^[a-zA-Z0-9@.-_]+$/;
			return regex.test(value);
		},
		validatePassword(value) {
			let regex = /^[^ ]+$/;
			return regex.test(value);
		},

		/**
		 *
		 * @param {string} value
		 * @returns {boolean}
		 */
		notTrim(value) {
			let regex = /^[ ]+|[ ]+$/g;
			return !regex.test(`${value}`);
		},

		/**
		 *
		 * @param {string} value
		 * @returns {boolean}
		 */
		validText(value) {
			if (`${value}`.length > constant.values.MAX_LENGTH) {
				return false;
			}
			return true;
		},

		validRequiredText(value) {
			if (!value || `${value}`.length > constant.values.MAX_LENGTH) {
				return false;
			}
			return true;
		},
		redirectBack(n = -1) {
			this.$router.go(n);
		},
	},
};
export default iBaseComponent;
