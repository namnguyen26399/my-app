<template>
	<v-card elevation="0" ref="form">
		<v-toolbar>
			<v-toolbar-title> {{ formTitle }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="mt-3">
			<v-container>
				<v-form v-model="valid">
					<v-row>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								ref="templateFormName"
								v-model="editedItem.templateFormName"
								dense
								outlined
								required
								:error-messages="errorMessage"
								@keyup="onKeyUp"
							>
								<template v-slot:label>
									{{ $t("label.name_form") }}
									<span class="text-red">
										{{ $t("label.star") }}
									</span>
								</template>
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-textarea
								ref="description"
								v-model="editedItem.description"
								:label="$t('label.description')"
								dense
								outlined
								:error-messages="errorMessageDes"
								@keyup="onKeyUpDes"
							>
							</v-textarea>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-file-input
								ref="file"
								outlined
								dense
								accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
								@change="handleFileUpload($event)"
								:error-messages="errorMessageFile"
							>
								<template v-slot:label>
									<p v-if="m_file && !file">
										{{ m_file.fileName }}
									</p>
									<p v-else>
										{{ $t("label.attachment_file") }}
										<span class="text-red">
											{{ $t("label.star") }}
										</span>
									</p>
								</template>
								<template v-if="m_file" v-slot:append>
									<v-btn
										v-if="!file && fileEditing"
										icon
										color="blue"
										dark
										@click="sync"
									>
										<v-icon> mdi-sync </v-icon>
									</v-btn>
									<v-btn
										v-if="!file && !fileEditing"
										icon
										color="blue"
										dark
										@click="openEditFile"
									>
										<v-icon> mdi-pencil </v-icon>
									</v-btn>
								</template>
							</v-file-input>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-checkbox
								v-model="editedItem.isActive"
								:label="$t('label.is_active')"
							></v-checkbox>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				elevation="0"
				color="red"
				dark
				class="rounded-pill"
				@click="close"
			>
				<v-icon>mdi-close</v-icon>
				{{ $t("button.cancel") }}
			</v-btn>
			<v-btn
				elevation="0"
				color="blue"
				dark
				class="rounded-pill"
				@click="save"
			>
				<v-icon>mdi-content-save</v-icon>
				{{ $t("button.save") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import store from "@/store";
import graphService from "@/modules/graph/services/graph.service";
import authService from "@/modules/graph/services/auth.service";
import attachmentFileService from "@/views/modules/administrator/AttachmentFile/attachment-file.service";
import constant from "@/common/constant";
export default {
	name: "EditTemplateFormVue",
	components: {},
	props: {
		templateFormDto: {},
		oldFile: {},
	},
	watch: {
		templateFormDto(value) {
			this.editedItem = value;
			this.fileEditing = false;
			this.$refs["file"].reset();
		},
		oldFile(value) {
			this.m_file = value;
			this.fileEditing = false;
			this.$refs["file"].reset();
			this.fileId = null;
		},
	},
	computed: {
		formTitle() {
			return !this.editedItem.id
				? this.$t("title.create_form")
				: this.$t("title.edit_form");
		},
		form() {
			return {
				templateFormName: this.editedItem.templateFormName,
			};
		},
	},
	data() {
		return {
			user_infor: this.getUserInfo(),
			valid: false,
			formError: false,
			isSaving: false,
			editedItem: {},
			attachmentFileDto: {},
			errorMessage: "",
			errorMessageDes: "",
			file: null,
			errorMessageFile: "",
			m_file: {},
			defaultItem: {
				created: null,
				createdDate: new Date(),
				createdName: "",
				description: "",
				fileExtension: "",
				fullPath: "",
				id: null,
				isActive: true,
				isDelete: false,
				modified: null,
				modifiedDate: new Date(),
				modifiedName: "",
				ofice365Path: "",
				path: "",
				templateFormCode: "",
				templateFormName: "",
				tennant: null,
				tennantCode: "",
				tennantName: "",
			},
			fileFormat: [
				"doc",
				"docm",
				"docx",
				"docb",
				"dot",
				"dotm",
				"dotx",
				"wbk",
				"csv",
				"odt",
				"pdf",
				"rtf",
				"txt",
				"wps",
				"xml",
				"xps",
				"xls",
				"xlsx",
				"pps",
				"ppsx",
				"ppt",
				"pptm",
				"pptx",
				"xls",
			],
			fileId: null,
			fileEditing: false,
			interval: null,
			regex: /[`!@#$%^&*()_+\-[\]{};':"\\|<>/?~]/,
		};
	},
	async created() {
		store.state.loading = true;
	},
	async mounted() {
		store.state.loading = false;
		this.editedItem = this.templateFormDto;
		this.m_file = this.oldFile;
	},
	methods: {
		close() {
			this.errorMessage = "";
			this.errorMessageDes = "";
			this.errorMessageFile = "";
			this.$refs["file"].reset();
			this.editedItem = Object.assign({}, this.defaultItem);
			this.$emit("close", true);
		},
		_save(value = this.editedItem) {
			this.$emit("save", value);
		},
		handleFileUpload(event) {
			this.file = event;
			if (this.file) {
				this.errorMessageFile = "";
			}
		},
		async save() {
			// if (
			// 	this.file &&
			// 	this.file.name &&
			// 	this.regex.test(this.file.name)
			// ) {
			// 	return (
			// 		this.toastError(this.$t("message.filename_err")),
			// 		console.log("name", this.file.name)
			// 	);
			// }
			this.formError = false;
			for (let key of Object.keys(this.form)) {
				if (!this.form[key] || this.form[key].trim().length == 0) {
					this.formError = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate(true);
			}
			if (this.formError) {
				return (this.errorMessage = this.$t("message.msg_1"));
			}
			if (!this.editedItem.id && !this.file) {
				return (this.errorMessageFile = this.$t("error.empty_file"));
			} else {
				this.errorMessageFile = "";
				if (
					this.file &&
					this.file.name &&
					this.fileFormat.indexOf(this.file.name.split(".").pop()) ==
						-1
				) {
					this.toastError(this.$t("message.err_format_file"));
					return;
				}
			}
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			this.editedItem.templateFormName =
				this.editedItem.templateFormName.trim();
			this.editedItem.description = this.editedItem.description.trim();
			if (!this.editedItem.id) {
				this.editedItem.created = this.getUserInfo();
				this.editedItem.createdName = this.getUserInfo().fullName;
				this.editedItem.createdDate = new Date();
			}
			this.editedItem.modified = this.getUserInfo();
			this.editedItem.modifiedName = this.getUserInfo().fullName;
			this.editedItem.modifiedDate = new Date();
			let response;
			try {
				if (!this.editedItem.id) {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateTemplateForm(),
						this.editedItem,
					);
					if (!response || !response.state) {
						return this.toastError(this.$t("message.add_error"));
					}
				} else {
					response = await globalService.putData_Async(
						administratorAPI.API_SaveTemplateForm(
							this.editedItem.id,
						),
						this.editedItem,
					);
					if (!response || !response.state) {
						return this.toastError(this.$t("message.update_error"));
					}
				}
				this.editedItem = response.data;
				if (this.file) {
					response = await globalService.uploadData_Async(
						administratorAPI.API_UploadFile365(),
						this.file,
						{
							templateFormId: this.editedItem.id,
							userId: this.getUserInfo().id,
						},
					);
					if (!response) {
						return this.toastError(this.$t("error.upload_file"));
					}
					if (!response.state) {
						return this.toastError(response.message);
					}
					this.attachmentFileDto = response.data;
					await this.createAttachmentFile();
				}

				this._save(this.editedItem);
				this.isSaving = false;
				this.close();
				this.toastSuccess(this.$t("message.update_success"));
			} catch (error) {
				this.toastError(error);
			} finally {
				this.isSaving = false;
			}
		},
		onKeyUp() {
			if (
				this.editedItem.templateFormName != "" ||
				this.editedItem.templateFormName.length < 255
			) {
				this.errorMessage = "";
			}
			if (this.editedItem.templateFormName.length > 255) {
				this.errorMessage = this.$t("message.maxlength_required_255");
			}
		},
		onKeyUpDes() {
			if (
				this.editedItem.description != "" ||
				this.editedItem.description.length < 255
			) {
				this.errorMessageDes = "";
			}
			if (this.editedItem.description.length > 255) {
				this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		async createAttachmentFile() {
			this.attachmentFileDto.created = this.getUserInfo();
			this.attachmentFileDto.createdDate = new Date();
			this.attachmentFileDto.modified = this.getUserInfo();
			this.attachmentFileDto.modifiedDate = new Date();
			try {
				let isDeleted =
					await attachmentFileService.deleteAllByTemplateFormId(
						this.editedItem.id,
					);
				if (!isDeleted) {
					return this.toastError(
						this.$t("error.delete_old_attachment_file"),
					);
				}
				let response = await globalService.postData_Async(
					administratorAPI.API_CreateAttachmentFile(),
					this.attachmentFileDto,
				);
				if (!response || !response.state) {
					return;
				}
				this.attachmentFileNew = response.data;
			} catch (error) {
				this.toastError(error);
			}
		},
		_downloadFileUrl(item) {
			if (!item || !item.id) {
				return;
			}
			if (!this.m_file) {
				return;
			}
			let description = JSON.parse(this.m_file.description);
			return administratorAPI.FullAPI_DownloadFile(
				this.m_file.idInFileService,
				this.m_file.fileName,
				this.m_file.fileExtension,
				description.contentType,
			);
		},
		async openEditFile() {
			try {
				if (!authService.user()) {
					await authService.login();
				}
				let fileResponse = await globalService.downloadBlob_Async(
					this._downloadFileUrl(this.editedItem),
				);
				if (!fileResponse) {
					return this.toastError(this.$t("error.load_file"));
				}

				let uploadResponse = await graphService.uploadFile(
					this.m_file.fileName,
					fileResponse,
				);

				if (!uploadResponse) {
					return this.toastError("error.upload_to_office_365");
				}
				this.m_file.ofice365Path = uploadResponse.webUrl;
				this.fileId = uploadResponse.id;
				let updateAttachmentFileResponse =
					await globalService.putData_Async(
						administratorAPI.API_SaveAttachmentFile(this.m_file.id),
						this.m_file,
					);
				if (!updateAttachmentFileResponse) {
					return this.toastError("error.save");
				}
				this.editWindow = window.open(
					uploadResponse.webUrl,
					"targetWindow",
					`toolbar=no,
					location=no,
					status=no,
					menubar=no,
					scrollbars=yes,
					resizable=yes,
					width=1600,
					height=800`,
				);
				let handler = this._handle;
				this.interval = setInterval(handler, constant.values.interval);
				this.fileEditing = true;
			} catch (error) {
				this.toastError(error);
			}
		},
		async _handle() {
			if (!this.editWindow) {
				return;
			}
			if (!this.editWindow.closed) {
				return;
			}
			if (!this.fileId) {
				return;
			}
			clearInterval(this.interval);
			await this.sync();
		},
		async sync() {
			try {
				let getUrlResponse = await graphService.getDownloadUrlByFileId(
					this.fileId,
				);
				if (!getUrlResponse) {
					return this.toastError(
						this.$t("error.download_from_office_365"),
					);
				}
				let response = await globalService.downloadBlob_Async(
					getUrlResponse.data["@microsoft.graph.downloadUrl"],
				);
				if (!response) {
					return this.toastError(
						this.$t("error.download_from_office_365"),
					);
				}
				let updateResponse = await globalService.updateFile_Async(
					administratorAPI.API_UpdateFile(
						this.m_file.idInFileService,
						this.m_file.fileName,
					),
					response,
				);

				if (!updateResponse) {
					return this.toastError(this.$t("error.save"));
				}
				if (!updateResponse.state) {
					return this.toastError(updateResponse.message);
				}
				this.editWindow.close();
				this.fileEditing = false;
				this._save(this.editedItem);
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style></style>
