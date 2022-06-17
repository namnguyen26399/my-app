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
							><b>{{ $t("label.request_type_code") }}</b
							>:
							<i>{{
								editedItem.requestTypeCode
							}}</i></v-list-item-title
						>
						<v-list-item-title class="mb-2"
							><b>{{ $t("label.request_type_name") }}</b
							>:
							<i>{{
								editedItem.requestTypeName
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
			:single-select="singleSelect"
			item-key="id"
			show-select
			class="grey lighten-5"
			:search="search"
			:custom-filter="customFilter"
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
						<v-card-title class="p-0 w-full">
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
							<v-spacer></v-spacer>
							<v-btn icon @click="filterExist = !filterExist">
								<v-icon>mdi-filter </v-icon>
							</v-btn>
						</v-card-title>
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
												ref="requestTypeName"
												v-model="
													editedItem.requestTypeName
												"
												dense
												outlined
												@keyup="onKeyUp"
												:error-messages="errorMessage"
											>
												<template v-slot:label>
													{{
														$t(
															"label.request_type_name",
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
												ref="description"
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
											<v-combobox
												ref="requestGroup"
												v-model="
													editedItem.requestGroup
												"
												:items="requestGroups"
												item-text="requestGroupName"
												:item-value="(x) => x"
												outlined
												dense
												:error-messages="
													errorMessageRequestGroup
												"
												@click="clickListRG"
												maxLength="255"
												@change="changeRG"
											>
												<template v-slot:label>
													{{
														$t(
															"label.request_group",
														)
													}}
													<span class="text-red">
														{{ $t("label.star") }}
													</span>
												</template>
												<template
													v-slot:item="{ item }"
												>
													<v-list-item
														@click="
															selectRequestGroup(
																item,
															)
														"
														class="m-1"
													>
														<v-list-item-avatar>
															<v-avatar
																color="indigo mr-2"
																size="36"
															>
																<span
																	class="white--text"
																>
																	{{
																		getAvatarText(
																			item.requestGroupName,
																			2,
																		)
																	}}
																</span>
															</v-avatar>
														</v-list-item-avatar>
														<v-list-item-content>
															<v-list-item-title
																v-html="
																	item.requestGroupName
																"
															>
															</v-list-item-title>
														</v-list-item-content>
													</v-list-item>
												</template>
												<template
													v-slot:selection="{
														attrs,
														item,
													}"
												>
													<v-chip
														v-if="
															!!item && !!item.id
														"
														v-bind="attrs"
														class="mt-2"
													>
														<v-avatar
															color="indigo mr-2"
															size="36"
														>
															<span
																class="white--text"
															>
																{{
																	getAvatarText(
																		item.requestGroupName,
																		2,
																	)
																}}
															</span>
														</v-avatar>
														{{
															item.requestGroupName
														}}
													</v-chip>
												</template>
											</v-combobox>
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
								{{ $t("button.close") }}
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
							outlined
							dense
							class="mt-2"
							maxlength=" 255"
							:label="$t('label.request_type_code')"
							v-model="s_requestTypeCode"
						>
						</v-text-field>
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
							v-model="requestTypeName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.request_type_name')"
							@keyup="onKeyUpSearchForRequestTypeName"
							:error-messages="errorMessageSearchRequestTypeName"
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
			<template v-slot:[`item.requestGroup`]="{ item }">
				{{
					!item.requestGroup ? "" : item.requestGroup.requestGroupName
				}}
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

export default {
	name: "ListTypeRequest",
	components: { DeleteDialogVue, BreadcrumbsVue },
	data() {
		return {
			errorMessage: "",
			errorMessageDes: "",
			errorMessageRequestGroup: "",
			errorMessageSearchRequestTypeCode: "",
			errorMessageSearchRequestTypeName: "",
			errorMessageSearchRequestGroupName: "",
			errorMessageSearchCreatedName: "",
			errorMessageSearchAll: "",
			user_current: this.getUserInfo(),
			requestTypeCode: "",
			requestTypeName: "",
			s_requestTypeCode: "",
			createdName: "",
			createdDate: null,
			modifiedDate: null,
			dateFormat: "DD/MM/yyyy",
			isActive: this.$t("label.show_all"),
			singleSelect: false,
			selected: [],
			dialog: {
				view: false,
				edit: false,
				delete: false,
			},
			showPicker: false,
			showModifyDatePicker: false,
			updateItem: {},
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			items: [],
			search: "",
			isDeleting: false,
			isSaving: false,
			headers: [
				{
					text: this.$t("label.request_type_code"),
					value: "requestTypeCode",
					filter: (value) => {
						if (!this.s_requestTypeCode || !value) return true;
						return value
							.toLocaleUpperCase()
							.includes(
								this.s_requestTypeCode
									.trim()
									.toLocaleUpperCase()
									.replace(/\s+/g, " "),
							);
					},
				},
				{
					text: this.$t("label.request_group_name"),
					value: "requestGroup",
					filter: (value) => {
						if (!this.requestGroupName) return true;
						if (!value) return;
						return (
							value &&
							this.nonAccentVietnamese(value.requestGroupName)
								.toLocaleUpperCase()
								.includes(
									this.nonAccentVietnamese(
										this.requestGroupName,
									)
										.trim()
										.toLocaleUpperCase(),
								)
						);
					},
				},
				{
					text: this.$t("label.request_type_name"),
					value: "requestTypeName",
					filter: (value) => {
						if (!this.requestTypeName || !value) return true;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.requestTypeName)
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
				createdDate: null,
				createdId: null,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: null,
				requestGroup: null,
				numberRequestData: null,
				numberRequestType: null,
				requestTypeCode: "",
				requestTypeName: "",
				description: "",
			},
			defaultItem: {
				createdDate: null,
				createdId: null,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: false,
				modifiedDate: null,
				modifiedId: null,
				modifiedName: "",
				numberRequest: null,
				requestGroup: null,
				numberRequestData: null,
				numberRequestType: null,
				requestTypeCode: "",
				requestTypeName: "",
				description: "",
			},
			requestGroups: [],
			requestGroupName: "",
		};
	},

	computed: {
		isEdit() {
			return this.editedIndex === -1 ? false : true;
		},
		formTitle() {
			return this.editedIndex === -1
				? this.$t("title.create_type_request")
				: this.$t("title.edit_type_request");
		},
		form() {
			return {
				requestTypeName: this.editedItem.requestTypeName,
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
		this.$Progress.start();
		this.initialize();
	},
	mounted() {
		this.$Progress.finish();
	},

	methods: {
		async initialize() {
			let response = await globalService.getData_Async(
				"/api/_all/request-types",
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
					text: this.$t(`title.list_of_request_types`),
					disable: true,
				},
			];
			await this._requestGroups();
		},

		async _requestGroups() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestGroup(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.requestGroups = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.requestGroups = this.sortList(this.requestGroups);
			} catch (error) {
				return [];
			}
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
			if (this.isDeleting) return;
			this.isDeleting = true;
			this.updateItem.isDelete = true;
			let response = await globalService.putData_Async(
				`/api/request-types/${this.updateItem.id}`,
				this.updateItem,
			);
			if (!response || !response.state) {
				this.isDeleting = false;
				this.initialize();
				this.closeDelete();
				return this.toastError(this.$t("message.delete_error"));
			} else {
				this.toastSuccess(this.$t("message.delete_success"));
			}
			this.initialize();
			this.closeDelete();
			this.isDeleting = false;
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
				"/api/_save/request-types",
				this.selected,
			);
			if (!response || !response.state) {
				this.closeDeleteAll();
				return this.toastError(response.message);
			}
			this.toastSuccess(this.$t("message.delete_success"));

			this.initialize();
			this.closeDeleteAll();
		},

		close() {
			this.dialog.edit = false;
			this.errorMessage = "";
			this.errorMessageDes = "";
			this.errorMessageRequestGroup = "";
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
			this.selected = [];
			this.isDeleting = false;
			this.dialog.delete = false;
		},
		onKeyUp() {
			if (
				this.editedItem.requestTypeName != "" ||
				this.editedItem.requestTypeName.length < 255
			) {
				this.errorMessage = "";
			}
			if (this.editedItem.requestTypeName.length > 255) {
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
		onKeyUpSearchForRequestTypeCode() {
			if (
				this.requestTypeCode != "" ||
				this.requestTypeCode.length < 255
			) {
				this.errorMessageSearchRequestTypeCode = "";
			}
			if (this.requestTypeCode.length > 255) {
				this.errorMessageSearchRequestTypeCode = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		onKeyUpSearchForRequestTypeName() {
			if (
				this.requestTypeName != "" ||
				this.requestTypeName.length < 255
			) {
				this.errorMessageSearchRequestTypeName = "";
			}
			if (this.requestTypeName.length > 255) {
				this.errorMessageSearchRequestTypeName = this.$t(
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
			if (
				!this.editedItem.requestGroup ||
				typeof this.editedItem.requestGroup != "object"
			) {
				return (this.errorMessageRequestGroup = this.$t(
					"error.please_fill_form",
				));
			}
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			if (this.editedIndex > -1) {
				this.editedItem.createdName = this.user_current.fullName;
				this.editedItem.modifiedDate = new Date();
				this.editedItem.modifiedName = this.user_current.fullName;
				this.editedItem.requestTypeName =
					this.editedItem.requestTypeName.trim().replace(/\s+/g, " ");
				this.editedItem.description = this.editedItem.description
					.trim()
					.replace(/\s+/g, " ");
				let response = await globalService.putData_Async(
					`/api/request-types/${this.editedItem.id}`,
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
				this.editedItem.requestTypeName =
					this.editedItem.requestTypeName.trim().replace(/\s+/g, " ");
				this.editedItem.description = this.editedItem.description
					.trim()
					.replace(/\s+/g, " ");
				let response = await globalService.postData_Async(
					"/api/request-types",
					this.editedItem,
				);
				if (response.state) {
					this.toastSuccess(this.$t("message.add_success"));
					this.success = true;
				} else {
					this.isSaving = false;
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
		selectRequestGroup(item) {
			this.editedItem.requestGroup = item;
			if (typeof this.editedItem.requestGroup == "object") {
				this.errorMessageRequestGroup = "";
			}
		},
		async clickListRG() {
			await this._requestGroups();
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
		changeRG() {},
	},

	filters: constant.filters,
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
