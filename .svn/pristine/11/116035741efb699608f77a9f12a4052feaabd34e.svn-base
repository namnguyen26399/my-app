<template>
	<v-card elevation="0" class="p-2">
		<BreadcrumbsVue />
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listOTP"
			multi-sort
			show-select
			class="grey lighten-5"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:no-data
				><h1>{{ $t("message.no_data") }}</h1></template
			>
			<template v-slot:no-results
				><h1>{{ $t("message.no_results") }}</h1>
			</template>
			<template v-slot:[`item.isActive`]="{ item }">
				<v-simple-checkbox
					v-model="item.isActive"
					disabled
				></v-simple-checkbox>
			</template>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>
			<template v-slot:[`item.requestData`]="{ item }">
				<template>
					<v-chip
						v-for="request of item.requestData"
						:key="request.id"
						v-bind="item"
					>
						{{ request.requestDataName }}
					</v-chip>
				</template>
				<!-- <template v-else>
					<div
						v-for="(organization, key) of item.organizations"
						v-bind="item"
						:key="organization.id"
					>
						<v-chip v-if="key < 1">
							{{ organization.organizationName }}
						</v-chip>
					</div>
				</template>
				<span
					v-if="item.organizations.length > 2 && !item.showAll"
					@click="toggle_detail(index)"
				>
					<a href="#"><i>Chi tiết</i></a>
				</span>
				<span
					v-if="item.organizations.length > 2 && item.showAll"
					@click="toggle_detail(index)"
				>
					<a href="#"><i>Ẩn</i></a>
				</span> -->
			</template>
			<template v-slot:top>
				<v-toolbar flat>
					<v-dialog v-model="dialog.edit" width="40vw">
						<template v-slot:activator="{}">
							<v-card-title class="p-0 w-full">
								<!-- <v-btn
									color="blue darken-1"
									dark
									class="mb-4 mr-2 rounded-pill"
									v-bind="attrs"
									@click="
										editedItem = Object.assign(
											{},
											defaultItem,
										)
									"
								>
									<v-icon color="white">
										mdi-plus-circle
									</v-icon>
									{{ $t("button.create") }}
								</v-btn> -->
								<v-btn
									text
									class="mb-4 mr-2 rounded-pill"
									@click="deleteAll"
								>
									<v-icon>mdi-trash-can-outline</v-icon>
									{{ $t("button.delete_all") }}
								</v-btn>
							</v-card-title>
						</template>
						<CreateOTP
							:editedItem="editedItem"
							@close="onCloseDialog"
						/>
					</v-dialog>
					<v-dialog v-model="dialog.delete" width="fit-content">
						<DeleteDialogVue
							@close="onCloseDialog"
							@confirmDelete="onConfirmDelete"
						/>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="s_otpCode"
							type="string"
							:label="'Mã OTP'"
							class="mt-2"
							outlined
							dense
							:rules="[
								() =>
									s_otpCode.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-select
							v-model="s_request"
							:label="'Yêu cầu'"
							:items="filterRequest"
							item-text="requestName"
							:item-value="(item) => item.requestName"
							class="mt-2"
							outlined
							dense
							maxlength="255"
						></v-select>
					</td>
					<td>
						<v-menu
							v-model="showExpireDate"
							:close-on-content-click="false"
							max-width="290"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatExpireDateFns"
									clearable
									:label="$t('label.expire_date')"
									class="mt-2"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="s_expiredate = null"
									outlined
									dense
								></v-text-field>
							</template>
							<v-date-picker
								v-model="s_expiredate"
								@change="showExpireDate = false"
								no-title
								scrollable
							></v-date-picker>
						</v-menu>
					</td>
					<td>
						<v-text-field
							v-model="s_modifiedName"
							type="string"
							:label="$t('label.modified_name')"
							class="mt-2"
							outlined
							dense
							:rules="[
								() =>
									s_modifiedName.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
						></v-text-field>
					</td>

					<td>
						<v-menu
							v-model="showModifyDatePicker"
							:close-on-content-click="false"
							max-width="290"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatModifyDateFns"
									clearable
									:label="$t('label.modified_date')"
									class="mt-2"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="s_modifiedDate = null"
									outlined
									dense
								></v-text-field>
							</template>
							<v-date-picker
								v-model="s_modifiedDate"
								@change="showModifyDatePicker = false"
								no-title
								scrollable
							></v-date-picker>
						</v-menu>
					</td>
					<td class="w-5">
						<v-select
							v-model="isActive"
							:items="filterItems"
							:label="$t('label.is_active')"
							class="mt-2"
							outlined
							dense
							width="20"
						></v-select>
					</td>
					<td></td>
				</tr>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<div class="d-flex" style="min-width: fit-content">
					<!-- <v-icon
						small
						class="mr-2"
						@click="viewItem(item)"
						color="blue darken-1"
						dark
					>
						mdi-eye
					</v-icon> -->
					<v-icon
						small
						class="mr-2"
						@click="editItem(item)"
						color="blue darken-1"
						dark
					>
						mdi-pencil
					</v-icon>
					<v-icon small @click="deleteItem(item)" color="error">
						mdi-trash-can-outline
					</v-icon>
				</div>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import moment from "moment";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import CreateOTP from "./CreateOTP.vue";
export default {
	name: "ListOTP",
	components: {
		DeleteDialogVue,
		BreadcrumbsVue,
		CreateOTP,
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			showPicker: false,
			showModifyDatePicker: false,
			showExpireDate: false,
			dateFormat: "DD/MM/yyyy",
			s_expiredate: null,
			s_request: this.$t("label.show_all"),
			createdDate: null,
			s_modifiedDate: null,
			s_modifiedName: "",
			createdName: "",
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			s_otpCode: "",
			headers: [
				{
					text: "Mã OTP",
					value: "oPTCode",
					filter: (value) => {
						if (!this.s_otpCode.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.s_otpCode)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},
				{
					text: "Yêu cầu",
					value: "requestData",
					filter: (value) => {
						if (
							this.s_request == this.$t("label.show_all") ||
							!value
						)
							return true;
						return value.filter((entry) => {
							this.nonAccentVietnamese(entry.requestName)
								.toLocaleUpperCase()
								.includes(
									this.nonAccentVietnamese(this.s_request)
										.toLocaleUpperCase()
										.trim(),
								);
						}).length;
					},
				},

				{
					text: this.$t("label.expire_date"),
					value: "expiryDate",
					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.s_expiredate) return true;
						return value.includes(this.s_expiredate);
					},
				},
				{
					text: this.$t("label.modified_name"),
					value: "modifiedName",

					filter: (value) => {
						if (!this.modifiedDate) return true;
						return value.includes(this.s_modifiedName);
					},
				},
				{
					text: this.$t("label.modified_date"),
					value: "modifiedate",
					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.s_modifiedDate) return true;
						return value.includes(this.s_modifiedDate);
					},
				},
				{
					text: this.$t("label.is_active"),
					value: "isActive",
					filter: (value) => {
						if (this.isActive == this.$t("label.used")) {
							return value == true;
						}
						if (this.isActive == this.$t("label.unused")) {
							return value == false;
						}
						return true;
					},
				},

				{
					// width: "6rem",
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			defaultItem: {
				createdDate: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				id: 0,
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
			editedItem: {
				createdDate: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				id: 0,
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
			listOTP: [],
			dialog: {
				edit: false,
				delete: false,
			},
			selected: [],
			editedIndex: -1,
			isDeleting: false,
			filterRequest: [],
		};
	},
	async created() {
		this.$Progress.start();
		this.getAllOTP();
		this.getAllRequest();
	},
	mounted() {
		this.$Progress.finish();
	},
	computed: {
		formatModifyDateFns() {
			return this.s_modifiedDate
				? moment(this.s_modifiedDate).format(this.dateFormat)
				: "";
		},
		formatExpireDateFns() {
			return this.s_expiredate
				? moment(this.s_expiredate).format(this.dateFormat)
				: "";
		},
	},
	watch: {
		"dialog.edit"(val) {
			if (!val) {
				this.getAllOTP();
				this.editedItem = Object.assign({}, this.defaultItem);
			}
		},
	},
	methods: {
		async getAllOTP() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllOTP(),
				);
				if (!response || !response.state)
					return this.toastError(this.$t("error.load"));

				this.listOTP = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.sortList(this.listOTP);
			} catch (error) {
				this.toastError(this.$t("error.load"));
			}
		},
		async getAllRequest() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequest(),
				);
				if (!response || !response.state)
					return this.toastError(this.$t("error.load"));

				this.filterRequest = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.filterRequest.unshift(this.$t("label.show_all"));
			} catch (error) {
				this.toastError(this.$t("error.load"));
			}
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
		onCloseDialog() {
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.dialog.edit = false;
			this.dialog.delete = false;
		},
		onConfirmDelete(value) {
			if (!value) {
				this.onCloseDialog();
			} else {
				if (this.selected) {
					this.deleteAllConfirm();
				}
			}
		},
		deleteAll() {
			if (this.selected.length > 0) {
				this.dialog.delete = true;
			} else {
				this.toastError(this.$t("label.no_selected"));
			}
		},
		async deleteAllConfirm() {
			if (this.isDeleting) {
				return;
			}
			this.isDeleting = true;
			this.selected = this.selected.map((x) => {
				x.isDelete = true;
				return x;
			});
			try {
				let response = await globalService.postData_Async(
					administratorAPI.API_DeleteAllOTP(),
					this.selected,
				);
				if (!response || !response.state) {
					this.isDeleting = false;
					this.toastError(this.$t("message.delete_error"));
				} else {
					this.toastSuccess(this.$t("message.delete_success"));
				}
			} catch (error) {
				this.toastError(this.$t("error.load"));
			} finally {
				this.selected = [];
				this.isDeleting = false;
				this.getAllOTP();
				this.close();
			}
		},
		close() {
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.dialog.edit = false;
			this.dialog.delete = false;
		},
		editItem(item) {
			this.editedIndex = this.listOTP.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.edit = true;
		},
		deleteItem(item) {
			this.selected = [item];
			this.editedItem = Object.assign({}, item);
			this.dialog.delete = true;
		},
	},
};
</script>

<style></style>
