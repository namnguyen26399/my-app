<template>
	<v-card elevation="0">
		<v-row>
			<v-col md="8">
				<v-card elevation="3" color="#C2C2C2">
					<v-row class="mt-4">
						<v-col cols="12" md="12" class="px-10">
							<label> Nhóm yêu cầu : </label>
							<v-combobox
								v-model="requestGroup"
								:items="requestGroups"
								item-text="requestGroupName"
								outlined
								dense
								background-color="#fff"
								class="text-red pt-2"
								clearable
								@click:clear="clearRequestGroup()"
								@change="handleRequestGroup($event)"
							>
								<template
									v-slot:selection="{
										attrs,
										item,
										parent,
										selected,
									}"
								>
									<v-chip
										v-if="item === Object(item)"
										v-bind="attrs"
										:input-value="selected"
										label
										class="ma-2 rounded-pill"
									>
										<span class="red--text">
											{{
													
														item.requestGroupName,

											}}
										</span>

										<span class="pr-2">
											{{ item.fullName }}
										</span>
										<v-icon
											small
											@click="parent.selectItem(item)"
										>
										</v-icon>
									</v-chip>
								</template>
							</v-combobox>
						</v-col>
					</v-row>
					<v-row class="mt-2">
						<v-col cols="12" md="12" class="px-10">
							<label> Loại yêu cầu : </label>
							<v-combobox
								v-model="requestType"
								:items="requestTypes"
								item-text="requestTypeName"
								:item-value="
									(itemrequestType) => itemrequestType
								"
								outlined
								dense
								background-color="#fff"
								clearable
								@change="handleRequestTypes($event)"
								@click:clear="clearForm()"
							>
								<template
									v-slot:selection="{
										attrs,
										item,
										parent,
										selected,
									}"
								>
									<v-chip
										v-if="item === Object(item)"
										v-bind="attrs"
										:input-value="selected"
										label
										class="ma-2 rounded-pill"
									>
										<span class="red--text">
											{{
													
														item.requestTypeName,

											}}
										</span>

										<span class="pr-2">
											{{ item.fullName }}
										</span>
										<v-icon
											small
											@click="parent.selectItem(item)"
										>
										</v-icon>
									</v-chip>
								</template>
							</v-combobox>
						</v-col>
					</v-row>
					<!-- <v-row class="mt-4" v-if="request">
						<v-col cols="12" md="12" class="px-10">
							<label> Biểu mẫu liên quan : </label>
							<v-file-input> </v-file-input>
						</v-col>
					</v-row> -->
				</v-card>
				<v-form ref="form" v-model="valid">
					<v-card
						elevation="0"
						class="grey lighten-4 p-2"
						outlined
						color="#C2C2C2"
					>
						<v-row
							v-for="(row, rowIndex) in form"
							:key="'row_' + rowIndex"
							class="form-row"
						>
							<v-col
								v-for="(col, colIndex) in row.elements"
								:key="'col_' + rowIndex + '_' + colIndex"
								:cols="col.width"
							>
								<v-row>
									<v-card
										elevation="0"
										class="m-1 p-2 rounded col-12"
									>
										<v-card-text
											v-if="
												col.field &&
												col.field.previewSchema
											"
										>
											<v-jsf
												v-model="col.field.previewModel"
												:schema="
													col.field.previewSchema
												"
												:options="options"
												:key="
													'col_' +
													rowIndex +
													'_' +
													colIndex
												"
											>
												<v-data-table
													v-if="
														col.field.name ==
														'Trường bảng'
													"
													:items="selected"
													dense
													:headers="headers"
													:items-per-page="5"
													class="elevation-1"
													multi-sort
												>
													<template
														v-slot:[`item.action`]="{
															item,
														}"
													>
														<v-icon
															small
															class="mr-2"
															@click="
																editItem(item)
															"
														>
															mdi-pencil
														</v-icon>
														<v-icon
															small
															@click="
																deleteItem(item)
															"
														>
															mdi-delete
														</v-icon>
													</template>
													<template v-slot:top>
														<div class="d-flex">
															<span
																v-for="item of rowToAdd"
																:key="
																	item.value
																"
															>
																<v-checkbox
																	v-if="
																		item.type ==
																		'checkbox'
																	"
																	v-model="
																		editedItem[
																			item
																				.value
																		]
																	"
																	:label="
																		item.text
																	"
																	outlined
																	class="ml-2"
																	dense
																	:disabled="
																		selected.length ==
																		0
																	"
																>
																</v-checkbox>
																<v-text-field
																	v-else
																	v-model="
																		editedItem[
																			item
																				.value
																		]
																	"
																	:label="
																		item.text
																	"
																	:type="
																		item.type
																	"
																	outlined
																	class="ml-2"
																	dense
																	:disabled="
																		selected.length ==
																		0
																	"
																	@keyup="
																		log()
																	"
																>
																</v-text-field>
															</span>
														</div>
														<v-spacer></v-spacer>
														<v-dialog>
															<template
																v-slot:activator="{
																	attrs,
																}"
															>
																<v-btn
																	color="primary"
																	dark
																	class="mb-2"
																	v-bind="
																		attrs
																	"
																	@click="
																		createTable()
																	"
																>
																	New row
																</v-btn>
															</template>
														</v-dialog>
													</template>
												</v-data-table>
												<!-- <v-file-input
													v-if="
														requestData.status &&
														requestData.status
															.id == '2' &&
														col.field.name ==
															'Trường tải lên file'
													"
													outlined
													dense
													accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
													@change="
														handleFileUpload(
															$event,
															rowIndex,
															colIndex,
														)
													"
													v-model="
														s_file[
															col.field
																.attachmentInfo
																.id
														]
													"
												>
													<template v-slot:label>
														<div>
															<p
																v-if="
																	col.field
																		.attachmentInfo
																		.fileName &&
																	!s_file[
																		col
																			.field
																			.attachmentInfo
																			.id
																	]
																"
															>
																{{
																	col.field
																		.attachmentInfo
																		.fileName
																}}
															</p>
															<p v-else>
																{{
																	$t(
																		"label.attachment_file",
																	)
																}}
																<span
																	class="
																		text-red
																	"
																>
																	{{
																		$t(
																			"label.star",
																		)
																	}}
																</span>
															</p>
														</div>
													</template>
												</v-file-input> -->
											</v-jsf>
										</v-card-text>
									</v-card>
								</v-row>
							</v-col>
						</v-row>
					</v-card>
				</v-form>
			</v-col>
			<v-col md="4">
				<v-card>
					<v-card-title>
						<h4>Thông tin chung</h4>
					</v-card-title>
					<!-- <v-card-text>
						<v-col cols="12" v-if="requestData">
							<v-text-field
								outlined
								dense
								readonly
								label="Số kí hiệu"
								v-model="requestData.id"
								>{{
							}}</v-text-field>
						</v-col>
						<v-col cols="12" class="py-0" v-if="requestData">
							<v-text-field
								outlined
								dense
								readonly
								label="Trạng thái"
								v-model="requestData.status.statusName"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="requestData">
							<v-text-field
								outlined
								dense
								readonly
								label="Nhóm phiếu yêu cầu"
								v-model="
									requestData.request.requestGroup
										.requestGroupName
								"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="requestData">
							<v-text-field
								outlined
								dense
								readonly
								label="Loại phiếu yêu cầu"
								v-model="
									requestData.request.requestType
										.requestTypeName
								"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="requestData">
							<v-text-field
								outlined
								dense
								readonly
								label="Người tạo"
								v-model="requestData.created.fullName"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="requestData">
							<v-text-field
								outlined
								dense
								readonly
								label="Ngày tạo"
								v-model="requestData.createdDate"
							></v-text-field>
						</v-col>
					</v-card-text> -->
					<v-divider></v-divider>
					<v-card-title> Biểu mẫu liên quan : </v-card-title>
					<v-card-text>
						<div
							v-for="(
								attachment, index
							) of listAttachmentFlieByRequest"
							:key="index"
						>
							<v-btn
								class="ma-2 border-0"
								outlined
								color="indigo"
								@click="openViewAttachmentFile()"
							>
								{{ attachment.fileName | formatName }}
							</v-btn>
						</div>
					</v-card-text>
					<v-divider></v-divider>
					<v-divider></v-divider>
					<v-card-title> Phiếu yêu cầu liên quan : </v-card-title>
					<v-card-text>
						<div
							v-for="(attachment, index) of listAttachmentFile"
							:key="index"
						>
							<v-btn
								class="ma-2 border-0"
								outlined
								color="indigo"
								@click="openViewAttachmentFile()"
							>
								{{ attachment.fileName }}
							</v-btn>
						</div>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-title>Chia sẻ với</v-card-title>
					<v-card-text>
						<v-combobox
							v-model="listUserInfo"
							:items="listUserInfos"
							item-text="fullName"
							chips
							outlined
							dense
							multiple
							hide-selected
							clearable
						>
							<template
								v-slot:selection="{
									attrs,
									item,
									parent,
									selected,
								}"
							>
								<v-chip
									v-if="item === Object(item)"
									v-bind="attrs"
									:input-value="selected"
									label
									class="ma-2"
									close
									@click:close="remove(item)"
								>
									<v-avatar color="indigo mr-2" size="30">
										<span class="white--text">
											{{
												getAvatarText(item.fullName, 2)
											}}
										</span>
									</v-avatar>
									<span class="pr-2">
										{{ item.fullName }}
									</span>
									<v-icon
										small
										@click="parent.selectItem(item)"
									>
									</v-icon>
								</v-chip>
							</template>
						</v-combobox>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import VJsf from "@koumoul/vjsf/lib/VJsf";
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import RequestFormDataDto from "@/models/form-data.dto";
import ProcessDataDTO from "@/models/process-data.dto";
import RequestDataDto from "@/models/request-data.dto";
import StepDataDto from "@/models/step-data.dto";
export default {
	name: "VSMFECreateRequestFormV2",
	props: { m_requestDataV2: {}, isSaved: {}, _idStepData: {} },
	components: {
		VJsf,
	},
	watch: {
		async m_requestDataV2(newValue) {
			this.request = newValue;
		},
		// async requestDataDto(newValue) {
		// 	this.requestData = newValue;
		// 	//await this.FormData();
		// 	await this.getFieldData();
		// 	await this.getAttachmentFile();
		// 	this.number = this.headers.length;
		// 	//await this.getStepData();
		// 	for (let i = 0; i < this.form.length; i++) {
		// 		this.file.push([]);
		// 		for (let j = 0; j < 3; j++) {
		// 			this.file[i].push({});
		// 		}
		// 	}
		// },
		// requestStepDataList(value) {
		// 	this.m_requestStepDataList = value;
		// },
		// async isSaved(value) {
		// 	this.m_isSaved = value;
		// 	if (this.m_isSaved.state) {
		// 		if (this.requestData.status.id == "1") {
		// 			await this.UpLoadFile();
		// 		}
		// 		await this.save();
		// 	}
		// },
		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state === 1) {
				await this.saveRequetsData();
			}
		},
		async _idStepData(value) {
			this.idStepData = value;
		},
	},
	data() {
		return {
			user_info: this.getUserInfo(),

			processDataDTO: ProcessDataDTO,
			m_requestDto: RequestDataDto,

			request: null,
			requestGroup: null,
			requestGroups: [],
			requestTypes: [],
			requestType: null,
			requestData: null,
			formData: null,
			options: {
				fieldProps: {
					outlined: "outlined",
					dense: "dense",
				},
			},
			form: [],
			requestFormDataDto: RequestFormDataDto,
			fieldData: null,
			steepData: null,
			m_requestStepDataList: [],
			direction: "top",
			fabs: false,
			fab: false,
			fling: false,
			hover: false,
			tabs: null,
			top: false,
			selected: [],
			right: false,
			dialog: {
				edit: false,
				delete: false,
			},
			bottom: true,
			left: true,
			transition: "slide-y",
			editRefuseRequestForm: false,
			openApproveRequestForm: false,
			openExaminRequestForm2: false,
			editModifyRequestForm: false,
			editRequestModifyRequestForm: false,
			editRequestExamineRequestForm: false,
			editViewAttachmentFile: false,
			listAttachmentFile: [],
			listAttachmentFlieByRequest: [],

			listUserInfos: [],
			valid: null,
			"x-options": {
				messages: {
					pattern: "Sai định dạng",
					required: "Đây là trường bắt buộc.",
					maxLength: "Lớn hơn maxLength",
					minLength: "Nhỏ hơn minLength",
				},
			},

			status: {},
			m_isSaved: {},
			idStepData: {},
			headers: [],
			number: null,
			editIndex: 0,
			rowToAdd: [],
			editedItem: {},
			defaultItem: {},
			upFile: [],
			file: [],
			s_file: [],
			fieldInForm: null,
			stepInProcess: null,
			listUserInfo: [],
			requestStepData: StepDataDto,
		};
	},

	created() {
		this.idStepData = this._idStepData;
		this.m_isSaved = this.isSaved;
		// this.requestData = this.requestDataDto;
		// this.m_requestStepDataList = this.requestStepDataList;
		//this.getFieldData();
	},
	mounted() {
		// this.requestData = this.requestDataDto;
		this.initialize();
	},

	filters: {
		formatName: function (val) {
			console.log("formatName: val: ", val);
			if (val.length > 40) {
				return val.substring(0, 38) + "...";
			}
			return val;
		},
	},

	methods: {
		async initialize() {
			await this._requestGroups();

			//await this._request();
			await this.GetAllUser();
		},
		async handleRequestTypes(event) {
			this.requestType = event;
			if (this.requestType === null) {
				return;
			}

			if (this.requestType.id && this.requestGroup.id) {
				await this._request();
				await this.getStepInProcesses();
				await this.getFieldInForm();
				await this.getForm();

				await this.getAttachmentFileRequest();
			}

			return;
		},
		async handleRequestGroup(event) {
			this.requestGroup = event;
			if (this.requestGroup === null) {
				return;
			}
			await this._requestTypes();
		},
		handleFileUpload(event, row, colunm) {
			this.file[row][colunm] = event;
			if (this.file[row][colunm]) {
				this.errorMessageFile = "";
			}
		},
		async FormData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetFormDataById(this.requestData.id),
				);
				if (!response || !response.state) {
					return [];
				}

				let requests = response.data;
				if (requests.length > 0) {
					this.formData = requests[0];

					this.form = JSON.parse(this.formData.objectSchema);
					for (const form_row of this.form) {
						for (const form_col of form_row.elements) {
							if (form_col.field.name == "Trường bảng") {
								this.headers = JSON.parse(
									form_col.field.configSchema.properties
										.Headers,
								);
							}
						}
					}
					this.form = this.form.map((ele) => {
						if (ele.elements) {
							ele.elements = ele.elements.map((ele1) => {
								if (ele1.field.configModel.is_required)
									ele1.field.previewSchema.required =
										this.spreadObjectToArray(
											ele1.field.previewSchema.properties,
										);
								ele1.field.previewSchema.properties.title.readOnly = false;
								ele1.field.previewSchema.properties.title[
									"x-options"
								] = { ...this["x-options"] };

								ele1.field.previewSchema.properties.title = {
									...ele1.field.previewSchema.properties
										.title,
									...ele1.field.configModel,
								};

								return ele1;
							});
						}
						return ele;
					});
					this.objectToAdd();
				}
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		objectToAdd() {
			this.editIndex = 0;
			for (const head of this.headers) {
				this.rowToAdd.push(head);
			}
			this.headers.push({
				text: "Thao tác",
				value: "action",
				sortable: false,
			});
			for (const row of this.rowToAdd) {
				// this.editedItem["id"] = 0;
				this.editedItem[row.value] = "";
			}
			this.defaultItem = this.editedItem;
		},
		spreadObjectToArray(targetObject) {
			let result = [];
			for (let field in targetObject) {
				result.push(field);
			}
			return result;
		},

		async getFieldData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetFieldDataByIdRequest(
						this.requestData.id,
					),
				);
				if (!response || !response.state) {
					return [];
				}

				let requests = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				if (requests.length > 0) {
					this.fieldData = requests[0];
				}
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getStepData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetSteepDataByIdRequest(
						this.requestData.id,
					),
				);
				if (!response || !response.state) {
					return [];
				}
				let requests = response.data.sort((e1, e2) => {
					return e1 - e2;
				});

				this.steepData = requests;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		openExit() {
			this.$router.push({
				path: `/phieu-yeu-cau/danh-sach`,
			});
		},
		openEditRequestType() {
			this.editRefuseRequestForm = true;
		},
		OpenApproveRequestForm() {
			this.openApproveRequestForm = true;
		},
		openExaminRequestForm() {
			this.openExaminRequestForm2 = true;
		},
		openModifyRequestForm() {
			this.editModifyRequestForm = true;
		},
		openRequestModifyRequestForm() {
			this.editRequestModifyRequestForm = true;
		},
		openRequestExamineRequestForm() {
			this.editRequestExamineRequestForm = true;
		},
		openViewAttachmentFile() {
			this.editViewAttachmentFile = true;
		},
		onClose(value) {
			if (value) {
				this.editRefuseRequestForm = false;
				this.openApproveRequestForm = false;
				this.openExaminRequestForm2 = false;
				this.editModifyRequestForm = false;
				this.editRequestModifyRequestForm = false;
				this.editRequestExamineRequestForm = false;
				this.editViewAttachmentFile = false;
			}
		},
		async getAttachmentFile() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllAttachmentFileByRequestDataId(
						this.requestData.id,
					),
				);
				if (!response || !response.state) {
					return [];
				}

				this.listAttachmentFile = response.data[0];
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async GetAllUser() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfos(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.listUserInfos = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error);
				return;
			}
		},

		async GetStepData() {
			let tempOrderMin = Math.min(
				...this.m_requestStepDataList.map((e) => e.stepOrder),
			);
			for (let stepData of this.m_requestStepDataList) {
				if (stepData.stepOrder == tempOrderMin) {
					stepData.isActive = true;
					let response = await globalService.putData_Async(
						administratorAPI.API_UpDateStepData(stepData.id),
						stepData,
					);

					if (!response || !response.state) {
						{
							return;
						}
					}
				}
			}
		},
		createTable() {
			this.editedItem = Object.assign({}, this.defaultItem);
			// this.editedItem["id"] = this.selected.length + 1;
			this.selected.push(Object.assign({}, this.editedItem));
			this.editItem(this.selected[this.selected.length - 1]);
		},
		remove(item) {
			this.requestData.splice(this.requestData.indexOf(item), 1);
		},
		editItem(item) {
			this.editIndex = this.selected.indexOf(item);
			this.editedItem = this.selected[this.editIndex];
		},
		deleteItem(item) {
			this.selected.splice(this.selected.indexOf(item), 1);
			// this.dialog.delete = true;
			this.editedItem = Object.assign({}, this.defaultItem);
		},
		onConfirmDelete() {},
		onCloseDialog() {
			this.dialog.delete = false;
		},
		log() {
			this.selected[this.editIndex] = Object.assign({}, this.editedItem);
		},
		async UpLoadFile2() {
			for (let i = 0; i < this.form.length; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.file[i][j] && this.file[i][j].type) {
						let response = await globalService.uploadData_Async(
							administratorAPI.API_UploadFile(),
							this.file[i][j],
							{
								isFolder: 0,
								needEncrypt: true,
								contentType: this.file[i][j].type,
							},
						);
						if (!response) {
							return this.toastError(
								this.$t("error.upload_file"),
							);
						}
						if (!response.state) {
							return this.toastError(response.message);
						}
						this.form[i].elements[j].field.attachmentInfo =
							response.data;
					}
				}
			}
		},
		async UpLoadFile() {
			let listUpload = [];
			this.form.forEach((entry) => {
				entry.elements.forEach((entry1) => {
					if (entry1.field.previewModel.title?.data)
						listUpload.push(entry1);
				});
			});
			for (let entry of listUpload) {
				let response = await globalService.uploadData_Async(
					administratorAPI.API_UploadFile(),
					entry.field.previewModel.title?.data,
					{
						isFolder: 0,
						needEncrypt: true,
						contentType: entry.field.previewModel.title?.type,
					},
				);
				if (!response) {
					return this.toastError(this.$t("error.upload_file"));
				}
				if (!response.state) {
					return this.toastError(response.message);
				}

				let attachmentFileCreater = response.data;
				this.upFile = attachmentFileCreater;
				entry.field.attachmentInfo = attachmentFileCreater;
				console.log(
					"entry.field.attachmentInfo",
					entry.field.attachmentInfo,
				);

				// attachmentFileCreater.created = this.getUserInfo();
				// attachmentFileCreater.requestData = {
				// 	id: this.requestData.id,
				// };
				// try {
				// 	let response = await globalService.putData_Async(
				// 		administratorAPI.API_UpdateAttachmentFile(
				// 			attachmentFileCreater.id,
				// 		),
				// 		attachmentFileCreater,
				// 	);
				// 	if (!response || !response.state) {
				// 		return;
				// 	}
				// 	return;
				// } catch (error) {
				// 	this.toastError(error);
				// }
			}
		},

		async updateAttachmentFile(attachmentFileDto) {
			attachmentFileDto.created = this.getUserInfo();
			attachmentFileDto = this.getUserInfo();
			attachmentFileDto = new Date();
			attachmentFileDto.requestData = { id: this.requestData.id };
			try {
				let response = await globalService.putData_Async(
					administratorAPI.API_UpdateAttachmentFile(
						attachmentFileDto.id,
					),
					attachmentFileDto,
				);
				if (!response || !response.state) {
					return;
				}
				return;
			} catch (error) {
				this.toastError(error);
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
					administratorAPI.API_GetAllRequestTypeByRequestGroupId(
						this.requestGroup.id,
					),
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
					console.log("this.request ", this.request);
					this.$emit("save", this.request);
				}
			} catch (error) {
				this.toastError(error);
				return;
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
				console.log("this.fieldInForm", this.fieldInForm);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getForm() {
			console.log("11111111");
			this.formData = this.request.form;
			console.log("this.request.form", this.request.form);

			this.form = JSON.parse(this.formData.objectSchema);
			for (const form_row of this.form) {
				for (const form_col of form_row.elements) {
					if (form_col.field.name == "Trường bảng") {
						this.headers = JSON.parse(
							form_col.field.configSchema.properties.Headers,
						);
					}
				}
			}
			console.log("2222");

			this.form = this.form.map((ele) => {
				if (ele.elements) {
					ele.elements = ele.elements.map((ele1) => {
						if (ele1.field.configModel.is_required)
							ele1.field.previewSchema.required =
								this.spreadObjectToArray(
									ele1.field.previewSchema.properties,
								);
						ele1.field.previewSchema.properties.title.readOnly = false;
						ele1.field.previewSchema.properties.title["x-options"] =
							{ ...this["x-options"] };

						ele1.field.previewSchema.properties.title = {
							...ele1.field.previewSchema.properties.title,
							...ele1.field.configModel,
						};

						return ele1;
					});
				}
				return ele;
			});
			console.log("this.form", this.form);
			this.objectToAdd();
		},
		async getAttachmentFileRequest() {
			for (let templateForm of this.request.templateForms) {
				let response;

				response = await globalService.getData_Async(
					administratorAPI.API_GetAllAttachmentFileByTemplateFormId(
						templateForm.id,
					),
				);
				if (!response || !response.state) {
					return [];
				}

				this.listAttachmentFlieByRequest.push(...response.data);
			}
			console.log(
				"this.request.listAttachmentFlieByRequest",
				this.listAttachmentFlieByRequest,
			);
		},
		clearRequestGroup() {
			this.requestType = null;
			this.form = null;
			this.requestTypes = [];
			this.request = null;
		},
		clearForm() {
			this.form = null;
			this.request = null;
		},
		async saveRequetsData() {
			await this.UpLoadFile();
			if (!this.request) return;

			let response;
			if (this.isSaving) {
				return;
			}

			this.m_requestDto.modified = { id: this.user_info.id };
			this.m_requestDto.modifiedName = new Date();
			this.m_requestDto.requestDataName = this.request.requestName;
			this.m_requestDto.requestDataCode = this.request.requestCode;
			this.m_requestDto.request = { id: this.request.id };

			try {
				this.m_requestDto.created = this.user_info;
				this.m_requestDto.createdName = this.user_info.fullName;
				this.m_requestDto.createdDate = new Date();
				this.m_requestDto.statusName = "Khởi tạo";
				this.m_requestDto.status = { id: 1 };
				this.m_requestDto.userInfos = this.listUserInfo;
				this.m_requestDto.requestGroupCode =
					this.request.requestGroup.requestGroupCode;
				this.m_requestDto.requestGroupName =
					this.request.requestGroup.requestGroupName;
				this.m_requestDto.rrequestTypeCode =
					this.request.requestType.requestTypeCode;
				this.m_requestDto.requestTypeName =
					this.request.requestType.requestTypeName;

				response = await globalService.postData_Async(
					administratorAPI.API_CreateRequestData(),
					this.m_requestDto,
				);
				console.log("this.request", response);

				if (!response || !response.state)
					return (this.isSaving = false);

				this.requestData = response;

				await this.saveProcessData();
				if (!this.processData) return (this.isSaving = false);

				await this.saveFormData();
				this.m_isSaved.state = 2;
				this.m_isSaved.idRequestData = this.requestData.data.id;
				this.m_isSaved.idProcessData = this.processData.id;
				console.log("1111");
				console.log("this.idStepData", this.idStepData);

				this.$emit("save2", Object.assign({}, this.m_isSaved));
				if (this.idStepData == 0) {
					console.log("vao idStepData");
					await this.getUserInStep();
					await this.saveStepData();
					this.toastSuccess(this.$t("message.add_success"));

					this.$router.push({
						path: `/phieu-yeu-cau`,
					});
				}
			} catch (error) {
				this.toastError(error);
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
			console.log("this.processData", this.processData);
		},
		async saveFormData() {
			this.formData["objectSchema"] = JSON.stringify(this.form);
			this.requestFormDataDto = this.formData;
			this.requestFormDataDto.id = null;
			// this.requestFormDataDto.option = this.form.option;
			// this.requestFormDataDto.formDataCode = this.form.formDataCode;
			// this.requestFormDataDto.formDateName = this.form.formDateName;
			// this.requestFormDataDto.objectSchema = this.form.objectSchema;
			// this.requestFormDataDto.objectModel = this.form.objectModel;
			// this.requestFormDataDto.createdName = this.form.createdName;
			// this.requestFormDataDto.createdDate = this.form.createdDate;
			// this.requestFormDataDto.modifiedName = this.form.modifiedName;
			// this.requestFormDataDto.modifiedDate = this.form.modifiedDate;
			// this.requestFormDataDto.isActive = this.form.isActive;
			// this.requestFormDataDto.isDelete = this.form.isDelete;
			// this.requestFormDataDto.tennantCode = this.form.tennantCode;
			// this.requestFormDataDto.tennantName = this.form.tennantName;
			// this.requestFormDataDto.created = {
			// 	id: this.form.created.id,
			// };
			// this.requestFormDataDto.modified = {
			// 	id: this.form.modified.id,
			// };

			this.requestFormDataDto.requestData = {
				id: this.requestData.data.id,
			};
			// this.requestFormDataDto.form = this.request.form;

			let response = await globalService.postData_Async(
				administratorAPI.API_CreateFormData(),
				this.requestFormDataDto,
			);
			if (!response || !response.state) {
				{
					return;
				}
			}

			console.log("requestFormDataDto", response);
		},
		async saveStepData() {
			console.log("this.stepInProcess", this.stepInProcess);
			for (let stepInProces of this.stepInProcess) {
				console.log("sâsâsááá");
				this.requestStepData.isActive = false;
				console.log("222");
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
				console.log("33");

				this.requestStepData.userInfos =
					stepInProces.userInStepDTOs.map((entry) => {
						return { id: entry.userInfo.id };
					});
				console.log("44");

				// let user = await this.getUserInStep(stepInProces.id);
				// let responseUser = await globalService.getData_Async(
				// 	administratorAPI.API_GetAllByStepInProcessId(
				// 		stepInProces.id,
				// 	),
				// );
				// if (!responseUser || !responseUser.state) {
				// 	this.toastError(responseUser.messgage);
				// 	return (this.requestStepData.userInfos = []);
				// }
				// responseUser.data.filter((entry) => {
				// 	this.requestStepData.userInfos.push({
				// 		id: entry.userInfo.id,
				// 	});
				// });
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
		async getUserInStep() {
			let response;
			for (let stepInProces of this.stepInProcess) {
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetSteepDataByIdStepInProcessId(
							stepInProces.id,
						),
					);

					if (!response || !response.state) {
						this.toastError(this.$t("error.load"));
					}
					stepInProces.userInStepDTOs = response.data;
					console.log("stepInProces", stepInProces);
				} catch (error) {
					this.toastError(error);
					return;
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.title {
	color: rgb(36, 50, 248);
}

.v-speed-dial {
	position: absolute;
}
.v-btn--floating {
	position: sticky;
}
</style>
