<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog v-model="dialog.view" persistent width="fit-content">
			<v-card>
				<v-toolbar>
					<v-toolbar-title>
						{{ $t("label.detail") }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="dialog.view = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<VuePerfectScrollbar class="h-70">
					<v-card-text>
						<v-container>
							<v-list-item-content>
								<v-list-item-title class="mb-2 pt-2"
									><b>{{ $t("label.code_form") }}</b
									>:
									<i>{{ editedItem.templateFormCode }}</i>
								</v-list-item-title>
								<v-list-item-title class="mb-2 pt-2"
									><b>{{ $t("label.name_form") }}</b
									>:
									<i>{{
										editedItem.templateFormName
									}}</i></v-list-item-title
								>

								<v-list-item-title class="mb-2 pt-2"
									><b>{{ $t("label.created_name") }}</b>
									:
									<i>
										{{ editedItem.createdName }}
									</i>
								</v-list-item-title>
								<v-list-item-title class="mb-2 pt-2"
									><b>{{ $t("label.created_date") }}</b
									>:
									<i>{{
										editedItem.createdDate
									}}</i></v-list-item-title
								>
								<v-list-item-title class="mb-2 pt-2"
									><b>{{ $t("label.modified_date") }}</b
									>:
									<i>{{
										editedItem.modifiedDate
									}}</i></v-list-item-title
								>
								<v-list-item-title class="mb-2 pt-2">
									<v-checkbox
										v-model="editedItem.isActive"
										:label="$t('label.is_active')"
										disabled
									>
									</v-checkbox>
								</v-list-item-title>
								<pdf
									v-if="
										files[editedItem.id] &&
										files[editedItem.id].fileExtension ==
											'pdf'
									"
									:src="_downloadFileUrl(editedItem)"
								></pdf>
								<VueDocPreview
									v-else-if="downloadFileUrl(editedItem)"
									:value="downloadFileUrl(editedItem)"
									type="office"
								></VueDocPreview>
								<span v-else>
									{{ $t("error.can_not_support") }}
								</span>
							</v-list-item-content>
						</v-container>
					</v-card-text>
				</VuePerfectScrollbar>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						elevation="0"
						color="red"
						dark
						class="rounded-pill"
						@click="closeView"
					>
						<v-icon>mdi-close</v-icon>
						{{ $t("button.close") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialog.delete" persistent width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.edit" persistent width="60vw">
			<EditTemplateFormVue
				:templateFormDto="editedItem"
				:oldFile="files[editedItem.id]"
				@close="onClose"
				@save="onSaveTemplateForm"
			/>
		</v-dialog>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="desserts"
			:single-select="singleSelect"
			item-key="id"
			show-select
			class="grey lighten-5"
			:search="search"
			:custom-filter="customFilter"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:top="{ on, attrs }">
				<v-card-title class="p-0 w-full">
					<v-btn
						elevation="0"
						color="blue"
						dark
						class="rounded-pill mb-4 mr-2"
						v-bind="attrs"
						v-on="on"
						@click="editItem(defaultItem)"
					>
						<v-icon color="white"> mdi-plus-circle </v-icon>
						{{ $t("button.create") }}
					</v-btn>
					<v-btn
						elevation="0"
						color="red"
						dark
						class="rounded-pill mb-4 mr-2"
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
						class="mt-2 mx-4"
						@keyup="onKeyUpForSearchAll"
						:error-messages="errorMessageSearchAll"
						maxlength="255"
					></v-text-field> -->
				</v-card-title>
			</template>

			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="templateFormCode"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.code_form')"
							@keyup="onKeyUpSearchForTemplateFormCode"
							:error-messages="errorMessageSearchTemplateFormCode"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="templateFormName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.name_form')"
							@keyup="onKeyUpSearchForTemplateFormName"
							:error-messages="errorMessageSearchTemplateFormName"
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
							@keyup="onKeyUpSearchForCreatedName"
							:error-messages="errorMessageSearchCreatedName"
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
					<td>
						<v-select
							v-model="isActive"
							:items="filterItems"
							outlined
							dense
							class="mt-2"
							:label="$t('label.is_active')"
						></v-select>
					</td>
					<td></td>
				</tr>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<div class="d-flex" style="min-width: fit-content">
					<v-icon
						class="mr-2"
						color="blue darken-1"
						@click="viewItem(item)"
						small
					>
						mdi-eye
					</v-icon>
					<v-icon
						class="mr-2"
						color="blue darken-1"
						@click="editItem(item)"
						small
					>
						mdi-pencil
					</v-icon>
					<v-icon color="red" @click="deleteItem(item)" small>
						mdi-trash-can-outline
					</v-icon>
				</div>
			</template>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
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
import EditTemplateFormVue from "../TemplateForm/EditTemplateForm.vue";
import VueDocPreview from "vue-doc-preview";
import administratorAPI from "../administrator.api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import pdf from "pdfvuer";
export default {
	name: "ListFormVue",
	components: {
		EditTemplateFormVue,
		VueDocPreview,
		VuePerfectScrollbar,
		DeleteDialogVue,
		BreadcrumbsVue,
		pdf,
	},
	data() {
		return {
			errorMessage: "",
			errorMessageDes: "",
			errorMessageSearchTemplateFormCode: "",
			errorMessageSearchTemplateFormName: "",
			errorMessageSearchCreatedName: "",
			errorMessageSearchAll: "",
			user_current: this.getUserInfo(),
			templateFormCode: "",
			templateFormName: "",
			createdName: "",
			dateFormat: "DD/MM/yyyy",
			createdDate: null,
			modifiedDate: null,
			isActive: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			singleSelect: false,
			selected: [],
			dialog: {
				view: false,
				edit: false,
				delete: false,
			},
			updateItem: {},
			search: "",
			isDeleting: false,
			isSaving: false,
			showPicker: false,
			showModifyDatePicker: false,
			headers: [
				{
					text: this.$t("label.code_form"),
					value: "templateFormCode",
					filter: (value) => {
						if (!this.templateFormCode || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(
								this.templateFormCode
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("label.name_form"),
					value: "templateFormName",
					filter: (value) => {
						if (!this.templateFormName || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(
								this.templateFormName
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
						if (!this.createdName || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(
								this.createdName
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
				templateFormCode: "",
				templateFormName: "",
				fileExtension: "",
				path: "",
				fullPath: "",
				ofice365Path: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
			},
			defaultItem: {
				id: null,
				templateFormCode: "",
				templateFormName: "",
				fileExtension: "",
				path: "",
				fullPath: "",
				ofice365Path: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
			},

			/**
			 * @var AttachmentFileDto[] files
			 */
			files: {},
		};
	},

	computed: {
		formTitle() {
			return this.editedIndex === -1
				? this.$t("title.create_form")
				: this.$t("title.edit_form");
		},
		form() {
			return {
				templateFormName: this.editedItem.templateFormName,
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

	created() {
		this.initialize();
	},

	methods: {
		async initialize() {
			this.files = {};
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllTemplateForm(),
			);
			if (!response.state) {
				return;
			}
			this.desserts = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.sortList(this.desserts);
		},

		async editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			if (this.editedItem.id && !this.files[this.editedItem.id]) {
				let response;
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetAllAttachmentFileByTemplateFormId(
							item.id,
						),
					);
					if (!response) {
						this.toastError(this.$t("error.load_file"));
					} else if (!response.state) {
						this.toastError(response.messgage);
					}
					{
						let array = response.data;
						array.sort((a, b) => b.id - a.id);
						this.files[item.id] = array[0];
					}
				} catch (error) {
					console.log(error);
					// this.toastError(error);
				}
			}
			this.dialog.edit = true;
		},
		async viewItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			if (!this.files[this.editedItem.id]) {
				let response;
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetAllAttachmentFileByTemplateFormId(
							item.id,
						),
					);
					if (!response) {
						this.toastError(this.$t("error.load_file"));
					} else if (!response.state) {
						this.toastError(response.messgage);
					}
					{
						let array = response.data;
						array.sort((a, b) => b.id - a.id);
						this.files[item.id] = array[0];
					}
				} catch (error) {
					this.toastError(error);
				}
			}
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
			this.updateItem.isDelete = true;
			let response = await globalService.putData_Async(
				"/api/template-forms/" + this.updateItem.id,
				this.updateItem,
			);
			if (!response.state) {
				this.toastError(this.$t("message.delete_error"));
			} else {
				this.toastSuccess(this.$t("message.delete_success"));
			}
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
				"/api/_save/template-forms/",
				this.selected,
			);
			if (!response.state) {
				this.toastError(response.message);
			}
			if (response.state) {
				this.isDeleting = true;
				this.toastSuccess(this.$t("message.delete_success"));
			}

			this.selected = [];
			this.isDeleting = false;
			this.initialize();
			this.closeDeleteAll();
		},

		close() {
			this.dialog.edit = false;
			this.errorMessage = "";
			this.errorMessageDes = "";
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
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
		},
		closeDeleteAll() {
			this.dialog.delete = false;
		},
		onKeyUp() {
			if (
				this.editedItem.templateFormName != "" ||
				this.editedItem.templateFormName.length < 255
			) {
				this.errorMessage = "";
			}
			if (this.editedItem.templateFormName.length > 255) {
				this.errorMessage = this.$t("message.maxlength_required_255");
			}
		},
		onKeyUpDes() {
			if (
				this.editedItem.description != "" ||
				this.editedItem.description.length < 255
			) {
				this.errorMessageDes = "";
			}
			if (this.editedItem.description.length > 255) {
				this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForTemplateFormCode() {
			if (
				this.templateFormCode != "" ||
				this.templateFormCode.length < 255
			) {
				this.errorMessageSearchTemplateFormCode = "";
			}
			if (this.templateFormCode.length > 255) {
				this.errorMessageSearchTemplateFormCode = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForTemplateFormName() {
			if (
				this.templateFormName != "" ||
				this.templateFormName.length < 255
			) {
				this.errorMessageSearchTemplateFormName = "";
			}
			if (this.templateFormName.length > 255) {
				this.errorMessageSearchTemplateFormName = this.$t(
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
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
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
		customFilter(value, search, item) {
			return (
				!!search && this.match(item, search.trim().replace(/\s+/g, " "))
			);
		},
		onSaveTemplateForm(value) {
			let index = this.desserts.findIndex((entry) => {
				return entry.id == value.id;
			});
			if (index == -1) {
				this.desserts.push(value);
			} else {
				this.desserts[index] = value;
			}
			this.onSaveDialog();
			this.initialize();
		},
		onClose(value) {
			if (value) {
				this.dialog.edit = false;
				this.dialog.view = false;
				this.dialog.delete = false;
			}
		},
		_downloadFileUrl(item) {
			if (!item || !item.id) {
				return;
			}
			if (!this.files[item.id]) {
				return;
			}
			let description = JSON.parse(this.files[item.id].description);
			return administratorAPI.FullAPI_DownloadFile(
				this.files[item.id].idInFileService,
				encodeURIComponent(this.files[item.id].fileName),
				this.files[item.id].fileExtension,
				description.contentType,
			);
		},
		downloadFileUrl(item) {
			if (!item || !item.id) {
				return;
			}
			if (!this.files[item.id]) {
				return;
			}
			return this._downloadFileUrl(item);
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
<style>
tbody tr:nth-of-type(odd) {
	background-color: #ffffff;
}
.v-picker__title__btn--active {
	display: none;
}
</style>
