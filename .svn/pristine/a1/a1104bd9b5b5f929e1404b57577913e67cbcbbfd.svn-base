<template>
	<v-card elevation="0">
		<v-row>
			<v-col cols="6">
				<span class="mt-2"
					><v-icon>mdi-plus</v-icon> Tạo mới
					<v-icon>mdi-menu-down</v-icon></span
				>
			</v-col>
			<v-col cols="6">
				<v-btn
					color="blue darken-2"
					dark
					class="m-2 rounded-0 float-right"
					@click="saveRequest()"
				>
					<v-icon> mdi-content-save </v-icon>
					{{ $t("button.save_form") }}
				</v-btn>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row class="mt-2">
			<v-col cols="12" md="2" sm="12">
				<v-card elevation="0">
					<VuePerfectScrollbar class="scroll-area">
						<Container :get-child-payload="getChildPayload">
							<Draggable
								v-for="(field, index) in fields"
								:key="'field_' + index"
								:data-index="index"
							>
								<v-card
									elevation="0"
									outlined
									color="grey lighten-3"
									class="mb-2 mx-auto text-center p-2 cursor-move"
								>
									<!-- <v-btn icon class="mx-auto cursor-move">
										<v-icon x-large>{{
											field.icon
										}}</v-icon>
									</v-btn>
									<br /> -->
									<span>
										{{ field.name }}
									</span>

									<v-jsf
										v-model="field.viewLeftModel"
										:schema="field.viewLeft"
										:options="options"
										:key="'field_' + index"
									></v-jsf>
								</v-card>
							</Draggable>
						</Container>
					</VuePerfectScrollbar>
				</v-card>
			</v-col>
			<v-col cols="12" md="7" sm="12">
				<v-card elevation="0">
					<Container :get-child-payload="getChildPayload">
						<v-row
							v-for="(row, rowIndex) in form"
							:key="'row_' + rowIndex"
							class="form-row d-flex"
						>
							<v-col
								v-for="(col, colIndex) in row.elements"
								:key="'col_' + rowIndex + '_' + colIndex"
								:cols="col.width"
								@click="config(col, rowIndex, colIndex)"
								@
								:class="getClass(rowIndex, colIndex)"
							>
								<v-card
									elevation="0"
									class="m-1 p-2 rounded bordered-dotted"
									outlined
									color="grey lighten-2"
								>
									<Container
										@drag-enter="
											onDragEnter(rowIndex, colIndex)
										"
										:should-accept-drop="shouldAcceptDrop"
										@drop="onDrop(col, rowIndex, colIndex)"
										:get-child-payload="getChildPayload"
									>
										<v-form
											v-if="
												col.field &&
												col.field.previewSchema
											"
										>
											<v-jsf
												v-model="col.field.previewModel"
												:schema="
													col.field.previewSchema
												"
												:options="options"
												:key="
													'col_' +
													rowIndex +
													'_' +
													colIndex
												"
											>
												<v-data-table
													v-if="
														col.field.name ==
														$t('label.field_table')
													"
													dense
													:headers="
														search_header(
															rowIndex,
															colIndex,
														)
													"
													:items-per-page="-1"
													class="elevation-1"
												>
													<template
														v-slot:[`item.value`]="{
															item,
														}"
													>
														<v-chip
															:color="
																getColor(item)
															"
															class="ma-2"
															outlined
														>
															<span
																style="
																	font-weight: bold;
																"
																>{{
																	item.value
																}}</span
															>
														</v-chip>
													</template>
												</v-data-table>
											</v-jsf>
										</v-form>
									</Container>
								</v-card>
							</v-col>
							<v-col class="number-col">
								<v-btn
									v-if="toggle[rowIndex]"
									color="primary"
									small
									@click="addCol(rowIndex, 1)"
								>
									1
								</v-btn>
								<v-btn
									v-if="toggle[rowIndex]"
									color="primary"
									small
									@click="addCol(rowIndex, 2)"
								>
									1/2 + 1/2
								</v-btn>
								<v-btn
									v-if="toggle[rowIndex]"
									color="primary"
									small
									@click="addCol(rowIndex, 3)"
								>
									1/3 + 2/3
								</v-btn>
								<v-btn
									v-if="toggle[rowIndex]"
									color="primary"
									small
									@click="addCol(rowIndex, 4)"
								>
									1/3 + 1/3 + 1/3
								</v-btn>
								<v-btn
									v-if="toggle[rowIndex]"
									color="primary"
									small
									@click="addCol(rowIndex, 5)"
								>
									2/3 + 1/3
								</v-btn>
								<v-btn
									small
									class="rounded-0"
									@click="openShowAddCol(rowIndex)"
								>
									<v-icon small
										>mdi-format-align-justify</v-icon
									>
								</v-btn>
							</v-col>
							<v-btn
								class="remove-row"
								fab
								dark
								x-small
								color="error"
								@click="removeRow(rowIndex)"
							>
								<v-icon dark> mdi-close </v-icon>
							</v-btn>
						</v-row>
					</Container>
					<v-row>
						<v-col class="text-center mt-2">
							<v-btn
								fab
								dark
								x-small
								class="mx-2"
								color="primary"
								@click="addRow()"
							>
								<v-icon> mdi-plus-circle </v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="12" md="3" sm="12" outlined>
				<v-card elevation="0">
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									><strong
										>{{
											$t("label.request_group")
										}}:</strong
									>
									<i
										v-if="
											m_requestDto &&
											m_requestDto.requestGroup
										"
										>{{
											m_requestDto.requestGroup
												.requestGroupName
										}}</i
									>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									><strong
										>{{ $t("label.request_type") }}:</strong
									>
									<i
										v-if="
											m_requestDto &&
											m_requestDto.requestType
										"
										>{{
											m_requestDto.requestType
												.requestTypeName
										}}</i
									>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
				<v-card elevation="0" class="p-2 mt-4">
					<v-row>
						<v-col cols="12">
							<v-form
								v-if="selected.field"
								ref="form"
								v-model="valid"
							>
								<v-jsf
									v-model="selected.field.configModel"
									:schema="selected.field.configSchema"
									:options="options"
								/>
							</v-form>
							<v-form
								v-if="
									selected.field &&
									selected.field.name ==
										$t('label.field_table')
								"
								ref="form"
								v-model="valid"
							>
								<h3 class="mb-4">
									{{ $t("label.title_configuration") }}
								</h3>
								<div
									v-for="(item, index) of search_header(
										rowIndex,
										colIndex,
									)"
									:key="index"
								>
									<v-row>
										<v-col cols="8">
											<v-text-field
												v-model="item.text"
												:label="
													$t(
														'label.column_header_name',
													) +
													(index + 1)
												"
												dense
												@keyup="textToValue(item)"
												outlined
												required
											></v-text-field
										></v-col>
										<v-col cols="4">
											<v-combobox
												:label="$t('label.datatypes')"
												v-model="item.type"
												:items="itemsType"
												outlined
												dense
											></v-combobox
										></v-col>
									</v-row>
								</div>
								<div class="d-flex">
									<v-btn
										class="mx-4"
										small
										@click="addHeader(rowIndex, colIndex)"
									>
										{{ $t("label.add_title") }}
									</v-btn>
									<v-btn
										class="mx-4"
										small
										@click="
											removeHeader(rowIndex, colIndex)
										"
									>
										{{ $t("label.remove_title") }}
									</v-btn>
								</div>
							</v-form>
							<!-- <v-btn
								color="blue darken-1"
								dark
								class="m-2 rounded"
								@click="saveRequest()"
							>
								<v-icon> mdi-content-save </v-icon>
								{{ $t("button.save_form") }}
							</v-btn> -->
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import RequestDto from "@/models/request.dto";
import fields from "@/common/fields";
import globalService from "@/services/global.service";
import administratorAPI from "@/views/modules/administrator/administrator.api";
export default {
	name: "EditRequestDetailVue",
	props: {
		requestDto: RequestDto,
	},
	components: {
		Container,
		Draggable,
		VJsf,
		VuePerfectScrollbar,
	},
	watch: {
		requestDto(value) {
			this.m_requestDto = value;
		},
	},
	async created() {
		this.$Progress.start();
	},
	async mounted() {
		await this.$Progress.finish();
		await this.initialize();
		await this.getFormForm();
	},
	data() {
		return {
			valid: null,
			m_requestDto: RequestDto,
			user_current: this.getUserInfo(),
			dateFormat: "DD/MM/yyyy",
			selected: {},
			rowIndex: null,
			colIndex: null,
			col: {},
			modelTarget: {},
			selectedItem: {},
			selected_row: 0,
			selected_col: 0,
			itemid: this.$route.params.id,
			requestTypes: {},
			toggle: [],
			fields: fields,
			desserts: [],
			root: [],
			raw: [],
			truong_quanhe: [],
			form: [
				{
					elements: [
						{
							width: 12,
							field: {},
						},
					],
				},
			],
			response_eForm_Id: null,
			options: {
				fieldProps: {
					outlined: "outlined",
					dense: "dense",
				},
				context: {
					items: ["value 1", "value 2"],
				},
				objectItems: [
					{
						val: "value1",
						label: "Value 1",
					},
					{
						val: "value2",
						label: "Value 2",
					},
				],
			},
			tableSrc: null,
			headers: [],
			header_select: [],
			itemsType: [
				"number",
				"string",
				"combobox",
				"date",
				"radio",
				"checkbox",
			],
			measurementErrors: [],
			displayTableError: [],
		};
	},
	methods: {
		_save() {
			this.$emit("save", {
				eformId: this.response_eForm_Id,
				form_: this.form,
			});
		},
		async initialize() {
			this.m_requestDto = this.requestDto;
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
				this.raw = response.data;
				this.raw = this.raw.map((entry) => {
					return { ...entry, title: entry.name, const: entry.name };
				});
				this.root = response.data
					.filter((entry) => {
						return !entry.parent && !entry.isDelete;
					})
					.map((entry) => {
						return {
							...entry,
							children: [],
							title: entry.name,
							const: entry.name,
						};
					});
				let children = response.data.filter((entry) => {
					return !!entry.parent && !entry.isDelete;
				});

				for (let child of children) {
					let parent = this.findParent(child.parent.id, this.root);
					if (!parent) {
						continue;
					}
					child.children = [];
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
		onDrop(col, rowIndex, colIndex) {
			this.selected = {};
			this.form[this.selected_row].elements[this.selected_col].field =
				Object.assign({}, this.selectedItem);
			this.selected =
				this.form[this.selected_row].elements[this.selected_col];
			this.form[this.selected_row].elements[
				this.selected_col
			].field.name = this.selectedItem.name;

			if (
				col.field.name == this.$t("label.field_table") &&
				rowIndex == this.selected_row &&
				colIndex == this.selected_col
			) {
				let check = 0;
				for (let i = 0; i < this.headers.length; i++) {
					if (
						this.headers[i].isRow == rowIndex &&
						this.headers[i].isCol == colIndex
					) {
						this.headers[i].isHeader = [
							{
								text: "Col 1",
								value: "Col1",
								type: "",
								title: "",
							},
							{
								text: "Col 2",
								value: "Col2",
								type: "",
								title: "",
							},
							{
								text: "Col 3",
								value: "Col3",
								type: "",
								title: "",
							},
							{
								text: "Col 4",
								value: "Col4",
								type: "",
								title: "",
							},
							{
								text: "Col 5",
								value: "Col5",
								type: "",
								title: "",
							},
						];
						check = check + 1;
						break;
					}
				}
				if (check == 0) {
					this.headers.push({
						isRow: rowIndex,
						isCol: colIndex,
						isHeader: [
							{
								text: "Col 1",
								value: "Col1",
								type: "",
								title: "",
							},
							{
								text: "Col 2",
								value: "Col2",
								type: "",
								title: "",
							},
							{
								text: "Col 3",
								value: "Col3",
								type: "",
								title: "",
							},
							{
								text: "Col 4",
								value: "Col4",
								type: "",
								title: "",
							},
							{
								text: "Col 5",
								value: "Col5",
								type: "",
								title: "",
							},
						],
					});
				}
			}
			if (
				rowIndex != this.selected_row ||
				colIndex != this.selected_col
			) {
				this.config(
					this.form[this.selected_row].elements[this.selected_col],
					this.selected_row,
					this.selected_col,
				);
			} else {
				this.config(col, rowIndex, colIndex);
			}
		},
		shouldAcceptDrop() {
			return true;
		},
		addRow() {
			this.selected = {};
			let tmp = {
				elements: [
					{
						width: 12,
						field: {},
					},
				],
			};
			this.toggle.push(false);
			this.form.push(tmp);
		},
		addCol(rowIndex, type) {
			this.selected = {};
			let widths = [];
			switch (type) {
				case 1:
					widths = [12];
					break;
				case 2:
					widths = [6, 6];
					break;
				case 3:
					widths = [4, 8];
					break;
				case 4:
					widths = [4, 4, 4];
					break;
				case 5:
					widths = [8, 4];
					break;
			}

			if (this.form[rowIndex].elements.length < widths.length) {
				for (let i = 0; i < widths.length; i++) {
					if (this.form[rowIndex].elements.length >= i + 1) {
						if (this.form[rowIndex].elements[i].field != {}) {
							this.form[rowIndex].elements[i].width = widths[i];
						}
					} else if (this.form[rowIndex].elements.length < i + 1) {
						this.form[rowIndex].elements.push({
							width: widths[i],
							field: {},
						});
					}
				}
			}
			if (this.form[rowIndex].elements.length > widths.length) {
				this.form[rowIndex].elements = this.form[
					rowIndex
				].elements.slice(0, widths.length);
				for (let i = 0; i < widths.length; i++) {
					this.form[rowIndex].elements[i].width = widths[i];
				}
			}
			if (this.form[rowIndex].elements.length == widths.length) {
				for (let i = 0; i < widths.length; i++) {
					this.form[rowIndex].elements[i].width = widths[i];
				}
			}
			this.toggle[rowIndex] = false;
		},

		removeRow(rowIndex) {
			this.form.splice(rowIndex, 1);
		},
		onDragEnter(rowIndex, colIndex) {
			// this.selected = {};
			this.selected_row = rowIndex;
			this.selected_col = colIndex;
		},
		getChildPayload(index) {
			// this.selected = {};
			this.selectedItem = this.cloneObject({}, this.fields[index]);
		},
		search_header(rowIndex, colIndex) {
			for (const header of this.headers) {
				if (header.isRow == rowIndex && header.isCol == colIndex) {
					return header.isHeader;
				}
			}
		},
		cloneObject(targetObject, sourceObject) {
			if (!sourceObject) return {};
			targetObject = Object.assign({}, sourceObject);
			for (let prop in sourceObject) {
				if (typeof sourceObject[prop] == "object") {
					targetObject[prop] = this.cloneObject(
						targetObject[prop],
						sourceObject[prop],
					);
				}
			}
			return targetObject;
		},
		openShowAddCol(rowIndex) {
			this.toggle.push(false);
			this.toggle[rowIndex] = !this.toggle[rowIndex];
		},
		config(col, rowIndex, colIndex) {
			this.selected = {};
			this.col = col;
			this.rowIndex = rowIndex;
			this.colIndex = colIndex;
			for (const form_row of this.form) {
				for (const form_col of form_row.elements) {
					if (
						form_col.field.previewSchema &&
						form_col.field.previewSchema.properties.title.title
					) {
						this.truong_quanhe.push({
							const: form_col.field.previewSchema.properties.title
								.title,
							title: form_col.field.previewSchema.properties.title
								.title,
						});
					}
				}
			}

			this.selected = col;
			if (!this.selected.field.configModel.id) {
				this.selected.field.configModel.id = this.getIdFromValue(
					col.field.previewSchema.properties.title.title,
				);
			}
			if (!this.selected.field.configModel.title) {
				this.selected.field.configModel.title =
					col.field.previewSchema.properties.title.title;
			}
			if (
				col.field.name == this.$t("label.field_autotext") ||
				col.field.name == this.$t("label.field_combobox")
			) {
				this.selected.field.configSchema.properties.category.oneOf =
					this.root;
				this.selected.field.configSchema.properties.filter.oneOf =
					this.truong_quanhe;
			}
			if (col.field.name == this.$t("label.field_file")) {
				this.selected.field.configSchema.properties.upload_ext.items.examples =
					[
						".doc",
						".docm",
						".docx",
						".docb",
						".dot",
						".dotm",
						".dotx",
						".wbk",
						".csv",
						".odt",
						".pdf",
						".rtf",
						".txt",
						".wps",
						".xml",
						".xps",
						".xls",
						".xlsx",
						".pps",
						".ppsx",
						".ppt",
						".pptm",
						".pptx",
						".xls",
					];
			}
			// this.search_header(rowIndex, colIndex);
		},
		saveItemForm() {
			if (this.selected.field) {
				for (let key of Object.keys(this.selected.field.configModel)) {
					if (
						this.selected.field.configModel[key] != null &&
						this.selected.field.configModel[key] != "" &&
						this.selected.field.configModel[key] != undefined &&
						typeof this.selected.field.configModel[key] == "string"
					) {
						this.selected.field.configModel[key] =
							this.selected.field.configModel[key].trim();
					}
				}
				this.form[this.rowIndex].elements[
					this.colIndex
				].field.configSchema = this.selected.field.configSchema;
				this.form[this.rowIndex].elements[
					this.colIndex
				].field.previewSchema.properties.title.title =
					this.selected.field.configModel.title;

				if (
					this.form[this.rowIndex].elements[this.colIndex].field
						.name == this.$t("label.field_autotext") ||
					this.form[this.rowIndex].elements[this.colIndex].field
						.name == this.$t("label.field_combobox")
				) {
					this.form[this.rowIndex].elements[
						this.colIndex
					].field.configSchema.properties.category.oneOf = this.root;
					this.form[this.rowIndex].elements[
						this.colIndex
					].field.configSchema.properties.filter.oneOf = this.raw;
				}
			}

			for (const form_row of this.form) {
				for (const form_col of form_row.elements) {
					form_col.field.previewSchema.properties.title.title =
						form_col.field.configModel.title;
				}
			}
			for (const form_row of this.form) {
				for (const form_col of form_row.elements) {
					if (form_col.field.name == this.$t("label.field_table")) {
						for (let i = 0; i < this.headers.length; i++) {
							if (
								this.headers[i].isRow ==
									this.form.indexOf(form_row) &&
								this.headers[i].isCol ==
									form_row.elements.indexOf(form_col)
							) {
								form_col.field.configSchema.properties.Headers =
									JSON.stringify(this.headers[i].isHeader);
							}
						}
					}
				}
			}
		},
		async saveEForm() {
			if (this.selected.field) {
				if (!this.$refs.form.validate()) {
					return this.toastError(
						this.$t("message.information_fasle"),
					);
				}
			}
			await this.saveItemForm();
			let listFieldTemp = [];
			let eForm = {
				id: null,
				created: { id: this.user_current.id },
				createdDate: new Date(),
				createdName: this.user_current.name,
				description: "",
				eFormCode: "",
				eFormName: "",
				fields: [],
				isActive: true,
				isDelete: true,
				modified: { id: 1 },
				modifiedDate: new Date(),
				modifiedName: this.user_current.name,
				objectModel: "",
				objectSchema: JSON.stringify(this.form),
				option: "",
				tennantCode: "",
				tennantName: "",
			};
			let response_eForm = await globalService.postData_Async(
				`/api/forms`,
				eForm,
			);
			this.response_eForm_Id = response_eForm.data.id;

			if (response_eForm.state) {
				let stt = 1;
				for (let row in this.form) {
					if (Array.isArray(this.form[row].elements)) {
						for (let col in this.form[row].elements) {
							let schema =
								this.form[row].elements[col].field.previewSchema
									.properties;
							if (!schema) schema = {};
							let fieldInEForm = {
								id: null,
								fieldInEFormCode: "",
								fieldInEFormName: "",
								objectSchema: JSON.stringify({
									"x-cols":
										this.form[row].elements[col].width,
									...this.cloneObject({}, schema),
								}),
								objectModel: JSON.stringify({}),
								option: JSON.stringify({}),
								description: "nv",
								nameOfField: schema.title.title,
								fieldPattern: null,
								required: null,
								order: stt,
								createdName: this.user_current.name,
								createdDate: new Date(),
								modifiedName: this.user_current.name,
								modifiedDate: new Date(),
								row: row,
								col: col,
								tennantCode: "",
								tennantName: "",
								created: {
									id: this.user_current.id,
								},
								modified: {
									id: this.user_current.id,
								},
								form: {
									id: response_eForm.data.id,
								},
							};
							listFieldTemp.push(fieldInEForm);
							stt++;
							let response_fields =
								await globalService.postData_Async(
									`/api/field-in-forms`,
									fieldInEForm,
								);
							if (!response_fields) return;
						}
					}
				}
				this._save();
			} else {
				this.toastError(this.$t("message.update_error"));
			}
			return response_eForm.data.id;
		},

		async getFormForm() {
			if (!this.m_requestDto.form || !this.m_requestDto.form.id) return;
			let response_All_Fields = await globalService.getData_Async(
				`/api/forms/${this.m_requestDto.form.id}`,
			);
			this.form = JSON.parse(response_All_Fields.data.objectSchema);
			for (const form_row of this.form) {
				for (const form_col of form_row.elements) {
					if (form_col.field.name == this.$t("label.field_table")) {
						this.headers.push({
							isRow: this.form.indexOf(form_row),
							isCol: form_row.elements.indexOf(form_col),
							isHeader: JSON.parse(
								form_col.field.configSchema.properties.Headers,
							),
						});
					}
				}
			}
		},

		getColor(tableRecord) {
			if (
				tableRecord.value > tableRecord.max ||
				tableRecord.value < tableRecord.min
			) {
				return "red";
			} else {
				return "#81c784";
			}
		},
		shorten(inText, maxLength = 200) {
			if (inText.length > maxLength) {
				return inText.substring(0, maxLength) + "...";
			} else {
				return inText;
			}
		},
		async saveRequest() {
			await this.saveEForm();
			this.m_requestDto.form = {
				id: null,
			};
			this.m_requestDto.form.id = this.response_eForm_Id;
			let response_quest = await globalService.putData_Async(
				"/api/requests/" + this.m_requestDto.id,
				this.m_requestDto,
			);
			if (response_quest.state) {
				this.toastSuccess(this.$t("message.update_success"));
			} else {
				this.toastError(this.$t("message.error"));
			}
		},
		addHeader(rowIndex, colIndex) {
			rowIndex = this.rowIndex;
			colIndex = this.colIndex;
			for (let i = 0; i < this.headers.length; i++) {
				if (
					this.headers[i].isRow == rowIndex &&
					this.headers[i].isCol == colIndex
				) {
					this.headers[i].isHeader.push({
						text: "new col",
						value: "newcol",
						type: "string",
						title: "",
					});
				}
			}
		},
		removeHeader(rowIndex, colIndex) {
			rowIndex = this.rowIndex;
			colIndex = this.colIndex;
			for (let i = 0; i < this.headers.length; i++) {
				if (
					this.headers[i].isRow == rowIndex &&
					this.headers[i].isCol == colIndex
				) {
					this.headers[i].isHeader.pop();
				}
			}
		},
		getClass(rowIndex, colIndex) {
			return this.rowIndex == rowIndex && this.colIndex == colIndex
				? "grey lighten-2"
				: "white";
		},
		textToValue(item) {
			item.value = this.nonAccentVietnamese(item.text).replaceAll(
				/\W/gi,
				"",
			);
		},
	},
};
</script>
<style>
.scroll-area {
	position: relative;
	margin: auto;
	height: 80vh;
	padding: 0.5em;
}
.form-row {
	position: relative;
}
.remove-row {
	display: none;
	position: absolute;
	top: 0;
	left: 0;
}
.number-col {
	display: none;
	justify-content: end;
	gap: 4px;
	align-items: flex-start;
	position: absolute;
	top: 0;
	right: 0;
	padding: 0;
}
.form-row:hover .number-col {
	display: flex;
}
.form-row:hover .remove-row {
	display: flex;
}
.v-menu__content {
	position: absolute;
	display: inline-block;
	max-width: 7vw;
	right: 1%;
	overflow-y: auto;
	overflow-x: hidden;
	contain: content;
	box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
		0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
	border-radius: 4px;
}
.v-select-list,
.v-list {
	max-width: 30vw !important;
}
</style>
