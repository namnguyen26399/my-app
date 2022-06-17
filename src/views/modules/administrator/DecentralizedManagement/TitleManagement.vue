<template>
	<v-card elevation="0">
		<v-toolbar-title class="mt-2 ml-2">{{
			$t("title.title_management")
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
							<!-- <v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								:label="$t('title.search')"
								single-line
								hide-details
								class="mx-4"
							></v-text-field> -->
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
												v-model="editedItem.codeTitle"
												:label="$t('label.code_title')"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.nameTitle"
												:label="$t('label.name_title')"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.creater"
												:label="
													$t('label.created_name')
												"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.createdate"
												:label="
													$t('label.created_date')
												"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.status"
												:label="$t('label.status')"
											></v-text-field>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									elevation="0"
									color="red"
									dark
									class="rounded-pill"
									@click="close"
								>
									<v-icon>mdi-close </v-icon>
									{{ $t("button.cancel") }}
								</v-btn>
								<v-btn
									elevation="0"
									color="blue"
									dark
									class="rounded-pill"
									text
									@click="save"
								>
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
												v-model="editedItem.codeTitle"
												:label="$t('label.code_title')"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.nameTitle"
												:label="$t('label.name_title')"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.creater"
												:label="
													$t('label.created_name')
												"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.createdate"
												:label="
													$t('label.created_date')
												"
												readonly
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.status"
												:label="$t('label.status')"
												readonly
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
		</v-data-table>
	</v-card>
</template>
<script>
export default {
	name: "TitleManegement",
	data() {
		return {
			singleSelect: false,
			selected: [],
			dialog: false,
			dialogView: false,
			dialogDelete: false,
			search: "",
			headers: [
				// {
				// 	text: "STT",
				// 	align: "start",
				// 	sortable: true,
				// 	filterable: false,
				// 	value: "Stt",
				// },
				{
					text: this.$t("label.code_title"),
					value: "codeTitle",
				},
				{
					text: this.$t("label.name_title"),
					value: "nameTitle",
				},
				{
					text: this.$t("label.created_name"),
					value: "creater",
				},
				{
					text: this.$t("label.created_date"),
					value: "createdate",
				},
				{ text: this.$t("label.status"), value: "status" },
				{
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			desserts: [],
			editedIndex: -1,
			editedItem: {
				Stt: "",
				codeTitle: "",
				nameTitle: "",
				creater: "",
				status: "",
				createdate: "",
			},
			defaultItem: {
				Stt: "",
				codeTitle: "",
				nameTitle: "",
				creater: "",
				status: "",
				createdate: "",
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
		initialize() {
			(this.items = [
				{
					text: "Home",
					disable: false,
					href: "/Home",
				},
				{
					text: this.$t(`title.title_management`),
					disable: true,
				},
			]),
				(this.desserts = [
					{
						Stt: 1,
						codeTitle: "CD_01",
						nameTitle: "Chuyên viên",
						creater: "quyen.do10",
						createdate: "01/03/2022",
						status: "Hoạt động",
					},
					{
						Stt: 2,
						codeTitle: "CD_002",
						nameTitle: "Trưởng phòng",
						creater: "quyen.do10",
						createdate: "01/03/2022",
						status: "Hoạt động",
					},
					{
						Stt: 3,
						codeTitle: "CD_03",
						nameTitle: "Phó phòng",
						creater: "quyen.do10",
						createdate: "01/03/2022",
						status: "Hoạt động",
					},
					{
						Stt: 4,
						codeTitle: "CD_04",
						nameTitle: "Tổ trưởng",
						creater: "quyen.do10",
						createdate: "01/03/2022",
						status: "Hoạt động",
					},
					{
						Stt: 5,
						codeTitle: "CD_05",
						nameTitle: "Chánh văn phòng",
						creater: "quyen.do10",
						createdate: "01/03/2022",
						status: "Hoạt động",
					},
				]);
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

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
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

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>
