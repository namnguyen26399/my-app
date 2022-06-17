<template>
	<v-card elevation="0">
		<v-dialog v-model="dialog.editFolderDialog" max-width="60vw">
			<EditFolderVue
				:item="editedItem"
				:parent="parent"
				@close="onCloseDialog"
				@save="onSaveDialog"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.deleteConfirmDialog" width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.uploadFileDialog" max-width="60vw">
			<UploadFileVue @close="onCloseDialog" />
		</v-dialog>
		<v-dialog v-model="dialog.viewFileDialog">
			<ViewFileVue :file="selectedFile" @close="onCloseDialog" />
		</v-dialog>
		<v-row>
			<v-col cols="12" md="4">
				<VuePerfectScrollbar class="h-80">
					<ul>
						<tree-item :item="root" @toggle="onToggle"></tree-item>
					</ul>
				</VuePerfectScrollbar>
			</v-col>
			<v-divider vertical></v-divider>
			<v-col cols="12" md="8">
				<v-toolbar elevation="0">
					<v-btn icon @click="back">
						<v-icon>mdi-arrow-left </v-icon>
					</v-btn>
					<v-breadcrumbs v-if="path" :items="[root, ...path]">
						<template v-slot:item="{ item }">
							<v-breadcrumbs-item>
								{{ item.fileName }}
							</v-breadcrumbs-item>
						</template>
					</v-breadcrumbs>
					<v-spacer></v-spacer>
					<v-btn
						color="green darken-2"
						dark
						class="rounded mr-2"
						text
						@click="edit({}, selected)"
					>
						<v-icon>mdi-plus-circle</v-icon>
						{{ $t("button.create_folder") }}
					</v-btn>
					<v-btn
						color="blue darken-2"
						dark
						class="rounded-pill"
						@click="dialog.uploadFileDialog = true"
					>
						<v-icon>mdi-upload</v-icon>
						{{ $t("button.upload") }}
					</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<VuePerfectScrollbar class="h-80">
					<v-simple-table class="rounded-lg mt-4">
						<template v-slot:default>
							<thead>
								<tr>
									<th></th>
									<th></th>
									<th class="text-left">
										{{ $t("label.name") }}
									</th>
									<th class="text-left">
										{{ $t("label.size") }}
									</th>
									<th class="text-left">
										{{ $t("label.created") }}
									</th>
									<th class="text-left">
										{{ $t("label.created_date") }}
									</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr
									class="cursor-pointer"
									v-for="item in selected.children"
									:key="item.id"
									@dblclick="onToggle(item)"
								>
									<td>
										<input type="checkbox" />
									</td>
									<td>
										<v-btn icon>
											<v-icon v-if="!item.isFolder">
												{{
													m_files_icon[
														item.contentType
													]
												}}
											</v-icon>
											<v-icon
												v-else
												color="yellow darken-2"
											>
												{{ m_files_icon[""] }}
											</v-icon>
										</v-btn>
									</td>
									<td>{{ item.fileName }}</td>
									<td>
										<span v-if="!item.isFolder">
											{{ displayFileSize(item.fileSize) }}
										</span>
									</td>
									<td></td>
									<td>
										{{
											moment(item.createTime).format(
												dateTimeFormat,
											)
										}}
									</td>
									<td class="text-right">
										<v-menu offset-y>
											<template
												v-slot:activator="{ on, attrs }"
											>
												<v-btn
													icon
													v-bind="attrs"
													v-on="on"
												>
													<v-icon
														>mdi-dots-vertical</v-icon
													>
												</v-btn>
											</template>
											<v-list>
												<v-list-item
													v-if="item.isFolder"
													@click="edit({}, item)"
												>
													<v-list-item-icon>
														<v-icon
															color="green darken-2"
														>
															mdi-plus-circle
														</v-icon>
													</v-list-item-icon>
													<v-list-item-title>
														{{
															$t(
																"button.create_folder",
															)
														}}
													</v-list-item-title>
												</v-list-item>
												<v-list-item
													v-if="!item.isFolder"
													@click="viewFile(item)"
												>
													<v-list-item-icon>
														<v-icon
															color="green darken-2"
														>
															mdi-eye-circle
														</v-icon>
													</v-list-item-icon>
													<v-list-item-title>
														{{ $t("button.view") }}
													</v-list-item-title>
												</v-list-item>
												<v-list-item
													v-if="!item.isFolder"
													@click="editFile(item)"
												>
													<v-list-item-icon>
														<v-icon
															color="green darken-2"
														>
															mdi-pencil-circle
														</v-icon>
													</v-list-item-icon>
													<v-list-item-title>
														{{
															$t(
																"button.edit_online",
															)
														}}
													</v-list-item-title>
												</v-list-item>
												<v-list-item
													@click="edit(item, {})"
												>
													<v-list-item-icon>
														<v-icon
															color="blue darken-2"
														>
															mdi-pencil-circle
														</v-icon>
													</v-list-item-icon>
													<v-list-item-title>
														{{
															$t(
																"button.edit_info",
															)
														}}
													</v-list-item-title>
												</v-list-item>
												<v-list-item
													@click="deleteItem(item)"
												>
													<v-list-item-icon>
														<v-icon
															color="red darken-2"
														>
															mdi-delete-circle
														</v-icon>
													</v-list-item-icon>
													<v-list-item-title>
														{{
															$t("button.delete")
														}}
													</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</VuePerfectScrollbar>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
// import FileManagerVue from "../../administrator/FileManager/FileManager.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import Vue from "vue";
import constant from "@/common/constant";
import globalService from "@/services/global.service";
import moment from "moment";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import graphService from "@/modules/graph/services/graph.service";
import authService from "@/modules/graph/services/auth.service";
import EditFolderVue from "../../administrator/Folder/EditFolder.vue";
import administratorAPI from "../../administrator/administrator.api";
import UploadFileVue from "../../administrator/FileManager/UploadFile.vue";
import ViewFileVue from "../../administrator/FileManager/ViewFile.vue";
export default {
	components: {
		EditFolderVue,
		DeleteDialogVue,
		VuePerfectScrollbar,
		UploadFileVue,
		ViewFileVue,
	},
	name: "VsmFeDocument",

	data() {
		return {
			moment: moment,
			dialog: {
				editFolderDialog: false,
				deleteConfirmDialog: false,
				uploadFileDialog: false,
				viewFileDialog: false,
			},

			root: {
				id: "017bd09e-4377-4b1b-bd0e-f8e55114e6db",
				fileName: "root",
				fileExtension: "",
				isFolder: true,
				children: [],
			},
			selected: {},
			editedItem: {},
			parent: {},
			active: [],
			openSync: [],
			path: [],
			selectedFile: {},
			editWindow: null,
			interval: null,
			idInMicrosoft: null,
		};
	},
	watch: {
		selected(value) {
			this.path = this.getPath(this.root.children, value);
		},
		selectedFile() {
			this.idInMicrosoft = false;
		},
	},
	created() {},
	async mounted() {
		await this.onToggle(this.root);
	},
	computed: {},
	methods: {
		async edit(item, parent) {
			this.dialog.editFolderDialog = true;
			this.editedItem = item;
			this.parent = parent;
		},
		deleteItem(item) {
			this.dialog.deleteConfirmDialog = true;
			this.selected = item;
		},
		async onConfirmDelete(value) {
			if (value) {
				this.onCloseDialog();
				let response;
				try {
					response = await globalService.deleteData_Async(
						administratorAPI.API_DeleteFolder(this.selected.id),
					);
					if (!response) {
						return this.toastError(this.$t("error.delete"));
					}
					if (!response.state) {
						return this.toastError(response.message);
					}
					this.toastSuccess("success.delete");
					this.initialize();
				} catch (error) {
					this.toastError(error);
				}
			}
		},
		async _loadChild(item) {
			let response;
			try {
				if (!item.idInFileService) {
					response = await globalService.getData_Async(
						administratorAPI.API_GetFolderContent(item.id),
					);
				} else {
					response = await globalService.getData_Async(
						administratorAPI.API_GetFolderContent(
							item.idInFileService,
						),
					);
				}
				if (!response) {
					return this.toastError(this.$t("error.load"));
				}
				if (!response.state) {
					return this.toastError(response.message);
				}
				return response.data;
			} catch (error) {
				this.toastError(error);
			}
		},
		async loadChild(item) {
			this.selected = item;
			let children = await this._loadChild(item);
			item.children = [children];
		},
		async onToggle(value) {
			if (!value.isFolder) {
				this.selectedFile = value;
				return;
			}
			this.selected = value;
			let children = await this._loadChild(value);
			Vue.set(value, constant.keys.children, children);
			for (let child of children) {
				if (!child.isFolder) {
					continue;
				}
				let tmp = await this._loadChild(child);
				Vue.set(child, constant.keys.children, tmp);
			}
		},
		findPath(id, root) {
			for (let item of root) {
				if (item.id == id) {
					return item;
				}
				if (!item.children || !item.children.length) {
					continue;
				}
				let result = this.findPath(id, item.children);
				if (!result) {
					continue;
				} else {
					return result;
				}
			}
		},
		async onSelect(value) {
			this.selected = value;
		},
		async onSaveDialog() {
			this.onCloseDialog();
			this.selected = this.parent;
			await this.onToggle(this.root);
		},
		async back() {
			let items = this.getPath(this.root.children, this.selected);
			if (!items || items.length < 2) {
				this.selected = this.root;
				return;
			}
			this.selected = items[items.length - 2];
			await this.onToggle(this.selected);
		},
		async viewFile(item) {
			this.selectedFile = item;
			this.dialog.viewFileDialog = true;
		},
		async editFile(item) {
			this.selectedFile = item;
			try {
				if (!authService.user()) {
					await authService.login();
				}
				let fileResponse = await globalService.downloadBlob_Async(
					administratorAPI.FullAPI_DownloadFileById(
						item.id,
						item.contentType,
					),
				);
				if (!fileResponse) {
					return this.toastError(this.$t("error.load_file"));
				}
				let uploadResponse = await graphService.uploadFile(
					`${item.fileName}.` +
						this.convertContentTypeToFileExtension(
							item.contentType,
						),
					fileResponse,
				);

				if (!uploadResponse) {
					return this.toastError("error.upload_to_office_365");
				}
				this.idInMicrosoft = uploadResponse.id;
				this.editWindow = window.open(
					uploadResponse.webUrl,
					"targetWindow",
					`toolbar=no,
					location=no,
					status=no,
					menubar=no,
					scrollbars=yes,
					resizable=yes,
					width=1600,
					height=800`,
				);
				let handler = this._handle;
				this.interval = setInterval(handler, constant.values.interval);
			} catch (error) {
				this.toastError(error);
			}
		},
		async _handle() {
			if (!this.editWindow) {
				return;
			}
			if (!this.editWindow.closed) {
				return;
			}
			if (!this.idInMicrosoft) {
				return;
			}
			clearInterval(this.interval);
			await this.sync();
		},
		async sync() {
			try {
				let getUrlResponse = await graphService.getDownloadUrlByFileId(
					this.idInMicrosoft,
				);
				if (!getUrlResponse) {
					return this.toastError(
						this.$t("error.download_from_office_365"),
					);
				}
				let downloadResponse = await globalService.downloadBlob_Async(
					getUrlResponse.data["@microsoft.graph.downloadUrl"],
				);
				if (!downloadResponse) {
					return this.toastError(
						this.$t("error.download_from_office_365"),
					);
				}
				let updateResponse = await globalService.updateFile_Async(
					administratorAPI.API_UpdateFile(this.selectedFile.id),
					downloadResponse,
				);

				if (!updateResponse) {
					return this.toastError(this.$t("error.save"));
				}
				if (!updateResponse.state) {
					return this.toastError(updateResponse.message);
				}
				this.editWindow.close();
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style scoped></style>
