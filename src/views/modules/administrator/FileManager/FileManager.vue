<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog persistent v-model="dialog.editFolderDialog" max-width="60vw">
			<EditFolderVue
				:item="editedItem"
				:parent="parent"
				@close="onCloseDialog"
				@save="onSaveDialog"
			/>
		</v-dialog>
		<v-dialog
			persistent
			v-model="dialog.deleteConfirmDialog"
			width="fit-content"
		>
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="m_onConfirmDelete"
			/>
		</v-dialog>
		<v-dialog persistent v-model="dialog.uploadFileDialog" max-width="60vw">
			<UploadFileVue
				:parent="selected"
				@close="onCloseDialog"
				@upload="onUpload"
			/>
		</v-dialog>
		<v-dialog persistent v-model="dialog.viewFileDialog">
			<ViewFileVue :file="selectedFile" @close="onCloseDialog" />
		</v-dialog>
		<v-card elevation="0">
			<v-card-title>
				<v-btn
					text
					class="rounded-0 text-capitalize font-weight-regular"
					@click="edit({}, selected)"
				>
					<v-icon>mdi-plus</v-icon>{{ $t("button.insert") }}
				</v-btn>
				<v-btn
					text
					class="rounded-0 text-capitalize font-weight-regular"
					@click="dialog.uploadFileDialog = true"
				>
					<v-icon>mdi-cloud-upload-outline </v-icon>
					{{ $t("button.update_btn") }}
				</v-btn>
				<v-btn
					text
					class="rounded-0 text-capitalize font-weight-regular"
				>
					<v-icon>mdi-cloud-sync</v-icon>{{ $t("button.sync") }}
				</v-btn>
				<v-btn
					text
					class="rounded-0 text-capitalize font-weight-regular"
					@click="dialog.deleteConfirmDialog = true"
				>
					<v-icon>mdi-trash-can-outline </v-icon>
					{{ $t("button.delete") }}
				</v-btn>
				<v-spacer></v-spacer>
			</v-card-title>
		</v-card>
		<v-card elevation="0">
			<v-row>
				<v-col cols="12" md="3">
					<VuePerfectScrollbar>
						<ul>
							<tree-item
								:item="root"
								@toggle="onToggle"
							></tree-item>
						</ul>
					</VuePerfectScrollbar>
				</v-col>
				<v-divider vertical></v-divider>
				<v-col>
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
					</v-toolbar>
					<v-divider></v-divider>
					<VuePerfectScrollbar>
						<v-skeleton-loader
							v-if="!selected.children"
							type="table-heading, list-item-two-line, image, table-tfoot"
						></v-skeleton-loader>
						<v-data-table
							v-else
							v-model="selectedList"
							:headers="headers"
							:items="selected.children"
							item-key="id"
							show-select
							:items-per-page="-1"
							hide-default-footer
						>
							<template v-slot:[`item.fileExtension`]="{ item }">
								<td>
									<v-icon v-if="!item.isFolder">
										{{ m_files_icon[item.fileExtension] }}
									</v-icon>
									<v-icon v-else color="yellow darken-2">
										{{ m_files_icon[""] }}
									</v-icon>
								</td>
							</template>
							<template v-slot:[`item.fileName`]="{ item }">
								<td
									class="cursor-pointer"
									@dblclick="onToggle(item)"
								>
									<span class="underline">
										{{ item.fileName }}
									</span>
								</td>
							</template>
							<template v-slot:[`item.fileSize`]="{ item }">
								<td>
									<span v-if="!item.isFolder">
										{{ _displayFileSize(item) }}
									</span>
								</td>
							</template>
							<template v-slot:[`item.modified`]="{ item }">
								<m-user-chip :item="item.modified" />
							</template>
							<template v-slot:[`item.modifiedDate`]="{ item }">
								<td>
									{{
										moment(item.modifiedDate).format(
											dateTimeFormat,
										)
									}}
								</td>
							</template>
							<template v-slot:[`item.actions`]="{ item }">
								<td>
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
														$t("button.edit_online")
													}}
												</v-list-item-title>
											</v-list-item>
											<v-list-item
												@click="edit(item, selected)"
											>
												<v-list-item-icon>
													<v-icon
														color="blue darken-2"
													>
														mdi-pencil-circle
													</v-icon>
												</v-list-item-icon>
												<v-list-item-title>
													{{ $t("button.edit_info") }}
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
													{{ $t("button.delete") }}
												</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
								</td>
							</template>
						</v-data-table>
					</VuePerfectScrollbar>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>

<script>
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import EditFolderVue from "../Folder/EditFolder.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import Vue from "vue";
import constant from "@/common/constant";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import moment from "moment";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import UploadFileVue from "./UploadFile.vue";
import ViewFileVue from "./ViewFile.vue";
import graphService from "@/modules/graph/services/graph.service";
// import authService from "@/modules/graph/services/auth.service";

export default {
	name: "FileManagerVue",
	components: {
		BreadcrumbsVue,
		EditFolderVue,
		DeleteDialogVue,
		VuePerfectScrollbar,
		UploadFileVue,
		ViewFileVue,
	},
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
				idInFileService: "017bd09e-4377-4b1b-bd0e-f8e55114e6db",
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
			headers: [
				{ text: "", value: "fileExtension" },
				{ text: this.$t("label.name"), value: "fileName" },
				{ value: "actions" },
				{ text: this.$t("label.data_room"), value: "DRPath" },
				{ text: this.$t("label.size"), value: "fileSize" },
				{ text: this.$t("label.modified_name"), value: "modified" },
				{ text: this.$t("label.last_update"), value: "modifiedDate" },
			],
			selectedList: [],
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
		await this.initialize();
		await this.onToggle(this.root);
	},
	computed: {},
	methods: {
		async initialize() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetRootFolder(),
				);
				if (!this.preHandleResponse(response)) {
					return;
				}
				this.root = response.data;
			} catch (error) {
				this.toastError(error);
			}
		},
		async edit(item, parent) {
			this.dialog.editFolderDialog = true;
			this.editedItem = item;
			this.parent = parent;
		},
		deleteItem(item) {
			this.dialog.deleteConfirmDialog = true;
			this.selectedList = [item];
			// this.editedItem = item;
		},
		async onConfirmDelete(value) {
			if (value) {
				this.onCloseDialog();
				let response;
				try {
					if (this.editedItem.isFolder) {
						response = await globalService.deleteData_Async(
							administratorAPI.API_Delete365Folder(
								this.editedItem.id,
							),
						);
					} else {
						response = await globalService.deleteData_Async(
							administratorAPI.API_Delete365File(
								this.editedItem.id,
							),
						);
					}
					if (!response) {
						return this.toastError(this.$t("error.delete"));
					}
					if (!response.state) {
						return this.toastError(response.message);
					}
					this.toastSuccess(this.$t("success.delete"));
					await this.onToggle(this.root);
				} catch (error) {
					this.toastError(error);
				}
			}
		},
		async m_onConfirmDelete(value) {
			if (value) {
				let response;
				try {
					for (let item of this.selectedList) {
						if (item.isFolder) {
							response = await globalService.deleteData_Async(
								administratorAPI.API_Delete365Folder(item.id),
							);
						} else {
							response = await globalService.deleteData_Async(
								administratorAPI.API_Delete365File(item.id),
							);
						}
						if (!response) {
							this.toastError(this.$t("error.delete"));
						}
						if (!response.state) {
							this.toastError(response.message);
						}
					}
					this.toastSuccess(this.$t("success.delete"));
				} catch (error) {
					this.toastError(error);
				} finally {
					this.onCloseDialog();
					await this.onToggle(this.root);
				}
			}
		},
		async _loadChild(item) {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_Get365FolderContent(item.id),
				);
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
			if (!item.ofice365Path) {
				return this.toastError(this.$t("error.system_not_response"));
			}
			try {
				// if (!authService.user()) {
				// 	await authService.login();
				// }
				window.open(item.ofice365Path, "_blank");
				// let description = JSON.parse(item.description);
				// let fileResponse = await globalService.downloadBlob_Async(
				// 	administratorAPI.FullAPI_DownloadFileById(
				// 		item.idInFileService,
				// 		description.contentType,
				// 	),
				// );
				// if (!fileResponse) {
				// 	return this.toastError(this.$t("error.load_file"));
				// }
				// let uploadResponse = await graphService.uploadFile(
				// 	`${item.fileName}.` +
				// 		this.convertContentTypeToFileExtension(
				// 			description.contentType,
				// 		),
				// 	fileResponse,
				// );

				// if (!uploadResponse) {
				// 	return this.toastError("error.upload_to_office_365");
				// }
				// this.idInMicrosoft = uploadResponse.id;
				// this.editWindow = window.open(
				// 	uploadResponse.webUrl,
				// 	"targetWindow",
				// 	`toolbar=no,
				// 	location=no,
				// 	status=no,
				// 	menubar=no,
				// 	scrollbars=yes,
				// 	resizable=yes,
				// 	width=1600,
				// 	height=800`,
				// );
				// let handler = this._handle;
				// this.interval = setInterval(handler, constant.values.interval);
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
					administratorAPI.API_UpdateFile(
						this.selectedFile.idInFileService,
					),
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
		async onUpload(value) {
			if (value) {
				this.onCloseDialog();
				await this.onToggle(this.selected);
			}
		},
		_displayFileSize(item) {
			if (!item) {
				return;
			}
			if (item.isFolder) {
				return;
			}
			// let description = JSON.parse(item.description);
			return this.displayFileSize(item.fileSize);
		},
	},
};
</script>

<style></style>
