<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="desserts"
			multi-sort
			item-key="id"
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
			<template v-slot:top>
				<v-snackbar
					v-model="snackbar"
					:timeout="1500"
					:value="true"
					absolute
					shaped
					top
					tile
					color="orange accent-2"
				>
					{{ $t("label.no_selected") }}
				</v-snackbar>

				<v-toolbar flat>
					<v-dialog v-model="dialog.edit" width="70vw">
						<template v-slot:activator="{ on, attrs }">
							<v-card-title class="p-0 w-full">
								<v-btn
									elevation="0"
									text
									class="mb-4 mr-2 rounded-pill"
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
									elevation="0"
									class="mb-4 mr-2 rounded-pill"
									text
									@click="deleteAll"
								>
									<v-icon>mdi-delete-outline</v-icon>
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
						<EditProcessStepVue
							:editedItem="editedItem"
							@close="onCloseDialog"
						/>
					</v-dialog>
					<v-dialog v-model="dialog.view" width="60vw">
						<ViewProcessStepVue
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
					<!-- <v-dialog v-model="dialog.delete" max-width="fit-content">
						<v-card>
							<v-toolbar>
								<v-toolbar-title>
									{{ $t("title.system") }}
								</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-btn icon dark @click="dialog.delete = false">
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-toolbar>
							<v-card-text >
								<v-container>
									<h2>
										{{ $t("label.confirm_delete") }}
									</h2>
								</v-container>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									@click="closeDelete"
									class="rounded-pill"
								>
									<v-icon>mdi-close </v-icon
									>{{ $t("button.cancel") }}
								</v-btn>
								<v-btn
									color="error"
									dark
									@click="deleteItemConfirm"
									class="rounded-pill"
								>
									<v-icon>mdi-check</v-icon>
									{{ $t("button.delete_all") }}</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog
						v-model="dialog.deleteAll"
						max-width="fit-content"
					>
						<v-card>
							<v-card-title
								class="text-h5"
								v-text="$t('label.confirm_delete')"
							></v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="error"
									class="rounded-pill"
									dark
									@click="closeDeleteAll"
								>
									<v-icon>mdi-close </v-icon>
									{{ $t("button.cancel") }}
								</v-btn>
								<v-btn
									color="blue darken-1"
									class="rounded-pill"
									dark
									@click="deleteAllConfirm"
								>
									<v-icon>mdi-trash-can-outline</v-icon>
									{{ $t("button.delete_all") }}
								</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog> -->
				</v-toolbar>
			</template>
			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr v-if="filterExist">
					<td></td>
					<td>
						<v-text-field
							v-model="stepCode"
							type="string"
							:label="$t('label.step_code')"
							class="mt-2"
							outlined
							dense
							:rules="[
								() =>
									stepCode.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="stepName"
							type="string"
							:label="$t('label.step_name')"
							class="mt-2"
							outlined
							dense
							:rules="[
								() =>
									stepName.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="description"
							type="string"
							:label="$t('label.description')"
							class="mt-2"
							outlined
							dense
							:rules="[
								() =>
									description.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="createdName"
							type="string"
							:label="$t('label.created_name')"
							class="mt-2"
							outlined
							dense
							:rules="[
								() =>
									createdName.trim().length <= 255 ||
									$t('error.max_length_255'),
							]"
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
							></v-date-picker>
						</v-menu>
					</td>
					<td class="">
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
					<v-icon
						class="mr-2"
						@click="viewItem(item)"
						color="blue darken-1"
						dark
					>
						mdi-eye-circle
					</v-icon>
					<v-icon
						class="mr-2"
						@click="editItem(item)"
						color="blue darken-1"
						dark
					>
						mdi-pencil-circle
					</v-icon>
					<v-icon @click="deleteItem(item)" color="error">
						mdi-close-circle
					</v-icon>
				</div>
			</template>
		</v-data-table>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
import moment from "moment";
import constant from "@/common/constant.js";
import administratorAPI from "../administrator.api";
import ViewProcessStepVue from "./ViewProcessStep.vue";
import EditProcessStepVue from "./EditProcessStep.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";

export default {
	name: "ListProcessStep",
	components: {
		ViewProcessStepVue,
		EditProcessStepVue,
		DeleteDialogVue,
		BreadcrumbsVue,
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			showPicker: false,
			showModifyDatePicker: false,
			snackbar: false,
			dateFormat: "DD/MM/yyyy",
			createdDate: null,
			modifiedDate: null,
			createdName: "",
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],

			stepCode: "",
			listOrganzine: [],
			listRank: [],
			stepName: "",
			description: "",
			search: "",
			dialog: {
				edit: false,
				view: false,
				delete: false,
			},
			singleSelect: false,
			isSaving: false,
			isDeleting: false,
			selected: [],
			items: [],
			headers: [
				{
					text: this.$t("label.step_code"),
					value: "stepCode",
					filter: (value) => {
						if (!this.stepCode.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.stepCode)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},
				{
					text: this.$t("label.step_name"),
					value: "stepName",
					filter: (value) => {
						if (!this.stepName.trim() || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.stepName)
									.toLocaleUpperCase()
									.trim(),
							);
					},
				},
				{
					text: this.$t("label.description"),
					value: "description",
					filter: (value) => {
						if (!this.description.trim()) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.description)
									.toLocaleUpperCase()
									.trim(),
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
									.toLocaleUpperCase()
									.trim(),
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
					sort: (a, b) => {
						return (
							moment(b).toDate().getTime() -
							moment(a).toDate().getTime()
						);
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
					sort: (a, b) => {
						return (
							moment(b).toDate().getTime() -
							moment(a).toDate().getTime()
						);
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
			desserts: [],
			editedIndex: -1,
			editedItem: {
				createdDate: null,
				created: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modified: null,
				isAuthorizedApproval: false,
				isBack: false,
				isCreateTFSTask: false,
				isEdit: false,
				isExamine: false,
				isProcessRecover: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSendMail: false,
				tennant: null,
				optionDeny: 0,
				modifiedName: "",
				processingTerm: 0,
				stepCode: "",
				stepName: "",
				organization: null,
				rank: null,
				tennantCode: "",
				tennantName: "",
			},
			defaultItem: {
				createdDate: null,
				created: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modified: null,
				isAuthorizedApproval: false,
				isBack: false,
				isCreateTFSTask: false,
				isEdit: false,
				isExamine: false,
				isProcessRecover: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSendMail: false,
				tennant: null,
				optionDeny: 0,
				modifiedName: "",
				processingTerm: 0,
				stepCode: "",
				stepName: "",
				organization: null,
				rank: null,
				tennantCode: "",
				tennantName: "",
			},
			stepNameMessage: "",
			descriptionMessage: "",
			processTermMessage: "",
		};
	},
	computed: {
		formTitle() {
			return this.editedIndex === -1
				? this.$t("label.create_step")
				: this.$t("label.edit_step");
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
			if (!val) {
				this.initialize();
				this.editedItem = Object.assign({}, this.defaultItem);
			}
		},
	},

	async created() {
		this.$Progress.start();
		this.initialize();
		this.getAllOrganize();
		this.getAllRank();
	},
	mounted() {
		this.$Progress.finish();
	},
	methods: {
		async getAllOrganize() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response || !response.state) {
					return;
				}
				this.listOrganzine = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				console.log("Error", error);
				this.toastError(this.$t("error.load"));
			}
		},
		async getAllRank() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllRank(),
				);
				if (!response || !response.state) {
					return;
				}
				this.listRank = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				console.log("Error", error);
				this.toastError(this.$t("error.load"));
			}
		},
		async initialize() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllSteps(),
				);
				if (!response.state) {
					return;
				}

				this.desserts = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.sortList(this.desserts);
			} catch (error) {
				console.log("Error", error);
				this.toastError(this.$t("error.load"));
			}
		},
		viewItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.view = true;
		},
		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.edit = true;
		},
		deleteItem(item) {
			this.selected = [item];
			this.editedItem = Object.assign({}, item);
			this.dialog.delete = true;
		},

		async deleteItemConfirm() {
			if (this.isDeleting) {
				return;
			}
			this.isDeleting = true;
			this.editedItem.isDelete = true;
			try {
				let response = await globalService.putData_Async(
					administratorAPI.API_UpdateStep(this.editedItem.id),
					this.editedItem,
				);
				if (!response.state) {
					this.toastError(this.$t("message.delete_error"));
				} else {
					this.toastSuccess(this.$t("message.delete_success"));
				}
			} catch (error) {
				this.toastError(this.$t("error.load"));
			}
			this.isDeleting = false;
			this.initialize();
			this.closeDelete();
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
					administratorAPI.API_DeleteAllStep(),
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
				this.initialize();
				this.closeDeleteAll();
			}
		},
		closeView() {
			this.dialog.view = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.stepNameMessage = "";
			this.descriptionMessage = "";
			this.processTermMessage = "";
			this.cbbOrganizationMessage = "";
			this.cbbRankMessage = "";
		},
		close() {
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			this.dialog.edit = false;
			this.stepNameMessage = "";
			this.descriptionMessage = "";
			this.processTermMessage = "";
			this.cbbOrganizationMessage = "";
			this.cbbRankMessage = "";
		},
		// filterOnlyCapsText(value, search) {
		// 	console.log("custom filter", value, search);
		// 	return value
		// 		.toString()
		// 		.toLocaleUpperCase()
		// 		.includes(search.toLocaleUpperCase());
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
		async save() {
			this.editedItem.stepName = this.editedItem.stepName.trim();
			this.editedItem.description = this.editedItem.description.trim();
			if (this.isSaving || this.editedItem.stepName.trim() == "") {
				this.$refs["stepName"].focus();
				this.stepNameMessage = this.$t("message.msg_1");
				return;
			}
			this.stepNameMessage = "";
			let response;
			if (this.editedItem.processingTerm < 0) {
				this.$refs["processingTerm"].focus();
				this.toastError(this.$t("message.add_error"));
				return;
			}
			if (this.editedItem.stepName.trim().length > 255) {
				this.toastError(this.$t("error.max_length_255"));
				this.$refs["stepName"].focus();
				return;
			}
			if (this.editedItem.description.trim().length > 255) {
				this.toastError(this.$t("error.max_length_255"));
				this.$refs["description"].focus();
				return;
			}

			this.isSaving = true;
			try {
				if (this.editedIndex > -1) {
					this.editedItem.modifiedDate = new Date();
					this.editedItem.modifiedName = this.user_current.fullName;
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateStep(this.editedItem.id),
						this.editedItem,
					);
					if (!response.state) {
						this.isSaving = false;
						this.toastError(this.$t("message.update_error"));
					} else {
						this.toastSuccess(this.$t("message.update_success"));
					}
					this.isSaving = false;
				} else {
					this.editedItem.created = this.user_current;
					this.editedItem.createdName = this.user_current.fullName;
					this.editedItem.modifiedDate = new Date();
					this.editedItem.createdDate = new Date();
					this.editedItem.modifiedName = this.user_current.fullName;
					response = await globalService.postData_Async(
						administratorAPI.API_CreateStep(),
						this.editedItem,
					);
					if (!response.state) {
						this.isSaving = false;
						this.toastError(this.$t("message.add_error"));
					} else {
						this.toastSuccess(this.$t("message.add_success"));
						this.isSaving = false;
					}
				}
			} catch (error) {
				this.toastError(this.$t("error.load"));
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
		selectRank(item) {
			this.editedItem.rank = item;
		},

		async selectOrganization(item) {
			this.editedItem.organization = item;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllRankByOrganizaionId(item.id),
			);
			if (!response || !response.state) return;
			this.listRank = response.data;
			this.editedItem.rank = null;
		},
		async removeOrganization() {
			this.editedItem.rank = null;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllRank(),
			);
			if (!response || !response.state) return;
			this.listRank = response.data;
		},
		customFilter(search, item) {
			return !!search && this.match(item, search);
		},

		lengthDescription(value) {
			if (value.target.value.trim().length > 255) {
				this.descriptionMessage = this.$t(
					"message.maxlength_required_255",
				);
			} else {
				this.descriptionMessage = "";
			}
		},
		lengthProcessTerm(value) {
			if (value.target.value.trim().length > 255) {
				this.processTermMessage = this.$t(
					"message.maxlength_required_255",
				);
			} else {
				this.processTermMessage = "";
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
	},
	filters: constant.filters,
};
</script>
<style>
.v-picker__title__btn--active {
	display: none;
}
</style>
