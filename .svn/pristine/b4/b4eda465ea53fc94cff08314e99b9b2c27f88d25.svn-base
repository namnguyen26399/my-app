<template>
	<v-card elevation="0">
		<v-row>
			<v-col cols="8" md="8" sm="12" outlined>
				<v-row
					v-for="(row, rowIndex) in form"
					:key="'row_' + rowIndex"
					class="form-row"
				>
					<v-col
						v-for="(col, colIndex) in row.elements"
						:key="'col_' + rowIndex + '_' + colIndex"
						:cols="col.width"
						@click="config(col, rowIndex, colIndex)"
					>
						<v-card
							elevation="0"
							class="m-1 p-2 rounded bordered-dotted"
							outlined
							color="grey lighten-3"
						>
							<v-form v-if="col.field && col.field.previewSchema">
								<v-jsf
									v-model="col.field.previewModel"
									:schema="col.field.previewSchema"
									:options="options"
									:key="'col_' + rowIndex + '_' + colIndex"
								>
									<!-- <v-data-table
										v-if="col.field.name == 'Trường bảng'"
										dense
										:headers="headers"
										:items="tableContents"
										:items-per-page="-1"
										class="elevation-1"
									>
										<template
											v-slot:[`item.value`]="{ item }"
											>s
											<v-chip class="ma-2" outlined>
												<span
													style="font-weight: bold"
													>{{ item.value }}</span
												>
											</v-chip>
										</template>
									</v-data-table> -->
								</v-jsf>
							</v-form>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="4" md="4" sm="12" outlined>
				<v-card elevation="0">
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									v-if="
										m_requestDto.requestGroup &&
										m_requestDto.requestGroup
											.requestGroupName
									"
									><strong
										>{{
											$t("label.request_group")
										}}:</strong
									>
									<i>{{
										m_requestDto.requestGroup
											.requestGroupName
									}}</i>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									v-if="
										m_requestDto.requestType &&
										m_requestDto.requestType.requestTypeName
									"
									><strong
										>{{ $t("label.request_type") }}:</strong
									>
									<i>{{
										m_requestDto.requestType.requestTypeName
									}}</i>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
				<!-- <v-card elevation="0" class="p-2 mt-4">
					<v-row>
						<v-col cols="12">
							<v-form v-if="selected.field">
								<v-jsf
									v-model="selected.field.configModel"
									:schema="selected.field.configSchema"
									:options="options"
								/>
							</v-form>
						</v-col>
					</v-row>
				</v-card> -->
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import RequestDto from "@/models/request.dto";

export default {
	name: "ViewRequestVue",
	components: {},
	data() {
		return {
			requestId: this.$route.params.id,
			m_requestDto: RequestDto,
			m_requestDto_id: null,
			form: [],
			selected: [],
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
		};
	},
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
		this.init();
	},
	methods: {
		async init() {
			await this.getRequest();
			await this.getFormForm();
		},
		async getRequest() {
			let response = await globalService.getData_Async(
				`/api/requests/${this.requestId}`,
			);
			this.m_requestDto = response.data;
			this.m_requestDto_id = response.data.form.id;
			console.log("response.data.id", response.data.id);
		},
		async getFormForm() {
			let response_All_Fields = await globalService.getData_Async(
				`/api/forms/${this.m_requestDto_id}`,
			);
			this.form = JSON.parse(response_All_Fields.data.objectSchema);
			console.log(this.form);
		},
		config(col, rowIndex, colIndex) {
			console.log(col);
			console.log(rowIndex);
			console.log(colIndex);
		},
	},
};
</script>

<style></style>
