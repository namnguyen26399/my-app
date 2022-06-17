<template>
	<v-card elevation="0">
		<v-dialog max-width="60vw" v-model="editRefuseRequestForm" persistent>
			<RefuseRequestForm
				@close="onClose"
				:requestData="m_requestDataDto"
			></RefuseRequestForm>
		</v-dialog>
		<v-dialog max-width="60vw" v-model="openApproveRequestForm" persistent>
			<ApproveRequestForm
				@close="onClose"
				:requestData="m_requestDataDto"
			></ApproveRequestForm>
		</v-dialog>
		<v-dialog max-width="60vw" v-model="openExaminRequestForm2" persistent>
			<ExamineRequestForm
				@close="onClose"
				:requestStepData="m_requestStepDataList"
				:requestData="m_requestDataDto"
			></ExamineRequestForm>
		</v-dialog>
		<v-dialog max-width="60vw" v-model="editModifyRequestForm" persistent>
			<ModifyRequestForm
				@close="onClose"
				:requestData="m_requestDataDto"
			></ModifyRequestForm>
		</v-dialog>
		<v-dialog
			max-width="60vw"
			v-model="editRequestModifyRequestForm"
			persistent
		>
			<RequestModifyRequestForm
				:requestData="m_requestDataDto"
				@close="onClose"
			></RequestModifyRequestForm>
		</v-dialog>
		<v-dialog
			max-width="60vw"
			v-model="editRequestExamineRequestForm"
			persistent
		>
			<RequestExamineRequestForm
				:requestData="m_requestDataDto"
				@close="onClose"
			></RequestExamineRequestForm>
		</v-dialog>
		<v-dialog max-width="60vw" v-model="editViewAttachmentFile" persistent>
			<ViewAttachmentFile
				@close="onClose"
				:requestAttachmentFile="listAttachmentFile"
				:requestData="m_requestDataDto"
			></ViewAttachmentFile>
		</v-dialog>
		<v-dialog v-model="dialog.delete" width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
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
					<v-row class="mt-4">
						<v-col cols="12" md="12" class="px-10">
							<label> Biểu mẫu liên quan : </label>
							<v-file-input> </v-file-input>
						</v-col>
					</v-row>
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
												<v-file-input
													v-if="
														m_requestDataDto.status &&
														m_requestDataDto.status
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
																	class="text-red"
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
												</v-file-input>
												<!-- <v-file-input
													v-if="
														m_requestDataDto.status
															.id == '2' &&
														col.field.name ==
															'Trường tải lên file'
													"
													outlined
													dense
													accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
													@change="
														handleFileUpload($event)
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

				<!-- <v-row>
					<v-col class="flex justify-end"
						><v-btn
							color="blue darken-1"
							dark
							v-text="$t('button.save')"
							@click="save"
						></v-btn
					></v-col>
				</v-row> -->
			</v-col>
			<v-col md="4">
				<v-card>
					<v-card-title>
						<h4>Thông tin chung</h4>
					</v-card-title>
					<v-card-text>
						<v-col cols="12" v-if="m_requestDataDto.request">
							<v-text-field
								outlined
								dense
								readonly
								label="Số kí hiệu"
								v-model="m_requestDataDto.id"
								>{{
							}}</v-text-field>
						</v-col>
						<v-col
							cols="12"
							class="py-0"
							v-if="m_requestDataDto.status"
						>
							<v-text-field
								outlined
								dense
								readonly
								label="Trạng thái"
								v-model="m_requestDataDto.status.statusName"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="m_requestDataDto.request">
							<v-text-field
								outlined
								dense
								readonly
								label="Nhóm phiếu yêu cầu"
								v-model="
									m_requestDataDto.request.requestGroup
										.requestGroupName
								"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="m_requestDataDto.request">
							<v-text-field
								outlined
								dense
								readonly
								label="Loại phiếu yêu cầu"
								v-model="
									m_requestDataDto.request.requestType
										.requestTypeName
								"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="m_requestDataDto.created">
							<v-text-field
								outlined
								dense
								readonly
								label="Người tạo"
								v-model="m_requestDataDto.created.fullName"
							></v-text-field>
						</v-col>
						<v-col cols="12" v-if="m_requestDataDto.request">
							<v-text-field
								outlined
								dense
								readonly
								label="Ngày tạo"
								v-model="m_requestDataDto.createdDate"
							></v-text-field>
						</v-col>
					</v-card-text>
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
							v-model="m_requestDataDto.userInfos"
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
					<!-- <v-card-text style="height: 5rem">
						<v-speed-dial
							v-model="fabs"
							:left="true"
							:transition="transition"
						>
							<template v-slot:activator>
								<v-card-title>
									<v-btn color="primary" dark>
										<v-icon v-if="fabs"> mdi-close </v-icon>
										<v-icon v-else>mdi-menu</v-icon>
										Xử lý
									</v-btn>
								</v-card-title>
							</template>
							<v-card
								elevation="0"
								style="
									background-color: #fff;
									min-width: fit-content;
									left: 2em;
								"
							>
								<v-col>
									<v-card-text>
										<v-row class="py-4">
											<v-btn
												color="primary"
												dark
												@click="openExit()"
											>
												Hủy
											</v-btn>
										</v-row>
										<v-row class="py-4">
											<v-btn
												color="primary"
												dark
												@click="save()"
											>
												Lưu nháp
											</v-btn>
										</v-row>
										<v-row class="py-4">
											<v-btn
												color="primary"
												dark
												@click="openTrinhPhieu()"
											>
												Trình phiếu
											</v-btn>
										</v-row>
									</v-card-text>
								</v-col>
							</v-card>
						</v-speed-dial>
					</v-card-text> -->
					<!-- <v-divider></v-divider> -->
					<!-- <v-card-title>Quy trình xử lý </v-card-title>
					<v-card-text>
						<div
							v-for="(steep, index) of m_requestStepDataList"
							:key="index"
						>
							<v-card>
								<v-card-title>
									<h4>Bước {{ index + 1 }}: &nbsp;</h4>
									{{ steep.stepDataName }}
								</v-card-title>
								<v-card-text>
									<div class="d-flex">
										<h3 class="mt-2">Người xử lý :</h3>

										<div>
											<span
												v-for="(
													item, indexitem
												) of steep.userInfos"
												:key="indexitem"
											>
												<v-chip class="mt-2">
													<v-avatar
														color="indigo mr-2"
														size="30"
													>
														<span
															class="white--text"
															v-if="!item.avatar"
														>
															{{
																getAvatarText(
																	item.fullName,
																	2,
																)
															}}
														</span>
														<v-img
															v-if="item.avatar"
															:src="item.avatar"
														>
														</v-img>
													</v-avatar>
													<strong>{{
														item.fullName
													}}</strong>
												</v-chip>
											</span>
										</div>
									</div>
								</v-card-text>
								<v-card-text v-if="steep.processingTerm">
									<h3>
										Thời gian xử lý :
										{{ steep.processingTerm }}h
									</h3>
								</v-card-text>
							</v-card>
						</div>
					</v-card-text> -->
					<!-- <v-card-text
						style="height: 5rem"
						v-for="(steep, index) of m_requestStepDataList"
						:key="index"
					>
						<v-speed-dial
							v-model="fab"
							:top="top"
							:bottom="bottom"
							:right="right"
							:left="left"
							:direction="direction"
							:open-on-hover="hover"
							:transition="transition"
							v-if="steep.isActive"
						>
							<template v-slot:activator>
								<v-card-title>
									<v-btn color="primary" dark>
										<v-icon v-if="fab"> mdi-close </v-icon>
										<v-icon v-else>mdi-menu</v-icon>
										Thao Tác
									</v-btn>
								</v-card-title>
							</template>
							<v-card
								elevation="0"
								style="
									background-color: #fff;
									min-width: fit-content;
									left: 3em;
								"
							>
								<v-col>
									<v-card-text>
										<v-row class="py-4">
											<v-btn
												color="primary"
												dark
												@click="openEditRequestType()"
											>
												Từ chối
											</v-btn>
										</v-row>
										<v-row class="py-4">
											<v-btn
												color="primary"
												dark
												@click="
													OpenApproveRequestForm()
												"
											>
												Phê duyệt
											</v-btn>
										</v-row>
										<v-row class="py-4">
											<v-btn
												color="primary"
												dark
												@click="
													openRequestExamineRequestForm()
												"
											>
												Gửi thông tin soát xét
											</v-btn>
										</v-row>
										<v-row
											class="py-4"
											v-if="steep.isRequestModify"
										>
											<v-btn
												color="primary"
												dark
												@click="
													openRequestModifyRequestForm()
												"
											>
												Yêu cầu sủa đổi thông tin
											</v-btn>
										</v-row>
										<v-row class="py-4" v-if="steep.isEdit">
											<v-btn
												color="primary"
												dark
												@click="openModifyRequestForm()"
											>
												Yêu cầu sủa đổi thông tin
											</v-btn>
										</v-row>
										<v-row
											class="py-4"
											v-if="steep.isExamine"
										>
											<v-btn
												color="primary"
												dark
												@click="openExaminRequestForm()"
											>
												Yêu cầu soát xét
											</v-btn>
										</v-row>
									</v-card-text>
								</v-col>
							</v-card>
						</v-speed-dial>
					</v-card-text> -->
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
import RefuseRequestForm from "../modulepopup/RefuseRequestForm.vue";
import ApproveRequestForm from "./ApproveRequestForm.vue";
import ExamineRequestForm from "./ExamineRequestForm.vue";
import ModifyRequestForm from "./ModifyRequestForm.vue";
import RequestModifyRequestForm from "./RequestModifyRequestForm.vue";
import RequestExamineRequestForm from "./RequestExamineRequestForm.vue";
import ViewAttachmentFile from "./ViewAttachmentFile.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import ProcessDataDTO from "@/models/process-data.dto";
import RequestDataDto from "@/models/request-data.dto";

export default {
	name: "ViewRequestFormDeclarationVue",
	props: { requestDataDto: {}, requestStepDataList: [], isSaved: {} },
	components: {
		VJsf,
		RefuseRequestForm,
		ApproveRequestForm,
		ExamineRequestForm,
		ModifyRequestForm,
		RequestModifyRequestForm,
		RequestExamineRequestForm,
		ViewAttachmentFile,
		DeleteDialogVue,
	},
	watch: {
		async requestDataDto(newValue) {
			this.m_requestDataDto = newValue;
			//await this.FormData();
			await this.getFieldData();
			await this.getAttachmentFile();
			this.number = this.headers.length;
			//await this.getStepData();
			for (let i = 0; i < this.form.length; i++) {
				this.file.push([]);
				for (let j = 0; j < 3; j++) {
					this.file[i].push({});
				}
			}
		},
		requestStepDataList(value) {
			this.m_requestStepDataList = value;
		},
		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state) {
				if (this.m_requestDataDto.status.id == "1") {
					await this.UpLoadFile();
				}
				await this.save();
			}
		},
	},
	data: () => ({
		processDataDTO: ProcessDataDTO,
		m_requestDto: RequestDataDto,

		request: null,
		requestGroup: null,
		requestGroups: [],
		requestTypes: [],
		requestType: null,
		m_requestDataDto: null,
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
		listAttachmentFileByRequest: [],

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
	}),

	created() {
		this.m_requestDataDto = this.requestDataDto;

		this.m_requestStepDataList = this.requestStepDataList;

		this.m_isSaved = this.isSaved;
	},
	mounted() {
		this.m_requestDataDto = this.requestDataDto;
		this.initialize();
	},

	methods: {
		async initialize() {
			await this._requestGroups();

			//await this._request();
			await this.GetAllUser();
		},
		async handleRequestTypes(event) {
			this.requestType = event;
			if (this.requestType.id && this.requestGroup.id) {
				await this._request();
				await this.getStepInProcesses();
				await this.getFieldInForm();
				await this.getForm();

				await this.getAttachmentFileRequest();
			}
			if (this.requestType === null) {
				console.log("handleRequestTypes");
				return;
			}

			return;
		},
		async handleRequestGroup(event) {
			this.requestGroup = event;
			if (this.requestGroup === null) {
				console.log("handleRequestGroup");
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
					administratorAPI.API_GetFormDataById(
						this.m_requestDataDto.id,
					),
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
		async save() {
			if (this.m_requestDataDto.status.id == 1) {
				if (!this.$refs.form.validate()) return;
				if (this.form.length > 0) {
					this.formData["objectSchema"] = JSON.stringify(this.form);
				}
				this.requestFormDataDto = this.formData;

				let response;
				this.requestFormDataDto.isActive = this.formData.isActive;
				response = await globalService.putData_Async(
					administratorAPI.API_UpdateFormData(
						this.requestFormDataDto.id,
					),
					this.requestFormDataDto,
				);
				this.requestFormDataDto = response;
				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}
				let request;
				this.m_requestDataDto.status = { id: 2 };

				this.m_requestDataDto.createdDate =
					this.m_requestDataDto.modifiedDate;
				request = await globalService.putData_Async(
					administratorAPI.API_UpdateRequestData(
						this.m_requestDataDto.id,
					),
					this.m_requestDataDto,
				);
				if (!request || !request.state) {
					this.toastError(this.$t("error.load"));
				}
				this.toastSuccess(this.$t("message.add_success"));
				this.$router.push({
					path: `/phieu-yeu-cau`,
				});
			} else {
				await this.UpLoadFile2();
				if (!this.$refs.form.validate()) return;
				if (this.form.length > 0) {
					this.formData["objectSchema"] = JSON.stringify(this.form);
				}
				this.requestFormDataDto = this.formData;

				let response;
				this.requestFormDataDto.isActive = this.formData.isActive;
				response = await globalService.putData_Async(
					administratorAPI.API_UpdateFormData(
						this.requestFormDataDto.id,
					),
					this.requestFormDataDto,
				);
				this.requestFormDataDto = response;
				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}
				let request;
				this.m_requestDataDto.status = { id: 2 };

				this.m_requestDataDto.createdDate =
					this.m_requestDataDto.modifiedDate;
				request = await globalService.putData_Async(
					administratorAPI.API_UpdateRequestData(
						this.m_requestDataDto.id,
					),
					this.m_requestDataDto,
				);
				if (!request || !request.state) {
					this.toastError(this.$t("error.load"));
				}

				this.toastSuccess(this.$t("message.update_success"));

				this.$router.push({
					path: `/phieu-yeu-cau`,
				});
			}
		},

		async getFieldData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetFieldDataByIdRequest(
						this.m_requestDataDto.id,
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
						this.m_requestDataDto.id,
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
						this.m_requestDataDto.id,
					),
				);
				if (!response || !response.state) {
					return [];
				}

				this.listAttachmentFile = response.data;
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
		async openTrinhPhieu() {
			if (!this.$refs.form.validate()) return;

			this.formData.objectSchema = JSON.stringify(this.form);
			this.requestFormDataDto = this.formData;

			let response;
			this.requestFormDataDto.isActive = this.formData.isActive;
			response = await globalService.putData_Async(
				administratorAPI.API_UpdateFormData(this.requestFormDataDto.id),
				this.requestFormDataDto,
			);
			this.requestFormDataDto = response;
			if (!response || !response.state) {
				this.toastError(this.$t("error.load"));
			}
			let request;
			this.m_requestDataDto.status = { id: 2 };

			this.m_requestDataDto.createdDate =
				this.m_requestDataDto.modifiedDate;
			request = await globalService.putData_Async(
				administratorAPI.API_UpdateRequestData(
					this.m_requestDataDto.id,
				),
				this.m_requestDataDto,
			);
			await this.GetStepData();
			if (!request || !request.state) {
				this.toastError(this.$t("error.load"));
			}

			this.$router.push({
				path: `/phieu-yeu-cau`,
			});
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
			this.m_requestDataDto.userInfos.splice(
				this.m_requestDataDto.userInfos.indexOf(item),
				1,
			);
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

				// attachmentFileCreater.created = this.getUserInfo();
				// attachmentFileCreater.requestData = {
				// 	id: this.m_requestDataDto.id,
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
			attachmentFileDto.requestData = { id: this.m_requestDataDto.id };
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
					administratorAPI.API_FindFieldInForm(this.form.id),
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
		async getForm() {
			this.formData = this.request.form;

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
			this.objectToAdd();
		},
		async getAttachmentFileRequest() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllAttachmentFileByTemplateFormId(
						this.request.templateForms[0].id,
					),
				);
				if (!response || !response.state) {
					return [];
				}

				this.listAttachmentFlieByRequest = response.data[0];
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		clearRequestGroup() {
			this.requestType = null;
			this.form = null;
			this.requestTypes = [];
		},
		clearForm() {
			this.form = null;
		},
		async saveRequetsData() {
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
				await this.saveStepData();
				await this.saveFieldData();

				this.toastSuccess(this.$t("message.add_success"));
				this.$router.push({
					path: `/phieu-yeu-cau`,
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
			this.requestFormDataDto.option = this.form.option;
			this.requestFormDataDto.formDataCode = this.form.formDataCode;
			this.requestFormDataDto.formDateName = this.form.formDateName;
			this.requestFormDataDto.objectSchema = this.form.objectSchema;
			this.requestFormDataDto.objectModel = this.form.objectModel;
			this.requestFormDataDto.createdName = this.form.createdName;
			this.requestFormDataDto.createdDate = this.form.createdDate;
			this.requestFormDataDto.modifiedName = this.form.modifiedName;
			this.requestFormDataDto.modifiedDate = this.form.modifiedDate;
			this.requestFormDataDto.isActive = this.form.isActive;
			this.requestFormDataDto.isDelete = this.form.isDelete;
			this.requestFormDataDto.tennantCode = this.form.tennantCode;
			this.requestFormDataDto.tennantName = this.form.tennantName;
			this.requestFormDataDto.created = {
				id: this.form.created.id,
			};
			this.requestFormDataDto.modified = {
				id: this.form.modified.id,
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
