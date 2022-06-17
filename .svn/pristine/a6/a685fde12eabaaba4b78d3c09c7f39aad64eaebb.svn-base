<template>
	<v-card elevation="0" class="p-2 mt-4">
		<!-- <v-row class="flex text-end">
			<v-col cols="12" md="12">
				<v-btn
					elevation="0"
					color="blue"
					dark
					class="rounded-pill"
					@click="save()"
				>
					<v-icon> mdi-content-save </v-icon>
					{{ $t("button.save") }}
				</v-btn>
				<v-btn
					elevation="0"
					color="red"
					dark
					class="rounded-pill ml-2"
					to="/administrator/quy-trinh"
				>
					<v-icon>mdi-close</v-icon>
					{{ $t("button.close") }}
				</v-btn>
			</v-col>
		</v-row> -->
		<v-form ref="form" class="mt-4">
			<v-row>
				<v-col cols="12" sm="6" md="6">
					<v-text-field
						ref="processName"
						v-model="m_processInfoDto.processName"
						:rules="[
							() =>
								m_processInfoDto.processName.trim().length <
									255 || $t('error.max_length_255'),
						]"
						outlined
						dense
						required
						:error-messages="errorProcessName"
						@keyup="onchangeProcessName"
					>
						<template v-slot:label>
							{{ $t("label.process_name") }}
							<span class="text-red-500">{{
								$t("label.star")
							}}</span>
						</template>
					</v-text-field>
				</v-col>
				<v-col cols="12" sm="6" md="6">
					<v-text-field
						ref="description"
						v-model="m_processInfoDto.description"
						outlined
						dense
						:label="$t('label.description')"
						:rules="[
							m_processInfoDto.description.trim().length < 255 ||
								$t('error.max_length_255'),
						]"
					></v-text-field>
				</v-col>
			</v-row>
			<!-- <v-row>
				<v-col cols="12" sm="12" md="12">
					<v-checkbox
						v-model="m_processInfoDto.isActive"
						outlined
						dense
						:label="$t('label.is_active')"
					></v-checkbox>
				</v-col>
			</v-row> -->
			<v-row class="mt-2">
				<v-col cols="12" md="12">
					<strong>{{ $t("label.organize_use") }}</strong>
					<v-divider class="mb-2"></v-divider>
				</v-col>
				<v-col cols="4">
					<v-card class="mx-auto" tile>
						<v-text-field
							@keyup="searchOrg()"
							v-model="search_org"
							append-icon="mdi-magnify"
						>
						</v-text-field>
						<VuePerfectScrollbar class="h-80 grey lighten-4">
							<v-list dense max-height="400">
								<v-list-item-group
									v-model="selectedOrg"
									multiple
								>
									<v-list-item
										class="bg-slate-100 ma-1 rounded"
										v-for="(item, i) in organizations"
										:key="i"
										@click="selectPush(item, i)"
									>
										<template v-slot:default="{ active }">
											<v-list-item-content>
												<v-list-item-title>
													{{ item.organizationName }}
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
												<v-icon
													v-if="!active"
													color="grey lighten-1"
												>
													mdi-check-circle-outline
												</v-icon>

												<v-icon
													v-else
													color="green darken-3"
												>
													mdi-check-circle
												</v-icon>
											</v-list-item-action>
										</template>
										<!-- <v-list-item-content
											@click="selectPush(item, i)"
										>
											<v-list-item-title>
												{{ item.organizationName }}
											</v-list-item-title>
										</v-list-item-content> -->
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</VuePerfectScrollbar>
					</v-card>
				</v-col>
				<v-col cols="1" class="text-center my-auto">
					<v-btn icon @click="pushAll()">
						<v-icon>mdi-chevron-double-right</v-icon>
					</v-btn>
					<br />
					<v-btn icon @click="pushOne()">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
					<br />
					<v-btn icon @click="removeOne()">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<br />
					<v-btn icon @click="removeAll()">
						<v-icon>mdi-chevron-double-left</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="4">
					<v-card tile>
						<v-text-field
							@keyup="searchOrgSelected()"
							v-model="search_org_selected"
							append-icon="mdi-magnify"
						></v-text-field>
						<VuePerfectScrollbar class="h-80 grey lighten-4">
							<v-list dense max-height="400">
								<v-list-item-group
									v-model="removedOrg"
									multiple
								>
									<v-list-item
										class="bg-green-100 ma-1 rounded"
										v-for="(
											item, i
										) in m_processInfoDto.organizations"
										:key="i"
										@click="selectRemove(item, i)"
									>
										<template>
											<v-list-item-content>
												<v-list-item-title>
													{{ item.organizationName }}
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
												<v-icon
													@click="removeOrg(i)"
													color="grey darken-2"
													>mdi-close-circle</v-icon
												>
											</v-list-item-action>
										</template>
										<!-- <v-list-item-content
											@click="selectRemove(item, i)"
										>
											<v-list-item-title>
												{{ item.organizationName }}
											</v-list-item-title>
										</v-list-item-content>
										<v-list-item-action class="ma-0">
											<v-btn icon @click="removeOrg(i)">
												<v-icon color="grey darken-2"
													>mdi-close-circle</v-icon
												>
											</v-btn>
										</v-list-item-action> -->
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</VuePerfectScrollbar>
					</v-card>
				</v-col>
				<!-- <v-col cols="12" md="12" sm="12">
					<v-combobox
						ref="organizations"
						v-model="m_processInfoDto.organizations"
						:items="organizations"
						item-text="organizationName"
						:item-value="(item) => item"
						chips
						clearable
						:label="$t('label.organize_use')"
						multiple
						outlined
						dense
						hide-selected
					>
						<template v-slot:item="{ item }">
							<v-avatar color="indigo mr-2" size="36">
								<span class="white--text" v-if="!item.avatar">
									{{
										getAvatarText(item.organizationName, 2)
									}}
								</span>
								<v-img v-if="item.avatar" :src="item.avatar">
								</v-img>
							</v-avatar>
							{{ item.organizationName }}
						</template>
						<template
							v-slot:selection="{ attrs, item, select, selected }"
						>
							<v-chip
								class="mt-2"
								v-bind="attrs"
								:input-value="selected"
								close
								@click="select"
								@click:close="remove(item)"
							>
								<v-avatar
									v-if="!!item && !!item.id"
									color="indigo mr-2"
									size="36"
								>
									<span
										class="white--text"
										v-if="!item.avatar"
									>
										{{ getAvatarText(item.fullName, 2) }}
									</span>
									<v-img
										v-if="item.avatar"
										:src="item.avatar"
									>
									</v-img>
								</v-avatar>
								<strong>{{ item.organizationName }}</strong>
							</v-chip>
						</template>
					</v-combobox>
				</v-col> -->
			</v-row>
			<v-row class="mt-5">
				<v-col cols="12" md="12">
					<strong>{{ $t("label.type_request_apply") }}</strong>
					<v-divider class="mb-2"></v-divider>
				</v-col>
				<v-col cols="4">
					<v-card class="mx-auto" tile>
						<v-text-field
							@keyup="searchReq()"
							v-model="search_req"
							append-icon="mdi-magnify"
						>
						</v-text-field>
						<VuePerfectScrollbar class="h-80 grey lighten-4">
							<v-list dense max-height="400">
								<v-list-item-group
									v-model="selectedReq"
									multiple
								>
									<v-list-item
										class="bg-slate-100 ma-1 rounded"
										v-for="(item, i) in requestTypes"
										:key="i"
										@click="selectReqPush(item, i)"
									>
										<template v-slot:default="{ active }">
											<v-list-item-content>
												<v-list-item-title
													v-text="item.requestName"
												></v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
												<v-list-item-action-text
													v-text="item.action"
												></v-list-item-action-text>

												<v-icon
													v-if="!active"
													color="grey lighten-1"
												>
													mdi-check-circle-outline
												</v-icon>

												<v-icon
													v-else
													color="green darken-3"
												>
													mdi-check-circle
												</v-icon>
											</v-list-item-action>
										</template>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</VuePerfectScrollbar>
					</v-card>
				</v-col>
				<v-col cols="1" class="text-center my-auto">
					<v-btn icon @click="pushAllReq()">
						<v-icon> mdi-chevron-double-right </v-icon>
					</v-btn>
					<br />
					<v-btn icon @click="pushOneReq()">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
					<br />
					<v-btn icon @click="removeOneReq()">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<br />
					<v-btn icon @click="removeAllReq()">
						<v-icon>mdi-chevron-double-left</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="4">
					<v-card tile>
						<v-text-field
							@keyup="searchReqSelected()"
							v-model="search_req_selected"
							append-icon="mdi-magnify"
						></v-text-field>
						<VuePerfectScrollbar class="h-80 grey lighten-4">
							<v-list dense max-height="400">
								<v-list-item-group
									v-model="removedReq"
									multiple
								>
									<v-list-item
										class="bg-green-100 ma-1 rounded"
										v-for="(
											item, i
										) in m_processInfoDto.requestDTOS"
										:key="i"
										@click="selectReqRemove(item, i)"
									>
										<template>
											<v-list-item-content>
												<v-list-item-title
													v-text="item.requestName"
												></v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
												<v-icon
													@click="removeReq(i)"
													color="grey darken-2"
												>
													mdi-close-circle
												</v-icon>
											</v-list-item-action>
										</template>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</VuePerfectScrollbar>
					</v-card>
				</v-col>
			</v-row>
		</v-form>
	</v-card>
</template>

<script>
import ProcessInfoDTO from "@/models/process-info.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	name: "EditProcessInfoGeneralInformationVue",
	components: { VuePerfectScrollbar },
	props: {
		processInfoDto: ProcessInfoDTO,
		isSaved: {},
	},
	data() {
		return {
			maxLengthRules: [
				(v) =>
					(typeof v !== "object" && v.length < 255) ||
					this.$t("error.max_length_255"),
			],
			m_processInfoDto: ProcessInfoDTO,
			organizations: [],
			s_organization: [],
			sl_organization: [],
			requestTypes: [],
			s_requestTypes: [],
			sl_requestTypes: [],
			formHasErrors: false,
			search_org: "",
			search_req: "",
			search_org_selected: "",
			search_req_selected: "",
			isSaving: false,
			errorProcessName: "",
			selectedItemOrg: [],
			removedItemOrg: [],
			selectedOrg: [],
			removedOrg: [],
			selectedItemReq: [],
			removedItemReq: [],
			selectedReq: [],
			removedReq: [],
			m_isSaved: 0,
		};
	},
	watch: {
		processInfoDto(value) {
			this.m_processInfoDto = value;
		},
		"m_processInfoDto.organizations"(value, oldValue) {
			if (oldValue.length == value.length) return;
			this.m_processInfoDto.organizations = value.filter((entry) => {
				if (typeof entry == "object") {
					return true;
				}
			});
		},
		m_processInfoDto(val) {
			val || this.resetProcessInfo();
		},
		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state == 1) {
				this.save();
			}
		},
	},
	created() {
		this.$Progress.start();
		this.m_isSaved = this.isSaved;
		this.init();
	},
	mounted() {
		this.$Progress.finish();
	},
	computed: {
		form() {
			return {
				processName: this.m_processInfoDto.processName,
			};
		},
	},
	methods: {
		async init() {
			this.m_processInfoDto = this.processInfoDto;
			this.organizations = await this._organizations();
			this.s_organization = Object.assign([], this.organizations);
			this.requestTypes = await this._requestTypes();
			this.s_requestTypes = Object.assign([], this.requestTypes);
		},
		remove(item) {
			let index = this.m_processInfoDto.organizations.indexOf(item);
			this.m_processInfoDto.organizations.splice(index, 1);
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
		async _requestTypes() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequest(),
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
		async save() {
			this.m_processInfoDto.processName =
				this.m_processInfoDto.processName.trim();
			this.m_processInfoDto.description =
				this.m_processInfoDto.description.trim();
			this.formHasErrors = false;
			let editing = !!this.m_processInfoDto.id;
			for (let key of Object.keys(this.form)) {
				if (!this.form[key]) {
					this.formHasErrors = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate(true);
			}
			if (this.m_processInfoDto.processName.trim() == "") {
				this.errorProcessName = this.$t("message.msg_1");
				return this.toastError(this.$t("error.validate"));
			}
			if (this.formHasErrors) {
				return this.toastError(this.$t("error.validate"));
			}
			if (this.isSaving) {
				return;
			}
			if (this.m_processInfoDto.processName.trim().length > 255) {
				return this.toastError(
					this.$t("message.maxlength_required_255"),
				);
			}
			this.isSaving = true;
			if (!this.m_processInfoDto.id) {
				this.m_processInfoDto.created = this.getUserInfo();
				this.m_processInfoDto.createdDate = new Date();
				this.m_processInfoDto.createdName = this.getUserInfo().fullName;
			}
			this.m_processInfoDto.modified = this.getUserInfo();
			this.m_processInfoDto.modifiedDate = new Date();
			this.m_processInfoDto.modifiedName = this.getUserInfo().fullName;
			let response;
			try {
				// let responseCode = await globalService.postData_Async(
				// 	administratorAPI.API_CheckCodeProcessInfo(),
				// 	this.m_processInfoDto,
				// );
				// if (!responseCode) {
				// 	return this.toastError("sai");
				// }
				// if (!responseCode.state) {
				// 	return this.toastError(responseCode.message);
				// }
				// console.log("responseCode", responseCode);

				if (editing) {
					let id = this.$route.params.id;
					if (!id) {
						id = this.m_processInfoDto.id;
					}
					this.m_processInfoDto.modified = this.getUserInfo();
					this.m_processInfoDto.created = this.getUserInfo();
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateProcessInfo(id),
						this.m_processInfoDto,
					);
					if (!response || !response.state) {
						this.toastError(this.$t("message.update_error"));
						return;
					}
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					response = await globalService.postData_Async(
						administratorAPI.API_SaveProcessInfo(),
						this.m_processInfoDto,
					);
					if (!response || !response.state) {
						this.toastError(this.$t("message.add_error"));
						return;
					}
					this.toastSuccess(this.$t("message.add_success"));
				}
				console.log(response);

				this.m_isSaved.state = 2;
				this.$emit("state", Object.assign({}, this.m_isSaved));
				// this.m_processInfoDto = ProcessInfoDTO;
				this.$emit(
					"onSaveProcessInfoDto",
					Object.assign({}, response.data),
				);
			} catch (error) {
				this.toastError(error);
			} finally {
				this.isSaving = false;
				// this.m_processInfoDto = ProcessInfoDTO;
				this.errorProcessName = "";
			}
		},
		onchangeProcessName() {
			this.errorProcessName = "";
		},
		resetProcessInfo() {
			this.m_processInfoDto = ProcessInfoDTO;
		},
		selectPush(item) {
			if (this.m_processInfoDto.organizations.indexOf(item) != -1) return;
			if (this.selectedItemOrg.indexOf(item) == -1) {
				this.selectedItemOrg.push(item);
			} else {
				this.selectedItemOrg.splice(
					this.selectedItemOrg.indexOf(item),
					1,
				);
			}
		},
		selectRemove(item) {
			if (this.removedItemOrg.indexOf(item) == -1) {
				this.removedItemOrg.push(item);
			} else {
				this.removedItemOrg.splice(
					this.removedItemOrg.indexOf(item),
					1,
				);
			}
		},

		pushOne() {
			if (this.selectedItemOrg.length == 0)
				return (this.selectedOrg = []);
			let arrClone = Object.assign([], this.selectedItemOrg);
			this.m_processInfoDto.organizations =
				this.m_processInfoDto.organizations.concat(arrClone);
			this.removedItemOrg = Object.assign(
				[],
				this.m_processInfoDto.organizations,
			);
			this.sl_organization = Object.assign(
				[],
				this.m_processInfoDto.organizations,
			);
			this.selectedOrg = [];
			this.selectedItemOrg = [];
		},
		pushAll() {
			this.m_processInfoDto.organizations = Object.assign(
				[],
				this.organizations,
			);
			this.removedItemOrg = Object.assign([], this.organizations);
			this.sl_organization = Object.assign(
				[],
				this.m_processInfoDto.organizations,
			);
			this.selectedOrg = [];
			this.selectedItemOrg = [];
		},

		removeOne() {
			if (this.removedOrg.length == 0) return;
			this.m_processInfoDto.organizations = Object.assign(
				[],
				this.removedItemOrg,
			);
			this.sl_organization = Object.assign([], this.removedItemOrg);
			this.removedOrg = [];
		},
		removeAll() {
			this.m_processInfoDto.organizations = [];
			this.sl_organization = [];
		},
		removeOrg(index) {
			this.m_processInfoDto.organizations.splice(index, 1);
			this.removedItemOrg.splice(index, 1);
			this.sl_organization.splice(index, 1);
		},

		////
		selectReqPush(item) {
			if (this.m_processInfoDto.requestDTOS.indexOf(item) != -1) return;
			if (this.selectedItemReq.indexOf(item) == -1) {
				this.selectedItemReq.push(item);
			} else {
				this.selectedItemReq.splice(
					this.selectedItemReq.indexOf(item),
					1,
				);
			}
		},
		selectReqRemove(item) {
			if (this.removedItemReq.indexOf(item) == -1) {
				this.removedItemReq.push(item);
			} else {
				this.removedItemReq.splice(
					this.removedItemReq.indexOf(item),
					1,
				);
			}
		},

		pushOneReq() {
			if (this.selectedItemReq.length == 0)
				return (this.selectedReq = []);
			let arrClone = Object.assign([], this.selectedItemReq);
			this.m_processInfoDto.requestDTOS =
				this.m_processInfoDto.requestDTOS.concat(arrClone);
			this.removedItemReq = Object.assign(
				[],
				this.m_processInfoDto.requestDTOS,
			);
			this.sl_requestTypes = Object.assign(
				[],
				this.m_processInfoDto.requestDTOS,
			);
			this.selectedReq = [];
			this.selectedItemReq = [];
		},
		pushAllReq() {
			this.m_processInfoDto.requestDTOS = Object.assign(
				[],
				this.requestTypes,
			);
			this.removedItemReq = Object.assign([], this.requestTypes);
			this.sl_requestTypes = Object.assign(
				[],
				this.m_processInfoDto.requestDTOS,
			);
			this.selectedReq = [];
			this.selectedItemReq = [];
		},

		removeOneReq() {
			if (this.removedReq.length == 0) return;
			this.m_processInfoDto.requestDTOS = Object.assign(
				[],
				this.removedItemReq,
			);
			this.sl_requestTypes = Object.assign(
				[],
				this.m_processInfoDto.requestDTOS,
			);
			this.removedReq = [];
		},
		removeAllReq() {
			this.m_processInfoDto.requestDTOS = [];
			this.sl_requestTypes = [];
		},
		removeReq(index) {
			this.m_processInfoDto.requestDTOS.splice(index, 1);
			this.sl_requestTypes = Object.assign(
				[],
				this.m_processInfoDto.requestDTOS,
			);
			this.removedItemReq.splice(index, 1);
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
			this.m_processInfoDto.organizations = Object.assign(
				[],
				this.sl_organization,
			);
			this.m_processInfoDto.organizations =
				this.m_processInfoDto.organizations.filter((entry) => {
					return this.nonAccentVietnamese(entry.organizationName)
						.toLocaleUpperCase()
						.includes(
							this.nonAccentVietnamese(this.search_org_selected)
								.toLocaleUpperCase()
								.trim(),
						);
				});
		},
		searchReq() {
			this.requestTypes = Object.assign([], this.s_requestTypes);
			this.requestTypes = this.requestTypes.filter((entry) => {
				return this.nonAccentVietnamese(entry.requestTypeName)
					.toLocaleUpperCase()
					.includes(
						this.nonAccentVietnamese(this.search_req)
							.toLocaleUpperCase()
							.trim(),
					);
			});
		},
		searchReqSelected() {
			this.m_processInfoDto.requestDTOS = Object.assign(
				[],
				this.sl_requestTypes,
			);

			this.m_processInfoDto.requestDTOS =
				this.m_processInfoDto.requestDTOS.filter((entry) => {
					return this.nonAccentVietnamese(entry.requestTypeName)
						.toLocaleUpperCase()
						.includes(
							this.nonAccentVietnamese(this.search_req_selected)
								.toLocaleUpperCase()
								.trim(),
						);
				});
		},
	},
};
</script>

<style></style>
