<template>
	<v-card>
		<v-card-text class="py-0">
			<v-timeline
				align-top
				dense
				v-for="(steep, index) of m_requestStepDataList"
				:key="index"
				fill-dot
			>
				<v-timeline-item>
					<v-card elevation="4" class="blue">
						<v-card-title class="text-white d-flex">
							<div class="w-full">
								Bước {{ index + 1 }} :&nbsp;{{
									steep.stepDataName
								}}
								<div class="float-right">
									<h5>
										Thời hạn xử lý :
										{{ steep.processingTerm }}h
									</h5>
								</div>
							</div>
						</v-card-title>
						<v-card-text class="white">
							<div class="d-flex pt-5">
								<h3>Đơn vị xử lý :&nbsp;</h3>
								<v-chip>
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													steep.organizationName,
												)
											}}
										</span>
									</v-avatar>
									<strong>
										{{ steep.organizationName }}
									</strong>
								</v-chip>
							</div>
							<div class="d-flex pt-5">
								<h3>Vai trò xử lý :&nbsp;</h3>
								<v-chip>
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													steep.organizationName,
												)
											}}
										</span>
									</v-avatar>
									<strong>
										{{ steep.organizationName }}
									</strong>
								</v-chip>
							</div>

							<div class="d-flex pt-5">
								<h3 class="mt-2">Người xử lý :&nbsp;</h3>

								<span
									v-for="(item, indexitem) of steep.userInfos"
									:key="indexitem"
								>
									<v-chip class="mt-2">
										<v-avatar color="indigo mr-2" size="30">
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
										<strong>{{ item.fullName }}</strong>
									</v-chip>
								</span>
							</div>
						</v-card-text>
					</v-card>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";

export default {
	name: "VsmFeProcedureV2",
	props: { requestStepDataList: [], isSaved: {} },
	watch: {
		requestStepDataList(value) {
			this.m_requestStepDataList = value;
		},

		isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state) {
				this.save();
			}
		},
	},

	data() {
		return {
			m_requestStepDataList: [],
			listUserInfos: [],
			deleteUserArr: [],
			m_isSaved: {},
		};
	},
	created() {
		this.m_requestStepDataList = this.requestStepDataList;
		console.log("this.m_requestStepDataList", this.m_requestStepDataList);
		this.m_isSaved = this.isSaved;
		// for (let stepData of this.m_requestStepDataList) {
		// 	stepData.userInfos = stepData.userInStep.map((ele) => ele.userInfo);
		// }
	},
	mounted() {
		this.GetAllUser();
		console.log("this.m_requestStepDataList", this.m_requestStepDataList);
	},

	methods: {
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
		},
		removeItem(index, item) {
			this.m_requestStepDataList[index].userInfos =
				this.m_requestStepDataList[index].userInfos.filter((entry) => {
					if (entry.id != item.id) return entry;
				});
			// this.m_requestStepDataList[index].userInfos.splice(
			// 	this.m_requestStepDataList[index].userInfos.indexOf(item),
			// 	1,
			// );
			console.log("123", this.m_requestStepDataList[index].userInfos);
		},
	},
};
</script>

<style></style>
