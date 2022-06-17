<template>
	<v-card elevation="0" ref="form" color="primary">
		<v-toolbar dark color="primary">
			<v-toolbar-title> Từ chối </v-toolbar-title>
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
							<v-file-input
								ref="file"
								:label="$t('label.attachment_file')"
								outlined
								dense
								@change="handleFileUpload($event)"
								:error-messages="errorMessageFile"
								chips
								multiple
								small-chips
								truncate-length="20"
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
	name: "VsmFeRefuserequestform",
	props: { requestData: {} },
	watch: {
		requestData(newValue) {
			this.m_requestData = newValue;
		},
	},

	data() {
		return {
			file: null,
			m_requestData: null,
		};
	},
	created() {
		this.m_requestData = this.requestData;
	},

	mounted() {},

	methods: {
		close() {
			this.$emit("close", true);
		},
		handleFileUpload(event) {
			this.file = event;
			console.log(this.file);
		},
	},
};
</script>

<style lang="scss" scoped></style>
