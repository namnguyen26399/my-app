<template>
	<v-card elevation="0">
		<div>
			<h2>{{ $t("title.create_process") }}</h2>
			<v-breadcrumbs :items="breadcrumb" divider=">"></v-breadcrumbs>
		</div>

		<v-snackbar v-model="snackbar" :timeout="1500" centered rounded dark>
			{{ $t("label.no_selected") }}
		</v-snackbar>
		<v-snackbar v-model="success" :timeout="1500" centered rounded dark>
			{{ $t("message.success") }}
		</v-snackbar>
		<v-snackbar v-model="error" :timeout="1500" centered rounded dark>
			{{ $t("message.error") }}
		</v-snackbar>
		<div style="display: flex">
			<v-col style="min-width: 20%">
				<v-card-title
					>{{ $t("label.stepInProcess_name") }}:
				</v-card-title>
				<v-card-text v-if="selectors.length == 0"
					>Không có bước thực hiện nào</v-card-text
				>
				<v-snackbar
					v-model="saved"
					:timeout="1500"
					centered
					rounded
					dark
				>
					Đã lưu
				</v-snackbar>
				<v-snackbar
					v-model="snackbar"
					:timeout="1500"
					centered
					rounded
					dark
				>
					{{ $t("label.no_selected") }}
				</v-snackbar>
				<v-snackbar
					v-model="success"
					:timeout="1500"
					centered
					rounded
					dark
				>
					{{ $t("message.success") }}
				</v-snackbar>
				<v-snackbar
					v-model="error"
					:timeout="1500"
					centered
					rounded
					dark
				>
					{{ $t("message.error") }}
				</v-snackbar>
				<v-card-text v-if="selectors.length > 0">
					<VuePerfectScrollbar class="scroll-area">
						<Container
							class="w-full"
							group-name="column"
							:get-child-payload="
								(itemIndex) =>
									getChildPayload_Selector(itemIndex)
							"
						>
							<Draggable
								class="bordered mb-3 rounded"
								v-for="(item, index) in selectors"
								:key="'selectors_' + index"
							>
								<div class="draggable-item">
									{{ item.data }}
								</div>
								<v-form v-model="valid">
									<template>
										<tr>
											<td>
												{{ item.schema.stepName }}
											</td>
										</tr>
									</template>
									<!-- <v-jsf
										v-model="item.model"
										:schema="schema"
									/> -->
								</v-form>
							</Draggable>
						</Container>
					</VuePerfectScrollbar>
				</v-card-text>
			</v-col>
			<v-divider vertical></v-divider>
			<v-col style="min-width: 50%">
				<v-card-title>{{ $t("label.detail_process") }}: </v-card-title>
				<v-card-text>
					<VuePerfectScrollbar class="scroll-area">
						<v-timeline dense>
							<v-timeline-item
								v-for="(items, index) in groups"
								:key="index"
								small
								fill-dot
							>
								<div
									class="bordered mb-5"
									@click="getById(items)"
								>
									<h4>Bước {{ index + 1 }}</h4>
									<Container
										ref="index"
										:data-index="index"
										group-name="column"
										:get-child-payload="
											(itemIndex) =>
												getChildPayload(itemIndex)
										"
										:should-accept-drop="
											(src, payload) =>
												getShouldAcceptDrop(index)
										"
										:should-animate-drop="
											(src, payload) =>
												getShouldAnimateDrop(index)
										"
										@drop="onDrop(index, $event, false)"
									>
										<v-form>
											<template>
												<v-row class="mx-0">
													<v-col>
														{{
															items.schema
																.stepInProcessName
														}}
													</v-col>
												</v-row>

												<v-row class="subtitle-1 mx-0">
													<v-col cols="2" md="2">
														{{
															$t(
																"label.organization",
															)
														}}
													</v-col>
													<v-col cols="1" md="1">
														<v-icon
															@click="
																showOrganize[
																	index
																] =
																	!showOrganize[
																		index
																	]
															"
														>
															mdi-bank
														</v-icon>
													</v-col>
													<v-col>
														<i>{{
															items.schema
																.organizationName
														}}</i>
													</v-col>
												</v-row>

												<v-row class="subtitle-1 mx-0">
													<v-col cols="2" md="2">
														{{ $t("label.rank") }}
													</v-col>
													<v-col>
														<i
															v-if="
																!!items.schema
																	.rank
															"
															>{{
																items.schema
																	.rank
																	.rankName
															}}</i
														>
													</v-col>
												</v-row>
												<v-row class="subtitle-1 mx-0">
													<v-col cols="2" md="2">
														Người xử lý:
													</v-col>
													<v-col>
														<v-chip-group
															v-if="
																!!(
																	groups[
																		index
																	].model
																		.handler &&
																	groups[
																		index
																	].model
																		.handler
																		.length
																)
															"
														>
															<v-chip
																v-for="item in groups[
																	index
																].model.handler"
																:key="item.id"
															>
																<v-avatar>
																	<v-img
																		src="/img/icons/vsm.jpg"
																	>
																	</v-img>
																</v-avatar>
																{{
																	item.fullName
																}}</v-chip
															>
														</v-chip-group>
													</v-col>
												</v-row>
											</template>
											<!-- <v-jsf
											v-model="item.model"
											:schema="item.schema"
										/> -->
										</v-form>
									</Container>
									<v-btn
										class="remove-row"
										fab
										dark
										x-small
										color="error"
										@click="removeRow(index)"
									>
										<v-icon dark> mdi-close </v-icon>
									</v-btn>
								</div>
							</v-timeline-item>
						</v-timeline>
					</VuePerfectScrollbar>
				</v-card-text>
				<v-footer color="white">
					<div class="controls">
						<v-btn color="blue darken-1" dark @click="addColumn">
							{{ $t("button.addStep") }}
						</v-btn>
						<v-btn
							color="error"
							class="ml-2"
							dark
							:disabled="this.groups.length == 0"
							@click="removeColumn"
						>
							{{ $t("button.removeStep") }}
						</v-btn>
					</div></v-footer
				>
			</v-col>
			<v-divider vertical></v-divider>

			<v-col style="min-width: 30%">
				<VuePerfectScrollbar class="scroll-area">
					<v-card>
						<v-container>
							<v-row>
								<v-text-field
									v-model="processes.processName"
									:label="this.$t('label.process_name')"
									:rules="processNameRequired"
									required
								></v-text-field>
							</v-row>
							<v-row>
								<v-text-field
									v-model="processes.description"
									:label="this.$t('label.description')"
								></v-text-field>
							</v-row>
							<v-row>
								<v-select
									v-model="processes.organizationName"
									:label="this.$t(`label.organization`)"
									clearable
									solo
								></v-select>
							</v-row>
						</v-container>
					</v-card>
					<v-card-title
						>{{ $t("label.detail_stepInProcess_name") }}:
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-text-field
									v-model="modelslt.stepInProcessName"
									:label="this.$t(`label.stepInProcess_name`)"
								></v-text-field
							></v-row>
							<v-row>
								<v-text-field
									v-model="modelslt.description"
									:label="this.$t(`label.description`)"
								></v-text-field
							></v-row>
							<!-- <v-row
							><v-checkbox
								v-model="modelslt.isActive"
								:label="this.$t(`label.is_active`)"
							></v-checkbox
						></v-row> -->
							<v-row>
								<v-checkbox
									v-model="modelslt.isEdit"
									label="Cho phép sửa đổi"
								></v-checkbox
							></v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isExamine"
									label="Cho phép yêu cầu soát xét"
								></v-checkbox
							></v-row>
							<v-row>
								<v-checkbox
									label="Cho phép xử lý yêu cầu thu hồi"
								></v-checkbox
							></v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isAuthorizedApproval"
									:label="
										this.$t(`label.is_authorized_approval`)
									"
								></v-checkbox
							></v-row>
							<v-row
								><v-checkbox
									v-model="modelslt.isRequiredSignature"
									:label="
										this.$t(`label.is_required_signature`)
									"
								></v-checkbox
							></v-row>
							<!-- <v-row>
							<v-checkbox label="Cho phép hủy"></v-checkbox
						></v-row> -->
							<v-row>
								<v-select
									v-model="modelslt.optionDeny"
									:items="filterItems"
									:item-text="(item) => item.value"
									:item-value="(item) => item.id"
									:label="$t('label.deny')"
									clearable
									solo
								></v-select>
							</v-row>
							<!-- <v-row>
							<v-checkbox
								v-model="modelslt.isBack"
								:label="this.$t(`label.is_back`)"
							></v-checkbox
						></v-row>
						 -->
							<v-row v-if="modelslt.optionDeny == 3">
								<v-select
									v-model="modelslt.optionDeny"
									:items="groups"
									:item-text="
										(item) => item.schema.stepInProcessName
									"
									:item-value="(item) => item.schema.id"
									:label="$t('label.to_step')"
									clearable
									solo
								></v-select>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.sendEmail"
									:label="$t('label.allow_send_email')"
								></v-checkbox
							></v-row>
							<v-row v-if="modelslt.sendEmail">
								<v-select
									:label="this.$t(`label.receiver_group`)"
									clearable
									solo
								></v-select>
							</v-row>
							<v-row>
								<v-checkbox
									:label="$t('label.required_tfs')"
								></v-checkbox
							></v-row>

							<!-- <v-row>
							<v-checkbox
								label="Yêu cầu cấu hình phần mềm thứ 3"
							></v-checkbox
						></v-row> -->
							<v-row>
								<v-select
									v-model="modelslt.organizationName"
									:label="this.$t(`label.organization`)"
									clearable
									solo
								></v-select>
							</v-row>

							<!-- <v-row>
							<v-text-field
								v-model="modelslt.vaitro"
								label="Vai trò"
							></v-text-field>
						</v-row> -->
							<v-row>
								<v-select
									v-model="modelslt.rank"
									:items="listRank"
									:item-text="(item) => item.rankName"
									:item-value="(item) => item"
									label="Vai trò"
									clearable
									solo
								></v-select>
							</v-row>
							<v-row>
								<template>
									<v-combobox
										v-model="
											groups[indexItems].model.handler
										"
										:items="NguoiXuLy"
										:item-text="(item) => item.fullName"
										chips
										clearable
										hide-selected
										:label="this.$t(`label.handler`)"
										multiple
										solo
									>
										<template
											v-slot:selection="{
												attrs,
												item,
												select,
												selected,
											}"
										>
											<v-chip
												v-bind="attrs"
												:input-value="selected"
												close
												@click="select"
												@click:close="remove(item)"
											>
												<v-avatar>
													<v-img
														src="/img/icons/vsm.jpg"
													></v-img>
												</v-avatar>
												<strong>{{
													item.fullName
												}}</strong>
											</v-chip>
										</template>
									</v-combobox>
								</template>
							</v-row>
						</v-container>
						<!-- <div v-for="(item, index) in selected" :key="index">
						<v-form>
							<v-jsf v-model="modelslt" :schema="item.schema" />
						</v-form>
					</div> -->
					</v-card-text>
					<v-footer color="white">
						<v-btn dark color="blue darken-1" @click="saveStep()">
							Cập nhật
						</v-btn>
					</v-footer>
				</VuePerfectScrollbar>
			</v-col>
		</div>
		<v-footer class="mt-2">
			<v-btn color="blue darken-1" dark @click="save">Lưu</v-btn>
			<router-link :to="'/list-process'" style="text-decoration: none">
				<v-list-item-title>
					<v-btn color="error" dark class="ml-2"> Hủy </v-btn>
				</v-list-item-title>
			</router-link>
		</v-footer>
		<v-spacer></v-spacer>
	</v-card>
</template>
<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag } from "@/utils/helpers";
import Vue from "vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import globalService from "@/services/global.service";

export default {
	name: "CreateProcess",
	components: {
		Container,
		Draggable,
		VuePerfectScrollbar,
		// VJsf,
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			filterItems: [
				{ id: 1, value: this.$t("label.deny_1") },
				{ id: 2, value: this.$t("label.deny_2") },
				{ id: 3, value: this.$t("label.deny_3") },
			],
			user_in_step: [],
			selected_select: {},
			UserInStep: {},
			NguoiXuLy: [],
			listRank: [],
			selected: [],
			searchNguoiXuLy: "",
			stepInProcess: [],
			deleteArray: [],
			processNameRequired: [(v) => !!v || this.$t("message.is_requỉed")],
			saved: false,
			indexItems: 0,
			dateFormat: "DD/MM/yyyy",
			processes: {},
			step_selected: [],
			senddata: [],
			snackbar: false,
			success: false,
			error: false,
			itemid: this.$route.params.id,
			breadcrumb: [],
			modelslt: {},
			valid: null,
			groups: [],
			selectors: [],
			flags: [],
			logs: {
				"get-child-payload": true,
				"should-accept-drop": false,
				"should-animate-drop": false,
				"drag-start": true,
				"drag-end": true,
				"drag-enter": true,
				"drag-leave": true,
				"drop-not-allowed": true,
				drop: true,
			},
			logPayload: true,
			loading: false,
		};
	},
	async created() {
		this.setBreadCrumb();
		if (!this.itemid) {
			this.addColumn();
		}
		await this.getAllStepInProcess();
		await this.getAllField();
		await this.getAllUser();
		await this.getAllRank();
	},
	watch: {
		selected() {
			this.searchNguoiXuLy = "";
		},
	},
	computed: {
		allSelected() {
			return this.selected.length === this.NguoiXuLy.length;
		},
		categories() {
			const search = this.searchNguoiXuLy.toLowerCase();

			if (!search) return this.NguoiXuLy;

			return this.NguoiXuLy.filter((item) => {
				const text = item.fullName.toLowerCase();

				return text.indexOf(search) > -1;
			});
		},
		selections() {
			const selections = [];
			for (const selection of this.groups[this.indexItems].model
				.handler) {
				selections.push(selection);
			}

			return selections;
		},
	},
	methods: {
		remove(item) {
			this.groups[this.indexItems].model.handler.splice(
				this.groups[this.indexItems].model.handler.indexOf(item),
				1,
			);
			this.groups[this.indexItems].model.handler = [
				...this.groups[this.indexItems].model.handler,
			];
		},

		async getAllRank() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/ranks",
				);
				if (!response || !response.state) {
					return;
				}
				this.listRank = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getAllUser() {
			try {
				let response = await globalService.getData_Async(
					"/api/user-infos",
				);
				if (!response || !response.state) {
					return;
				}
				this.NguoiXuLy = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getAllStepInProcess() {
			if (!this.itemid) return;
			let response = await globalService.getData_Async(
				`/api/process-infos/${this.itemid}/_all/step-in-processes`,
			);
			console.log(response);

			if (!response || !response.state) {
				return;
			}
			if (response.data.length > 0) {
				this.stepInProcess = response.data;
				this.groups = [];
				this.stepInProcess.forEach(async (stepinprocess, index) => {
					let response = await globalService.getData_Async(
						`/api/step-in-processes/${stepinprocess.id}/_all/user-in-steps`,
					);
					// this.addColumn();
					this.groups[index].model.handler = [];
					this.groups[index].model.handler = response.data;
					this.groups[index] = { model: {}, schema: stepinprocess };

					Vue.set(this.groups, index, this.groups[index]);
				});
			}
		},
		setBreadCrumb() {
			this.breadcrumb = [
				{
					text: "Home",
					disable: false,
					href: "/Home",
				},
				{
					text: this.$t(`title.list_of_process`),
					disable: false,
					href: "/list-process",
				},
				{
					text: this.$t(`title.create_process_step`),
					disable: true,
				},
			];
			// this.selected.push({
			// 	schema: {
			// 		type: "object",
			// 		properties: {
			// 			stepInProcessName: {
			// 				// readOnly: true,
			// 				type: "string",
			// 				title: "Bước thực hiện",
			// 				// enum: ["Khởi tạo", "Phê duyệt"],
			// 			},
			// 			isActive: {
			// 				type: "boolean",
			// 				// "x-display": "switch",
			// 				title: "Được sử dụng",
			// 			},
			// 			isRequiredSignature: {
			// 				type: "boolean",

			// 				title: "Yêu cầu ký điện tử",
			// 			},
			// 			isAuthorizedApproval: {
			// 				type: "boolean",

			// 				title: "Cho phép duyệt ủy quyền",
			// 			},
			// 			isBack: {
			// 				type: "boolean",

			// 				title: "Cho phép trả lại",
			// 			},
			// 			processingTerm: {
			// 				type: "number",
			// 				title: "Thời hạn xử lý",
			// 			},
			// 			description: {
			// 				type: "string",
			// 				title: "Mô tả",
			// 			},
			// 			donvixuly: {
			// 				type: "string",
			// 				title: "Đơn vị xử lý",
			// 				// enum: ["Dơn vị 1", "Đơn vị 2"],
			// 			},
			// 			vaitro: {
			// 				type: "string",
			// 				title: "Vai trò",
			// 				// enum: ["Khởi tạo", "Phê duyệt"],
			// 			},
			// 			handler: {
			// 				type: "array",
			// 				title: "Người xử lý",
			// 			},
			// 		},
			// 	},
			// });
		},
		async getAllField() {
			this.selectors = [];
			if (!this.itemid) {
				this.processes = {
					createdDate: null,
					createdId: null,
					createdName: "",
					description: "",
					id: null,
					isActive: true,
					isDelete: false,
					modifiedDate: null,
					organization: {},
					organizationCode: "",
					organizationName: "",
					modifiedId: null,
					modifiedName: "",
					numberRequest: 0,
					processCode: "",
					processName: "",
				};
			} else {
				let process = await globalService.getData_Async(
					"/api/process-infos/" + this.itemid,
				);
				if (!process.state) {
					this.processes = {
						createdDate: null,
						createdId: null,
						createdName: "",
						description: "",
						id: null,
						isActive: true,
						isDelete: false,
						organization: {},
						organizationCode: "",
						organizationName: "",
						modifiedDate: null,
						modifiedId: null,
						modifiedName: "",
						numberRequest: 0,
						processCode: "",
						processName: "",
					};
				} else {
					this.processes = {
						createdDate: process.data.createdDate,
						createdId: process.data.createdId,
						createdName: process.data.createdName,
						description: process.data.description,
						id: process.data.id,
						isActive: process.data.isActive,
						organization: {},
						organizationCode: "",
						organizationName: "",
						isDelete: process.data.isDelete,
						modifiedDate: process.data.modifiedDate,
						modifiedId: process.data.modifiedId,
						modifiedName: process.data.modifiedName,
						numberRequest: process.data.numberRequest,
						processCode: process.data.processCode,
						processName: process.data.processName,
					};
				}
			}

			this.modelslt = {
				createdDate: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isAuthorizedApproval: false,
				isBack: false,
				isEdit: false,
				optionDeny: 1,
				isExamine: false,
				sendEmail: false,
				isRequestModify: false,
				isRequiredSignature: false,
				modifiedDate: null,
				modifiedName: "",
				processInfo: {
					createdDate: null,
					createdName: "",
					description: "",
					id: null,
					isActive: false,
					isDelete: false,
					modifiedDate: null,
					modifiedName: "",
					numberRequest: 0,
					processCode: "",
					processName: "",
					tennantCode: "",
					tennantName: "",
				},
				processingActiveTime: "",
				processingTerm: 0,
				processingTermTime: null,
				step: {
					createdDate: null,
					createdName: "",
					description: "",
					id: null,
					isActive: true,
					isDelete: false,
					modifiedDate: null,
					modifiedName: "",
					stepCode: "",
					stepName: "",
					tennantCode: "",
					tennantName: "",
				},
				stepInProcessCode: "",
				stepInProcessName: "",
				stepOrder: 0,
				tennantCode: "",
				tennantName: "",
				organization: {},
				organizationCode: "",
				organizationName: "",
				rank: {
					created: null,
					createdDate: null,
					createdName: "",
					id: null,
					isActive: true,
					modified: null,
					modifiedDate: null,
					modifiedName: "",
					rankCode: "",
					rankName: "",
					tennantCode: "",
					tennantName: "",
				},
			};
			this.UserInStep = {
				created: {},
				createdDate: new Date(),
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				modified: {},
				modifiedDate: new Date(),
				modifiedName: "",
				stepInProcess: {},
				tennantCode: "",
				tennantName: "",
				userInfos: [],
			};
			let response = await globalService.getData_Async("/api/_all/steps");
			if (response.state) {
				response.data
					.filter((entry) => {
						return entry.isDelete == false;
					})
					.forEach((ele) => {
						this.selectors.push({
							model: {},
							schema: ele,
						});
					});
			}
		},

		getChildPayload(itemIndex) {
			return this.groups[itemIndex];
		},
		getChildPayload_Selector(itemIndex) {
			return this.selectors[itemIndex];
		},
		getShouldAcceptDrop(index) {
			//this.log("should-accept-drop", sourceContainerOptions, payload);
			return this.flags[index]?.drop;
		},

		getShouldAnimateDrop(index) {
			//this.log("should-animate-drop", sourceContainerOptions, payload);
			return this.flags[index]?.animate;
		},

		onDrop(groupIndex, dropResult, isNoRemove) {
			if (dropResult.addedIndex == 0 || dropResult.addedIndex) {
				this.groups[groupIndex] = [];
			}
			let result = applyDrag(
				this.groups[groupIndex],
				dropResult,
				isNoRemove,
			);
			if (!result[0] || !result[0].schema) {
				return;
			}
			this.modelslt = {
				createdDate: new Date(),
				createdName: result[0].schema.createdName,
				description: result[0].schema.description,
				id: null,
				isActive: result[0].schema.isActive,
				isAuthorizedApproval: false,
				isBack: false,
				isEdit: false,
				optionDeny: 1,
				sendEmail: false,
				isExamine: false,
				isRequestModify: false,
				isRequiredSignature: false,
				modifiedDate: result[0].schema.modifiedDate,
				modifiedName: result[0].schema.modifiedName,
				processInfo: {
					createdDate: null,
					createdName: "",
					description: "",
					id: null,
					isActive: false,
					isDelete: false,
					modifiedDate: null,
					modifiedName: "",
					numberRequest: 0,
					processCode: "",
					processName: "",
					tennantCode: "",
					tennantName: "",
				},
				processingActiveTime: null,
				processingTerm: 0,
				processingTermTime: null,
				step: {
					createdDate: result[0].schema.createdDate,
					createdName: result[0].schema.createdName,
					description: result[0].schema.description,
					id: result[0].schema.id,
					isActive: result[0].schema.isActive,
					isDelete: result[0].schema.isDelete,
					modifiedDate: result[0].schema.modifiedDate,
					modifiedName: result[0].schema.modifiedName,
					stepCode: result[0].schema.stepCode,
					stepName: result[0].schema.stepName,
					tennantCode: result[0].schema.tennantCode,
					tennantName: result[0].schema.tennantName,
				},
				stepInProcessCode: result[0].schema.stepCode,
				stepInProcessName: result[0].schema.stepName,
				stepOrder: 0,
				tennantCode: result[0].schema.tennantCode,
				tennantName: result[0].schema.tennantName,
				organization: {},
				organizationCode: "",
				organizationName: "",

				rank: {
					created: null,
					createdDate: null,
					createdName: "",
					id: null,
					isActive: true,
					modified: null,
					modifiedDate: null,
					modifiedName: "",
					rankCode: "",
					rankName: "",
					tennantCode: "",
					tennantName: "",
				},
			};
			this.groups[groupIndex] = [];
			this.groups[groupIndex] = {
				model: {},
				schema: this.modelslt,
			};
			Vue.set(this.groups, groupIndex, this.groups[groupIndex]);
			this.indexItems = this.groups.indexOf(this.groups[groupIndex]);
		},

		saveStep() {
			// this.user_in_step.push(this.groups[this.indexItems].model.handler);
			try {
				if (!this.modelslt || !this.modelslt.stepInProcessName == "") {
					this.success = true;
					// console.log(this.groups[this.indexItems].model);
					// this.groups[this.indexItems] = [];
					this.groups[this.indexItems] = {
						model: this.groups[this.indexItems].model,
						schema: this.modelslt,
					};
					// let response = await globalService.postData_Async("/api/user-in-steps",);
				}
			} catch (error) {
				this.groups[this.indexItems] = [];
				this.error = false;
				console.log("Error", error);
			}
		},
		async save() {
			if (this.deleteArray.length > 0) {
				for (const item of this.deleteArray) {
					let response = await globalService.deleteData_Async(
						"/api/step-in-processes/" + item.schema.id,
					);
					if (!response || !response.state) {
						return;
					}
				}
			}
			// if (this.groups.length > 0) {
			// 	console.log("group", this.groups);
			// 	return;
			// }
			try {
				if (this.isSaving || this.processes.processName == "") {
					this.error = true;
					return;
				}
				this.isSaving = true;
				let response;

				if (this.processes.id != undefined) {
					this.processes.modified = this.user_current;
					this.processes.modifiedDate = new Date();
					this.processes.modifiedName = this.user_current.fullName;
					response = await globalService.putData_Async(
						"/api/process-infos/" + this.processes.id,
						this.processes,
					);
					if (!response || !response.state) {
						this.error = true;
						this.isSaving = false;
						return;
					} else {
						for (const arr of this.groups) {
							let responsesip;
							if (arr.schema.id == null) {
								arr.schema.processInfo.id = response.data.id;
								arr.schema.processInfo.processCode =
									response.data.processCode;
								arr.schema.processInfo.processName =
									response.data.processName;
								arr.schema.processInfo.createdDate =
									response.data.createdDate;
								arr.schema.processInfo.description =
									response.data.description;
								arr.schema.processInfo.createdName =
									response.data.createdName;
								arr.schema.processInfo.isActive =
									response.data.isActive;
								responsesip =
									await globalService.postData_Async(
										"/api/step-in-processes",
										arr.schema,
									);
								if (!responsesip || !responsesip.state) {
									this.error = true;
									this.isSaving = false;
									return;
								}
							} else {
								responsesip = await globalService.putData_Async(
									"/api/step-in-processes/" + arr.schema.id,
									arr.schema,
								);
								if (!responsesip || !responsesip.state) {
									this.error = true;
									this.isSaving = false;
									return;
								}
							}
						}
						this.success = true;
						this.isSaving = false;
						this.$router.push({ path: "/list-process" });
					}
				} else {
					this.processes.created = this.user_current;
					this.processes.modified = this.user_current;
					this.processes.createdDate = new Date();
					this.processes.createdName = this.user_current.fullName;
					this.processes.modifiedDate = new Date();
					this.processes.modifiedName = this.user_current.fullName;
					response = await globalService.postData_Async(
						"/api/process-infos",
						this.processes,
					);
					if (!response || !response.state) {
						this.error = true;
						this.isSaving = false;
						return;
					} else {
						for (const arr of this.groups) {
							if (!arr.schema.stepInProcessName == "") {
								arr.schema.processInfo.id = response.data.id;
								arr.schema.processInfo.processCode =
									response.data.processCode;
								arr.schema.processInfo.processName =
									response.data.processName;
								arr.schema.processInfo.createdDate =
									response.data.createdDate;
								arr.schema.processInfo.description =
									response.data.description;
								arr.schema.processInfo.createdName =
									response.data.createdName;
								arr.schema.processInfo.isActive =
									response.data.isActive;

								let responsesip =
									await globalService.postData_Async(
										"/api/step-in-processes",
										arr.schema,
									);
								if (!responsesip || !responsesip.state) {
									globalService.deleteData_Async(
										"/api/process-infos/" +
											response.data.id,
									);
									this.error = true;
									this.isSaving = false;
									return;
								}
								// if (arr.model.handler.length > 0) {
								// 	this.UserInStep.created = this.user_current;
								// 	this.UserInStep.modified =
								// 		this.user_current;
								// 	this.createdDate = new Date();
								// 	this.modifiedDate = new Date();
								// 	this.UserInStep.createdName =
								// 		this.user_current.fullName;
								// 	this.UserInStep.modifiedName =
								// 		this.user_current.fullName;
								// 	this.UserInStep.stepInProcess =
								// 		responsesip.data;
								// 	this.UserInStep.userInfos =
								// 		this.user_current;
								// 	let response =
								// 		await globalService.postData_Async(
								// 			"/api/user-in-steps",
								// 			this.UserInStep,
								// 		);
								// 	if (!response || !response.data) {
								// 		return;
								// 	}
								// }
							}
						}
						this.success = true;
						this.$router.push({ path: "/list-process" });
						this.isSaving = false;
					}
				}
				this.isSaving = false;
			} catch (e) {
				this.isSaving = false;
				console.log(e);
				this.error = true;
			}
		},
		getById(items) {
			console.log("items", items);
			if (items.stepInProcessName == "") return;
			this.indexItems = this.groups.indexOf(items);
			// // this.step_selected = items;
			if (!this.itemid) {
				this.modelslt = {
					createdDate: items.schema.createdDate,
					createdName: items.schema.createdName,
					description: items.schema.description,
					id: null,
					isActive: items.schema.isActive,
					isAuthorizedApproval: items.schema.isAuthorizedApproval,
					isBack: items.schema.isBack,
					isEdit: items.schema.isEdit,
					sendEmail: items.schema.sendEmail,
					optionDeny: items.schema.optionDeny,
					isExamine: items.schema.isExamine,
					isRequestModify: items.schema.isRequestModify,
					isRequiredSignature: items.schema.isRequiredSignature,
					modifiedDate: items.schema.modifiedDate,
					modifiedName: items.schema.modifiedName,
					processInfo: {
						createdDate: null,
						createdName: "",
						description: "",
						id: null,
						isActive: false,
						isDelete: false,
						modifiedDate: null,
						modifiedName: "",
						numberRequest: 0,
						processCode: "",
						processName: "",
						tennantCode: "",
						tennantName: "",
					},
					processingActiveTime: items.schema.processingActiveTime,
					processingTerm: items.schema.processingTerm,
					processingTermTime: items.schema.processingTermTime,
					step: {
						createdDate: items.schema.step.createdDate,
						createdName: items.schema.step.createdName,
						description: items.schema.step.description,
						id: items.schema.step.id,
						isActive: items.schema.step.isActive,
						isDelete: items.schema.step.isDelete,
						modifiedDate: items.schema.step.modifiedDate,
						modifiedName: items.schema.step.modifiedName,
						stepCode: items.schema.step.stepCode,
						stepName: items.schema.step.stepName,
						tennantCode: items.schema.step.tennantCode,
						tennantName: items.schema.step.tennantName,
					},
					stepInProcessCode: items.schema.stepInProcessCode,
					stepInProcessName: items.schema.stepInProcessName,
					stepOrder: 0,
					tennantCode: items.schema.tennantCode,
					tennantName: items.schema.tennantName,
					organization: items.schema.organization,

					organizationCode: items.schema.organizationCode,
					organizationName: items.schema.organizationName,
					rank: {
						created: items.schema.rank.created,
						createdDate: items.schema.rank.createdDate,
						createdName: items.schema.rank.createdName,
						id: items.schema.rank.id,
						isActive: items.schema.rank.isActive,
						modified: items.schema.rank.modified,
						modifiedDate: items.schema.rank.modifiedDate,
						modifiedName: items.schema.rank.modifiedName,
						rankCode: items.schema.rank.rankCode,
						rankName: items.schema.rank.rankName,
						tennantCode: items.schema.rank.tennantCode,
						tennantName: items.schema.rank.tennantName,
					},
				};
			} else {
				this.modelslt = {
					createdDate: items.schema.createdDate,
					createdName: items.schema.createdName,
					description: items.schema.description,
					id: null,
					isActive: items.schema.isActive,
					isAuthorizedApproval: items.schema.isAuthorizedApproval,
					isBack: items.schema.isBack,
					isEdit: items.schema.isEdit,
					optionDeny: items.schema.optionDeny,
					sendEmail: items.schema.sendEmail,
					isExamine: items.schema.isExamine,
					isRequestModify: items.schema.isRequestModify,
					isRequiredSignature: items.schema.isRequiredSignature,
					modifiedDate: items.schema.modifiedDate,
					modifiedName: items.schema.modifiedName,
					processInfo: {
						createdDate: items.schema.processInfo.createdDate,
						createdName: items.schema.processInfo.createdName,
						description: items.schema.processInfo.description,
						id: items.schema.processInfo.id,
						isActive: items.schema.processInfo.isActive,
						isDelete: items.schema.processInfo.isDelete,
						modifiedDate: items.schema.processInfo.modifiedDate,
						modifiedName: items.schema.processInfo.modifiedName,
						numberRequest: items.schema.processInfo.numberRequest,
						processCode: items.schema.processInfo.processCode,
						processName: items.schema.processInfo.processName,
						tennantCode: items.schema.processInfo.tennantCode,
						tennantName: items.schema.processInfo.tennantName,
					},
					processingActiveTime: items.schema.processingActiveTime,
					processingTerm: items.schema.processingTerm,
					processingTermTime: items.schema.processingTermTime,
					step: {
						createdDate: items.schema.step.createdDate,
						createdName: items.schema.step.createdName,
						description: items.schema.step.description,
						id: items.schema.step.id,
						isActive: items.schema.step.isActive,
						isDelete: items.schema.step.isDelete,
						modifiedDate: items.schema.step.modifiedDate,
						modifiedName: items.schema.step.modifiedName,
						stepCode: items.schema.step.stepCode,
						stepName: items.schema.step.stepName,
						tennantCode: items.schema.step.tennantCode,
						tennantName: items.schema.step.tennantName,
					},
					stepInProcessCode: items.schema.stepInProcessCode,
					stepInProcessName: items.schema.stepInProcessName,
					stepOrder: 0,
					tennantCode: items.schema.tennantCode,
					tennantName: items.schema.tennantName,
					organization: items.schema.organization,

					organizationCode: items.schema.organizationCode,
					organizationName: items.schema.organizationName,
					rank: {
						created: items.schema.rank.created,
						createdDate: items.schema.rank.createdDate,
						createdName: items.schema.rank.createdName,
						id: items.schema.rank.id,
						isActive: items.schema.rank.isActive,
						modified: items.schema.rank.modified,
						modifiedDate: items.schema.rank.modifiedDate,
						modifiedName: items.schema.rank.modifiedName,
						rankCode: items.schema.rank.rankCode,
						rankName: items.schema.rank.rankName,
						tennantCode: items.schema.rank.tennantCode,
						tennantName: items.schema.rank.tennantName,
					},
				};
			}
		},

		addColumn() {
			this.groups.push({
				model: {
					hanler: [],
				},
				schema: {
					createdDate: null,
					createdName: "",
					description: "",
					id: null,
					isActive: true,
					isAuthorizedApproval: false,
					isBack: false,
					isEdit: false,
					isExamine: false,
					isRequestModify: false,
					isRequiredSignature: false,
					modifiedDate: null,
					modifiedName: "",
					processInfo: {
						createdDate: null,
						createdName: "",
						description: "",
						id: null,
						isActive: false,
						isDelete: false,
						modifiedDate: null,
						modifiedName: "",
						numberRequest: 0,
						processCode: "",
						processName: "",
						tennantCode: "",
						tennantName: "",
					},
					processingActiveTime: "",
					processingTerm: 0,
					processingTermTime: null,
					step: {
						createdDate: null,
						createdName: "",
						description: "",
						id: null,
						isActive: true,
						isDelete: false,
						modifiedDate: null,
						modifiedName: "",
						stepCode: "",
						stepName: "",
						tennantCode: "",
						tennantName: "",
					},
					stepInProcessCode: "",
					stepInProcessName: "",
					stepOrder: 0,
					tennantCode: "",
					tennantName: "",
					organization: {},
					organizationCode: "",
					organizationName: "",

					rank: {
						created: null,
						createdDate: null,
						createdName: "",
						id: null,
						isActive: true,
						modified: null,
						modifiedDate: null,
						modifiedName: "",
						rankCode: "",
						rankName: "",
						tennantCode: "",
						tennantName: "",
					},
				},
			});
			this.flags.push({ drop: true, animate: true });
		},
		async removeRow(index) {
			if (this.groups[index].schema.id != null) {
				this.deleteArray.push(this.groups[index]);

				this.groups.splice(index, 1);
				this.flags.splice(index, 1);
			} else {
				this.groups.splice(index, 1);
				this.flags.splice(index, 1);
			}
		},
		removeColumn() {
			if (
				this.groups[this.groups.length - 1].schema.id ||
				this.groups[this.groups.length - 1].schema.id != null
			) {
				this.deleteArray.push(this.groups[this.groups.length - 1]);

				this.groups.splice(this.groups.length, 1);
				this.flags.splice(this.groups.length, 1);
			} else {
				this.groups.pop();
				this.flags.pop();
			}
		},
	},
};
</script>
<style scoped>
.remove-row {
	display: none;
	top: 0;
	right: 0;
	border-radius: 50%;
	position: absolute;
}
.bordered {
	position: relative;
}
.bordered:hover .remove-row {
	display: block;
}
.scroll-area {
	/* position: relative; */
	max-height: 60vh;
	/* padding: 0.5em; */
}
/* .dndrop-container {
	min-height: 3rem;
	padding: 1rem;
	margin-top: 1rem;
	border: 1px solid rgb(196, 196, 196);
}
.dndrop-container:hover {
	background-color: #e3f2fd;
	border: 1px solid #e3f2fd;
}
.dndrop-draggable-wrapper:hover {
	background-color: rgb(210, 232, 252);
}
.columns {
	gap: 0.5rem;
	justify-content: stretch;
} */
.v-form {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 0.5rem;
}
/* .v-form:hover {
	background-color: rgb(184, 184, 184);
} */
</style>
