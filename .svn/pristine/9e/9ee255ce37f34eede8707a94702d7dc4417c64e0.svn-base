<template>
	<v-card v-if="listTemplateForm" class="overflow-hidden py-4">
		<v-card-title> {{ $t("title.template_form_selection") }} </v-card-title>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listTemplateForm"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			:custom-filter="customFilter"
			loading="true"
			:loading-text="$t('label.loading')"
			:hide-default-footer="listTemplateForm.length < 10 ? true : false"
		>
			<template v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td></td>
					<td></td>

					<td></td>
				</tr>
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
					<v-btn color="primary" class="mx-5 my-0" @click="Save">
						{{ $t("button.ok") }}</v-btn
					>

					<v-btn @click="close"> {{ $t("button.cancel") }}</v-btn>
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
	name: "FormOption",

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

					filter: (value) => {
						if (!this.fileName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.fileName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Biểu mẫu",
					value: "templateFormName",

					filter: (value) => {
						if (!this.templateFormName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.templateFormName,
								).toLocaleUpperCase(),
							);
					},
				},

				{
					text: "Người cập nhật",
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
			console.log("this.selected", this.selected);
		},
	},
};
</script>

<style lang="scss" scoped></style>
