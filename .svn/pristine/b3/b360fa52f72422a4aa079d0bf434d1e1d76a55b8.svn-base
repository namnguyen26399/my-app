<template>
	<v-card v-if="listTemplateForm" class="overflow-hidden">
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listTemplateForm"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:top>
				<div class="flex items-center">
					<v-card-title> Lựa chọn biểu mẫu </v-card-title>
					<v-spacer></v-spacer>
					<v-btn
						dark
						dense
						class="mb-2 rounded-pill mr-2"
						elevation="0"
						color="blue darken-1"
					>
						<v-icon>mdi-cloud-upload-outline </v-icon
						>{{ $t("title.upload_file") }}</v-btn
					>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						outlined
						dense
						class="mt-4 rounded-pill"
					></v-text-field>
					<v-btn icon @click="filterExist = !filterExist">
						<v-icon>mdi-filter </v-icon>
					</v-btn>
				</div>
			</template>
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
			<!-- <template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td></td>
					<td></td>

					<td>
						<v-text-field
							v-model="statusName"
							type="string"
							outlined
							dense
							class="mt-2"
							label="Bộ phận"
						></v-text-field>
					</td>
				</tr>
			</template> -->
			<!-- <template v-slot:[`item.actions`]="{ item }">
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
			</template> -->
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>
			<!-- <template v-slot:[`item.isActive`]="{ item }">
				<v-simple-checkbox
					v-model="item.isActive"
					disabled
				></v-simple-checkbox>
			</template> -->
			<template v-slot:no-data>
				<h3>{{ $t("message.no_data") }}</h3>
			</template>
		</v-data-table>
		<v-divider></v-divider>
		<v-row class="mt-4">
			<v-col cols="12" md="12" class="px-10">
				<!-- <div class="float-right">
					<v-btn color="primary" class="mx-5 my-0" @click="Save">
						OK</v-btn
					>

					<v-btn @click="close"> Hủy</v-btn>
				</div> -->
				<div class="float-right">
					<v-btn
						elevation="0"
						color="blue darken-2"
						dark
						class="rounded-0 mr-2"
						@click="Save"
					>
						{{ $t("button.ok") }}</v-btn
					>

					<v-btn
						elevation="0"
						color="grey lighten-4"
						class="rounded-0"
						@click="close"
					>
						{{ $t("button.cancel") }}</v-btn
					>
				</div>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import moment from "moment";
import administratorAPI from "../../administrator/administrator.api";
import globalService from "@/services/global.service";

export default {
	name: "VSMFEFileRequestData",

	data() {
		return {
			items: [],
			search: "",
			singleSelect: false,
			selected: [],
			dateFormat: "DD/MM/yyyy h:mm",
			listTemplateForm: [],
			headers: [
				{
					text: "Tên file ",
					value: "attachmentFileDTOS[0].fileName",
					sortable: false,

					// filter: (value) => {
					// 	if (!this.fileName) return true;
					// 	if (!value) return;
					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.fileName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: "Biểu mẫu",
					value: "templateFormName",

					// filter: (value) => {
					// 	if (!this.templateFormName) return true;
					// 	if (!value) return;
					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.templateFormName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},

				{
					text: "Người cập nhật",
					value: "createdName",

					// filter: (value) => {
					// 	if (!this.createdName) return true;

					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.createdName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},

				{
					text: "Thời gian cập nhật",
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

	mounted() {
		this.getAllTemplateForm();
	},

	methods: {
		close() {
			this.$emit("close", true);
		},
		async getAllTemplateForm() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllTemplateForm(),
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
				this.listTemplateForm = Object.assign([], this.requestAll);
				console.log("this.listTemplateForm", this.listTemplateForm);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async Save() {
			await this.$emit("save", this.selected);
			await this.$emit("close", true);
		},
		// customFilter(value, search, item) {
		// 	return (
		// 		!!search && this.match(item, search.trim().replace(/\s+/g, " "))
		// 	);
		// },
	},
};
</script>

<style lang="scss" scoped></style>
