<template>
	<v-card elevation="0">
		<v-toolbar elevation="0" color="grey lighten-4">
			<v-toolbar-title>
				{{
					!m_item.id
						? $t("title.create_folder")
						: $t("title.edit_folder")
				}}</v-toolbar-title
			>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<vue-perfect-scrollbar class="h-100">
			<v-card-text>
				<v-container>
					<v-form ref="form">
						<v-row>
							<v-col cols="12">
								<v-btn
									color="blue darken-2"
									elevation="0"
									class="rounded-0 float-right"
									dark
									right
									top
								>
									<v-icon>mdi-sync</v-icon
									>{{ $t("button.sync_button") }}
								</v-btn>
							</v-col>
							<v-col cols="12">
								<m-text-field
									:label="$t('label.name')"
									:required="true"
									:value="m_item.fileName"
									@value="
										(value) => {
											m_item.fileName = value;
										}
									"
								>
								</m-text-field>
							</v-col>
							<v-col cols="12">
								<m-textarea
									:label="$t('label.description')"
									:required="false"
									:value="m_item.description"
									@value="
										(value) => {
											m_item.description = value;
										}
									"
								>
								</m-textarea>
							</v-col>
							<v-col cols="12">
								<v-select
									dense
									outlined
									:items="[
										'Vingroup',
										'VCR',
										'Vinhome',
										'Vinpearl',
									]"
									:label="$t('label.data_room')"
									clearable
								></v-select>
							</v-col>
						</v-row>
					</v-form>
				</v-container>
			</v-card-text>
		</vue-perfect-scrollbar>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				elevation="0"
				color="blue darken-2"
				dark
				class="rounded-0"
				@click="save"
			>
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
export default {
	name: "EditFolderVue",
	props: { item: {}, parent: {} },
	data() {
		return {
			m_item: {
				contentType: "",
				fileBase64: "",
				fileName: "",
				isFolder: 1,
				needEncrypt: true,
				parentId: 0,
				createdId: this.getUserInfo().id,
			},
			m_parent: {},
		};
	},
	watch: {
		item(value) {
			this.$refs.form.reset();
			this.m_item = Object.assign({}, value);
		},
		parent(value) {
			this.m_parent = value;
		},
	},
	created() {},
	mounted() {
		this.$refs.form.reset();
		this.initialize();
	},
	computed: {},
	methods: {
		initialize() {
			this.m_item = this.item;
			this.m_parent = this.parent;
		},
		async save() {
			if (!this.m_parent || !this.m_parent.id) {
				return this.toastError(this.$t("error.missing_information"));
			}
			if (!this.validRequiredText(this.m_item.fileName)) {
				return;
			}
			if (
				`${this.m_item.description}`.length > 0 &&
				!this.validText(this.m_item.description)
			) {
				return this.toastError(this.$t("error.invalid"));
			}
			this.m_item.modified = this.getUserInfo();
			this.m_item.modifiedDate = new Date();
			this.m_item.modifiedName = this.getUserInfo().fullName;
			let response;
			try {
				if (!this.m_item.id) {
					// response = await globalService.postData_Async(
					// 	administratorAPI.API_CreateFolder(),
					// 	{
					// 		contentType: "",
					// 		fileBase64: "",
					// 		fileName: this.m_item.fileName,
					// 		isFolder: 1,
					// 		needEncrypt: true,
					// 		parentId: this.m_parent.idInFileService,
					// 		createdId: this.getUserInfo().id,
					// 	},
					// );
					response = await globalService.postData_Async(
						administratorAPI.API_Create365Folder(),
						{
							createdId: this.userInfo.id,
							folderName: `${this.m_item.fileName}`,
							parentId: this.m_parent ? this.m_parent.id : 0,
							parentItemId: "",
						},
					);
				} else {
					// response = await globalService.putData_Async(
					// 	administratorAPI.API_RenameFolder(
					// 		this.m_item.id,
					// 		this.m_item.fileName,
					// 	),
					// 	{},
					// );
					response = await globalService.putData_Async(
						administratorAPI.API_Save365Folder(
							this.m_item.id,
							this.m_item.fileName,
						),
						{},
					);
				}
				if (!response) {
					this.toastError(this.$t("error.update_fail"));
				}
				if (!response.state) {
					this.toastError(response.message);
				}
				this.saveDialog();
			} catch (error) {
				this.toastError(error);
			}
		},
	},
};
</script>

<style></style>
