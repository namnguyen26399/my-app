<template>
	<v-card elevation="0">
		<v-breadcrumbs
			v-if="m_requestDto.tennantName"
			:items="[...m_requestDto.tennantName]"
		>
			<template v-slot:item="{ item }">
				<v-breadcrumbs-item>
					{{ item }}
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>
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
		<v-row class="mt-4">
			<v-col cols="12" md="4">
				<ul>
					<tree-item
						:item="root"
						@toggle="onToggle"
						@select="onSelect"
					></tree-item>
				</ul>
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
						@click="select"
					>
						<v-icon>mdi-check</v-icon>
						{{ $t("button.select") }}
					</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
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
								:key="item.idInFileService"
								@dblclick="onToggle(item)"
							>
								<td>
									<input
										type="checkbox"
										:checked="
											m_requestDto.description ==
											item.idInFileService
										"
										disabled
									/>
								</td>
								<td>
									<v-btn icon>
										<v-icon v-if="!item.isFolder">
											{{ m_files_icon[item.contentType] }}
										</v-icon>
										<v-icon v-else color="yellow darken-2">
											{{ m_files_icon[""] }}
										</v-icon>
									</v-btn>
								</td>
								<td>{{ item.fileName }}</td>
								<td>{{ item.fileSize / 1000 }}</td>
								<td>{{ item.fileSize }}</td>
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
													{{ $t("button.edit") }}
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
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import EditFolderVue from "../Folder/EditFolder.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import Vue from "vue";
import constant from "@/common/constant";
import moment from "moment";
export default {
	name: "EditRequestStorageVue",
	props: { requestDto: {} },
	components: { EditFolderVue, DeleteDialogVue },
	data() {
		return {
			moment: moment,
			dialog: {
				editFolderDialog: false,
				deleteConfirmDialog: false,
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
			breadCrumbs: [],
			parent: {},
			active: [],
			openSync: [],
			path: [],
			m_requestDto: {},
		};
	},
	watch: {
		selected(value) {
			this.path = this.getPath(this.root.children, value);
		},
	},
	created() {},
	async mounted() {
		this.m_requestDto = this.requestDto;
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
				response = await globalService.getData_Async(
					administratorAPI.API_GetFolderContent(item.idInFileService),
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
		async select() {
			this.breadCrumbs = [];
			this.m_requestDto.description = this.selected.idInFileService;
			this.breadCrumbs.push("root");
			this.path.filter((entry) => {
				this.breadCrumbs.push(entry.fileName);
			});
			this.m_requestDto.tennantName = this.breadCrumbs.join("/ ");
			let response;
			try {
				response = await globalService.putData_Async(
					administratorAPI.API_SaveRequest(this.m_requestDto.id),
					this.m_requestDto,
				);
				if (!response) {
					return this.toastError(this.$t("error.save"));
				}
				if (!response.state) {
					return this.toastError(response.messgage);
				}
				this.m_requestDto = response.data;
				this.toastSuccess(this.$t("success.updated"));
			} catch (error) {
				this.toastError(error);
			}
			console.log("this.m_requestDto", this.m_requestDto);
			console.log("this.breadCrumbs", this.breadCrumbs);
		},
	},
};
</script>

<style></style>
