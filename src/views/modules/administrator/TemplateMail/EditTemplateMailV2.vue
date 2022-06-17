<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<TabVue
			:tabs="tabs"
			:buttons="buttons"
			@buttonClick="handleButtonClick"
		/>
		<v-row class="mt-4 px-4">
			<v-col cols="12" md="6">
				<v-row>
					<v-col cols="12">
						<v-text-field
							dense
							outlined
							:label="$t('label.name')"
							v-model="mailTemplate.mailTemplateName"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-combobox
							v-model="receiveUsers"
							:items="receiveUserFilters"
							item-text="fullName"
							:item-value="(item) => item"
							chips
							clearable
							hide-selected
							:label="$t(`label.mail_template_receive`)"
							multiple
							dense
							outlined
							@click:clear="removeReceiveUserHandler"
						>
							<template v-slot:item="{ item }">
								<v-list-item
									@click="selectHandlerReceiveUser(item)"
									class="m-1"
								>
									<v-chip>
										<v-list-item-avatar>
											<v-avatar
												color="indigo mr-2"
												size="36"
											>
												<span
													class="white--text"
													v-if="!item.avatar"
												>
													{{
														getAvatarText(
															item.fullName,
														)
													}}
												</span>
												<v-img
													v-if="item.avatar"
													:src="item.avatar"
												>
												</v-img>
											</v-avatar>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title
												v-html="
													item.fullName +
													' <br/> ' +
													(item.email
														? item.email
														: '')
												"
											>
											</v-list-item-title>
											<v-list-item-subtitle
												v-if="
													receiveUsers &&
													receiveUsers.fullName
												"
											>
												{{ receiveUsers.fullName }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-chip>
								</v-list-item>
							</template>
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									v-if="typeof item == 'object'"
									v-bind="attrs"
									class="mt-2"
									close
									@click:close="removeReceiveUser(item)"
								>
									<v-avatar color="indigo mr-2" size="36">
										<span
											class="white--text"
											v-if="!item.avatar"
										>
											{{ getAvatarText(item.fullName) }}
										</span>
										<v-img
											v-if="item.avatar"
											:src="item.avatar"
										>
										</v-img>
									</v-avatar>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title>
												{{ item.fullName }}
											</v-list-item-title>
											<v-list-item-subtitle>
												{{ item.email }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-chip>
								<v-chip
									v-else
									v-bind="attrs"
									class="mt-2"
									close
									@click:close="removeReceiveUser(item)"
								>
									<v-avatar color="indigo mr-2" size="36">
										<span
											class="white--text"
											v-if="!item.avatar"
										>
											{{ getAvatarText(item) }}
										</span>
										<v-img
											v-if="item.avatar"
											:src="item.avatar"
										>
										</v-img>
									</v-avatar>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title>
												{{ item }}
											</v-list-item-title>
											<v-list-item-subtitle>
												{{ item }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-chip>
							</template>
						</v-combobox>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-combobox
							v-model="ccUsers"
							:items="ccUserFilters"
							item-text="fullName"
							:item-value="(item) => item"
							chips
							clearable
							hide-selected
							:label="$t(`label.mail_template_cc`)"
							multiple
							dense
							outlined
							@click:clear="removeCCUserHandler"
						>
							<template v-slot:item="{ item }">
								<v-list-item
									@click="selectHandlerCCUser(item)"
									class="m-1"
								>
									<v-chip>
										<v-list-item-avatar>
											<v-avatar
												color="indigo mr-2"
												size="36"
											>
												<span
													class="white--text"
													v-if="!item.avatar"
												>
													{{
														getAvatarText(
															item.fullName,
														)
													}}
												</span>
												<v-img
													v-if="item.avatar"
													:src="item.avatar"
												>
												</v-img>
											</v-avatar>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title
												v-html="
													item.fullName +
													' <br/> ' +
													(item.email
														? item.email
														: '')
												"
											>
											</v-list-item-title>
											<v-list-item-subtitle
												v-if="
													ccUsers && ccUsers.fullName
												"
											>
												{{ ccUsers.fullName }}
												{{ ccUsers.email }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-chip>
								</v-list-item>
							</template>
							<template v-slot:selection="{ attrs, item }">
								<v-chip
									v-if="typeof item == 'object'"
									v-bind="attrs"
									class="mt-2"
									close
									@click:close="removeCCUser(item)"
								>
									<v-avatar color="indigo mr-2" size="36">
										<span
											class="white--text"
											v-if="!item.avatar"
										>
											{{ getAvatarText(item.fullName) }}
										</span>
										<v-img
											v-if="item.avatar"
											:src="item.avatar"
										>
										</v-img>
									</v-avatar>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title>
												{{ item.fullName }}
											</v-list-item-title>
											<v-list-item-subtitle>
												{{ item.email }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-chip>
								<v-chip
									v-else
									v-bind="attrs"
									class="mt-2"
									close
									@click:close="removeCCUser(item)"
								>
									<v-avatar color="indigo mr-2" size="36">
										<span
											class="white--text"
											v-if="!item.avatar"
										>
											{{ getAvatarText(item) }}
										</span>
										<v-img
											v-if="item.avatar"
											:src="item.avatar"
										>
										</v-img>
									</v-avatar>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title>
												{{ item }}
											</v-list-item-title>
											<v-list-item-subtitle>
												{{ item }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-chip>
							</template>
						</v-combobox>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-text-field
							dense
							outlined
							:label="$t('label.mail_template_subject')"
							v-model="mailTemplate.subject"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<tiptap-vuetify
							v-model="mailTemplate.content"
							:extensions="extensions"
							placeholder="Write something to content …"
							min-height="300"
							:card-props="{
								flat: true,
								outlined: true,
							}"
						/>
					</v-col>
				</v-row>

				<!-- <v-row>
					<v-col cols="12">
						<tiptap-vuetify
							v-model="mailTemplate.footer"
							:extensions="extensions"
							placeholder="Write something …"
							min-height="300"
							:card-props="{
								flat: true,
								outlined: true,
							}"
						/>
					</v-col>
				</v-row> -->

				<v-col cols="12">
					<v-file-input
						outlined
						dense
						v-model="fileUploadInfo"
						append-icon="mdi-cloud-upload-outline"
						prepend-icon=""
						:label="$t('label.upload')"
						@change="handleFile($event)"
					></v-file-input>
				</v-col>

				<!-- <v-row>
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
				<v-divider></v-divider> -->
				<!-- <v-row>
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
								<tr>
									<td></td>
									<td>
										<v-text-field
											dense
											outlined
											single-line
											:label="$t('label.name')"
											v-model="mapping.name"
											class="mt-2"
										></v-text-field>
									</td>
									<td>
										<v-text-field
											dense
											outlined
											single-line
											:label="
												$t('label.position_in_file')
											"
											v-model="mapping.position"
											class="mt-2"
										></v-text-field>
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
				</v-row> -->
			</v-col>
			<v-divider vertical></v-divider>
			<v-col cols="12" md="6">
				<div v-html="mailTemplate.contentFile"></div>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import TabVue from "@/components/Tab.vue";
import store from "@/store";
import TemplateFormDto from "@/models/template-form.dto";
import MailTemplateDto from "@/models/mail-template.dto";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
import {
	TiptapVuetify,
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	Paragraph,
	BulletList,
	OrderedList,
	ListItem,
	Link,
	Blockquote,
	HardBreak,
	HorizontalRule,
	History,
} from "tiptap-vuetify";
export default {
	name: "EditTempalteFormV2Vue",
	components: { BreadcrumbsVue, TabVue, TiptapVuetify },
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
		"mailTemplate.content"(value) {
			this.mailTemplate.contentFile =
				(value ? value : "") +
				(this.mailTemplate.footer ? this.mailTemplate.footer : "");
		},
		"mailTemplate.footer"(value) {
			this.mailTemplate.contentFile =
				(this.mailTemplate.content ? this.mailTemplate.content : "") +
				(value ? value : "");
			return value;
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
			mailTemplate: Object.assign({}, MailTemplateDto),
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

			receiveUsers: [],
			allUser_: [],
			receiveUserFilters: [],

			ccUsers: [],
			ccUserFilters: [],

			fileUploadInfo: null,

			extensions: [
				History,
				Blockquote,
				Link,
				Underline,
				Strike,
				Italic,
				ListItem,
				BulletList,
				OrderedList,
				[
					Heading,
					{
						options: {
							levels: [1, 2, 3],
						},
					},
				],
				Bold,
				Code,
				HorizontalRule,
				Paragraph,
				HardBreak,
			],
			content: "",
		};
	},
	async created() {
		store.state.loading = true;
		await this.initialize();
	},
	mounted() {
		store.state.loading = false;
	},
	methods: {
		async initialize() {
			if (!this.$router.currentRoute.params.id) {
				this.templateForm = Object.assign({}, TemplateFormDto);
				this.mailTemplate = Object.assign({}, MailTemplateDto);
			} else {
				let response;
				try {
					response = await globalService.getData_Async(
						administratorAPI.API_GetMailTemplate(
							this.$router.currentRoute.params.id,
						),
					);
					if (!response || !response.state) {
						this.$router.push({ path: "./" });
						return;
					}
					this.mailTemplate = response.data;
					this.receiveUsers = this.mailTemplate.receiverDefault
						? JSON.parse(this.mailTemplate.receiverDefault)
						: [];
					this.ccUsers = this.mailTemplate.ccerDefault
						? JSON.parse(this.mailTemplate.ccerDefault)
						: [];
					if (this.mailTemplate.pathFile)
						this.fileUploadInfo = {
							name: this.mailTemplate.pathFile,
						};
				} catch (error) {
					this.$router.push({ path: "./" });
				}
			}
			this.getAllUser();
		},
		async getAllUser() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfo(),
				);
				if (!response || !response.state) {
					return;
				}
				this.allUser_ = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.receiveUserFilters = this.allUser_;
				this.ccUserFilters = this.allUser_;
				if (this.receiveUsers)
					this.receiveUserFilters = this.filerUser(
						this.receiveUserFilters,
						this.receiveUsers,
					);
				if (this.ccUsers)
					this.ccUserFilters = this.filerUser(
						this.ccUserFilters,
						this.ccUsers,
					);
			} catch (error) {
				this.toastError(error);
			}
		},
		/**
		 * Hàm thực hiện loại bỏ các phần tử của mảng source mà đã tồn tại ở mảng target
		 * @param {*} source: mảng nguồn
		 * @param {*} target: mảng chứa phần tử cần loại bỏ
		 */
		filerUser(source = [], target = []) {
			return source.filter(
				(ele) => !target.some((ele1) => ele.id == ele1.id),
			);
		},
		async handleButtonClick(event) {
			await event();
		},
		async handleFile(event) {
			if (event) {
				this.fileUploadInfo = event;
				this.mailTemplate.pathFile = this.fileUploadInfo.name
					? this.fileUploadInfo.name
					: "";
			}
			// if (!event) {
			// 	return;
			// }
			// let canUpload = true;
			// if (!this.templateForm.id) {
			// 	canUpload = await this.save();
			// }
			// if (!canUpload) {
			// 	return;
			// }
			// let response;
			// try {
			// 	response = await globalService.upload_Async(
			// 		administratorAPI.API_UploadTemplateFileCloud(
			// 			this.templateForm.id,
			// 		),
			// 		event,
			// 	);
			// 	if (!response) {
			// 		this.toastError(response);
			// 		return;
			// 	}
			// 	if (!response.state) {
			// 		this.toastError(response.messgage);
			// 		return;
			// 	}
			// 	if (!this.templateForm.attachmentFileDTOS) {
			// 		this.templateForm.attachmentFileDTOS = [];
			// 	}
			// 	this.templateForm.attachmentFileDTOS.push(response.data);
			// } catch (error) {
			// 	this.toastError(error);
			// }
		},
		async save() {
			this.mailTemplate.modified = this.getUserInfo();
			this.mailTemplate.modifiedDate = new Date();
			this.mailTemplate.modifiedName = this.getUserInfo().fullName;
			this.mailTemplate.contentFile =
				this.mailTemplate.content + this.mailTemplate.footer;
			this.mailTemplate.receiverDefault = JSON.stringify(
				this.receiveUsers,
				// this.receiveUsers.map((ele) => {
				// 	if (typeof ele == "object") return ele.email;
				// 	else return ele;
				// }),
			);
			this.mailTemplate.ccerDefault = JSON.stringify(
				this.ccUsers,
				// this.ccUsers.map((ele) => {
				// 	if (typeof ele == "object") return ele.email;
				// 	else return ele;
				// }),
			);
			if (!this.mailTemplate.id) {
				this.mailTemplate.created = this.getUserInfo();
				this.mailTemplate.createdDate = new Date();
				this.mailTemplate.createdName = this.getUserInfo().fullName;
			}
			let response;
			try {
				if (!this.mailTemplate.id) {
					response = await globalService.postData_Async(
						administratorAPI.API_CreateMailTemplate(),
						this.mailTemplate,
					);
				} else {
					response = await globalService.putData_Async(
						administratorAPI.API_SaveMailTemplate(
							this.mailTemplate.id,
						),
						this.mailTemplate,
					);
				}
				if (!response) {
					this.toastError(response);
					return false;
				}
				if (!response.state) {
					this.toastError(response.message);
					return false;
				}

				// hiển thị thông báo
				this.mailTemplate = response.data;
				this.toastSuccess(response.message);
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

		async removeReceiveUserHandler() {
			this.receiveUserFilters = Object.assign([], this.allUser_);
			this.receiveUsers = [];
		},
		selectHandlerReceiveUser(item) {
			this.receiveUsers.push(item);
		},
		removeReceiveUser(item) {
			this.receiveUsers.splice(this.receiveUsers.indexOf(item), 1);
		},
		async removeCCUserHandler() {
			this.ccUserFilters = Object.assign([], this.allUser_);
			this.ccUsers = [];
		},
		selectHandlerCCUser(item) {
			this.ccUsers.push(item);
		},
		removeCCUser(item) {
			this.ccUsers.splice(this.ccUsers.indexOf(item), 1);
		},
	},
};
</script>

<style></style>
