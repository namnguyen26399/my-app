<template>
	<v-card>
		<BreadcrumbsVue />
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
					<div class="d-flex">
						<v-btn
							:to="{
								path: '/phieu-yeu-cau/tao-moi',
							}"
							text
							class="mb-4 mr-2 rounded"
						>
							<v-icon> mdi-plus </v-icon>
							{{ $t("button.create") }}
						</v-btn>
						<v-btn text class="mb-4 mr-2 rounded">
							<v-icon> mdi-arrow-up </v-icon>
							{{ $t("button.import") }}
						</v-btn>
						<v-btn
							text
							class="mb-4 mr-2 rounded"
							@click="deleteAll"
						>
							<v-icon> mdi-trash-can-outline </v-icon>
							{{ $t("button.delete_all") }}
						</v-btn>
					</div>
				</div>
				<div class="d-flex">
					<v-list-item>
						<vue-excel-xlsx
							:data="json_data"
							:file-name="getFilenameExcel()"
							:columns="json_fields"
							:file-type="'xlsx'"
							:sheet-name="'Phiếu đang soạn'"
						>
							<!-- <v-btn text tile color="orange">
								<v-icon color="orange">
									mdi-swap-vertical
								</v-icon>
								Xuất excel
							</v-btn> -->
							<v-btn text>
								<v-icon> mdi-swap-vertical </v-icon>
								Export
							</v-btn>
						</vue-excel-xlsx>
					</v-list-item>
					<v-list-item>
						<v-icon @click="isShowFilter = !isShowFilter">
							mdi-filter-outline</v-icon
						>
					</v-list-item>
				</div>
			</v-col>
		</v-row>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listRequestData"
			item-key="id"
			show-select
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:[`body.prepend`] v-if="isShowFilter">
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="s_title"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Tiêu đề"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="s_requestDataName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Loại yêu cầu"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="s_statusName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Trạng thái"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="s_approverName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Người phê duyệt"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="s_createdOrgName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Bộ phận trình"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="createdName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Người soạn"
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
			<template v-slot:[`item.title`]="{ item }">
				<td>
					<v-btn
						:to="{
							path: `/phieu-yeu-cau/chi-tiet/${item.id}`,
						}"
						text
						class="blue--text text-decoration-underline"
					>
						{{ item.title }}</v-btn
					>
					<v-menu offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								icon
								v-bind="attrs"
								v-on="on"
								class="float-right"
							>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item
								:to="{
									path: `/phieu-yeu-cau/chi-tiet/${item.id}`,
								}"
							>
								<v-list-item-icon>
									<v-icon color="green darken-2">
										mdi-eye-circle
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>
									{{ $t("button.view") }}
								</v-list-item-title>
							</v-list-item>

							<v-list-item
								:to="{
									path: `/phieu-yeu-cau/${item.id}/chi-tiet`,
								}"
							>
								<v-list-item-icon>
									<v-icon color="blue darken-2">
										mdi-pencil-circle
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>
									{{ $t("button.edit") }}
								</v-list-item-title>
							</v-list-item>
							<v-list-item @click="deleteItem(item)">
								<v-list-item-icon>
									<v-icon color="red darken-2">
										mdi-delete-circle
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>
									{{ $t("button.delete") }}
								</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</td>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-btn
					icon
					class="mr-2"
					color="blue darken-1"
					:to="{ path: `/phieu-yeu-cau/${item.id}/chi-tiet` }"
				>
					<v-icon> mdi-pencil </v-icon>
				</v-btn>
				<v-btn icon color="red" @click="deleteItem(item)">
					<v-icon> mdi-trash-can-outline </v-icon>
				</v-btn>
			</template>
			<template v-slot:[`item.opproverName`]="{ item }">
				<v-list-item-avatar class="mx-0">
					<v-avatar color="indigo mr-2" size="36">
						<span class="white--text" v-if="item.opproverName">
							{{ getAvatarText(item.opproverName) }}
						</span>
					</v-avatar>
				</v-list-item-avatar>
				{{ item.opproverName }}
			</template>
			<template v-slot:[`item.createdName`]="{ item }">
				<v-list-item>
					<v-list-item-avatar class="mx-0">
						<v-avatar color="indigo mr-2" size="36">
							<span class="white--text" v-if="item.createdName">
								{{ getAvatarText(item.createdName) }}
							</span>
						</v-avatar>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>
							{{ item.createdName }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ item.createdOrgName }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
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
			<template v-slot:[`item.statusName`]="{ item }">
				<span :style="{ color: getColor(item) }">
					<span class="iconify" data-icon="mdi:brightness-1"></span>
					{{ item.statusName }}</span
				>
			</template>
			<template v-slot:no-data>
				<h3>{{ $t("message.no_data") }}</h3>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import moment from "moment";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
export default {
	components: { BreadcrumbsVue, DeleteDialogVue },
	data() {
		return {
			isShowFilter: false,
			user_info: this.getUserInfo(),
			listRequestData: [],
			selected: [],
			dateFormat: "DD/MM/yyyy HH:mm",
			dialogDelete: false,
			showPicker: false,
			createdDate: null,
			createdName: "",
			ALL_STATUS: [],
			s_title: "",
			s_requestDataName: "",
			s_approverName: "",
			s_statusName: "",
			s_createdOrgName: "",
			isDeleting: false,
			dialog: { delete: false },
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
			isActive: this.$t("label.show_all"),
			headers: [
				{
					text: "Tiêu đề",
					value: "title",

					filter: (value) => {
						if (!this.s_title) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.s_title,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Loại yêu cầu",
					value: "requestDataName",

					filter: (value) => {
						if (!this.s_requestDataName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.s_requestDataName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Trạng thái",
					value: "statusName",

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
					text: "Người duyệt",
					value: "approverName",

					filter: (value) => {
						if (!this.s_approverName) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this._approverName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Bộ phận trình",
					value: "createdOrgName",

					filter: (value) => {
						if (!this.s_createdOrgName) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.s_createdOrgName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Người soạn",
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
			],
		};
	},
	watch: {
		"dialog.delete"(val) {
			val || this.closeDelete();
		},
	},
	computed: {
		formatDateFns() {
			return this.createdDate
				? moment(this.createdDate).format(this.dateFormat)
				: "";
		},
	},
	async created() {
		await this.getAllStatus();
	},
	mounted() {
		this.getAllRequestApproved();
	},
	methods: {
		getColor(item) {
			if (!item.status?.id) return "#000000";
			let status = this.ALL_STATUS.find(
				(ele) => ele.id == item.status.id,
			);
			if (!status?.statusColor) return "#000000";
			return "#" + status.statusColor;
		},
		async getAllRequestApproved() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetRequestApproved(this.user_info.id),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.listRequestData = response.data.filter((entry) => {
				{
					return !entry.isDelete;
				}
			});
			this.sortList(this.listRequestData);
			this.json_fields = this.getJsonFields(this.headers);
			this.json_data = Object.assign([], this.listRequestData);
		},
		async getAllStatus() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllStatus(),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.ALL_STATUS = response.data.filter((entry) => {
				{
					return !entry.isDelete && entry.isActive;
				}
			});
			this.sortList(this.ALL_STATUS);
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
			this.dialog.delete = true;
		},
		closeDelete() {
			this.dialog.delete = false;
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
			this.getAllRequestApproved();
			this.closeDelete();
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
		getFilenameExcel() {
			let str = "Phieu_dang_soan_" + new Date().getTime() + ".xls";
			return str;
		},
	},
};
</script>

<style lang="scss" scoped>
.text-color {
	color: var(--status-color);
}
</style>
