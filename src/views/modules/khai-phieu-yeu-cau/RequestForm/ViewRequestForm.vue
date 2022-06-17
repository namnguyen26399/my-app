<template>
	<v-card elevation="0" v-if="requestData">
		<v-row class="mx-0">
			<v-col cols="12" md="12">
				<v-card>
					<v-col cols="8">
						<div class="flex">
							<v-btn class="mx-2 my-0" depressed>{{
								requestData.requestDataCode
							}}</v-btn>
							<v-btn class="mx-2 my-0" depressed>{{
								requestData.requestGroupName
							}}</v-btn>
							<v-btn class="mx-2 my-0" depressed>{{
								requestData.requestTypeName
							}}</v-btn>
							<v-btn class="mx-2 my-0" depressed>{{
								requestData.signTypeName
							}}</v-btn>
						</div>
					</v-col>
					<v-row>
						<v-col cols="6">
							<v-tabs v-model="tab" color="primary">
								<v-tab key="Declaration">
									{{ "Thông tin" }}
								</v-tab>

								<v-tab key="Procedure">
									{{ "Quy Trình " }}
								</v-tab>
							</v-tabs>
						</v-col>
					</v-row>

					<v-col>
						<v-tabs-items v-model="tab">
							<v-tab-item key="Declaration">
								<ViewDeclarationVue
									:requestDataV2="requestData"
									:isSaved="isSaving"
								>
								</ViewDeclarationVue>
							</v-tab-item>

							<v-tab-item key="Procedure">
								<ViewProcedureVue
									:isSaved="isSaving"
									:requestDataV2="requestData"
								></ViewProcedureVue>
							</v-tab-item>
						</v-tabs-items>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import moment from "moment";
import ViewDeclarationVue from "./ViewDeclaration.vue";
import ViewProcedureVue from "./ViewProcedure.vue";
export default {
	name: "VSMFENewRequestType",
	components: { ViewDeclarationVue, ViewProcedureVue },

	data() {
		return {
			idRequestData: null,
			requestData: null,
			tab: 0,
			isSaving: {
				state: 0,
				idRequestData: 0,
				idProcessData: 0,
			},
		};
	},
	created() {
		this.idRequestData = this.$router.currentRoute.params.id;
		console.log("this.idRequestData", this.idRequestData);
	},
	mounted() {
		this.initialize();
	},
	methods: {
		async initialize() {
			if (this.$router.currentRoute.params.id) {
				await this.getRequestData();
			}
		},
		async getRequestData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetRequestDataByID(this.idRequestData),
				);
				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}
				this.requestData = response.data;
				console.log("this.requestData", this.requestData);
				this.requestData.createdDate = moment(
					this.requestData.createdDate,
				).format(this.dateFormat);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		save() {
			this.isSaving = { state: 1 };
		},
	},
};
</script>

<style lang="scss" scoped></style>
