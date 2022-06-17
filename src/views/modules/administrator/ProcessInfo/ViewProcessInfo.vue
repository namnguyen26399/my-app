<template>
	<v-card class="primary">
		<VuePerfectScrollbar>
			<v-card-title>
				<h3 class="text-white">
					{{ $t("label.process_detail") }}
				</h3>
			</v-card-title>
			<v-card-text class="white text--primary">
				<v-row>
					<v-col cols="9" md="9">
						<v-hover v-if="stepInProcess.length == 0">
							<v-card>
								<v-card-text class="my-4 text-center text-h6">
									Không có bước thực hiện nào
								</v-card-text>
							</v-card>
						</v-hover>
						<v-timeline
							align-top
							dense
							v-if="stepInProcess.length > 0"
						>
							<v-slide-x-reverse-transition group hide-on-leave>
								<v-timeline-item
									v-for="(stepinpro, index) in stepInProcess"
									:key="index"
									small
									fill-dot
									color="blue darken-1"
									dark
								>
									<v-card
										:class="'rounded ' + getClass(index)"
										dark
										@click="clickToView(stepinpro)"
									>
										<v-card-title class="ml-2 p-0">
											Bước {{ index + 1 }}.

											{{ stepinpro.stepInProcessName }}
										</v-card-title>
										<v-card-text
											class="white text--primary mt-5 mr-5"
										>
											<!-- <v-row>
												<b>{{
													$t("label.description")
												}}</b
												>:
												{{ stepinpro.description }}
											</v-row> -->
											<v-row
												><b
													>{{
														$t(
															"label.organization",
														)
													}}:
												</b>
												<v-chip
													color="grey lighten-2"
													v-if="
														!!stepinpro &&
														!!stepinpro.organization &&
														!!stepinpro.organization
															.organizationName
													"
													class="black--text"
												>
													<v-avatar
														color="indigo mr-2"
														size="36"
													>
														<span
															class="white--text"
														>
															{{
																getAvatarText(
																	stepinpro
																		.organization
																		.organizationName,
																)
															}}
														</span>
													</v-avatar>
													{{
														stepinpro.organization
															.organizationName
													}}
												</v-chip>
											</v-row>
											<v-row
												><b>{{ $t("label.rank") }}: </b>
												<v-chip
													color="grey lighten-2"
													v-if="
														!!stepinpro &&
														!!stepinpro.rank &&
														!!stepinpro.rank
															.rankName
													"
													class="black--text"
												>
													<v-avatar
														color="indigo mr-2"
														size="36"
													>
														<span
															class="white--text"
														>
															{{
																getAvatarText(
																	stepinpro
																		.rank
																		.rankName,
																)
															}}
														</span>
													</v-avatar>
													{{
														stepinpro.rank.rankName
													}}
												</v-chip>
											</v-row>
											<v-row
												><b>Người xử lý: </b>
												<v-chip
													color="grey lighten-2"
													v-for="item in user_in_step[
														index
													]"
													:key="item.id"
													class="black--text"
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
													{{ item.fullName }}
												</v-chip>
											</v-row>
										</v-card-text>
									</v-card>
								</v-timeline-item>
							</v-slide-x-reverse-transition>
						</v-timeline>
					</v-col>
					<v-col cols="3" md="3">
						<h2>Thông tin chung</h2>
						<v-divider></v-divider>
						<v-list-item readonly v-model="viewProcess">
							<v-list-item-content>
								<v-list-item-title>
									<span :class="is_show_detail()">
										<b>{{ $t("label.process_name") }}</b
										>:
										<i>{{ viewProcess.processName }}</i>
									</span>
								</v-list-item-title>
								<span
									v-if="
										this.viewProcess.processName &&
										this.viewProcess.processName.length >
											50 &&
										!showName
									"
									@click="toggle_detail()"
									class="float-right"
								>
									<i><a href="#">Chi tiết</a></i>
								</span>
								<span
									v-if="showName"
									@click="toggle_detail()"
									class="float-right"
								>
									<i><a href="#">Ẩn</a></i>
								</span>
								<v-list-item-title>
									<span :class="is_show_description()">
										<b>{{ $t("label.description") }}</b
										>:
										<i>{{ viewProcess.description }}</i>
									</span>
								</v-list-item-title>
								<span
									v-if="
										this.viewProcess.description &&
										this.viewProcess.description.length >
											50 &&
										!showDescription
									"
									@click="toggle_description()"
									class="float-right"
								>
									<i><a href="#">Chi tiết</a></i>
								</span>
								<span
									v-if="showDescription"
									@click="toggle_description()"
									class="float-right"
								>
									<i><a href="#">Ẩn</a></i>
								</span>
								<v-list-item-title
									><b>{{ $t("label.created_name") }}</b
									>:
									<i>{{
										viewProcess.createdName
									}}</i></v-list-item-title
								>
								<v-list-item-title
									><b>{{ $t("label.created_date") }}</b
									>:
									<i>{{
										viewProcess.createdDate | dateToString
									}}</i></v-list-item-title
								>
								<v-list-item-title
									><b>{{ $t("label.modified_name") }}</b
									>:
									<i>{{
										viewProcess.modifiedName
									}}</i></v-list-item-title
								>
								<v-list-item-title
									><b>
										{{ $t("label.modified_date") }}
									</b>
									:
									<i>
										{{
											viewProcess.modifiedDate
												| dateToString
										}}
									</i>
								</v-list-item-title>
								<v-list-item-title>
									<div :class="is_show_organization()">
										<b>{{ $t("label.organize_use") }} </b>
										:
										<v-chip
											v-for="(
												item, index
											) in viewProcess.organizations"
											:key="index"
										>
											<v-avatar
												color="indigo mr-2"
												class="white--text"
												size="36"
											>
												<span>
													{{
														getAvatarText(
															item.organizationName,
														)
													}}
												</span>
											</v-avatar>
											{{ item.organizationName }}
										</v-chip>
									</div>
								</v-list-item-title>
								<span
									v-if="
										this.viewProcess.organizations &&
										!this.showOrganizations
									"
									@click="toggle_organization()"
									class="float-right"
								>
									<i><a href="#">Chi tiết</a></i>
								</span>
								<span
									v-if="this.showOrganizations"
									@click="toggle_organization()"
									class="float-right"
								>
									<i><a href="#">Ẩn</a></i>
								</span>
							</v-list-item-content>
						</v-list-item>
						<h2 v-if="stepInProcess.length > 0">Thông tin bước</h2>
						<v-divider></v-divider>
						<v-card-text
							class="mt-5"
							dark
							v-if="stepInProcess.length > 0"
						>
							<v-row>
								<v-text-field
									v-model="modelslt.stepInProcessName"
									:label="$t('label.step_name')"
									readonly
									outlined
									dense
									single-line
									color="primary"
								></v-text-field>
							</v-row>
							<v-row>
								<v-text-field
									v-model="modelslt.description"
									:label="$t('label.description')"
									readonly
									outlined
									dense
									single-line
								></v-text-field>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isProcessRecover"
									:label="$t('label.is_process_recover')"
									readonly
									dense
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isRequestModify"
									:label="$t('label.is_request_modify')"
									readonly
									dense
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isExamine"
									:label="$t('label.is_examine')"
									readonly
									dense
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isAuthorizedApproval"
									:label="$t('label.is_authorized_approval')"
									readonly
									dense
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.isRequiredSignature"
									:label="$t('label.is_required_signature')"
									readonly
									dense
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-checkbox
									v-model="modelslt.sendEmail"
									:label="$t('label.allow_send_email')"
									dense
									readonly
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-checkbox
									:label="$t('label.required_tfs')"
									dense
									readonly
									outlined
									single-line
								>
								</v-checkbox>
							</v-row>
							<v-row>
								<v-text-field
									v-model="modelslt.processingTerm"
									:label="$t('label.processingTerm')"
									readonly
									dense
									outlined
									single-line
									append-icon="mdi-clock"
									suffix="Giờ"
								>
								</v-text-field>
							</v-row>
							<v-row
								><v-select
									v-model="modelslt.optionDeny"
									:items="items"
									item-text="name"
									:label="$t('label.deny')"
									readonly
									dense
									outlined
								>
								</v-select>
							</v-row>
						</v-card-text>
					</v-col>
				</v-row>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						:to="{
							path:
								'/administrator/quy-trinh/' +
								this.processInfoId,
						}"
						style="text-decoration: none; margin-right: 1rem"
						color="blue darken-1"
						dark
						class="rounded-pill"
					>
						<v-icon>mdi-pencil</v-icon>
						{{ $t("button.edit") }}
					</v-btn>
					<v-divider vertical></v-divider>
					<v-btn
						color="error"
						dark
						to="/administrator/quy-trinh"
						class="rounded-pill"
					>
						<v-icon>mdi-close</v-icon>
						{{ $t("button.close") }}
					</v-btn>
				</v-card-actions>
			</v-card-text>
		</VuePerfectScrollbar>
	</v-card>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import globalService from "@/services/global.service";
export default {
	name: "ViewProcessInfo",
	components: {
		VuePerfectScrollbar,
	},
	data() {
		return {
			stepInProcess: {},
			viewProcess: {},
			processInfoId: this.$route.params.id,
			modelslt: {},
			user_in_step: [],
			items: [
				{ value: 1, name: this.$t("label.deny_1") },
				{ value: 2, name: this.$t("label.deny_2") },
				{ value: 3, name: this.$t("label.deny_3") },
			],
			showName: false,
			showDescription: false,
			showOrganizations: false,
		};
	},
	created() {
		this.$Progress.start();

		this.load();
	},
	mounted() {
		this.$Progress.finish();
	},
	methods: {
		async load() {
			let responseProcess = await globalService.getData_Async(
				"/api/process-infos/" + this.processInfoId,
			);
			if (!responseProcess || !responseProcess.state) {
				return;
			}
			this.viewProcess = responseProcess.data;
			let response = await globalService.getData_Async(
				`/api/process-infos/${this.processInfoId}/_all/step-in-processes`,
			);
			if (!response || !response.state) {
				return;
			}
			this.stepInProcess = response.data;
			for (const user of this.stepInProcess) {
				let index = this.stepInProcess.indexOf(user);
				let response = await globalService.getData_Async(
					"/api/step-in-processes/" + user.id + "/_all/user-in-steps",
				);
				if (!response || !response.state) return;
				this.user_in_step[index] = response.data;
			}
			this.modelslt = {
				createdDate: null,
				createdName: "",
				description: "",
				id: null,
				isActive: true,
				isAuthorizedApproval: false,
				isBack: false,
				isEdit: false,
				optionDeny: 1,
				sendEmail: false,
				isExamine: false,
				isRequestModify: false,
				isRequiredSignature: false,
				modifiedDate: null,
				modifiedName: "",
				processInfo: null,
				processingActiveTime: null,
				processingTerm: 0,
				processingTermTime: null,
				step: null,
				stepInProcessCode: "",
				stepInProcessName: "",
				stepOrder: 0,
				tennantCode: "",
				tennantName: "",
				organization: null,
				organizationCode: "",
				organizationName: "",
				rank: null,
			};
			this.clickToView(this.stepInProcess[0]);
		},
		getClass(index) {
			return this.indexItems == index
				? "light-blue darken-4"
				: "blue lighten-2";
		},
		clickToView(stepinpro) {
			this.modelslt = stepinpro;
			this.indexItems = this.stepInProcess.indexOf(stepinpro);
		},
		is_show_detail() {
			if (!this.showName) return "";
			return "showAllText";
		},
		toggle_detail() {
			this.showName = !this.showName;
		},
		is_show_description() {
			if (!this.showDescription) return "";
			return "showAllText";
		},
		toggle_description() {
			this.showDescription = !this.showDescription;
		},
		is_show_organization() {
			if (!this.showOrganizations) return "";
			return "showAllText";
		},
		toggle_organization() {
			this.showOrganizations = !this.showOrganizations;
		},
	},
};
</script>
<style>
.showAllText {
	white-space: normal !important;
}
</style>
