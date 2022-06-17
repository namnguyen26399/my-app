<template>
	<v-card elevation="0">
		<Breadcrumbs />
		<v-card-title>
			<v-row class="p-0 w-full">
				<router-link
					:to="{
						path: '/phieu-yeu-cau/tao-moi',
					}"
					style="text-decoration: none; margin-right: 1rem"
					color="blue darken-1"
					dark
					text
				>
					<v-btn class="mb-4 mr-2 rounded" text>
						<v-icon> mdi-plus </v-icon>
						{{ $t("button.create") }}
						<v-icon>mdi-menu-down</v-icon>
					</v-btn>
				</router-link>

				<v-btn class="mb-4 mr-2 rounded" text @click="deleteAll">
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
						single-line
						class="mt-2 mx-4"
					></v-text-field> -->
			</v-row>
		</v-card-title>
		<v-dialog v-model="dialog.delete" max-width="fit-content">
			<DeleteDialogVue
				@close="closeDelete"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-row>
			<v-col
				cols="12"
				md="12"
				class="d-flex w-full"
				style="justify-content: space-between"
			>
				<div class="d-flex">
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								<v-chip
									@click="allRequest()"
									:class="getClassAllSelect()"
									:dark="allSelect"
								>
									{{ $t("label.show_all") }}
								</v-chip>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								<v-chip
									@click="inProcessRequest()"
									:class="getClassFilterInprocess()"
									:dark="filterInprocess"
								>
									{{ $t("button.in_due_date") }}
								</v-chip>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								<v-chip
									@click="aboutExpireRequest()"
									:class="getClassFilterAboutExpire()"
									:dark="filterAboutExpire"
									>{{ $t("button.expiration_soon") }}</v-chip
								>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								<v-chip
									@click="overdueRequest()"
									:class="getClassFilterOverdue()"
									:dark="filterOverdue"
								>
									{{ $t("button.out_of_date") }}
								</v-chip>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</div>
				<div class="d-flex">
					<v-list-item>
						<vue-excel-xlsx
							:data="json_data"
							:file-name="getFilenameExcel()"
							:columns="json_fields"
							:file-type="'xlsx'"
							:sheet-name="headExcl"
						>
							<v-btn text tile>
								<v-icon> mdi-swap-vertical </v-icon>
								{{ $t("button.excel_export") }}
							</v-btn>
						</vue-excel-xlsx>
						<!-- <download-excel
							:data="json_data"
							:fields="json_fields"
							worksheet="Phiếu yêu cầu"
							:name="getFilenameExcel()"
							:header="headExcl"
						>
							<v-btn text tile color="orange">
								<v-icon color="orange">
									mdi-swap-vertical
								</v-icon>
								Xuất excel
							</v-btn>
						</download-excel> -->
					</v-list-item>
					<v-list-item>
						<v-btn text tile @click="openRequestModifyDialog">
							<v-icon> mdi-swap-vertical </v-icon>
							{{ $t("button.modify_request") }}
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-btn text tile @click="openApproveDialog">
							<v-icon> mdi-check </v-icon>
							{{ $t("label.approve") }}
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-btn text tile @click="openDenyDialog">
							<v-icon> mdi-close </v-icon>
							{{ $t("label.deny") }}
						</v-btn>
					</v-list-item>
				</div>
			</v-col>
		</v-row>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listRequestData"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			:custom-filter="customFilter"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="requestDataCode"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.requestDataCode')"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="requestDataName"
							type="string"
							outlined
							dense
							class="mt-2"
							:label="$t('label.requestDataName')"
						></v-text-field>
					</td>
					<td>
						<v-select
							v-model="isActive"
							outlined
							dense
							class="mt-2"
							:items="filterItems"
							label="Được sử dụng"
						></v-select>
					</td>
					<td>
						<v-text-field
							v-model="createdName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Người tạo"
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
					<td></td>
				</tr>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-btn
					icon
					class="mr-2"
					color="blue darken-1"
					:to="{ path: `/phieu-yeu-cau/${item.id}/chi-tiet` }"
				>
					<v-icon> mdi-pencil-circle </v-icon>
				</v-btn>
				<v-btn icon color="red" @click="deleteItem(item)">
					<v-icon> mdi-close-circle </v-icon>
				</v-btn>
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
			<template v-slot:no-data>
				<h3>{{ $t("message.no_data") }}</h3>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog.deny" max-width="60vw">
			<v-card>
				<v-toolbar>
					<v-toolbar-title> {{ $t("label.deny") }} </v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text class="mt-5">
					<v-textarea
						label="Ý kiến/Ghi chú"
						outlined
						dense
						single-line
					>
					</v-textarea>
					<v-file-input
						label="Tải lên"
						outlined
						dense
						single-line
					></v-file-input>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red" dark @click="closeDialog">
						<v-icon>mdi-close</v-icon>
						{{ $t("button.close") }}
					</v-btn>
					<v-btn color="blue" dark>
						<v-icon>mdi-backup-restore</v-icon>
						{{ $t("label.deny") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialog.requestmodify" max-width="60vw">
			<v-card>
				<v-toolbar>
					<v-toolbar-title>
						{{ $t("button.modify_request") }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text class="mt-5">
					<v-textarea
						label="Ý kiến/Ghi chú"
						outlined
						dense
						single-line
					>
					</v-textarea>
					<v-file-input
						label="Tải lên"
						outlined
						dense
						single-line
					></v-file-input>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red" dark @click="closeDialog">
						<v-icon>mdi-close</v-icon>
						Đóng
					</v-btn>
					<v-btn color="blue" dark>
						<v-icon>mdi-swap-horizontal</v-icon>
						Yêu cầu sửa đổi
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialog.approve" max-width="60vw">
			<v-card>
				<v-toolbar>
					<v-toolbar-title> Phê duyệt </v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text class="mt-5">
					<v-textarea
						label="Ý kiến/Ghi chú"
						outlined
						dense
						single-line
					>
					</v-textarea>
					<v-file-input
						label="Tải lên"
						outlined
						dense
						single-line
					></v-file-input>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red" dark @click="closeDialog">
						<v-icon>mdi-close</v-icon>
						Đóng
					</v-btn>
					<v-btn color="blue" dark>
						<v-icon>mdi-check</v-icon>
						Phê duyệt
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import moment from "moment";
import administratorAPI from "../../administrator/administrator.api";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";

export default {
	components: { Breadcrumbs, DeleteDialogVue },
	name: "VsmFeListrequestform",

	data() {
		return {
			user_info: this.getUserInfo(),
			listRequestData: [],
			showPicker: false,
			dialogDeleteAll: false,
			selected: [],
			headers: [
				{
					text: "Mã YC",
					value: "requestDataCode",

					filter: (value) => {
						if (!this.requestDataCode) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.requestDataCode,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Tên loại YC",
					value: "requestDataName",

					filter: (value) => {
						if (!this.requestDataName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.requestDataName,
								).toLocaleUpperCase(),
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
					text: this.$t("label.created_name"),
					value: "createdName",

					filter: (value) => {
						if (!this.createdName) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.createdName,
								).toLocaleUpperCase(),
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
					text: this.$t("label.manipulation"),

					value: "actions",
					sortable: false,
				},
			],
			items: [],
			search: "",
			singleSelect: false,
			requestDataCode: "",
			requestDataName: "",
			isDeleting: false,
			createdName: "",
			createdDate: null,
			json_fields: [],
			json_data: [],
			json_meta: [
				[
					{
						key: "charset",
						value: "utf-8",
					},
				],
			],
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			dateFormat: "DD/MM/yyyy",
			isActive: this.$t("label.show_all"),
			userId: null,
			dialog: {
				delete: false,
				deny: false,
				approve: false,
				requestmodify: false,
			},
			requestFilter: [],
			requestAll: [],
			requestOverdue: [],
			requestAboutExpỉe: [],
			allSelect: true,
			filterInprocess: false,
			filterOverdue: false,
			filterAboutExpire: false,
			headExcl: "",
			requestInprocess: false,
			requestOver: false,
			requestAbout: false,
		};
	},
	computed: {
		formatDateFns() {
			return this.createdDate
				? moment(this.createdDate).format(this.dateFormat)
				: "";
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
		"dialog.delete"(val) {
			val || this.closeDelete();
		},
		dialogView(val) {
			val || this.closeView();
		},
		dialogDeleteAll(val) {
			val || this.closeDeleteAll();
		},
	},
	mounted() {
		this.getRequestForm();
	},

	methods: {
		async getRequestForm() {
			this.requestInprocess = false;
			this.requestOver = false;
			this.requestAbout = false;
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestData(),
				);

				// response = await globalService.getData_Async(
				// 	administratorAPI.API_GetAllByUserIdRequestData(
				// 		this.user_info.id,
				// 	),
				// );

				if (!response || !response.state) {
					this.toastError(this.$t("error.load"));
				}

				this.requestAll = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.listRequestData = Object.assign([], this.requestAll);
				this.sortList(this.listRequestData);
				this.headExcl = "Danh sách phiếu yêu cầu";
				this.json_fields = this.getJsonFields(this.headers);
				this.json_data = Object.assign([], this.listRequestData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		closeDelete() {
			this.dialog.delete = false;
		},

		closeDeleteAll() {
			this.dialogDeleteAll = false;
		},
		deleteAll() {
			if (this.selected.length > 0) {
				this.dialog.delete = true;
			} else {
				this.toastError(this.$t("label.no_selected"));
			}
		},
		onConfirmDelete(value) {
			if (!value) {
				this.closeDelete();
			} else {
				if (this.selected) {
					this.deleteAllConfirm();
				}
			}
		},
		deleteItem(item) {
			this.selected = [item];
			this.dialogDelete = true;
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
				administratorAPI.API_DeleteAllRequestData(),
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
			this.getRequestForm();
			this.closeDelete();
		},
		openDenyDialog() {
			this.dialog.deny = true;
		},
		openApproveDialog() {
			this.dialog.approve = true;
		},
		openRequestModifyDialog() {
			this.dialog.requestmodify = true;
		},
		closeDialog() {
			this.dialog.deny = false;
			this.dialog.approve = false;
			this.dialog.requestmodify = false;
		},
		allRequest() {
			this.selected = [];
			this.allSelect = true;
			this.filterInprocess = false;
			this.filterOverdue = false;
			this.filterAboutExpire = false;
			this.listRequestData = Object.assign([], this.requestAll);
			this.headExcl = "Danh sách phiếu yêu cầu";
		},
		async inProcessRequest() {
			this.selected = [];
			this.allSelect = false;
			this.filterInprocess = true;
			this.filterOverdue = false;
			this.filterAboutExpire = false;
			if (!this.requestInprocess) {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetRequestInProcessing(
						this.user_info.id,
					),
				);
				if (!response || !response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.requestFilter = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			}
			this.listRequestData = Object.assign([], this.requestFilter);

			this.sortList(this.listRequestData);
			this.headExcl = "Danh sách phiếu yêu cầu trong hạn";
			this.json_fields = this.getJsonFields(this.headers);
			this.json_data = Object.assign([], this.listRequestData);
			this.requestInprocess = true;
		},
		async overdueRequest() {
			this.selected = [];
			this.allSelect = false;
			this.filterInprocess = false;
			this.filterOverdue = true;
			this.filterAboutExpire = false;
			if (!this.requestOver) {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetRequestOverDueByUserId(
						this.user_info.id,
					),
				);
				if (!response || !response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.requestOverdue = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			}
			this.listRequestData = Object.assign([], this.requestOverdue);
			this.sortList(this.listRequestData);
			this.headExcl = "Danh sách phiếu yêu cầu quá hạn";
			this.json_fields = this.getJsonFields(this.headers);
			this.json_data = Object.assign([], this.listRequestData);
			this.requestOver = true;
		},
		async aboutExpireRequest() {
			this.selected = [];
			this.allSelect = false;
			this.filterInprocess = false;
			this.filterOverdue = false;
			this.filterAboutExpire = true;
			if (!this.requestAbout) {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetRequestAboutToExpireByUserId(
						this.user_info.id,
					),
				);
				if (!response || !response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.requestAboutExpỉe = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			}
			this.listRequestData = Object.assign([], this.requestAboutExpỉe);
			this.sortList(this.listRequestData);
			this.headExcl = "Danh sách phiếu yêu cầu sắp hết hạn";
			this.json_fields = this.getJsonFields(this.headers);
			this.json_data = Object.assign([], this.listRequestData);
			this.requestAbout = true;
		},
		getClassAllSelect() {
			if (this.allSelect) {
				return "blue darken-1";
			}
			return "";
		},
		getClassFilterInprocess() {
			if (this.filterInprocess) {
				return "blue darken-1";
			}
			return "";
		},
		getClassFilterAboutExpire() {
			if (this.filterAboutExpire) {
				return "blue darken-1";
			}
			return "";
		},
		getClassFilterOverdue() {
			if (this.filterOverdue) {
				return "blue darken-1";
			}
			return "";
		},
		getFilenameExcel() {
			let str = "Phieu_yeu_cau_" + new Date().getTime() + ".xls";
			return str;
		},
	},
};
</script>
