<template>
	<v-card>
		<v-dialog
			max-width="60vw"
			v-model="openUserInfosRequestData"
			persistent
		>
			<UserInfosRequestData
				@save="onSave"
				@close="onClose"
			></UserInfosRequestData>
		</v-dialog>
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
						<v-select
							:items="listMailTemp"
							item-text="mailTemplateName"
							outlined
							dense
							label="Mẫu email"
							clearable
						>
						</v-select>
					</v-col>
					<v-col cols="12" md="2">
						<v-btn class="blue" dark> Soạn thư </v-btn>
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
							label="Người nhận"
							clearable
						>
							<template v-slot:label>
								Người nhận <span class="red--text">(*)</span>
							</template>

							<v-combobox
								v-if="m_requestDto.userInfos.length"
								v-model="m_requestDto.userInfos"
								chips
								dense
								multiple
							>
								<template
									v-slot:selection="{
										attrs,
										item,
										parent,
										selected,
									}"
								>
									<v-chip
										v-if="item === Object(item)"
										v-bind="attrs"
										:input-value="selected"
										label
										class="ma-2"
										close
										@click:close="remove(item)"
									>
										<v-avatar color="indigo mr-2" size="30">
											<span class="white--text">
												{{
													getAvatarText(
														item.fullName,
														2,
													)
												}}
											</span>
										</v-avatar>
										<span class="pr-2">
											{{ item.fullName }}
										</span>
										<v-icon
											small
											@click="parent.selectItem(item)"
										>
										</v-icon>
									</v-chip>
								</template>
							</v-combobox>
						</v-autocomplete>
					</v-col>
					<v-col cols="12" md="1">
						<v-btn
							icon
							color="blue"
							@click="editUserInfosRequestData"
						>
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
							label="cc"
							clearable
							>abc</v-autocomplete
						>
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
						<v-checkbox label="Gửi OTP"> </v-checkbox>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-checkbox label="Đính kèm PDF"> </v-checkbox>
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
import UserInfosRequestData from "../RequestForm/UserInfosRequestData.vue";

export default {
	props: { request: {} },
	components: {
		UserInfosRequestData,
	},
	watch: {
		request(newValue) {
			this.m_requestData = newValue;
			console.log("this.m_requestData", this.m_requestData);
		},
	},
	data() {
		return {
			m_requestData: null,
			m_requestDto: null,
			listUser: [],
			listMailTemp: [],
			selected_status: null,
			menungayxuly: false,
			menuhanxuly: false,
			ngayxuly: null,
			hanxuly: null,
			openUserInfosRequestData: false,
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
			this.getAllMailTemp();
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
		async getAllMailTemp() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllMailTemplate(),
			);
			if (!response || !response) return;
			this.listMailTemp = response.data;
		},
		editUserInfosRequestData() {
			this.openUserInfosRequestData = true;
			console.log("list user :" + this.listUser);
		},
		onClose(value) {
			if (value) {
				this.openRelateRequestData = false;
				this.openUserInfosRequestData = false;
				this.openAttachmentFileRequestData = false;
				this.openFileRequestData = false;
				this.openViewAttachmentFile = false;
			}
		},
		onSave(value) {
			this.m_requestDto.userInfos = value;
			console.log(
				"value : ------------------------------------" +
					this.m_requestDto,
			);
		},
	},
};
</script>

<style></style>
