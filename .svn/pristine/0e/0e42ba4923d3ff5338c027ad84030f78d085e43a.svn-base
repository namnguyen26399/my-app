<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="groups"
			multi-sort
			show-select
			:loading="!groups"
			:loading-text="$t('label.loading')"
			:no-data-text="$t('message.no_results')"
			:no-results-text="$t('message.no_results')"
		>
			<template v-slot:top="{ on, attrs }">
				<v-card-title class="p-0 w-full">
					<v-btn
						elevation="0"
						class="rounded-0 text-capitalize font-weight-regular"
						v-bind="attrs"
						v-on="on"
						to="tao-moi"
						text
						append
					>
						<v-icon small class="mr-2"> mdi-plus </v-icon>
						{{ $t("button.create") }}
					</v-btn>
					<v-btn
						elevation="0"
						class="rounded-0 text-capitalize font-weight-regular"
						text
						@click="deleteAll"
					>
						<v-icon small class="mr-2">
							mdi-trash-can-outline
						</v-icon>
						{{ $t("button.delete") }}
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn icon @click="filterExist = !filterExist">
						<v-icon>mdi-filter </v-icon>
					</v-btn>
				</v-card-title>
				<v-divider></v-divider>
			</template>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>
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
			<template v-slot:[`item.roles`]="{ item }">
				<span v-if="item.roles.length > 0">
					<i v-for="role of item.roles" :key="role.id">
						{{ role.roleCode }} &nbsp;
					</i>
				</span>
			</template>
			<template v-slot:[`item.action`]="{ item }">
				<v-icon class="mr-2" color="blue" @click="editItem(item)">
					mdi-pencil-circle
				</v-icon>
				<v-icon color="error" @click="deleteItem(item)">
					mdi-close-circle
				</v-icon>
			</template>
			<template v-if="filterExist" v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="groupUser_groupName"
							:label="$t('label.group_name')"
							outlined
							dense
							class="mt-2 rounded-pill"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="groupUser_description"
							:label="$t('label.description')"
							outlined
							dense
							class="mt-2 rounded-pill"
						></v-text-field>
					</td>
					<td>
						<!-- <v-select
							v-model="groupUser_roles"
							item-text="roleCode"
							:items="filterRole"
							:label="$t('label.roles')"
							:item-value="(item) => item.roleCode"
							class="mt-2 rounded-pill"
							dense
							outlined
						></v-select> -->
						<v-autocomplete
							v-model="groupUser_roles"
							item-text="roleCode"
							:items="filterRole"
							:label="$t('label.roles')"
							:item-value="(item) => item.roleCode"
							class="mt-2 rounded-pill"
							dense
							outlined
						>
						</v-autocomplete>
					</td>
					<td>
						<v-text-field
							v-model="groupUser_created"
							:label="$t('label.created')"
							outlined
							dense
							class="mt-2 rounded-pill"
						></v-text-field>
					</td>
					<td>
						<v-menu
							v-model="showPicker"
							:close-on-content-click="false"
							transition="scale-transition"
							offset-y
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatDateFns"
									clearable
									:label="$t('label.created_date')"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="groupUser_date_create = null"
									append-icon="mdi-calendar"
									outlined
									dense
									class="mt-2 rounded-pill"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="groupUser_date_create"
								@change="showPicker = false"
								no-title
								scrollable
								range
							></v-date-picker>
						</v-menu>
					</td>
				</tr>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog.delete" width="fit-content">
			<DeleteDialogVue @close="close" @confirmDelete="onConfirmDelete" />
		</v-dialog>
	</v-card>
</template>

<script>
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import store from "@/store";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import moment from "moment";
import constant from "@/common/constant";

export default {
	name: "UserGroupListVue",
	components: { BreadcrumbsVue, DeleteDialogVue },
	data() {
		return {
			groupUser_groupName: "",
			groupUser_description: "",
			groupUser_roles: this.$t("label.show_all"),
			filterRole: [],
			groupUser_created: "",
			groupUser_date_create: null,
			showPicker: false,
			dateFormat: "DD/MM/yyyy",
			dialog: {
				delete: false,
			},
			headers: [
				{
					text: this.$t("label.group_name"),
					align: "start",
					value: "groupName",
					filter: (value) => {
						if (!this.groupUser_groupName || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.groupUser_groupName,
								)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.description"),
					align: "start",
					value: "description",
					filter: (value) => {
						if (!this.groupUser_description || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.groupUser_description,
								)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.roles"),
					align: "start",
					value: "roles",

					filter: (value) => {
						if (this.groupUser_roles == this.$t("label.show_all"))
							return true;
						return value.filter((entry) => {
							return entry.roleCode.includes(
								this.groupUser_roles,
							);
						}).length;
					},
				},
				{
					text: this.$t("label.created"),
					align: "start",
					value: "createdName",
					filter: (value) => {
						if (!this.groupUser_created || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.groupUser_created)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.date_create"),
					align: "start",
					value: "dateCreate",

					formatter: (value) =>
						moment(value).isValid()
							? moment(value).format(this.dateFormat)
							: "",

					filter: (value) => {
						if (!this.groupUser_date_create) return true;
						let values = `${this.groupUser_date_create}`.split(
							constant.values.DATE_RANGE_SEPARATOR,
						);
						values = values
							.map((x) => {
								return moment(`${x}`).toDate().getTime();
							})
							.sort((a, b) => a - b);
						let target = moment(value).toDate().getTime();
						return (
							target >= values[0] &&
							target <=
								values[values.length - 1] + 24 * 60 * 60 * 1000
						);
					},
				},
				{
					text: this.$t("label.actions"),
					align: "start",
					sortale: false,
					value: "action",
				},
			],
			groups: [],
			selected: [],
		};
	},
	async created() {
		store.state.loading = true;
		await this.getAllUserGroup();
		await this.getAllRole();
	},
	mounted() {
		store.state.loading = false;
	},
	computed: {
		formatDateFns() {
			if (!this.groupUser_date_create) {
				return "";
			}
			let values = `${this.groupUser_date_create}`.split(
				constant.values.DATE_RANGE_SEPARATOR,
			);
			let result = [];
			result = values.map((x) => {
				return moment(x).format("DD/MM/yyyy");
			});
			return result.join("~");
		},
	},
	watch: {
		"dialog.delete"(val) {
			val || this.close();
		},
	},
	methods: {
		async getAllUserGroup() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserGroup(),
				);

				this.preHandleResponse(response);
				this.groups = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.sortList(this.groups);
			} catch (error) {
				this.toastError(error);
			}
		},
		async getAllRole() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllRole(),
			);
			if (!response || !response.state) {
				return;
			}
			this.filterRole = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.filterRole.unshift(this.$t("label.show_all"));
		},
		editItem(item) {
			this.$router.push({ path: `${item.id}`, append: true });
		},
		deleteItem(item) {
			this.selected = [item];
			this.dialog.delete = true;
		},
		onConfirmDelete(value) {
			if (!value) {
				this.close();
			} else {
				if (this.selected) {
					this.deleteConfirm();
				}
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
		deleteAll() {
			if (this.selected.length > 0) {
				this.dialog.delete = true;
			} else {
				this.toastError(this.$t("label.no_selected"));
			}
		},
		async deleteConfirm() {
			this.selected = this.selected.map((x) => {
				x.isDelete = true;
				return x;
			});
			try {
				let response = await globalService.postData_Async(
					administratorAPI.API_SaveAllUserGroup(),
					this.selected,
				);
				if (!response || !response.state) {
					this.toastError(this.$t("message.delete_error"));
				} else {
					this.toastSuccess(this.$t("message.delete_success"));
				}
			} catch (error) {
				this.toastError(this.$t("error.load"));
			} finally {
				this.selected = [];
				this.getAllUserGroup();
				this.close();
			}
		},
		close() {
			this.dialog.delete = false;
		},
	},
};
</script>

<style></style>
