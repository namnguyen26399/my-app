<template>
	<v-card>
		<BreadcrumbsVue />
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listStatus"
			multi-sort
			show-select
			item-key="id"
			class="grey lighten-5"
			:loading="!listStatus"
			:loading-text="$t('label.loading')"
			:no-data-text="$t('message.no_data')"
			:no-results-text="$t('message.no_results')"
		>
			<!-- <template v-slot:[`item.isActive`]="{ item }">
				<v-simple-checkbox
					v-model="item.isActive"
					disabled
				></v-simple-checkbox>
			</template> -->
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
					<v-dialog v-model="dialog.edit" width="40vw">
						<template v-slot:activator="{ on, attrs }">
							<v-card-title class="p-0 w-full">
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
									<v-icon> mdi-menu-down </v-icon>
								</v-btn>
								<v-btn
									text
									class="rounded-0"
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
						<EditStatusVue
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
							v-model="s_statusCode"
							:label="$t('label.status_code')"
							class="mt-2"
							outlined
							dense
							maxlength="255"
						></v-text-field>
					</td> -->

					<td>
						<v-text-field
							v-model="s_statusName"
							:label="$t('label.status_name')"
							class="mt-2"
							outlined
							dense
							solo
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-select
							v-model="s_status_type"
							:items="[
								$t('label.all'),
								$t('label.is_end'),
								$t('label.is_not_end'),
							]"
							:label="$t('label.is_end')"
							dense
							outlined
							solo
							class="mt-2"
						></v-select>
					</td>
					<td>
						<v-text-field
							v-model="s_description"
							:label="$t('label.description')"
							class="mt-2"
							outlined
							dense
							solo
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="s_modifiedName"
							:label="$t('label.modified_name')"
							class="mt-2"
							outlined
							dense
							solo
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
									solo
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
					<td></td>
				</tr>
			</template>
			<template v-slot:[`item.statusType`]="{ item }">
				<v-checkbox v-model="item.statusType" disabled></v-checkbox>
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
					<v-icon @click="deleteItem(item)" color="red">
						mdi-close-circle
					</v-icon>
				</div>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import moment from "moment";
import EditStatusVue from "./EditStatus.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";

export default {
	name: "ListStatus",
	components: { EditStatusVue, DeleteDialogVue, BreadcrumbsVue },
	async created() {
		await this.load();
	},
	mounted() {},
	computed: {
		formatModifyDateFns() {
			return this.s_modifiedDate
				? moment(this.s_modifiedDate).format(this.dateFormat)
				: "";
		},
	},
	watch: {
		"dialog.edit"(val) {
			if (!val) {
				this.load();
				this.selected = [];
				this.editedItem = Object.assign({}, this.defaultItem);
			}
		},
		"dialog.delete"(val) {
			if (!val) {
				this.selected = [];
			}
		},
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			showModifyDatePicker: false,
			s_status_type: this.$t("label.show_all"),
			dateFormat: "DD/MM/yyyy",
			listStatus: [],
			s_statusName: "",
			s_statusCode: "",
			isEnd: 1,
			s_modifiedDate: null,
			s_modifiedName: "",
			s_description: "",
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			headers: [
				{
					text: this.$t("label.status_name"),
					value: "statusName",
					filter: (value) => {
						if (!this.s_statusName.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.s_statusName)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},
				{
					text: this.$t("label.is_end"),
					value: "statusType",
					filter: (value) => {
						if (this.s_status_type == this.$t("label.is_end")) {
							return value == true;
						}
						if (this.s_status_type == this.$t("label.is_not_end")) {
							return value != true;
						}
						return true;
					},
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
						if (!this.s_modifiedName.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.s_modifiedName)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},
				{
					text: this.$t("label.modified_date"),
					value: "modifiedDate",
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

				{
					// width: "6rem",
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			defaultItem: {
				created: null,
				createdDate: null,
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
			editedItem: {
				created: null,
				createdDate: null,
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
			dialog: {
				edit: false,
				delete: false,
			},
			selected: [],
			editedIndex: -1,
			isDeleting: false,
		};
	},
	methods: {
		async load() {
			await this.getAllStatus();
		},
		async getAllStatus() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllStatus(),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.listStatus = response.data
				.filter((v) => !v.isDelete)
				.map((ele) => {
					if (ele.statusType == "true") ele.statusType = true;
					else ele.statusType = false;
					return ele;
				});
			this.listStatus = this.sortList(this.listStatus);
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
			let response;
			try {
				for (let item of this.selected) {
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateStatus(item.id),
						item,
					);
					if (!response || !response.state) {
						this.isDeleting = false;
						this.toastError(this.$t("message.delete_error"));
						await this.load();
						return;
					}
				}
			} catch (error) {
				this.toastError(this.$t("error.load"));
			} finally {
				this.selected = [];
				this.isDeleting = false;
				await this.load();
				this.load();
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
		close() {
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.dialog.edit = false;
			this.dialog.delete = false;
		},
		editItem(item) {
			this.editedIndex = this.listStatus.indexOf(item);
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
