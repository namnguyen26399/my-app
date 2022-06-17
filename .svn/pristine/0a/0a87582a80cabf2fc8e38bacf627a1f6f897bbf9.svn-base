<template>
	<v-card>
		<v-toolbar color="grey lighten-4">
			<v-toolbar-title> Gửi email </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="mt-4">
			<v-container>
				<v-row>
					<v-col cols="12" md="10">
						<v-autocomplete
							multiple
							dense
							outlined
							:items="listUser"
							keyName="id"
							item-text="fullName"
							label="Người nhận"
							clearable
						>
							<template v-slot:label>
								Người nhận <span class="red--text">(*)</span>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col cols="12" md="1">
						<v-btn icon color="blue">
							<v-icon>mdi-account-plus</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="10">
						<v-autocomplete
							multiple
							dense
							outlined
							:items="listUser"
							keyName="id"
							item-text="fullName"
							label="CC"
							clearable
						>
						</v-autocomplete>
					</v-col>
					<v-col cols="12" md="1">
						<v-btn icon color="blue">
							<v-icon>mdi-account-plus</v-icon>
						</v-btn>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-textarea outlined label="Nội dung"> </v-textarea>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-file-input
							truncate-length="15"
							multiple
							label="File input"
						></v-file-input>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn elevation="0" color="blue darken-2" dark class="rounded-0">
				{{ $t("button.ok") }}
			</v-btn>
			<v-btn
				elevation="0"
				color="grey lighten-4"
				class="rounded-0"
				@click="closeDialog()"
			>
				{{ $t("button.cancel") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
export default {
	props: { request: {} },
	watch: {
		request(newValue) {
			this.m_requestData = newValue;
			console.log("this.m_requestData", this.m_requestData);
		},
	},
	data() {
		return {
			m_requestData: null,
			listUser: [],
		};
	},
	created() {
		this.m_requestData = this.request;
		this.$Progress.start();
		this.load();
	},
	mounted() {
		this.$Progress.finish();
	},
	methods: {
		load() {
			this.getAllUser();
		},
		async getAllUser() {
			if (!this.m_requestData || !this.m_requestData.id) return;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllUserByRequest(this.m_requestData.id),
			);
			if (!response || !response.state) return;
			this.listUser = response.data;
			console.log("res", response);
		},
	},
};
</script>

<style></style>
