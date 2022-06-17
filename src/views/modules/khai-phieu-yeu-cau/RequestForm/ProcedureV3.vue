<template>
	<v-card>
		<v-dialog max-width="60vw" v-model="openUserInfosRequestData">
			<UserInfosRequestData
				@save="onSave"
				@close="onClose"
			></UserInfosRequestData>
		</v-dialog>
		<v-row>
			<v-col cols="12" md="3">
				<v-select
					v-model="s_processData"
					item-text="processDataName"
					v-if="s_processData"
					:items="s_processData"
					:item-value="(item) => item"
					outlined
					dense
				></v-select>
			</v-col>
			<v-col>
				<v-btn class="float-right" text @click="restoreStepInProcess">
					<v-icon>mdi-restart</v-icon> Khôi phục
				</v-btn>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row>
			<v-col>
				<v-card-text v-if="stepInProcess && stepInProcess.length > 0">
					<VuePerfectScrollbar class="scroll-area">
						<v-timeline align-top dense class="mx-40">
							<Container>
								<v-timeline-item
									v-for="(items, index) in stepInProcess"
									:key="items.id"
									small
									fill-dot
									left
									color="green darken-5"
								>
									<template v-slot:icon>
										<div class="gr_button">
											<v-btn
												class="red"
												dark
												small
												icon
												@click="removeRow(index)"
											>
												<v-icon>
													mdi-trash-can-outline
												</v-icon>
											</v-btn>
											<v-btn
												class="blue mt-1"
												dark
												small
												icon
												@click="addColumn()"
											>
												<v-icon> mdi-plus </v-icon>
											</v-btn>
										</div>
									</template>
									<div class="mb-2">
										<span
											class="text-h6 text-white rounded-pill green lighten-2 px-10 py-2"
										>
											Bước {{ index + 1 }}
										</span>
									</div>
									<Container>
										<v-card
											flat
											v-bind:class="{
												isFocus:
													index ==
													stepInProcess.length - 1,
												['rounded bordered ' +
												getClass(index)]: true,
											}"
											@click="clickToEdit(items)"
											:id="`step` + index"
										>
											<v-card-text class="text--primary">
												<v-form>
													<template>
														<v-row
															class="subtitle-1 mx-0"
															dense
														>
															<v-col
																cols="2"
																md="2"
															>
																{{
																	$t(
																		"label.processingTerm",
																	)
																}}
															</v-col>
															<v-col
																cols="2"
																md="2"
															>
																<v-text-field
																	solo
																	outlined
																	dense
																	v-model="
																		items.processingTerm
																	"
																	:suffix="
																		$t(
																			'label.hours',
																		)
																	"
																>
																</v-text-field>
																<!-- <span
																	v-if="
																		items &&
																		items.processingTerm
																	"
																>
																	{{
																		items.processingTerm
																	}}
																	{{
																		$t(
																			"label.hours",
																		)
																	}}
																</span> -->
															</v-col>
															<v-col
																cols="1"
																md="1"
															>
															</v-col>
															<v-col
																cols="1"
																md="1"
															>
																Tên bước:
															</v-col>
															<v-col>
																<v-text-field
																	v-if="
																		!items.id
																	"
																	v-model="
																		items.stepDataName
																	"
																	solo
																	outlined
																	dense
																>
																</v-text-field>
																<span
																	class="w-4"
																	v-if="
																		items.id
																	"
																>
																	<v-select
																		v-model="
																			items.stepDataName
																		"
																		:items="
																			steps
																		"
																		item-text="stepName"
																		hide-selected
																		solo
																		outlined
																		dense
																		clearable
																	>
																	</v-select>
																</span>
																<!-- <span
																	v-if="
																		items &&
																		items.stepDataName
																	"
																>
																	{{
																		items.stepDataName
																	}}
																</span> -->
															</v-col>
														</v-row>

														<v-row
															class="subtitle-1 mx-0"
														>
															<v-col
																cols="2"
																md="2"
															>
																Người xử lý:
															</v-col>
															<v-col
																cols="1"
																md="1"
															>
																<v-btn icon>
																	<v-icon
																		color="blue"
																		class="text--blue"
																		@click="
																			editUserInfosRequestData(
																				index,
																			)
																		"
																	>
																		mdi-account-plus
																	</v-icon>
																</v-btn>
															</v-col>
															<v-col>
																<span
																	v-for="(
																		item,
																		index
																	) of items.userInfos"
																	:key="
																		item.id
																	"
																>
																	<v-chip
																		class="ma-2"
																		color="grey lighten-5"
																		close
																		@click:close="
																			items.userInfos.splice(
																				index,
																				1,
																			)
																		"
																	>
																		<v-avatar
																			color="indigo mr-2"
																			size="36"
																		>
																			<span
																				class="white--text"
																			>
																				{{
																					getAvatarText(
																						item.fullName,
																					)
																				}}
																			</span>
																		</v-avatar>
																		{{
																			item.fullName
																		}}
																	</v-chip>
																</span>
															</v-col>
														</v-row>
													</template>
												</v-form>
											</v-card-text>
											<!-- <v-btn
													class="remove-row"
													fab
													dark
													icon
													@click="removeRow(index)"
												>
													<v-icon dark>
														mdi-trash-can-outline
													</v-icon>
												</v-btn> -->
										</v-card>
									</Container>
								</v-timeline-item>
							</Container>
						</v-timeline>
					</VuePerfectScrollbar>
				</v-card-text>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import { Container } from "vue-dndrop";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import UserInfosRequestData from "./UserInfosRequestData.vue";

export default {
	name: "VSMFEProcedureV3",
	components: {
		Container,
		VuePerfectScrollbar,
		UserInfosRequestData,
	},
	props: { requestDataV2: {}, isSaved: {} },
	watch: {
		requestDataV2(newValue) {
			this.m_requestDto = newValue;
		},
		async isSaved(value) {
			this.m_isSaved = value;
			// console.log("this.m_isSaved.state", this.m_isSaved.state);
			if (this.m_isSaved.state == 1) {
				console.log("Luu 2");

				await this.save();
			}
		},
		// s_processData() {
		// 	this.selectProcessData();
		// },
	},
	data() {
		return {
			itemIndex: -1,
			openFileRequestData: false,
			openUserInfosRequestData: false,
			m_requestDto: null,
			stepInProcess: [],
			defaultStepInProcess: [],
			s_processData: null,
			indexItems: 0,
			userFilters: [],
			showUser: [],
			arrDeleteStep: [],
			steps: [],
			defaultItem: {
				created: null,
				createdDate: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				description: "",
				id: null,
				isActive: false,
				isApprove: false,
				isAuthorizedApproval: false,
				isBack: false,
				isChangeStatus: false,
				isCreateContract: false,
				isCreateOPTLink: false,
				isCreateOfficalDispath: false,
				isCreateReport: false,
				isCreateTFSTask: false,
				isDeny: false,
				isEdit: false,
				isExamine: false,
				isExportPDF: false,
				isManageStamp: false,
				isProcessRecover: false,
				isRecall: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSaveDoc: false,
				isSendMail: false,
				isSendNoticePriority: false,
				modified: null,
				modifiedDate: null,
				modifiedName: "",
				optionDeny: 1,
				organization: null,
				organizationCode: "",
				organizationName: "",
				processInfo: null,
				processingActiveTime: null,
				processingTerm: 0,
				processingTermTime: null,
				rank: null,
				rankCode: "",
				rankName: "",
				step: null,
				stepInProcessCode: "",
				stepInProcessName: "",
				stepOrder: 0,
				tennant: null,
				tennantCode: "",
				tennantName: "",
				userInStepDTOs: [],
			},
			is_add: false,
			requestProcessData: [],
		};
	},
	async created() {
		this.m_requestDto = this.requestDataV2;
		console.log("this.m_requestDto ", this.m_requestDto);
	},

	mounted() {
		this.load();
	},
	updated() {
		if (this.is_add) {
			let theTemp = document.getElementsByClassName("isFocus");
			theTemp = theTemp.length >= 0 ? theTemp[0] : null;
			if (theTemp) theTemp.focus();
			this.scrollToView(this.stepInProcess.length - 1);
			this.is_add = false;
		}
	},
	methods: {
		async load() {
			await this.getAllByProcesInfoId();
			await this.selectProcessData();
			// await this.getStepInProcessesByIdProcessData();
			// await this.getStepInProcesses();
			await this.getAllUser();
			await this.getAllStep();
		},
		editUserInfosRequestData(index) {
			this.openUserInfosRequestData = true;
			this.itemIndex = index;
		},
		onClose() {
			this.openUserInfosRequestData = false;
			this.itemIndex = -1;
		},
		async getAllStep() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllSteps(),
			);
			if (!response) {
				return;
			}
			if (!response.state) {
				return;
			}
			this.steps = response.data.filter((entry) => {
				return !entry.isDelete && entry.isActive;
			});
			let emptyOb = {
				stepName: this.$t("label.empty"),
				id: null,
			};
			this.steps.unshift(emptyOb);
		},
		async getStepInProcesses() {
			let response;
			try {
				console.log("m_request", this.m_requestDto);
				response = await globalService.getData_Async(
					administratorAPI.API_GetSteepDataByIdRequest(
						this.m_requestDto.id,
					),
				);
				if (!response || !response.state) {
					return;
				}

				this.defaultStepInProcess = response.data.filter((entry) => {
					entry.showHandler = false;
					return entry;
				});
				// this.stepInProcess = this.cloneArray(
				// 	this.stepInProcess,
				// 	this.defaultStepInProcess,
				// );
				//this.idStepData = 1;
				//this.$emit("saveStepData", this.idStepData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllUser() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfo(),
				);
				if (!response || !response.state) {
					return;
				}
				this.userFilters = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error);
			}
		},

		clickToEdit(items) {
			if (!items) return;
			this.indexItems = this.stepInProcess.indexOf(items);
		},
		getClass(index) {
			return this.indexItems == index
				? "grey lighten-2"
				: "grey lighten-3";
		},
		selectHandler(item, index) {
			this.stepInProcess[index].userInfos.push(item);
		},
		remove(item) {
			if (
				!this.stepInProcess[this.indexItems].userInfos ||
				this.stepInProcess[this.indexItems].userInfos.length == 0
			) {
				return;
			}
			this.stepInProcess[this.indexItems].userInfos.splice(
				this.stepInProcess[this.indexItems].userInfos.indexOf(item),
				1,
			);
			this.stepInProcess[this.indexItems].userInfos = [
				...this.stepInProcess[this.indexItems].userInfos,
			];
		},
		restoreStepInProcess() {
			this.stepInProcess = this.cloneArray(
				this.stepInProcess,
				this.defaultStepInProcess,
			);
			if (this.requestProcessData.length > 0) {
				this.s_processData = this.requestProcessData[0];
			}
		},
		cloneArray(targetArayy, sourceArray) {
			if (!sourceArray) return sourceArray;
			targetArayy = sourceArray.map((ele) => this.cloneObject({}, ele));
			return targetArayy;
		},
		cloneObject(targetObject, sourceObject) {
			if (!sourceObject) return null;
			targetObject = Object.assign({}, sourceObject);
			for (let prop in sourceObject) {
				if (typeof sourceObject[prop] == "object") {
					targetObject[prop] = this.cloneObject(
						targetObject[prop],
						sourceObject[prop],
					);
				}
			}
			return targetObject;
		},
		selectStepInProcess(item, index) {
			console.log("item", item);
			// console.log("index", index);
			this.stepInProcess[index] = {
				...this.stepInProcess[index],
				...item,
			};
			this.stepInProcess[index].stepDataName = item.stepName;
			this.clickToEdit(this.stepInProcess[index]);
		},
		addColumn() {
			this.stepInProcess.push(this.defaultItem);
			this.clickToEdit(this.stepInProcess[this.stepInProcess.length - 1]);
			this.is_add = true;
		},
		scrollToView(index) {
			let test = document.getElementById("step" + index);
			if (test[0]) test[0].scrollIntoView();
		},
		async selectProcessData() {
			if (!this.s_processData || !this.s_processData.id) return;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetStepDataByIdProcessData(
					this.s_processData.id,
				),
			);
			if (!response || !response.state) return;
			this.stepInProcess = response.data;
			// this.stepInProcess = this.cloneArray(
			// 	this.stepInProcess,
			// 	response.data,

			// );
		},
		async getAllByProcesInfoId() {
			let response;
			console.log("this.m_requestDto.id", this.m_requestDto.id);
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_FindProcessesDataByID(
						this.m_requestDto.id,
					),
				);
				if (!response || !response.state) {
					return;
				}
				this.requestProcessData = response.data;
				if (this.requestProcessData.length > 0) {
					this.s_processData = this.requestProcessData[0];
				}
				console.log(
					"lấy được 1 list ProcessData theo id rq",
					this.requestProcessData,
				);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getStepInProcessesByIdProcessData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetSteepDataByIdRequest(
						this.s_processData.id,
					),
				);
				console.log("response stepInProcess", response);
				if (!response || !response.state) {
					return;
				}
				this.stepInProcess = response.data;
				this.defaultStepInProcess = response.data.filter((entry) => {
					entry.showHandler = false;
					return entry;
				});
				// this.stepInProcess = this.cloneArray(
				// 	this.stepInProcess,
				// 	this.defaultStepInProcess,
				// );
				console.log(
					"this.defaultStepInProcess: ",
					this.defaultStepInProcess,
				);
				console.log("response stepInProcess", this.stepInProcess);
				//this.idStepData = 1;
				//this.$emit("saveStepData", this.idStepData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},

		onSave(value) {
			console.log("selected 2142", value);
			this.stepInProcess[this.itemIndex].userInfos = value;
			console.log("this.stepInProcess", this.stepInProcess);
			value = null;
		},
		removeRow(index) {
			this.stepInProcess.splice(index, 1);
			this.arrDeleteStep.push(this.stepInProcess[index]);
		},
		async save() {
			if (this.m_requestDto.length == 0) {
				this.toastError(this.$t("message.update_error"));
				return;
			}

			console.log("this.stepInProcess", this.stepInProcess);
			for (let stepInProces of this.stepInProcess) {
				console.log("stepInProces", stepInProces);
				let response = await globalService.putData_Async(
					administratorAPI.API_UpDateStepData(stepInProces.id),
					stepInProces,
				);

				if (!response || !response.state) {
					return;
				}
			}
			this.toastSuccess(this.$t("message.update_success"));
		},
	},
};
</script>

<style lang="scss" scoped>
.scroll-area {
	max-height: 100vh;
}
.gr_button {
	display: grid !important;
	position: absolute;
	top: 9rem;
}
</style>
