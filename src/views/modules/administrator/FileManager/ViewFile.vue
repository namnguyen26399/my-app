<template>
	<v-card>
		<v-toolbar elevation="0" color="grey lighten-4">
			<v-toolbar-title> {{ $t("title.view") }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<VuePerfectScrollbar class="h-[44rem]">
			<v-card-text>
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
					:title="m_file.fileName"
					>This is an embedded
					<a target="_blank" href="https://office.com"
						>Microsoft Office</a
					>
					document, powered by
					<a target="_blank" href="https://office.com/webapps"
						>Office</a
					>.</iframe
				>
			</v-card-text>
		</VuePerfectScrollbar>
		<v-card-actions>
			<v-spacer> </v-spacer>
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
import administratorAPI from "../administrator.api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import globalService from "@/services/global.service";
export default {
	name: "ViewFileVue",
	components: { VuePerfectScrollbar },
	props: { file: {} },
	watch: {
		async file(value) {
			this.m_file = value;
			await this._getPreviewLink();
			// let response;
			// let id = value.id;
			// if (!id) {
			// 	return;
			// }
			// try {
			// 	response = await globalService.getData_Async(
			// 		administratorAPI.API_GetPreviewLink(id),
			// 	);
			// 	if (!response || !response.state) {
			// 		return;
			// 	}
			// 	this.previewLink = response.data;
			// } catch {
			// 	return;
			// }
		},
	},
	data() {
		return { m_file: {}, previewLink: "" };
	},
	async mounted() {
		this.m_file = this.file;
		await this._getPreviewLink();
	},
	methods: {
		async _getPreviewLink() {
			let response;
			try {
				let id = this.m_file.id;
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
		_downloadFileUrl(item) {
			if (!item || !item.idInFileService) {
				return;
			}
			let description = JSON.parse(item.description);
			return administratorAPI.FullAPI_DownloadFileById(
				item.idInFileService,
				description.contentType,
			);
		},
		downloadFileUrl(item) {
			if (!item || !item.idInFileService) {
				return;
			}
			return encodeURIComponent(this._downloadFileUrl(item));
		},
	},
};
</script>

<style></style>
