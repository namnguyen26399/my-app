<template>
	<v-card class="p-4" elevation="0">
		<v-tabs center-active background-color="red lighten-2" dark>
			<v-tab>Thông tin chung</v-tab>
			<v-tab>Cấu hình chi tiết</v-tab>
			<v-tab>Tài liệu</v-tab>
			<v-tab>Quy trình</v-tab>
		</v-tabs>
		<v-row class="mt-4 p-4">
			<h2>Tạo mới phiếu yêu cầu</h2>
			<v-col cols="12" sm="12" md="12" class="d-flex">
				<v-combobox
					:items="listRequestGroup"
					label="Nhóm yêu cầu"
					outlined
					:item-text="(item) => item.requestGroupName"
				></v-combobox>

				<!-- <v-btn class="rounded ml-3" color="blue" dark>
					<v-icon> mdi-plus-circle </v-icon>
				</v-btn> -->
				<v-dialog
					v-model="dialogCreateRequestGroup"
					width="fit-content"
				>
					<template v-slot:activator="{ on, attrs }">
						<div>
							<v-btn
								color="blue darken-1"
								dark
								class="ml-3 rounded-pill"
								v-bind="attrs"
								v-on="on"
								@click="validate"
							>
								<v-icon> mdi-plus-circle </v-icon>
								<!-- {{ $t("button.create") }} -->
							</v-btn>
						</div>
					</template>

					<v-card>
						<v-card-title>
							<span class="text-h5">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-card-title>
								<span class="text-h5">{{
									$t("title.create_group_request")
								}}</span>
							</v-card-title>
							<v-container>
								<v-form v-model="valid">
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemRequestGroup.requestGroupCode
												"
												:label="
													$t(
														'label.request_group_code',
													)
												"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemRequestGroup.requestGroupName
												"
												:label="
													$t(
														'label.request_group_name',
													)
												"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-textarea
												v-model="
													createItemRequestGroup.description
												"
												:label="$t('label.description')"
												outlined
											></v-textarea>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="
													createItemRequestGroup.isActive
												"
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
								color="blue darken-1"
								text
								@click="closeDialogCreateRequestGroup"
							>
								<v-icon>mdi-close </v-icon>
								{{ $t("button.cancel") }}
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								@click="saveRequestGroup()"
							>
								{{ $t("button.save") }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col cols="12" sm="12" md="12" class="d-flex">
				<!-- <v-text-field :label="`Chọn Loại yêu cầu`"></v-text-field> -->
				<v-combobox
					:items="listRequestType"
					label="Loại yêu cầu"
					outlined
					:item-text="(item) => item.requestTypeName"
				></v-combobox>
				<!-- 
				<v-btn class="rounded ml-3" color="blue" dark>
					<v-icon> mdi-plus-circle </v-icon>
				</v-btn> -->
				<v-dialog v-model="dialogCreateRequestType" width="fit-content">
					<template v-slot:activator="{ on, attrs }">
						<div>
							<v-btn
								color="blue darken-1"
								dark
								class="ml-3 rounded"
								v-bind="attrs"
								v-on="on"
								@click="validate"
							>
								<v-icon> mdi-plus-circle </v-icon>
								<!-- {{ $t("button.create") }} -->
							</v-btn>
						</div>
					</template>

					<v-card>
						<v-card-text>
							<v-card-title>
								<span class="text-h5">{{
									$t("title.create_type_request")
								}}</span>
							</v-card-title>
							<v-container>
								<v-form v-model="valid">
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemRequestType.requestTypeCode
												"
												:label="
													$t(
														'label.request_type_code',
													)
												"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemRequestType.requestTypeName
												"
												:label="
													$t(
														'label.request_type_name',
													)
												"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-textarea
												v-model="
													createItemRequestType.description
												"
												:label="$t('label.description')"
												outlined
											></v-textarea>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="
													createItemRequestType.isActive
												"
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
								color="blue darken-1"
								text
								@click="closeDialogCreateRequestType"
							>
								<v-icon>mdi-close </v-icon>
								{{ $t("button.cancel") }}
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								@click="saveRequestType"
							>
								{{ $t("button.save") }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col cols="12" sm="12" md="12" class="d-flex">
				<v-combobox
					:items="listSteps"
					label="Chọn loại quy trình"
					outlined
					:item-text="(item) => item.stepName"
				></v-combobox>

				<!-- <v-btn class="rounded ml-3" color="blue" dark>
					<v-icon> mdi-plus-circle </v-icon>
				</v-btn> -->
				<v-dialog v-model="dialogCreateStep" width="fit-content">
					<template v-slot:activator="{ on, attrs }">
						<div>
							<v-btn
								color="blue darken-1"
								dark
								class="ml-3 rounded"
								v-bind="attrs"
								v-on="on"
								@click="validate"
							>
								<v-icon> mdi-plus-circle </v-icon>
								<!-- {{ $t("button.create") }} -->
							</v-btn>
						</div>
					</template>

					<v-card>
						<v-card-text>
							<v-card-title>
								<span class="text-h5">{{
									$t("title.create_step")
								}}</span>
							</v-card-title>
							<v-container>
								<v-form v-model="valid">
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemStep.stepCode
												"
												:label="$t('label.step_code')"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemStep.stepName
												"
												:label="$t('label.step_name')"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-textarea
												v-model="
													createItemStep.description
												"
												:label="$t('label.description')"
												outlined
											></v-textarea>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="
													createItemStep.isActive
												"
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
								color="blue darken-1"
								text
								@click="closeDialogStep()"
							>
								<v-icon>mdi-close </v-icon>
								{{ $t("button.cancel") }}
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								@click="saveStep()"
							>
								{{ $t("button.save") }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col cols="12" sm="12" md="12" class="d-flex">
				<v-combobox
					:items="listForms"
					label="Chọn loại biểu mẫu"
					outlined
					:item-text="(item) => item.templateFormName"
				></v-combobox>

				<!-- <v-btn class="rounded ml-3" color="blue" dark>
					<v-icon> mdi-plus-circle </v-icon>
				</v-btn> -->
				<v-dialog v-model="dialogCreateForm" width="fit-content">
					<template v-slot:activator="{ on, attrs }">
						<div>
							<v-btn
								color="blue darken-1"
								dark
								class="ml-3 rounded"
								v-bind="attrs"
								v-on="on"
								@click="validate"
							>
								<v-icon> mdi-plus-circle </v-icon>
								<!-- {{ $t("button.create") }} -->
							</v-btn>
						</div>
					</template>

					<v-card>
						<v-card-text>
							<v-card-title>
								<span class="text-h5">{{
									$t("title.create_form")
								}}</span>
							</v-card-title>
							<v-container>
								<v-form v-model="valid">
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemStep.templateFormCode
												"
												:label="$t('label.code_form')"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													createItemStep.templateFormName
												"
												:label="$t('label.name_form')"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-textarea
												v-model="
													createItemStep.description
												"
												:label="$t('label.description')"
												outlined
											></v-textarea>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="
													createItemStep.isActive
												"
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
								color="blue darken-1"
								text
								@click="closeDialogStep()"
							>
								<v-icon>mdi-close </v-icon>
								{{ $t("button.cancel") }}
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								@click="saveStep()"
							>
								{{ $t("button.save") }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col>
				<v-btn
					class="rounded"
					color="blue"
					dark
					@click="createRequest()"
				>
					Tạo mới
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
export default {
	name: "CreateTypeRequest",
	data() {
		return {
			user_current: this.getUserInfo(),
			search: "",
			dialogCreateRequestGroup: false,
			dialogCreateRequestType: false,
			dialogCreateStep: false,
			dialogCreateForm: false,
			listRequestGroup: [],
			listRequestType: [],
			listSteps: [],
			listForms: [],
			createItemRequestType: {
				createdDate: null,
				createdId: null,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: null,
				numberRequestData: null,
				numberRequestType: null,
				requestTypeCode: "",
				requestTypeName: "",
				description: "",
			},
			defaultItemRequestType: {
				createdDate: null,
				createdId: null,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: null,
				numberRequestData: null,
				numberRequestType: null,
				requestTypeCode: "",
				requestTypeName: "",
				description: "",
			},
			createItemRequestGroup: {
				id: null,
				requestGroupCode: "",
				requestGroupName: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: false,
				isDelete: false,
				numberRequestType: null,
				numberRequest: "",
				numberRequestData: "",
			},
			defaultItemRequestGroup: {
				id: null,
				requestGroupCode: "",
				requestGroupName: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: false,
				isDelete: false,
				numberRequestType: null,
				numberRequest: "",
				numberRequestData: "",
			},
			createItemStep: {
				createdDate: null,
				created: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modified: null,
				tennant: null,
				modifiedName: "",
				stepCode: "",
				stepName: "",
				tennantCode: "",
				tennantName: "",
			},
			defaultItemStep: {
				createdDate: null,
				createdId: null,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: null,
				numberRequestData: null,
				numberRequestType: null,
				requestTypeCode: "",
				requestTypeName: "",
				description: "",
			},
			createItemForm: {
				id: null,
				templateFormCode: "",
				templateFormName: "",
				fileExtension: "",
				path: "",
				fullPath: "",
				ofice365Path: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
			},
			defaultItemForm: {
				id: null,
				templateFormCode: "",
				templateFormName: "",
				fileExtension: "",
				path: "",
				fullPath: "",
				ofice365Path: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
			},
		};
	},

	computed: {},

	watch: {
		dialogCreateRequestGroup(val) {
			val || this.closeDialogCreateRequestGroup();
		},
		dialogCreateRequestType(val) {
			val || this.closeDialogCreateRequestType();
		},
		dialogCreateStep(val) {
			val || this.closeDialogCreateStep();
		},
		dialogCreateForm(val) {
			val || this.closeDialogCreateForm();
		},
	},

	async created() {
		this.$Progress.start();
		await this.getListRequestGroup();
		await this.getListRequsetType();
		await this.getListStep();
		await this.getListTemplateForm();
	},
	mounted() {
		this.$Progress.finish();
	},

	methods: {
		async getListRequestGroup() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/request-groups",
				);
				if (!response || !response.state) {
					return;
				}
				this.listRequestGroup = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getListRequsetType() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/request-types",
				);
				if (!response || !response.state) {
					return;
				}
				this.listRequestType = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getListStep() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/steps",
				);
				if (!response || !response.state) {
					return;
				}
				this.listSteps = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getListTemplateForm() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/template-forms",
				);
				if (!response || !response.state) {
					return;
				}
				this.listForms = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		closeDialogCreateRequestGroup() {
			this.dialogCreateRequestGroup = false;
			this.$nextTick(() => {
				this.createItemRequestGroup = Object.assign(
					{},
					this.defaultItemRequestGroup,
				);
			});
		},
		closeDialogCreateRequestType() {
			this.dialogCreateRequestType = false;
			this.$nextTick(() => {
				this.createItemRequestType = Object.assign(
					{},
					this.defaultItemRequestType,
				);
			});
		},
		closeDialogCreateStep() {
			this.dialogCreateStep = false;
			this.$nextTick(() => {
				this.createItemStep = Object.assign({}, this.defaultItemStep);
			});
		},
		closeDialogCreateForm() {
			this.dialogCreateForm = false;
			this.$nextTick(() => {
				this.createItemForm = Object.assign({}, this.defaultItemForm);
			});
		},
		async saveRequestType() {
			this.createItemRequestType.createdName = this.user_current.fullName;
			this.createItemRequestType.modifiedDate = new Date();
			this.createItemRequestType.createdDate = new Date();
			this.createItemRequestType.modifiedName =
				this.user_current.fullName;
			let response = await globalService.postData_Async(
				`/api/request-types`,
				this.createItemRequestType,
			);
			if (response.state) {
				this.toastSuccess(this.$t("message.msg_3"));
			} else {
				this.toastError(this.$t("message.error"));
			}
			this.getListRequsetType();
			this.closeDialogCreateRequestType();
		},
		async saveRequestGroup() {
			this.createItemRequestGroup.createdName =
				this.user_current.fullName;
			this.createItemRequestGroup.modifiedDate = new Date();
			this.createItemRequestGroup.createdDate = new Date();
			this.createItemRequestGroup.modifiedName =
				this.user_current.fullName;
			let response = await globalService.postData_Async(
				`/api/request-groups`,
				this.createItemRequestGroup,
			);
			if (response.state) {
				this.toastSuccess(this.$t("message.msg_3"));
			} else {
				this.toastError(this.$t("message.error"));
			}
			this.getListRequestGroup();
			this.closeDialogCreateRequestGroup();
		},
		async saveStep() {
			this.createItemStep.createdName = this.user_current.fullName;
			this.createItemStep.modifiedDate = new Date();
			this.createItemStep.createdDate = new Date();
			this.createItemStep.modifiedName = this.user_current.fullName;
			let response = await globalService.postData_Async(
				`/api/steps`,
				this.createItemStep,
			);
			if (response.state) {
				this.toastSuccess(this.$t("message.msg_3"));
			} else {
				this.toastError(this.$t("message.error"));
			}
			this.getListStep();
			this.closeDialogCreateStep();
		},
		async saveItemForm() {
			this.createItemForm.createdName = this.user_current.fullName;
			this.createItemForm.modifiedDate = new Date();
			this.createItemForm.createdDate = new Date();
			this.createItemForm.modifiedName = this.user_current.fullName;
			let response = await globalService.postData_Async(
				`/api/template-forms`,
				this.createItemForm,
			);
			if (response.state) {
				this.toastSuccess(this.$t("message.msg_3"));
			} else {
				this.toastError(this.$t("message.error"));
			}
			this.getListTemplateForm();
			this.closeDialogCreateStep();
		},
	},
};
</script>
