<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog v-model="dialog.delete" persistent width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-dialog max-width="60vw" persistent v-model="editRequestGroupDialog">
			<EditRequestGroupVue @close="onClose" @save="onSaveRequestGroup" />
		</v-dialog>
		<v-card> </v-card>

		<v-col>
			<div class="flex gap-4">
				<span
					>{{ $t("label.show_all") }}
					<v-icon>mdi-menu-down</v-icon></span
				>
				<v-divider vertical></v-divider>
				<v-menu offset-y>
					<template v-slot:activator="{ on, attrs }">
						<span v-bind="attrs" v-on="on"
							><v-icon>mdi-plus</v-icon>
							{{ $t("button.create") }}
							<v-icon>mdi-menu-down</v-icon></span
						>
					</template>
					<v-list>
						<v-list-item>
							<router-link
								:to="{
									path: '/quan-tri/loai-yeu-cau/tao-moi',
								}"
							>
								<v-list-item-title
									><v-icon>mdi-shape-plus</v-icon>
									{{
										$t("label.type_group")
									}}</v-list-item-title
								>
							</router-link>
						</v-list-item>
						<v-list-item @click="openEditRequestGroup()">
							<v-list-item-title
								><v-icon>mdi-flip-to-front</v-icon>
								{{
									$t("label.request_group")
								}}</v-list-item-title
							>
						</v-list-item>
					</v-list>
				</v-menu>
				<v-divider vertical></v-divider>
				<span @click="deleteAll"
					><v-icon>mdi-delete-outline</v-icon>
					{{ $t("button.delete") }}</span
				>
				<v-spacer></v-spacer>
				<v-btn icon @click="filterExist = !filterExist">
					<v-icon>mdi-filter </v-icon>
				</v-btn>
			</div>
		</v-col>
		<v-data-table
			v-model="selected_group"
			:headers="headers_group"
			:items="requests_group"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			:custom-filter="customFilter"
			loading="true"
			:loading-text="$t('label.loading')"
			show-expand
			:expanded.sync="expanded"
			class="grey lighten-3"
			:hide-default-footer="requests_group.length < 10 ? true : false"
		>
			<template v-slot:[`item.requestGroupName`]="{ item }">
				<router-link
					:to="{
						path: '/quan-tri/loai-yeu-cau/tao-moi',
					}"
				>
					<span class="text-black">{{ item.requestGroupName }}</span>
					<span class="text-black float-right"
						><v-icon>mdi-plus</v-icon>
						{{ $t("button.create") }}
					</span>
				</router-link>
			</template>

			<template v-slot:[`body.prepend`]>
				<tr v-if="filterExist">
					<td></td>

					<td>
						<v-text-field
							v-model="requestName"
							type="string"
							outlined
							dense
							rounded
							class="mt-2"
							:label="$t('label.request_name')"
							@keyup="onKeyUpSearchForRequestName"
							:error-messages="errorMessageSearchRequestName"
						></v-text-field>
					</td>
					<td>
						<v-select
							v-model="processInfos"
							:items="listProcess"
							item-text="processName"
							:item-value="(item) => item.processName"
							:label="$t('tab.process_')"
							class="mt-2"
							dense
							outlined
							rounded
						></v-select>
					</td>
					<td>
						<v-select
							v-model="organization"
							:items="filterOrganization"
							item-text="organizationName"
							:item-value="(item) => item.organizationName"
							:label="$t('label.organize_use')"
							class="mt-2"
							dense
							outlined
							rounded
						></v-select>
					</td>
					<td>
						<v-text-field
							v-model="modifiedName"
							type="string"
							outlined
							dense
							rounded
							class="mt-2"
							:label="$t('label.modified_name')"
							@keyup="onKeyUpSearchForCreatedName"
							:error-messages="errorMessageSearchCreatedName"
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
									@click:clear="modifiedDate = null"
									outlined
									dense
									rounded
								></v-text-field>
							</template>
							<v-date-picker
								v-model="modifiedDate"
								@change="showModifyDatePicker = false"
								header-color="white"
							></v-date-picker>
						</v-menu>
					</td>

					<td></td>
				</tr>
			</template>
			<template v-slot:expanded-item="{ item }">
				<td
					:colspan="headers_group.length + 1"
					style="padding: 0"
					class="bg-white"
					v-if="
						searchRequestTypeInRequestGroup(
							item,
							requestName,
							organization,
							modifiedName,
							processInfos,
							modifiedDate,
						).length > 0
					"
				>
					<v-row
						v-for="(
							itemRequest, index
						) in searchRequestTypeInRequestGroup(
							item,
							requestName,
							organization,
							modifiedName,
							processInfos,
							modifiedDate,
						)"
						:key="index"
						class="w-full m-0 p-0 flex items-center"
					>
						<v-col cols="1" class="pl-7">
							<v-checkbox @click="selectItem_(itemRequest)">
							</v-checkbox>
						</v-col>
						<v-col cols="2">
							{{ itemRequest.requestName }}
						</v-col>
						<v-col cols="2">
							{{
								show_processName(itemRequest.processInfos).join(
									", ",
								)
							}}
						</v-col>
						<v-col cols="2">
							{{
								show_organization(
									itemRequest.processInfos,
								).join(", ")
							}}
						</v-col>
						<v-col cols="2">
							<v-avatar color="indigo mr-2" size="28">
								<span class="white--text">
									{{
										getAvatarText(
											itemRequest.modifiedName,
											2,
										)
									}}
								</span>
							</v-avatar>
							<span class="w-80">
								{{ itemRequest.modifiedName }}
							</span>
						</v-col>
						<v-col cols="2">
							{{ moment__(itemRequest.modifiedDate) }}
						</v-col>
						<v-col cols="1">
							<div class="flex">
								<v-btn
									icon
									class="mr-2"
									color="blue darken-1"
									:to="{
										path: `loai-yeu-cau/${itemRequest.id}`,
									}"
								>
									<v-icon> mdi-pencil-circle </v-icon>
								</v-btn>
								<v-btn
									icon
									color="red"
									@click="deleteItem(itemRequest)"
								>
									<v-icon> mdi-close-circle </v-icon>
								</v-btn>
							</div>
						</v-col>
						<v-col cols="12">
							<v-divider></v-divider>
						</v-col>
					</v-row>
				</td>
				<td
					:colspan="headers_group.length + 1"
					style="padding: 0"
					class="bg-white text-center"
					v-else
				>
					No data
				</td>
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
import EditRequestGroupVue from "../RequestGroup/EditRequestGroup.vue";
export default {
	name: "QuanTriNhomLoaiYeuCau",
	components: { DeleteDialogVue, BreadcrumbsVue, EditRequestGroupVue },
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
			organization: this.$t("label.show_all"),
			processInfos: this.$t("label.show_all"),
			singleSelect: false,
			showPicker: false,
			showModifyDatePicker: false,
			editRequestGroupDialog: false,
			selected: [],
			selected_group: [],
			dialog: {
				view: false,
				edit: false,
				delete: false,
				dropdown: false,
			},
			updateItem: {},
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			items: [],
			search: "",
			modifiedName: "",
			isDeleting: false,
			isDeleting_group: false,
			isSaving: false,
			itemsDropdown: [
				{ title: this.$t("label.type_group") },
				{ title: this.$t("label.request_group") },
			],
			headers_group: [
				{
					text: this.$t("label.type_group"),
					value: "requestGroupName",

					filter: (value) => {
						if (!this.requestGroupName || !value) return true;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.requestGroupName)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.processing_process"),
					value: "processInfos",
				},
				{
					text: this.$t("label.organization"),
					value: "",
				},

				{
					text: this.$t("label.modified_name"),
					value: "",
				},

				{
					text: this.$t("label.modified_date"),
					value: "",
				},
				{ text: "", value: "data-table-expand" },
			],
			requests_group: [],
			requests: [],
			errorMessageSearchCreatedName: "",
			filterOrganization: [],
			listProcess: [],
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
			this.getRequestGroup();
			this.getAllOrganzation();
			this.getAllProcess();
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

				for (let i = 0; i < this.requests.length; i++) {
					this.requests[i].modifiedName =
						this.requests[i].modified.fullName;
					this.requests[i]["organization"] = this.show_organization(
						this.requests[i].processInfos,
					);
				}
				this.sortList(this.requests);
				// console.log("this.requests", this.requests);
			} catch (error) {
				this.toastError(error);
			}
		},
		async getRequestGroup() {
			let response;
			response = await globalService.getData_Async(
				administratorAPI.API_GetAllRequestGroup(),
			);
			this.requests_group = response.data.filter((entry) => {
				return !entry.isDelete;
			});
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

		async getAllProcess() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllProcessInfo(),
			);
			if (!response || !response.state) {
				return;
			}
			this.listProcess = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			// console.log(this.listProcess);
			this.listProcess.unshift(this.$t("label.show_all"));
			this.sortList(this.listProcess);
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
			if (this.selected.length > 0 || this.selected_group.length > 0) {
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
				if (this.selected.length > 0) {
					this.deleteAllConfirm();
				}
				if (this.selected_group.length > 0) {
					this.deleteAllConfirm_Group();
				}
			}
		},
		async deleteAllConfirm_Group() {
			if (this.isDeleting_group) {
				return;
			}
			this.isDeleting_group = true;
			this.selected_group = this.selected_group.map((entry) => {
				entry.isDelete = true;
				return entry;
			});
			let response = await globalService.postData_Async(
				"/api/_save/request-groups/",
				this.selected_group,
			);
			if (!response.state) {
				this.toastError(response.message);
			}
			if (response.state) {
				this.isDeleting_group = true;
				this.toastSuccess(this.$t("success.delete"));
			}

			if (!response) {
				this.toastError(this.$t("message.error"));
			}

			this.selected_group = [];
			this.isDeleting_group = false;
			this.closeDeleteAll();
			this.initialize();
		},
		openDropDown() {
			this.dialog.dropdown = true;
		},
		show_processName(processInfo) {
			let processName = [];
			for (let i = 0; i < processInfo.length; i++) {
				processName.push(processInfo[i].processName);
			}
			return processName;
		},
		show_organization(processInfo) {
			let organization = [];
			for (let i = 0; i < processInfo.length; i++) {
				if (processInfo[i].organizations.length > 0) {
					for (
						let j = 0;
						j < processInfo[i].organizations.length;
						j++
					) {
						if (
							!organization.includes(
								processInfo[i].organizations[j]
									.organizationName,
							)
						) {
							organization.push(
								processInfo[i].organizations[j]
									.organizationName,
							);
						}
					}
				}
			}
			return organization;
		},
		searchRequestTypeInRequestGroup(
			item,
			requestName,
			organization,
			modifiedName,
			processInfos,
			modifiedDate,
		) {
			// console.log("organization", organization);
			console.log("modifiedDate", modifiedDate);
			console.log(
				"modifiedDate format",
				moment(modifiedDate).format(this.dateFormat),
			);
			console.log("typeof modifiedDate", typeof modifiedDate);
			let list = [];
			let listFilter = [];
			for (let i = 0; i < this.requests.length; i++) {
				if (
					this.requests[i].requestGroup.requestGroupName ==
					item.requestGroupName
				) {
					list.push(this.requests[i]);
					if (
						requestName.length > 0 ||
						modifiedName.length > 0 ||
						(organization.length > 0 &&
							organization != this.$t("label.show_all")) ||
						(processInfos.length > 0 &&
							processInfos != this.$t("label.show_all")) ||
						modifiedDate != null
					) {
						listFilter = list.filter((entry) => {
							console.log(
								"this.show_processName(entry.processInfos).join(",
								").includes(processInfos)",
								this.show_processName(entry.processInfos)
									.join(",")
									.includes(processInfos),
							);
							console.log(
								"moment(entry.modifiedDate).format(this.dateFormat)",
								moment(entry.modifiedDate).format(
									this.dateFormat,
								),
							);
							return (
								entry.requestName.includes(requestName) &&
								entry.modified.fullName.includes(
									modifiedName,
								) &&
								(this.show_organization(entry.processInfos)
									.join(",")
									.includes(organization) ||
									this.show_processName(entry.processInfos)
										.join(",")
										.includes(processInfos) ||
									moment(entry.modifiedDate).format(
										this.dateFormat,
									) ==
										moment(modifiedDate).format(
											this.dateFormat,
										))
							);
						});
					} else {
						listFilter = list;
					}
				}
			}
			// console.log("list", list);
			return listFilter;
		},
		openEditRequestGroup() {
			this.editRequestGroupDialog = true;
		},
		onClose(value) {
			if (value) {
				this.editRequestGroupDialog = false;
			}
		},
		onSaveRequestGroup(value) {
			console.log(value);
			this.initialize();
		},
		selectItem_(item) {
			console.log(this.selected.indexOf(item));

			let index = this.selected.indexOf(item);
			if (index == -1) {
				this.selected.push(item);
				console.log("this.selected push", this.selected);
				// return;
			} else {
				console.log("index", index);
				this.selected.splice(index, 1);
				console.log("this.selected delete", this.selected);
				// return;
			}
		},
		moment__(x) {
			return x ? moment(x).format(this.dateFormat) : null;
		},
	},

	filters: constant.filters,
};
</script>
<style>
.v-picker__title__btn--active {
	display: none;
}
.v-menu__content {
	min-width: 180px !important;
}
.p-style {
	width: 320px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
