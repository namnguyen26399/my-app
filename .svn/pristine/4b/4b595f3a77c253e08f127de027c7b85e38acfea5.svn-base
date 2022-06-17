<template>
	<v-card elevation="0" v-if="m_requestDto">
		<v-dialog max-width="80vw" v-model="openFileRequestData" persistent>
			<FileRequestData
				@close="onClose"
				@save="onSaveFile"
			></FileRequestData>
		</v-dialog>
		<v-dialog
			max-width="80vw"
			v-model="openAttachmentFileRequestData"
			persistent
		>
			<AttachmentFileRequestData
				@close="onClose"
			></AttachmentFileRequestData>
		</v-dialog>
		<v-dialog
			max-width="60vw"
			v-model="openUserInfosRequestData"
			persistent
		>
			<UserInfosRequestData
				@save="onSave"
				@close="onClose"
			></UserInfosRequestData>
		</v-dialog>
		<v-dialog max-width="80vw" v-model="openRelateRequestData" persistent>
			<RelateRequestData
				@close="onClose"
				@saveRelate="onSaveRelate"
			></RelateRequestData>
		</v-dialog>
		<v-row>
			<v-col md="8">
				<v-list>
					<v-list-item>
						<v-row class="mt-4 my-4">
							<v-col cols="4" class="px-10">
								<span>Tiêu đề :</span>
							</v-col>
							<v-col cols="8" md="8">
								<span> {{ m_requestDto.title }} </span>
							</v-col>
							<v-col cols="4" class="px-10">
								<span> Mô tả : </span>
							</v-col>
							<v-col cols="8" md="8">
								<span> {{ m_requestDto.description }}</span>
							</v-col>
						</v-row>
					</v-list-item>
					<v-list-group no-action sub-group>
						<template v-slot:activator>
							<v-list-item-title
								>Biểu mẫu thông tin</v-list-item-title
							>
						</template>
						<v-list-item class="block">
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
											v-for="(
												col, colIndex
											) in row.elements"
											:key="
												'col_' +
												rowIndex +
												'_' +
												colIndex
											"
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
															col.field
																.previewSchema
														"
													>
														<v-jsf
															v-model="
																col.field
																	.previewModel
															"
															:schema="
																col.field
																	.previewSchema
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
																	col.field
																		.name ==
																	'Trường bảng'
																"
																:items="
																	selected
																"
																dense
																:headers="
																	headers
																"
																:items-per-page="
																	5
																"
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
																			editItem(
																				item,
																			)
																		"
																	>
																		mdi-pencil
																	</v-icon>
																	<v-icon
																		small
																		@click="
																			deleteItem(
																				item,
																			)
																		"
																	>
																		mdi-delete
																	</v-icon>
																</template>
																<template
																	v-slot:top
																>
																	<div
																		class="d-flex"
																	>
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
																</template>
															</v-data-table>
															<v-file-input
																v-if="
																	m_requestDto.status &&
																	m_requestDto
																		.status
																		.id ==
																		'2' &&
																	col.field
																		.name ==
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
																		col
																			.field
																			.attachmentInfo
																			.id
																	]
																"
															>
																<template
																	v-slot:label
																>
																	<div>
																		<p
																			v-if="
																				col
																					.field
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
																				col
																					.field
																					.attachmentInfo
																					.fileName
																			}}
																		</p>
																		<p
																			v-else
																		>
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
														</v-jsf>
													</v-card-text>
												</v-card>
											</v-row>
										</v-col>
									</v-row>
								</v-card>
							</v-form>
						</v-list-item>
					</v-list-group>
					<v-list-group no-action sub-group>
						<template v-slot:activator>
							<v-list-item-title
								>Tài liệu chính</v-list-item-title
							>
						</template>
						<v-list-item>
							<v-data-table
								v-model="selected"
								:headers="headers"
								:items="listTemplateForm"
								:single-select="singleSelect"
								item-key="id"
								show-select
								:search="search"
								loading="true"
								:loading-text="$t('label.loading')"
							>
								<template
									v-for="header in headers.filter((header) =>
										header.hasOwnProperty('formatter'),
									)"
									v-slot:[`item.${header.value}`]="{
										headers,
										value,
									}"
								>
									{{ header.formatter(value) }}
								</template>
							</v-data-table>
						</v-list-item>
					</v-list-group>
					<v-list-group no-action sub-group>
						<template v-slot:activator>
							<v-list-item-title
								>Tài liệu đính kèm<menu></menu
							></v-list-item-title>
						</template>
						<v-data-table
							v-model="selected"
							:headers="headerss"
							:items="listAttachmentFlieByRequest"
							:single-select="singleSelect"
							item-key="id"
							show-select
							:search="search"
							loading="true"
							:loading-text="$t('label.loading')"
						>
							<template
								v-for="header in headerss.filter((header) =>
									header.hasOwnProperty('formatter'),
								)"
								v-slot:[`item.${header.value}`]="{
									headerss,
									value,
								}"
							>
								{{ header.formatter(value) }}
							</template>
						</v-data-table>
					</v-list-group>
				</v-list>
			</v-col>
			<v-col md="4">
				<v-card>
					<v-card-title>
						<h4>Lịch sử</h4>
					</v-card-title>

					<v-divider></v-divider>
					<v-card-title class="w-full">
						Phiếu yêu cầu liên quan
					</v-card-title>
					<div
						v-for="(relate, index) of m_requestDto.requestDataList"
						:key="index"
					>
						<!-- <span v-if="relate" class="pl-4 mx-2">{{
							relate.title
						}}</span> -->
						<v-btn class="ma-2 border-0" outlined color="indigo">
							{{ relate.title }}
						</v-btn>
					</div>
					<v-divider></v-divider>
					<v-card-title class="w-full">
						<v-list disabled>
							Chia sẻ với:
							<v-list-item-group v-if="m_requestDto.userInfos">
								<v-list-item
									v-for="(item, i) in m_requestDto.userInfos"
									:key="i"
								>
									<v-list-item-content>
										<v-list-item-title>
											<span class="pr-2">
												{{ item.fullName }}
											</span>
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card-title>
					<!-- <v-card-text>
						<v-combobox
							v-model="m_requestDto"
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
					</v-card-text> -->

					<!-- <v-divider></v-divider>
					<v-card-title>Chia sẻ với</v-card-title>
					<v-card-text>
						<v-combobox
							v-model="m_requestDto.userInfos"
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
import FileRequestData from "./FileRequestData.vue";
import UserInfosRequestData from "./UserInfosRequestData.vue";
import RelateRequestData from "./RelateRequestData.vue";
import moment from "moment";
import RequestFormDataDto from "@/models/form-data.dto";
import AttachmentFileRequestData from "./AttachmentFileRequestData.vue";

export default {
	name: "VSMFEDeclarationV3",
	props: { requestDataV2: {}, isSaved: {} },
	components: {
		VJsf,
		FileRequestData,
		UserInfosRequestData,
		RelateRequestData,
		AttachmentFileRequestData,
	},
	data() {
		return {
			listTemplateForm: [],

			m_isSaved: {},

			m_requestDto: null,
			listAttachmentFlieByRequest: [],
			listUserInfos: [],
			form: [],
			options: {
				fieldProps: {
					outlined: "outlined",
					dense: "dense",
				},
			},
			formData: null,
			file: [],
			"x-options": {
				messages: {
					pattern: "Sai định dạng",
					required: "Đây là trường bắt buộc.",
					maxLength: "Lớn hơn maxLength",
					minLength: "Nhỏ hơn minLength",
				},
			},
			openFileRequestData: false,
			openAttachmentFileRequestData: false,
			openUserInfosRequestData: false,
			openRelateRequestData: false,
			items: [],
			search: "",
			singleSelect: false,
			selected: [],
			dateFormat: "DD/MM/yyyy h:mm",
			listRequestData: [],
			headers: [
				{
					text: "Tên file ",
					value: "attachmentFileDTOS[0].fileName",
					sortable: false,

					filter: (value) => {
						if (!this.fileName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.fileName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Biểu mẫu",
					value: "templateFormName",

					filter: (value) => {
						if (!this.templateFormName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.templateFormName,
								).toLocaleUpperCase(),
							);
					},
				},

				{
					text: "Người cập nhật",
					value: "createdName",

					filter: (value) => {
						if (!this.createdName) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.createdName,
								).toLocaleUpperCase(),
							);
					},
				},

				{
					text: "Thời gian cập nhật",
					value: "createdDate",

					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.createdDate) return true;
						return value.includes(this.createdDate);
					},
				},
			],
			headerss: [
				{
					text: "Tên file",
					value: "fileName",
					filter: (value) => {
						if (!this.fileName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.fileName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Kiểu file",
					value: "fileTypeName",

					filter: (value) => {
						if (!this.fileTypeName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.fileTypeName,
								).toLocaleUpperCase(),
							);
					},
				},

				{
					text: "Ngày Tạo",
					value: "createdDate",

					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.createdDate) return true;
						return value.includes(this.createdDate);
					},
				},
			],
			listFile: [],
			requestFormDataDto: RequestFormDataDto,
		};
	},
	watch: {
		requestDataV2(newValue) {
			this.m_requestDto = newValue;
		},
		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state === 1) {
				await this.saveFormData();
			}
		},
	},
	async created() {
		this.m_requestDto = this.requestDataV2;
		await this.FormData();
	},
	mounted() {
		this.initialize();
	},

	methods: {
		onSave(value) {
			this.m_requestDto.userInfos = value;

			console.log("this.m_requestDto", this.m_requestDto);
		},
		onSaveRelate(value) {
			this.m_requestDto.requestDataList = value;
		},
		onSaveFile(value) {
			this.listFile = value;
			console.log("this.listFile", this.listFile);
		},
		// onSaveFile(value){
		// 	this.listFile=value;
		// },
		async initialize() {
			//await this._request();
			await this.getAllRequestData();
			await this.getAttachmentFileRequest();
			await this.getAllTemplateForm();
		},
		async FormData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetFormDataById(this.m_requestDto.id),
				);
				if (!response || !response.state) {
					return [];
				}

				let requests = response.data;
				console.log("this.formData", requests);
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
					// this.objectToAdd();
				}
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
				console.log("this.listUserInfos", this.listUserInfos);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},

		remove(item) {
			this.m_requestDto.userInfos.splice(
				this.m_requestDto.userInfos.indexOf(item),
				1,
			);
		},
		editRelateRequestData() {
			this.openRelateRequestData = true;
		},
		editUserInfosRequestData() {
			this.openUserInfosRequestData = true;
		},
		editAttachmentFileRequestData() {
			this.openAttachmentFileRequestData = true;
		},
		editFileRequestData() {
			this.openFileRequestData = true;
		},
		onClose(value) {
			if (value) {
				this.openRelateRequestData = false;
				this.openUserInfosRequestData = false;
				this.openAttachmentFileRequestData = false;
				this.openFileRequestData = false;
			}
		},
		async getAllRequestData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestData(),
				);

				// response = await globalService.getData_Async(
				// 	administratorAPI.API_GetAllByUserIdRequestData(
				// 		this.user_info.id,
				// 	),
				// );

				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}

				this.requestAll = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.listRequestData = Object.assign([], this.requestAll);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAttachmentFileRequest() {
			let response;

			response = await globalService.getData_Async(
				administratorAPI.API_GetAllAttachmentFileByRequestDataId(
					this.m_requestDto.id,
				),
			);
			if (!response || !response.state) {
				return [];
			}
			this.listAttachmentFlieByRequest.push(...response.data);
		},
		async getAllTemplateForm() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllTemplateForm(),
				);

				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}

				this.requestAll = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.listTemplateForm = Object.assign([], this.requestAll);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
