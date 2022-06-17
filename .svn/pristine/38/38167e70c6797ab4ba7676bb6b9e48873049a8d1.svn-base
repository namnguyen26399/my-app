<template>
	<v-card>
		<v-toolbar>
			<v-toolbar-title>
				{{ formTitle }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="white mt-3">
			<VuePerfectScrollbar>
				<v-container>
					<v-row>
						<v-col>
							<v-text-field
								ref="stepName"
								dense
								outlined
								:rules="[
									() =>
										m_editedItem.stepName.trim().length <=
											255 ||
										$t('message.maxlength_required_255'),
								]"
								v-model="m_editedItem.stepName"
								:error-messages="stepNameMessage"
								@keyup="onchangeStepName"
							>
								<template v-slot:label>
									{{ $t("label.step_name") }}
									<span class="text-red">{{
										$t("label.star")
									}}</span>
								</template>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea
								ref="description"
								outlined
								:rules="[
									() =>
										m_editedItem.description.trim()
											.length <= 255 ||
										$t('message.maxlength_required_255'),
								]"
								dense
								v-model="m_editedItem.description"
								:label="$t('label.description')"
							></v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field
								v-click-outside="onClickOutsideProcessingTerm"
								ref="processingTerm"
								dense
								type="number"
								outlined
								v-model="m_editedItem.processingTerm"
								:label="$t('label.processing_term')"
								append-icon="mdi-clock"
								suffix="Giờ"
								:error-messages="processTermMessage"
								@change="onchangeProcessingTerm"
								@keyup="onchangeProcessingTerm"
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isExamine"
								:label="$t('label.is_examine')"
							>
							</v-checkbox>
						</v-col>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isRequestModify"
								:label="$t('label.is_request_modify')"
							>
							</v-checkbox>
						</v-col>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isProcessRecover"
								:label="$t('label.is_process_recover')"
							>
							</v-checkbox>
						</v-col>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isCreateTFSTask"
								:label="$t('label.required_tfs')"
							>
							</v-checkbox>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isSendMail"
								:label="$t('label.allow_send_email')"
							></v-checkbox>
						</v-col>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isRequiredSignature"
								:label="$t('label.is_required_signature')"
							></v-checkbox>
						</v-col>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isAuthorizedApproval"
								:label="$t('label.is_authorized_approval')"
							></v-checkbox>
						</v-col>
						<v-col cols="12" md="3">
							<v-checkbox
								v-model="m_editedItem.isActive"
								:label="$t('label.is_active')"
							></v-checkbox>
						</v-col>
					</v-row>

					<v-row>
						<v-combobox
							ref="cbbOranization"
							v-model="m_editedItem.organization"
							:items="listOrganzine"
							item-text="organizationName"
							:item-value="(item) => item"
							:label="$t(`label.organization`)"
							dense
							outlined
							clearable
							@click:clear="removeOrganization"
							maxlength="255"
						>
							<template v-slot:item="{ item }">
								<v-list-item @click="selectOrganization(item)">
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													item.organizationName,
												)
											}}
										</span>
									</v-avatar>
									{{ item.organizationName }}
								</v-list-item>
							</template>
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									v-if="!!item && !!item.id"
									v-bind="attrs"
									class="mt-2"
								>
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													item.organizationName,
												)
											}}
										</span>
									</v-avatar>
									{{ item.organizationName }}
								</v-chip>
							</template>
						</v-combobox>
					</v-row>
					<v-row>
						<v-combobox
							ref="cbbRank"
							v-model="m_editedItem.rank"
							:items="listRank"
							item-text="rankName"
							:item-value="(item) => item"
							:label="$t(`label.rank`)"
							dense
							outlined
							clearable
							maxlength="255"
						>
							<template v-slot:item="{ item }">
								<v-list-item @click="selectRank(item)">
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(item.rankName, 2)
											}}
										</span>
									</v-avatar>
									{{ item.rankName }}
								</v-list-item>
							</template>
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									v-if="!!item && !!item.id"
									v-bind="attrs"
									class="mt-2"
								>
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(item.rankName, 2)
											}}
										</span>
									</v-avatar>
									{{ item.rankName }}
								</v-chip>
							</template>
						</v-combobox>
					</v-row>
				</v-container>
			</VuePerfectScrollbar>
		</v-card-text>

		<v-card-actions class="white">
			<v-spacer></v-spacer>
			<v-btn color="error" dark @click="closeDialog" class="rounded-pill">
				<v-icon>mdi-close </v-icon>
				{{ $t("button.close") }}
			</v-btn>
			<v-btn
				color="blue darken-1"
				dark
				@click="save"
				class="rounded-pill"
			>
				<v-icon>mdi-content-save</v-icon>
				{{ $t("button.save") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	name: "EditProcessStep",
	components: { VuePerfectScrollbar },
	props: { editedItem: {} },
	data() {
		return {
			user_current: this.getUserInfo(),
			stepNameMessage: "",
			descriptionMessage: "",
			processTermMessage: "",
			regex: /^[0-9]{1,2}(\.[0-9])?$/,
			listOrganzine: [],
			listRank: [],
			editedIndex: -1,
			m_editedItem: {
				createdDate: null,
				created: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modified: null,
				isAuthorizedApproval: false,
				isBack: false,
				isCreateTFSTask: false,
				isEdit: false,
				isExamine: false,
				isProcessRecover: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSendMail: false,
				tennant: null,
				optionDeny: 0,
				modifiedName: "",
				processingTerm: 0,
				stepCode: "",
				stepName: "",
				organization: null,
				rank: null,
				tennantCode: "",
				tennantName: "",
			},
			defaultItem: {
				createdDate: null,
				created: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modified: null,
				isAuthorizedApproval: false,
				isBack: false,
				isCreateTFSTask: false,
				isEdit: false,
				isExamine: false,
				isProcessRecover: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSendMail: false,
				tennant: null,
				optionDeny: 0,
				modifiedName: "",
				processingTerm: 0,
				stepCode: "",
				stepName: "",
				organization: null,
				rank: null,
				tennantCode: "",
				tennantName: "",
			},
			isSaving: false,
			errFomat: false,
		};
	},
	watch: {
		editedItem(value) {
			this.m_editedItem = value;
			this.stepNameMessage = "";
			this.processTermMessage = "";
		},
	},
	created() {
		this.initialize();
		this.getAllOrganize();
		this.getAllRank();
	},
	computed: {
		formTitle() {
			return this.editedItem.id === null
				? this.$t("title.create_step")
				: this.$t("label.edit_step");
		},
	},
	methods: {
		async initialize() {
			this.m_editedItem = this.editedItem;
		},
		async getAllOrganize() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response || !response.state) {
					return;
				}
				this.listOrganzine = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				console.log("Error", error);
				this.toastError(this.$t("error.load"));
			}
		},
		async getAllRank() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllRank(),
				);
				if (!response || !response.state) {
					return;
				}
				this.listRank = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				console.log("Error", error);
				this.toastError(this.$t("error.load"));
			}
		},
		selectRank(item) {
			this.m_editedItem.rank = item;
		},

		async selectOrganization(item) {
			this.m_editedItem.organization = item;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllRankByOrganizaionId(item.id),
			);
			if (!response || !response.state) return;
			this.listRank = response.data.filter((entry) => {
				return !entry.isDelete && entry.isActive;
			});
			this.m_editedItem.rank = null;
		},
		async removeOrganization() {
			this.m_editedItem.rank = null;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllRank(),
			);
			if (!response || !response.state) return;
			this.listRank = response.data.filter((entry) => {
				return !entry.isDelete && entry.isActive;
			});
		},
		async save() {
			console.log("processingTerm", this.m_editedItem.processingTerm);
			await this.onClickOutsideProcessingTerm();
			if (this.isSaving || this.m_editedItem.stepName.trim() == "") {
				this.$refs["stepName"].focus();
				this.stepNameMessage = this.$t("message.msg_1");
				return;
			}
			this.stepNameMessage = "";
			let response;

			if (this.m_editedItem.stepName.trim().length > 255) {
				this.toastError(this.$t("error.max_length_255"));
				this.$refs["stepName"].focus();
				return;
			}
			if (this.m_editedItem.description.trim().length > 255) {
				this.toastError(this.$t("error.max_length_255"));
				this.$refs["description"].focus();
				return;
			}
			if (
				(this.m_editedItem.processingTerm &&
					this.m_editedItem.processingTerm < 0) ||
				this.errFomat
			) {
				this.processTermMessage = this.$t("message.error_format");
				this.$refs["processingTerm"].focus();
				this.toastError(this.$t("message.add_error"));
				return;
			}
			this.m_editedItem.stepName.trim();
			this.m_editedItem.description.trim();
			this.isSaving = true;
			try {
				if (!this.m_editedItem.id) {
					this.m_editedItem.created = this.user_current;
					this.m_editedItem.createdName = this.user_current.fullName;
					this.m_editedItem.modifiedDate = new Date();
					this.m_editedItem.createdDate = new Date();
					this.m_editedItem.modifiedName = this.user_current.fullName;
					response = await globalService.postData_Async(
						administratorAPI.API_CreateStep(),
						this.m_editedItem,
					);
					if (!response.state) {
						this.isSaving = false;
						this.toastError(this.$t("message.add_error"));
					} else {
						this.toastSuccess(this.$t("message.add_success"));
						this.isSaving = false;
					}
				} else {
					this.m_editedItem.modifiedDate = new Date();
					this.m_editedItem.modifiedName = this.user_current.fullName;
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateStep(this.m_editedItem.id),
						this.m_editedItem,
					);
					if (!response.state) {
						this.isSaving = false;
						this.toastError(this.$t("message.update_error"));
					}
					this.toastSuccess(this.$t("message.update_success"));
				}
				this.m_editedItem = this.defaultItem;
				this.isSaving = false;
				this.closeDialog();
			} catch (error) {
				this.toastError(this.$t("error.load"));
			} finally {
				this.m_editedItem = this.defaultItem;
				this.isSaving = false;
				this.closeDialog();
			}
		},
		onchangeStepName() {
			this.stepNameMessage = "";
		},
		onchangeProcessingTerm() {
			if (
				!/e/.test(this.m_editedItem.processingTerm) &&
				!this.regex.test(this.m_editedItem.processingTerm)
			) {
				this.processTermMessage = this.$t("message.error_format");
				this.errFomat = true;
			} else {
				this.errFomat = false;
				this.processTermMessage = "";
			}
		},
		onClickOutsideProcessingTerm() {
			if (!this.m_editedItem.processingTerm) {
				this.errFomat = false;
				this.m_editedItem.processingTerm = 0;
				this.processTermMessage = "";
			}
		},
	},
};
</script>
<style>
.v-input__control {
	text-align: top !important;
}
</style>
