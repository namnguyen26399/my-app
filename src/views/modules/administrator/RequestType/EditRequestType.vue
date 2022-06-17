<template>
	<v-card elevation="0">
		<VuePerfectScrollbar>
			<v-card ref="form"
				><v-card-title>
					<span class="text-h5">{{
						$t("title.create_type_request")
					}}</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field
									ref="requestTypeName"
									v-model="requestTypeDto.requestTypeName"
									outlined
									dense
									required
									@keyup="onKeyUp"
									:error-messages="errorMessage"
								>
									<template v-slot:label>
										{{ $t("label.request_type_name") }}
										<span class="text-red">
											{{ $t("label.star") }}
										</span>
									</template>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-textarea
									v-model="requestTypeDto.description"
									:label="$t('label.description')"
									outlined
									dense
									@keyup="onKeyUpDes"
									:error-messages="errorMessageDes"
								></v-textarea>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-combobox
									ref="requestGroup"
									v-model="requestTypeDto.requestGroup"
									:items="requestGroups"
									item-text="requestGroupName"
									:item-value="(x) => x"
									outlined
									dense
									:error-messages="errorMessageRequestGroup"
									@click="clickListRG"
									maxLength="255"
									@change="changeRG"
								>
									<template v-slot:label>
										{{ $t("label.request_group") }}
										<span class="text-red">
											{{ $t("label.star") }}
										</span>
									</template>
									<template v-slot:item="{ item }">
										<v-list-item
											@click="selectRequestGroup(item)"
											class="m-1"
										>
											<v-list-item-avatar>
												<v-avatar
													color="indigo mr-2"
													size="36"
												>
													<span class="white--text">
														{{
															getAvatarText(
																item.requestGroupName,
																2,
															)
														}}
													</span>
												</v-avatar>
											</v-list-item-avatar>
											<v-list-item-content>
												<v-list-item-title
													v-html="
														item.requestGroupName
													"
												>
												</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</template>
									<template
										v-slot:selection="{ attrs, item }"
									>
										<v-chip
											v-if="!!item && !!item.id"
											v-bind="attrs"
											class="mt-2"
										>
											<v-avatar
												color="indigo mr-2"
												size="36"
											>
												<span class="white--text">
													{{
														getAvatarText(
															item.requestGroupName,
															2,
														)
													}}
												</span>
											</v-avatar>
											{{ item.requestGroupName }}
										</v-chip>
									</template>
								</v-combobox>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-checkbox
									v-model="requestTypeDto.isActive"
									:label="$t('label.is_active')"
								></v-checkbox>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						elevation="0"
						color="blue darken-2"
						dark
						class="rounded-0 mr-2"
						@click="save()"
					>
						{{ $t("button.ok") }}
					</v-btn>
					<v-btn
						elevation="0"
						color="grey lighten-4"
						class="rounded-0"
						@click="close()"
					>
						{{ $t("button.cancel") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</VuePerfectScrollbar>
	</v-card>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import RequestTypeDto from "@/models/request-type.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
export default {
	name: "EditRequestTypeVue",
	components: { VuePerfectScrollbar },
	data() {
		return {
			requestTypeDto: RequestTypeDto,
			errorMessageRequestGroup: "",
			formError: false,
			isSaving: false,
			errorMessage: "",
			errorMessageDes: "",
			defaultItem: {
				created: null,
				createdDate: new Date(),
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isDelete: false,
				modified: null,
				modifiedDate: new Date(),
				modifiedName: "",
				numberRequest: 0,
				numberRequestData: 0,
				requestGroup: null,
				requestTypeCode: "",
				requestTypeName: "",
				tennant: null,
				tennantCode: "",
				tennantName: "",
			},
			requestGroups: [],
		};
	},
	mounted() {
		this.requestTypeDto = Object.assign({}, RequestTypeDto);
		this.$Progress.finish();
	},
	computed: {
		form() {
			return {
				requestTypeName: this.requestTypeDto.requestTypeName,
			};
		},
	},
	async created() {
		this.$Progress.start();
		this._requestGroups();
	},
	methods: {
		async _requestGroups() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllRequestGroup(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.requestGroups = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.requestGroups = this.sortList(this.requestGroups);
			} catch (error) {
				return [];
			}
		},
		close() {
			this.requestTypeDto = Object.assign({}, this.defaultItem);
			this.errorMessage = "";
			this.errorMessageDes = "";
			this.errorMessageRequestGroup = "";
			this.$emit("close", true);
		},
		_save() {
			this.$emit("save", this.requestTypeDto);
		},

		onKeyUp() {
			if (
				this.requestTypeDto.requestTypeName != "" ||
				this.requestTypeDto.requestTypeName.length < 255
			) {
				this.errorMessage = "";
			}
			if (this.requestTypeDto.requestTypeName.length > 255) {
				this.errorMessage = this.$t("message.maxlength_required_255");
			}
		},
		onKeyUpDes() {
			if (
				this.requestTypeDto.description != "" ||
				this.requestTypeDto.description.length < 255
			) {
				this.errorMessageDes = "";
			}
			if (this.requestTypeDto.description.length > 255) {
				this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
		selectRequestGroup(item) {
			this.requestTypeDto.requestGroup = item;
			if (typeof this.requestTypeDto.requestGroup == "object") {
				this.errorMessageRequestGroup = "";
			}
		},
		async clickListRG() {
			await this._requestGroups();
		},
		changeRG() {},
		async save() {
			this.formErrorMaxLength = false;
			this.formError = false;
			for (let key of Object.keys(this.form)) {
				if (!this.form[key] || this.form[key].trim().length == 0) {
					this.formError = true;
					this.$refs[key].focus();
				}
				if (this.form[key].trim().length > 255) {
					this.formErrorMaxLength = true;
					this.$refs[key].focus();
				}
				this.$refs[key].validate();
			}
			if (this.formError) {
				return (this.errorMessage = this.$t("message.msg_1"));
			}
			if (this.formErrorMaxLength) {
				return (this.errorMessage = this.$t(
					"message.maxlength_required_255",
				));
			}
			if (this.requestTypeDto.description.length > 255) {
				return (this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				));
			}
			if (this.isSaving) {
				return;
			}
			if (
				!this.requestTypeDto.requestGroup ||
				typeof this.requestTypeDto.requestGroup != "object"
			) {
				return (this.errorMessageRequestGroup = this.$t(
					"error.please_fill_form",
				));
			}
			this.isSaving = true;
			let response;
			this.requestTypeDto.requestTypeName =
				this.requestTypeDto.requestTypeName.trim();
			if (!this.requestTypeDto.id) {
				this.requestTypeDto.created = this.getUserInfo();
				this.requestTypeDto.createdName = this.getUserInfo().fullName;
				this.requestTypeDto.createdDate = new Date();
			}
			this.requestTypeDto.modified = this.getUserInfo();
			this.requestTypeDto.modifiedName = this.getUserInfo().fullName;
			this.requestTypeDto.modifiedDate = new Date();
			try {
				response = await globalService.postData_Async(
					administratorAPI.API_CreateRequestType(),
					this.requestTypeDto,
				);
				if (!response) {
					return this.toastError(this.$t("error.save"));
				}
				if (!response.state) {
					return this.toastError(response.message);
				}
				if (response) {
					this.toastSuccess(this.$t("message.msg_3"));
				}
				this.requestTypeDto = response.data;
				this.isSaving = false;
				this._save();
				this.close();
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style>
.v-menu__content {
	background: white;
}
</style>
