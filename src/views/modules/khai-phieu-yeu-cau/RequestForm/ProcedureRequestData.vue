<template>
	<v-card>
		<v-card-text class="py-0" v-if="stepDatas">
			<v-timeline
				align-top
				dense
				v-for="(steep, index) of stepDatas"
				:key="index"
				fill-dot
			>
				<v-timeline-item>
					<v-card elevation="0" class="blue">
						<v-card-title class="text-white d-flex">
							<div class="w-full">
								<v-row class="ml-2">
									<h4 class="mt-1">
										Bước {{ index + 1 }} :&nbsp;
									</h4>
									<!-- <v-text-field
										v-model="steep.stepDataName"
										dark
										dense
										outlined
										single-line
										class="text-h5 d-inline"
									>
									</v-text-field> -->
									<v-autocomplete
										v-model="steep.stepDataName"
										:items="steps"
										item-text="stepName"
										dense
										class="text-h6 d-inline"
									>
									</v-autocomplete>
									<div class="float-right">
										<v-btn
											@click="removeStep(steep)"
											icon
											small
											class="red rounded-circle"
										>
											<v-icon color="white"
												>mdi-close</v-icon
											>
										</v-btn>
									</div>
								</v-row>
							</div>
						</v-card-title>
						<v-card-text class="white pt-5">
							<div>
								<v-text-field
									type="number"
									outlined
									dense
									:label="$t('label.processingTerm')"
									append-icon="mdi-clock"
									suffix="Giờ"
									v-model="steep.processingTerm"
									:rules="[
										() =>
											(steep.processingTerm >= 0 &&
												steep.processingTerm <= 99) ||
											$t('message.error_format'),
									]"
								>
								</v-text-field>
							</div>
							<div>
								<v-combobox
									v-model="steep.userInfos"
									:items="listUserInfos"
									item-text="fullName"
									chips
									outlined
									dense
									hide-selected
									clearable
									label="Người xử lý"
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
											class="ma-2 rounded-pill"
											close
											@click:close="
												removeItem(index, item)
											"
										>
											<v-avatar
												color="indigo mr-2"
												size="30"
											>
												<span class="white--text">
													{{
														getAvatarText(
															item.fullName,
															2,
														)
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
							</div>
						</v-card-text>
					</v-card>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
		<v-row>
			<v-col
				><v-btn
					class="float-right rounded-lg"
					color="blue darken-0"
					dark
					right
					@click="addStep()"
					v-if="stepDatas"
					>Thêm bước</v-btn
				></v-col
			>
		</v-row>
	</v-card>
</template>

<script>
import StepDataDto from "@/models/step-data.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";

export default {
	name: "VSMFEProcedureRequestData",
	props: {
		requestStepDataList: [],
		isSaved: {},
		processData: {},
		p_requestData: {},
		requestDataV2: {},
		_idStepData: {},
	},
	watch: {
		async requestDataV2(newValue) {
			this.requestData = newValue;

			//await this.getListStepData();
			//await this.getUserInStep();
		},
		async isSaved(value) {
			this.m_isSaved = value;

			if (this.m_isSaved.state == 1) {
				console.log("Lưu lần 2");

				//this.saveStepData();
			}
		},
		processData(value) {
			this.m_processData = value;
		},
		p_requestData(value) {
			this.m_requestData = value;
		},
		_idStepData(value) {
			this.idStepData = value;
		},
	},

	data() {
		return {
			idStepData: {},
			steps: [],
			user_info: this.getUserInfo(),
			requestData: null,
			m_processData: {},
			m_requestData: {},
			m_requestStepDataList: [],
			listUserInfos: [],
			deleteUserArr: [],
			m_isSaved: {},
			m_isSend: {},
			deleteStepArr: [],
			stepDatas: [],
			userInStep: [],
			requestStepData: StepDataDto,

			defaultItem: {
				id: null,
				stepDataCode: "",
				stepDataName: "",
				stepOrder: 0,
				timeActive: null,
				processingTerm: 0,
				precessingTermTime: null,
				isRequiredSignature: false,
				isBack: false,
				isAuthorizedApproval: false,
				isExamine: true,
				isEdit: false,
				isRequestModify: false,
				isSendMail: false,
				isProcessRecover: false,
				isCreateTFSTask: null,
				organizationCode: "",
				organizationName: "",
				rankCode: null,
				rankName: null,
				description: "",
				createdName: this.getUserInfo().fullName,
				createdDate: new Date(),
				modifiedName: this.getUserInfo().fullName,
				modifiedDate: new Date(),
				isActive: false,
				isDelete: false,
				tennantCode: null,
				tennantName: null,
				nextStep: null,
				processData: null,
				requestData: null,
				tennant: null,
				created: this.getUserInfo(),
				modified: this.getUserInfo(),
				stepInProcess: null,
				userInfos: [],
			},
		};
	},
	created() {
		this.idStepData = this._idStepData;

		this.requestData = this.requestDataV2;
		console.log("this.requestData", this.requestData);
		this.m_processData = this.processData;
		this.m_requestData = this.p_requestData;
		this.m_isSaved = this.isSaved;
		// for (let stepData of this.m_requestStepDataList) {
		// 	stepData.userInfos = stepData.userInStep.map((ele) => ele.userInfo);
		// }
	},
	mounted() {
		// if (!this.requestData?.id) {
		// 	return;
		// }
		this.initialize();
	},

	methods: {
		async initialize() {
			await this.getListStepData();
			await this.GetAllUser();
			await this.getAllStep();
			//await this.getUserInStep();
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

				this.listUserInfos = response.data;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getListStepData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetSteepDataByIdRequest(
						this.requestData.id,
					),
				);
				if (!response || !response.state) {
					return;
				}
				this.stepDatas = response.data;
				console.log("this.stepDatas", this.stepDatas);
				this.idStepData = 1;
				//this.$emit("saveStepData", this.idStepData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getUserInStep() {
			let response;
			for (let stepInProces of this.stepDatas) {
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetSteepDataByIdstepDatasId(
							stepInProces.id,
						),
					);

					if (!response || !response.state) {
						this.toastError(this.$t("error.load"));
					}
					stepInProces.userInStepDTOs = response.data;
				} catch (error) {
					this.toastError(error);
					return;
				}
			}
		},

		async save() {
			if (this.m_requestStepDataList.length == 0) {
				this.toastError(this.$t("message.update_error"));
				return;
			}

			for (let stepInProces of this.m_requestStepDataList) {
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
		removeItem(index, item) {
			this.stepDatas[index].userInStepDTOs = this.stepDatas[
				index
			].userInStepDTOs.filter((entry) => {
				if (entry.id != item.id) return entry;
			});
		},

		removeStep(step) {
			this.deleteStepArr.push(step);
			this.stepDatas.splice(this.stepDatas.indexOf(step), 1);
		},
		addStep() {
			this.defaultItem.processData = this.m_processData;
			this.defaultItem.requestData = this.m_requestData;
			this.stepDatas.push(Object.assign({}, this.defaultItem));
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
		},
		async saveStepData() {
			for (let stepInProces of this.stepDatas) {
				this.requestStepData.isActive = false;
				this.requestStepData.created = { id: this.user_info.id };
				this.requestStepData.step = { id: stepInProces.step.id };

				this.requestStepData.processData = {
					id: this.m_isSaved.idProcessData,
				};
				this.requestStepData.requestData = {
					id: this.m_isSaved.idRequestData,
				};
				this.requestStepData.stepDatas = { id: stepInProces.id };
				// this.requestStepData = [...stepInProces];
				this.requestStepData.stepOrder = stepInProces.stepOrder;
				this.requestStepData.stepDataCode = stepInProces.stepDatasCode;
				this.requestStepData.stepDataName = stepInProces.stepDatasName;
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
				this.requestStepData.userInfos =
					stepInProces.userInStepDTOs.map((entry) => {
						return { id: entry.userInfo.id };
					});

				// let user = await this.getUserInStep(stepInProces.id);
				// let responseUser = await globalService.getData_Async(
				// 	administratorAPI.API_GetAllBystepDatasId(
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
				console.log("response", response);
				this.toastSuccess(this.$t("message.add_success"));
				// console.log("respon create", response);
			}
			this.$router.push({
				path: `/phieu-yeu-cau`,
			});
		},
	},
};
</script>

<style></style>
