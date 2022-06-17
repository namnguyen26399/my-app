<template>
	<v-card elevation="0">
		<v-row>
			<v-dialog width="60vw" v-model="openSelectionReceiveUser">
				<UserInfosRequestData
					@save="onSaveReceiveUser"
					@close="onCloseReceiveUser"
				></UserInfosRequestData>
			</v-dialog>
		</v-row>

		<v-row>
			<v-dialog width="60vw" v-model="openSelectionCCUser">
				<UserInfosRequestData
					@save="onSaveCCUser"
					@close="onCloseCCUser"
				></UserInfosRequestData>
			</v-dialog>
		</v-row>

		<v-row class="mt-4 px-4">
			<form>
				<v-col cols="12" md="12">
					<v-row>
						<v-col cols="12">
							<v-row>
								<v-col cols="3">
									<v-combobox
										v-model="signData.status"
										:items="ALL_ITEM_STATUS_PROCESS"
										:label="$t('label.status_process')"
										outlined
										dense
									></v-combobox>
								</v-col>

								<v-col cols="9">
									<v-card-text
										>Khách hàng:
										<span class="ml-8"
											><b>{{
												`Xem(${signData.numberView})`
											}}</b></span
										>
										<span class="ml-8"
											><b>{{
												`In(${signData.numberPrint})`
											}}</b></span
										>
										<span class="ml-8"
											><b>{{
												`Ký số(${signData.numberSign})`
											}}</b></span
										>
										<span class="ml-8"
											><b>{{
												`Tải xuống(${signData.numberDownload})`
											}}</b></span
										>
									</v-card-text>
								</v-col>
							</v-row>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="12">
							<v-row>
								<v-col cols="12" md="3">
									<v-text-field
										:label="$t('label.name')"
										v-model="signData.signName"
										outlined
										dense
									></v-text-field>
								</v-col>
								<v-col cols="12" md="3">
									<v-text-field
										label="Địa chỉ email"
										v-model="signData.email"
										outlined
										dense
									></v-text-field>
								</v-col>
								<v-col cols="12" md="3">
									<v-text-field
										label="Số điện thoại"
										v-model="signData.phoneNumber"
										outlined
										dense
									></v-text-field>
								</v-col>
								<v-col cols="12" md="3">
									<v-text-field
										:label="$t('label.contact_address')"
										v-model="signData.address"
										outlined
										dense
									></v-text-field>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-col cols="12">
						<v-btn
							:color="'blue darken-2'"
							:dark="true"
							width="140"
							class="rounded-0 mt-4"
							@click="saveSignData"
						>
							<v-icon>{{ "mdi-content-save" }}</v-icon>
							{{ $t("button.update") }}
						</v-btn>
					</v-col>
				</v-col>

				<v-divider vertical></v-divider>
				<v-col cols="12" md="6">
					<div></div>
				</v-col>
			</form>
		</v-row>

		<v-card elevation="0" class="bo">
			<v-list-group
				no-action
				sub-group
				:value="openSendMail"
				@click="openSendMail = !openSendMail"
			>
				<template v-slot:activator>
					<v-list-item-title class="lighten-4 text-black"
						>Gửi email</v-list-item-title
					>
					<v-btn text tile color="blue" class="float-right">
						<v-icon color="black" v-if="openSendMail"
							>mdi-chevron-up</v-icon
						>
						<v-icon color="black" v-else>mdi-chevron-down</v-icon>
					</v-btn>
				</template>
				<v-list-item>
					<v-row class="mt-4 px-4">
						<v-col cols="12" md="6">
							<v-row>
								<v-col cols="12">
									<v-row>
										<v-col cols="6">
											<v-combobox
												v-model="mailTemplateSelect"
												:items="ALL_MAILTEMPLATE"
												item-text="mailTemplateName"
												label="Mẫu email"
												outlined
												dense
											></v-combobox>
										</v-col>
									</v-row>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12" md="11">
									<v-combobox
										v-model="receiveUsers"
										:items="receiveUserFilters"
										item-text="fullName"
										:item-value="(item) => item"
										chips
										clearable
										hide-selected
										:label="
											$t(`label.mail_template_receive`)
										"
										multiple
										dense
										outlined
										@click:clear="removeReceiveUserHandler"
									>
										<template v-slot:item="{ item }">
											<v-list-item
												@click="
													selectHandlerReceiveUser(
														item,
													)
												"
												class="m-1"
											>
												<v-chip>
													<v-list-item-avatar>
														<v-avatar
															color="indigo mr-2"
															size="36"
														>
															<span
																class="white--text"
																v-if="
																	!item.avatar
																"
															>
																{{
																	getAvatarText(
																		item.fullName,
																	)
																}}
															</span>
															<v-img
																v-if="
																	item.avatar
																"
																:src="
																	item.avatar
																"
															>
															</v-img>
														</v-avatar>
													</v-list-item-avatar>
													<v-list-item-content>
														<v-list-item-title
															v-html="
																item.fullName +
																' <br/> ' +
																(item.email
																	? item.email
																	: '')
															"
														>
														</v-list-item-title>
														<v-list-item-subtitle
															v-if="
																receiveUsers &&
																receiveUsers.fullName
															"
														>
															{{
																receiveUsers.fullName
															}}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-chip>
											</v-list-item>
										</template>
										<template
											v-slot:selection="{ attrs, item }"
										>
											<v-chip
												v-if="typeof item == 'object'"
												v-bind="attrs"
												class="mt-2"
												close
												@click:close="
													removeReceiveUser(item)
												"
											>
												<v-avatar
													color="indigo mr-2"
													size="36"
												>
													<span
														class="white--text"
														v-if="!item.avatar"
													>
														{{
															getAvatarText(
																item.fullName,
															)
														}}
													</span>
													<v-img
														v-if="item.avatar"
														:src="item.avatar"
													>
													</v-img>
												</v-avatar>
												<v-list-item>
													<v-list-item-content>
														<v-list-item-title>
															{{ item.fullName }}
														</v-list-item-title>
														<v-list-item-subtitle>
															{{ item.email }}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-list-item>
											</v-chip>
											<v-chip
												v-else
												v-bind="attrs"
												class="mt-2"
												close
												@click:close="
													removeReceiveUser(item)
												"
											>
												<v-avatar
													color="indigo mr-2"
													size="36"
												>
													<span
														class="white--text"
														v-if="!item.avatar"
													>
														{{
															getAvatarText(item)
														}}
													</span>
													<v-img
														v-if="item.avatar"
														:src="item.avatar"
													>
													</v-img>
												</v-avatar>
												<v-list-item>
													<v-list-item-content>
														<v-list-item-title>
															{{ item }}
														</v-list-item-title>
														<v-list-item-subtitle>
															{{ item }}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-list-item>
											</v-chip>
										</template>
									</v-combobox>
								</v-col>

								<v-col cols="12" md="1">
									<v-btn icon>
										<v-icon
											color="blue"
											class="text--blue"
											@click="
												openPopupSelectionReceiveUser()
											"
										>
											mdi-account-plus
										</v-icon>
									</v-btn>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12" md="11">
									<v-combobox
										v-model="ccUsers"
										:items="ccUserFilters"
										item-text="fullName"
										:item-value="(item) => item"
										chips
										clearable
										hide-selected
										:label="$t(`label.mail_template_cc`)"
										multiple
										dense
										outlined
										@click:clear="removeCCUserHandler"
									>
										<template v-slot:item="{ item }">
											<v-list-item
												@click="
													selectHandlerCCUser(item)
												"
												class="m-1"
											>
												<v-chip>
													<v-list-item-avatar>
														<v-avatar
															color="indigo mr-2"
															size="36"
														>
															<span
																class="white--text"
																v-if="
																	!item.avatar
																"
															>
																{{
																	getAvatarText(
																		item.fullName,
																	)
																}}
															</span>
															<v-img
																v-if="
																	item.avatar
																"
																:src="
																	item.avatar
																"
															>
															</v-img>
														</v-avatar>
													</v-list-item-avatar>
													<v-list-item-content>
														<v-list-item-title
															v-html="
																item.fullName +
																' <br/> ' +
																(item.email
																	? item.email
																	: '')
															"
														>
														</v-list-item-title>
														<v-list-item-subtitle
															v-if="
																ccUsers &&
																ccUsers.fullName
															"
														>
															{{
																ccUsers.fullName
															}}
															{{ ccUsers.email }}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-chip>
											</v-list-item>
										</template>
										<template
											v-slot:selection="{ attrs, item }"
										>
											<v-chip
												v-if="typeof item == 'object'"
												v-bind="attrs"
												class="mt-2"
												close
												@click:close="
													removeCCUser(item)
												"
											>
												<v-avatar
													color="indigo mr-2"
													size="36"
												>
													<span
														class="white--text"
														v-if="!item.avatar"
													>
														{{
															getAvatarText(
																item.fullName,
															)
														}}
													</span>
													<v-img
														v-if="item.avatar"
														:src="item.avatar"
													>
													</v-img>
												</v-avatar>
												<v-list-item>
													<v-list-item-content>
														<v-list-item-title>
															{{ item.fullName }}
														</v-list-item-title>
														<v-list-item-subtitle>
															{{ item.email }}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-list-item>
											</v-chip>
											<v-chip
												v-else
												v-bind="attrs"
												class="mt-2"
												close
												@click:close="
													removeCCUser(item)
												"
											>
												<v-avatar
													color="indigo mr-2"
													size="36"
												>
													<span
														class="white--text"
														v-if="!item.avatar"
													>
														{{
															getAvatarText(item)
														}}
													</span>
													<v-img
														v-if="item.avatar"
														:src="item.avatar"
													>
													</v-img>
												</v-avatar>
												<v-list-item>
													<v-list-item-content>
														<v-list-item-title>
															{{ item }}
														</v-list-item-title>
														<v-list-item-subtitle>
															{{ item }}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-list-item>
											</v-chip>
										</template>
									</v-combobox>
								</v-col>

								<v-col cols="12" md="1">
									<v-btn icon>
										<v-icon
											color="blue"
											class="text--blue"
											@click="openPopupSelectionCCUser()"
										>
											mdi-account-plus
										</v-icon>
									</v-btn>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12">
									<v-row>
										<v-col cols="12" md="12">
											<!-- <v-textarea
									outlined
									name="Nội dung"
									label="Nội dung"
									v-model="content"
									height="400"
									readonly
								></v-textarea> -->
											<tiptap-vuetify
												v-model="content"
												:extensions="extensions"
												placeholder=""
												min-height="400"
												:card-props="{
													flat: true,
													outlined: true,
												}"
												:disabled="true"
											/>
										</v-col>
									</v-row>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12">
									<v-row>
										<v-col cols="12" md="12">
											<v-row>
												<v-checkbox
													v-model="isOTP"
													label="Gửi OTP"
												></v-checkbox>
											</v-row>
											<v-row>
												<v-checkbox
													v-model="isPDF"
													label="Đính kèm PDF"
												></v-checkbox>
											</v-row>
										</v-col>
									</v-row>
								</v-col>
							</v-row>

							<v-row> </v-row>

							<v-col cols="12">
								<v-btn
									color="red"
									dark
									class="rounded-pill"
									width="96"
									>{{ $t("button.send") }}</v-btn
								>
							</v-col>
						</v-col>

						<v-divider vertical></v-divider>
						<v-col cols="12" md="6">
							<div></div>
						</v-col>
					</v-row>
				</v-list-item>
			</v-list-group>
		</v-card>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import UserInfosRequestData from "./UserInfosRequestData.vue";
import SignDataDto from "@/models/sign-data.dto.js";
import {
	TiptapVuetify,
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	Paragraph,
	BulletList,
	OrderedList,
	ListItem,
	Link,
	Blockquote,
	HardBreak,
	HorizontalRule,
	History,
} from "tiptap-vuetify";
export default {
	components: { TiptapVuetify, UserInfosRequestData },
	name: "DigitalSignatureInfo",
	props: { requestDataId: { type: Number, default: 1557 } },
	watch: {
		isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state) {
				this.save();
			}
		},
		mailTemplateSelect(newValue) {
			this.receiveUsers = newValue?.receiverDefault
				? JSON.parse(newValue?.receiverDefault)
				: [];
			if (this.receiveUsers)
				this.receiveUserFilters = this.filerUser(
					this.receiveUserFilters,
					this.receiveUsers,
				);
			this.ccUsers = newValue?.ccerDefault
				? JSON.parse(newValue?.ccerDefault)
				: [];
			if (this.ccUsers)
				this.ccUserFilters = this.filerUser(
					this.ccUserFilters,
					this.ccUsers,
				);
			this.content = newValue.contentFile;
		},
	},

	data() {
		return {
			openSendMail: true,
			openSelectionReceiveUser: false,
			openSelectionCCUser: false,

			extensions: [
				History,
				Blockquote,
				Link,
				Underline,
				Strike,
				Italic,
				ListItem,
				BulletList,
				OrderedList,
				[
					Heading,
					{
						options: {
							levels: [1, 2, 3],
						},
					},
				],
				Bold,
				Code,
				HorizontalRule,
				Paragraph,
				HardBreak,
			],
			showDate1: false,
			showDate2: false,
			showDate3: false,
			tabs: [{ key: "information", title: this.$t("label.information") }],
			buttons: [
				{
					icon: "mdi-content-save",
					title: this.$t("button.save"),
					color: "blue darken-2",
					transparent: false,
					dark: true,
					event: this.save,
				},
				{
					icon: "mdi-trash-can-outline",
					title: this.$t("button.delete"),
					color: "black",
					transparent: true,
					dark: false,
					event: this.delete,
				},
				{
					icon: "mdi-arrow-left-top",
					title: this.$t("button.back"),
					color: "black",
					transparent: true,
					dark: false,
					event: this.back,
				},
			],
			rules: {
				required: (value) => !!value || "Vui lòng nhập thông tin.",
				number: (value) => {
					if (!value) return true;
					const pattern = /^(0|[1-9][0-9]*)$/;
					return (
						pattern.test((value + "").trim()) ||
						"Vui lòng nhập ký tự số."
					);
				},
			},
			ALL_ITEM_STATUS_PROCESS: [],
			itemStatusProcessSelect: null,

			dateStamp: new Date(
				Date.now() - new Date().getTimezoneOffset() * 60000,
			)
				.toISOString()
				.substr(0, 10), // ngày đóng dấu

			expiryDateReturn: null,
			dateReturn: null,
			organizationReturn: null, // bộ phận trả

			fileUploadInfo: [], // file upload

			customerName: "", // tên
			customerEmail: "", // địa chỉ email
			customerPhone: "", // số điện thoại
			customerAddress: "", // địa chỉ liên hệ

			ALL_MAILTEMPLATE: [],
			mailTemplateSelect: null,

			receiveUsers: [],
			allUser_: [],
			receiveUserFilters: [],

			ccUsers: [],
			ccUserFilters: [],

			content: "", // nội dung

			isOTP: false, // gửi OPT
			isPDF: false, // Đính kèm PDF

			signDataList: [], // thông tin ký (signData)
			signData: SignDataDto,
		};
	},
	created() {
		this.ALL_ITEM_STATUS_PROCESS = [
			"Chưa có hợp đồng",
			"Đã có hợp đồng, chưa gửi cho khách hàng",
			"Đã có hợp đồng, đã gửi cho khách hàng",
			"Đã có hợp đồng, Khách hàng đã ký",
			"Đã có hợp đồng, Đã nhận được hợp đồng có chữ ký của khách hàng",
		];
	},
	mounted() {
		this.initialize();
	},

	methods: {
		async initialize() {
			this.getAllUser();
			this.getAllMailTemplate();
			this.getAllSignData();
		},
		async handleButtonClick(event) {
			await event();
		},
		async getAllUser() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfos(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.allUser_ = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.receiveUserFilters = this.allUser_;
				this.ccUserFilters = this.allUser_;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllOrganization() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.allOrganization_ = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.organizationFilters = this.allOrganization_;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllMailTemplate() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllMailTemplate(),
				);
				if (!response || !response.state) {
					return [];
				}
				this.ALL_MAILTEMPLATE = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllSignData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllSignDataByRequestData(
						this.requestDataId,
					),
				);
				if (!response || !response.state) {
					return [];
				}
				this.signDataList = response.data;
				this.signData = this.signDataList[0];
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		/**
		 * Hàm thực hiện loại bỏ các phần tử của mảng source mà đã tồn tại ở mảng target
		 * @param {*} source: mảng nguồn
		 * @param {*} target: mảng chứa phần tử cần loại bỏ
		 */
		filerUser(source = [], target = []) {
			return source.filter(
				(ele) => !target.some((ele1) => ele.id == ele1.id),
			);
		},
		// async save() {
		// 	if (this.m_requestStepDataList.length == 0) {
		// 		this.toastError(this.$t("message.update_error"));
		// 		return;
		// 	}

		// 	for (let stepInProces of this.m_requestStepDataList) {
		// 		let response = await globalService.putData_Async(
		// 			administratorAPI.API_UpDateStepData(stepInProces.id),
		// 			stepInProces,
		// 		);

		// 		if (!response || !response.state) {
		// 			return;
		// 		}
		// 	}
		// },
		async saveSignData() {
			if (this.signData) {
				let response = await globalService.putData_Async(
					administratorAPI.API_updateSignData(this.signData.id),
					this.signData,
				);
				if (!response || !response.state) {
					this.toastError(this.$t("message.update_error"));
					return;
				}
				this.signData = response.data;
				this.toastSuccess(this.$t("message.update_success"));
			}
		},
		removeItem(index, item) {
			this.m_requestStepDataList[index].userInfos =
				this.m_requestStepDataList[index].userInfos.filter((entry) => {
					if (entry.id != item.id) return entry;
				});
		},

		async removeReceiveUserHandler() {
			this.receiveUserFilters = Object.assign([], this.allUser_);
			this.receiveUsers = [];
		},
		selectHandlerReceiveUser(item) {
			this.receiveUsers.push(item);
		},
		removeReceiveUser(item) {
			this.receiveUsers.splice(this.receiveUsers.indexOf(item), 1);
		},
		async removeCCUserHandler() {
			this.ccUserFilters = Object.assign([], this.allUser_);
			this.ccUsers = [];
		},
		selectHandlerCCUser(item) {
			this.ccUsers.push(item);
		},
		removeCCUser(item) {
			this.ccUsers.splice(this.ccUsers.indexOf(item), 1);
		},

		// popup
		onCloseReceiveUser() {
			this.openSelectionReceiveUser = false;
		},
		onOpenReceiveUser() {
			this.openSelectionReceiveUser = true;
		},
		onSaveReceiveUser(userSelectedList) {
			this.receiveUsers = userSelectedList;
			if (this.receiveUsers)
				this.receiveUserFilters = this.filerUser(
					this.receiveUserFilters,
					this.receiveUsers,
				);
		},
		openPopupSelectionReceiveUser() {
			this.openSelectionReceiveUser = true;
		},
		onCloseCCUser() {
			this.openSelectionCCUser = false;
		},
		onOpenCCUser() {
			this.openSelectionCCUser = true;
		},
		onSaveCCUser(userSelectedList) {
			this.ccUsers = userSelectedList;
			if (this.ccUsers)
				this.ccUserFilters = this.filerUser(
					this.ccUserFilters,
					this.ccUsers,
				);
		},
		openPopupSelectionCCUser() {
			this.openSelectionCCUser = true;
		},
	},
};
</script>
<style></style>
