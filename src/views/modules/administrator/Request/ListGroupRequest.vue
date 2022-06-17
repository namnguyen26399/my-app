<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog v-model="dialog.view" persistent width="fit-content">
			<v-card>
				<v-toolbar flat color="grey lighten-4">
					<v-toolbar-title>
						{{ $t("label.detail") }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeView">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text>
					<v-list-item-content class="p-10">
						<v-list-item-title class="mb-2"
							><b>{{ $t("label.request_group_code") }}</b
							>:
							<i>{{
								editedItem.requestGroupCode
							}}</i></v-list-item-title
						>
						<v-list-item-title class="mb-2"
							><b>{{ $t("label.request_group_name") }}</b
							>:
							<i>{{
								editedItem.requestGroupName
							}}</i></v-list-item-title
						>

						<v-list-item-title class="mb-2"
							><b>{{ $t("label.created_name") }}</b
							>:
							<i>{{
								editedItem.createdName
							}}</i></v-list-item-title
						>
						<v-list-item-title class="mb-2"
							><b>{{ $t("label.created_date") }}</b
							>:
							<i>{{
								editedItem.createdDate
							}}</i></v-list-item-title
						>
						<v-list-item-title class="mb-2"
							><b>{{ $t("label.modified_date") }}</b
							>:
							<i>{{
								editedItem.modifiedDate
							}}</i></v-list-item-title
						>
						<v-list-item-title class="mb-2"
							><b>{{ $t("label.description") }}</b
							>:
							<i>{{
								editedItem.description
							}}</i></v-list-item-title
						>
						<v-list-item-title class="mb-2"
							><v-checkbox
								v-model="editedItem.isActive"
								:label="$t('label.is_active')"
								disabled
							></v-checkbox
						></v-list-item-title>
					</v-list-item-content>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						elevation="0"
						color="grey lighten-4"
						class="rounded-0"
						@click="closeView"
					>
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
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="desserts"
			:search="search"
			item-key="id"
			multi-sort
			show-select
			class="grey lighten-5"
			loading="true"
			:loading-text="$t('label.loading')"
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
				<v-dialog v-model="dialog.edit" persistent width="fit-content">
					<template v-slot:activator="{ on, attrs }">
						<div class="flex p-4 w-full">
							<v-btn
								elevation="0"
								text
								class="rounded-pill mb-4 mr-2"
								v-bind="attrs"
								v-on="on"
								@click="editItem(defaultItem)"
							>
								<v-icon> mdi-plus </v-icon>
								{{ $t("button.create") }}
								<v-icon> mdi-menu-down </v-icon>
							</v-btn>
							<v-btn
								elevation="0"
								text
								class="rounded-pill mb-4 mr-2"
								@click="deleteAll"
							>
								<v-icon> mdi-delete-outline </v-icon>
								{{ $t("button.delete_all") }}
							</v-btn>
							<!-- <v-spacer></v-spacer>
							<v-text-field
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
							<v-spacer></v-spacer>
							<v-btn icon @click="filterExist = !filterExist">
								<v-icon>mdi-filter </v-icon>
							</v-btn>
						</div>
					</template>
					<v-card>
						<v-toolbar flat color="grey lighten-4">
							<v-toolbar-title>
								{{ formTitle }}
							</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon @click="close">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-toolbar>

						<v-card-text class="mt-3">
							<v-container>
								<v-form>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												ref="requestGroupName"
												v-model="
													editedItem.requestGroupName
												"
												dense
												outlined
												required
												@keyup="onKeyUp"
												:error-messages="errorMessage"
											>
												<template v-slot:label>
													{{
														$t(
															"label.request_group_name",
														)
													}}
													<span class="text-red">
														{{ $t("label.star") }}
													</span>
												</template>
											</v-text-field>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-textarea
												v-model="editedItem.description"
												:label="$t('label.description')"
												dense
												outlined
												@keyup="onKeyUpDes"
												:error-messages="
													errorMessageDes
												"
											></v-textarea>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="editedItem.isActive"
												:label="$t('label.is_active')"
											></v-checkbox>
										</v-col>
									</v-row>
								</v-form>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								elevation="0"
								color="grey lighten-4"
								class="rounded-0"
								@click="close"
							>
								{{ $t("button.cancel") }}
							</v-btn>
							<v-btn
								elevation="0"
								color="blue darken-2"
								dark
								class="rounded-0"
								@click="save"
							>
								{{ $t("button.save") }}
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
							v-model="requestGroupCode"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.request_group_code')"
							@keyup="onKeyUpSearchForRequestGroupCode"
							:error-messages="errorMessageSearchRequestGroupCode"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="requestGroupName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.request_group_name')"
							@keyup="onKeyUpSearchForRequestGroupName"
							:error-messages="errorMessageSearchRequestGroupName"
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
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";

export default {
	name: "ListGroupRequest",
	components: { DeleteDialogVue, BreadcrumbsVue },
	data() {
		return {
			errorMessage: "",
			errorMessageDes: "",
			errorMessageSearchRequestGroupCode: "",
			errorMessageSearchRequestGroupName: "",
			errorMessageSearchCreatedName: "",
			errorMessageSearchAll: "",
			user_current: this.getUserInfo(),
			requestGroupCode: "",
			requestGroupName: "",
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
			singleSelect: false,
			selected: [],
			dialog: {
				view: false,
				edit: false,
				delete: false,
			},
			updateItem: {},
			items: [],
			search: "",
			isDeleting: false,
			isSaving: false,
			showPicker: false,
			showModifyDatePicker: false,
			headers: [
				{
					text: this.$t("label.request_group_code"),
					value: "requestGroupCode",
					filter: (value) => {
						if (!this.requestGroupCode || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.requestGroupCode)
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("label.request_group_name"),
					value: "requestGroupName",
					filter: (value) => {
						if (!this.requestGroupName || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.requestGroupName)
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
			desserts: [],
			editedIndex: -1,
			editedItem: {
				id: null,
				requestGroupCode: "",
				requestGroupName: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
				numberRequestType: null,
				numberRequest: "",
				numberRequestData: "",
			},
			defaultItem: {
				id: null,
				requestGroupCode: "",
				requestGroupName: "",
				description: "",
				createdId: null,
				createdName: "",
				createdDate: null,
				modifiedId: null,
				modifiedName: "",
				modifiedDate: null,
				isActive: true,
				isDelete: false,
				numberRequestType: null,
				numberRequest: "",
				numberRequestData: "",
			},
		};
	},

	computed: {
		formTitle() {
			return this.editedIndex === -1
				? this.$t("title.create_group_request")
				: this.$t("title.edit_group_request");
		},
		form() {
			return {
				requestGroupName: this.editedItem.requestGroupName,
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
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
		dialogView(val) {
			val || this.closeView();
		},
	},

	async created() {
		await this.$Progress.start();
		await this.initialize();
	},
	mounted() {
		this.$Progress.finish();
	},

	methods: {
		async initialize() {
			let response = await globalService.getData_Async(
				"/api/_all/request-groups",
			);
			if (!response.state) {
				return;
			}
			this.desserts = response.data.filter((entry) => {
				return entry.isDelete == false;
			});
			this.sortList(this.desserts);
			this.items = [
				{
					text: "Home",
					disable: false,
					href: "/Home",
				},
				{
					text: this.$t(`title.list_of_request_group`),
					disable: true,
				},
			];
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
			this.updateItem.isDelete = true;
			let response = await globalService.putData_Async(
				"/api/request-groups/" + this.updateItem.id,
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
				"/api/_save/request-groups/",
				this.selected,
			);
			if (!response.state) {
				this.isDeleting = false;
				return this.toastError(response.message);
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
				this.editedItem.requestGroupName != "" ||
				this.editedItem.requestGroupName.length < 255
			) {
				this.errorMessage = "";
			}
			if (this.editedItem.requestGroupName.length > 255) {
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
		onKeyUpSearchForRequestGroupCode() {
			if (
				this.requestGroupCode != "" ||
				this.requestGroupCode.length < 255
			) {
				this.errorMessageSearchRequestGroupCode = "";
			}
			if (this.requestGroupCode.length > 255) {
				this.errorMessageSearchRequestGroupCode = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForRequestGroupName() {
			if (
				this.requestGroupName != "" ||
				this.requestGroupName.length < 255
			) {
				this.errorMessageSearchRequestGroupName = "";
			}
			if (this.requestGroupName.length > 255) {
				this.errorMessageSearchRequestGroupName = this.$t(
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

		async save() {
			this.formErrorMaxLength = false;
			this.formError = false;
			for (let key of Object.keys(this.form)) {
				if (!this.form[key] || this.form[key].trim().length == 0) {
					this.formError = true;
					this.$refs[key].focus();
				}
				if (this.form[key].trim().length > 255) {
					this.formErrorMaxLength = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate();
			}
			if (this.formError) {
				return (this.errorMessage = this.$t("message.msg_1"));
			}
			if (this.formErrorMaxLength) {
				return (this.errorMessage = this.$t(
					"message.maxlength_required_255",
				));
			}
			if (this.editedItem.description.length > 255) {
				return (this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				));
			}
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			// let responseCheck = await globalService.postData_Async(
			// 	"/api/check_code/request-groups",
			// 	this.editedItem,
			// );
			// if (!responseCheck.state) {
			// 	this.toastError(
			// 		"Tên của bạn đang bị trùng vui lòng nhập tên khác để không bị trùng mã",
			// 	);
			// 	return;
			// }
			if (this.editedIndex > -1) {
				this.editedItem.modifiedDate = new Date();
				this.editedItem.modifiedName = this.user_current.fullName;
				this.editedItem.requestGroupName =
					this.editedItem.requestGroupName
						.trim()
						.replace(/\s+/g, " ");
				this.editedItem.description = this.editedItem.description
					.trim()
					.replace(/\s+/g, " ");
				let response = await globalService.putData_Async(
					`/api/request-groups/${this.editedItem.id}`,
					this.editedItem,
				);
				if (response.state) {
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					this.isSaving = false;
					this.toastError(this.$t("message.update_error"));
				}
			} else {
				this.editedItem.createdName = this.user_current.fullName;
				this.editedItem.modifiedDate = new Date();
				this.editedItem.createdDate = new Date();
				this.editedItem.modifiedName = this.user_current.fullName;
				this.editedItem.requestGroupName =
					this.editedItem.requestGroupName
						.trim()
						.replace(/\s+/g, " ");
				this.editedItem.description = this.editedItem.description
					.trim()
					.replace(/\s+/g, " ");
				let response = await globalService.postData_Async(
					"/api/request-groups",
					this.editedItem,
				);
				if (response.state) {
					this.toastSuccess(this.$t("message.add_success"));
				} else {
					this.toastError(this.$t("message.add_error"));
				}
			}
			this.isSaving = false;
			this.initialize();
			this.close();
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
