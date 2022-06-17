<template>
	<v-card>
		<v-toolbar elevation="0" color="grey lighten-4">
			<!-- <v-toolbar-title>
				{{ $t("label.information") }}
			</v-toolbar-title> -->
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-container>
				<vue-tab
					:tabs="[
						{
							key: $t('label.information'),
							title: $t('label.information'),
						},
					]"
					:buttons="[]"
				></vue-tab>
				<v-row class="mt-4">
					<v-col cols="6">
						<m-text-field
							:label="$t('label.name')"
							:value="m_editedItem.dispatchBookName"
							@value="
								(value) => {
									m_editedItem.dispatchBookName = value;
								}
							"
							required
						>
						</m-text-field>
					</v-col>
					<v-col>
						<m-text-field
							:label="$t('label.description')"
							:value="m_editedItem.description"
							@value="
								(value) => {
									m_editedItem.description = value;
								}
							"
						>
						</m-text-field>
					</v-col>
				</v-row>

				<vue-tab
					:tabs="[
						{
							key: $t('label.organization_management'),
							title: $t('label.organization_management'),
						},
					]"
					:buttons="[]"
				></vue-tab>
				<v-row class="mt-4">
					<v-col>
						<vue-select-list
							:items="organizations"
							:selected="m_editedItem.organization"
							keyName="id"
							valueName="organizationName"
							@change="
								(value) => {
									m_editedItem.organization = value;
								}
							"
						></vue-select-list>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions class="white">
			<v-spacer></v-spacer>
			<v-btn
				elevation="0"
				color="blue darken-2"
				dark
				class="rounded-0"
				@click="save"
			>
				{{ $t("button.ok") }}
			</v-btn>
			<v-btn
				elevation="0"
				@click="closeDialog"
				color="grey lighten-4"
				class="rounded-0"
			>
				{{ $t("button.cancel") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";

export default {
	props: { editedItem: {} },
	components: {},
	data() {
		return {
			organizations: [],
			selectedItemOrg: [],
			s_organization: [],
			sl_organization: [],
			removedItemOrg: [],
			selectedOrg: [],
			removedOrg: [],
			search_org: "",
			search_org_selected: "",
			user_current: this.getUserInfo(),
			itemId: this.$route.params.id,
			listOrganization: [],
			m_editedItem: {
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				creater: null,
				description: "",
				id: null,
				incomingBookCode: "",
				dispatchBookName: "",
				isActive: true,
				isDelete: false,
				modifiedDDate: null,
				modifiedName: "",
				modifier: null,
				organization: [],
				organizationCode: "",
				organizationName: "",
				totalDoc: 0,
			},
		};
	},
	watch: {
		editedItem(value) {
			this.m_editedItem = value;
		},
	},
	async created() {
		await this.init();
		await this.getAllOrganzation();
		this.m_editedItem = await this.editedItem;
	},
	methods: {
		async init() {
			this.organizations = await this._organizations();
			// console.log("this.organizations", this.organizations);
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
		async save() {
			if (
				!this.m_editedItem ||
				this.m_editedItem.dispatchBookName == ""
			) {
				return;
			}
			let response;

			this.m_editedItem.modified = this.user_current;
			this.m_editedItem.modifiedName = this.user_current.fullName;
			this.m_editedItem.modifiedDDate = new Date();
			try {
				if (this.m_editedItem.id) {
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateInComingBook(
							this.m_editedItem.id,
						),
						this.m_editedItem,
					);
				} else {
					this.m_editedItem.creater = this.user_current;
					this.m_editedItem.createdName = this.user_current.fullName;
					this.m_editedItem.createdDate = new Date();
					response = await globalService.postData_Async(
						administratorAPI.API_CreateInComingBook(),
						this.m_editedItem,
					);
				}
				if (!response || !response.state)
					return this.toastError(this.$t("error.load"));
				this.toastSuccess(this.$t("message.update_success"));
				this.closeDialog();
			} catch (error) {
				this.toastError(error);
			}
		},

		searchOrg() {
			console.log(this.search_org);

			this.organizations = Object.assign([], this.s_organization);

			this.organizations = this.organizations.filter((entry) => {
				return this.nonAccentVietnamese(entry.organizationName)
					.toLocaleUpperCase()
					.includes(
						this.nonAccentVietnamese(this.search_org)
							.toLocaleUpperCase()
							.trim(),
					);
			});
		},
		searchOrgSelected() {
			this.m_editedItem.organization = Object.assign(
				[],
				this.m_editedItem,
			);
			this.m_editedItem.organization =
				this.m_editedItem.organization.filter((entry) => {
					return this.nonAccentVietnamese(entry.organizationName)
						.toLocaleUpperCase()
						.includes(
							this.nonAccentVietnamese(this.search_org_selected)
								.toLocaleUpperCase()
								.trim(),
						);
				});
		},
		async _organizations() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response) {
					return this.toastError(this.$t("error.load"));
				}
				if (!response.state) {
					return this.toastError(this.$t("error.load"));
				}
				return response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error.message);
			}
		},
	},
};
</script>

<style></style>
