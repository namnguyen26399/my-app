<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<TabVue
			:tabs="tabs"
			:buttons="buttons"
			@buttonClick="handleButtonClick"
		/>
		<v-row class="mt-4 px-4">
			<v-col cols="12" md="4">
				<v-row>
					<v-col cols="12">
						<m-text-field
							:label="$t('label.name')"
							:value="templateForm.templateFormName"
							@value="(v) => (templateForm.templateFormName = v)"
							required
						/>
					</v-col>
					<v-col cols="12">
						<v-file-input
							outlined
							dense
							append-icon="mdi-cloud-upload-outline"
							prepend-icon=""
							:label="$t('label.upload')"
							@change="handleFile($event)"
							@click:clear="onChangeDelete()"
						></v-file-input>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-btn text class="rounded-0" @click="appendItem()">
							<v-icon> mdi-plus-circle </v-icon>
							{{ $t("button.create") }}
						</v-btn>
						<v-btn text class="rounded-0">
							<v-icon> mdi-trash-can-outline </v-icon>
							{{ $t("button.delete") }}
						</v-btn>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-data-table
							show-select
							hide-default-footer
							:headers="headers"
							:items="items"
						>
							<template v-slot:[`item.action`]="{ item }">
								<v-btn
									icon
									v-if="editing != item"
									@click="edit(item)"
								>
									<v-icon>mdi-pencil-circle </v-icon>
								</v-btn>
								<v-btn icon v-else @click="update">
									<v-icon>mdi-checkbox-marked-circle </v-icon>
								</v-btn>
								<v-btn icon @click="deleteItem(item)">
									<v-icon>mdi-delete-circle </v-icon>
								</v-btn>
							</template>
							<template v-slot:[`item.name`]="{ item }">
								<span v-if="editing != item">
									{{ item.name }}
								</span>
								<m-text-field
									v-else
									:label="$t('label.name')"
									:value="mapping.name"
									@value="(v) => (mapping.name = v)"
									class="mt-2"
								/>
							</template>
							<template v-slot:[`item.position`]="{ item }">
								<span v-if="editing != item">
									{{ item.position }}
								</span>
								<m-text-field
									v-else
									:label="$t('label.position_in_file')"
									:value="mapping.position"
									@value="(v) => (mapping.position = v)"
									class="mt-2"
								/>
							</template>
							<template v-if="creating" v-slot:[`body.append`]>
								<tr>
									<td></td>
									<td>
										<m-text-field
											:label="$t('label.name')"
											:value="mapping.name"
											@value="(v) => (mapping.name = v)"
											class="mt-2"
											required
										/>
									</td>
									<td>
										<m-text-field
											:label="
												$t('label.position_in_file')
											"
											:value="mapping.position"
											@value="
												(v) => (mapping.position = v)
											"
											class="mt-2"
										/>
									</td>
									<td>
										<v-btn icon @click="add">
											<v-icon>mdi-plus-circle</v-icon>
										</v-btn>
									</td>
								</tr>
							</template>
						</v-data-table>
					</v-col>
				</v-row>
			</v-col>
			<v-divider vertical></v-divider>
			<v-col cols="12" md="8">
				<v-skeleton-loader
					v-if="!previewLink"
					class="mx-auto"
					width="100%"
					type="card"
				></v-skeleton-loader>

				<v-btn
					v-if="previewLink"
					fab
					x-small
					color="blue darken-2"
					dark
					@click="openEdit"
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<iframe
					v-if="previewLink"
					:src="previewLink + '&amp;action=embedview'"
					width="100%"
					height="750"
					:title="templateForm.templateFormName"
					class="-mt-12"
					>This is an embedded
					<a target="_blank" href="https://office.com"
						>Microsoft Office</a
					>
					document, powered by
					<a target="_blank" href="https://office.com/webapps"
						>Office</a
					>.</iframe
				>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import TabVue from "@/components/Tab.vue";
import TemplateFormDto from "@/models/template-form.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";

export default {
	name: "EditTempalteFormV2Vue",
	components: { BreadcrumbsVue, TabVue },
	computed: {
		items() {
			try {
				return JSON.parse(this.templateForm.mappingInfo);
			} catch {
				return [];
			}
		},
	},
	watch: {
		"templateForm.attachmentFileDTOS": async function (value) {
			let response;
			try {
				let id = value[0].id;
				response = await globalService.getData_Async(
					administratorAPI.API_GetPreviewLink(id),
				);
				if (!response || !response.state) {
					return;
				}
				this.previewLink = response.data;
			} catch {
				return;
			}
		},
	},
	data() {
		return {
			tabs: [{ key: "information", title: this.$t("label.information") }],
			buttons: [
				{
					icon: "mdi-content-save",
					title: this.$t("button.save"),
					color: "blue darken-2",
					transparent: false,
					dark: true,
					event: this.save,
				},
				{
					icon: "mdi-trash-can-outline",
					title: this.$t("button.delete"),
					color: "black",
					transparent: true,
					dark: false,
					event: this.delete,
				},
				{
					icon: "mdi-arrow-left-top",
					title: this.$t("button.back"),
					color: "black",
					transparent: true,
					dark: false,
					event: this.back,
				},
			],
			templateForm: Object.assign({}, TemplateFormDto),
			headers: [
				{
					text: this.$t("label.name"),
					align: "start",
					value: "name",
				},
				{
					text: this.$t("label.position_in_file"),
					align: "start",
					value: "position",
				},
				{
					text: this.$t("label.manipulation"),
					align: "start",
					sortable: false,
					value: "action",
				},
			],
			creating: false,
			editing: false,
			mapping: {
				name: "",
				position: "",
			},
			previewLink: "",
		};
	},
	async created() {
		await this.initialize();
	},
	mounted() {},
	methods: {
		async initialize() {
			if (!this.$router.currentRoute.params.id) {
				this.templateForm = Object.assign({}, TemplateFormDto);
			} else {
				let response;
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetTemplateForm(
							this.$router.currentRoute.params.id,
						),
					);
					if (!response || !response.state) {
						this.$router.push({ path: "./" });
						return;
					}
					this.templateForm = response.data;
				} catch (error) {
					this.$router.push({ path: "./" });
				}
			}
		},
		async handleButtonClick(event) {
			await event();
		},
		async handleFile(event) {
			if (!event) {
				return;
			}
			let canUpload = true;
			if (!this.templateForm.id) {
				canUpload = await this.save();
			}
			if (!canUpload) {
				return;
			}
			console.log("event up", event);
			let response;
			try {
				if (this.templateForm.attachmentFileDTOS.length) {
					for (let item of this.templateForm.attachmentFileDTOS) {
						response = await globalService.deleteData_Async(
							administratorAPI.API_DeleteAttachmentFile(item.id),
						);
						if (!response || !response.state) {
							return this.toastError(response);
						}
					}
				}
				response = await globalService.upload_Async(
					administratorAPI.API_UploadTemplateFileCloud(
						this.templateForm.id,
					),
					event,
				);
				if (!response) {
					this.toastError(response);
					return;
				}
				if (!response.state) {
					this.toastError(response.messgage);
					return;
				}
				if (!this.templateForm.attachmentFileDTOS) {
					this.templateForm.attachmentFileDTOS = [];
				}
				this.templateForm.attachmentFileDTOS.push(response.data);
			} catch (error) {
				this.toastError(error);
			}
		},
		async save() {
			if (!this.validRequiredText(this.templateForm.templateFormName)) {
				return;
			}
			this.templateForm.modified = this.getUserInfo();
			this.templateForm.modifiedDate = new Date();
			this.templateForm.modifiedName = this.getUserInfo().fullName;
			if (!this.templateForm.id) {
				this.templateForm.created = this.getUserInfo();
				this.templateForm.createdDate = new Date();
				this.templateForm.createdName = this.getUserInfo().fullName;
			}
			let response;
			try {
				if (!this.templateForm.id) {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateTemplateForm(),
						this.templateForm,
					);
				} else {
					response = await globalService.putData_Async(
						administratorAPI.API_SaveTemplateForm(
							this.templateForm.id,
						),
						this.templateForm,
					);
				}
				if (!response) {
					this.toastError(response);
					return false;
				}
				if (!response.state) {
					this.toastError(response.messgage);
					return false;
				}
				this.templateForm = response.data;
				return true;
			} catch (error) {
				this.toastError(error);
				return false;
			}
		},
		async delete() {
			let response;
			try {
				this.templateForm.isDelete = true;
				response = await globalService.putData_Async(
					administratorAPI.API_SaveTemplateForm(this.templateForm.id),
					this.templateForm,
				);
				if (!response) {
					this.toastError(response);
					return;
				}
				if (!response.state) {
					this.toastError(response.messgage);
					return;
				}
				this.$router.push({ path: "." });
			} catch (error) {
				this.toastError(error);
			}
		},
		back() {
			this.$router.push({ path: "./" });
		},
		appendItem() {
			this.creating = true;
			this.editing = null;
			this.mapping = { name: "", position: "" };
		},
		add() {
			let temp = [];
			try {
				temp = JSON.parse(this.templateForm.mappingInfo);
			} catch (error) {
				temp = [];
			}
			temp.push(this.mapping);
			this.templateForm.mappingInfo = JSON.stringify(temp);
			this.mapping = { name: "", position: "" };
		},
		edit(item) {
			this.editing = item;
			this.mapping = item;
			this.creating = false;
		},
		update() {
			this.templateForm.mappingInfo = JSON.stringify(this.items);
			this.creating = false;
			this.editing = null;
		},

		/**
		 * @return {Array}
		 */
		_items() {
			try {
				return JSON.parse(this.templateForm.mappingInfo);
			} catch (error) {
				return [];
			}
		},
		deleteItem(item) {
			let items = this._items();
			let index = items.indexOf(item);
			items.splice(index, 1);
			this.templateForm.mappingInfo = JSON.stringify(items);
		},
		openEdit() {
			if (!this.templateForm.attachmentFileDTOS[0].ofice365Path) {
				this.toastError("error.unavaiable");
				return;
			}
			window.open(
				this.templateForm.attachmentFileDTOS[0].ofice365Path,
				"_blank",
			);
		},
		async onChangeDelete() {
			let response;
			if (this.templateForm.attachmentFileDTOS.length) {
				for (let item of this.templateForm.attachmentFileDTOS) {
					response = await globalService.deleteData_Async(
						administratorAPI.API_DeleteAttachmentFile(item.id),
					);
					if (!response || !response.state) {
						return this.toastError(response);
					}
				}
			}
			this.previewLink = "";
		},
	},
};
</script>

<style></style>
