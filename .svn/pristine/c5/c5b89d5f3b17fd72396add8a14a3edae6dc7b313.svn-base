<template>
	<v-card elevation="0" v-if="requestData">
		<vue-breadcrumbs/>
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
						<v-col cols="12">
							<vue-tab :tab="tab" @tab="(v)=>tab = v " :tabs="tabs" :buttons="buttons" @buttonClick="handleButtonClick"></vue-tab>
						</v-col>
					</v-row>
					<v-col>
						<v-tabs-items v-model="tab">
							<v-tab-item key="Declaration">
								<XulyPhieuVue
									:requestDataV2="requestData"
									:isSaved="isSaving"
								>
								</XulyPhieuVue>
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
		<v-dialog v-model="dialog.review" width="40vw">
			<ReviewRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.refuse" width="40vw">
			<RefuseRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.status" width="40vw">
			<StatusRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.askForOpinions" width="40vw">
			<AskForOpinionsRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.answer" width="40vw">
			<AnswerRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.signture" width="30vw">
			<DigitalSignRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.return" width="40vw">
			<ReturnRequestFormVue
				persistent
				:request="requestData"
				@close="onCloseDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.approve" width="40vw">
			<ApproveRequestFormV2Vue
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
import ProcedureV3 from "./ProcedureV3.vue";
import administratorAPI from "../../administrator/administrator.api";
import moment from "moment";
import ReviewRequestFormVue from "../modulepopup/ReviewRequestForm.vue";
import RefuseRequestFormVue from "../modulepopup/RefuseRequestForm.vue";
import StatusRequestFormVue from "../modulepopup/StatusRequestForm.vue";
import AskForOpinionsRequestFormVue from "../modulepopup/AskForOpinionsRequestForm.vue";
import AnswerRequestFormVue from "../modulepopup/AnswerRequestForm.vue";
import DigitalSignRequestFormVue from "../modulepopup/DigitalSignRequestForm.vue";
import ReturnRequestFormVue from "../modulepopup/ReturnRequestForm.vue";
import ApproveRequestFormV2Vue from "../modulepopup/ApproveRequestFormV2.vue";
import DocumentProcessVue from "../modulepopup/DocumentProcess.vue";
import SendEmailVue from "../modulepopup/SendEmail.vue";
import SendNoticeVue from "../modulepopup/SendNotice.vue";
import ManagerStampVue from "./ManagerStamp.vue";
import DigitalSignatureInfoVue from "./DigitalSignatureInfo.vue";
import XulyPhieuVue from "./XulyPhieu.vue";

export default {
	name: "VSMFENewRequestTypeV2",
	components: {
		XulyPhieuVue,
		ProcedureV3,
		ApproveRequestFormV2Vue,
		AskForOpinionsRequestFormVue,
		AnswerRequestFormVue,
		ReviewRequestFormVue,
		RefuseRequestFormVue,
		StatusRequestFormVue,
		DigitalSignRequestFormVue,
		ReturnRequestFormVue,
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
				return: false,
				review: false,
				signture: false,
				refuse: false,
				status: false,
				askForOpinions: false,
				answer: false
			},
			tab: 0,
			isSaving: {
				state: 0,
				idRequestData: 0,
				idProcessData: 0,
			},
			tabs:[
				{key:'Declaration',title:this.$t('title.create_folder')},
				{key:'Procedure',title:this.$t('tab.process_')},
				{key:'a',title:this.$t('label.digital_sign_information')},
				]
				,
			buttons:[
				{
				icon: "mdi-content-save-all",
				title: this.$t("button.save"),
				color: "blue",
				transparent: true,
				dark: false,
				event: this.save,
				},
				{
				icon: "mdi-subdirectory-arrow-left",
				title: this.$t("button.back"),
				color: "",
				transparent: true,
				dark: false,
				event: this.redirectBack,
				},
				{
				icon: "mdi-clipboard-outline",
				title: this.$t("label.request_review"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openRequestReview,
				},
				{
				icon: "mdi-clipboard-outline",
				title: this.$t("Từ chối"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openRefuse,
				},
				{
				icon: "mdi-email",
				title: this.$t("button.send_email"),
				color: "",
				transparent: true,
				dark: false,
				event: this.sendEmail,
				},
				{
				icon: "mdi-sync",
				title: this.$t("button.resend_process"),
				color: "",
				transparent: true,
				dark: false,
				event: this.processDoc,
				},
				{
				icon: "mdi-comment-alert-outline",
				title: this.$t("button.send_notice"),
				color: "",
				transparent: true,
				dark: false,
				event: this.sendNotice,
				},
				{
				icon: "mdi-clipboard-account",
				title: this.$t("label.is_required_signature"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openSignature,
				},
				{
				icon: "mdi-block-helper",
				title: this.$t("button.return"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openReturn,
				},
				{
				icon: "mdi-check",
				title: this.$t("label.approve"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openApprove,
				},
				{
				icon: "mdi-pencil-circle",
				title: this.$t("label.edit_status"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openStatus,
				},
				{
				icon: "mdi-pencil-circle",
				title: this.$t("label.ask_for_opinions"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openAskForOpinions,
				},
				{
				icon: "mdi-pencil-circle",
				title: this.$t("button.answer"),
				color: "",
				transparent: true,
				dark: false,
				event: this.openAnswer,
				},
		
			]
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
				console.log("this.requestData", this.requestData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		save() {
			console.log(10);
			this.isSaving = { state: 1 };
		},
		openApprove() {
			this.dialog.approve = true;
			this.isSaving = { state: 2 };
		},
		openStatus() {
			this.dialog.status = true;
			this.isSaving = { state: 2 };
		},
		openAskForOpinions() {
			this.dialog.askForOpinions = true;
			this.isSaving = { state: 2 };
		},
		openAnswer() {
			this.dialog.answer = true;
			this.isSaving = { state: 2 };
		},
		openRequestReview() {
			this.dialog.review = true;
			this.isSaving = { state: 2 };
		},
		openRefuse() {
			this.dialog.refuse = true;
			this.isSaving = { state: 2 };
		},
		openSignature() {
			this.dialog.signture = true;
			this.isSaving = { state: 2 };
		},
		openReturn() {
			this.dialog.return = true;
			this.isSaving = { state: 2 };
		},
		processDoc() {
			this.dialog.processDoc = true;
		},
		sendEmail() {
			this.dialog.sendEmail = true;
		},
		sendNotice() {
			this.dialog.sendNotice = true;
		},
		async handleButtonClick(event) {
			await event();
		},
	},
};
</script>

<style lang="scss" scoped></style>
