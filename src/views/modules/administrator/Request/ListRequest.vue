<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog v-model="dialog.delete" persistent width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="requests"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			:custom-filter="customFilter"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:top>
				<v-card-title class="p-0 w-full">
					<router-link
						:to="{
							path: '/administrator/loai-yeu-cau/tao-moi',
						}"
						style="text-decoration: none; margin-right: 1rem"
						color="blue darken-1"
						dark
						text
					>
						<v-btn
							color="blue darken-1"
							dark
							class="rounded-pill mb-4"
						>
							<v-icon color="white"> mdi-plus-circle </v-icon>
							{{ $t("button.create") }}
						</v-btn>
					</router-link>
					<v-btn
						color="error"
						class="rounded-pill mb-4"
						dark
						@click="deleteAll"
					>
						<v-icon color="white"> mdi-trash-can-outline </v-icon>
						{{ $t("button.delete_all") }}
					</v-btn>
					<v-spacer></v-spacer>
					<!-- <v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						:label="$t('title.search')"
						outlined
						dense
						single-line
						class="mt-2 mx-4"
						@keyup="onKeyUpForSearchAll"
						:error-messages="errorMessageSearchAll"
					></v-text-field> -->
				</v-card-title>
			</template>

			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="requestCode"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.request_code')"
							@keyup="onKeyUpSearchForRequestCode"
							:error-messages="errorMessageSearchRequestCode"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="requestName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.request_name')"
							@keyup="onKeyUpSearchForRequestName"
							:error-messages="errorMessageSearchRequestName"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="createdName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.created_name')"
							@keyup="onKeyUpSearchForCreatedName"
							:error-messages="errorMessageSearchCreatedName"
						></v-text-field>
					</td>
					<td>
						<v-menu
							v-model="showPicker"
							:close-on-content-click="false"
							max-width="290"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatDateFns"
									clearable
									:label="$t('label.created_date')"
									class="mt-2"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="createdDate = null"
									outlined
									dense
								></v-text-field>
							</template>
							<v-date-picker
								v-model="createdDate"
								@change="showPicker = false"
								no-title
								scrollable
								range
							></v-date-picker>
						</v-menu>
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
									@click:clear="modifiedDate = null"
									outlined
									dense
								></v-text-field>
							</template>
							<v-date-picker
								v-model="modifiedDate"
								@change="showModifyDatePicker = false"
								no-title
								scrollable
								range
							></v-date-picker>
						</v-menu>
					</td>
					<td>
						<v-select
							v-model="isActive"
							:items="filterItems"
							:label="$t('label.is_active')"
							outlined
							dense
							class="mt-2"
						></v-select>
					</td>
					<td></td>
				</tr>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<!-- <v-btn
					icon
					class="mr-2"
					color="blue darken-1"
					:to="{ path: `loai-yeu-cau/view/${item.id}` }"
				>
					<v-icon small> mdi-eye </v-icon>
				</v-btn> -->
				<v-btn
					icon
					class="mr-2"
					color="blue darken-1"
					:to="{ path: `${item.id}` }"
				>
					<v-icon small> mdi-pencil </v-icon>
				</v-btn>
				<v-btn icon color="red" @click="deleteItem(item)">
					<v-icon small> mdi-trash-can-outline </v-icon>
				</v-btn>
			</template>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>
			<template v-slot:[`item.isActive`]="{ item }">
				<v-simple-checkbox
					v-model="item.isActive"
					disabled
				></v-simple-checkbox>
			</template>
		</v-data-table>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
import moment from "moment";
import constant from "@/common/constant.js";
import administratorAPI from "../administrator.api";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
export default {
	name: "ListRequest",
	components: { DeleteDialogVue, BreadcrumbsVue },
	data() {
		return {
			errorMessageSearchRequestCode: "",
			errorMessageSearchRequestName: "",
			errorMessageSearchCreatedDate: "",
			errorMessageSearchAll: "",
			user_current: this.getUserInfo(),
			requestCode: "",
			requestName: "",
			createdName: "",
			createdDate: null,
			modifiedDate: null,
			dateFormat: "DD/MM/yyyy",
			isActive: this.$t("label.show_all"),
			singleSelect: false,
			showPicker: false,
			showModifyDatePicker: false,
			selected: [],
			dialog: {
				view: false,
				edit: false,
				delete: false,
			},
			updateItem: {},
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			items: [],
			search: "",
			isDeleting: false,
			isSaving: false,
			headers: [
				{
					text: this.$t("label.request_code"),
					value: "requestCode",

					filter: (value) => {
						if (!this.requestCode || !value) return true;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.requestCode)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.request_name"),
					value: "requestName",

					filter: (value) => {
						if (!this.requestName || !value) return true;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.requestName)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.created_name"),
					value: "createdName",

					filter: (value) => {
						if (!this.createdName || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.createdName)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.created_date"),
					value: "createdDate",

					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.createdDate) return true;
						return value.includes(this.createdDate);
					},
				},
				{
					text: this.$t("label.modified_date"),
					value: "modifiedDate",

					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.modifiedDate) return true;
						return value.includes(this.modifiedDate);
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
					text: this.$t("label.manipulation"),

					value: "actions",
					sortable: false,
				},
			],
			requests: [],
			errorMessageSearchCreatedName: "",
		};
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
		dialogView(val) {
			val || this.closeView();
		},
		dialogDeleteAll(val) {
			val || this.closeDeleteAll();
		},
	},

	computed: {
		formatDateFns() {
			return this.createdDate
				? moment(this.createdDate).format(this.dateFormat)
				: "";
		},
		formatModifyDateFns() {
			return this.modifiedDate
				? moment(this.modifiedDate).format(this.dateFormat)
				: "";
		},
	},

	async created() {
		this.$Progress.start();
	},
	async mounted() {
		this.$Progress.finish();
		await this.initialize();
	},

	methods: {
		async initialize() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequest(),
				);
				if (!response) {
					return;
				}
				if (!response.state) {
					return;
				}
				this.requests = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.sortList(this.requests);
			} catch (error) {
				this.toastError(error);
			}
		},

		deleteItem(item) {
			this.selected = [item];
			this.dialog.delete = true;
		},

		async deleteItemConfirm() {
			this.selected = this.selected.map((entry) => {
				entry.isDelete = true;
				return entry;
			});
			let response;
			try {
				response = await globalService.postData_Async(
					administratorAPI.API_SaveAllRequest(),
					this.selected,
				);
				if (!response || !response.state) {
					this.toastError(this.$t("message.error"));
				}
				for (let item of this.selected) {
					let index = this.requests.indexOf(item);
					this.requests.splice(index, 1);
				}
				this.selected = [];
				this.toastSuccess(this.$t("message.success"));
				this.closeDelete();
			} catch (error) {
				this.toastError(error);
			}
		},
		closeDelete() {
			this.dialog.delete = false;
		},
		closeDeleteAll() {
			this.dialog.delete = false;
		},

		customFilter(value, search, item) {
			return !!search && this.match(item, search);
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
		deleteAll() {
			if (this.selected.length > 0) {
				this.dialog.delete = true;
			} else {
				this.toastError(this.$t("message.alert_no_selected"));
			}
		},
		onKeyUpSearchForRequestCode() {
			if (this.requestCode != "" || this.requestCode.length < 255) {
				this.errorMessageSearchRequestCode = "";
			}
			if (this.requestCode.length > 255) {
				this.errorMessageSearchRequestCode = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForRequestName() {
			if (this.requestName != "" || this.requestName.length < 255) {
				this.errorMessageSearchRequestName = "";
			}
			if (this.requestName.length > 255) {
				this.errorMessageSearchRequestName = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForCreatedName() {
			if (this.createdName != "" || this.createdName.length < 255) {
				this.errorMessageSearchCreatedName = "";
			}
			if (this.createdName.length > 255) {
				this.errorMessageSearchCreatedName = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpForSearchAll() {
			if (this.search != "" || this.search.length < 255) {
				this.errorMessageSearchAll = "";
			}
			if (this.search.length > 255) {
				this.errorMessageSearchAll = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		async deleteAllConfirm() {
			if (this.isDeleting) {
				return;
			}
			this.isDeleting = true;
			this.selected = this.selected.map((entry) => {
				entry.isDelete = true;
				return entry;
			});
			let response = await globalService.postData_Async(
				"/api/_save/requests/",
				this.selected,
			);
			if (response.state) {
				this.isDeleting = true;
				this.toastSuccess(this.$t("success.delete"));
			} else {
				this.toastError(this.$t("message.error"));
			}

			this.selected = [];
			this.isDeleting = false;
			this.closeDeleteAll();
			this.initialize();
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
	},

	filters: constant.filters,
};
</script>
<style>
.v-picker__title__btn--active {
	display: none;
}
</style>
