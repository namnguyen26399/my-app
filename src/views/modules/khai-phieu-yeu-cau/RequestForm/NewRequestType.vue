<template>
	<v-card elevation="0" v-if="requestData">
		<v-row class="mx-0">
			<v-col cols="12" md="12">
				<v-card>
					<v-col cols="8">
						<div class="flex">
							<v-btn
								class="mx-2 my-0"
								depressed
								text
								color="back"
							>
								<v-icon>mdi-equal-box</v-icon
								>{{ requestData.requestDataCode }}</v-btn
							>
							<v-btn
								class="mx-2 my-0"
								depressed
								text
								color="back"
							>
								<v-icon>mdi-collage</v-icon
								>{{ requestData.requestGroupName }}</v-btn
							>
							<v-btn
								class="mx-2 my-0"
								depressed
								text
								color="back"
							>
								<v-icon>mdi-folder-open</v-icon
								>{{ requestData.requestTypeName }}</v-btn
							>
							<v-btn class="mx-2 my-0" depressed text color="back"
								><v-icon>mdi-image-filter-frames</v-icon>
								{{ requestData.signTypeName }}</v-btn
							>
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
								<v-tab
									key="a"
									v-if="requestData.signTypeCode === '0'"
								>
									{{ "Thông tin kí số " }}
								</v-tab>
								<v-tab
									key="b"
									v-if="requestData.signTypeCode === '1'"
								>
									{{ "Quản lý đóng dấu " }}
								</v-tab>
							</v-tabs>
						</v-col>
						<v-col cols="6" md="6">
							<div class="float-right">
								<v-btn
									class="mx-2 my-0"
									text
									color="back"
									small
									rounded-pill
									@click="redirectBack()"
								>
									<v-icon>mdi-subdirectory-arrow-left</v-icon>
									Quay lại
								</v-btn>
								<v-btn
									class="mx-2 my-0"
									text
									color="back"
									small
									rounded-pill
									depressed
								>
									<v-icon>mdi-delete-circle</v-icon>
									Xóa
								</v-btn>
								<!-- <v-btn
									class="mx-2 my-0"
									text
									color="back"
									small
									rounded-pill
									@click="processDocs"
								>
									<v-icon>mdi-file-document</v-icon>
									Xử lý công văn
								</v-btn> -->
								<v-btn
									class="mx-2 my-0"
									text
									color="back"
									small
									rounded-pill
									depressed
									@click="openApprove"
								>
									<v-icon>mdi-arrow-up</v-icon>
									Trình phê duyệt
								</v-btn>
								<v-btn
									class="mx-2 my-0"
									text
									color="blue"
									small
									rounded-pill
									depressed
									@click="save()"
								>
									<v-icon>mdi-content-save-all</v-icon>

									Lưu
								</v-btn>
							</div>
						</v-col>
					</v-row>
					<v-divider></v-divider>
					<v-col>
						<v-tabs-items v-model="tab">
							<v-tab-item key="Declaration">
								<DeclarationV3
									:requestDataV2="requestData"
									:isSaved="isSaving"
								>
								</DeclarationV3>
							</v-tab-item>

							<v-tab-item key="Procedure">
								<ProcedureV3
									:isSaved="isSaving"
									:requestDataV2="requestData"
								></ProcedureV3>
							</v-tab-item>
							<v-tab-item
								key="a"
								v-if="requestData.signTypeCode === '1'"
							>
								<ManagerStampVue
									:requestDataId="requestData.id"
								></ManagerStampVue>
							</v-tab-item>
							<v-tab-item
								key="b"
								v-if="requestData.signTypeCode === '0'"
							>
								<DigitalSignatureInfoVue
									:requestDataId="requestData.id"
								></DigitalSignatureInfoVue>
							</v-tab-item>
						</v-tabs-items>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog v-model="dialog.approve" width="60vw">
			<ApproveRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.processDoc" width="60vw">
			<DocumentProcessVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.sendEmail" width="60vw">
			<SendEmailVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.sendNotice" width="60vw">
			<SendNoticeVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import DeclarationV3 from "./DeclarationV3.vue";
import ProcedureV3 from "./ProcedureV3.vue";
import administratorAPI from "../../administrator/administrator.api";
import moment from "moment";
import ApproveRequestFormVue from "./ApproveRequestForm.vue";
import DocumentProcessVue from "../modulepopup/DocumentProcess.vue";
import SendEmailVue from "../modulepopup/SendEmail.vue";
import SendNoticeVue from "../modulepopup/SendNotice.vue";
import ManagerStampVue from "./ManagerStamp.vue";
import DigitalSignatureInfoVue from "./DigitalSignatureInfo.vue";

export default {
	name: "VSMFENewRequestType",
	components: {
		DeclarationV3,
		ProcedureV3,
		ApproveRequestFormVue,
		DocumentProcessVue,
		SendEmailVue,
		SendNoticeVue,
		ManagerStampVue,
		DigitalSignatureInfoVue,
	},

	data() {
		return {
			idRequestData: null,
			requestData: null,
			dialog: {
				approve: false,
				processDoc: false,
				sendEmail: false,
				sendNotice: false,
			},
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
		openApprove() {
			console.log("this.isSaving", this.isSaving);
			this.dialog.approve = true;
			this.isSaving = { state: 2 };
		},
		processDocs() {
			this.dialog.processDoc = true;
		},
		sendEmail() {
			this.dialog.sendEmail = true;
		},
		sendNotice() {
			this.dialog.sendNotice = true;
		},
	},
};
</script>

<style lang="scss" scoped></style>
