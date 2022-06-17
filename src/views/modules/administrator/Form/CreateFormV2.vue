<template>
	<v-card elevation="0">
		<v-row>
			<v-col cols="12">
				<h2>{{ $t("title.ticket_details") }}</h2>
				<v-breadcrumbs :items="breadcrumbs">
					<template v-slot:divider>
						<v-icon>mdi-chevron-right</v-icon>
					</template>
				</v-breadcrumbs>
			</v-col>
		</v-row>
		<v-row class="m-0">
			<v-col cols="6" sm="6" class="py-2 p-0">
				<v-tabs background-color="transparent" grow v-model="tab">
					<v-tab :key="'thong_tin_chung'">
						{{ $t("tab.general_information") }}
					</v-tab>
					<v-tab :key="'to_khai'">
						{{ $t("tab.declare") }}
					</v-tab>
					<v-tab>
						{{ $t("tab.document") }}
					</v-tab>
					<v-tab>
						{{ $t("tab.process_") }}
					</v-tab>
				</v-tabs>
			</v-col>
			<v-col cols="6" class="d-flex justify-end p-0">
				<v-btn color="error" class="m-2">
					<v-icon>mdi-close </v-icon>{{ $t("button.cancel") }}
				</v-btn>
				<v-btn color="primary" class="m-2" @click="saveEForm()">{{
					$t("button.save")
				}}</v-btn>
				<v-btn color="secondary" class="m-2">{{
					$t("button.public")
				}}</v-btn>
			</v-col>
		</v-row>
		<v-tabs-items v-model="tab">
			<v-tab-item :key="thong_tin_chung">
				<v-card class="mb-2 p-2" elevation="0">
					<v-row>
						<!-- <v-col cols="12">
										<v-text-field
											v-model="requestTypes.requestGroup"
											:label="
												this.$t('label.request_group')
											"
										></v-text-field>
									</v-col> -->
						<v-col cols="12">
							<v-combobox
								v-model="requestTypes.requestGroupName"
								:items="listRequestGroup"
								label="Nhóm yêu cầu"
								outlined
								:item-text="(item) => item.requestGroupName"
							></v-combobox>
						</v-col>

						<!-- <v-col cols="12">
										<v-text-field
											v-model="requestTypes.requestType"
											:label="this.$t('label.type_group')"
											required="true"
										></v-text-field>
									</v-col> -->
						<v-col cols="12">
							<v-combobox
								v-model="requestTypes.requestTypeName"
								:items="listRequestType"
								label="Loại yêu cầu"
								outlined
								:item-text="(item) => item.requestTypeName"
							>
							</v-combobox>
						</v-col>

						<!-- <v-col cols="12">
										<v-text-field
											v-model="requestTypes.description"
											:label="
												this.$t(
													'label.request_ticket_name',
												)
											"
											outlined
										></v-text-field>
									</v-col> -->
						<!-- <v-col cols="12">
										<v-text-field
											v-model="requestTypes.createdName"
											:label="
												this.$t('label.created_name')
											"
										></v-text-field>
									</v-col> -->
						<!-- <v-col cols="12">
										<v-text-field
											v-if="
												requestTypes.modifiedName
													? true
													: false
											"
											v-model="requestTypes.modifiedName"
											:label="
												this.$t('label.modified_name')
											"
											outlined
										></v-text-field>
									</v-col> -->
						<v-col cols="12">
							<v-text-field
								v-if="requestTypes.modifiedDate ? true : false"
								v-model="requestTypes.modifiedDate"
								:label="this.$t('label.last_time_to_fix')"
								outlined
							></v-text-field>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
			<v-tab-item :key="'to_khai'">
				<v-card class="p-2 m-0">
					<v-row class="mt-0">
						<v-col cols="2" outlined>
							<v-card outlined>
								<VuePerfectScrollbar class="scroll-area">
									<Container
										:get-child-payload="getChildPayload"
										class=""
									>
										<Draggable
											v-for="(item, index) in fields"
											:key="'field_' + index"
											:data-index="index"
											class="mb-2"
										>
											<v-form>
												<v-jsf
													aria-disabled="true"
													v-model="item.model"
													:schema="item.schemaPreview"
												/>
											</v-form>
										</Draggable>
									</Container>
								</VuePerfectScrollbar>
							</v-card>
						</v-col>
						<!-- <v-divider vertical></v-divider> -->
						<v-col cols="7" outlined>
							<v-row
								v-for="(row, rowIndex) in form"
								:key="'row_' + rowIndex"
								class="form-row p-0 my-2"
							>
								<v-col
									v-for="(col, colIndex) in row.elements"
									:key="'col_' + rowIndex + '_' + colIndex"
									:cols="col.width"
									@click="targetItem(col, rowIndex, colIndex)"
									class="p-0 h-100"
								>
									<v-card
										class="p-2 rounded"
										min-height="3em"
										outlined
									>
										<Container
											@drag-enter="
												onDragEnter(rowIndex, colIndex)
											"
											:should-accept-drop="
												shouldAcceptDrop
											"
											drag-class="card-ghost"
											drop-class="card-ghost-drop"
											@drop="onDrop"
										>
											<v-form>
												<v-jsf
													v-model="col.modelPreview"
													:schema="col.schema"
													:key="
														'col_' +
														rowIndex +
														'_' +
														colIndex
													"
												/> </v-form
										></Container>
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
										v-if="row.elements.length == 1"
										@click="openShowAddCol(rowIndex)"
									>
										<v-icon small
											>mdi-format-align-justify</v-icon
										>
									</v-btn>
									<v-btn
										small
										class="rounded-0"
										v-if="row.elements.length == 2"
										@click="openShowAddCol(rowIndex)"
									>
										<v-icon small
											>mdi-format-align-justify</v-icon
										>
										<v-icon small
											>mdi-format-align-justify</v-icon
										>
									</v-btn>
									<v-btn
										small
										class="rounded-0"
										v-if="row.elements.length == 3"
										@click="openShowAddCol(rowIndex)"
									>
										<v-icon small
											>mdi-format-align-justify</v-icon
										>
										<v-icon small
											>mdi-format-align-justify</v-icon
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
						</v-col>
						<!-- <v-divider vertical></v-divider> -->
						<v-col cols="3" outlined>
							<v-card>
								<v-row>
									<v-col cols="12">
										<v-form>
											<v-jsf
												v-model="modelTarget"
												:schema="selected"
											/>
										</v-form>
										<v-btn
											color="blue"
											dark
											class="m-2"
											@click="saveItemForm()"
											>Cập nhật</v-btn
										>
									</v-col>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import VJsf from "@koumoul/vjsf/lib/VJsf";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import globalService from "@/services/global.service";
import moment from "moment";
export default {
	name: "CreatrequestTypesV2Vue",
	components: {
		Container,
		Draggable,
		VJsf,
		VuePerfectScrollbar,
	},
	async created() {
		this.$Progress.start();
		await this.getAllField();
		await this.getListRequestGroup();
		await this.getListRequsetType();
	},
	mounted() {
		this.$Progress.finish();
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			dateFormat: "DD/MM/yyyy",
			listRequestGroup: [],
			listRequestType: [],
			selected: {},
			tab: null,
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
			breadcrumbs: [
				{
					text: "Home",
					disabled: false,
					href: "/",
				},
				{
					text: "Form",
					disabled: false,
					href: "/list-form",
				},
				{
					text: "Create",
					disabled: true,
					href: "/list-form/create-v2",
				},
			],
			fields: [
				{
					// id: 1,
					name: "Text",
					model: {},
					modelPreview: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Text"),
								is_required: false,
								default: "",
								description: "",
								"x-class": "fill-height",
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Text"),
								is_required: false,
								default: "",
								description: "",
								"x-class": "fill-height",
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
						},
					},
				},
				{
					// id: 2,
					name: "textarea",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Textarea"),
								"x-display": "textarea",
								default: "",
								description: "",
								is_required: false,
								"x-class": "fill-height",
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Textarea"),
								"x-display": "textarea",
								default: "",
								description: "",
								is_required: false,
								"x-class": "fill-height",
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
						},
					},
				},
				{
					// id: 3,
					name: "integer",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "integer",
								title: this.$t("Integer"),
								default: "",
								description: "",
								is_required: false,
								minimum: 0,
								maximum: 5,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "integer",
								title: this.$t("Integer"),
								default: "",
								description: "",
								is_required: false,
								minimum: 0,
								maximum: 5,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
							maximum: {
								type: "integer",
								title: "Giá trị lớn nhất",
							},
							minimum: {
								type: "integer",
								title: "Giá trị nhỏ nhất",
							},
						},
					},
				},
				{
					// id: 4,
					name: "number",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "Combobox",
								default: "Comobox",
								is_required: false,
								examples: [
									"I'm a suggested value",
									"I'm another suggestion",
								],
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "I'm a string with some examples",
								default: "I'm a default value",
								is_required: false,
								examples: [
									"I'm a suggested value",
									"I'm another suggestion",
								],
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
							examples: [
								"I'm a suggested value",
								"I'm another suggestion",
							],
						},
					},
				},
				{
					// id: 5,
					name: "Kiểu số nguyên dạng slider",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "integer",
								title: this.$t("type.integer"),
								"x-display": "slider",
								minimum: 0,
								maximum: 5,
								default: "",
								description: "",
								is_required: false,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "integer",
								title: this.$t("type.integer"),
								"x-display": "slider",
								minimum: 0,
								maximum: 5,
								default: "",
								description: "",
								is_required: false,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
							maximum: {
								type: "integer",
								title: "Giá trị lớn nhất",
							},
							minimum: {
								type: "integer",
								title: "Giá trị nhỏ nhất",
							},
						},
					},
				},
				{
					// id: 6,
					name: "Kiểu true false",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "boolean",
								title: "Check box",
								description:
									"This description is used as a help message.",
								default: "",
								is_required: false,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "boolean",
								title: "I'm a boolean",
								description:
									"This description is used as a help message.",
								default: "",
								is_required: false,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
						},
					},
				},
				{
					// id: 7,
					name: "sdt",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Số điện thoại"),
								is_required: false,
								default: "",
								description: "",
								"x-class": "fill-height",
								pattern: "",
								"x-options": {
									messages: {
										pattern:
											"Vui lòng nhập đúng định dạng số điện thoại",
									},
								},
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Số điện thoại"),
								is_required: false,
								default: "",
								description: "",
								"x-class": "fill-height",
								pattern: "",
								"x-options": {
									messages: {
										pattern:
											"Vui lòng nhập đúng định dạng số điện thoại",
									},
								},
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
							pattern: {
								type: "string",
								title: "Nhập định dạng cho phép",
							},
						},
					},
				},
				{
					// id: 8,
					name: "Email",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Email"),
								is_required: false,
								default: "",
								description: "",
								"x-class": "fill-height",
								pattern: "",
								"x-options": {
									messages: {
										pattern:
											"Vui lòng nhập đúng định dạng email",
									},
								},
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: this.$t("Email"),
								is_required: false,
								default: "",
								description: "",
								"x-class": "fill-height",
								pattern: "",
								"x-options": {
									messages: {
										pattern:
											"Vui lòng nhập đúng định dạng email",
									},
								},
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
							pattern: {
								type: "string",
								title: "Nhập định dạng cho phép",
							},
						},
					},
				},
				{
					// id: 9,
					name: "Dạng array số",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "array",
								title: "I'm an array of integers",
								items: {
									type: "integer",
								},
								default: "",
								description: "",
								is_required: false,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "array",
								title: "I'm an array of integers",
								items: {
									type: "integer",
								},
								default: "",
								description: "",
								is_required: false,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
						},
					},
				},
				{
					// id: 10,
					name: "Dạng date",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "Chọn ngày tháng năm",
								format: "date",
								default: "",
								description:
									"This description is used as a help message.",
								is_required: false,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "I'm a simple date",
								format: "date",
								default: "",
								description:
									"This description is used as a help message.",
								is_required: false,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
						},
					},
				},
				{
					// id: 11,
					name: "Dạng time",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "I'm a simple time of day",
								format: "time",
								default: "",
								description: "",
								is_required: false,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "I'm a simple time of day",
								format: "time",
								default: "",
								description: "",
								is_required: false,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
						},
					},
				},
				{
					// id: 12,
					name: "Dạng date time",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "I'm a PNG image stored as a base64 string",
								contentMediaType: "image/png",
								writeOnly: true,
								is_required: false,
								description: "",
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "I'm a PNG image stored as a base64 string",
								contentMediaType: "image/png",
								writeOnly: true,
								is_required: false,
								description: "",
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							writeOnly: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
						},
					},
				},
				{
					// id: 13,
					name: "Dạng combobox",
					model: {},
					schemaPreview: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "Chọn giá trị",
								description:
									"This description is used as a help message.",
								enum: ["Giá trị 1", "Giá trị 2"],
								"x-display": "radio",
								is_required: false,
							},
						},
					},
					schema: {
						type: "object",
						properties: {
							Prop: {
								type: "string",
								title: "Chọn giá trị",
								description:
									"This description is used as a help message.",
								enum: ["Giá trị 1", "Giá trị 2"],
								"x-display": "radio",
								is_required: false,
							},
						},
					},
					schemaForm: {
						type: "object",
						properties: {
							title: {
								type: "string",
								title: this.$t("label.field_name"),
							},
							description: {
								type: "string",
								title: this.$t("label.description"),
								"x-display": "textarea",
							},
							is_required: {
								type: "boolean",
								title: this.$t("label.is_required"),
							},
							default: {
								type: "string",
								title: this.$t("label.default_value"),
							},
							enum: {
								type: "string",
								title: this.$t("label.default_value"),
							},
						},
					},
				},
			],
			form: [
				{
					elements: [
						{
							width: 12,
							model: {},
							schema: {
								type: "object",
								properties: {
									Prop: {},
								},
							},
						},
					],
				},
			],
		};
	},
	methods: {
		onDrop() {
			this.form[this.selected_row].elements[this.selected_col].model =
				Object.assign({}, this.selectedItem.model);
			this.form[this.selected_row].elements[this.selected_col].schema =
				Object.assign({}, this.selectedItem.schema);
			this.form[this.selected_row].elements[
				this.selected_col
			].schemaForm = Object.assign({}, this.selectedItem.schemaForm);
		},
		shouldAcceptDrop() {
			return true;
		},
		addRow() {
			let tmp = {
				elements: [
					{
						width: 12,
						model: {},
						schema: {},
					},
				],
			};
			this.toggle.push(false);
			this.form.push(tmp);
		},
		addCol(rowIndex, type) {
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
						if (this.form[rowIndex].elements[i].schema != {}) {
							this.form[rowIndex].elements[i].width = widths[i];
						}
					} else if (this.form[rowIndex].elements.length < i + 1) {
						this.form[rowIndex].elements.push({
							width: widths[i],
							model: {},
							schema: {},
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
			this.selected_row = rowIndex;
			this.selected_col = colIndex;
		},
		getChildPayload(index) {
			this.selectedItem = this.cloneObject({}, this.fields[index]);
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
		targetItem(col, rowIndex, colIndex) {
			this.modelTarget = {};
			this.selected = Object.assign({}, col.schemaForm);
			this.col = col;
			this.rowIndex = rowIndex;
			this.colIndex = colIndex;
			this.modelTarget = Object.assign({}, col.model);
		},
		saveItemForm() {
			this.form[this.rowIndex].elements[this.colIndex].model =
				Object.assign({}, this.modelTarget);
			for (let key in this.modelTarget) {
				this.form[this.rowIndex].elements[
					this.colIndex
				].schema.properties.Prop[key] = this.modelTarget[key];
			}
		},
		async saveEForm() {
			console.log(10);
			if (this.itemid) {
				let listFieldTemp = [];
				let eForm = {
					created: { id: 1 },
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
					objectSchema: "",
					option: "",
					tennantCode: "",
					tennantName: "",
				};
				let response_eForm = await globalService.postData_Async(
					`/api/e-forms`,
					eForm,
				);
				console.log("response_eForm", response_eForm);
				if (response_eForm.state) {
					let stt = 1;
					for (let row in this.form) {
						if (Array.isArray(this.form[row].elements)) {
							for (let col in this.form[row].elements) {
								let schema =
									this.form[row].elements[col].schema
										.properties.Prop;
								if (!schema) schema = {};
								let fieldInEForm = {
									created: {
										id: this.user_current.id,
									},
									createdDate: new Date(),
									createdName: this.user_current.name,
									description: schema.description,
									eForm: {
										id: response_eForm.data.id,
									},
									field: {
										id: null,
									},
									fieldInEFormCode: "CODE",
									fieldInEFormName: "NAME",
									fieldPattern: null,
									id: null,
									modified: {
										id: 0,
									},
									modifiedDate: new Date(),
									modifiedName: this.user_current.name,
									nameOfField: schema.title,
									objectModel: {},
									objectSchema: {
										"x-cols":
											this.form[row].elements[col].width,
										...this.cloneObject({}, schema),
									},
									option: {},
									required: null,
									tennantCode: "",
									tennantName: "",
									order: stt,
								};
								// console.log("fieldInEForm: ", fieldInEForm);
								listFieldTemp.push(fieldInEForm);
								stt++;
								let response_fields =
									await globalService.postData_Async(
										`/api/field-in-e-forms`,
										eForm,
									);
								console.log(response_fields);
							}
						}
					}
					this.handlerView(listFieldTemp);
				}
				this.requestTypes.eForm.id = response_eForm.data.id;
				this.requestTypes.modifiedDate = new Date();
				this.requestTypes.modifiedName = this.user_current.name;
				let response_quest_type = await globalService.putData_Async(
					`/api/requests/${this.itemid}`,
					this.requestTypes,
				);
				console.log(response_quest_type);
			} else {
				let listFieldTemp = [];
				let eForm = {
					created: { id: this.user_current.id },
					createdDate: new Date(),
					createdName: this.user_current.name,
					description: "",
					eFormCode: "",
					eFormName: "",
					fields: [],
					isActive: true,
					isDelete: true,
					modified: { id: this.user_current.id },
					modifiedDate: new Date(),
					modifiedName: this.user_current.name,
					objectModel: "",
					objectSchema: "",
					option: "",
					tennantCode: "",
					tennantName: "",
				};
				let response_eForm = await globalService.postData_Async(
					`/api/e-forms`,
					eForm,
				);
				console.log("response", response_eForm.data);
				if (response_eForm.state) {
					let stt = 1;
					for (let row in this.form) {
						if (Array.isArray(this.form[row].elements)) {
							for (let col in this.form[row].elements) {
								let schema =
									this.form[row].elements[col].schema
										.properties.Prop;
								if (!schema) schema = {};
								let fieldInEForm = {
									created: {
										id: this.user_current.id,
									},
									createdDate: new Date(),
									createdName: this.user_current.name,
									description: schema.description,
									eForm: {
										id: response_eForm.data.id,
									},
									field: {
										id: null,
									},
									fieldInEFormCode: "CODE",
									fieldInEFormName: "NAME",
									fieldPattern: null,
									id: null,
									modified: {
										id: 0,
									},
									modifiedDate: new Date(),
									modifiedName: this.user_current.name,
									nameOfField: schema.title,
									objectModel: {},
									objectSchema: {
										"x-cols":
											this.form[row].elements[col].width,
										...this.cloneObject({}, schema),
									},
									option: {},
									required: null,
									tennantCode: "",
									tennantName: "",
									order: stt,
								};
								// console.log("fieldInEForm: ", fieldInEForm);
								listFieldTemp.push(fieldInEForm);
								stt++;
								let response_fields =
									await globalService.postData_Async(
										`/api/field-in-e-forms`,
										eForm,
									);
								console.log(response_fields);
							}
						}
					}
					this.handlerView(listFieldTemp);
				}
				this.requestTypes.eForm.id = response_eForm.data.id;
				this.requestTypes.modifiedDate = new Date();
				this.requestTypes.modifiedName = this.user_current.name;
				let response_quest_type = await globalService.postData_Async(
					"/api/requests",
					this.requestTypes,
				);
				console.log(response_quest_type);
			}
		},
		handlerView(listField = []) {
			listField = listField.sort((e1, e2) => e1.order - e2.order);
			console.log("listField: ", listField);
			let properties = {};
			let model = {};
			for (let field of listField) {
				console.log("field: ", field);
				let objectSchema = this.cloneObject({}, field.objectSchema);
				if (objectSchema["x-class"])
					objectSchema["x-class"] = objectSchema["x-class"] + " pl-4";
				else objectSchema["x-class"] = "pl-4";
				properties[field.order + "Prop"] = objectSchema;
				model[field.order + "Prop"] = objectSchema.default
					? objectSchema.default
					: undefined;
				console.log("properties: ", properties);
			}

			let schema = {
				type: "object",
				properties: properties,
			};
			console.log("final Schema: ", schema);
			console.log("final Model: ", model);
		},
		async getAllField() {
			if (!this.itemid) {
				this.requestTypes = {
					id: null,
					requestCode: "",
					requestName: "",
					directoryPath: "",
					description: "",
					createdName: "",
					createdDate: null,
					modifiedName: "",
					modifiedDate: null,
					isActive: false,
					isDelete: false,
					numberRequestData: null,
					tennantCode: "",
					tennantName: "",
					requestType: null,
					requestGroup: null,
					eForm: {
						id: null,
					},
					processInfo: null,
					created: null,
					modified: null,
				};
			} else {
				let requestTypesData = await globalService.getData_Async(
					"/api/requests/" + this.itemid,
				);
				if (!requestTypesData.state) {
					this.requestTypes = {
						id: null,
						requestCode: "",
						requestName: "",
						directoryPath: "",
						description: "",
						createdName: "",
						createdDate: new Date(),
						modifiedName: "",
						modifiedDate: new Date(),
						isActive: false,
						isDelete: false,
						numberRequestData: null,
						tennantCode: "",
						tennantName: "",
						requestType: null,
						requestGroup: null,
						eForm: { id: null },
						processInfo: null,
						created: null,
						modified: null,
					};
				} else {
					this.requestTypes = {
						id: requestTypesData.data.id,
						requestCode: requestTypesData.data.requestCode,
						requestName: requestTypesData.data.requestName,
						directoryPath: requestTypesData.data.directoryPath,
						description: requestTypesData.data.description,
						createdName: requestTypesData.data.createdName,
						createdDate: requestTypesData.data.createdDate,
						modifiedName: requestTypesData.data.modifiedName,
						modifiedDate: requestTypesData.data.modifiedDate,
						isActive: requestTypesData.data.isActive,
						isDelete: requestTypesData.data.isDelete,
						numberRequestData:
							requestTypesData.data.numberRequestData,
						tennantCode: requestTypesData.data.tennantCode,
						tennantName: requestTypesData.data.tennantName,
						requestType: requestTypesData.data.requestType,
						requestGroup: requestTypesData.data.requestGroup,
						eForm: { id: null },
						processInfo: requestTypesData.data.processInfo,
						created: requestTypesData.data.created,
						modified: requestTypesData.data.modified,
					};
					this.requestTypes.modifiedDate = moment(
						this.requestTypes.modifiedDate,
					).format(this.dateFormat);
				}
			}
		},
		openShowAddCol(rowIndex) {
			this.toggle.push(false);
			// this.toggle[rowIndex] = false;
			this.toggle[rowIndex] = !this.toggle[rowIndex];
		},
		async getListRequestGroup() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/request-groups",
				);
				if (!response || !response.state) {
					return;
				}
				this.listRequestGroup = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
		async getListRequsetType() {
			try {
				let response = await globalService.getData_Async(
					"/api/_all/request-types",
				);
				if (!response || !response.state) {
					return;
				}
				this.listRequestType = response.data;
			} catch (error) {
				console.log("Error", error);
			}
		},
	},
};
</script>
<style scoped>
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
</style>
