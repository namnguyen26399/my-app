<template>
	<v-card>
		<v-toolbar-title class="mt-2 ml-2">{{
			$t("title.list_of_data_field")
		}}</v-toolbar-title>
		<div>
			<v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
		</div>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="desserts"
			:single-select="singleSelect"
			item-key="Stt"
			show-select
			class="elevation-1"
			:search="search"
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

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.fieldDataCode
												"
												:label="$t('label.code_field')"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.fieldDateName
												"
												:label="$t('label.name_field')"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.objectModel"
												:label="$t('label.format')"
											></v-text-field>
										</v-col>
										<!-- <v-col cols="12" sm="12" md="12">
											<v-text-field
												:v-model="editedItem.createdDate"
												:label="$t('label.created_date')"
											></v-text-field>
										</v-col> -->
										<v-col cols="12" sm="12" md="12">
											<span>{{
												$t("label.is_active")
											}}</span>
											<v-simple-checkbox
												v-model="editedItem.isActive"
											></v-simple-checkbox>
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
													editedItem.fieldDataCode
												"
												:label="$t('label.code_field')"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="
													editedItem.fieldDateName
												"
												:label="$t('label.name_field')"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.objectModel"
												:label="$t('label.format')"
												readonly
											></v-text-field>
										</v-col>
										<!-- <v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.createdDate"
												:label="$t('label.date_create')"
												readonly
											></v-text-field>
										</v-col> -->
										<v-col cols="12" sm="12" md="12">
											<span>{{
												$t("label.is_active")
											}}</span>
											<v-simple-checkbox
												v-model="editedItem.isSuDung"
												disabled
											></v-simple-checkbox>
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
			<template v-slot:no-data>
				<v-btn color="primary" @click="initialize"> Reset </v-btn>
			</template>
			<template v-slot:no-results
				><h1>{{ $t("message.no_results") }}</h1>
			</template>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
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
export default {
	name: "ListDataField",
	data() {
		return {
			singleSelect: false,
			dateFormat: "DD/MM/yyyy",
			stt: "",
			createdDate: null,
			selected: [],
			dialog: false,
			dialogView: false,
			dialogDelete: false,
			search: "",
			items: [],
			headers: [
				// {
				// 	text: "STT",
				// 	align: "start",
				// 	sortable: true,
				// 	filterable: false,
				// 	value: "Stt",
				// },
				{
					text: this.$t("label.code_field"),
					value: "fieldDataCode",
				},
				{
					text: this.$t("label.name_field"),
					value: "fieldDateName",
				},
				{
					text: this.$t("label.format"),
					value: "objectModel",
				},
				{
					text: this.$t("label.date_create"),
					value: "createdDate",
					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.createdDate) return true;
						return value.includes(this.createdDate);
					},
				},
				{ text: this.$t("label.is_active"), value: "isActive" },
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
				fieldDataCode: "",
				fieldDateName: "",
				objectSchema: "",
				objectModel: "",
				createdId: 0,
				createdName: "",
				createdDate: new Date(),
				modifiedId: 0,
				modifiedName: new Date(),
				modifiedDate: "",
				isActive: false,
			},
			defaultItem: {
				id: null,
				fieldDataCode: "",
				fieldDateName: "",
				objectSchema: "",
				objectModel: "",
				createdId: 0,
				createdName: "",
				createdDate: new Date(),
				modifiedId: 0,
				modifiedName: "",
				modifiedDate: new Date(),
				isActive: false,
			},
		};
	},

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "Thêm mới" : "Chỉnh sửa";
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
			let response = await globalService.getData_Async("/api/field-data");
			if (!response.state) {
				return;
			}
			this.desserts = response.data;
			this.items = [
				{
					text: "Home",
					disable: false,
					href: "/Home",
				},
				{
					text: this.$t(`title.list_of_data_field`),
					disable: true,
				},
			];
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
			let response = await globalService.deleteData_Async(
				`/api/field-data/${this.editedIndex}`,
				this.editedItem,
			);
			if (response.state) {
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
				alert(this.$t("label.alert_no_selected"));
			}
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
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
				let response = await globalService.putData_Async(
					"/api/field-data",
					this.editedItem,
				);
				if (response.state) {
					this.success = true;
				} else {
					this.isSaving = false;
					this.error = true;
				}
			} else {
				let response = await globalService.postData_Async(
					"/api/field-data",
					this.editedItem,
				);
				if (response.state) {
					this.success = true;
				} else {
					this.isSaving = false;
					this.error = true;
				}
			}
			this.initialize();
			this.close();
		},
	},
};
</script>
