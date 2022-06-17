<template>
	<v-card>
		<v-toolbar elevation="0" color="grey lighten-4">
			<v-toolbar-title>
				{{ $t("label.information") }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-form ref="form" class="mt-4">
			<v-container>
				<v-row class="mt-4">
					<v-col cols="6">
						<v-text-field
							dense
							outlined
							ref="status_name"
							:label="$t('label.name')"
							:rules="[
								() =>
									m_editedItem.statusName.trim().length <=
										255 || $t('message.msg_2'),
							]"
							v-model="m_editedItem.statusName"
							:error-messages="errorStatusName"
							@keyup="onchangeStatusName"
						>
							<template v-slot:label>
								{{ $t("label.name") }}
								<span class="red--text">*</span>
							</template>
						</v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							outlined
							dense
							:label="$t('label.description')"
							v-model="m_editedItem.description"
						></v-text-field>
					</v-col>
					<v-col>
						<v-checkbox
							v-model="m_editedItem.statusType"
							:label="$t('label.is_process_end')"
						></v-checkbox>
					</v-col>
				</v-row>
			</v-container>
			<v-card-actions class="white">
				<v-spacer></v-spacer>
				<v-btn
					elevation="0"
					color="blue darken-2"
					dark
					class="rounded-0"
					@click="save"
				>
					{{ $t("button.ok") }}
				</v-btn>
				<v-btn
					elevation="0"
					color="grey lighten-4"
					class="rounded-0"
					@click="closeDialog"
				>
					{{ $t("button.cancel") }}
				</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
export default {
	name: "EditStatus",
	props: { editedItem: {} },
	watch: {
		editedItem(value) {
			this.m_editedItem = value;
		},
	},
	created() {
		this.m_editedItem = this.editedItem;
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			statusName: "",
			m_editedItem: {
				created: null,
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				mailTemplate: null,
				modified: null,
				modifiedDate: null,
				modifiedName: "",
				statusCode: "",
				statusName: "",
				statusType: "",
				tennant: null,
				tennantCode: "",
				tennantName: "",
			},
			errorStatusName: "",
		};
	},
	computed: {
		form() {
			return {
				status_name: this.m_editedItem.statusName,
			};
		},
	},

	methods: {
		async save() {
			this.m_editedItem.statusName = this.m_editedItem.statusName.trim();
			this.m_editedItem.description =
				this.m_editedItem.description.trim();
			for (let key of Object.keys(this.form)) {
				if (!this.form[key]) {
					this.formHasErrors = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate(true);
			}
			if (this.m_editedItem.statusName == "") {
				this.errorStatusName = this.$t("message.msg_1");
				return;
			}
			this.m_editedItem.created = this.user_current;
			this.m_editedItem.modified = this.user_current;
			this.m_editedItem.modifiedName = this.user_current.fullName;
			this.m_editedItem.modifiedDate = new Date();
			console.log("save", this.m_editedItem);
			let response;
			try {
				if (this.m_editedItem.id) {
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateStatus(this.m_editedItem.id),
						this.m_editedItem,
					);
					if (!response || !response.state) {
						return this.toastError(this.$t("message.update_error"));
					}
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					this.m_editedItem.createdDate = new Date();
					this.m_editedItem.createdName = this.user_current.fullName;
					response = await globalService.postData_Async(
						administratorAPI.API_CreateStatus(),
						this.m_editedItem,
					);
					if (!response || !response.state) {
						return this.toastError(this.$t("message.add_error"));
					}
					this.toastSuccess(this.$t("message.add_success"));
				}
				this.closeDialog();
			} catch (error) {
				this.toastError(error);
			}
		},
		onchangeStatusName() {
			this.errorStatusName = "";
		},
	},
};
</script>

<style></style>
