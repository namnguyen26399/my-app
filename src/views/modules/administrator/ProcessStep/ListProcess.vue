<template>
	<v-card elevation="0" class="p-2 rounded">
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
			:search="search"
			:custom-filter="customFilter"
			item-key="id"
			multi-sort
			show-select
			:items-per-page="itemperpage"
			:page="numberPage"
			loading="true"
			:loading-text="$t('label.loading')"
			@update:options="updatePage($event)"
			@pagination="logEvent($event)"
		>
			<template v-slot:top>
				<v-card-title class="p-0 w-full">
					<v-btn
						elevation="0"
						class="mb-4 mr-2 white"
						to="quy-trinh/tao-moi-v2"
					>
						<v-icon> mdi-plus </v-icon>
						{{ $t("button.create") }}
						<v-icon> mdi-menu-down </v-icon>
					</v-btn>
					<v-btn
						elevation="0"
						class="mb-4 mr-2 white"
						@click="deleteAll"
					>
						<v-icon> mdi-delete-outline </v-icon>
						{{ $t("button.delete_all") }}
					</v-btn>
					<v-spacer></v-spacer>
					<!-- <v-text-field
						v-model="search"
						:label="$t('title.search')"
						outlined
						dense
						class="mt-2 mx-4"
						:rules="[
							() =>
								search.trim().length <= 255 ||
								$t('error.max_length_255'),
						]"
					></v-text-field> -->
					<v-btn icon @click="filterExist = !filterExist">
						<v-icon>mdi-filter </v-icon>
					</v-btn>
				</v-card-title>
			</template>
			<template v-slot:no-results
				><h1>{{ $t("message.no_results") }}</h1>
			</template>
			<template v-slot:no-data
				><h1>{{ $t("message.no_data") }}</h1></template
			>
			<template v-slot:[`item.isActive`]="{ item }">
				<v-simple-checkbox
					v-model="item.isActive"
					disabled
				></v-simple-checkbox>
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
			<template v-slot:[`item.organizations`]="{ item, index }">
				<template v-if="item.showAll">
					<v-chip
						v-for="organization of item.organizations"
						:key="organization.id"
						v-bind="item"
					>
						{{ organization.organizationName }}
					</v-chip>
				</template>
				<template v-else>
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
				</span>
			</template>
			<template v-slot:[`item.requestDTOS`]="{ item, index }">
				<template v-if="item.showReq">
					<v-chip
						v-for="request of item.requestDTOS"
						:key="request.id"
						v-bind="item"
					>
						{{ request.requestName }}
					</v-chip>
				</template>
				<template v-else>
					<div
						v-for="(request, key) of item.requestDTOS"
						v-bind="item"
						:key="request.id"
					>
						<v-chip v-if="key < 1">
							{{ request.requestName }}
						</v-chip>
					</div>
				</template>
				<span
					v-if="item.requestDTOS.length > 2 && !item.showReq"
					@click="toggle_request(index)"
				>
					<a href="#"><i>Chi tiết</i></a>
				</span>
				<span
					v-if="item.requestDTOS.length > 2 && item.showReq"
					@click="toggle_request(index)"
				>
					<a href="#"><i>Ẩn</i></a>
				</span>
			</template>
			<template v-slot:[`item.processName`]="{ item }">
				<template
					v-if="
						item.processName.trim().length >
							constant.length_process_name && !item.showName
					"
				>
					<span>
						{{
							item.processName.slice(
								0,
								constant.length_process_name,
							)
						}}
					</span>
					<span @click="toggle_show_name(item)">
						<a href="#"><i>Chi tiết</i></a>
					</span>
				</template>
				<template
					v-if="
						item.processName.trim().length >
							constant.length_process_name && item.showName
					"
				>
					<span>{{ item.processName }}</span>
					<span @click="toggle_show_name(item)">
						<a href="#"><i>Ẩn</i></a>
					</span>
				</template>
				<template
					v-if="
						item.processName.trim().length <=
						constant.length_process_name
					"
				>
					<span>
						{{ item.processName }}
					</span>
				</template>
			</template>
			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr v-if="filterExist">
					<td></td>
					<!-- <td>
						<v-text-field
							v-model="s_processCode"
							type="string"
							:label="$t('label.process_code')"
							:rules="[
								() =>
									s_processCode.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
							class="mt-2"
							dense
							outlined
						></v-text-field>
					</td> -->
					<td>
						<v-text-field
							v-model="s_processName"
							type="string"
							:label="$t('label.process_name')"
							:rules="[
								() =>
									s_processName.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
							class="mt-2"
							dense
							outlined
						></v-text-field>
					</td>
					<td>
						<v-select
							v-model="s_request"
							item-text="requestName"
							:items="filterRequest"
							:label="$t('label.type_request_apply')"
							:item-value="(item) => item.requestName"
							class="mt-2"
							dense
							outlined
						></v-select>
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
					<!-- <td>
						<v-text-field
							v-model="s_description"
							type="string"
							:label="$t('label.description')"
							:rules="[
								() =>
									s_description.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
							class="mt-2"
							dense
							outlined
						></v-text-field>
					</td> -->
					<!-- <td>
						<v-text-field
							v-model="s_createdName"
							type="string"
							:label="$t('label.created_name')"
							:rules="[
								() =>
									s_createdName.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
							class="mt-2"
							dense
							outlined
						></v-text-field>
					</td> -->
					<!-- <td>
						<v-menu
							v-model="showCreateDatePicker"
							:close-on-content-click="false"
							max-width="290"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatDateFns"
									clearable
									:label="$t('label.created_date')"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="createdDate = null"
									class="mt-2"
									dense
									outlined
								></v-text-field>
							</template>
							<v-date-picker
								v-model="createdDate"
								@change="showCreateDatePicker = false"
								no-title
								scrollable
								range
							></v-date-picker>
						</v-menu>
					</td> -->
					<td>
						<v-text-field
							v-model="s_modifiedName"
							type="string"
							:label="$t('label.modified_name')"
							:rules="[
								() =>
									s_modifiedName.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
							class="mt-2"
							dense
							outlined
						></v-text-field>
					</td>
					<td>
						<v-menu
							v-model="showModifyDatePicker"
							:close-on-content-click="false"
							class="mt-10"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatModifyDateFns"
									clearable
									:label="$t('label.modified_date')"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="modifiedDate = null"
									class="mt-2"
									dense
									outlined
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
					<!-- <td class="">
						<v-select
							v-model="isActive"
							:items="filterItems"
							:label="$t('label.is_active')"
							class="mt-2"
							dense
							outlined
						></v-select>
					</td> -->

					<td></td>
				</tr>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<div class="d-flex" style="min-width: fit-content">
					<!-- <v-btn
						icon
						dark
						x-small
						color="blue darken-1"
						:to="{
							path: `/administrator/quy-trinh/view/${item.id}`,
						}"
					>
						<v-icon small> mdi-eye </v-icon>
					</v-btn> -->

					<v-btn
						color="blue darken-1"
						dark
						icon
						:to="{ path: `/administrator/quy-trinh/${item.id}` }"
					>
						<v-icon> mdi-pencil-circle </v-icon>
					</v-btn>
					<v-btn
						icon
						color="red darken-1"
						dark
						@click="deleteItem(item)"
					>
						<v-icon> mdi-close-circle </v-icon>
					</v-btn>
				</div>
			</template>
		</v-data-table>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import moment from "moment";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import constant from "@/common/constant.js";
import administratorAPI from "../administrator.api";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
export default {
	name: "ListProcess",
	components: {
		// VuePerfectScrollbar,
		DeleteDialogVue,
		BreadcrumbsVue,
	},
	data() {
		return {
			showCreateDatePicker: false,
			showModifyDatePicker: false,
			itemperpage: 10,
			numberPage: 1,
			dateFormat: "DD/MM/yyyy",
			createdDate: null,
			modifiedDate: null,
			s_createdName: "",
			s_modifiedName: "",
			organizations: this.$t("label.show_all"),
			s_request: this.$t("label.show_all"),
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			filterOrganization: [],
			filterRequest: [],
			s_description: "",
			s_processName: "",
			s_processCode: "",
			stepSelected: [],
			user_in_step: [],
			modelslt: {},
			updateItem: {},
			search: "",
			stepInProcess: {},
			singleSelect: false,
			dialog: {
				delete: false,
			},
			selected: [],
			items: [],
			itemDelete: {},
			headers: [
				// {
				// 	text: this.$t("label.process_code"),
				// 	value: "processCode",
				// 	filter: (value) => {
				// 		if (!this.s_processCode || !value) return true;

				// 		return this.nonAccentVietnamese(value)
				// 			.toLocaleUpperCase()
				// 			.includes(
				// 				this.nonAccentVietnamese(this.s_processCode)
				// 					.trim()
				// 					.toLocaleUpperCase(),
				// 			);
				// 	},
				// },
				{
					text: this.$t("label.process_name"),
					value: "processName",
					filter: (value) => {
						if (!this.s_processName || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.s_processName)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				// {
				// 	text: this.$t("label.description"),
				// 	value: "description",

				// 	filter: (value) => {
				// 		if (!this.s_description.trim()) return true;
				// 		if (!value) return;
				// 		return this.nonAccentVietnamese(value)
				// 			.toLocaleUpperCase()
				// 			.includes(
				// 				this.nonAccentVietnamese(this.s_description)
				// 					.toLocaleUpperCase()
				// 					.trim(),
				// 			);
				// 	},
				// },
				// {
				// 	text: this.$t("label.created_name"),
				// 	value: "createdName",

				// 	filter: (value) => {
				// 		if (!this.s_createdName || !value) return true;

				// 		return this.nonAccentVietnamese(value)
				// 			.toLocaleUpperCase()
				// 			.includes(
				// 				this.nonAccentVietnamese(this.s_createdName)
				// 					.toLocaleUpperCase()
				// 					.trim(),
				// 			);
				// 	},
				// },

				// {
				// 	text: this.$t("label.created_date"),
				// 	value: "createdDate",

				// 	formatter: (x) =>
				// 		x ? moment(x).format(this.dateFormat) : null,
				// 	filter: (value) => {
				// 		if (!this.createdDate || !value) return true;
				// 		return value.includes(this.createdDate);
				// 	},
				// 	sort: (a, b) => {
				// 		return (
				// 			moment(b).toDate().getTime() -
				// 			moment(a).toDate().getTime()
				// 		);
				// 	},
				// },
				{
					text: this.$t("label.type_request_apply"),
					value: "requestDTOS",
					filter: (value) => {
						if (this.s_request == this.$t("label.show_all"))
							return true;
						return value.filter((entry) => {
							return entry.requestName.includes(this.s_request);
						}).length;
					},
				},
				{
					text: this.$t("label.organize_use"),
					value: "organizations",
					filter: (value) => {
						if (this.organizations == this.$t("label.show_all"))
							return true;
						return value.filter((entry) => {
							return entry.organizationName.includes(
								this.organizations,
							);
						}).length;
					},
				},
				{
					text: this.$t("label.modified_name"),
					value: "modifiedName",

					filter: (value) => {
						if (!this.s_modifiedName || !value) return true;

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
						if (!this.modifiedDate || !value) return true;
						return value.includes(this.modifiedDate);
					},
					sort: (a, b) => {
						return (
							moment(b).toDate().getTime() -
							moment(a).toDate().getTime()
						);
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
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			desserts: [],
			editedIndex: -1,
			indexItems: 0,
			editedItem: {
				createdDate: new Date(),
				createdId: null,
				createdName: "",
				description: "",
				id: null,
				isActive: false,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: 0,
				processCode: "",
				processName: "",
			},
			defaultItem: {
				createdDate: new Date(),
				createdId: null,
				createdName: "",
				description: "",
				id: null,
				isActive: false,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: 0,
				processCode: "",
				processName: "",
			},
			arrShow: [],
			constant: constant,
			listIndexAfterFillter: [],
		};
	},

	computed: {
		isEdit() {
			return this.editedIndex === -1 ? false : true;
		},
		formTitle() {
			return this.editedIndex === -1
				? "Tạo mới quy trình"
				: "Sửa quy trình";
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

	// watch: {
	// 	dialog(val) {
	// 		val || this.close();
	// 	},
	// 	dialogDelete(val) {
	// 		val || this.closeDelete();
	// 	},
	// },

	created() {
		this.$Progress.start();
		this.initialize();
		this.getAllOrganzation();
		this.getAllRequest();
	},
	mounted() {
		this.$Progress.finish();
	},
	methods: {
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
		async getAllRequest() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequest(),
				);
				if (!response || !response.state) return;
				this.filterRequest = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.filterRequest.unshift(this.$t("label.show_all"));
			} catch (error) {
				this.toastError(error);
			}
		},
		async initialize() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllProcessInfo(),
			);
			if (!response || !response.state) {
				return;
			}
			this.desserts = response.data.filter((entry) => {
				entry.showAll = false;
				entry.showName = false;
				entry.showReq = false;
				return !entry.isDelete;
			});
			this.sortList(this.desserts);
			this.modelslt = {
				createdDate: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isAuthorizedApproval: false,
				isBack: false,
				isEdit: false,
				optionDeny: 1,
				sendEmail: false,
				isExamine: false,
				isRequestModify: false,
				isRequiredSignature: false,
				modifiedDate: null,
				modifiedName: "",
				processInfo: null,
				processingActiveTime: null,
				processingTerm: 0,
				processingTermTime: null,
				step: null,
				stepInProcessCode: "",
				stepInProcessName: "",
				stepOrder: 0,
				tennantCode: "",
				tennantName: "",
				organization: null,
				organizationCode: "",
				organizationName: "",
				rank: null,
			};
		},

		deleteItem(item) {
			this.selected = [item];
			this.updateItem = item;
			this.dialog.delete = true;
		},

		// async deleteItemConfirm() {
		// 	this.updateItem.isDelete = true;
		// 	let response = await globalService.putData_Async(
		// 		administratorAPI.API_UpdateProcessInfo(this.updateItem.id),
		// 		this.updateItem,
		// 	);
		// 	if (!response.state) {
		// 		this.toastError(this.$t("message.delete_error"));
		// 		this.closeDelete();
		// 		return;
		// 	} else {
		// 		this.toastSuccess(this.$t("message.delete_success"));
		// 	}
		// 	this.initialize();
		// 	this.closeDelete();
		// },
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
			try {
				this.selected = this.selected.map((x) => {
					x.isDelete = true;
					return x;
				});
				let response = await globalService.postData_Async(
					administratorAPI.API_DeleteAllProcessInfo(),
					this.selected,
				);
				if (!response) {
					this.toastError(this.$t("message.delete_error"));
					return;
				}
				if (!response.state) {
					this.toastError(response.message);
					this.isDeleting = false;
					return;
				} else {
					this.toastSuccess(this.$t("message.delete_success"));
				}
			} catch (error) {
				this.toastError(error);
			} finally {
				this.selected = [];
				this.isDeleting = false;
				this.initialize();
				this.closeDeleteAll();
			}
		},

		// close() {
		// 	this.dialog = false;
		// 	this.$nextTick(() => {
		// 		this.editedItem = Object.assign({}, this.defaultItem);
		// 		this.editedIndex = -1;
		// 	});
		// },

		closeDelete() {
			this.dialog.delete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		closeDeleteAll() {
			this.dialog.delete = false;
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
		customFilter(value, search, item) {
			return !!search && this.match(item, search);
		},
		toggle_detail(index) {
			if (this.listIndexAfterFillter.length != 0)
				index = this.listIndexAfterFillter[index];
			else index = (this.numberPage - 1) * this.itemperpage + index;
			this.desserts[index].showAll = !this.desserts[index].showAll;
		},

		updatePage(event) {
			console.log("event", event);
			// this.numberPage = event.page;
			// this.itemperpage = event.itemsPerPage;
		},

		toggle_request(index) {
			if (this.listIndexAfterFillter.length != 0)
				index = this.listIndexAfterFillter[index];
			else index = (this.numberPage - 1) * this.itemperpage + index;
			this.desserts[index].showReq = !this.desserts[index].showReq;
		},
		toggle_show_name(item) {
			item.showName = !item.showName;
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
		logEvent(event) {
			this.numberPage = event.page;
			this.itemperpage = event.itemsPerPage;
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
