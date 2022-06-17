<template>
	<v-card elevation="0" ref="form" color="primary">
		<v-toolbar dark color="primary">
			<v-toolbar-title> Yêu cầu soát xét </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon dark @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="white">
			<v-container>
				<v-form v-model="valid">
					<v-row>
						<v-col cols="12" sm="12" md="12">
							<v-textarea label="Ý kiến/Ghi chú" dense outlined>
							</v-textarea>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<div
								v-for="(steep, index1) of requestStepDataList"
								:key="index1"
							>
								<div class="d-flex" v-if="steep.isActive">
									<h3 class="mt-2">Người xử lý :</h3>

									<span
										v-for="(
											item, indexitem1
										) of steep.userInStep"
										:key="indexitem1"
									>
										<v-chip class="mt-2" close>
											<v-avatar
												color="indigo mr-2"
												size="30"
											>
												<span
													class="white--tex"
													v-if="!item.avatar"
												>
													{{
														getAvatarText(
															item.fullName,
															2,
														)
													}}
												</span>
												<v-img
													v-if="item.avatar"
													:src="item.avatar"
												>
												</v-img>
											</v-avatar>
											<strong>{{ item.fullName }}</strong>
										</v-chip>
									</span>
								</div>
							</div>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-file-input
								ref="file"
								:label="$t('label.attachment_file')"
								outlined
								dense
								@change="handleFileUpload($event)"
								:error-messages="errorMessageFile"
							>
							</v-file-input>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-card-text>
		<v-card-actions class="white">
			<v-spacer></v-spacer>
			<v-btn color="blue darken-1" text @click="close"> Hủy </v-btn>
			<v-btn color="blue darken-1" text @click="close"> Từ chối </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "VsmFeExaminerequestform",
	props: { requestStepData: [], requestData: {} },
	watch: {
		requestStepData(value) {
			this.requestStepDataList = value;
		},
		requestData(newValue) {
			this.m_requestData = newValue;
		},
	},

	data() {
		return {
			requestStepDataList: [],
			m_requestData: null,
		};
	},

	mounted() {},
	created() {
		this.requestStepDataList = this.requestStepData;
		this.m_requestData = this.requestData;
	},

	methods: {
		close() {
			this.$emit("close", true);
		},
		handleFileUpload(event) {
			this.file = event;
		},
	},
};
</script>

<style lang="scss" scoped></style>
