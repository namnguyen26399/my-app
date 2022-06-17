<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog v-model="dialog.delete" width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="desserts"
			:single-select="singleSelect"
			item-key="id"
			show-select
		>
			<template v-slot:[`item.createdName`]="{ item }">
				<template>
					<v-avatar color="indigo mr-2" size="28">
						<span class="white--text">
							{{ getAvatarText(item.createdName, 2) }}
						</span>
					</v-avatar>
					{{ item.createdName }}
				</template>
			</template>
			<template v-slot:top>
				<v-dialog v-model="dialog.edit" width="60vw">
					<template v-slot:activator="{ on, attrs }">
						<v-card-title class="p-0 w-full">
							<v-btn
								elevation="0"
								text
								class="rounded-0"
								v-bind="attrs"
								v-on="on"
							>
								<v-icon> mdi-plus </v-icon>
								{{ $t("button.create") }}
								<v-icon> mdi-menu-down </v-icon>
							</v-btn>
							<v-btn
								elevation="0"
								text
								class="rounded-0"
								@click="deleteAll"
							>
								<v-icon> mdi-delete-outline </v-icon>
								{{ $t("button.delete_all") }}
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn icon @click="filterExist = !filterExist">
								<v-icon>mdi-filter </v-icon>
							</v-btn>
						</v-card-title>
					</template>

					<v-card>
						<v-toolbar flat color="grey lighten-4">
							<v-toolbar-title>
								{{ $t("label.information") }}
							</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon @click="dialog.edit = false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-toolbar>
						<v-card-text>
							<v-container>
								<v-form v-model="valid">
									<v-row>
										<v-col cols="12">
											<m-text-field
												:label="
													$t(
														'organization.organizationName',
													)
												"
												:value="
													editedItem.organizationName
												"
												@value="
													(v) =>
														(editedItem.organizationName =
															v)
												"
												required
											>
											</m-text-field>
											<v-select
												v-model="editedItem.orgParent"
												:items="listOrganization"
												clearable
												:label="
													$t('organization.orgParent')
												"
												outlined
												dense
												item-text="organizationName"
												:item-value="(item) => item"
												itemid="id"
											></v-select>
										</v-col>
									</v-row>
								</v-form>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								elevation="0"
								color="blue darken-2"
								class="rounded-0"
								dark
								@click="save"
							>
								{{ $t("button.ok") }}
							</v-btn>
							<v-btn
								elevation="0"
								color="grey lighten-4"
								class="rounded-0"
								@click="close"
							>
								{{ $t("button.cancel") }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>
			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr v-if="filterExist">
					<td></td>
					<td>
						<v-text-field
							v-model="organizationCode"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('organization.organizationCode')"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="organizationName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('organization.organizationName')"
							maxlength="255"
						></v-text-field>
					</td>
					<!-- <td>
						<v-text-field
							v-model="orgParentCode"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('organization.orgParentCode')"
							maxlength="255"
						></v-text-field>
					</td> -->
					<td>
						<v-text-field
							v-model="orgParentName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('organization.orgParentName')"
							maxlength="255"
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
							maxlength="255"
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
					<td class="">
						<v-select
							v-model="isActive"
							outlined
							dense
							class="mt-2"
							:items="filterItems"
							:label="$t('label.is_active')"
						></v-select>
					</td>
					<td></td>
				</tr>
			</template>

			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<div class="d-flex" style="min-width: fit-content">
					<v-icon
						class="mr-2"
						color="blue darken-1"
						@click="viewItem(item)"
					>
						mdi-eye-circle
					</v-icon>
					<v-icon
						class="mr-2"
						color="blue darken-1"
						@click="editItem(item)"
					>
						mdi-pencil-circle
					</v-icon>
					<v-icon color="red" @click="deleteItem(item)">
						mdi-close-circle
					</v-icon>
				</div>
			</template>
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
		</v-data-table>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
import moment from "moment";
import administratorAPI from "../administrator.api";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
export default {
	name: "RoleManagement",
	components: { DeleteDialogVue, BreadcrumbsVue },
	data() {
		return {
			user_current: this.getUserInfo(),
			organizationCode: "",
			organizationName: "",
			orgParentCode: "",
			orgParentName: "",
			createdName: "",
			errorMessageOrgName: "",
			dateFormat: "DD/MM/yyyy",
			createdDate: null,
			modifiedDate: null,
			singleSelect: false,
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			selected: [],
			dialog: {
				view: false,
				edit: false,
				delete: false,
			},
			search: "",
			listOrganization: [],
			isSaving: false,
			isDeleting: false,
			showPicker: false,
			showModifyDatePicker: false,
			headers: [
				{
					text: this.$t("organization.organizationCode"),
					value: "organizationCode",
					filter: (value) => {
						if (!this.organizationCode.trim() || !value)
							return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.organizationCode)
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("organization.organizationName"),
					value: "organizationName",
					filter: (value) => {
						if (!this.organizationName.trim() || !value)
							return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.organizationName)
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				// {
				// 	text: this.$t("organization.orgParentCode"),
				// 	value: "orgParent.organizationCode",
				// 	filter: (value) => {
				// 		if (!this.orgParentCode || !value) return true;

				// 		return this.nonAccentVietnamese(value)
				// 			.toLocaleUpperCase()
				// 			.includes(
				// 				this.nonAccentVietnamese(this.orgParentCode)
				// 					.trim()
				// 					.toLocaleUpperCase()
				// 					.replace(/\s+/g, " "),
				// 			);
				// 	},
				// },
				{
					text: this.$t("organization.orgParentName"),
					value: "orgParent.organizationName",
					filter: (value) => {
						if (!this.orgParentName.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.orgParentName)
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("label.created_name"),
					value: "createdName",
					filter: (value) => {
						if (!this.createdName.trim() || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.createdName)
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
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
			desserts: [],
			editedIndex: -1,
			editedItem: {
				id: null,
				organizationCode: "",
				organizationName: "",
				orgParentCode: "",
				orgParentName: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				orgParent: null,
				childOrganization: [],
				isDelete: false,
			},
			defaultItem: {
				id: null,
				organizationCode: "",
				organizationName: "",
				orgParentCode: "",
				orgParentName: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				orgParent: null,
				childOrganization: [],
				isDelete: false,
			},
		};
	},

	computed: {
		formTitle() {
			return this.editedIndex === -1
				? this.$t("title.create_organization")
				: this.$t("title.edit_organization");
		},
		form() {
			return {
				organizationName: this.editedItem.organizationName,
			};
		},
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

	watch: {
		"dialog.edit"(val) {
			val || this.close();
		},
		"dialog.delete"(val) {
			val || this.closeDelete();
		},
		"dialog.view"(val) {
			val || this.closeView();
		},
	},
	async created() {
		this.$Progress.start();
		this.initialize();
		this.GetAllOrganization();
	},
	mounted() {
		this.$Progress.finish();
	},

	methods: {
		async GetAllOrganization() {
			let response = await globalService.getData_Async(
				administratorAPI.API_FindAllOrganization(),
			);
			if (!response || !response.state) {
				return;
			}
			this.listOrganization = response.data.filter((entry) => {
				return !entry.isDelete;
			});
		},
		async initialize() {
			let response = await globalService.getData_Async(
				administratorAPI.API_FindAllOrganization(),
			);
			if (!response.state) {
				return;
			}
			this.desserts = response.data;
			this.desserts = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.sortList(this.desserts);
		},

		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.edit = true;
		},
		viewItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.editedItem.createdDate = moment(
				this.editedItem.createdDate,
			).format(this.dateFormat);
			this.editedItem.modifiedDate = moment(
				this.editedItem.modifiedDate,
			).format(this.dateFormat);
			this.dialog.view = true;
		},

		deleteItem(item) {
			this.selected = [item];
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.delete = true;
		},

		async deleteItemConfirm() {
			if (this.isDeleting) {
				return;
			}
			this.isDeleting = true;
			let response = await globalService.deleteData_Async(
				administratorAPI.API_DeleteOrganization(this.editedItem.id),
				this.editedItem,
			);
			if (!response.state) {
				this.isDeleting = true;
				this.toastError(this.$t("message.delete_error"));
			} else {
				this.toastSuccess(this.$t("message.delete_success"));
			}
			this.isDeleting = false;
			this.initialize();
			this.closeDelete();
		},
		deleteAll() {
			if (this.selected.length > 0) {
				this.dialog.delete = true;
			} else {
				this.toastError(this.$t("message.alert_no_selected"));
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
				administratorAPI.API_SaveAllOrganization(),
				this.selected,
			);
			if (response.state) {
				this.isDeleting = true;
				this.toastSuccess(this.$t("message.delete_success"));
			} else {
				this.toastError(this.$t("message.delete_error"));
			}
			console.log("xoa");
			this.selected = [];
			this.isDeleting = false;
			this.initialize();
			this.closeDeleteAll();
		},

		close() {
			this.dialog.edit = false;
			this.errorMessage = "";
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.GetAllOrganization();
		},
		closeView() {
			this.dialog.view = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialog.delete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.GetAllOrganization();
		},

		closeDeleteAll() {
			this.dialog.delete = false;
		},

		async save() {
			if (!this.validRequiredText(this.editedItem.organizationName)) {
				return;
			}
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			this.editedItem.organizationName =
				`${this.editedItem.organizationName}`.trim();
			let response;
			this.editedItem.modifiedName = this.user_current.fullName;
			this.editedItem.modifiedDate = new Date();
			try {
				if (this.editedIndex > -1) {
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateOrganization(
							this.editedItem.id,
						),
						this.editedItem,
					);
				} else {
					this.editedItem.createdName = this.user_current.fullName;
					this.editedItem.createdDate = new Date();
					response = await globalService.postData_Async(
						administratorAPI.API_CreateOrganization(),
						this.editedItem,
					);
				}
				if (response.state) {
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					this.toastError(this.$t("message.update_error"));
				}
			} catch (error) {
				this.toastError(this.$t("message.update_error"));
			} finally {
				this.isSaving = false;
				this.initialize();
				this.close();
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
};
</script>
