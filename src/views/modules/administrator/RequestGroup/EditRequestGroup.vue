<template>
	<v-card elevation="0" class="overflow-hidden">
		<v-card ref="form">
			<v-card-title>
				<span class="text-h5">{{
					$t("title.create_group_request")
				}}</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-form v-model="valid">
						<v-row>
							<v-col>
								<v-text-field
									ref="requestGroupName"
									v-model="requestGroupDto.requestGroupName"
									outlined
									dense
									required
									@keyup="onKeyUp"
									:error-messages="errorMessage"
								>
									<template v-slot:label>
										{{ $t("label.request_group_name") }}
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
									v-model="requestGroupDto.description"
									:label="$t('label.description')"
									outlined
									@keyup="onKeyUpDes"
									:error-messages="errorMessageDes"
								></v-textarea>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-checkbox
									v-model="requestGroupDto.isActive"
									:label="$t('label.is_active')"
								></v-checkbox>
							</v-col>
						</v-row>
					</v-form>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-row class="mt-4">
					<v-col cols="12" md="12" class="px-10">
						<div class="float-right">
							<v-btn
								elevation="0"
								color="blue darken-2"
								dark
								class="rounded-0 mr-2"
								@click="save()"
							>
								{{ $t("button.ok") }}</v-btn
							>

							<v-btn
								elevation="0"
								color="grey lighten-4"
								class="rounded-0"
								@click="close()"
							>
								{{ $t("button.cancel") }}</v-btn
							>
						</div>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-card>
</template>

<script>
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import RequestGroupDto from "@/models/request-group.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
export default {
	name: "EditRequestGroupVue",
	// components: { VuePerfectScrollbar },
	data() {
		return {
			requestGroupDto: RequestGroupDto,
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
				numberRequestType: 0,
				requestGroupCode: "",
				requestGroupName: "",
				tennant: null,
				tennantCode: "",
				tennantName: "",
			},
		};
	},
	mounted() {
		this.requestGroupDto = Object.assign({}, RequestGroupDto);
		this.$Progress.finish();
	},
	watch: {},
	computed: {
		form() {
			return {
				requestGroupName: this.requestGroupDto.requestGroupName,
			};
		},
	},
	methods: {
		close() {
			this.requestGroupDto = Object.assign({}, this.defaultItem);
			this.errorMessage = "";
			this.errorMessageDes = "";
			this.$emit("close", true);
		},
		_save() {
			this.$emit("save", this.requestGroupDto);
		},
		onKeyUp() {
			if (
				this.requestGroupDto.requestGroupName != "" ||
				this.requestGroupDto.requestGroupName.length < 255
			) {
				this.errorMessage = "";
			}
			if (this.requestGroupDto.requestGroupName.length > 255) {
				this.errorMessage = this.$t("message.maxlength_required_255");
			}
		},
		onKeyUpDes() {
			if (
				this.requestGroupDto.description != "" ||
				this.requestGroupDto.description.length < 255
			) {
				this.errorMessageDes = "";
			}
			if (this.requestGroupDto.description.length > 255) {
				this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				);
			}
		},
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
			if (this.requestGroupDto.description.length > 255) {
				return (this.errorMessageDes = this.$t(
					"message.maxlength_required_255",
				));
			}
			if (this.isSaving) {
				return;
			}
			this.isSaving = true;
			let response;
			this.requestGroupDto.requestGroupName =
				this.requestGroupDto.requestGroupName.trim();
			this.requestGroupDto.description =
				this.requestGroupDto.description.trim();
			if (!this.requestGroupDto.id) {
				this.requestGroupDto.created = this.getUserInfo();
				this.requestGroupDto.createdName = this.getUserInfo().fullName;
				this.requestGroupDto.createdDate = new Date();
			}
			this.requestGroupDto.modified = this.getUserInfo();
			this.requestGroupDto.modifiedName = this.getUserInfo().fullName;
			this.requestGroupDto.modifiedDate = new Date();
			try {
				response = await globalService.postData_Async(
					administratorAPI.API_CreateRequestGroup(),
					this.requestGroupDto,
				);
				if (!response) {
					return this.toastError(this.$t("error.save"));
				}
				if (!response.state) {
					return this.toastError(this.$t("message.add_success"));
				}
				if (response) {
					this.toastSuccess(this.$t("message.msg_3"));
				}
				this.requestGroupDto = response.data;
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

<style></style>
