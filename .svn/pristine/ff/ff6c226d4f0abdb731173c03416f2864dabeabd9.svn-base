<template>
	<v-card elevation="0">
		<v-dialog v-model="dialog.formOption">
			<FormOption @close="onClose" @save="onSaveFile" />
		</v-dialog>
		<v-row class="mt-4 px-4">
			<v-col>
				<div class="flex gap-4">
					<v-menu offset-y>
						<template v-slot:activator="{ on, attrs }">
							<span
								v-bind="attrs"
								v-on="on"
								@click="openSelectFormOption()"
								><v-icon>mdi-plus</v-icon>
								{{ $t("button.create") }}
								<v-icon>mdi-menu-down</v-icon></span
							>
						</template>
					</v-menu>
					<v-divider vertical></v-divider>
					<span
						><v-icon>mdi-delete-outline</v-icon>
						{{ $t("button.delete") }}</span
					>
				</div>
			</v-col>
			<v-col>
				<v-btn
					color="blue darken-1"
					dark
					class="m-2 rounded float-right"
					@click="save()"
				>
					<v-icon> mdi-content-save </v-icon>
					{{ $t("button.save") }}
				</v-btn>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row class="mt-4 px-4">
			<v-col cols="12" md="4">
				<v-row>
					<v-col>
						<v-combobox
							v-model="templateForm"
							:items="templates"
							item-text="templateFormName"
							outlined
							dense
							required
							maxLength="255"
						>
							<template v-slot:label>
								{{ $t("label.select_template_form") }}
							</template>
						</v-combobox>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-btn text class="rounded-0" @click="appendItem()">
							<v-icon> mdi-plus </v-icon>
							{{ $t("button.create") }}
						</v-btn>
						<v-btn text class="rounded-0">
							<v-icon> mdi-delete-outline </v-icon>
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
								<v-text-field
									v-else
									dense
									outlined
									single-line
									v-model="mapping.name"
									class="mt-2"
								>
									{{ item.name }}
								</v-text-field>
							</template>
							<template v-slot:[`item.position`]="{ item }">
								<span v-if="editing != item">
									{{ item.position }}
								</span>
								<v-text-field
									v-else
									dense
									outlined
									single-line
									v-model="mapping.position"
									class="mt-2"
								>
									{{ item.position }}
								</v-text-field>
							</template>
							<template v-if="creating" v-slot:[`body.append`]>
								<tr class="mt-2">
									<td></td>
									<td>
										<v-select
											:items="list_field_form"
											item-text="id_name"
											:item-value="(item) => item.id"
											:label="$t('label.select_field')"
											v-model="mapping.position"
											dense
											outlined
										></v-select>
									</td>
									<td>
										<v-select
											:items="list_field_tempalteform"
											:label="$t('label.select_field')"
											dense
											outlined
											v-model="mapping.name"
										></v-select>
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
				<iframe
					v-if="previewLink"
					:src="previewLink + '&amp;action=embedview'"
					width="100%"
					height="750"
					frameborder="0"
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
import store from "@/store";
import TemplateFormDto from "@/models/template-form.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import FormOption from "../FormOption/FormOption.vue";
import RequestDto from "@/models/request.dto";

export default {
	name: "EditTempalteFormV2Vue",
	components: { FormOption },
	props: {
		Form: {},
		requestDto: {},
	},
	computed: {},
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
				this.items = JSON.parse(this.templateForm.mappingInfo);
				this.list_field_tempalteform = JSON.parse(
					this.templateForm.mappingInfo,
				);
				for (let i = 0; i < this.list_field_tempalteform.length; i++) {
					this.list_field_tempalteform[i] =
						this.list_field_tempalteform[i].name;
				}
			} catch {
				return;
			}
		},
		Form(value) {
			this.form = value;
		},
		requestDto(value) {
			this.m_requestDto = value;
		},
	},
	data() {
		return {
			m_requestDto: RequestDto,
			form: [],
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
			m_template: Object.assign({}, TemplateFormDto),
			headers: [
				{
					text: this.$t("Trường dữ liệu form"),
					align: "start",
					value: "position",
				},
				{
					text: this.$t("Trường dữ liệu biểu mẫu"),
					align: "start",
					value: "name",
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
			templates: [],
			items: [],
			dialog: {
				formOption: false,
			},
			list_field_form: [],
			list_field_tempalteform: [],
		};
	},
	async created() {
		store.state.loading = false;
		this.form = this.Form;
		this.m_requestDto = this.requestDto;
		await this.initialize();
	},
	mounted() {
		// store.state.loading = false;
	},
	methods: {
		async initialize() {
			await this.getFormForm();
			if (this.form.length > 0) {
				for (let i = 0; i < this.form.length; i++) {
					for (let j = 0; j < this.form[i].elements.length; j++) {
						this.list_field_form.push({
							id: `{{${this.form[i].elements[j].field.configModel.id}}}`,
							id_name:
								this.form[i].elements[j].field.configModel
									.title,
						});
					}
				}
			}
		},
		async getListTemplate() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllTemplateForm(),
			);
			if (!response.state) {
				return;
			}
			this.templates = response.data.filter((entry) => {
				return !entry.isDelete;
			});
			this.sortList(this.templates);
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
			let response;
			try {
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
			this.templateForm.mappingInfo = JSON.stringify(this.items);
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
				response = await globalService.deleteData_Async(
					administratorAPI.API_DeleteTemplateForm(
						this.templateForm.id,
					),
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
			this.items.push(this.mapping);
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
			let index = this.items.indexOf(item);
			this.items.splice(index, 1);
			this.templateForm.mappingInfo = JSON.stringify(this.items);
		},
		openSelectFormOption() {
			this.dialog.formOption = true;
		},
		onSaveFile(value) {
			this.listFile = value;
			this.templates = value;
		},
		onClose(value) {
			if (value) {
				this.dialog.formOption = false;
			}
		},
		async getFormForm() {
			if (!this.m_requestDto.form || !this.m_requestDto.form.id) return;
			let response_All_Fields = await globalService.getData_Async(
				`/api/forms/${this.m_requestDto.form.id}`,
			);
			this.form = JSON.parse(response_All_Fields.data.objectSchema);
		},
	},
};
</script>

<style></style>
