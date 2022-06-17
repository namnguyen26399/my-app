<template>
	<v-card elevation="0">
		<v-toolbar flat>
			<v-toolbar-title class="font-bold">
				{{ $t("title.upload_file") }}</v-toolbar-title
			>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-container class="mt-4">
				<v-card
					elevation="0"
					dropzone
					:class="
						!isDragOver
							? 'rounded-lg'
							: 'rounded-lg background-active'
					"
					@drop="onDrop($event)"
					@dragenter="onDragEnter($event)"
					@dragleave="onDragLeave($event)"
					@dragover="onDragOver($event)"
					@dragend="onDragEnd($event)"
					@click="onClick($event)"
				>
					<div class="d-flex justify-center border-2 p-2">
						<v-icon x-large>mdi-cloud-upload-outline </v-icon>
						<v-card-text>
							{{ $t("label.drag_to_upload") }}
						</v-card-text>
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
						<v-list-item v-for="file in files" :key="file.name">
							<v-list-item-icon>
								<v-icon>
									{{ m_files_icon[file.type] }}
								</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>
									{{ file.name }}
									<v-icon
										color="red darken-2"
										@click="remove(file)"
									>
										mdi-delete-circle
									</v-icon>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</VuePerfectScrollbar>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-spacer> </v-spacer>
			<v-btn elevation="0" @click="closeDialog"> Hủy </v-btn>
			<v-btn color="blue darken-2" dark elevation="0" @click="upload()">
				OK
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import constant from "@/common/constant";
import administratorAPI from "../../administrator/administrator.api";
export default {
	name: "VSMFEAttachmentFileRequestData",

	components: { VuePerfectScrollbar },
	props: { requestDataV2: {}, parent },
	watch: {
		parent() {
			this.files = [];
		},
		requestDataV2(newValue) {
			this.requestData = newValue;
		},
	},
	data() {
		return {
			files: {},
			isDragOver: false,
			requestData: {},
			user_info: this.getUserInfo(),
			attachmentFiles: [],
		};
	},
	created() {
		this.requestData = this.requestDataV2;
	},
	computed: {},
	mounted() {},
	methods: {
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
