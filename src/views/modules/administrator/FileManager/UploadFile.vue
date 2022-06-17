<template>
	<v-card elevation="0">
		<v-toolbar elevation="0">
			<v-toolbar-title> {{ $t("title.upload_file") }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-container class="mt-4">
				<div
					class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
					@drop="onDrop($event)"
					@dragenter="onDragEnter($event)"
					@dragleave="onDragLeave($event)"
					@dragover="onDragOver($event)"
					@dragend="onDragEnd($event)"
				>
					<div class="space-y-1 text-center">
						<v-icon class="mx-auto h-12 w-12 text-gray-400">
							mdi-file
						</v-icon>
						<div class="flex text-sm text-gray-600">
							<label
								for="files"
								class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
							>
								<span>{{ $t("label.upload_file") }}</span>
								<input
									ref="files"
									id="files"
									name="files"
									accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
									type="file"
									class="sr-only"
									@change="handleFile($event)"
								/>
							</label>
							<p class="pl-1">{{ $t("label.drag_and_drop") }}</p>
						</div>
						<p class="text-xs text-gray-500">
							{{ $t("label.upload_file_term") }}
						</p>
					</div>
				</div>
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
			<v-btn
				elevation="0"
				color="blue darken-2"
				dark
				class="rounded-0"
				@click="upload()"
			>
				<v-icon> mdi-upload </v-icon>
				{{ $t("button.ok") }}
			</v-btn>
			<v-btn
				elevation="0"
				color="grey lighten-4"
				class="rounded-0"
				@click="closeDialog"
			>
				{{ $t("button.cancel") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import constant from "@/common/constant";
export default {
	name: "UploadFileVue",
	components: { VuePerfectScrollbar },
	props: { parent },
	watch: {
		parent() {
			this.files = [];
		},
	},
	data() {
		return {
			files: {},
			isDragOver: false,
		};
	},
	computed: {},
	mounted() {},
	methods: {
		handleFile(files) {
			this.files = Array.from(files.target.files);
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
					response = await globalService.uploadData_Async(
						administratorAPI.API_UploadFile365(),
						file,
						{
							parentId: this.parent.id,
							userId: this.userInfo.id,
						},
					);
					if (!response) {
						return this.toastError(this.$t("error.upload_file"));
					}
					if (!response.state) {
						return this.toastError(response.message);
					}
					this.files = [];
					this.$emit(constant.keys.upload, true);
				}
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style></style>
