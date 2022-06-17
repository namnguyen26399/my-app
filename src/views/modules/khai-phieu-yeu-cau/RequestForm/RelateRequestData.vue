<template>
	<v-card v-if="listRequestData" class="overflow-hidden">
		<div class="flex justify-end">
			<v-btn text class="p-0" @click="close">
				<v-icon> mdi-close </v-icon>
			</v-btn>
		</div>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listRequestData"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:[`item.title`]="{ item }">
				<span
					class="text-blue-600 decoration-solid underline-offset-1"
					>{{ item.title }}</span
				>
			</template>
			<template v-slot:[`item.statusName`]="{ item }">
				<span
					class="text-green-500 decoration-solid underline-offset-1"
					>{{ item.statusName }}</span
				>
			</template>
			<template v-slot:[`item.createdOrgName`]="{ item }">
				<template>
					<v-avatar color="indigo mr-2" size="28">
						<span class="white--text">
							{{ getAvatarText(item.createdOrgName, 2) }}
						</span>
					</v-avatar>
					{{ item.createdOrgName }}
				</template>
			</template>
			<template v-slot:[`item.modifiedName`]="{ item }">
				<template>
					<v-avatar color="indigo mr-2" size="28">
						<span class="white--text">
							{{ getAvatarText(item.modifiedName, 2) }}
						</span>
					</v-avatar>
					{{ item.modifiedName }}
				</template>
			</template>

			<template v-slot:top>
				<div>
					<div class="flex items-center">
						<v-card-title>
							Lựa chọn phiếu yêu cầu liên quan
						</v-card-title>
						<v-spacer></v-spacer>
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
				</div>

				<v-divider class="mt-4"></v-divider>
			</template>

			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>

			<template v-slot:no-data>
				<h3>{{ $t("message.no_data") }}</h3>
			</template>
		</v-data-table>
		<v-divider></v-divider>
		<v-row class="mt-4">
			<v-col cols="12" md="12" class="px-10">
				<div class="float-right">
					<v-btn
						elevation="0"
						color="blue darken-2"
						dark
						class="rounded-0"
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
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import moment from "moment";

export default {
	name: "VSMFERelateRequestData",

	data() {
		return {
			items: [],
			search: "",
			singleSelect: false,
			selected: [],
			dateFormat: "DD/MM/yyyy h:mm",
			listRequestData: [],
			headers: [
				{
					text: "Tiêu đề ",
					value: "title",
					sortable: false,

					// filter: (value) => {
					// 	if (!this.title) return true;
					// 	if (!value) return;
					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.title,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: "Trạng thái",
					value: "statusName",

					// filter: (value) => {
					// 	if (!this.statusName) return true;
					// 	if (!value) return;
					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.statusName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},

				{
					text: "Bộ phận trình",
					value: "createdOrgName",

					// filter: (value) => {
					// 	if (!this.createdOrgName) return true;

					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.createdOrgName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: "Nhóm yêu cầu",
					value: "requestGroupName",

					// filter: (value) => {
					// 	if (!this.requestGroupName) return true;

					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.requestGroupName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: "Loại yêu cầu",
					value: "requestTypeName",

					// filter: (value) => {
					// 	if (!this.requestTypeName) return true;

					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.requestTypeName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: "Người duyệt",
					value: "modifiedName",

					// filter: (value) => {
					// 	if (!this.modifiedName) return true;

					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(
					// 				this.modifiedName,
					// 			).toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: "Ngày duyệt",
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
		this.getAllRequestData();
	},

	methods: {
		close() {
			this.$emit("close", true);
		},
		async getAllRequestData() {
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
				console.log("this.listRequestData", this.listRequestData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		customFilter(value, search, item) {
			return !!search && this.match(item, search);
		},
		async Save() {
			await this.$emit("saveRelate", this.selected);
			await this.$emit("close", true);
			console.log("this.selected", this.selected);
		},
	},
};
</script>

<style lang="scss" scoped></style>
