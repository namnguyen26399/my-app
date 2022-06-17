<template>
	<v-card elevation="0">
		<v-toolbar elevation="0" color="grey lighten-4">
			<v-toolbar-title>
				{{
					!m_CategoryGroupDto.id
						? $t("title.create_category_group")
						: $t("title.edit_category_group")
				}}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="cancel">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-container>
				<v-row class="mt-2">
					<v-col cols="12">
						<v-form ref="form">
							<v-text-field
								:label="$t('label.name')"
								:error-messages="errName"
								@keyup="onchangeName"
								v-model="m_CategoryGroupDto.name"
								maxlength="255"
								outlined
								:required="true"
							>
							</v-text-field>

							<v-textarea
								:label="$t('label.description')"
								v-model="m_CategoryGroupDto.description"
								maxlength="500"
								outlined
							></v-textarea>

							<v-autocomplete
								v-model="m_CategoryGroupDto.parent"
								:items="categoryGroups"
								clearable
								:label="$t('label.parent_node')"
								outlined
								hide-selected
								dense
								item-text="name"
								:item-value="(item) => item"
								:no-data-text="$t('message.no_results')"
							>
							</v-autocomplete>
						</v-form>
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
				class="rounded-0"
				@click.stop="saveCategoryGroup()"
			>
				{{ $t("button.ok") }}
			</v-btn>
			<v-btn
				elevation="0"
				color="grey lighten-4"
				class="rounded-0"
				@click.stop="cancel()"
			>
				{{ $t("button.cancel") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import CategoryDataDto from "@/models/category-data.dto";
import constant from "@/common/constant";
import CategoryGroupDTO from "@/models/category-group.dto";
export default {
	name: "EditCategoryVue",
	props: ["categoryGroupDto", "categoryGroupDtos", "edit"],
	watch: {
		edit(value) {
			this.m_CategoryGroupDto = CategoryGroupDTO;
			// this.$refs.form.reset();
			console.log(value);
		},
		categoryGroupDto(value) {
			this.$refs.form.reset();
			this.m_update(value);
		},
		categoryGroupDtos(value) {
			this.categoryGroups = value;
		},
	},
	components: {},
	data() {
		return {
			errorName: "",
			is_edit: false,
			categoryGroupId: false,
			validCategoryGroup: false,
			validCategoryData: true,
			loading: true,
			dialogDelete: false,
			search: "",
			m_CategoryGroupDto: CategoryGroupDTO,
			categoryDataDto: CategoryDataDto,
			selected: [],
			editedIndex: -1,
			items: [],
			parentItems: [],
			categoryGroups: [],
			categoryGroupParent: null,
			globalFilterValue: null,
			errName: "",
			descriptionError: "",
		};
	},
	created() {},
	async mounted() {
		this.$refs.form.reset();
		await this.initialize();
	},
	methods: {
		async initialize() {
			this.m_update(this.categoryGroupDto);
			let response;
			try {
				if (!this.$router.currentRoute.params) {
					return this.finishLoad();
				}
				this.categoryGroupId = this.$router.currentRoute.params.id;
				if (!this.categoryGroupId) {
					return;
				}
				response = await globalService.getData_Async(
					administratorAPI.API_GetCategoryGroup(this.categoryGroupId),
				);
				if (!response) {
					return this.toastError(this.$t("error.load"));
				}
				if (!response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.m_CategoryGroupDto = response.data;
				if (
					!this.m_CategoryGroupDto ||
					!this.m_CategoryGroupDto.parent ||
					!this.m_CategoryGroupDto.parent.id
				) {
					this.doNothing();
				} else {
					response = await globalService.getData_Async(
						administratorAPI.API_GetCategoryGroup(
							this.m_CategoryGroupDto.parent.id,
						),
					);
					if (!response || !response.state) {
						this.toastError(this.$t("error.load"));
					} else {
						this.m_CategoryGroupDto.parent = response.data;
					}
					response = await globalService.getData_Async(
						administratorAPI.API_GetAllCategoryDataByCategoryGroupId(
							this.m_CategoryGroupDto.parent.id,
						),
					);
					if (!response || !response.state) {
						this.toastError(this.$t("error.load"));
					} else {
						this.options.context.items = response.data;
					}
				}
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllCategoryDataByCategoryGroupId(
						this.categoryGroupId,
					),
				);
				if (!response) {
					return this.toastError(this.$t("error.load"));
				}
				if (!response.state) {
					return this.toastError(this.$t("error.load"));
				}
				this.items = response.data;
			} catch (error) {
				this.toastError(this.$t("error.can_not_param"));
			}
		},

		async saveCategoryData() {
			if (!this.categoryDataDto.value) {
				return this.toastError(this.$t("error.please_fill_form"));
			}
			if (!this.categoryDataDto.key) {
				this.categoryDataDto.key = this.getKeyFromValue(
					this.categoryDataDto.value,
				);
			}
			if (!this.m_CategoryGroupDto.id) {
				return this.toastError(
					this.$t("error.please_create_parent_first"),
				);
			}
			let isEditing = !!this.categoryDataDto.id;
			let response;
			if (!this.categoryDataDto.id) {
				this.categoryDataDto.created = this.getUserInfo();
				this.categoryDataDto.createdDate = new Date();
			}
			this.categoryDataDto.modified = this.getUserInfo();
			this.categoryDataDto.modifiedate = new Date();
			this.categoryDataDto.categoryGroup = this.m_CategoryGroupDto;
			this.categoryDataDto.isDelete = false;
			try {
				if (!isEditing) {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateCategoryData(),
						this.categoryDataDto,
					);
				} else {
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateCategoryData(
							this.categoryDataDto.id,
						),
						this.categoryDataDto,
					);
				}
				if (!response) {
					return this.errorUpdate();
				}
				if (!response.state) {
					return this.errorUpdate();
				}
				if (!isEditing) {
					this.items.push(response.data);
				}
				this.categoryDataDto.key = "";
				this.toast(response.message);
				this.$emit(constant.keys.save, true);
			} catch (error) {
				this.toastError(error);
			}
		},
		async saveCategoryGroup() {
			if (!this.validRequiredText(this.m_CategoryGroupDto.name)) {
				this.toastError(this.$t("error.please_fill_form"));
				return;
			}
			console.log(this.m_CategoryGroupDto);
			this.m_CategoryGroupDto.name =
				`${this.m_CategoryGroupDto.name}`.trim();

			this.m_CategoryGroupDto.description = this.m_CategoryGroupDto
				.description
				? `${this.m_CategoryGroupDto.description}`.trim()
				: "";
			if (
				!this.m_CategoryGroupDto.name ||
				this.m_CategoryGroupDto.name.trim() == ""
			) {
				this.$refs["categoryName"].focus();
				this.errName = this.$t("message.msg_1");
				return;
			}
			let response;
			let isEditing = !!this.m_CategoryGroupDto.id;
			if (!this.m_CategoryGroupDto.id) {
				this.m_CategoryGroupDto.created = this.getUserInfo();
				this.m_CategoryGroupDto.createdDate = new Date();
			}
			this.m_CategoryGroupDto.modified = this.getUserInfo();
			this.m_CategoryGroupDto.modifiedate = new Date();
			try {
				if (!isEditing) {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateCategoryGroup(),
						this.m_CategoryGroupDto,
					);
				} else {
					response = await globalService.putData_Async(
						administratorAPI.API_UpdateCategoryGroup(
							this.m_CategoryGroupDto.id,
						),
						this.m_CategoryGroupDto,
					);
				}
				if (!response) {
					return this.errorUpdate();
				}
				if (!response.state) {
					return this.toastError(response.message);
				}
				this.m_CategoryGroupDto = response.data;
				this.toast(response.message);
				if (
					!this.m_CategoryGroupDto.parent ||
					!this.m_CategoryGroupDto.parent.id
				) {
					this.doNothing();
				} else {
					response = await globalService.getData_Async(
						administratorAPI.API_GetCategoryGroup(
							this.m_CategoryGroupDto.parent.id,
						),
					);
					if (!response) {
						return this.toastError(this.$t("error.load"));
					}
					if (!response.state) {
						return this.toastError(this.$t("error.load"));
					}
					this.m_CategoryGroupDto.parent = response.data;
				}
				this.$emit(constant.keys.save, true);
			} catch (error) {
				this.toastError(error);
			}
		},
		editItem(item) {
			this.categoryDataDto = item;
		},
		deleteItem(item) {
			this.selected = [...[item]];
			this.dialogDelete = true;
		},
		async confirm() {
			let response;
			this.closeDelete();
			try {
				response = await globalService.postData_Async(
					administratorAPI.API_DeleteAllCategoryData(),
					this.selected,
				);
				if (!response) {
					return this.toastError(this.$t("error.delete"));
				}
				if (!response.state) {
					return this.toastError(this.$t("error.delete"));
				}
				this.toast(this.$t("success.delete"));
				for (let item of this.selected) {
					let index = this.items.indexOf(item);
					this.items.splice(index, 1);
				}
			} catch (error) {
				this.toastError(error);
			}
		},
		closeDelete() {
			this.dialogDelete = false;
		},
		deleteAll() {
			this.dialogDelete = true;
		},
		onDataChange() {
			if (!this.categoryDataDto.key) {
				this.categoryDataDto.key = this.getKeyFromValue(
					this.categoryDataDto.value,
				);
			}
		},
		removeParentCategoryGroup() {
			this.m_CategoryGroupDto.parent = null;
			this.temp_Parent = null;
		},
		async saveAllCategoryData() {
			let filterValue = this.globalFilterValue;
			let response;
			let tmp;
			try {
				tmp = this.selected.map((element) => {
					element.filterValue = filterValue;
					return element;
				});
				response = await globalService.postData_Async(
					administratorAPI.API_SaveAllCategoryData(),
					tmp,
				);
				if (!response) {
					return this.toastError(this.$t("error.update"));
				}
				if (!response.state) {
					return this.toastError(response.message);
				}
				return this.toast(response.message);
			} catch (error) {
				return this.toastError(error);
			}
		},
		async m_update(value) {
			this.m_CategoryGroupDto = value;
			if (!this.m_CategoryGroupDto || !this.m_CategoryGroupDto.id) {
				this.categoryGroups = this.categoryGroupDtos.filter((entry) => {
					if (entry.id != this.m_CategoryGroupDto.id) return entry;
				});
				if (!!value.parent && !!value.parent.id) {
					this.m_CategoryGroupDto.parent = this.categoryGroups.find(
						(entry) => {
							if (entry.id == value.parent.id && !entry.isDelete)
								return entry;
						},
					);
				}
			} else {
				this.categoryGroups = [];
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllChildByParentId(
						this.m_CategoryGroupDto.id,
					),
				);
				let responseCate = await globalService.getData_Async(
					administratorAPI.API_GetAllCategoryGroup(),
				);
				if (
					!response ||
					!response.state ||
					!responseCate ||
					!responseCate.state
				)
					return;
				let newData = responseCate.data.filter((entry) => {
					return !entry.isDelete;
				});
				let temp = response.data;

				this.categoryGroups = newData.filter((e1) => {
					return !temp.some((e2) => e1.id == e2.id);
				});

				if (!!value.parent && !!value.parent.id) {
					this.m_CategoryGroupDto.parent = this.categoryGroups.find(
						(entry) => {
							if (entry.id == value.parent.id && !entry.isDelete)
								return entry;
						},
					);
				}
			}
		},
		cancel() {
			this.errName = "";
			this.$emit(constant.keys.cancel, true);
		},
		onchangeName() {
			this.errName = "";
		},
	},
};
</script>

<style></style>
