<template>
	<v-card elevation="0" v-if="m_requestDto">
		<v-dialog max-width="80vw" v-model="openFileRequestData" persistent>
			<FileRequestData
				@close="onClose"
				@save="onSaveFile"
			></FileRequestData>
		</v-dialog>
		<v-dialog
			max-width="40vw"
			v-model="openAttachmentFileRequestData"
			persistent
		>
			<AttachmentFileRequestData
				@close="onClose"
				:requestDataV2="m_requestDto"
				@save="onSaveFileAta"
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
		<v-dialog max-width="80vw" v-model="openViewAttachmentFile" persistent>
			<ViewAttachmentFile
				@close="onClose"
				@saveRelate="onSaveRelate"
				:attachmentFile="idView"
			></ViewAttachmentFile>
		</v-dialog>
		<v-row>
			<v-col md="8">
				<vue-perfect-scrollbar class="h-100">
					<v-list>
						<v-list-item>
							<v-row class="mt-4 my-4">
								<v-col cols="2">
									<span
										>{{
											$t("label.mail_template_subject")
										}}
										:</span
									>
								</v-col>
								<v-col cols="10" md="10">
									<span> {{ m_requestDto.title }} </span>
								</v-col>
								<v-col cols="2">
									<span>
										{{ $t("label.description") }} :
									</span>
								</v-col>
								<v-col cols="10" md="10">
									<span> {{ m_requestDto.description }}</span>
								</v-col>
							</v-row>
						</v-list-item>

						<v-card elevation="0" class="thongtin my-4 p-0">
							<v-list-group no-action sub-group :value="true">
								<template v-slot:activator>
									<v-list-item-title class="text-black">{{
										$t("label.information_form")
									}}</v-list-item-title>
									<v-btn
										text
										tile
										color="blue"
										@click="editUserInfosRequestData"
										class="float-right"
									>
										<v-icon color="blue"
											>mdi-content-save-all</v-icon
										>
									</v-btn>
								</template>
								<v-list-item class="bieumau p-0">
									<vue-perfect-scrollbar class="h-auto">
										<v-form ref="form" v-model="valid">
											<v-card>
												<v-row
													v-for="(
														row, rowIndex
													) in form"
													:key="'row_' + rowIndex"
													class="form-row"
												>
													<v-col
														class="p-0 m-0"
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
														<v-row class="m-0 p-0">
															<v-card
																elevation="0"
																class="m-0 p-0 col-12"
															>
																<v-card-text
																	v-if="
																		col.field &&
																		col
																			.field
																			.previewSchema
																	"
																	class="m-0 p-0"
																>
																	<v-jsf
																		v-model="
																			col
																				.field
																				.previewModel
																		"
																		:schema="
																			col
																				.field
																				.previewSchema
																		"
																		:options="
																			options
																		"
																		:key="
																			'col_' +
																			rowIndex +
																			'_' +
																			colIndex
																		"
																		class="m-0 p-0"
																	>
																		<v-data-table
																			v-if="
																				col
																					.field
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
																							New
																							row
																						</v-btn>
																					</template>
																				</v-dialog>
																			</template>
																		</v-data-table>
																		<v-file-input
																			v-if="
																				m_requestDto.status &&
																				m_requestDto
																					.status
																					.id ==
																					'2' &&
																				col
																					.field
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
									</vue-perfect-scrollbar>
								</v-list-item>
							</v-list-group>
						</v-card>

						<v-card elevation="0" class="thongtin my-4">
							<v-list-group no-action sub-group :value="true">
								<template v-slot:activator>
									<v-list-item-title class="text-black">{{
										$t("label.main_document")
									}}</v-list-item-title>
									<v-btn
										text
										tile
										color="blue"
										@click="editFileRequestData"
										class="float-right"
									>
										<v-icon color="blue"
											>mdi-plus-circle</v-icon
										>
									</v-btn>
								</template>
								<v-list-item class="p-0">
									<vue-perfect-scrollbar
										class="h-auto w-full"
									>
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
											class="table"
											hide-default-footer
										>
											<template
												v-for="header in headers.filter(
													(header) =>
														header.hasOwnProperty(
															'formatter',
														),
												)"
												v-slot:[`item.${header.value}`]="{
													headers,
													value,
												}"
											>
												{{ header.formatter(value) }}
											</template>
											<template
												v-slot:[`item.fileName`]="{
													item,
												}"
											>
												<td>
													<span>{{
														item.fileName
													}}</span>
													<v-menu offset-y>
														<template
															v-slot:activator="{
																on,
																attrs,
															}"
														>
															<v-btn
																icon
																v-bind="attrs"
																v-on="on"
															>
																<v-icon
																	>mdi-dots-vertical</v-icon
																>
															</v-btn>
														</template>
														<v-list>
															<v-list-item
																@click="
																	editViewAttachmentFile(
																		item,
																	)
																"
															>
																<v-list-item-icon>
																	<v-icon
																		color="green darken-2"
																	>
																		mdi-eye-circle
																	</v-icon>
																</v-list-item-icon>
																<v-list-item-title>
																	{{
																		$t(
																			"button.view",
																		)
																	}}
																</v-list-item-title>
															</v-list-item>

															<v-list-item
																v-if="
																	item.fileExtension ==
																		'docx' ||
																	item.fileExtension ==
																		'pptx' ||
																	item.fileExtension ==
																		'xlsx'
																"
																@click="
																	editAttachmentFile(
																		item,
																	)
																"
															>
																<v-list-item-icon>
																	<v-icon
																		color="blue darken-2"
																	>
																		mdi-pencil-circle
																	</v-icon>
																</v-list-item-icon>
																<v-list-item-title>
																	{{
																		$t(
																			"button.edit",
																		)
																	}}
																</v-list-item-title>
															</v-list-item>
															<v-list-item
																@click="
																	deleteAttachmentFile(
																		item,
																	)
																"
															>
																<v-list-item-icon>
																	<v-icon
																		color="red darken-2"
																	>
																		mdi-delete-circle
																	</v-icon>
																</v-list-item-icon>
																<v-list-item-title>
																	{{
																		$t(
																			"button.delete",
																		)
																	}}
																</v-list-item-title>
															</v-list-item>
														</v-list>
													</v-menu>
												</td>
											</template>
										</v-data-table>
									</vue-perfect-scrollbar>
								</v-list-item>
							</v-list-group>
						</v-card>
						<v-card elevation="0" class="thongtin my-4">
							<v-list-group no-action sub-group :value="true">
								<template v-slot:activator>
									<v-list-item-title class="text-black"
										>{{ $t("label.attachments") }}
									</v-list-item-title>
									<v-btn
										text
										tile
										color="blue"
										@click="editAttachmentFileRequestData"
										class="float-right"
									>
										<v-icon color="blue"
											>mdi-plus-circle</v-icon
										>
									</v-btn>
								</template>
								<v-list-item>
									<vue-perfect-scrollbar
										class="h-auto w-full"
									>
										<v-data-table
											v-model="selected"
											:headers="headerss"
											:items="
												listAttachmentFlieByRequests
											"
											:single-select="singleSelect"
											item-key="id"
											show-select
											:search="search"
											loading="true"
											class="table"
											hide-default-footer
										>
											<template
												v-for="header in headerss.filter(
													(header) =>
														header.hasOwnProperty(
															'formatter',
														),
												)"
												v-slot:[`item.${header.value}`]="{
													headerss,
													value,
												}"
											>
												{{ header.formatter(value) }}
											</template>
										</v-data-table>
									</vue-perfect-scrollbar>
								</v-list-item>
							</v-list-group>
						</v-card>
					</v-list>
				</vue-perfect-scrollbar>
			</v-col>
			<v-col md="4">
				<v-card class="h-3/5 test">
					<v-card elevation="0">
						<v-timeline
							align-top
							dense
							v-for="(steep, index) of requestdataProcessHis"
							:key="index"
						>
							<v-timeline-item
								small
								fill-dot
								left
								color="green darken-5"
							>
								<v-btn
									color="green lighten-1"
									dark
									class="rounded-pill"
								>
									<v-icon>mdi-pencil</v-icon>

									{{ steep.status }}
								</v-btn>
								<v-card
									elevation="0"
									class="grey lighten-3 rounded-md my-4"
								>
									<span>{{ steep.processer.fullName }}</span>
									<v-card-text>{{
										steep.status
									}}</v-card-text>
								</v-card>
								<v-card-text>
									{{
										moment(steep.createDate).format(
											dateFormat,
										)
									}}
								</v-card-text>

								<!-- <v-card-title class="text-white d-flex">
										<div>
											<span
												class="
													text-h6 text-white
													rounded-pill
													green
													lighten-2
													px-10
													py-2
												"
											>
												{{ steep.status }}
											</span>
										</div>
									</v-card-title> -->
							</v-timeline-item>
						</v-timeline>
					</v-card>

					<div>
						<v-divider></v-divider>
						<v-card elevation="0">
							<v-row>
								<v-col cols="10">
									<v-card-title
										>Phiếu yêu cầu liên quan :
									</v-card-title>
								</v-col>
								<v-col cols="2">
									<v-btn
										text
										tile
										color="blue"
										@click="editRelateRequestData"
										class="float-right mt-2"
									>
										<v-icon color="blue"
											>mdi-plus-circle</v-icon
										>
									</v-btn>
								</v-col>
							</v-row>
						</v-card>
						<v-divider></v-divider>

						<div
							v-for="(
								relate, index
							) of m_requestDto.requestDataList"
							:key="index"
						>
							<!-- <span v-if="relate" class="pl-4 mx-2">{{
							relate.title
						}}</span> -->
							<v-btn
								class="mx-2 my-0"
								text
								color="blue"
								rounded-pill
								depressed
							>
								{{ relate.title }}
							</v-btn>
							<v-menu offset-y>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon v-bind="attrs" v-on="on">
										<v-icon>mdi-dots-vertical</v-icon>
									</v-btn>
								</template>
								<v-list>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="green darken-2">
												mdi-eye-circle
											</v-icon>
										</v-list-item-icon>
										<v-list-item-title>
											{{ $t("button.view") }}
										</v-list-item-title>
									</v-list-item>

									<v-list-item
										@click="editrequestDataList(relate.id)"
									>
										<v-list-item-icon>
											<v-icon color="blue darken-2">
												mdi-pencil-circle
											</v-icon>
										</v-list-item-icon>
										<v-list-item-title>
											{{ $t("button.edit") }}
										</v-list-item-title>
									</v-list-item>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="red darken-2">
												mdi-delete-circle
											</v-icon>
										</v-list-item-icon>
										<v-list-item-title>
											{{ $t("button.delete") }}
										</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
							<v-divider></v-divider>
						</div>
						<v-divider></v-divider>
						<v-card elevation="0">
							<v-row>
								<v-col cols="10">
									<v-card-title> Chia sẻ với : </v-card-title>
								</v-col>
								<v-col cols="2">
									<v-btn
										text
										tile
										color="blue"
										@click="editUserInfosRequestData"
										class="float-right mt-2"
									>
										<v-icon color="blue"
											>mdi-plus-circle</v-icon
										>
									</v-btn>
								</v-col>
							</v-row>
						</v-card>
						<v-divider></v-divider>

						<v-combobox
							v-if="m_requestDto.userInfos.length"
							v-model="m_requestDto.userInfos"
							chips
							dense
							multiple
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
						<div
							v-for="(user, index) of m_requestDto.userInfos"
							:key="index"
						>
							<!-- <v-btn
								class="mx-2 my-0"
								text
								color="black"
								rounded-pill
								depressed
							>
								{{ user.fullName }}
							</v-btn> -->
							<v-chip-group
								mandatory
								active-class="primary--text"
							>
								<v-chip v-for="tag in tags" :key="tag">
									{{ user.fullName }}
								</v-chip>
							</v-chip-group>
						</div>
					</div>

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
import ViewAttachmentFile from "./ViewAttachmentFile.vue";

export default {
	name: "VSMFEDeclarationV3",
	props: { requestDataV2: {}, isSaved: {} },
	components: {
		VJsf,
		FileRequestData,
		UserInfosRequestData,
		RelateRequestData,
		AttachmentFileRequestData,
		ViewAttachmentFile,
	},
	data() {
		return {
			listAttachmentFlieByRequests: [],
			moment: moment,
			listUserReqdataProcessHis: {},
			requestdataProcessHis: null,
			idView: null,
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
			openViewAttachmentFile: false,
			items: [],
			search: "",
			singleSelect: false,
			selected: [],
			dateFormat: "DD/MM/yyyy h:mm",
			listRequestData: [],
			headers: [
				{
					text: "Tên file ",
					value: "fileName",
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
					value: "templateForm.templateFormName",

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
					value: "templateForm.createdName",

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
					value: "fileExtension",

					filter: (value) => {
						if (!this.fileExtension) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.fileExtension,
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
			//  this.FormData();

			// this.initialize();
		},

		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state == 1) {
				console.log("this.m_isSaved.state", this.m_isSaved.state);

				console.log("Lưu lần 1");
				await this.saveFormData();
			}
			// if (this.m_isSaved.state == 2) {
			// 	console.log("trình phê duyệt");
			// 	await this.Approve();
			// }
		},
	},
	async created() {
		this.m_requestDto = this.requestDataV2;
		this.m_isSaved = this.isSaved;
		await this.FormData();
	},
	mounted() {
		this.initialize();
	},

	methods: {
		onSave(value) {
			this.m_requestDto.userInfos = value;
		},
		onSaveRelate(value) {
			this.m_requestDto.requestDataList = value;
		},
		onSaveFile(value) {
			this.listFile = value;
			console.log("this.listFile", this.listFile);
			for (let file of this.listFile) {
				this.listTemplateForm.push(...file.attachmentFileDTOS);
			}
			console.log("this.listTemplateForm", this.listTemplateForm);
		},
		onSaveFileAta(value) {
			console.log("value", value);
			this.listAttachmentFlieByRequests.push(...value);
			console.log(
				"this.listAttachmentFlieByRequests",
				this.listAttachmentFlieByRequests,
			);
		},
		async initialize() {
			//await this._request();
			await this.getAllRequestData();
			await this.getAttachmentFileRequestV2();
			await this.getAttachmentFileRequest();
			await this.getReqdataProcessHis();

			//await this.getAllTemplateForm();
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
		async GetAllUserReqdataProcessHis() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfos(),
				);
				if (!response || !response.state) {
					return [];
				}
				let allUser = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				allUser.forEach((entry) => {
					this.$set(this.listUserReqdataProcessHis, entry.id, entry);
				});
				console.log(
					"this.listUserReqdataProcessHis",
					this.listUserReqdataProcessHis,
				);
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
		async deleteAttachmentFile(item) {
			let response;
			this.idView = item.id;

			try {
				response = await globalService.deleteData_Async(
					administratorAPI.API_DeleteAttachmentFile(this.idView),
				);
				if (!response || !response.state) {
					return [];
				}
				this.toastSuccess(this.$t("message.delete_success"));
				await this.getAttachmentFileRequestV2();

				// this.listUserInfos = response.data.filter((entry) => {
				// 	return !entry.isDelete && entry.isActive;
				// });
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		editRelateRequestData() {
			this.openRelateRequestData = true;
		},
		editViewAttachmentFile(item) {
			this.openViewAttachmentFile = true;
			this.idView = item.id;
			console.log("this.idView", this.idView);
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
				this.openViewAttachmentFile = false;
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
				console.log("this.listRequestData", this.listRequestData);
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
			console.log("response.data", response.data);

			this.listAttachmentFlieByRequest.push(...response.data);

			console.log(
				"this.listAttachmentFlieByRequest",
				this.listAttachmentFlieByRequest,
			);
		},
		async getAttachmentFileRequestV2() {
			let response;

			response = await globalService.getData_Async(
				administratorAPI.API_GetAllAttachmentFileByRequestDataId(
					this.m_requestDto.id,
				),
			);
			if (!response || !response.state) {
				return [];
			}
			console.log("response.data", response.data);

			this.listTemplateForm.push(
				...response.data.filter((ele) => ele.templateForm),
			);
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
				console.log("this.listTemplateForm", this.listTemplateForm);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async saveFormData() {
			//if (!this.$refs.form.validate()) return;
			if (this.form.length > 0) {
				this.formData["objectSchema"] = JSON.stringify(this.form);
			}
			this.requestFormDataDto = this.formData;

			let response;
			this.requestFormDataDto.isActive = this.formData.isActive;

			response = await globalService.putData_Async(
				administratorAPI.API_UpdateFormData(this.requestFormDataDto.id),
				this.requestFormDataDto,
			);
			if (!response || !response.state) {
				this.toastError(this.$t("error.load"));
			}
			let request;
			this.m_requestDto.status = { id: 2 };

			this.m_requestDto.createdDate = this.m_requestDto.modifiedDate;
			request = await globalService.putData_Async(
				administratorAPI.API_UpdateRequestData(this.m_requestDto.id),
				this.m_requestDto,
			);
			if (!request || !request.state) {
				this.toastError(this.$t("error.load"));
			}
			this.toastSuccess(this.$t("message.update_success"));
			this.$router.push({
				path: `/phieu-yeu-cau`,
			});
		},
		async save() {
			if (this.m_requestDto.status.id == 1) {
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
				this.m_requestDto.status = { id: 2 };

				this.m_requestDto.createdDate = this.m_requestDto.modifiedDate;
				request = await globalService.putData_Async(
					administratorAPI.API_UpdateRequestData(
						this.m_requestDto.id,
					),
					this.m_requestDto,
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
				this.m_requestDto.status = { id: 2 };

				this.m_requestDto.createdDate = this.m_requestDto.modifiedDate;
				request = await globalService.putData_Async(
					administratorAPI.API_UpdateRequestData(
						this.m_requestDto.id,
					),
					this.m_requestDto,
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
		editAttachmentFile(item) {
			window.open(item.ofice365Path, "_blank");
		},
		async getReqdataProcessHis() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetReqdataProcessHisByID(
						this.m_requestDto.id,
					),
				);
				if (!response || !response.state) {
					return;
				}
				this.requestdataProcessHis = response.data;
				console.log(
					"this.requestdataProcessHis",
					this.requestdataProcessHis,
				);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async editrequestDataList(item) {
			this.$router.push({
				path: `/phieu-yeu-cau/${item}/chi-tiet`,
			});
			this.FormData();
			this.initialize();
			this.getReqdataProcessHis();
		},
	},
};
</script>

<style lang="scss" scoped>
.bieumau {
	display: block;
	padding: 0 !important;
}

.table {
	width: 100% !important;
}
.v-list-item {
	padding: 0 !important;
}

.v-list-item-title:hover {
	background: yellow !important;
}
.v-card__text {
	padding: 0 !important;
	margin: 0 !important;
}
.v-sheet {
	padding: 10px !important;
}
.userInfo {
	border-radius: 0px;
}
.test {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.thongtin {
	padding: 0 !important;
	border: 1px solid rgb(214 211 209);
	// background-color: rgb(231 229 228);
	background-color: #eeeeee;
}
</style>
