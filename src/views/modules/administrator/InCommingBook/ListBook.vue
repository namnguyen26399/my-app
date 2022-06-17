<template>
	<v-card elevation="0" class="p-2">
		<BreadcrumbsVue />
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listBook"
			multi-sort
			show-select
			item-key="id"
			class="grey lighten-5"
			loading="true"
			:loading-text="$t('label.loading')"
			:no-data-text="$t('message.no_data')"
			:no-results-text="$t('message.no_results')"
		>
			<template v-slot:[`item.dispatchBookOrgs`]="{ item }">
				<div v-if="item && item.dispatchBookOrgs.length > 0">
					<span v-for="org of item.dispatchBookOrgs" :key="org">
						{{ org.organizationName }}
					</span>
				</div>
			</template>
			<template v-slot:[`item.modifiedName`]="{ item }">
				<template>
					<v-avatar color="indigo mr-2" size="28">
						<span class="white--text">
							{{ getAvatarText(item.modifiedName, 2) }}
						</span>
					</v-avatar>
					{{ item.modifiedName }}
				</template>
			</template>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>
			<template v-slot:top>
				<v-toolbar flat>
					<v-dialog v-model="dialog.edit" width="60vw">
						<template v-slot:activator="{ on, attrs }">
							<v-card-title class="w-full">
								<v-btn text class="rounded-0">
									{{ $t("label.show_all") }}
									<v-icon> mdi-menu-down </v-icon>
								</v-btn>
								<v-btn
									text
									class="rounded-0"
									v-bind="attrs"
									@click="
										editedItem = Object.assign(
											{},
											defaultItem,
										)
									"
									v-on="on"
								>
									<v-icon> mdi-plus </v-icon>
									{{ $t("button.create") }}
									<v-icon>mdi-menu-down</v-icon>
								</v-btn>
								<v-btn
									class="rounded-0"
									text
									@click="deleteAll"
								>
									<v-icon>mdi-delete-outline</v-icon>
									{{ $t("button.delete_all") }}
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn icon @click="filterExist = !filterExist">
									<v-icon>mdi-filter </v-icon>
								</v-btn>
							</v-card-title>
						</template>
						<EditBook
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
				<tr v-if="filterExist">
					<td></td>
					<!-- <td>
						<v-text-field
							v-model="s_incomingBookCode"
							type="string"
							:label="'Mã công văn'"
							class="mt-2"
							outlined
							dense
							maxlength="255"
						></v-text-field>
					</td> -->
					<td>
						<v-text-field
							v-model="s_incomingBookName"
							type="string"
							:label="$t('label.name')"
							class="mt-2"
							outlined
							dense
							maxlength="255"
						></v-text-field>
					</td>

					<td>
						<v-select
							v-model="organizations"
							:items="filterOrganization"
							item-text="organizationName"
							:item-value="(item) => item.organizationName"
							:label="$t('label.organize_use')"
							class="mt-2"
							dense
							outlined
						></v-select>
					</td>
					<td>
						<v-text-field
							v-model="s_description"
							type="string"
							:label="$t('label.description')"
							class="mt-2"
							outlined
							dense
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="s_modifiedName"
							type="string"
							:label="$t('label.modified_name')"
							class="mt-2"
							outlined
							dense
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
					<!-- <td class="w-5">
						<v-select
							v-model="isActive"
							:items="filterItems"
							:label="$t('label.is_active')"
							class="mt-2"
							outlined
							dense
							width="20"
						></v-select>
					</td> -->
					<!-- <td>
						<v-text-field
							v-model="s_tong"
							:label="'Tổng'"
							class="mt-2"
							outlined
							dense
							maxlength="255"
						></v-text-field>
					</td> -->
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
						class="mr-2"
						@click="editItem(item)"
						color="blue darken-1"
						dark
					>
						mdi-pencil-circle
					</v-icon>
					<v-icon icon color="red" @click="deleteItem(item)">
						mdi-close-circle
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
import EditBook from "./EditBook.vue";
export default {
	components: {
		DeleteDialogVue,
		BreadcrumbsVue,
		EditBook,
	},
	data() {
		return {
			showModifyDatePicker: false,
			s_modifiedDate: null,
			s_incomingBookCode: "",
			s_incomingBookName: "",
			s_modifiedName: "",
			s_description: "",
			s_tong: 0,
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			organizations: this.$t("label.show_all"),
			filterOrganization: [],
			listBook: [],
			selected: [],
			editedIndex: -1,
			dateFormat: "DD/MM/yyyy",
			defaultItem: {
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				creater: null,
				description: "",
				id: null,
				incomingBookCode: "",
				incomingBookName: "",
				isActive: true,
				isDelete: false,
				modifiedDDate: null,
				modifiedName: "",
				modifier: null,
				organization: null,
				organizationCode: "",
				organizationName: "",
				totalDoc: 0,
			},
			editedItem: {
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				creater: null,
				description: "",
				id: null,
				incomingBookCode: "",
				incomingBookName: "",
				isActive: true,
				isDelete: false,
				modifiedDDate: null,
				modifiedName: "",
				modifier: null,
				organization: null,
				organizationCode: "",
				organizationName: "",
				totalDoc: 0,
			},
			headers: [
				// {
				// 	text: "Mã công văn",
				// 	value: "incomingBookCode",
				// 	filter: (value) => {
				// 		if (!this.s_incomingBookCode.trim()) return true;
				// 		if (!value) return;
				// 		return this.nonAccentVietnamese(value)
				// 			.toLocaleUpperCase()
				// 			.includes(
				// 				this.nonAccentVietnamese(
				// 					this.s_incomingBookCode,
				// 				)
				// 					.toLocaleUpperCase()
				// 					.trim(),
				// 			);
				// 	},
				// },
				{
					text: this.$t("label.name"),
					value: "dispatchBookName",
					filter: (value) => {
						if (!this.s_incomingBookName.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.s_incomingBookName,
								)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},

				{
					text: this.$t("label.organize_use"),
					value: "dispatchBookOrgs",
					// filter: (value) => {
					// 	if (this.organizations == this.$t("label.show_all"))
					// 		return true;
					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(this.organizations)
					// 				.toLocaleUpperCase()
					// 				.trim(),
					// 		);
					// },
				},
				{
					text: this.$t("label.description"),
					value: "description",
					filter: (value) => {
						if (!this.s_description.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.s_description)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},

				{
					text: this.$t("label.modified_name"),
					value: "modifiedName",

					filter: (value) => {
						if (!this.s_modifiedName) return true;
						return value.includes(this.s_modifiedName);
					},
				},
				{
					text: this.$t("label.modified_date"),
					value: "modifiedDDate",
					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.s_modifiedDate) return true;
						return value.includes(this.s_modifiedDate);
					},
				},

				// {
				// 	text: this.$t("label.is_active"),
				// 	value: "isActive",
				// 	filter: (value) => {
				// 		if (this.isActive == this.$t("label.used")) {
				// 			return value == true;
				// 		}
				// 		if (this.isActive == this.$t("label.unused")) {
				// 			return value == false;
				// 		}
				// 		return true;
				// 	},
				// },
				// {
				// 	text: "Tổng",
				// 	value: "totalDoc",
				// 	filter: (value) => {
				// 		if (!this.s_tong) return true;
				// 		return value == this.s_tong;
				// 	},
				// },
				{
					// width: "6rem",
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			dialog: {
				edit: false,
				delete: false,
			},
		};
	},
	created() {
		this.$Progress.start();
		this.load();
	},
	mounted() {
		this.$Progress.finish();
	},
	watch: {
		"dialog.edit"(val) {
			if (!val) {
				this.load();
				this.editedItem = Object.assign({}, this.defaultItem);
			}
		},
	},
	computed: {
		formatModifyDateFns() {
			return this.s_modifiedDate
				? moment(this.s_modifiedDate).format(this.dateFormat)
				: "";
		},
	},
	methods: {
		async load() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetBook(),
			);
			if (!response || !response.state) return;
			this.listBook = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.listBook = this.sortList(this.listBook);
			this.getAllOrganzation();
		},
		async getAllOrganzation() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response || !response.state) return;
				this.filterOrganization = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.filterOrganization.unshift(this.$t("label.show_all"));
			} catch (error) {
				this.toastError(error);
			}
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
					administratorAPI.API_DeleteAllInComingBook(),
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
				this.load();
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
			this.editedIndex = this.listBook.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.edit = true;
		},
		deleteItem(item) {
			this.selected = [item];
			this.editedItem = Object.assign({}, item);
			this.dialog.delete = true;
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
	},
};
</script>

<style></style>
