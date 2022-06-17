<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<TabVue
			:tabs="tabs"
			:buttons="buttons"
			@buttonClick="handleButtonClick"
		/>
		<v-row class="mt-2">
			<v-col cols="12" md="6">
				<m-text-field
					:label="$t('label.group_name')"
					:value="group.groupName"
					@value="(v) => (group.groupName = v)"
					required
					maxlength="255"
				>
				</m-text-field>
			</v-col>
			<v-col cols="12" md="6">
				<m-text-field
					:label="$t('label.description')"
					:value="group.description"
					@value="(v) => (group.description = v)"
					maxlength="255"
				>
				</m-text-field>
			</v-col>
		</v-row>
		<TabVue
			:tabs="[{ key: 'user', title: $t('label.user') }]"
			:buttons="[]"
		/>
		<v-row>
			<v-col cols="12">
				<SelectListVue
					:items="users"
					:selected="group.userInfos"
					keyName="id"
					valueName="fullName"
					@update="handleUser"
				/>
			</v-col>
		</v-row>
		<TabVue
			:tabs="[{ key: 'role', title: $t('label.role') }]"
			:buttons="[]"
		/>
		<v-row>
			<v-col cols="12">
				<SelectListVue
					:items="roles"
					:selected="group.roles"
					keyName="id"
					valueName="roleName"
					@update="handleRole"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import TabVue from "@/components/Tab.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import store from "@/store";
import UserGroupDto from "@/models/user-group.dto";
import SelectListVue from "@/components/SelectList.vue";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";

export default {
	name: "EditUserGroupVue",
	components: { TabVue, BreadcrumbsVue, SelectListVue },
	data() {
		return {
			tabs: [{ key: "information", title: this.$t("label.information") }],
			buttons: [
				{
					icon: "mdi-content-save",
					title: this.$t("button.save"),
					color: "blue darken-2",
					transparent: true,
					dark: true,
					event: this.save,
				},
				// {
				// 	icon: "mdi-trash-can-outline",
				// 	title: this.$t("button.delete"),
				// 	color: "black",
				// 	transparent: true,
				// 	dark: false,
				// 	event: this.delete,
				// },
				{
					icon: "mdi-arrow-left-top",
					title: this.$t("button.back"),
					color: "black",
					transparent: true,
					dark: false,
					event: this.redirectBack,
				},
			],
			group: {
				groupName: "",
				description: "",
			},
			users: [],
			roles: [],
		};
	},
	async created() {
		store.state.loading = true;
		this.group = Object.assign({}, UserGroupDto);
		await this.getAllUser();
		await this.getAllRole();
		await this.initialize();
	},
	async mounted() {
		store.state.loading = false;
	},
	methods: {
		async handleButtonClick(event) {
			await event();
		},
		back() {
			this.$router.push({ path: "." });
		},
		async getAllUser() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfo(),
				);
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.users = response.data.filter((x) => !x.isDelete);
			} catch (error) {
				this.toastError(error);
			}
		},
		async getAllRole() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRole(),
				);
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.roles = response.data.filter((x) => !x.isDelete);
			} catch (error) {
				this.toastError(error);
			}
		},
		async handleUser(value) {
			this.group.userInfos = value;
		},
		async handleRole(value) {
			this.group.roles = value;
		},
		async save() {
			this.group.groupName = this.group.groupName
				? `${this.group.groupName}`.trim()
				: "";
			this.group.description = this.group.description
				? `${this.group.description}`.trim()
				: "";
			if (!this.validRequiredText(this.group.groupName)) {
				this.toastError(this.$t("error.group_name"));
				return;
			}
			if (!this.validText(this.group.description)) {
				return;
			}
			let response;
			if (!this.group.id) {
				this.group.createdDate = new Date();
				this.group.createdName = this.getUserInfo().fullName;
			}
			this.group.modifiedDate = new Date();
			this.group.modifiedName = this.getUserInfo().fullName;
			try {
				if (!this.group.id) {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateUserGroup(),
						this.group,
					);
					if (!response || !response.state) {
						this.toastError(this.$t("message.add_error"));
					} else {
						this.toastSuccess(this.$t("message.add_success"));
					}
				} else {
					response = await globalService.putData_Async(
						administratorAPI.API_SaveUserGroup(this.group.id),
						this.group,
					);
					if (!response || !response.state) {
						this.toastError(this.$t("message.update_error"));
					} else {
						this.toastSuccess(this.$t("message.update_success"));
					}
				}
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.group = response.data;
			} catch (error) {
				this.toastError(error);
			}
		},
		async delete() {
			if (!this.group.id) {
				this.$router.push({ path: "." });
				return;
			}
			let response;
			this.group.isDelete = true;
			try {
				response = await globalService.putData_Async(
					administratorAPI.API_SaveUserGroup(this.group.id),
					this.group,
				);
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.$router.push({ path: "." });
			} catch (error) {
				this.toastError(error);
			}
		},
		async initialize() {
			if (!this.$router.currentRoute.params.id) {
				return;
			}
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetUserGroup(
						this.$router.currentRoute.params.id,
					),
				);
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.group = response.data;
				for (let user of this.group.userInfos) {
					let index = this.users.indexOf(user);
					this.users.splice(index, 1);
				}
				for (let role of this.group.roles) {
					let index = this.roles.indexOf(role);
					this.roles.splice(index, 1);
				}
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style></style>
