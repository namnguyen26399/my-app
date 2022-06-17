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
									<i>{{ editedItem.mailTemplateCode }}</i>
								</v-list-item-title>
								<v-list-item-title class="mb-2 pt-2"
									><b>{{ $t("label.name_form") }}</b
									>:
									<i>{{
										editedItem.mailTemplateName
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
			:items="templateMails"
			:single-select="singleSelect"
			item-key="id"
			show-select
			class="grey lighten-5"
			:search="search"
			:custom-filter="customFilter"
			:loading="!templateMails"
			:loading-text="$t('label.loading')"
			:no-data-text="$t('message.no_data')"
			:no-results-text="$t('message.no_results')"
		>
			<template v-slot:top="{ on, attrs }">
				<v-card-title class="p-0 w-full">
					<v-btn
						elevation="0"
						class="rounded-pill"
						v-bind="attrs"
						v-on="on"
						to="tao-moi"
						text
						append
					>
						<v-icon> mdi-plus-circle </v-icon>
						{{ $t("button.create") }}
					</v-btn>
					<v-btn
						elevation="0"
						class="rounded-pill"
						@click="deleteAll"
						text
					>
						<v-icon> mdi-trash-can-outline </v-icon>
						{{ $t("button.delete_all") }}
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn icon @click="filterExist = !filterExist">
						<v-icon>mdi-filter </v-icon>
					</v-btn>
				</v-card-title>
				<v-divider></v-divider>
			</template>

			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr v-if="filterExist">
					<td></td>
					<td>
						<v-text-field
							v-model="mailTemplateName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.name_form')"
							@keyup="onKeyUpSearchForTemplateFormName"
							:error-messages="errorMessageSearchTemplateMailName"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="description"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.description')"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="modifiedName"
							outlined
							dense
							class="mt-2"
							:label="$t('label.description')"
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
									:value="formatDate(modifiedDate)"
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
					<td></td>
				</tr>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<div class="d-flex" style="min-width: fit-content">
					<v-btn color="blue darken-1" icon @click="editItemV2(item)">
						<v-icon small> mdi-pencil </v-icon>
					</v-btn>
					<v-btn color="red darken-1" icon @click="deleteItem(item)">
						<v-icon small> mdi-trash-can-outline </v-icon>
					</v-btn>
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
		</v-data-table>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
import moment from "moment";
import EditTemplateFormVue from "./EditTemplateForm.vue";
import VueDocPreview from "vue-doc-preview";
import administratorAPI from "../administrator.api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import pdf from "pdfvuer";
export default {
	name: "ListTemplateMailVue",
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
			errorMessageSearchTemplateMailCode: "",
			errorMessageSearchTemplateMailName: "",
			errorMessageSearchCreatedName: "",
			errorMessageSearchAll: "",
			user_current: this.getUserInfo(),
			mailTemplateCode: "",
			mailTemplateName: "",
			createdName: "",
			dateFormat: "DD/MM/yyyy",
			createdDate: null,
			modifiedDate: null,
			modifiedName: null,
			description: null,
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
					text: this.$t("label.mail_template_name"),
					value: "mailTemplateName",
					filter: (value) => {
						if (!this.mailTemplateName || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(
								this.mailTemplateName
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("label.description"),
					value: "description",
					filter: (value) => {
						if (!this.description || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(
								this.description
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("label.modified_name"),
					value: "modifiedName",
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
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			templateMails: [],
			editedIndex: -1,
			editedItem: {
				id: null,
				mailTemplateCode: "",
				mailTemplateName: "",
				subject: "",
				contentFile: "",
				mappingInfo: "",
				description: "",
				createdId: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
			},
			defaultItem: {
				id: null,
				mailTemplateCode: "",
				mailTemplateName: "",
				subject: "",
				contentFile: "",
				mappingInfo: "",
				description: "",
				createdId: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
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
				administratorAPI.API_GetAllMailTemplate(),
			);
			if (!response.state) {
				return;
			}
			this.templateMails = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.sortList(this.templateMails);
		},
		editItemV2(item) {
			this.$router.push({ path: `${item.id}`, append: true });
		},
		async editItem(item) {
			this.editedIndex = this.templateMails.indexOf(item);
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
			this.editedIndex = this.templateMails.indexOf(item);
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
			this.editedIndex = this.templateMails.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog.delete = true;
		},

		async deleteItemConfirm() {
			this.updateItem.isDelete = true;
			let response = await globalService.putData_Async(
				"/api/mail-templates/" + this.updateItem.id,
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
				"/api/_save/mail-templates",
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
				this.mailTemplateCode != "" ||
				this.mailTemplateCode.length < 255
			) {
				this.errorMessageSearchTemplateMailCode = "";
			}
			if (this.mailTemplateCode.length > 255) {
				this.errorMessageSearchTemplateMailCode = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForTemplateFormName() {
			if (
				this.mailTemplateName != "" ||
				this.mailTemplateName.length < 255
			) {
				this.errorMessageSearchTemplateMailName = "";
			}
			if (this.mailTemplateName.length > 255) {
				this.errorMessageSearchTemplateMailName = this.$t(
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
			let index = this.templateMails.findIndex((entry) => {
				return entry.id == value.id;
			});
			if (index == -1) {
				this.templateMails.push(value);
			} else {
				this.templateMails[index] = value;
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
