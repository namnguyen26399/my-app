<template>
	<v-card>
		<v-toolbar color="grey lighten-4">
			<v-toolbar-title> Xử lý công văn </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="mt-4">
			<v-container>
				<v-row>
					<v-col cols="12" md="8">
						<v-autocomplete
							multiple
							:items="listUser"
							item-text="fullName"
							outlined
							dense
							clearable
						>
							<template v-slot:label>
								Người nhận <span class="red--text"> (*) </span>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col cols="12" md="1">
						<v-btn icon color="blue">
							<v-icon>mdi-account-plus</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" md="3">
						<v-btn class="blue" dark> Chuyển xử lý </v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="6">
						<v-select
							dense
							outlined
							:items="listStatus"
							:v-model="selected_status"
							keyName="id"
							item-text="statusName"
							label="Trạng thái xử lý"
							clearable
						></v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="6">
						<v-select
							dense
							outlined
							:items="listStatus"
							keyName="id"
							label="Đơn vị"
							clearable
						></v-select>
					</v-col>
					<v-col cols="12" md="6">
						<v-select
							dense
							outlined
							:items="listStatus"
							:v-model="selected_status"
							keyName="id"
							item-text="statusName"
							label="Sổ công văn"
						></v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="6">
						<v-menu
							ref="menuhanxuly"
							v-model="menuhanxuly"
							:close-on-content-click="false"
							:return-value.sync="menuhanxuly"
							transition="scale-transition"
							offset-y
							min-width="auto"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									dense
									outlined
									v-model="hanxuly"
									label="Hạn xử lý"
									append-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="hanxuly"
								no-title
								scrollable
							>
								<v-spacer></v-spacer>
								<v-btn
									text
									color="primary"
									@click="menuhanxuly = false"
								>
									Cancel
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.menu.save(menuhanxuly)"
								>
									OK
								</v-btn>
							</v-date-picker>
						</v-menu>
					</v-col>
					<v-col cols="12" md="6">
						<v-menu
							ref="menungayxuly"
							v-model="menungayxuly"
							:close-on-content-click="false"
							:return-value.sync="menungayxuly"
							transition="scale-transition"
							offset-y
							min-width="auto"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									dense
									outlined
									v-model="ngayxuly"
									label="Ngày xử lý"
									append-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="ngayxuly"
								no-title
								scrollable
							>
								<v-spacer></v-spacer>
								<v-btn
									text
									color="primary"
									@click="menungayxuly = false"
								>
									Cancel
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.menu.save(menungayxuly)"
								>
									OK
								</v-btn>
							</v-date-picker>
						</v-menu>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-textarea outlined>
							<template v-slot:label>
								Nội dung <span class="red--text">(*)</span>
							</template>
						</v-textarea>
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
			listStatus: [],
			selected_status: null,
			menungayxuly: false,
			menuhanxuly: false,
			ngayxuly: null,
			hanxuly: null,
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
			this.getStatus();
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
		async getStatus() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllStatus(),
			);
			if (!response || !response) return;
			this.listStatus = response.data;
		},
	},
};
</script>

<style></style>
