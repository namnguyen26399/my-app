<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="userInfo"
			multi-sort
			show-select
			:loading="!userInfo"
			:loading-text="$t('label.loading')"
			:no-results-text="$t('message.no_results')"
		>
			<template
				v-for="header in headers.filter((header) =>
					header.hasOwnProperty('formatter'),
				)"
				v-slot:[`item.${header.value}`]="{ headers, value }"
			>
				{{ header.formatter(value) }}
			</template>
			<template v-slot:[`item.roles`]="{ item }">
				<span v-if="item.roles.length > 0">
					<i v-for="role of item.roles" :key="role.id">
						{{ role.roleCode }} &nbsp;
					</i>
				</span>
			</template>
			<template v-slot:top>
				<v-dialog
					v-model="dialog.create"
					transition="dialog-bottom-transition"
					width="70vw"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-card-title>
							<v-btn
								v-bind="attrs"
								v-on="on"
								text
								class="rounded-0 text-capitalize font-weight-regular"
							>
								<v-icon small class="mr-2"> mdi-plus </v-icon>

								{{ $t("button.create") }}
							</v-btn>
							<v-btn
								text
								@click="deleteAll"
								class="rounded-0 text-capitalize font-weight-regular"
							>
								<v-icon small class="mr-2"
									>mdi-trash-can-outline
								</v-icon>
								{{ $t("button.delete_all") }}
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn icon @click="filterExist = !filterExist">
								<v-icon>mdi-filter </v-icon>
							</v-btn>
						</v-card-title>
						<v-divider></v-divider>
					</template>
					<v-card tile>
						<v-toolbar flat color="grey lighten-4">
							<v-toolbar-title>
								{{ $t("title.information") }}
							</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon @click="close">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-toolbar>
						<v-form ref="form">
							<v-card-text>
								<v-tabs color="blue darken-2" v-model="tab">
									<v-tab @click="tab = 'general_information'">
										<span class="text-black">
											{{ $t("tab.general_information") }}
										</span>
									</v-tab>
									<v-tab
										@click="tab = 'signature_information'"
										:disabled="!userInfoItem.id"
									>
										<span class="text-black">
											{{
												$t("tab.signature_information")
											}}
										</span>
									</v-tab>
									<v-tab
										@click="tab = 'role_information'"
										:disabled="!userInfoItem.id"
									>
										<span class="text-black">
											{{ $t("tab.role_information") }}
										</span>
									</v-tab>
								</v-tabs>
								<v-divider></v-divider>
								<v-tabs-items v-model="tab">
									<v-tab-item key="general_information">
										<v-row class="mt-4">
											<v-col cols="12" md="6">
												<m-text-field
													:label="
														$t('label.full_name')
													"
													:value="
														userInfoItem.fullName
													"
													@value="
														(v) => {
															userInfoItem.fullName =
																v;
														}
													"
													:rules="[
														() =>
															m_editedItem.stepName.trim() !=
																'' ||
															$t(
																'message.maxlength_required_255',
															),
													]"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" md="6">
												<m-text-field
													:label="
														$t(
															'label.identification',
														)
													"
													:value="
														userInfoItem.identification
													"
													@value="
														(v) => {
															userInfoItem.identification =
																v;
														}
													"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
											<v-col cols="12" md="3">
												<m-text-field
													:label="
														$t('label.issue_by')
													"
													:value="
														userInfoItem.issuseOrg
													"
													@value="
														(v) => {
															userInfoItem.issuseOrg =
																v;
														}
													"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
											<v-col cols="12" md="3">
												<v-menu
													ref="m_date_menu"
													v-model="showPicker2"
													:close-on-content-click="
														false
													"
													:return-value.sync="
														showPicker2
													"
													transition="scale-transition"
													offset-y
													min-width="auto"
												>
													<template
														v-slot:activator="{
															on,
															attrs,
														}"
													>
														<v-text-field
															ref="m_date_text"
															:value="
																formatModifyDateFns
															"
															dense
															outlined
															readonly
															v-bind="attrs"
															v-on="on"
															:rules="m_rules"
														>
															<template
																v-slot:label
															>
																{{
																	$t(
																		"label.issue_date",
																	)
																}}
																<span
																	class="text-red-600"
																	>{{
																		$t(
																			"label.star",
																		)
																	}}</span
																>
															</template>
														</v-text-field>
													</template>
													<v-date-picker
														v-model="
															userInfoItem.issuseDate
														"
														scrollable
														no-title
														@input="
															showPicker2 = false
														"
														:readonly="dialog.view"
													>
													</v-date-picker>
												</v-menu>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" md="3">
												<m-text-field
													:label="$t('label.email')"
													:value="userInfoItem.email"
													@value="
														(v) => {
															userInfoItem.email =
																v;
														}
													"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
											<v-col cols="12" md="3">
												<m-text-field
													:label="
														$t(
															'label.bussiness_phone',
														)
													"
													:value="
														userInfoItem.businessPhones
													"
													@value="
														(v) => {
															userInfoItem.businessPhones =
																v;
														}
													"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
											<v-col cols="12" md="3">
												<m-text-field
													:label="
														$t('label.mobile_phone')
													"
													:value="
														userInfoItem.mobilePhone
													"
													@value="
														(v) => {
															userInfoItem.mobilePhone =
																v;
														}
													"
													:readonly="dialog.view"
												/>
											</v-col>
											<v-col cols="12" md="3">
												<m-text-field
													:label="$t('label.fax')"
													:value="userInfoItem.fax"
													@value="
														(v) => {
															userInfoItem.fax =
																v;
														}
													"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12">
												<m-text-field
													:label="$t('label.address')"
													:value="
														userInfoItem.address
													"
													@value="
														(v) => {
															userInfoItem.address =
																v;
														}
													"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12">
												<m-text-field
													:label="
														$t(
															'label.contact_address',
														)
													"
													:value="
														userInfoItem.contactAddress
													"
													@value="
														(v) => {
															userInfoItem.contactAddress =
																v;
														}
													"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
									</v-tab-item>
									<v-tab-item key="signature_information">
										<vue-tab
											:tabs="[
												{
													key: 'signature_profile',
													title: $t(
														'label.select_signature_profile',
													),
												},
											]"
											:buttons="[]"
										></vue-tab>
										<v-row class="mt-4">
											<v-col cols="12" md="3">
												<v-select
													:items="profiles"
													v-model="profile"
													:label="$t('label.select')"
													item-text="infomation"
													:item-value="(item) => item"
													dense
													outlined
												></v-select>
											</v-col>
											<v-col>
												<v-btn
													icon
													@click="createProfile()"
												>
													<v-icon
														color="blue darken-2"
													>
														mdi-plus-circle
													</v-icon>
												</v-btn>
											</v-col>
										</v-row>
										<vue-tab
											:tabs="[
												{
													key: 'signature_profile',
													title: $t(
														'label.signature_profile',
													),
												},
											]"
											:buttons="[]"
										></vue-tab>
										<v-row class="mt-4">
											<v-col cols="12" md="3">
												<m-text-field
													:label="
														$t('label.profile_name')
													"
													:value="profile.infomation"
													@value="
														(v) => {
															profile.infomation =
																v;
														}
													"
													:required="false"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" md="3">
												<m-select
													:items="methods"
													:label="
														$t('label.sign_type')
													"
													:value="profile.signType"
													@value="
														(v) =>
															(profile.signType =
																v)
													"
													:required="false"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" md="3">
												<m-text-field
													:label="
														$t(
															'label.tin_or_phone_number',
														)
													"
													:value="profile.mstOrSdt"
													@value="
														(v) => {
															profile.mstOrSdt =
																v;
														}
													"
													:required="false"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" md="3">
												<m-date-picker
													:label="
														$t(
															'label.issue_date_time',
														)
													"
													:value="profile.expiryDate"
													@value="
														(v) => {
															profile.expiryDate =
																v;
														}
													"
													format="DD/MM/YYYY"
													:required="true"
													:readonly="dialog.view"
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-checkbox
													label="Đặt làm mặc định"
												></v-checkbox>
											</v-col>
										</v-row>
									</v-tab-item>
									<v-tab-item key="role_information">
										<vue-tab
											:tabs="[
												{
													key: 'rank',
													title: $t('label.rank'),
												},
											]"
											:buttons="[]"
										></vue-tab>
										<div class="m-2 p-4">
											<v-autocomplete
												dense
												solo
												:items="ranks"
												v-model="userInfoItem.ranks"
												item-text="rankName"
												multiple
											>
											</v-autocomplete>
										</div>
										<!-- <SelectListVue
											:items="ranks"
											:selected="userInfoItem.ranks"
											keyName="id"
											valueName="rankName"
										/> -->
										<vue-tab
											:tabs="[
												{
													key: 'role',
													title: $t('label.role'),
												},
											]"
											:buttons="[]"
										></vue-tab>
										<div class="m-2 p-4">
											<v-autocomplete
												dense
												solo
												:items="roles"
												v-model="userInfoItem.roles"
												item-text="roleCode"
												multiple
											>
											</v-autocomplete>
										</div>
										<!-- <vue-select-list
											:items="roles"
											:selected="userInfoItem.roles"
											keyName="id"
											valueName="roleName"
											@update="handleRole"
										></vue-select-list> -->
									</v-tab-item>
								</v-tabs-items>
							</v-card-text>
						</v-form>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								elevation="0"
								dark
								@click="save"
								class="blue darkken-2 rounded-0"
							>
								{{ $t("button.ok") }}
							</v-btn>
							<v-btn
								elevation="0"
								@click="close"
								class="grey lighten-2 rounded-0"
							>
								{{ $t("button.cancel") }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<!-- <v-icon
					small
					class="mr-2"
					color="primary"
					@click="viewItem(item)"
				>
					mdi-eye
				</v-icon> -->
				<v-icon class="mr-2" color="blue" @click="editItem(item)">
					mdi-pencil-circle
				</v-icon>
				<v-icon color="error" @click="deleteItem(item)">
					mdi-close-circle
				</v-icon>
			</template>
			<template v-if="filterExist" v-slot:[`body.prepend`]>
				<v-divider></v-divider>
				<tr>
					<td></td>
					<td>
						<v-text-field
							v-model="user_fullname"
							:label="$t('label.full_name')"
							outlined
							dense
							class="mt-2 rounded-pill"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-text-field
							v-model="user_email"
							:label="$t('label.email')"
							outlined
							dense
							class="mt-2 rounded-pill"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-autocomplete
							:items="listOrganization"
							v-model="user_organize"
							:label="$t('label.organize_use')"
							outlined
							dense
							class="mt-2 rounded-pill"
							maxlength="255"
						></v-autocomplete>
					</td>
					<td>
						<v-autocomplete
							v-model="user_roleName"
							item-text="roleCode"
							:items="filterRole"
							:label="$t('label.roleName')"
							:item-value="(item) => item.roleCode"
							class="mt-2 rounded-pill"
							dense
							outlined
							maxlength="255"
						>
						</v-autocomplete>
					</td>
					<td>
						<v-text-field
							v-model="user_bussinessPhone"
							:label="$t('label.numberphone')"
							outlined
							dense
							class="mt-2 rounded-pill"
							maxlength="255"
						></v-text-field>
					</td>
					<td>
						<v-select
							v-model="s_organization"
							item-text="userType"
							:item-value="(item) => item.userType"
							:label="$t('label.filter')"
							outlined
							single-line
							dense
							class="mt-2 rounded-pill"
						></v-select>
					</td>
					<td>
						<v-menu
							v-model="showPickerExpiry"
							:close-on-content-click="false"
							transition="scale-transition"
							offset-y
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									:value="formatExpiryDate"
									clearable
									:label="$t('label.expiry_date')"
									readonly
									v-bind="attrs"
									v-on="on"
									@click:clear="s_expiryDate = null"
									append-icon="mdi-calendar"
									outlined
									dense
									class="mt-2 rounded-pill"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="s_expiryDate"
								@change="showPickerExpiry = false"
								no-title
								scrollable
								range
							></v-date-picker>
						</v-menu>
					</td>
					<td></td>
				</tr>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog.delete" width="fit-content">
			<DeleteDialogVue @close="close" @confirmDelete="deleteAllConfirm" />
		</v-dialog>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import moment from "moment";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import administratorAPI from "../administrator.api";
import constant from "@/common/constant";

export default {
	name: "ListUserInfo",
	components: {
		BreadcrumbsVue,
		DeleteDialogVue,
	},
	data() {
		return {
			s_organization: this.$t("label.show_all"),
			filterRole: [],
			user_organize: "",
			user_roleName: this.$t("label.show_all"),
			user_current: this.getUserInfo(),
			user_fullname: "",
			user_email: "",
			user_bussinessPhone: "",
			s_expiryDate: null,
			showPicker: false,
			showPickerExpiry: false,
			dateFormat: "DD/MM/yyyy",
			// user_createdname: "",
			user_createddate: null,
			is_active: this.$t("label.show_all"),
			filterItems: [
				this.$t("label.show_all"),
				this.$t("label.used"),
				this.$t("label.unused"),
			],
			s_roleCode: "",
			success: false,
			error: false,
			dialog: {
				create: false,
				view: false,
				delete: false,
			},
			selected: [],
			headers: [
				{
					text: this.$t("label.full_name"),
					value: "fullName",
					filter: (value) => {
						if (!this.user_fullname || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.user_fullname)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.email"),
					value: "email",
					filter: (value) => {
						if (!this.user_email || !value) return true;

						return this.nonAccentVietnamese(value)
							.toLocaleUpperCase()
							.includes(
								this.nonAccentVietnamese(this.user_email)
									.trim()
									.toLocaleUpperCase(),
							);
					},
				},
				{
					text: this.$t("label.organize_use"),
					value: "organizationName",
					// filter: (value) => {
					// 	if (!this.user_email || !value) return true;

					// 	return this.nonAccentVietnamese(value)
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.nonAccentVietnamese(this.user_email)
					// 				.trim()
					// 				.toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: this.$t("label.roleName"),
					value: "roles",

					filter: (value) => {
						if (this.user_roleName == this.$t("label.show_all"))
							return true;
						return value.filter((entry) => {
							return entry.roleCode.includes(this.user_roleName);
						}).length;
					},
				},
				{
					text: this.$t("label.numberphone"),
					value: "businessPhones",
					filter: (value) => {
						if (!this.user_bussinessPhone.toString().trim())
							return true;
						if (!value) return;
						return value.includes(
							this.user_bussinessPhone.toString().trim(),
						);
					},
				},

				{
					text: this.$t("label.filter"),
					value: "userType",

					filter: (value) => {
						if (this.s_organization == this.$t("label.show_all")) {
							return true;
						}
						return value.filter((entry) => {
							return entry.roleCode.includes(this.user_roleName);
						}).length;
					},
					// filter: (value) => {
					// 	if (!this.user_createdname) return true;

					// 	return value
					// 		.toLocaleUpperCase()
					// 		.includes(
					// 			this.user_createdname.toLocaleUpperCase(),
					// 		);
					// },
				},
				{
					text: this.$t("label.expiry_date"),
					value: "expiryDate",
					formatter: (x) =>
						x ? moment(x).format(this.dateFormat) : null,
					filter: (value) => {
						if (!this.s_expiryDate) return true;
						let values = `${this.s_expiryDate}`.split(
							constant.values.DATE_RANGE_SEPARATOR,
						);
						values = values
							.map((x) => {
								return moment(`${x}`).toDate().getTime();
							})
							.sort((a, b) => a - b);
						let target = moment(value).toDate().getTime();
						return (
							target >= values[0] &&
							target <=
								values[values.length - 1] + 24 * 60 * 60 * 1000
						);
					},
				},
				{
					text: this.$t("label.manipulation"),
					value: "actions",
					sortable: false,
				},
			],
			now: new Date(),
			editedIndex: -1,
			userInfoItem: {
				address: "",
				avatar: "",
				businessPhones: "",
				contactAddress: "",
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				description: "",
				displayName: "",
				email: "",
				expiryDate: null,
				fax: "",
				fullName: "",
				givenName: "",
				id: null,
				idInMicrosoft: "",
				identification: "",
				infoInMicrosoft: "",
				isActive: true,
				isDelete: false,
				isLocked: false,
				issuseDate: null,
				issuseOrg: "",
				jobTitle: "",
				mail: "",
				mobilePhone: "",
				modifiedDate: null,
				modifiedName: "",
				name: "",
				numberOfLoginFailed: 0,
				oDataContext: "",
				officeLocation: "",
				organizations: [],
				password: "",
				passwordEncode: "",
				preferredLanguage: "",
				ranks: [],
				roles: [],
				signType: "",
				signTypeCode: "",
				signTypeName: "",
				surname: "",
				userName: "",
				userPrincipalName: "",
				userType: "",
				userTypeCode: "",
				userTypeName: "",
			},
			defaultItem: {
				address: "",
				avatar: "",
				businessPhones: "",
				contactAddress: "",
				createdDate: new Date(),
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				description: "",
				displayName: "",
				email: "",
				expiryDate: null,
				fax: "",
				fullName: "",
				givenName: "",
				id: null,
				idInMicrosoft: "",
				identification: "",
				infoInMicrosoft: "",
				isActive: true,
				isDelete: false,
				isLocked: false,
				issuseDate: null,
				issuseOrg: "",
				jobTitle: "",
				mail: "",
				mobilePhone: "",
				modifiedDate: null,
				modifiedName: "",
				name: "",
				numberOfLoginFailed: 0,
				oDataContext: "",
				officeLocation: "",
				organizations: [],
				password: "",
				passwordEncode: "",
				preferredLanguage: "",
				ranks: [],
				roles: [],
				signType: "",
				signTypeCode: "",
				signTypeName: "",
				surname: "",
				userName: "",
				userPrincipalName: "",
				userType: "",
				userTypeCode: "",
				userTypeName: "",
			},
			userInfo: [],
			listRole: [],
			tab: "general_information",
			filterExist: false,
			groups: [],
			profiles: [],
			profile: {
				infomation: "",
				signType: "",
				mstOrSdt: "",
				expiryDate: null,
			},
			showPicker2: false,
			showPicker3: false,
			methods: [this.$t("label.usb_token"), this.$t("label.sim")],
			ranks: [],
			roles: [],
			regex: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
		};
	},
	async created() {
		await this.getAllRole();
		await this.getAllRank();
		await this.getAllUserGroup();
		await this.getAll();
		await this.GetAllOrganization();
	},
	mounted() {},

	computed: {
		formatModifyDateFns() {
			return this.userInfoItem.issuseDate
				? moment(this.userInfoItem.issuseDate).format(this.dateFormat)
				: "";
		},
		formatDateFns() {
			if (!this.user_createddate) {
				return "";
			}
			let values = `${this.user_createddate}`.split(
				constant.values.DATE_RANGE_SEPARATOR,
			);
			let result = [];
			result = values.map((x) => {
				return moment(x).format("DD/MM/yyyy");
			});
			return result.join("~");
		},
		formatExpiryDate() {
			if (!this.s_expiryDate) {
				return "";
			}
			let values = `${this.s_expiryDate}`.split(
				constant.values.DATE_RANGE_SEPARATOR,
			);
			let result = [];
			result = values.map((x) => {
				return moment(x).format("DD/MM/yyyy");
			});
			return result.join("~");
		},
		issueDate() {
			if (!this.userInfoItem.issuseDate) {
				return "";
			}
			return moment(this.userInfoItem.issuseDate).format("DD/MM/yyyy");
		},
	},
	watch: {
		"dialog.create"(val) {
			this.tab = 0;
			this.profile = {
				infomation: "",
				signType: "",
				mstOrSdt: "",
				expiryDate: null,
			};
			val || this.close();
		},
		"dialog.view"(val) {
			this.tab = 0;
			this.profile = {
				infomation: "",
				signType: "",
				mstOrSdt: "",
				expiryDate: null,
			};
			val || this.close();
		},
		"dialog.delete"(val) {
			val || this.close();
		},
	},
	methods: {
		async GetAllOrganization() {
			let response = await globalService.getData_Async(
				administratorAPI.API_FindAllOrganization(),
			);
			if (!response || !response.state) {
				return;
			}
			this.listOrganization = response.data.filter((entry) => {
				return !entry.isDelete;
			});
		},
		async getAllRole() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllRole(),
			);
			if (!response || !response.state) {
				return;
			}
			this.filterRole = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.filterRole.unshift(this.$t("label.show_all"));
		},
		async getAll() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfo(),
				);
				if (!response || !response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.userInfo = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.sortList(this.userInfo);
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getAllUserGroup() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserGroup(),
				);
				this.groups = response.data;
			} catch (error) {
				console.log(error);
			}
		},
		async getAllProfile() {
			if (!this.userInfoItem.id) {
				return;
			}
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllSignatureInformation(
						this.userInfoItem.id,
					),
				);
				this.profiles = response.data;
			} catch (error) {
				console.log(error);
			}
		},
		async createItem() {
			this.userInfoItem.fullName = this.userInfoItem.fullName.trim();
			this.userInfoItem.identification =
				this.userInfoItem.identification.trim();
			this.userInfoItem.issuseOrg = this.userInfoItem.issuseOrg.trim();
			this.userInfoItem.email = this.userInfoItem.email.trim();
			this.userInfoItem.businessPhones =
				this.userInfoItem.businessPhones.trim();
			this.userInfoItem.address = this.userInfoItem.address.trim();
			this.userInfoItem.contactAddress =
				this.userInfoItem.contactAddress.trim();
			this.userInfoItem.mobilePhone =
				this.userInfoItem.mobilePhone.trim();
			this.userInfoItem.fax = this.userInfoItem.fax.trim();
			if (!this.validRequiredText(this.userInfoItem.fullName)) {
				this.toastError("Tên đầy đủ không được bỏ trống");
				return;
			}
			if (!this.validRequiredText(this.userInfoItem.identification)) {
				this.toastError("CMND/CCCD không được bỏ trống");
				return;
			}
			if (!this.validRequiredText(this.userInfoItem.issuseOrg)) {
				this.toastError("Nơi cấp không được bỏ trống");
				return;
			}
			if (!this.validRequiredText(this.userInfoItem.issuseDate)) {
				this.toastError("Ngày cấp không được bỏ trống");
				return;
			}
			if (!this.validRequiredText(this.userInfoItem.email)) {
				this.toastError("Email không được bỏ trống");
				return;
			}
			if (!this.regex.test(this.userInfoItem.email)) {
				return this.toastError("Sai định dạng email");
			}
			if (!this.validRequiredText(this.userInfoItem.businessPhones)) {
				this.toastError("Số điện thoại không được bỏ trống");
				return;
			}
			if (!this.validRequiredText(this.userInfoItem.address)) {
				this.toastError("Địa chỉ không được bỏ trống");
				return;
			}
			if (!this.validRequiredText(this.userInfoItem.contactAddress)) {
				this.toastError("Địa chỉ liên hệ không được bỏ trống");
				return;
			}
			if (!this.validText(this.userInfoItem.mobilePhone)) {
				return;
			}
			if (!this.validText(this.userInfoItem.fax)) {
				return;
			}
			if (
				moment(this.userInfoItem.issuseDate).toDate().getTime() >
				this.now.getTime()
			) {
				return this.toastError("Ngày cấp không được lớn hơn hiện tại");
			}
			let response;
			try {
				this.userInfoItem.modifiedName = this.user_current.fullName;
				this.userInfoItem.createdName = this.user_current.fullName;
				this.userInfoItem.issuseDate = moment(
					this.userInfoItem.issuseDate,
				).toDate();
				if (this.editedIndex > -1) {
					this.userInfoItem.modifiedDate = new Date();
					this.userInfoItem.modifiedName = this.user_current.fullName;
					response = await globalService.putData_Async(
						"/api/user-infos/" + this.userInfoItem.id,
						this.userInfoItem,
					);
					if (!response || !response.state) {
						return;
					}
					if (!response || !response.state) {
						this.toastError(this.$t("message.update_error"));
						return;
					}
					this.userInfoItem = response.data;
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					this.userInfoItem.createdDate = new Date();
					this.userInfoItem.createdName = this.user_current.fullName;
					this.userInfoItem.expiryDate = new Date();
					response = await globalService.postData_Async(
						"/api/user-infos",
						this.userInfoItem,
					);
					if (!response || !response.state) {
						this.toastError(this.$t("message.add_error"));
						return;
					}
					this.userInfoItem = response.data;
					this.toastSuccess(this.$t("message.add_success"));
				}

				this.tab = 1;
				this.getAll();
			} catch (error) {
				console.log("Error", error);
			}
		},
		close() {
			this.dialog.create = false;
			this.dialog.delete = false;
			this.dialog.view = false;
			this.$nextTick(() => {
				this.userInfoItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		async editItem(item) {
			this.editedIndex = this.userInfo.indexOf(item);
			this.userInfoItem = Object.assign({}, item);
			this.dialog.create = true;
			await this.getAllProfile(this.userInfoItem.id);
		},
		viewItem(item) {
			this.editedIndex = this.userInfo.indexOf(item);
			this.userInfoItem = Object.assign({}, item);
			this.dialog.create = true;
			this.dialog.view = true;
		},
		sortList(arr) {
			return arr.sort((a, b) => {
				return (
					moment(b.createdDate).toDate().getTime() -
					moment(a.createdDate).toDate().getTime()
				);
			});
		},
		async deleteAllConfirm() {
			this.selected = this.selected.map((x) => {
				x.isDelete = true;
				return x;
			});
			try {
				let response = await globalService.postData_Async(
					administratorAPI.API_SaveAllUserInfo(),
					this.selected,
				);
				if (!response || !response.state) {
					this.toastError(this.$t("message.delete_error"));
				} else {
					this.toastSuccess(this.$t("message.delete_success"));
				}
			} catch (error) {
				this.toastError(this.$t("error.load"));
			} finally {
				this.selected = [];
				this.getAll();
				this.close();
			}
		},
		deleteItem(item) {
			this.selected = [item];
			this.dialog.delete = true;
		},
		onConfirmDelete(value) {
			if (!value) {
				this.close();
			} else {
				if (this.selected) {
					this.deleteAllConfirm();
				}
			}
		},
		deleteAll() {
			if (this.selected.length > 0) {
				this.dialog.delete = true;
			} else {
				this.toastError(this.$t("label.no_selected"));
			}
		},
		createProfile() {
			this.$refs.form.reset();
			this.profile = {
				infomation: "",
				signType: "",
				mstOrSdt: "",
				expiryDate: null,
			};
			console.log("profile", this.profile);
		},
		async saveProfiles() {
			console.log("vao", this.profile.expiryDate);
			if (!this.validRequiredText(this.profile.infomation)) {
				return;
			}
			if (!this.validRequiredText(this.profile.signType)) {
				return;
			}
			if (!this.validRequiredText(this.profile.mstOrSdt)) {
				return;
			}
			if (!this.validRequiredText(this.profile.expiryDate)) {
				return;
			}
			this.profile.modifiedName = this.getUserInfo().fullName;
			this.profile.modifiedDate = new Date();
			this.profile.expiryDate = moment(this.profile.expiryDate).toDate();
			if (!this.profile.id) {
				this.profile.createdName = this.getUserInfo().fullName;
				this.profile.createdDate = new Date();
				this.profile.userInfo = this.userInfoItem;
				let response;
				try {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateSignatureInformation(),
						this.profile,
					);
					if (!response || !response.state) {
						return;
					}
					this.profile = response.data;
					console.log("success", this.profile);
					this.profiles.push(response.data);
				} catch (error) {
					console.log(error);
				}
			} else {
				let response;
				try {
					response = await globalService.putData_Async(
						administratorAPI.API_SaveSignatureInformation(
							this.profile.id,
						),
						this.profile,
					);
					if (!response || !response.state) {
						return;
					}
					let index = this.profiles.findIndex(
						(e) => e.id == response.data.id,
					);
					this.profile = response.data;
					this.profiles[index] = response.data;
				} catch (error) {
					console.log(error);
				}
			}
		},
		async save() {
			if (this.tab == 1) {
				await this.saveProfiles();
			} else {
				await this.createItem();
			}
		},
		format(value) {
			if (!value) {
				return "";
			}
			return moment(value).format(this.dateFormat);
		},
		// async getAllRole() {
		// 	let response;
		// 	try {
		// 		response = await globalService.getData_Async(
		// 			administratorAPI.API_GetAllRole(),
		// 		);
		// 		if (!this.preHandleResponse(response)) {
		// 			return;
		// 		}
		// 		this.roles = response.data.filter((x) => !x.isDelete);
		// 	} catch (error) {
		// 		this.toastError(error);
		// 	}
		// },
		async getAllRank() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRank(),
				);
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.ranks = response.data.filter((x) => !x.isDelete);
			} catch (error) {
				this.toastError(error);
			}
		},
		handleRank(value) {
			this.userInfoItem.ranks = value;
		},
		handleRole(value) {
			this.userInfoItem.roles = value;
		},
	},
};
</script>
<style></style>
