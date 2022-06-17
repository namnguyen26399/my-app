<template>
	<v-card elevation="0">
		<v-row class="mt-4 px-4">
			<v-col cols="12" md="6">
				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="6">
								<v-combobox
									v-model="manageStampInfo.status"
									:items="ALL_ITEM_STATUS_PROCESS"
									label="Trạng thái xử lý"
									outlined
									dense
								></v-combobox>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="12" md="12">
								<v-textarea
									outlined
									name="Nội dung"
									label="Nội dung"
									v-model="manageStampInfo.content"
									:rules="[rules.required]"
								></v-textarea>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field
									label="Số lượng bản"
									v-model="manageStampInfo.copiesNumber"
									outlined
									dense
									:rules="[rules.number]"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field
									label="Dấu công ty"
									v-model="manageStampInfo.stampName"
									outlined
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="12">
								<v-combobox
									v-model="organizations"
									:items="organizationFilters"
									item-text="organizationName"
									:item-value="(item) => item"
									chips
									clearable
									hide-selected
									label="Nơi lưu"
									multiple
									dense
									outlined
									@click:clear="removeOrganizationHandler"
								>
									<template v-slot:item="{ item }">
										<v-list-item
											@click="
												selectHandlerReceiveUser(item)
											"
											class="m-1"
										>
											<v-chip>
												{{ item.organizationName }}
											</v-chip>
										</v-list-item>
									</template>
									<template
										v-slot:selection="{ attrs, item }"
									>
										<v-chip
											v-bind="attrs"
											class="mt-2"
											close
											@click:close="
												removeOrganization(item)
											"
										>
											{{ item.organizationName }}
										</v-chip>
									</template>
								</v-combobox>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field
									label="Mã số lưu trữ"
									v-model="manageStampInfo.storageCode"
									outlined
									dense
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field
									label="Vị trí lưu trữ"
									v-model="manageStampInfo.storagePosition"
									outlined
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="12" sm="6" md="6">
								<m-date-picker
									label="Ngày đóng dấu"
									:value="manageStampInfo.stampDate"
									@value="
										(v) => (manageStampInfo.stampDate = v)
									"
									format="DD/MM/yyyy"
								>
								</m-date-picker>
								<!-- <v-menu
									v-model="showDate1"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
									min-width="auto"
									outline
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="dateStamp"
											label="Ngày đóng dấu"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											outline
										></v-text-field>
									</template>
									<v-date-picker
										v-model="dateStamp"
										@input="showDate1 = false"
										outline
									></v-date-picker>
								</v-menu> -->
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="12" sm="6" md="6">
								<m-date-picker
									label="Hạn trả bản gốc"
									:value="manageStampInfo.expiredDateReturn"
									@value="
										(v) =>
											(manageStampInfo.expiredDateReturn =
												v)
									"
									format="DD/MM/yyyy"
								>
								</m-date-picker>
								<!-- <v-menu
									v-model="showDate1"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
									min-width="auto"
									outline
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="expiryDateReturn"
											label="Hạn trả bản gốc"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											outline
										></v-text-field>
									</template>
									<v-date-picker
										v-model="expiryDateReturn"
										@input="showDate2 = false"
										outline
									></v-date-picker>
								</v-menu> -->
							</v-col>

							<v-col cols="12" sm="6" md="6">
								<m-date-picker
									label="Hạn trả bản gốc"
									:value="manageStampInfo.returnDate"
									@value="
										(v) => (manageStampInfo.returnDate = v)
									"
									format="DD/MM/yyyy"
								>
								</m-date-picker>
								<!-- <v-menu
									v-model="showDate3"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
									min-width="auto"
									outline
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="dateReturn"
											label="Ngày trả bản gốc"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											outline
										></v-text-field>
									</template>
									<v-date-picker
										v-model="dateReturn"
										@input="showDate3 = false"
										outline
									></v-date-picker>
								</v-menu> -->
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="6">
								<v-combobox
									v-model="manageStampInfo.orgReturn"
									:items="allOrganization_"
									item-text="organizationName"
									label="Bộ phận trả"
									outlined
									dense
								></v-combobox>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-row>
							<v-col cols="2">
								<v-file-input
									outlined
									dense
									v-model="fileUploadInfo"
									append-icon="mdi-cloud-upload-outline"
									prepend-icon=""
									label="Tải lên"
									@change="handleFile($event)"
								></v-file-input>
							</v-col>
						</v-row>
					</v-col>
					<v-list flat>
						<v-list-item-group :v-model="1" color="indigo">
							<v-list-item
								v-for="(item, i) in attachmentFileList"
								:key="i"
							>
								<v-list-item-icon>
									<v-icon>
										{{ m_files_icon[item.fileExtension] }}
									</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title
										v-text="item.fileName"
									></v-list-item-title>
								</v-list-item-content>

								<v-list-item-icon
									@click="deleteAttachmentFile(item)"
								>
									<v-icon> mdi-close-circle </v-icon>
								</v-list-item-icon>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-row>

				<v-col cols="12">
					<v-btn
						:color="'blue darken-2'"
						:dark="true"
						width="140"
						class="rounded-0 mt-4"
						@click="saveManageStampInfo()"
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
		</v-row>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";
import ManageStampInfo from "@/models/manage-stamp-info.dto";
import moment from "moment";
export default {
	components: {},
	name: "ManagerStamp",
	props: { requestDataId: { type: Number, default: 1557 } },
	watch: {
		requestStepDataList(value) {
			this.m_requestStepDataList = value;
		},

		isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state) {
				this.save();
			}
		},
	},

	data() {
		return {
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
			content: "",
			numberOfCopies: null,
			stampCompany: null,

			organizations: [], // nơi lưu
			allOrganization_: [],
			organizationFilters: [],

			archiveCode: "", // mã lưu trữ
			archiveLocation: "", // vị trí lưu trữ

			dateStamp: new Date(
				Date.now() - new Date().getTimezoneOffset() * 60000,
			)
				.toISOString()
				.substr(0, 10), // ngày đóng dấu

			expiryDateReturn: null,
			dateReturn: null,
			organizationReturn: null, // bộ phận trả

			fileUploadInfo: [], // file upload

			manageStampInfoList: [], // thông tin đóng Dấu
			manageStampInfo: ManageStampInfo,

			attachmentFileList: [], // danh sách file tải lên
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
			this.getAllOrganization();
			this.getAllManageStampByRequestData();
		},
		async handleButtonClick(event) {
			await event();
		},
		async getAllUser() {
			// let response;
			// try {
			// 	response = await globalService.getData_Async(
			// 		administratorAPI.API_GetAllUserInfos(),
			// 	);
			// 	if (!response || !response.state) {
			// 		return [];
			// 	}
			// 	this.allOrganization_ = response.data;
			// 	this.organizationFilters = this.allOrganization_;
			// } catch (error) {
			// 	this.toastError(error);
			// 	return;
			// }
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
				this.allOrganization_ = response.data;
				this.organizationFilters = this.allOrganization_;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllAttachmentFile() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllAttachmentFileByManageStampInfoId(
						this.manageStampInfo.id,
					),
				);
				if (!response || !response.state) {
					return [];
				}
				this.attachmentFileList = response.data;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllManageStampByRequestData() {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetAllManageStampInfoByRequestData(
						this.requestDataId,
					),
				);
				if (!response || !response.state) {
					return [];
				}
				this.manageStampInfoList = response.data.map((ele) =>
					this.getOrganizationInfo(ele),
				);
				this.manageStampInfo = this.manageStampInfoList[0];
				this.getAllAttachmentFile();
				this.organizations = this.manageStampInfo.orgStorages;
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async save() {
			if (this.m_requestStepDataList.length == 0) {
				this.toastError(this.$t("message.update_error"));
				return;
			}

			for (let stepInProces of this.m_requestStepDataList) {
				let response = await globalService.putData_Async(
					administratorAPI.API_UpDateStepData(stepInProces.id),
					stepInProces,
				);

				if (!response || !response.state) {
					return;
				}
			}
		},
		removeItem(index, item) {
			this.m_requestStepDataList[index].userInfos =
				this.m_requestStepDataList[index].userInfos.filter((entry) => {
					if (entry.id != item.id) return entry;
				});
			// this.m_requestStepDataList[index].userInfos.splice(
			// 	this.m_requestStepDataList[index].userInfos.indexOf(item),
			// 	1,
			// );
		},
		async removeOrganizationHandler() {
			this.organizationFilters = Object.assign([], this.allOrganization_);
			this.organizations = [];
		},
		selectHandlerReceiveUser(item) {
			this.organizations.push(item);
		},
		removeOrganization(item) {
			this.organizations.splice(this.organizations.indexOf(item), 1);
		},

		async handleFile(event) {
			if (!event) {
				return;
			}
			let response;
			try {
				response = await globalService.upload_Async(
					administratorAPI.API_UploadManageStampCloud(
						this.requestDataId,
					),
					event,
				);
				if (!response) {
					this.toastError(response);
					return;
				}
				if (!response.state) {
					this.toastError(response.messgage);
					return;
				}
				let attachmentFile = response.data;
				attachmentFile.requestData = null;
				attachmentFile.manageStampInfo = {
					id: this.manageStampInfo.id,
				};
				response = await globalService.putData_Async(
					administratorAPI.API_UpdateAttachmentFile(
						attachmentFile.id,
					),
					attachmentFile,
				);
				this.fileUploadInfo = [];
				this.getAllAttachmentFile();
			} catch (error) {
				this.toastError(error);
			}
		},

		async saveManageStampInfo() {
			if (this.manageStampInfo) {
				this.manageStampInfo.stampDate = moment(
					this.manageStampInfo.stampDate,
				).toDate();
				this.manageStampInfo.returnDate = moment(
					this.manageStampInfo.returnDate,
				).toDate();
				this.manageStampInfo.expiredDateReturn = moment(
					this.manageStampInfo.expiredDateReturn,
				).toDate();
				this.manageStampInfo.orgStorages = this.organizations;
				let response = await globalService.putData_Async(
					administratorAPI.API_updateManageStampInfo(
						this.manageStampInfo.id,
					),
					this.manageStampInfo,
				);
				if (!response || !response.state) {
					this.toastError(this.$t("message.update_error"));
					return;
				}
				this.manageStampInfo = response.data;
				this.manageStampInfo = this.getOrganizationInfo(
					this.manageStampInfo,
				);
				this.getAllAttachmentFile();
				this.organizations = this.manageStampInfo.orgStorages;
				this.toastSuccess(this.$t("message.update_success"));
			}
		},

		getOrganizationInfo(manageStampInfo) {
			if (!manageStampInfo) return manageStampInfo;
			manageStampInfo.orgReturn = this.allOrganization_.find(
				(entry) => entry?.id == manageStampInfo.orgReturn?.id,
			);
			manageStampInfo.orgStorage = this.allOrganization_.find(
				(entry) => entry?.id == manageStampInfo.orgStorage?.id,
			);
			if (manageStampInfo.orgStorages) {
				manageStampInfo.orgStorages = this.allOrganization_.filter(
					(entry) =>
						manageStampInfo.orgStorages.some(
							(ele) => ele.id == entry.id,
						),
				);
			}
			return manageStampInfo;
		},

		async deleteAttachmentFile(itemAttachmentDelete) {
			if (!itemAttachmentDelete.id) return;
			let response = await globalService.deleteData_Async(
				administratorAPI.API_DeleteAttachmentFile(
					itemAttachmentDelete.id,
				),
			);
			if (!response || !response.state) {
				this.toastError(this.$t("message.delete_error"));
				return;
			}
			this.toastSuccess(this.$t("message.delete_success"));
			this.getAllAttachmentFile();
		},
	},
};
</script>

<style></style>
