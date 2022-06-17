<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-row>
			<v-col cols="12" md="8"
				><v-tabs v-model="tab" color="primary">
					<v-tab key="general_information">
						{{ $t("tab.general_information") }}
					</v-tab>
					<v-tab :disabled="!requestDto.id" key="detail">
						{{ $t("tab.configuration_form") }}
					</v-tab>
					<!-- <v-tab :disabled="!requestDto.id" key="storage">
						{{ $t("tab.storage") }}
					</v-tab> -->
					<v-tab :disabled="!requestDto.id" key="cauhinhbieumau">
						{{ $t("Cấu hình biểu mẫu") }}
					</v-tab>
				</v-tabs>
			</v-col>
			<v-col cols="12" md="4">
				<v-btn
					color="red darken-1"
					dark
					class="float-right mt-1 rounded-pill"
					to="/quan-tri/quan-tri-nhom-loai-yeu-cau"
				>
					<v-icon> mdi-keyboard-backspace</v-icon>
					{{ $t("button.back") }}
				</v-btn>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-tabs-items v-model="tab">
			<v-tab-item key="general_information">
				<EditRequestGeneralInformationVue
					:requestDto="requestDto"
					@save="onSaveRequestDto"
				/>
			</v-tab-item>
			<v-tab-item v-if="!!requestDto.id" key="detail">
				<EditRequestDetailVue
					:requestDto="requestDto"
					@save="onSaveForm"
				/>
			</v-tab-item>
			<!-- <v-tab-item v-if="!!requestDto.id" key="storage">
				<EditRequestStorageVue
					:requestDto="requestDto"
					@save="onSaveForm"
				/>
			</v-tab-item> -->
			<v-tab-item v-if="!!requestDto.id" key="cauhinhbieumau">
				<CauHinhBieuMauVue
					:requestDto="requestDto"
					:Form="form"
					@save="onSaveTemplate"
				/>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
import EditRequestDetailVue from "./EditRequestDetail.vue";
import EditRequestGeneralInformationVue from "./EditRequestGeneralInformation.vue";
import CauHinhBieuMauVue from "./CauHinhBieuMau.vue";
import RequestDto from "@/models/request.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
// import EditRequestStorageVue from "./EditRequestStorage.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";

export default {
	name: "EditRequestVue",
	components: {
		EditRequestGeneralInformationVue,
		EditRequestDetailVue,
		// EditRequestStorageVue,
		CauHinhBieuMauVue,
		BreadcrumbsVue,
	},
	data() {
		return {
			requiredRules: [(v) => !!v || this.$t("message.msg_1")],
			requestDto: RequestDto,
			tab: null,
			requestGroups: [],
			requestTypes: [],
			processInfos: [],
			templateForms: [],
			response_EForm_Id: null,
			form: [],
		};
	},
	created() {
		this.$Progress.start();
		this.init();
	},
	mounted() {
		this.$Progress.finish();
	},
	methods: {
		async init() {
			this.requestGroups = await this._requestGroups();
			this.requestTypes = await this._requestTypes();
			this.processInfos = await this._processInfos();
			this.templateForms = await this._templateForms();
			if (!this.$router.currentRoute.params.id) {
				this.requestDto = {
					created: null,
					createdDate: new Date(),
					createdName: "",
					description: "",
					directoryPath: "",
					form: null,
					id: null,
					isActive: true,
					isDelete: false,
					modified: null,
					modifiedDate: new Date(),
					modifiedName: "",
					numberRequestData: 0,
					processInfo: null,
					requestCode: "",
					requestGroup: null,
					requestName: "",
					requestType: null,
					templateForms: [],
					tennant: null,
					tennantCode: "",
					tennantName: "",
				};
				return;
			} else {
				let response;
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetRequest(
							this.$router.currentRoute.params.id,
						),
					);
					if (!response || !response.state) {
						return this.toastError(this.$t("error.load"));
					}
					this.requestDto = response.data;
					this.m_update();
				} catch (error) {
					// //this.toastError(error);
				}
			}
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
				return response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				//this.toastError(error);
				return [];
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
				return response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				//this.toastError(error);
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
				return response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				//this.toastError(error);
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
				return response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				//this.toastError(error);
				return [];
			}
		},
		m_update() {
			let that = this.requestDto;
			this.requestDto.requestGroup = this.requestGroups.find((entry) => {
				return entry.id == that.requestGroup.id;
			});
			this.requestDto.requestType = this.requestTypes.find((entry) => {
				return entry.id == that.requestType.id;
			});
			this.requestDto.processInfo = this.processInfos.find((entry) => {
				return entry.id == that.processInfo.id;
			});
		},
		onSaveRequestDto(value) {
			console.log(10);
			this.requestDto = value;
			this.tab = 1;
		},
		onSaveForm(value) {
			this.response_EForm_Id = value.eformId;
			this.form = value.form_;
			console.log(this.response_EForm_Id, this.form);
		},
		onSaveTemplate(value) {
			console.log(value);
		},
		async saveRequest() {
			this.requestDto.form = {
				id: null,
			};
			this.requestDto.form.id = this.response_EForm_Id;
			let response_quest = await globalService.putData_Async(
				"/api/requests/" + this.requestDto.id,
				this.requestDto,
			);
			if (response_quest.state) {
				this.toastSuccess(this.$t("message.success"));
			} else {
				this.toastError(this.$t("message.error"));
			}
			this.$router.push({
				path: "/administrator/list-request",
			});
		},
	},
};
</script>

<style></style>
