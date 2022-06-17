<template>
	<v-card>
		<!-- <v-row>
			<v-col cols="12" md="3">
				<v-select
					item-text="processName"
					v-if="
						m_requestDto.request &&
						m_requestDto.request.processInfos
					"
					:items="m_requestDto.request.processInfos"
				></v-select>
			</v-col>
			<v-col>
				<v-btn class="float-right" text @click="restoreStepInProcess">
					<v-icon>mdi-restart</v-icon> Khôi phục
				</v-btn>
			</v-col>
		</v-row> -->
		<v-row>
			<v-col>
				<v-card-text v-if="stepInProcess && stepInProcess.length > 0">
					<VuePerfectScrollbar class="scroll-area">
						<v-timeline align-top dense clipped>
							<Container>
								<v-timeline-item
									v-for="(items, index) in stepInProcess"
									:key="items.id"
									small
									fill-dot
									left
									color="green darken-5"
								>
									<div class="mb-2">
										<span
											class="text-h6 text-white rounded-pill green lighten-2 px-10 py-2"
										>
											Bước {{ index + 1 }}
										</span>
									</div>
									<Container
										class="white"
										:data-index="index"
										group-name="column"
									>
										<v-card
											v-bind:class="{
												isFocus:
													index ==
													stepInProcess.length - 1,
												['rounded bordered ' +
												getClass(index)]: true,
											}"
											:elevation="getElevation(index)"
											@click="clickToEdit(items)"
										>
											<v-card-text class="text--primary">
												<v-form>
													<template>
														<v-row
															class="subtitle-1 mx-0"
															dense
														>
															<v-col
																cols="2"
																md="2"
															>
																{{
																	$t(
																		"label.processingTerm",
																	)
																}}
															</v-col>
															<v-col
																cols="2"
																md="2"
															>
																<span
																	v-if="
																		items &&
																		items.processingTerm
																	"
																>
																	{{
																		items.processingTerm
																	}}
																	{{
																		$t(
																			"label.hours",
																		)
																	}}
																</span>
															</v-col>
															<v-col
																cols="1"
																md="1"
															>
															</v-col>
															<v-col
																cols="1"
																md="1"
															>
																Tên bước:
															</v-col>
															<v-col>
																<span
																	v-if="
																		items &&
																		items.stepDataName
																	"
																>
																	{{
																		items.stepDataName
																	}}
																</span>
															</v-col>
														</v-row>

														<v-row
															class="subtitle-1 mx-0"
														>
															<v-col
																cols="2"
																md="2"
															>
																Người xử lý:
															</v-col>

															<v-col>
																<v-chip-group>
																	<v-chip
																		v-for="item in items.userInfos"
																		:key="
																			item.id
																		"
																	>
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
																		{{
																			item.fullName
																		}}
																	</v-chip>
																</v-chip-group>
															</v-col>
														</v-row>
													</template>
												</v-form>
											</v-card-text>
											<!-- <v-btn
													class="remove-row"
													fab
													dark
													icon
													@click="removeRow(index)"
												>
													<v-icon dark>
														mdi-trash-can-outline
													</v-icon>
												</v-btn> -->
										</v-card>
									</Container>
								</v-timeline-item>
							</Container>
						</v-timeline>
					</VuePerfectScrollbar>
				</v-card-text>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "../../administrator/administrator.api";

import { Container } from "vue-dndrop";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	name: "VSMFEProcedureV3",
	components: {
		Container,
		VuePerfectScrollbar,
	},
	props: { requestDataV2: {} },
	watch: {
		requestDataV2(newValue) {
			this.m_requestDto = newValue;
		},
		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state === 1) {
				//await this.saveFormData();
			}
		},
	},
	data() {
		return {
			m_requestDto: null,
			stepInProcess: [],
			defaultStepInProcess: [],
			indexItems: 0,
			userFilters: [],
			showUser: [],
		};
	},
	async created() {
		this.m_requestDto = this.requestDataV2;
		console.log("this.m_requestDto ", this.m_requestDto);
	},

	mounted() {
		this.getStepInProcesses();
		this.getAllUser();
	},

	methods: {
		async getStepInProcesses() {
			let response;
			try {
				console.log("m_request", this.m_requestDto);
				response = await globalService.getData_Async(
					administratorAPI.API_GetSteepDataByIdRequest(
						this.m_requestDto.id,
					),
				);
				console.log("response", response);
				if (!response || !response.state) {
					return;
				}

				this.stepInProcess = response.data.filter((entry) => {
					entry.showHandler = false;
					return entry;
				});
				// this.stepInProcess = this.cloneArray(
				// 	this.stepInProcess,
				// 	this.defaultStepInProcess,
				// );
				//this.idStepData = 1;
				//this.$emit("saveStepData", this.idStepData);
			} catch (error) {
				this.toastError(error);
				return;
			}
		},
		async getAllUser() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllUserInfo(),
				);
				if (!response || !response.state) {
					return;
				}
				this.userFilters = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error);
			}
		},
		getElevation(index) {
			return this.indexItems == index ? 2 : 0;
		},
		clickToEdit(items) {
			if (!items) return;
			this.indexItems = this.stepInProcess.indexOf(items);
		},
		getClass(index) {
			return this.indexItems == index
				? "grey lighten-2"
				: "grey lighten-3";
		},
		selectHandler(item, index) {
			this.stepInProcess[index].userInfos.push(item);
		},
		remove(item) {
			if (
				!this.stepInProcess[this.indexItems].userInfos ||
				this.stepInProcess[this.indexItems].userInfos.length == 0
			) {
				return;
			}
			this.stepInProcess[this.indexItems].userInfos.splice(
				this.stepInProcess[this.indexItems].userInfos.indexOf(item),
				1,
			);
			this.stepInProcess[this.indexItems].userInfos = [
				...this.stepInProcess[this.indexItems].userInfos,
			];
		},
		restoreStepInProcess() {
			// this.stepInProcess = this.cloneArray(
			// 	this.stepInProcess,
			// 	this.defaultStepInProcess,
			// );
		},
		// cloneArray(targetArayy, sourceArray) {
		// 	if (!sourceArray) return sourceArray;
		// 	targetArayy = sourceArray.map((ele) => this.cloneObject({}, ele));
		// 	return targetArayy;
		// },
		// cloneObject(targetObject, sourceObject) {
		// 	if (!sourceObject) return {};
		// 	targetObject = Object.assign({}, sourceObject);
		// 	for (let prop in sourceObject) {
		// 		if (typeof sourceObject[prop] == "object") {
		// 			targetObject[prop] = this.cloneObject(
		// 				targetObject[prop],
		// 				sourceObject[prop],
		// 			);
		// 		}
		// 	}
		// 	return targetObject;
		// },
	},
};
</script>

<style lang="scss" scoped></style>
