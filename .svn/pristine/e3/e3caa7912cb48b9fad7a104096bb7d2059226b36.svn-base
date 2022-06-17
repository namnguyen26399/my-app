<template>
	<v-card elevation="0">
		<v-dialog max-width="60vw" persistent v-model="editRequestGroupDialog">
			<EditRequestGroupVue @close="onClose" @save="onSaveRequestGroup" />
		</v-dialog>
		<v-dialog max-width="60vw" persistent v-model="editRequestTypeDialog">
			<EditRequestTypeVue @close="onClose" @save="onSaveRequestType" />
		</v-dialog>
		<v-dialog max-width="60vw" persistent v-model="editTemplateFormDialog">
			<EditTemplateFormVue
				@close="onClose"
				@save="onSaveTemplateForm"
				:templateFormDto="defaultItemForm"
			/>
		</v-dialog>
		<v-dialog v-model="templateFormGridDialog" persistent max-width="60vw">
			<TemplateFormGridVue
				:items="templateForms"
				:selected="requestDto.templateForms"
				@close="onClose"
				@save="onSelectTemplateForm"
			/>
		</v-dialog>
		<v-row>
			<v-col cols="12" md="12">
				<v-row class="mt-4">
					<v-col cols="12" md="10">
						<v-combobox
							ref="requestGroup"
							v-model="m_requestDto.requestGroup"
							:items="requestGroups"
							item-text="requestGroupName"
							outlined
							prepend-inner-icon="mdi-magnify"
							dense
							@change="changeRG"
							required
							:error-messages="errorMessageRequestGroupName"
							maxLength="255"
						>
							<template v-slot:label>
								{{ $t("label.request_group") }}
								<span class="text-red">
									{{ $t("label.star") }}
								</span>
							</template>
						</v-combobox>
					</v-col>
					<v-col cols="12" md="2">
						<v-btn
							icon
							color="blue darken-1"
							@click="openEditRequestGroup()"
						>
							<v-icon>mdi-plus-circle</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="10">
						<v-combobox
							ref="requestType"
							v-model="m_requestDto.requestType"
							:items="requestTypes"
							item-text="requestTypeName"
							outlined
							dense
							@change="changeRT"
							required
							prepend-inner-icon="mdi-magnify"
							:error-messages="errorMessageRequestTypeName"
							maxLength="255"
						>
							<template v-slot:label>
								{{ $t("label.request_type") }}
								<span class="text-red">
									{{ $t("label.star") }}
								</span>
							</template>
						</v-combobox>
					</v-col>
					<v-col cols="12" md="2">
						<v-btn
							icon
							color="blue darken-1"
							@click="openEditRequestType()"
						>
							<v-icon>mdi-plus-circle</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="10">
						<v-combobox
							ref="processInfo"
							v-model="m_requestDto.processInfos"
							:items="processInfos"
							item-text="processName"
							outlined
							dense
							@click="loadProcessInfo()"
							@change="changePI"
							required
							prepend-inner-icon="mdi-magnify"
							:error-messages="errorMessageProcessInfo"
							maxLength="255"
							multiple
						>
							<template v-slot:label>
								{{ $t("label.application_process") }}
								<span class="text-red">
									{{ $t("label.star") }}
								</span>
							</template>
							<!-- <template v-slot:item="{ item }">
								<v-list-item
									class="rounded-lg bordered border-dashed m-2"
									@click.stop="selectProcessInfo(item)"
								>
									<v-list-item-content>
										<v-list-item-title>
											<span
												class="text-subtitle-2 text-primary"
											>
												{{ item.processName }}
											</span>
										</v-list-item-title>
										<v-list-item-subtitle>
											<v-btn
												v-for="stepInProcess in stepInProcesses[
													item.id
												]"
												color="blue darken-2"
												class="rounded-lg mr-2"
												dark
												x-small
												:key="stepInProcess.id"
											>
												{{
													stepInProcess.stepInProcessName
												}}
											</v-btn>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</template> -->
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									class="ma-2"
									close
									v-bind="attrs"
									@click:close="deselectProcessInfo(item)"
								>
									{{ item.processName }}
								</v-chip>
							</template>
						</v-combobox>
					</v-col>
					<v-col cols="12" md="2">
						<v-btn
							icon
							color="blue darken-1"
							to="/administrator/quy-trinh/tao-moi-v2"
						>
							<v-icon>mdi-plus-circle</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="10">
						<v-combobox
							v-model="m_templateForms"
							:items="templateForms"
							@click="loadTemplate()"
							item-text="templateFormName"
							:label="$t('label.template_form')"
							multiple
							outlined
							dense
							prepend-inner-icon="mdi-magnify"
							maxLength="255"
						>
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									class="ma-2"
									close
									v-bind="attrs"
									@click:close="deselectTemplateForm(item)"
								>
									{{ item.templateFormName }}
								</v-chip>
							</template>
						</v-combobox>
					</v-col>
					<v-col cols="12" md="2">
						<v-btn
							icon
							color="blue darken-1"
							@click="openEditTemplateForm()"
						>
							<v-icon>mdi-plus-circle</v-icon>
						</v-btn>
						<v-btn
							icon
							color="blue darken-1"
							@click="openRequestSelection()"
						>
							<v-icon>mdi-grid </v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="12" md="10">
						<v-combobox
							v-model="ruleGenerateCodes"
							:items="generateCodeOption"
							multiple
							chips
							outlined
							dense
							prepend-inner-icon="mdi-magnify"
						>
							<template v-slot:label>
								{{ $t("label.code_generation_rules") }}
								<span class="text-red">
									{{ $t("label.star") }}
								</span>
							</template>
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									class="ma-2"
									close
									v-bind="attrs"
									@click:close="deselectGenerateCode(item)"
								>
									{{ item }}
								</v-chip>
							</template>
						</v-combobox>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-spacer></v-spacer>
						<v-btn
							color="blue darken-1"
							dark
							class="rounded-0"
							@click="save()"
						>
							<v-icon> mdi-content-save</v-icon>
							{{ $t("button.save") }}
						</v-btn></v-col
					>
				</v-row></v-col
			>
		</v-row>
	</v-card>
</template>

<script>
import RequestDto from "@/models/request.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import EditRequestGroupVue from "../RequestGroup/EditRequestGroup.vue";
import EditRequestTypeVue from "../RequestType/EditRequestType.vue";
import EditTemplateFormVue from "../TemplateForm/EditTemplateForm.vue";
import TemplateFormGridVue from "./TemplateFormGrid.vue";
import moment from "moment";

export default {
	name: "EditRequestGeneralInformationVue",
	components: {
		EditRequestGroupVue,
		EditRequestTypeVue,
		EditTemplateFormVue,
		TemplateFormGridVue,
	},
	props: ["requestDto"],
	data() {
		return {
			errorMessageProcessInfo: "",
			errorMessageRequestGroupName: "",
			errorMessageRequestTypeName: "",
			requiredRules: [(v) => !!v || this.$t("message.msg_1")],
			m_requestDto: RequestDto,
			requestGroups: [],
			requestGroups_full: [],
			requestTypes: [],
			requestTypes_full: [],
			processInfos: [],
			processInfos_full: [],
			templateForms: [],
			templateForms_full: [],
			generateCodeOption: [],
			ruleGenerateCodes: [],
			isSaving: false,
			editRequestGroupDialog: false,
			editRequestTypeDialog: false,
			editTemplateFormDialog: false,
			templateFormGridDialog: false,
			stepInProcesses: [],
			defaultItemForm: {
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
		};
	},
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
		this.initialize();
	},
	watch: {
		requestDto(value) {
			this.m_requestDto = value;
			// console.log("this.m_requestDto ", this.m_requestDto);
		},
		m_requestDto(val) {
			val || this.resetRequestDto();
			if (val) {
				this.ruleGenerateCodes = [];
				if (
					this.m_requestDto.ruleGenerateCode &&
					this.m_requestDto.ruleGenerateCode.length > 0
				) {
					this.ruleGenerateCodes = this.m_requestDto.ruleGenerateCode
						.split("$")
						.map((ele) => ele.slice(1, ele.length - 1))
						.filter((ele) => ele.length > 0);
				}
			}
		},
	},
	computed: {
		form() {
			return {
				requestGroup: this.m_requestDto.requestGroup,
				requestType: this.m_requestDto.requestType,
				processInfo: this.m_requestDto.processInfos,
			};
		},
		m_templateForms: {
			get: function () {
				return this.m_requestDto.templateForms;
			},
			set: function (value) {
				this.m_requestDto.templateForms = this.removeBlankId(value);
			},
		},
		m_processInfo: {
			get: function () {
				return this.m_requestDto.processInfos;
			},
		},
	},
	watchs: {},
	methods: {
		async initialize() {
			this.m_requestDto = this.requestDto;
			await this._requestGroups();
			await this._requestTypes();
			await this.getAllgenerateCodeOption();
		},
		async _requestGroups() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestGroup(),
				);
				if (!response) {
					return [];
				}
				if (!response.state) {
					return [];
				}
				this.requestGroups = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.requestGroups_full = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.requestGroups = this.sortList(this.requestGroups);
			} catch (error) {
				this.toastError(error);
				return [];
			}
		},
		async getAllgenerateCodeOption() {
			let response;
			try {
				response = await globalService.getData_Async(
					"/api/_all/generate-code-option",
				);
				if (!response) {
					return this.toastError(this.$t("error.load"));
				}
				if (!response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.generateCodeOption = response.data;
			} catch (error) {
				this.toastError(error.message);
			}
		},
		async _requestTypes() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestType(),
				);
				if (!response) {
					return [];
				}
				if (!response.state) {
					return [];
				}
				this.requestTypes = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.requestTypes_full = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.requestTypes = this.sortList(this.requestTypes);
			} catch (error) {
				this.toastError(error);
				return [];
			}
		},
		async _processInfos() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllProcessInfo(),
				);
				if (!response) {
					return [];
				}
				if (!response.state) {
					return [];
				}
				this.processInfos = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.processInfos_full = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				for (let i = 0; i < this.processInfos.length; i++) {
					this.processInfos[i] = {
						id: this.processInfos[i].id,
						processName: this.processInfos[i].processName,
					};
				}
				this.processInfos = this.sortList(this.processInfos);
			} catch (error) {
				this.toastError(error);
				return [];
			}
		},
		async _templateForms() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllTemplateForm(),
				);
				if (!response) {
					return [];
				}
				if (!response.state) {
					return [];
				}
				this.templateForms = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.templateForms_full = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.templateForms = this.sortList(this.templateForms);
			} catch (error) {
				this.toastError(error);
				return [];
			}
		},
		async save() {
			this.formError = false;
			for (let key of Object.keys(this.form)) {
				if (
					!this.form[key] ||
					this.form[key] == null ||
					typeof this.form[key] !== "object"
				) {
					this.formError = true;
					this.$refs[key].focus();
				}

				this.$refs[key].validate(true);
				if (this.formError) {
					if (key == "requestGroup") {
						return (this.errorMessageRequestGroupName =
							this.$t("message.msg_1"));
					}
					if (key == "requestType") {
						return (this.errorMessageRequestTypeName =
							this.$t("message.msg_1"));
					}
					if (key == "processInfo") {
						return (this.errorMessageProcessInfo =
							this.$t("message.msg_1"));
					}
				}
			}

			let response;
			let editing = !!this.m_requestDto.id;
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			this.m_requestDto.modified = this.getUserInfo();
			this.m_requestDto.modifiedDate = new Date();
			this.m_requestDto.requestName =
				this.m_requestDto.requestType.requestTypeName;
			try {
				if (editing) {
					this.ruleGenerateCodes = this.ruleGenerateCodes.map(
						(ele) => (ele = "${" + ele + "}"),
					);
					this.m_requestDto.ruleGenerateCode =
						this.ruleGenerateCodes.join("");
					response = await globalService.putData_Async(
						administratorAPI.API_SaveRequest(this.m_requestDto.id),
						this.m_requestDto,
					);
					if (!response) {
						return this.toastError(this.$t("message.update_error"));
					}
					if (!response.state) {
						return this.toastError(this.$t("message.update_error"));
					}
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					this.ruleGenerateCodes = this.ruleGenerateCodes.map(
						(ele) => (ele = "${" + ele + "}"),
					);
					this.m_requestDto.ruleGenerateCode =
						this.ruleGenerateCodes.join("");
					this.m_requestDto.created = this.getUserInfo();
					this.m_requestDto.createdName =
						this.getUserInfo().createdName;
					this.m_requestDto.createdDate = new Date();
					response = await globalService.postData_Async(
						administratorAPI.API_CreateRequest(),
						this.m_requestDto,
					);
					if (!response) {
						return this.toastError(this.$t("message.add_error"));
					}
					if (!response.state) {
						return this.toastError(this.$t("message.add_error"));
					}
					this.toastSuccess(this.$t("message.add_success"));
					console.log(123);
				}

				this.m_requestDto = response.data;
				console.log("this.m_requestDto", this.m_requestDto);
				// this.m_update();
				this.$emit("save", this.m_requestDto);
			} catch (error) {
				console.log(456);
				this.toastError(error);
			} finally {
				this.isSaving = false;
			}
		},
		m_update() {
			let that = this.m_requestDto;
			this.m_requestDto.requestGroup = this.requestGroups_full.find(
				(entry) => {
					return entry.id == that.requestGroup.id;
				},
			);
			this.m_requestDto.requestType = this.requestTypes_full.find(
				(entry) => {
					return entry.id == that.requestType.id;
				},
			);
			this.m_requestDto.processInfo = this.processInfos_full.find(
				(entry) => {
					return entry.id == that.processInfo.id;
				},
			);
		},
		openEditRequestGroup() {
			this.editRequestGroupDialog = true;
		},
		onClose(value) {
			if (value) {
				this.editRequestGroupDialog = false;
				this.editRequestTypeDialog = false;
				this.editTemplateFormDialog = false;
				this.templateFormGridDialog = false;
			}
		},
		onSaveRequestGroup(value) {
			this.requestGroups.push(value);
			this._requestGroups();
		},
		openEditRequestType() {
			this.editRequestTypeDialog = true;
		},
		onSaveRequestType(value) {
			this.requestTypes.push(value);
			this._requestTypes();
		},
		openEditTemplateForm() {
			this.editTemplateFormDialog = true;
		},
		onSaveTemplateForm(value) {
			this.templateForms.push(value);
			this._templateForms();
		},
		openRequestSelection() {
			this.templateFormGridDialog = true;
		},
		async getStepInProcesses(processInfos) {
			for (let processInfo of processInfos) {
				this.stepInProcesses[processInfo.id] =
					await this._getStepInProcesses(processInfo);
			}
		},
		async _getStepInProcesses(processInfo) {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllStepInProcessByProcessInfoId(
						processInfo.id,
					),
				);
				if (!response) {
					return [];
				}
				if (!response.state) {
					return [];
				}
				return response.data;
			} catch (error) {
				return [];
			}
		},
		selectProcessInfo(item) {
			if (this.m_requestDto.processInfos) {
				this.m_requestDto.processInfos.push({
					processName: item.processName,
					id: item.id,
				});
				// console.log(this.m_requestDto.processInfos);
				console.log(
					"this.m_requestDto.process",
					this.mrequestDto.processInfos,
				);
			} else {
				this.m_requestDto.processInfos = [];
				this.m_requestDto.processInfos.push({
					processName: item.processName,
					id: item.id,
				});
			}
		},
		onSelectTemplateForm(value) {
			this.m_requestDto.templateForms = value;
			this.templateFormGridDialog = false;
		},
		deselectTemplateForm(item) {
			this.m_requestDto.templateForms.splice(
				this.requestDto.templateForms.indexOf(item),
				1,
			);
		},
		deselectProcessInfo(item) {
			this.m_requestDto.processInfos.splice(
				this.requestDto.processInfos.indexOf(item),
				1,
			);
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
		resetRequestDto() {
			this.m_requestDto = RequestDto;
		},
		changeRG() {
			let check = 0;
			for (const requestGroup of this.requestGroups) {
				check = 0;
				if (
					this.m_requestDto.requestGroup ==
					requestGroup.requestGroupName
				) {
					this.m_requestDto.requestGroup = requestGroup;
					check = check + 1;
					break;
				}
			}
			if (
				check == 0 &&
				typeof this.m_requestDto.requestGroup == "string" &&
				this.m_requestDto.requestGroup.length > 0
			) {
				this.errorMessageRequestGroupName = this.$t(
					"error.correct_information",
				);
			}
			if (typeof this.m_requestDto.requestGroup == "object") {
				this.errorMessageRequestGroupName = "";
			}
		},
		changeRT() {
			let check = 0;
			for (const requestType of this.requestTypes) {
				check = 0;
				if (
					this.m_requestDto.requestType == requestType.requestTypeName
				) {
					this.m_requestDto.requestType = requestType;
					check = check + 1;
					break;
				}
			}
			if (
				check == 0 &&
				typeof this.m_requestDto.requestType == "string" &&
				this.m_requestDto.requestType.length > 0
			) {
				this.errorMessageRequestTypeName = this.$t(
					"error.correct_information",
				);
			}
			if (typeof this.m_requestDto.requestType == "object") {
				this.errorMessageRequestTypeName = "";
			}
		},
		changePI() {
			let check = 0;
			for (const processInfo of this.processInfos) {
				check = 0;
				if (this.m_requestDto.processInfo == processInfo.processName) {
					this.m_requestDto.processInfo = processInfo;
					check = check + 1;
					break;
				}
			}
			if (
				check == 0 &&
				typeof this.m_requestDto.processInfo == "string" &&
				this.m_requestDto.processInfo.length > 0
			) {
				this.errorMessageProcessInfo = this.$t(
					"error.correct_information",
				);
			}
			if (typeof this.m_requestDto.processInfo == "object") {
				this.errorMessageProcessInfo = "";
			}
		},
		async loadTemplate() {
			await this._templateForms();
		},
		async loadProcessInfo() {
			await this._processInfos();
			// await this.getStepInProcesses(this.processInfos);
		},
		deselectGenerateCode(item) {
			this.ruleGenerateCodes.splice(
				this.ruleGenerateCodes.indexOf(item),
				1,
			);
		},
	},
};
</script>

<style>
.v-select-list,
.v-list {
	max-width: 100% !important;
}
.v-menu__content {
	min-width: 1492px !important;
}
</style>
