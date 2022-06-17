<template>
	<div>
		<v-snackbar
			v-model="snackbar"
			:timeout="1500"
			:value="true"
			absolute
			shaped
			top
			tile
			color="orange  accent-2"
		>
			{{ $t("label.no_selected") }}
		</v-snackbar>
		<v-snackbar
			v-model="success"
			:timeout="1500"
			:value="true"
			absolute
			shaped
			top
			tile
			color="success accent-2"
		>
			{{ $t("message.success") }}
		</v-snackbar>
		<v-snackbar
			v-model="error"
			:timeout="1500"
			:value="true"
			absolute
			shaped
			top
			tile
			color="red accent-2"
		>
			{{ $t("message.error") }}
		</v-snackbar>
		<!-- <v-toolbar-title class="mt-2 ml-2">{{
			$t("title.list_of_request_types")
		}}</v-toolbar-title> -->
		<div>
			<v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
		</div>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="desserts"
			:single-select="singleSelect"
			item-key="id"
			show-select
			class="elevation-1"
			:search="search"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-dialog v-model="dialog" max-width="60vw">
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								:label="$t('title.search')"
								single-line
								hide-details
								class="mx-4"
							></v-text-field>
							<div>
								<v-btn
									color="primary"
									dark
									class="mb-2"
									v-bind="attrs"
									v-on="on"
								>
									<v-icon small color="white">
										mdi-plus-circle
									</v-icon>
									{{ $t("button.create") }}
								</v-btn>
								<v-btn
									color="red"
									class="ml-2 mb-2"
									dark
									@click="deleteAll"
								>
									{{ $t("button.delete_all") }}
								</v-btn>
							</div>
						</template>

						<v-card>
							<v-card-title>
								<span class="text-h5">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text class="mt-3">
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.requestTypeCode
												"
												:label="
													$t(
														'label.request_type_code',
													)
												"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.requestTypeName
												"
												:label="
													$t(
														'label.request_type_name',
													)
												"
											></v-text-field>
										</v-col>
										<!-- <v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.properties"
												:label="
													$t(
														'label.belonging_to_the_request_group',
													)
												"
											></v-text-field>
										</v-col> -->
										<!-- <v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.process"
												:label="
													$t(
														'label.application_process',
													)
												"
											></v-text-field>
										</v-col> -->
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="editedItem.isActive"
												:label="$t('label.is_active')"
											></v-checkbox>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.createdName"
												:label="
													$t('label.created_name')
												"
											></v-text-field>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="blue darken-1"
									text
									@click="close"
								>
									<v-icon>mdi-close </v-icon>
									{{ $t("button.cancel") }}
								</v-btn>
								<v-btn color="blue darken-1" text @click="save">
									{{ $t("button.save") }}
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogView" max-width="60vw">
						<v-card>
							<v-card-title>
								<span class="text-h5">Thông tin</span>
							</v-card-title>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.requestTypeCode
												"
												:label="
													$t(
														'label.request_type_code',
													)
												"
												outlined
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.requestTypeName
												"
												:label="
													$t(
														'label.request_type_name',
													)
												"
												outlined
												readonly
											></v-text-field>
										</v-col>
										<!-- <v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.properties"
												:label="
													$t(
														'label.belonging_to_the_request_group',
													)
												"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.process"
												:label="
													$t(
														'label.application_process',
													)
												"
												readonly
											></v-text-field>
										</v-col> -->
										<v-col cols="12" sm="12" md="12">
											<v-checkbox
												v-model="editedItem.isActive"
												:label="$t('label.is_active')"
												disabled
											></v-checkbox>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.createdName"
												:label="
													$t('label.created_name')
												"
												readonly
												outlined
											></v-text-field>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="blue darken-1"
									text
									@click="closeView"
								>
									<v-icon>mdi-close </v-icon>
									{{ $t("button.cancel") }}
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete" max-width="20vw">
						<v-card>
							<v-card-title class="text-h5">{{
								$t("label.confirm_delete")
							}}</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="blue darken-1"
									text
									@click="closeDelete"
									>{{ $t("button.no") }}</v-btn
								>
								<v-btn
									color="blue darken-1"
									text
									@click="deleteItemConfirm"
									>{{ $t("button.yes") }}</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>

			<template v-slot:footer>
				<v-divider></v-divider>
				<v-row>
					<v-col>
						<v-text-field
							v-model="requestTypeCode"
							type="string"
							label="Mã loại YC"
						></v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							v-model="requestTypeName"
							type="string"
							label="Tên loại YC"
						></v-text-field>
					</v-col>
					<v-col>
						<v-select
							v-model="isActive"
							:items="filterItems"
							label="Được sử dụng"
						></v-select>
					</v-col>
					<v-col>
						<v-text-field
							v-model="createdName"
							type="string"
							label="Người tạo"
						></v-text-field>
					</v-col>
				</v-row>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					small
					class="mr-2"
					color="primary"
					@click="viewItem(item)"
				>
					mdi-eye
				</v-icon>
				<v-icon
					small
					class="mr-2"
					color="primary"
					@click="editItem(item)"
				>
					mdi-pencil
				</v-icon>
				<v-icon small color="red" @click="deleteItem(item)">
					mdi-trash-can-outline
				</v-icon>
			</template>
			<template v-slot:[`item.isActive`]="{ item }">
				<v-simple-checkbox
					v-model="item.isActive"
					disabled
				></v-simple-checkbox>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import GlobalService from "../../services/global.service";

export default {
	name: "ListKindRequest",
	data() {
		return {
			requestTypeCode: "",
			requestTypeName: "",
			createdName: "",
			isActive: this.$t("label.show_all"),
			singleSelect: false,
			selected: [],
			dialog: false,
			dialogView: false,
			dialogDelete: false,
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			items: [],
			search: "",
			snackbar: false,
			success: false,
			error: false,
			isDeleting: false,
			isSaving: false,
			headers: [
				{
					text: this.$t("label.request_type_code"),
					value: "requestTypeCode",
					filter: (value) => {
						if (!this.requestTypeCode || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(this.requestTypeCode.toLocaleUpperCase());
					},
				},
				{
					text: this.$t("label.request_type_name"),
					value: "requestTypeName",
					filter: (value) => {
						if (!this.requestTypeName || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(this.requestTypeName.toLocaleUpperCase());
					},
				},
				// {
				// 	text: this.$t("label.belonging_to_the_request_group"),
				// 	value: "properties",
				// },
				// {
				// 	text: this.$t("label.application_process"),
				// 	value: "process",
				// },
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
					text: this.$t("label.created_name"),
					value: "createdName",
					filter: (value) => {
						if (!this.requestTypeName || !value) return true;

						return value
							.toLocaleUpperCase()
							.includes(this.requestTypeName.toLocaleUpperCase());
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
				createdDate: new Date(),
				createdId: 0,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: true,
				modifiedDate: new Date(),
				modifiedId: 0,
				modifiedName: "",
				numberRequest: 0,
				numberRequestData: 0,
				numberRequestType: 0,
				requestTypeCode: "",
				requestTypeName: "",
			},
			defaultItem: {
				createdDate: new Date(),
				createdId: 0,
				createdName: "",
				id: null,
				isActive: true,
				isDelete: true,
				modifiedDate: new Date(),
				modifiedId: 0,
				modifiedName: "",
				numberRequest: 0,
				numberRequestData: 0,
				numberRequestType: 0,
				requestTypeCode: "",
				requestTypeName: "",
			},
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

	created() {
		this.initialize();
	},

	methods: {
		async initialize() {
			let response = await GlobalService.getData_Async(
				"/api/request-types",
			);
			this.desserts = response;
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
		},
		filterStepCode($event) {
			console.log($event);
		},

		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		viewItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogView = true;
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		async deleteItemConfirm() {
			if (this.isDeleting) {
				return;
			}
			this.isDeleting = true;
			let response = await GlobalService.deleteData_Async(
				`/api/request-types/${this.editedItem.id}`,
				this.editedItem,
			);
			if (!response.state) {
				this.isDeleting = true;
				this.success = true;
			} else {
				this.error = true;
			}
			this.isDeleting = false;
			this.initialize();
			this.closeDelete();
		},
		deleteAll() {
			if (this.selected.length > 0) {
				alert(this.$t("label.confirm_delete"));
			} else {
				this.snackbar = true;
			}
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		filterOnlyCapsText(value, search) {
			return (
				value != null &&
				search != null &&
				typeof value === "string" &&
				value.toString().toLocaleUpperCase().indexOf(search) !== -1
			);
		},
		closeView() {
			this.dialogView = false;
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		async save() {
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			if (this.editedIndex > -1) {
				let response = await GlobalService.putData_Async(
					`/api/request-types/${this.editedItem.id}`,
					this.editedItem,
				);
				this.success = true;
				console.log(response);
			} else {
				let response = await GlobalService.postData_Async(
					"/api/request-types",
					this.editedItem,
				);
				this.success = true;
				console.log(response);
			}
			this.isSaving = false;
			this.initialize();
			this.close();
		},
	},
};
</script>
