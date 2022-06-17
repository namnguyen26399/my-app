<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-row>
			<h3 class="mt-4 ml-4">Tạo mới phiếu yêu cầu</h3>
		</v-row>
		<v-row class="mt-4">
			<v-col>
				<v-combobox
					v-model="requestGroup"
					:items="requestGroups"
					item-text="requestGroupName"
					label="Chọn nhóm yêu cầu"
					outlined
					dense
				></v-combobox>
			</v-col>
		</v-row>
		<v-row class="mt-4">
			<v-col cols="12" md="12">
				<v-combobox
					v-model="requestType"
					:items="requestTypes"
					item-text="requestTypeName"
					:item-value="(itemrequestType) => itemrequestType"
					label="Chọn loại yêu cầu"
					outlined
					dense
				></v-combobox>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				><v-btn
					color="blue darken-1"
					dark
					v-text="$t('button.save')"
					@click="save()"
				></v-btn
			></v-col>
		</v-row>
	</v-card>
</template>

<script>
import RequestDataDto from "@/models/request-data.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import ProcessDataDTO from "@/models/process-data.dto";
import RequestFormDataDto from "@/models/form-data.dto";
import StepDataDto from "@/models/step-data.dto";
import FieldData from "@/models/field-data.dto";
import AttachmentFileDto from "@/models/attachment-file.dto";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
BreadcrumbsVue;
export default {
	name: "VsmFeCreaterequestform",
	// props: ["requestDataDto"],
	components: { BreadcrumbsVue },
	data() {
		return {
			user_info: this.getUserInfo(),
			attachmentFileDto: AttachmentFileDto,
			m_requestDto: RequestDataDto,
			processDataDTO: ProcessDataDTO,
			requestFormDataDto: RequestFormDataDto,
			requestStepData: StepDataDto,
			requestGroup: null,
			requestGroups: [],
			requestTypes: [],
			requestType: null,
			templateForms: [],
			isSaving: false,
			editRequestGroupDialog: false,
			editRequestTypeDialog: false,
			editTemplateFormDialog: false,
			request: null,
			stepInProcess: null,
			processData: null,
			stepData: null,
			requestData: null,
			fromData: null,
			fieldInForm: null,
			fieldData: FieldData,
			fieldDataDto: null,
			attachmentFile: [],
			folders: null,
			file: null,
			attachmentFileNew: null,
			userInStep: {},
			selected: [],
		};
	},
	created() {
		this.$Progress.start();
	},

	mounted() {
		this.$Progress.finish();
		this.initialize();
	},

	methods: {
		async initialize() {
			// this.m_requestDto = this.requestDataDto;
			await this._requestGroups();
			await this._requestTypes();
		},
		async _request() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_FindOneRequesrtByID(
						this.requestType.id,
					),
				);
				if (!response || !response.state) {
					return this.toastError(this.$t("error.load"));
				}
				let requests;
				requests = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				if (requests.length > 0) {
					this.request = requests[0];
				}
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async _requestGroups() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestGroup(),
				);
				if (!response || !response.state) {
					return [];
				}

				this.requestGroups = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async _requestTypes() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestType(),
				);
				if (!response || !response.state) {
					return [];
				}

				this.requestTypes = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				this.toastError(error);
				return [];
			}
		},
		async save() {
			await this._request();

			if (!this.request) return;

			let response;
			// let editing = !!this.m_requestDto.id;
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			this.m_requestDto.modified = { id: this.user_info.id };
			this.m_requestDto.modifiedName = new Date();
			this.m_requestDto.requestDataName = this.request.requestName;
			this.m_requestDto.requestDataCode = this.request.requestCode;
			this.m_requestDto.request = { id: this.request.id };

			try {
				// if (editing) {
				// 	response = await globalService.patchData_Async(
				// 		administratorAPI.API_SaveRequestData(
				// 			this.m_requestDto.id,
				// 		),
				// 		this.m_requestDto,
				// 	);
				// } else {
				this.m_requestDto.created = this.user_info;
				this.m_requestDto.createdName = this.user_info.fullName;
				this.m_requestDto.createdDate = new Date();
				this.m_requestDto.statusName = "Khởi tạo";
				this.m_requestDto.status = { id: 1 };
				response = await globalService.postData_Async(
					administratorAPI.API_CreateRequestData(),
					this.m_requestDto,
				);
				if (!response || !response.state)
					return (this.isSaving = false);

				this.requestData = response;

				await this.saveProcessData();
				if (!this.processData) return (this.isSaving = false);

				await this.saveFormData();
				if (!this.fromData) return (this.isSaving = false);
				await this.getStepInProcesses();

				await this.saveStepData();
				await this.getFieldInForm();
				await this.saveFieldData();

				const id = this.requestData.data.id;
				this.toastSuccess(this.$t("message.add_success"));
				this.$router.push({
					path: `/phieu-yeu-cau/${id}/chi-tiet`,
				});
			} catch (error) {
				this.toastError(error);
			} finally {
				this.isSaving = false;
			}
		},
		async saveProcessData() {
			let response;
			this.processDataDTO.created = {
				id: this.request.processInfo.created.id,
			};
			this.processDataDTO.createdDate =
				this.request.processInfo.createdDate;
			this.processDataDTO.isActive = this.request.processInfo.isActive;
			this.processDataDTO.isDelete = this.request.processInfo.isDelete;
			this.processDataDTO.modified = {
				id: this.request.processInfo.modified.id,
			};
			this.processDataDTO.modifiedDate =
				this.request.processInfo.modifiedDate;
			this.processDataDTO.modifiedName =
				this.request.processInfo.modifiedName;
			this.processDataDTO.processCode =
				this.request.processInfo.processCode;
			this.processDataDTO.processName =
				this.request.processInfo.processName;

			this.processDataDTO.requestData = { id: this.requestData.data.id };

			response = await globalService.postData_Async(
				administratorAPI.API_CreateProcessData(),
				this.processDataDTO,
			);
			if (!response || !response.state) {
				{
					return;
				}
			}
			this.processData = response.data;
		},
		async saveFormData() {
			this.requestFormDataDto.option = this.request.form.option;
			this.requestFormDataDto.formDataCode =
				this.request.form.formDataCode;
			this.requestFormDataDto.formDateName =
				this.request.form.formDateName;
			this.requestFormDataDto.objectSchema =
				this.request.form.objectSchema;
			this.requestFormDataDto.objectModel = this.request.form.objectModel;
			this.requestFormDataDto.createdName = this.request.form.createdName;
			this.requestFormDataDto.createdDate = this.request.form.createdDate;
			this.requestFormDataDto.modifiedName =
				this.request.form.modifiedName;
			this.requestFormDataDto.modifiedDate =
				this.request.form.modifiedDate;
			this.requestFormDataDto.isActive = this.request.form.isActive;
			this.requestFormDataDto.isDelete = this.request.form.isDelete;
			this.requestFormDataDto.tennantCode = this.request.form.tennantCode;
			this.requestFormDataDto.tennantName = this.request.form.tennantName;
			this.requestFormDataDto.created = {
				id: this.request.form.created.id,
			};
			this.requestFormDataDto.modified = {
				id: this.request.form.modified.id,
			};

			this.requestFormDataDto.requestData = {
				id: this.requestData.data.id,
			};
			this.requestFormDataDto.form = this.request.form;

			let response = await globalService.postData_Async(
				administratorAPI.API_CreateFormData(),
				this.requestFormDataDto,
			);
			if (!response || !response.state) {
				{
					return;
				}
			}
			this.fromData = response;
		},

		async saveStepData() {
			for (let stepInProces of this.stepInProcess) {
				this.requestStepData.isActive = false;
				this.requestStepData.created = { id: this.user_info.id };
				this.requestStepData.step = { id: stepInProces.step.id };
				this.requestStepData.processData = {
					id: this.processData.id,
				};
				this.requestStepData.requestData = {
					id: this.requestData.data.id,
				};
				this.requestStepData.stepInProcess = { id: stepInProces.id };
				// this.requestStepData = [...stepInProces];
				this.requestStepData.stepOrder = stepInProces.stepOrder;
				this.requestStepData.stepDataCode =
					stepInProces.stepInProcessCode;
				this.requestStepData.stepDataName =
					stepInProces.stepInProcessName;
				this.requestStepData.processingTerm =
					stepInProces.processingTerm;
				this.requestStepData.precessingTermTime =
					stepInProces.precessingTermTime;
				this.requestStepData.isRequiredSignature =
					stepInProces.isRequiredSignature;
				this.requestStepData.isBack = stepInProces.isBack;
				this.requestStepData.isAuthorizedApproval =
					stepInProces.isAuthorizedApproval;
				this.requestStepData.isExamine = stepInProces.isExamine;
				this.requestStepData.isEdit = stepInProces.isEdit;
				this.requestStepData.isRequestModify =
					stepInProces.isRequestModify;
				this.requestStepData.isSendMail = stepInProces.isSendMail;
				this.requestStepData.isProcessRecover =
					stepInProces.isProcessRecover;
				this.requestStepData.isCreateTfsTask =
					stepInProces.isCreateTfsTask;
				this.requestStepData.organizationCode =
					stepInProces.organization.organizationCode;
				this.requestStepData.organizationName =
					stepInProces.organization.organizationName;
				this.requestStepData.rankCode = stepInProces.rankCode;
				this.requestStepData.rankName = stepInProces.rankName;
				this.requestStepData.description = stepInProces.description;
				this.requestStepData.createdName = stepInProces.createdName;
				this.requestStepData.createdDate = stepInProces.createdDate;
				this.requestStepData.modifiedName = stepInProces.modifiedName;

				this.requestStepData.isDelete = stepInProces.isDelete;
				this.requestStepData.tennantCode = stepInProces.tennantCode;
				this.requestStepData.tennantName = stepInProces.tennantName;

				this.requestStepData.modifiedDate = stepInProces.modifiedDate;

				this.requestStepData.modified = {
					id: stepInProces.modified.id,
				};
				this.requestStepData.userInfos = [];
				// let user = await this.getUserInStep(stepInProces.id);
				let responseUser = await globalService.getData_Async(
					administratorAPI.API_GetAllByStepInProcessId(
						stepInProces.id,
					),
				);
				if (!responseUser || !responseUser.state) {
					this.toastError(responseUser.messgage);
					return (this.requestStepData.userInfos = []);
				}
				responseUser.data.filter((entry) => {
					this.requestStepData.userInfos.push({
						id: entry.userInfo.id,
					});
				});
				let response = await globalService.postData_Async(
					administratorAPI.API_CreateStepData(),
					this.requestStepData,
				);

				if (!response || !response.state) {
					return;
				}
				this.toastSuccess(this.$t("message.add_success"));
				// console.log("respon create", response);
			}
		},
		async getStepInProcesses() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_FindStepInProcessesByID(
						this.request.processInfo.id,
					),
				);
				if (!response || !response.state) {
					return;
				}
				this.stepInProcess = response.data;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getUserInStep(stepInProcesId) {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetSteepDataByIdStepInProcessId(
						stepInProcesId,
					),
				);

				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}
				return (
					response.data, console.log("response.data", response.data)
				);

				// this.userInStep = requests;
				//  (
				// 	this.userInStep,
				// 	console.log("this.userInStep", this.userInStep)
				// );

				// return requests.map((entry) => entry.userInfo), console.log("this.requests 12123", requests);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getFieldInForm() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_FindFieldInForm(this.request.form.id),
				);
				if (!response || !response.state) {
					return [];
				}

				let requests = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				if (requests.length > 0) {
					this.fieldInForm = requests[0];
				}
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async saveFieldData() {
			this.fieldData.created = this.fieldInForm.created;
			this.fieldData.createdDate = this.fieldInForm.createdDate;
			this.fieldData.createdName = this.fieldInForm.createdName;
			this.fieldData.fieldDataCode = this.fieldInForm.fieldInFormCode;
			this.fieldData.fieldDataName = this.fieldInForm.fieldInFormName;
			this.fieldData.objectSchema = this.fieldInForm.objectSchema;
			this.fieldData.objectModel = this.fieldInForm.objectModel;
			this.fieldData.option = this.fieldInForm.option;
			this.fieldData.description = this.fieldInForm.description;
			this.fieldData.nameOfField = this.fieldInForm.nameOfField;
			this.fieldData.fieldPattern = this.fieldInForm.fieldPattern;
			this.fieldData.required = this.fieldInForm.required;
			this.fieldData.modifiedDate = this.fieldInForm.modifiedDate;
			this.fieldData.tennantCode = this.fieldInForm.tennantCode;
			this.fieldData.fieldInForm = { id: this.fieldInForm.id };
			this.fieldData.tennantName = this.fieldInForm.tennantName;
			this.fieldData.formData = { id: this.fromData.data.id };
			this.fieldData.requestData = { id: this.requestData.data.id };
			// this.fieldData.fieldInForm = this.fieldInForm.modifiedName;
			this.fieldData.field = this.fieldInForm.field;
			let response = await globalService.postData_Async(
				administratorAPI.API_CreateFieldData(),
				this.fieldData,
			);

			if (!response || !response.state) {
				{
					return;
				}
			}
			this.fieldDataDto = response;
		},

		// async getAttachmentFile() {
		// 	for (let itemTemplateForms of this.request.templateForms) {
		// 		let response = await globalService.getData_Async(
		// 			administratorAPI.API_GetAttachmentFile(
		// 				itemTemplateForms.id,
		// 			),
		// 		);
		// 		if (!response || !response.state) {
		// 			{
		// 				return;
		// 			}
		// 		}
		// 		let request = response.data;

		// 		this.attachmentFile = request[0];
		// 	}
		// 	console.log("this.attachmentFile", this.attachmentFile);
		// },
		// async createFolder() {
		// 	let response = await globalService.postData_Async(
		// 		administratorAPI.API_CreateFolder(),
		// 		{
		// 			contentType: "",
		// 			fileBase64: "",
		// 			fileName: Math.random() + "Test 1tr nam sau 1000",
		// 			isFolder: "1",
		// 			needEncrypt: true,
		// 			parentId: null,
		// 		},
		// 	);
		// 	if (!response || !response.state) {
		// 		{
		// 			return;
		// 		}
		// 	}
		// 	this.folders = response.data;
		// 	console.log("this.createFolder", response);
		// },
		// async copyFiles() {
		// 	let response = await globalService.postData_Async(
		// 		administratorAPI.API_CopyFile(),
		// 		{
		// 			fileId: this.attachmentFile.idInFileService,
		// 			fileName: this.attachmentFile.fileName,
		// 			folderId: this.folders.id,
		// 		},
		// 	);
		// 	if (!response || !response.state) {
		// 		{
		// 			return;
		// 		}
		// 	}
		// 	this.file = response.data;
		// 	console.log("this.file", this.file);
		// },
		// async createAttachmentFile() {
		// 	this.attachmentFileDto.created = this.getUserInfo();
		// 	this.attachmentFileDto.createdDate = this.file.createdDate;
		// 	this.attachmentFileDto.description = this.file.description;
		// 	this.attachmentFileDto.fileExtension = this.file.fileExtension;
		// 	this.attachmentFileDto.fileName = this.file.fileName;
		// 	this.attachmentFileDto.fileType = this.file.fileType;
		// 	this.attachmentFileDto.fullPath = this.file.fullPath;
		// 	this.attachmentFileDto.idInFileService = this.file.idInFileService;
		// 	this.attachmentFileDto.incomingDoc = this.file.incomingDoc;
		// 	this.attachmentFileDto.isActive = this.file.isActive;
		// 	this.attachmentFileDto.modified = this.getUserInfo();
		// 	this.attachmentFileDto.modifiedDate = this.file.modifiedDate;
		// 	this.attachmentFileDto.ofice365Path = this.file.ofice365Path;
		// 	this.attachmentFileDto.outgoingDoc = this.file.outgoingDoc;
		// 	this.attachmentFileDto.path = this.file.path;
		// 	this.attachmentFileDto.reqdataProcessHis =
		// 		this.file.reqdataProcessHis;
		// 	this.attachmentFileDto.requestData = {
		// 		id: this.requestData.data.id,
		// 	};
		// 	this.attachmentFileDto.stepProcessDoc = this.file.stepProcessDoc;
		// 	this.attachmentFileDto.templateForm = this.file.templateForm;
		// 	this.attachmentFileDto.tennant = this.file.tennant;
		// 	this.attachmentFileDto.tennantCode = this.file.tennantCode;
		// 	this.attachmentFileDto.tennantName = this.file.tennantName;

		// 	let response = await globalService.postData_Async(
		// 		administratorAPI.API_CreateAttachmentFile(),
		// 		this.attachmentFileDto,
		// 	);
		// 	if (!response || !response.state) {
		// 		{
		// 			return;
		// 		}
		// 	}
		// 	this.attachmentFileNew = response.data;
		// },
		getUserInfoCustom() {
			return {
				id: this.getUserInfo().id,
			};
		},
	},
};
</script>

<style scoped></style>
