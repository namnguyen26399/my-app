<template>
	<v-card v-if="listUserInfos" class="overflow-hidden">
		<div class="flex justify-end">
			<v-btn text class="p-0" @click="closeDialog">
				<v-icon> mdi-close </v-icon>
			</v-btn>
		</div>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="listUserInfos"
			:single-select="singleSelect"
			item-key="id"
			show-select
			:search="search"
			:custom-filter="customFilter"
			loading="true"
			:loading-text="$t('label.loading')"
		>
			<template v-slot:top>
				<div>
					<div class="flex items-center">
						<v-card-title> Lựa chọn người dùng </v-card-title>
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
					<div class="bg-gray-100 rounded-lg p-4">
						<v-row>
							<v-col cols="10"></v-col>
							<v-col cols="2">
								<v-select
									v-model="organizations"
									:items="listOrganization"
									item-text="organizationName"
									:item-value="
										(item) => item.organizationName
									"
									label="Bộ phận"
									dense
									outlined
									class="rounded-pill"
								></v-select>
							</v-col>
						</v-row>
					</div>
				</div>

				<v-divider class="mt-4"></v-divider>
			</template>
			<template v-slot:[`item.ranks`]="{ item }">
				<span v-for="rank of item.ranks" :key="rank.id" v-bind="item">
					{{ rank.rankName }}
				</span>
			</template>
			<template v-slot:[`item.organizations`]="{ item }">
				<span
					v-for="organization of item.organizations"
					:key="organization.id"
					v-bind="item"
				>
					<v-avatar color="indigo mr-2" size="28">
						<span class="white--text">
							{{
								getAvatarText(organization.organizationName, 2)
							}}
						</span>
					</v-avatar>
					{{ organization.organizationName }}
				</span>
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
						@click="closeDialog"
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

export default {
	name: "VSMFEUserInfosRequestData",

	data() {
		return {
			listUserInfos: [],
			headers: [
				{
					text: "Họ và tên ",
					value: "fullName",
					sortable: false,

					filter: (value) => {
						if (!this.fullName) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.fullName,
								).toLocaleUpperCase(),
							);
					},
				},
				{
					text: "Chức Danh",
					value: "ranks",

					filter: (value) => {
						if (!this.ranks) return true;
						if (!value) return;
						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(
									this.ranks,
								).toLocaleUpperCase(),
							);
					},
				},

				{
					text: "Bộ phận",
					value: "organizations",

					filter: (value) => {
						if (this.organizations == this.$t("label.show_all"))
							return true;
						return value.filter((entry) => {
							return entry.organizationName.includes(
								this.organizations,
							);
						}).length;
					},
				},
			],
			items: [],
			search: "",
			singleSelect: false,
			selected: [],
			fullName: "",
			rankName: "",
			listOrganization: [],
			organizations: this.$t("label.show_all"),
		};
	},

	mounted() {
		this.GetAllUser();
		this.getAllOrganzation();
	},

	methods: {
		close() {
			this.$emit("close", true);
		},
		async GetAllUser() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfos(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.listUserInfos = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				console.log("response", response);
				console.log("this.listUserInfos", this.listUserInfos);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllOrganzation() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response || !response.state) return;
				this.listOrganization = response.data.filter((entry) => {
					return !entry.isDelete;
				});
			} catch (error) {
				this.toastError(error);
			}
		},
		customFilter(value, search, item) {
			return (
				!!search && this.match(item, search.trim().replace(/\s+/g, " "))
			);
		},
		async Save() {
			await this.$emit("save", this.selected);
			await this.$emit("close", true);
			this.selected = [];
		},
	},
};
</script>

<style lang="scss" scoped>
.test {
	display: flex;
	justify-content: space-between;
}
.w-40 {
	width: 200px !important;
}
</style>
