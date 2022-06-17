<template>
	<v-card elevation="0" ref="form">
		<v-toolbar flat color="grey lighten-4">
			<v-toolbar-title> Trình phê duyệt </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="white">
			<v-container>
				<v-form v-model="valid">
					<v-row>
						<v-col cols="12" sm="12" md="12">
							<v-textarea
								:label="$t('label.mail_template_content')"
								dense
								outlined
								v-model="approveRequestDto.reason"
							>
							</v-textarea>
						</v-col>
						<!-- <v-col cols="12" sm="12" md="12">
							<v-file-input
								ref="file"
								:label="$t('label.attachment_file')"
								outlined
								dense
								@change="handleFileUpload($event)"
								:error-messages="errorMessageFile"
								chips
								multiple
								small-chips
								truncate-length="20"
							>
							</v-file-input>
						</v-col> -->
						<v-col cols="12" sm="12" md="12" style="padding: 0">
							<v-card-text style="padding: 0">
								<v-container class="mt-4 p-0">
									<v-card
										elevation="0"
										dropzone
										:class="
											!isDragOver
												? ''
												: 'background-active'
										"
										class="w-40 items-center p-0"
										@drop="onDrop($event)"
										@dragenter="onDragEnter($event)"
										@dragleave="onDragLeave($event)"
										@dragover="onDragOver($event)"
										@dragend="onDragEnd($event)"
										@click="onClick($event)"
										style="box-sizing: border-box"
									>
										<div
											class="
												d-flex
												justify-space-between
												border-2
												px-2
											"
										>
											<v-card-text>
												{{ $t("Tải lên") }}
											</v-card-text>
											<v-divider vertical></v-divider>
											<v-icon x-large class="ml-4"
												>mdi-cloud-upload-outline
											</v-icon>
										</div>
									</v-card>
									<input
										ref="files"
										id="files"
										type="file"
										accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
										class="d-none"
										multiple
										@change="handleFile($event)"
									/>
									<VuePerfectScrollbar class="h-60">
										<v-list>
											<v-list-item
												v-for="file in files"
												:key="file.name"
											>
												<v-list-item-icon>
													<v-icon>
														{{
															m_files_icon[
																file.type
															]
														}}
													</v-icon>
												</v-list-item-icon>
												<v-list-item-content>
													<v-list-item-title>
														{{ file.name }}
														<v-icon
															color="red darken-2"
															@click="
																remove(file)
															"
														>
															mdi-close-circle
														</v-icon>
													</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-list>
									</VuePerfectScrollbar>
								</v-container>
							</v-card-text>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-card-text>
		<v-card-actions class="white">
			<v-spacer></v-spacer>
			<v-btn
				color="blue darken-1"
				elevation="0"
				dark
				@click="approveRequest()"
			>
				{{ $t("button.ok") }}
			</v-btn>
			<v-btn color="grey lighten-4" elevation="0" @click="close">
				{{ $t("button.cancel") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import ApproveDto from "@/models/approve.dto";
import constant from "@/common/constant";

export default {
	name: "VsmFeApproverequestform",
	props: { request: {} },
	watch: {
		request(newValue) {
			this.m_requestData = newValue;
			console.log("this.m_requestData", this.m_requestData);
		},
	},

	data() {
		return {
			file: null,
			m_requestData: null,
			approveRequestDto: ApproveDto,
			user_info: this.getUserInfo(),
			attachmentFiles: [],
			files: {},
		};
	},

	mounted() {},
	created() {
		this.m_requestData = this.request;
		console.log("this.m_requestData", this.m_requestData);
	},

	methods: {
		close() {
			this.$emit("close", true);
		},
		handleFileUpload(event) {
			this.file = event;
		},
		async approveRequest() {
			let response;
			this.approveRequestDto.action = "Send";
			//this.approveRequestDto.attachmentFileId = this.formData.isActive;
			this.approveRequestDto.errorMessageReturn =
				"Trình phê duyệt Thất bại";
			this.approveRequestDto.requestDataId = this.m_requestData.id;
			//this.approveRequestDto.statusId = "";
			this.approveRequestDto.successMessageReturn =
				"Trình phê duyệt Thành công";
			this.approveRequestDto.userId = this.user_info.id;
			response = await globalService.postData_Async(
				administratorAPI.API_Approve(),
				this.approveRequestDto,
			);
			// this.toastSuccess("Trình phiếu thành công");
			this.$emit("close", true);
			this.$router.push({
				path: `/phieu-yeu-cau/list-request-wait-approval`,
			});

			if (!response || !response.state) {
				this.toastError(this.$t("error.load"));
			}
		},
		handleFile(files) {
			console.log("files: ", files);
			this.files = Array.from(files.target.files);
			console.log("files: ", this.files);
		},
		onDrop(event) {
			event.preventDefault();
			this.isDragOver = false;
			if (event.dataTransfer) {
				this.files = Array.from(event.dataTransfer.files);
			}
		},
		onDragEnd(event) {
			event.preventDefault();
			this.isDragOver = false;
		},
		onDragEnter(event) {
			event.preventDefault();
			this.isDragOver = true;
		},
		onDragLeave(event) {
			event.preventDefault();
			this.isDragOver = false;
		},
		onDragOver(event) {
			event.preventDefault();
			this.isDragOver = true;
		},
		onClick(event) {
			event.preventDefault();
			let files = document.getElementById(constant.keys.files);
			files.click();
		},
		remove(file) {
			let index = this.files.indexOf(file);
			this.files.splice(index, 1);
		},
		async upload() {
			if (!this.files) {
				return;
			}
			let response;
			try {
				for (let file of this.files) {
					console.log("file", file);
					console.log("this.requestData: ", this.requestData);
					response = await globalService.uploadData_Async(
						administratorAPI.API_UploadFile365(),
						file,
						{
							parentItemId: this.requestData.idDirectoryPath,
							userId: this.userInfo.id,
							requestDataId: this.requestData.id,
						},
					);
					if (!response) {
						return this.toastError(this.$t("error.upload_file"));
					}
					if (!response.state) {
						return this.toastError(response.message);
					}
					this.attachmentFiles.push(response.data);
					console.log("response file", response);
					this.files = [];
					//this.$emit(constant.keys.upload, true);
				}
				this.$emit("save", this.attachmentFiles);
				this.closeDialog();
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
