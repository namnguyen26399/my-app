<template>
	<v-card>
		<v-toolbar>
			<v-toolbar-title> Chỉnh sửa mã OTP </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col>
						<v-menu
							v-model="showModifyDatePicker"
							:close-on-content-click="false"
							max-width="290"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatModifyDateFns"
									clearable
									:label="$t('label.expire_date')"
									class="mt-2"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="
										m_editedItem.expiryDate = null
									"
									outlined
									dense
								></v-text-field>
							</template>
							<v-date-picker
								v-model="m_editedItem.expiryDate"
								@change="showModifyDatePicker = false"
								no-title
								scrollable
							></v-date-picker>
						</v-menu>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-checkbox
							:label="$t('label.is_active')"
							v-model="m_editedItem.isActive"
						>
						</v-checkbox>
					</v-col>
				</v-row>
			</v-container>
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
import moment from "moment";
export default {
	props: { editedItem: {} },
	data() {
		return {
			user_current: this.getUserInfo(),
			dateFormat: "DD/MM/yyyy",
			showModifyDatePicker: false,
			m_editedItem: {
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				id: null,
				isActive: false,
				expiryDate: null,
				isCustomerSign: false,
				isDelete: false,
				link: "",
				modifiedName: "",
				modifiedate: null,
				numberDownload: 0,
				numberPrint: 0,
				numberView: 0,
				oPTCode: "",
				requestData: null,
			},
		};
	},
	watch: {
		editedItem(value) {
			this.m_editedItem = value;
		},
	},
	created() {
		this.m_editedItem = this.editedItem;
	},
	computed: {
		formatModifyDateFns() {
			return this.m_editedItem.expiryDate
				? moment(this.m_editedItem.expiryDate).format(this.dateFormat)
				: "";
		},
	},
	methods: {
		async save() {
			console.log("save", this.m_editedItem);
			this.m_editedItem.expiryDate = moment(
				this.m_editedItem.expiryDate,
			).toDate();
			this.modifiedName = this.user_current.fullName;
			this.modifiedDDate = new Date();
			let response = await globalService.putData_Async(
				administratorAPI.API_UpdateOTP(this.m_editedItem.id),
				this.m_editedItem,
			);
			if (!response || !response.state)
				return this.toastError(this.$t("message.update_error"));
			this.toastSuccess(this.$t("message.update_success"));
			console.log("res", response);
			this.closeDialog();
		},
	},
};
</script>

<style></style>
