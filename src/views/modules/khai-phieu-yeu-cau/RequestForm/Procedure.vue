<template>
	<v-card>
		<v-card-text class="py-0" v-if="stepInProcess">
			<v-timeline
				align-top
				dense
				v-for="(steep, index) of stepInProcess"
				:key="index"
				fill-dot
			>
				<v-timeline-item>
					<v-card elevation="0" class="blue">
						<v-card-title class="text-white d-flex">
							<div>
								<v-row class="ml-2">
									<h4 class="mt-1">
										Bước {{ index + 1 }} :&nbsp;
									</h4>
									<!-- <v-text-field
										v-model="steep.stepInProcessName"
										dark
										dense
										outlined
										single-line
										class="text-h5 d-inline"
									>
									</v-text-field> -->
									<v-autocomplete
										v-model="steep.step"
										:items="steps"
										item-text="stepName"
										return-object
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
									v-model="steep.userInStepDTOs"
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
					v-if="stepInProcess"
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
	name: "VsmFeProcedure",
	props: {
		requestStepDataList: [],
		isSaved: {},
		processData: {},
		p_requestData: {},
		m_requestDataV2: {},
		_idStepData: {},
	},
	watch: {
		requestStepDataList(value) {
			this.m_requestStepDataList = value;
		},
		async m_requestDataV2(newValue) {
			this.requestData = newValue;

			await this.getStepInProcesses();
			await this.getUserInStep();
		},
		async isSaved(value) {
			this.m_isSaved = value;
			console.log("313135151");
			console.log("this.m_isSaved.state", this.m_isSaved.state);
			if (this.m_isSaved.state == 2) {
				this.saveStepData();
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
			stepInProcess: [],
			userInStep: [],
			requestStepData: StepDataDto,
			steps: [],

			defaultItem: {
				created: this.getUserInfo(),
				createdName: this.getUserInfo().fullName,
				createdDate: new Date(),
				description: "",
				id: null,
				isActive: false,
				isAuthorizedApproval: false,
				isBack: false,
				isCreateTFSTask: false,
				isDelete: false,
				isEdit: false,
				isExamine: true,
				isProcessRecover: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSendMail: false,
				modified: this.getUserInfo(),
				modifiedDate: new Date(),
				modifiedName: this.getUserInfo().fullName,
				step: null,
				organization: null,
				organizationCode: null,
				processInfo: null,
				organizationName: null,
				processingActiveTime: null,
				precessingTermTime: null,
				processingTerm: null,
				rank: null,
				rankCode: null,
				rankName: null,
				stepInProcessCode: null,
				stepInProcessName: null,
				stepOrder: 0,
				tennant: null,
				tennantCode: null,
				tennantName: null,
				userInStepDTOs: [],
			},
		};
	},
	created() {
		this.idStepData = this._idStepData;

		this.requestData = this.m_requestDataV2;
		console.log("requestData", this.requestData);
		this.m_requestStepDataList = this.requestStepDataList;
		this.m_processData = this.processData;
		this.m_requestData = this.p_requestData;
		this.m_isSaved = this.isSaved;
		// for (let stepData of this.m_requestStepDataList) {
		// 	stepData.userInfos = stepData.userInStep.map((ele) => ele.userInfo);
		// }
	},
	mounted() {
		if (!this.requestData?.id) {
			return;
		}
		this.initialize();
	},

	methods: {
		async initialize() {
			await this.getStepInProcesses();
			await this.GetAllUser();

			await this.getUserInStep();
			await this.getAllStep();
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
		async getStepInProcesses() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_FindStepInProcessesByID(
						this.requestData.processInfo.id,
					),
				);
				if (!response || !response.state) {
					return;
				}
				this.stepInProcess = response.data.map((ele) => {
					if (!ele.step) {
						ele.step = Object.assign({}, this.steps[0]);
						console.log("stepInProcess: ", ele.step);
						ele.step.stepName = ele.stepInProcessName;
					}
					return ele;
				});
				console.log("this.stepInProcess", this.stepInProcess);
				this.idStepData = 1;
				this.$emit("saveStepData", this.idStepData);
			} catch (error) {
				this.toastError(error);
				return;
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
			this.stepInProcess[index].userInStepDTOs = this.stepInProcess[
				index
			].userInStepDTOs.filter((entry) => {
				if (entry.id != item.id) return entry;
			});
		},

		removeStep(step) {
			this.deleteStepArr.push(step);
			this.stepInProcess.splice(this.stepInProcess.indexOf(step), 1);
		},
		addStep() {
			this.defaultItem.processInfo = this.requestData.processInfo;
			this.stepInProcess.push(Object.assign({}, this.defaultItem));
		},
		async saveStepData() {
			console.log("this.stepInProcess", this.stepInProcess);
			for (let stepInProces of this.stepInProcess) {
				this.requestStepData.isActive = false;
				this.requestStepData.created = { id: this.user_info.id };
				console.log("stepInProces.step", stepInProces.step);

				//this.requestStepData.step = stepInProces.step;

				this.requestStepData.processData = {
					id: this.m_isSaved.idProcessData,
				};
				this.requestStepData.requestData = {
					id: this.m_isSaved.idRequestData,
				};
				if (stepInProces.id) {
					this.requestStepData.stepInProcess = {
						id: stepInProces.id,
					};
				}
				// this.requestStepData = [...stepInProces];
				this.requestStepData.stepOrder = stepInProces.stepOrder;
				this.requestStepData.stepDataCode = stepInProces.step.stepCode;
				this.requestStepData.stepDataName = stepInProces.step.stepName;
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
					stepInProces?.organization?.organizationCode;
				this.requestStepData.organizationName =
					stepInProces?.organization?.organizationName;
				this.requestStepData.rankCode = stepInProces?.rankCode;
				this.requestStepData.rankName = stepInProces?.rankName;
				this.requestStepData.description = stepInProces?.description;
				this.requestStepData.createdName = stepInProces.createdName;
				this.requestStepData.createdDate = stepInProces.createdDate;
				this.requestStepData.modifiedName = stepInProces.modifiedName;

				this.requestStepData.isDelete = stepInProces?.isDelete;
				this.requestStepData.tennantCode = stepInProces?.tennantCode;
				this.requestStepData.tennantName = stepInProces?.tennantName;

				this.requestStepData.modifiedDate = stepInProces?.modifiedDate;

				this.requestStepData.modified = {
					id: stepInProces.modified.id,
				};

				this.requestStepData.userInfos =
					stepInProces.userInStepDTOs.map((ele) => {
						return {
							id: ele.userInfo?.id ? ele.userInfo?.id : ele.id,
						};
					});

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
				console.log("response", response);
				this.toastSuccess(this.$t("message.add_success"));
				// console.log("respon create", response);
			}
			this.$router.push({
				path: `/phieu-yeu-cau`,
			});
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
	},
};
</script>

<style></style>
