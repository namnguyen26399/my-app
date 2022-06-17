<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<v-dialog v-model="dialog.delete" persistent max-width="fit-content">
			<DeleteDialogVue
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			/>
		</v-dialog>
		<v-dialog v-model="dialog.edit" persistent max-width="40vw">
			<EditCategoryVue
				:categoryGroupDto="selectedItem"
				:categoryGroupDtos="raw"
				:edit="dialog.edit"
				@save="initialize"
				@cancel="closeEditDialog"
			>
			</EditCategoryVue>
		</v-dialog>
		<template>
			<v-card-title>
				<v-btn
					elevation="0"
					text
					class="rounded-0"
					@click="editCategoryGroup"
				>
					<v-icon>mdi-plus</v-icon>
					{{ $t("button.insert") }}
				</v-btn>
				<v-btn
					v-if="selected.length > 0"
					elevation="0"
					text
					class="rounded-0"
					@click.stop="deleteAll"
				>
					<v-icon>mdi-trash-can-outline</v-icon>
					{{ $t("button.delete_all") }}
				</v-btn>
			</v-card-title>
		</template>
		<v-card-text>
			<v-treeview
				v-model="selected"
				selectable
				selection-type="independent"
				:items="root"
				open-on-click
			>
				<template v-slot:prepend="{ item, open }">
					<v-icon v-if="item.children && item.children.length">
						{{ open ? "mdi-folder-open" : "mdi-folder" }}
					</v-icon>
				</template>
				<template v-slot:label="{ item }">
					<span v-if="item.name.length > 50 && !showAllText">
						{{ item.name.slice(0, 50) }}
						<a href="#" @click="showAllText = !showAllText">
							{{ $t("button.details") }}
						</a>
					</span>
					<span
						v-if="item.name.length > 50 && showAllText"
						style="white-space: normal"
					>
						{{ item.name }}
						<a href="#" @click="showAllText = !showAllText">
							{{ $t("button.hide") }}
						</a>
					</span>
					<span v-if="item.name.length <= 50">
						{{ item.name }}
					</span>
					<v-menu
						transition="slide-y-transition"
						bottom
						open-on-click
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="grey darken-2"
								dark
								icon
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="createChild(item)">
								<v-list-item-icon>
									<v-icon color="green darken-2">
										mdi-plus-circle
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>{{
									$t("button.add")
								}}</v-list-item-title>
							</v-list-item>
							<v-list-item @click="editCategoryGroup(item)">
								<v-list-item-icon>
									<v-icon color="blue darken-2">
										mdi-pencil
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>{{
									$t("button.edit")
								}}</v-list-item-title>
							</v-list-item>
							<v-list-item @click="deleteItem(item)">
								<v-list-item-icon>
									<v-icon color="red darken-2">
										mdi-trash-can-outline
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title color="red darken-2">{{
									$t("button.delete")
								}}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-divider></v-divider>
				</template>
			</v-treeview>
		</v-card-text>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "@/views/modules/administrator/administrator.api";
import EditCategoryVue from "./EditCategory.vue";
import DeleteDialogVue from "@/components/DeleteDialog.vue";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
export default {
	name: "CategoryList",
	components: { EditCategoryVue, DeleteDialogVue, BreadcrumbsVue },

	data() {
		return {
			loading: true,
			dialog: {
				edit: false,
				delete: false,
			},
			search: "",
			selected: [],
			selectedParent: [],
			root: [],
			selectedItem: {},
			raw: [],
			showAllText: false,
		};
	},
	created() {
		this.$Progress.start();
	},
	async mounted() {
		this.$Progress.finish();
		this.initialize();
	},
	methods: {
		async initialize() {
			this.dialog.edit = false;
			this.dialog.delete = false;
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllCategoryGroup(),
				);
				if (!response) {
					this.errorLoad();
					return;
				}
				if (!response.state) {
					this.errorLoad();
					return;
				}
				this.raw = response.data.filter((entry) => {
					return !entry.isDelete;
				});
				this.root = response.data
					.filter((entry) => {
						return !entry.parent && !entry.isDelete;
					})
					.map((entry) => {
						return { ...entry, children: [] };
					});
				let children = response.data.filter((entry) => {
					return !!entry.parent && !entry.isDelete;
				});
				let rerun = [];
				for (let child of children) {
					let parent = this.findParent(child.parent.id, this.root);
					if (!parent) {
						if (
							children.find((entry) => {
								return child.parent.id == entry.id;
							})
						) {
							rerun.push(child);
						}
						continue;
					}
					if (!child.children) {
						child.children = [];
					}
					parent.children.push(child);
				}
				for (let child of rerun) {
					let parent = this.findParent(child.parent.id, this.root);
					if (!parent) {
						if (
							children.find((entry) => {
								return child.parentId == entry.id;
							})
						) {
							rerun.push(child);
						}
						continue;
					}
					if (!child.children) {
						child.children = [];
					}
					parent.children.push(child);
				}
				this.finishLoad();
			} catch (error) {
				this.errorLoad(error);
			}
		},
		findParent(parentId, root) {
			for (let entry of root) {
				if (entry.id == parentId) {
					return entry;
				}
				if (!entry.children || !entry.children.length) {
					continue;
				}
				let result = this.findParent(parentId, entry.children);
				if (!result) {
					continue;
				} else {
					return result;
				}
			}
		},
		editItem(item) {
			this.$router.push({
				path: administratorAPI.Route_EditCategroupGroup(item.id),
			});
		},
		deleteItem(item) {
			this.selected = [...[item.id]];
			this.selectedParent.push(item);
			this.dialog.delete = true;
		},
		async onConfirmDelete() {
			let response;
			try {
				let data = this.raw
					.filter((entry) => {
						return this.selected.includes(entry.id);
					})
					.map((entry) => {
						entry.isDelete = true;
						return entry;
					});
				data = data.concat(this.selectedParent);
				response = await globalService.postData_Async(
					administratorAPI.API_SaveAllCategoryGroup(),
					data,
				);
				if (!response) {
					return this.toastError(this.$t("error.delete"));
				}
				if (!response.state) {
					return this.toastError(this.$t("error.delete"));
				}

				this.toast(this.$t("success.delete"));

				this.closeDelete();
				this.initialize();
			} catch (error) {
				this.toastError(error);
			}
		},
		closeDelete() {
			this.selectedParent = [];
			this.dialog.delete = false;
		},
		deleteAll() {
			this.dialog.delete = true;
		},
		editCategoryGroup(item = {}) {
			this.selected = [...[item]];
			this.selectedItem = item;
			// this.selectedItem.children = null;
			this.dialog.edit = true;
		},
		createChild(parent) {
			this.selectedItem = {};
			this.selectedItem.parent = parent;
			this.dialog.edit = true;
		},
		closeEditDialog(value) {
			if (value) {
				this.dialog.edit = false;
			}
		},
	},
};
</script>

<style></style>
