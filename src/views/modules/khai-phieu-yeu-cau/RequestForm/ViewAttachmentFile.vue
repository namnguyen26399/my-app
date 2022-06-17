<template>
	<v-card elevation="0" ref="form">
		<v-toolbar>
			<v-toolbar-title>Biểu mẫu </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="close" color="red">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-col cols="12" md="12">
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
				<a target="_blank" href="https://office.com/webapps">Office</a
				>.</iframe
			>
		</v-col>
		<v-card-actions color="primary">
			<v-spacer></v-spacer>
			<v-btn class="error rounded" dark @click="close" outlined>
				Hủy
			</v-btn>
			<!-- <v-btn class="blue darken-2 rounded" dark outlined @click="close">
				Chỉnh sửa
			</v-btn> -->
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";

export default {
	components: {},
	name: "VsmFeViewattachmentfile",
	props: { attachmentFile: [], requestData: {} },
	watch: {
		attachmentFile(value) {
			this.requestid = value;
		},
		requestData(newValue) {
			this.m_requestData = newValue;
		},
	},

	data() {
		return {
			listAttachmentFile: [],
			requestid: null,
			m_requestData: null,
			previewLink: "",
		};
	},
	created() {
		// this.m_requestData = this.requestData;
		// this.listAttachmentFile = this.requestAttachmentFile;
		this.requestid = this.attachmentFile;
		this.getPreviewLink();
	},

	mounted() {},

	methods: {
		async getPreviewLink() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetPreviewLink(this.requestid),
				);
				if (!response || !response.state) {
					return;
				}
				this.previewLink = response.data;
			} catch {
				return;
			}
		},
		close() {
			this.$emit("close", true);
		},
	},
};
</script>

<style lang="scss" scoped></style>
