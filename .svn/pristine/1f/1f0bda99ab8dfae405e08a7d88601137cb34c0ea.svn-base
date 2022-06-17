<template>
	<v-card elevation="0">
		<v-row class="mx-2">
			<v-col cols="12" md="10" class="d-flex">
				<v-col cols="12" md="6">
					<div class="mx-10">
						<v-row>
							<v-list-item-title>
								<span :class="is_show_detail()">
									<b>{{ $t("label.process_name") }}</b
									>:
									<i>{{ this.processInfoDto.processName }}</i>
								</span>
							</v-list-item-title>
							<span
								v-if="
									this.processInfoDto.processName &&
									this.processInfoDto.processName.length >
										65 &&
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
						</v-row>
						<v-row>
							<v-list-item-title>
								<b>{{ $t("label.description") }}</b
								>: <i>{{ this.processInfoDto.description }}</i>
							</v-list-item-title>
							<span
								v-if="
									this.processInfoDto.description &&
									this.processInfoDto.description.length >
										65 &&
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
						</v-row>
					</div>
				</v-col>
				<v-col>
					<div class="mx-10">
						<v-row>
							<v-list-item-title>
								<b>{{ $t("label.created_name") }}</b
								>:
								<v-chip v-if="processInfoDto.createdName">
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													user_current.createdName,
												)
											}}
										</span>
									</v-avatar>
									{{ this.processInfoDto.createdName }}
								</v-chip>
								<v-chip v-if="!processInfoDto.createdName">
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													user_current.createdName,
												)
											}}
										</span>
									</v-avatar>
									{{ this.user_current.createdName }}
								</v-chip>
							</v-list-item-title>
						</v-row>
						<v-row>
							<v-list-item-title>
								<b>{{ $t("label.created_date") }}</b
								>:
								<i>{{
									this.processInfoDto.createdDate
										| dateToString
								}}</i>
							</v-list-item-title>
						</v-row>
					</div>
				</v-col>
				<v-col>
					<div class="mx-10">
						<v-row>
							<v-list-item-title>
								<b>{{ $t("label.modified_name") }}</b
								>:
								<v-chip v-if="processInfoDto.modifiedName">
									<v-avatar color="indigo mr-2" size="36">
										<span class="white--text">
											{{
												getAvatarText(
													processInfoDto.modifiedName,
												)
											}}
										</span>
									</v-avatar>
									{{
										this.processInfoDto.modifiedName
									}}</v-chip
								>
							</v-list-item-title>
						</v-row>
						<v-row>
							<v-list-item-title>
								<b>{{ $t("label.modified_date") }}</b
								>:
								<i>{{
									this.processInfoDto.modifiedDate
										| dateToString
								}}</i>
							</v-list-item-title>
						</v-row>
					</div>
				</v-col>
			</v-col>
			<!-- <v-col>
				<div class="d-flex justify-end">
					<v-btn
						elevation="0"
						color="blue"
						dark
						class="rounded-pill"
						@click="save"
					>
						<v-icon> mdi-content-save </v-icon>
						{{ $t("button.save") }}
					</v-btn>

					<v-btn
						elevation="0"
						color="red"
						dark
						@click="processes = ProcessInfoDTO"
						class="rounded-pill ml-2"
						to="/administrator/quy-trinh"
					>
						<v-icon>mdi-close</v-icon>
						{{ $t("button.close") }}
					</v-btn>
				</div>
			</v-col> -->
		</v-row>
		<v-divider class="mt-5"></v-divider>
		<v-btn text @click="showStep = !showStep">
			<v-icon> mdi-plus </v-icon>
			Tạo mới
		</v-btn>
		<v-row class="mt-2">
			<v-col cols="12" md="2" v-if="showStep">
				<VuePerfectScrollbar class="scroll-area">
					<Container
						class="w-full pr-4"
						group-name="column"
						:get-child-payload="
							(itemIndex) => getChildPayload_Selector(itemIndex)
						"
					>
						<Draggable
							class="mb-3 rounded"
							v-for="(step, index) in steps"
							:key="'step_' + index"
						>
							<!-- <div class="draggable-item">
								<v-row>
									<v-col>
										{{ step.stepName }}
									</v-col>
								</v-row>
							</div> -->
							<v-expansion-panels hover focusable>
								<v-expansion-panel class="draggable-item">
									<v-expansion-panel-header
										class="text-xl bordered px-0"
									>
										<v-row class="m-0 p-0">
											<v-col cols="12" md="2">
												<v-app-bar-nav-icon></v-app-bar-nav-icon>
											</v-col>
											<v-col cols="12" md="10">
												<b>{{ step.stepName }}</b>
											</v-col>
										</v-row>
									</v-expansion-panel-header>
									<v-expansion-panel-content
										class="grey lighten-3"
									>
										<p>
											<b>
												{{
													$t(
														"label.is_authorized_approval",
													)
												}}</b
											>:
											<i>
												{{
													step.isAuthorizedApproval
														? "Có"
														: "Không"
												}}
											</i>
										</p>
										<p>
											<b>{{ $t("label.is_examine") }}</b
											>:
											<i>{{
												step.isExamine ? "Có" : "Không"
											}}</i>
										</p>
										<p>
											<b>{{
												$t("label.is_request_modify")
											}}</b
											>:
											<i>{{
												step.isRequestModify
													? "Có"
													: "Không"
											}}</i>
										</p>
										<p>
											<b>{{
												$t(
													"label.is_required_signature",
												)
											}}</b
											>:
											<i>
												{{
													step.isRequiredSignature
														? "Có"
														: "Không"
												}}
											</i>
										</p>
										<p>
											<b>{{
												$t("label.is_process_recover")
											}}</b
											>:
											<i>
												{{
													step.isProcessRecover
														? "Có"
														: "Không"
												}}
											</i>
										</p>
										<p>
											<b>
												{{
													$t("label.processing_term")
												}}
											</b>
											:
											<i v-if="step.processingTerm">
												{{ step.processingTerm }}
												{{ $t("label.hours") }}
											</i>
										</p>
										<p>
											<b>
												{{ $t("label.organization") }}
											</b>
											:
											<i
												v-if="
													step.organization &&
													step.organization
														.organizationName
												"
											>
												{{
													step.organization
														.organizationName
												}}
											</i>
										</p>
										<p>
											<b>
												{{ $t("label.rank") }}
											</b>
											:
											<i
												v-if="
													step.rank &&
													step.rank.rankName
												"
											>
												{{ step.rank.rankName }}
											</i>
										</p>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</Draggable>
					</Container>
				</VuePerfectScrollbar>
			</v-col>
			<v-divider vertical></v-divider>
			<v-col>
				<v-card-text>
					<VuePerfectScrollbar class="scroll-area">
						<v-timeline align-top dense clipped>
							<Container
								:class="returnHover()"
								:get-child-payload="
									(itemIndex) => getChildPayload(itemIndex)
								"
								:should-accept-drop="
									(src, payload) => getdAcceptDrop(src)
								"
								:should-animate-drop="
									(src, payload) => getShouldAnimateDrop()
								"
								@drop="onDrop($event)"
							>
								<v-timeline-item
									v-for="(items, index) in groups"
									:key="index"
									small
									fill-dot
									left
									color="green darken-5"
								>
									<template v-slot:icon>
										<div class="gr_button">
											<v-btn
												class="red"
												dark
												small
												icon
												@click="removeRow(index)"
											>
												<v-icon>
													mdi-trash-can-outline
												</v-icon>
											</v-btn>
											<v-btn
												class="blue mt-1"
												dark
												small
												icon
												@click="addColumn()"
											>
												<v-icon> mdi-plus </v-icon>
											</v-btn>
										</div>
									</template>
									<Container
										class="white"
										:data-index="index"
										group-name="column"
										:get-child-payload="
											(itemIndex) =>
												getChildPayload(itemIndex)
										"
										:should-accept-drop="
											(src, payload) =>
												getShouldAcceptDrop(src)
										"
										:should-animate-drop="
											(src, payload) =>
												getShouldAnimateDrop()
										"
										@drop="onDropStep(index, $event, false)"
									>
										<Draggable>
											<v-card
												v-bind:class="{
													isFocus:
														index ==
														groups.length - 1,
													['rounded bordered ' +
													getClass(index)]: true,
												}"
												:elevation="getElevation(index)"
												@click="
													clickToEdit(items, index)
												"
												:id="`step` + index"
											>
												<v-card-text
													class="text--primary"
													@click="clickTarget($event)"
												>
													<v-form>
														<div
															class="text-h6 mb-2"
														>
															Bước
															{{ index + 1 }}.
															<span
																v-if="
																	!!items &&
																	!!items.stepInProcessName
																"
																class="h3"
															>
																{{
																	items.stepInProcessName
																}}
															</span>
														</div>
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
																<v-col>
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
															</v-row>
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
																			"label.organization",
																		)
																	}}
																</v-col>
																<v-col
																	cols="1"
																	md="1"
																>
																	<v-icon
																		color="blue"
																		@click="
																			showOrganize[
																				index
																			] =
																				!showOrganize[
																					index
																				]
																		"
																		class="text--blue"
																	>
																		mdi-domain-plus
																	</v-icon>
																</v-col>
																<v-col
																	v-if="
																		!showOrganize[
																			index
																		] &&
																		!!items &&
																		!!items.organization
																	"
																>
																	<v-chip>
																		<v-avatar
																			color="indigo mr-2"
																			size="36"
																		>
																			<span
																				class="white--text"
																			>
																				{{
																					getAvatarText(
																						items
																							.organization
																							.organizationName,
																					)
																				}}
																			</span>
																		</v-avatar>
																		{{
																			items
																				.organization
																				.organizationName
																		}}
																	</v-chip>
																</v-col>
																<v-col
																	v-if="
																		showOrganize[
																			index
																		]
																	"
																>
																	<v-combobox
																		v-model="
																			items.organization
																		"
																		:items="
																			listOrganize
																		"
																		item-text="organizationName
																	"
																		:item-value="
																			(
																				item,
																			) =>
																				item
																		"
																		:label="
																			$t(
																				`label.organization`,
																			)
																		"
																		dense
																		clearable
																		outlined
																		@click:clear="
																			removeOrganization(
																				index,
																			)
																		"
																	>
																		<template
																			v-slot:label
																		>
																			<span
																				class="text--primary"
																			>
																				{{
																					$t(
																						`label.organization`,
																					)
																				}}
																			</span>
																		</template>
																		<template
																			v-slot:item="{
																				item,
																			}"
																		>
																			<v-list-item
																				@click="
																					selectOrganization(
																						item,
																						index,
																					)
																				"
																				class="m-1"
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
																								item.organizationName,
																							)
																						}}
																					</span>
																				</v-avatar>
																				{{
																					item.organizationName
																				}}
																			</v-list-item>
																		</template>
																		<template
																			v-slot:selection="{
																				attrs,
																				item,
																			}"
																		>
																			<v-chip
																				v-if="
																					!!item &&
																					!!item.id
																				"
																				v-bind="
																					attrs
																				"
																				class="mt-2"
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
																								item.organizationName,
																							)
																						}}
																					</span>
																				</v-avatar>
																				{{
																					item.organizationName
																				}}
																			</v-chip>
																		</template>
																	</v-combobox>
																</v-col>
															</v-row>

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
																			"label.rank",
																		)
																	}}
																</v-col>
																<v-col
																	cols="1"
																	md="1"
																>
																	<v-icon
																		color="blue"
																		@click="
																			showRank[
																				index
																			] =
																				!showRank[
																					index
																				]
																		"
																		class="text--blue"
																	>
																		mdi-domain-plus
																	</v-icon>
																</v-col>
																<v-col
																	v-if="
																		showRank[
																			index
																		]
																	"
																>
																	<v-combobox
																		v-model="
																			items.rank
																		"
																		:items="
																			listRank
																		"
																		item-text="rankName"
																		:item-value="
																			(
																				item,
																			) =>
																				item
																		"
																		:label="
																			$t(
																				`label.rank`,
																			)
																		"
																		dense
																		clearable
																		outlined
																		@click:clear="
																			removeRank(
																				index,
																			)
																		"
																	>
																		<template
																			v-slot:label
																		>
																			<span
																				class="text--blue"
																			>
																				{{
																					$t(
																						`label.rank`,
																					)
																				}}
																			</span>
																		</template>
																		<template
																			v-slot:item="{
																				item,
																			}"
																		>
																			<v-list-item
																				@click="
																					selectRank(
																						item,
																						index,
																					)
																				"
																				class="m-1"
																			>
																				<v-list-item-avatar>
																					<v-avatar
																						color="indigo mr-2"
																						size="36"
																					>
																						<span
																							class="white--text"
																						>
																							{{
																								getAvatarText(
																									item.rankName,
																									2,
																								)
																							}}
																						</span>
																					</v-avatar>
																				</v-list-item-avatar>
																				<v-list-item-content>
																					<v-list-item-title
																						v-html="
																							item.rankName
																						"
																					>
																					</v-list-item-title>
																					<v-list-item-subtitle
																						v-if="
																							item.organization &&
																							item
																								.organization
																								.organizationName
																						"
																					>
																						{{
																							item
																								.organization
																								.organizationName
																						}}
																					</v-list-item-subtitle>
																				</v-list-item-content>
																			</v-list-item>
																		</template>

																		<template
																			v-slot:selection="{
																				attrs,
																				item,
																			}"
																		>
																			<v-chip
																				v-if="
																					!!item &&
																					!!item.id
																				"
																				v-bind="
																					attrs
																				"
																				class="mt-2"
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
																								item.rankName,
																								2,
																							)
																						}}
																					</span>
																				</v-avatar>
																				{{
																					item.rankName
																				}}
																			</v-chip>
																		</template>
																	</v-combobox>
																</v-col>
																<v-col
																	v-if="
																		!showRank[
																			index
																		] &&
																		!!items &&
																		!!items.rank
																	"
																>
																	<i
																		v-if="
																			!!items.rank
																		"
																	>
																		<v-chip
																			class="mt-2"
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
																							items
																								.rank
																								.rankName,
																						)
																					}}
																				</span>
																			</v-avatar>
																			{{
																				items
																					.rank
																					.rankName
																			}}
																		</v-chip>
																	</i>
																</v-col>
															</v-row>
															<v-row
																class="subtitle-1 mx-0"
																dense
															>
																<v-col
																	cols="2"
																	md="2"
																>
																	Người xử lý:
																</v-col>
																<v-col
																	cols="1"
																	md="1"
																>
																	<v-icon
																		color="blue"
																		@click="
																			showHandler[
																				index
																			] =
																				!showHandler[
																					index
																				]
																		"
																		class="text--blue"
																	>
																		mdi-account-plus
																	</v-icon>
																</v-col>
																<v-col
																	v-if="
																		showHandler[
																			index
																		]
																	"
																>
																	<v-combobox
																		v-model="
																			items.userInStepDTOs
																		"
																		:items="
																			userFilters
																		"
																		item-text="fullName"
																		chips
																		clearable
																		hide-selected
																		:label="
																			$t(
																				`label.handler`,
																			)
																		"
																		multiple
																		dense
																		outlined
																		@click:clear="
																			removeHandler()
																		"
																	>
																		<template
																			v-slot:label
																		>
																			<span
																				class="text--primary"
																			>
																				{{
																					$t(
																						`label.handler`,
																					)
																				}}
																			</span>
																		</template>

																		<template
																			v-slot:item="{
																				item,
																			}"
																		>
																			<v-list-item
																				@click="
																					selectHandler(
																						item,
																						index,
																					)
																				"
																				class="m-1"
																			>
																				<v-list-item-avatar>
																					<v-avatar
																						color="indigo mr-2"
																						size="36"
																					>
																						<span
																							class="white--text"
																						>
																							{{
																								getAvatarText(
																									item.fullName,
																									2,
																								)
																							}}
																						</span>
																					</v-avatar>
																				</v-list-item-avatar>
																				<v-list-item-content>
																					<v-list-item-title
																						v-html="
																							item.fullName
																						"
																					>
																					</v-list-item-title>
																				</v-list-item-content>
																			</v-list-item>
																		</template>

																		<template
																			v-slot:selection="{
																				attrs,
																				item,
																			}"
																		>
																			<v-chip
																				v-if="
																					!!item &&
																					!!item.id
																				"
																				v-bind="
																					attrs
																				"
																				class="mt-2"
																				close
																				@click:close="
																					remove(
																						item,
																					)
																				"
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
																								item.fullName,
																								2,
																							)
																						}}
																					</span>
																				</v-avatar>
																				{{
																					item.fullName
																				}}
																			</v-chip>
																		</template>
																	</v-combobox>
																</v-col>
																<v-col
																	v-if="
																		!showHandler[
																			index
																		] &&
																		items &&
																		items.userInStepDTOs
																	"
																>
																	<v-chip-group>
																		<v-chip
																			v-for="item in items.userInStepDTOs"
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
										</Draggable>
									</Container>
								</v-timeline-item>
							</Container>
						</v-timeline>
					</VuePerfectScrollbar>
				</v-card-text>
			</v-col>
			<v-divider vertical></v-divider>

			<v-col cols="12" md="3">
				<v-card
					v-if="groups.length > 0"
					v-click-outside="onClickOutside"
				>
					<v-card-text>
						<v-container>
							<v-row>
								<v-text-field
									v-model="modelslt.stepInProcessName"
									ref="stepInProcessName"
									dense
									:rules="[
										() =>
											modelslt.stepInProcessName.trim()
												.length < 255 ||
											$t('error.max_length_255'),
									]"
									outlined
									:error-messages="requiredStepInProcessName"
									@keyup="onchangeStepName"
								>
									<template v-slot:label>
										{{ $t("label.stepInProcess_name") }}
										<span class="text-red">{{
											$t("label.star")
										}}</span>
									</template>
								</v-text-field></v-row
							>
							<v-row>
								<v-text-field
									dense
									outlined
									v-model="modelslt.description"
									:label="this.$t(`label.description`)"
									:rules="[
										() =>
											modelslt.description.trim().length <
												255 ||
											$t('error.max_length_255'),
									]"
								></v-text-field
							></v-row>
							<v-row>
								<v-text-field
									v-click-outside="
										onClickOutsideProcessingTerm
									"
									ref="processingTerm"
									:rules="[
										(val) =>
											val >= 0 ||
											$t('label.require_processing_term'),
									]"
									dense
									type="number"
									outlined
									v-model="modelslt.processingTerm"
									:label="$t('label.processingTerm')"
									append-icon="mdi-clock"
									suffix="Giờ"
									:error-messages="errorProcessingTerm"
									@keyup="onchangeProcessingTerm"
								>
								</v-text-field>
							</v-row>
							<v-row>
								<v-combobox
									ref="cbbOrganization"
									dense
									v-model="modelslt.organization"
									:items="listOrganize"
									item-text="organizationName"
									:item-value="(item) => item"
									:label="this.$t(`label.organization`)"
									clearable
									outlined
									@click:clear="removeOrganization(null)"
								>
									<template v-slot:item="{ item }">
										<v-list-item
											@click="
												selectOrganizationStep(item)
											"
											class="m-1"
										>
											<v-avatar
												color="indigo mr-2"
												size="36"
											>
												<span class="white--text">
													{{
														getAvatarText(
															item.organizationName,
															2,
														)
													}}
												</span>
											</v-avatar>
											{{ item.organizationName }}
										</v-list-item>
									</template>
									<template
										v-slot:selection="{ attrs, item }"
									>
										<v-chip
											v-if="!!item && !!item.id"
											v-bind="attrs"
											class="mt-2"
										>
											<v-avatar
												color="indigo mr-2"
												size="36"
											>
												<span class="white--text">
													{{
														getAvatarText(
															item.organizationName,
															2,
														)
													}}
												</span>
											</v-avatar>
											{{ item.organizationName }}
										</v-chip>
									</template>
								</v-combobox>
							</v-row>

							<v-row>
								<v-combobox
									ref="cbbRank"
									dense
									v-model="modelslt.rank"
									:items="listRank"
									item-text="rankName"
									:item-value="(item) => item"
									label="Vai trò"
									clearable
									outlined
									@click:clear="removeRank(null)"
									maxlength="255"
								>
									<template v-slot:item="{ item }">
										<v-list-item
											@click="selectRankStep(item)"
											class="m-1"
										>
											<v-list-item-avatar>
												<v-avatar
													color="indigo mr-2"
													size="36"
												>
													<span class="white--text">
														{{
															getAvatarText(
																item.rankName,
																2,
															)
														}}
													</span>
												</v-avatar>
											</v-list-item-avatar>
											<v-list-item-content>
												<v-list-item-title
													v-html="item.rankName"
												>
												</v-list-item-title>
												<v-list-item-subtitle
													v-if="
														modelslt.organization &&
														modelslt.organization
															.organizationName
													"
												>
													{{
														modelslt.organization
															.organizationName
													}}
												</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</template>
									<template
										v-slot:selection="{ attrs, item }"
									>
										<v-chip
											v-if="!!item && !!item.id"
											v-bind="attrs"
											class="mt-2"
										>
											<v-avatar
												color="indigo mr-2"
												size="36"
											>
												<span class="white--text">
													{{
														getAvatarText(
															item.rankName,
															2,
														)
													}}
												</span>
											</v-avatar>
											{{ item.rankName }}
										</v-chip>
									</template>
								</v-combobox>
							</v-row>
							<v-row>
								<v-combobox
									v-model="modelslt.userInStepDTOs"
									:items="userFilters"
									item-text="fullName"
									:item-value="(item) => item"
									chips
									clearable
									hide-selected
									:label="$t(`label.handler`)"
									multiple
									dense
									outlined
									@click:clear="removeHandler"
								>
									<template v-slot:item="{ item }">
										<v-list-item
											@click="selectHandlerStep(item)"
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
												</v-list-item-avatar>
												<v-list-item-content>
													<v-list-item-title
														v-html="item.fullName"
													>
													</v-list-item-title>
													<v-list-item-subtitle
														v-if="
															modelslt.userInStepDTOs &&
															modelslt
																.userInStepDTOs
																.fullName
														"
													>
														{{
															modelslt
																.userInStepDTOs
																.fullName
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
											v-if="!!item && !!item.id"
											v-bind="attrs"
											class="mt-2"
											close
											@click:close="
												removeUserInStep(item)
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
											{{ item.fullName }}
										</v-chip>
									</template>
								</v-combobox>
							</v-row>
							<v-row>
								<v-checkbox
									dense
									label="Được phép xóa"
								></v-checkbox
							></v-row>
							<v-row>
								<v-checkbox
									dense
									v-model="modelslt.isEdit"
									:label="$t('label.is_edit')"
								></v-checkbox
							></v-row>

							<v-row>
								<v-checkbox
									v-model="modelslt.isRecall"
									dense
									:label="$t('label.is_recall')"
								>
								</v-checkbox>
							</v-row>

							<v-row align="center">
								<v-checkbox
									v-model="modelslt.isCreateOPTLink"
									dense
									:label="$t('label.is_createdOTP')"
								></v-checkbox
							></v-row>

							<!-- //////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isBack"
									:label="$t('label.is_back')"
									class="shrink mr-2 mt-0"
								></v-checkbox>
							</v-row>

							<!-- //////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isSendNoticePriority"
									:label="$t('label.is_send_priority')"
									class="shrink mr-2 mt-0"
								></v-checkbox>
							</v-row>

							<!-- ///////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isCreateContract"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.is_create_contract')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isCreateContract">
								<v-col cols="12" md="12">
									<v-select
										dense
										outlined
										:label="
											$t('label.type_create_contract')
										"
									>
									</v-select>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										dense
										outlined
										:label="
											$t('label.type_process_contract')
										"
									>
									</v-select>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="
											$t('label.all_contract_totrinh')
										"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="
											$t('label.all_contract_pheduyet')
										"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										outlined
										:label="$t('label.status')"
									>
									</v-select>
								</v-col>
							</v-row>

							<!-- /////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isExamine"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.is_examine')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isExamine">
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										outlined
										:label="$t('label.status')"
									>
									</v-select>
								</v-col>
							</v-row>

							<!-- ////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isApprove"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.approve')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isApprove">
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										outlined
										:label="$t('label.status')"
									>
									</v-select>
								</v-col>
							</v-row>

							<!-- ////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isDeny"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="this.$t('label.deny')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isDeny">
								<v-select
									dense
									v-model="modelslt.optionDeny"
									:items="filterItems"
									item-text="value"
									:item-value="(item) => item.id"
									:label="$t('label.deny')"
									outlined
								></v-select>
							</v-row>
							<v-row v-if="modelslt.optionDeny == 3">
								<v-select
									:items="groups"
									item-text="stepInProcessName"
								>
									<template v-slot:item="{ item }">
										<v-list-item
											@click="o_selectOptionDeny(item)"
										>
											{{ item.stepInProcessName }}
										</v-list-item>
									</template>
								</v-select>
							</v-row>
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isRequiredSignature"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="
										this.$t(`label.is_required_signature`)
									"
								>
								</v-text-field>
							</v-row>

							<v-row v-if="modelslt.isRequiredSignature">
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										outlined
										:label="$t('label.status')"
									>
									</v-select>
								</v-col>
							</v-row>
							<!-- //////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isExportPDF"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.exportPdf')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isExportPDF">
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.exportPdf')"
									></v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.watermark')"
									></v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.qr_code')"
									></v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										outlined
										:label="$t('label.status')"
									>
									</v-select>
								</v-col>
							</v-row>

							<!-- ////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isSaveDoc"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.is_saveDoc')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isSaveDoc">
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.change_handler')"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.is_save')"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										:label="$t('label.status')"
										outlined
									></v-select>
								</v-col>
							</v-row>
							<!-- /////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isManageStamp"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.manage_stamp')"
								>
								</v-text-field>
							</v-row>
							<v-row v-if="modelslt.isManageStamp">
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										:label="$t('label.status')"
										outlined
									></v-select>
								</v-col>
							</v-row>
							<!-- ////// -->
							<v-row align="center">
								<v-checkbox
									dense
									v-model="modelslt.isSendMail"
									hide-details
									class="shrink mr-2 mt-0"
								></v-checkbox>
								<v-text-field
									readonly
									append-icon="mdi-chevron-down"
									:label="$t('label.allow_send_email')"
								>
								</v-text-field>
							</v-row>

							<v-row v-if="modelslt.isSendMail">
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.auto_send_email')"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										dense
										:label="$t('label.form_email')"
										outlined
									></v-select>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.send_otp')"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.attach_pdf')"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-checkbox
										dense
										:label="$t('label.new_email')"
									>
									</v-checkbox>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										:items="listStatus"
										item-text="statusName"
										:item-value="(item) => item"
										dense
										:label="$t('label.status')"
										outlined
									></v-select>
								</v-col>
							</v-row>
							<v-row>
								<v-select
									:items="listStatus"
									item-text="statusName"
									:item-value="(item) => item"
									:label="$t('label.status')"
									outlined
									dense
								>
								</v-select>
							</v-row>
						</v-container>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag } from "@/utils/helpers";
import Vue from "vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import globalService from "@/services/global.service";
import constant from "@/common/constant.js";
import ProcessInfoDTO from "@/models/process-info.dto";
import administratorAPI from "../administrator.api";
export default {
	name: "EditProcessInfoDetailVue",
	components: {
		Container,
		Draggable,
		VuePerfectScrollbar,
	},
	props: {
		processInfoDto: ProcessInfoDTO,
		isSaved: {},
	},
	data() {
		return {
			user_current: this.getUserInfo(),
			isDeny: false,
			showStep: false,
			tab: 0,
			ProcessInfoDTO: ProcessInfoDTO,
			filterItems: [
				{ id: -1, value: this.$t("label.deny_1") },
				{ id: -2, value: this.$t("label.deny_2") },
				{ id: 3, value: this.$t("label.deny_3") },
			],
			listStatus: [],
			showOrganize: [],
			showRank: [],
			showHandler: [],
			listOrganize: [],
			user_in_step: [],
			NguoiXuLy: [],
			userFilters: [],
			listRank: [],
			selected: [],
			searchNguoiXuLy: "",
			stepInProcess: [],
			deleteStepInProcessArr: [],
			deleteUserInStepArr: [],
			beforeDelete: [],
			indexItems: 0,
			dateFormat: "DD/MM/yyyy",
			processes: this.processInfoDto,
			itemid: this.$route.params.id,
			modelslt: {
				created: null,
				createdDate: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				description: "",
				id: null,
				isActive: false,
				isApprove: false,
				isAuthorizedApproval: false,
				isBack: false,
				isChangeStatus: false,
				isCreateContract: false,
				isCreateOPTLink: false,
				isCreateOfficalDispath: false,
				isCreateReport: false,
				isCreateTFSTask: false,
				isDeny: false,
				isEdit: false,
				isExamine: false,
				isExportPDF: false,
				isManageStamp: false,
				isProcessRecover: false,
				isRecall: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSaveDoc: false,
				isSendMail: false,
				isSendNoticePriority: false,
				modified: null,
				modifiedDate: null,
				modifiedName: "",
				optionDeny: 1,
				organization: null,
				organizationCode: "",
				organizationName: "",
				processInfo: null,
				processingActiveTime: null,
				processingTerm: 0,
				processingTermTime: null,
				rank: null,
				rankCode: "",
				rankName: "",
				step: null,
				stepInProcessCode: "",
				stepInProcessName: "",
				stepOrder: 0,
				tennant: null,
				tennantCode: "",
				tennantName: "",
				userInStepDTOs: [],
			},
			defaultItem: {
				created: null,
				createdDate: null,
				createdName: "",
				createdOrgName: "",
				createdRankName: "",
				description: "",
				id: null,
				isActive: false,
				isApprove: false,
				isAuthorizedApproval: false,
				isBack: false,
				isChangeStatus: false,
				isCreateContract: false,
				isCreateOPTLink: false,
				isCreateOfficalDispath: false,
				isCreateReport: false,
				isCreateTFSTask: false,
				isDeny: false,
				isEdit: false,
				isExamine: false,
				isExportPDF: false,
				isManageStamp: false,
				isProcessRecover: false,
				isRecall: false,
				isRequestModify: false,
				isRequiredSignature: false,
				isSaveDoc: false,
				isSendMail: false,
				isSendNoticePriority: false,
				modified: null,
				modifiedDate: null,
				modifiedName: "",
				optionDeny: 1,
				organization: null,
				organizationCode: "",
				organizationName: "",
				processInfo: null,
				processingActiveTime: null,
				processingTerm: 0,
				processingTermTime: null,
				rank: null,
				rankCode: "",
				rankName: "",
				step: null,
				stepInProcessCode: "",
				stepInProcessName: "",
				stepOrder: 0,
				tennant: null,
				tennantCode: "",
				tennantName: "",
				userInStepDTOs: [],
			},
			groups: [],
			steps: [],
			previousItems: null,
			nextItems: null,
			indexA: null,
			indexB: null,
			showName: false,
			showDescription: false,
			is_add: false,
			listArrRank: [],
			isRankLoad: false,
			listArrHandler: [],
			isHandlerLoad: false,
			requiredStepInProcessName: "",
			errorProcessingTerm: "",
			regex: /^[0-9]{1,2}(\.[0-9])?$/,
			errFomat: false,
			dragg: false,
			m_isSaved: 0,
		};
	},
	watch: {
		processInfoDto(value) {
			this.processes = value;
		},
		selected() {
			this.searchNguoiXuLy = "";
		},
		async isSaved(value) {
			this.m_isSaved = value;
			if (this.m_isSaved.state == 2) {
				this.save();
			}
		},
	},
	async created() {
		await this.getAllStepInProcess();
		await this.getAllStep();
		await this.getAllUser();
		await this.getAllRank();
		await this.getAllOrganize();
		this.getAllStatus();
		this.user_in_step = {
			avatar: "",
			created: this.getUserInfo(),
			createdDate: new Date(),
			createdName: this.getUserInfo().fullName,
			description: "",
			id: null,
			isActive: true,
			modified: this.getUserInfo(),
			modifiedDate: new Date(),
			modifiedName: this.getUserInfo().fullName,
			stepInProcess: null,
			userInfo: null,
			fullName: "",
		};
		this.m_isSaved = this.isSaved;
		if (this.itemid) {
			this.clickToEdit(this.stepInProcess[0]);
		}
		if (!this.itemid) {
			this.addColumn();
			this.groups[0].stepInProcessName = "Soạn thảo";
		}
	},

	updated() {
		if (this.is_add) {
			let theTemp = document.getElementsByClassName("isFocus");
			theTemp = theTemp.length >= 0 ? theTemp[0] : null;
			if (theTemp) theTemp.focus();
			this.scrollToView(this.groups.length - 1);
			this.is_add = false;
		}
	},

	computed: {
		allSelected() {
			return this.selected.length === this.NguoiXuLy.length;
		},
		categories() {
			const search = this.searchNguoiXuLy.toLowerCase();

			if (!search) return this.NguoiXuLy;

			return this.NguoiXuLy.filter((item) => {
				const text = item.fullName.toLowerCase();

				return text.indexOf(search) > -1;
			});
		},
		selections() {
			const selections = [];
			for (const selection of this.groups[this.indexItems]
				.userInStepDTOs) {
				selections.push(selection);
			}

			return selections;
		},
		form() {
			return {
				stepInProcessName: this.modelslt.stepInProcessName,
			};
		},
		modelsltOrganization: {
			get: function () {
				return this.modelslt.organization;
			},
			set: function (value) {
				if (!value) return;
				if (!this.isObject(value)) return;
				this.modelslt.organization = value;
			},
		},
	},
	methods: {
		remove(item) {
			this.modelslt.userInStepDTOs.splice(
				this.modelslt.userInStepDTOs.indexOf(item),
				1,
			);
			if (
				!this.groups[this.indexItems].userInStepDTOs ||
				this.groups[this.indexItems].userInStepDTOs.length == 0
			) {
				return;
			}
			this.groups[this.indexItems].userInStepDTOs.splice(
				this.groups[this.indexItems].userInStepDTOs.indexOf(item),
				1,
			);
			this.groups[this.indexItems].userInStepDTOs = [
				...this.groups[this.indexItems].userInStepDTOs,
			];
			this.deleteUserInStepArr.push(item);
		},
		removeUserInStep(item) {
			this.modelslt.userInStepDTOs.splice(
				this.modelslt.userInStepDTOs.indexOf(item),
				1,
			);
			this.beforeDelete.push(item);
		},
		async getAllStatus() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllStatus(),
			);
			if (!response || !response.state)
				return this.toastError(this.$t("error.load"));
			this.listStatus = response.data;
		},
		async getAllOrganize() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_FindAllOrganization(),
				);
				if (!response || !response.state) {
					return;
				}
				this.listOrganize = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error);
			}
		},
		async getAllRank() {
			try {
				let response = await globalService.getData_Async(
					administratorAPI.API_GetAllRank(),
				);
				if (!response || !response.state) {
					return;
				}
				this.listRank = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			} catch (error) {
				this.toastError(error);
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
				this.NguoiXuLy = response.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
				this.userFilters = this.NguoiXuLy;
			} catch (error) {
				this.toastError(error);
			}
		},
		async getAllStepInProcess() {
			if (!this.itemid) return;
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllByProcessInfoId(this.itemid),
				// `/api/process-infos/${this.itemid}/_all/step-in-processes`,
			);
			if (!response || !response.state) {
				return;
			}
			if (response.data.length > 0) {
				this.stepInProcess = response.data;
				this.groups = [];
				this.stepInProcess.forEach(async (stepIn, index) => {
					response = await globalService.getData_Async(
						administratorAPI.API_GetAllByStepInProcessId(stepIn.id),
						// `/api/step-in-processes/${stepIn.id}/_all/user-in-steps`,
					);
					if (!response || !response.state) {
						return;
					}
					stepIn.userInStepDTOs = response.data;
					Vue.set(this.groups, index, stepIn);
				});

				this.clickToEdit(this.stepInProcess[0]);
			}
		},

		async getAllStep() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllSteps(),
			);
			if (!response) {
				return;
			}
			if (!response.state) {
				return;
			}
			this.steps = response.data.filter((entry) => {
				return !entry.isDelete && entry.isActive;
			});
			this.modelslt.stepName = this.$t("label.empty");
			this.steps.unshift(this.modelslt);
		},

		getChildPayload(itemIndex) {
			return this.groups[itemIndex];
		},
		getChildPayload_Selector(itemIndex) {
			this.dragg = true;
			return this.steps[itemIndex];
		},
		getShouldAcceptDrop(src) {
			if (!src.onDrop) return false;
			return true;
		},
		getdAcceptDrop(src) {
			if (!src.onDrop) return true;
			return false;
		},
		getShouldAnimateDrop() {
			//this.log("should-animate-drop", sourceContainerOptions, payload);
			return true;
		},

		onDrop(dropResult) {
			let scene = Object.assign([], this.groups);
			let newStep = {
				...this.modelslt,
				step: dropResult.payload,
				id: null,
				stepInProcessName: dropResult.payload.stepName,
				stepInProcessCode: dropResult.payload.stepCode,
				userInStepDTOs: [],
				processInfo: null,
				organization: dropResult.payload.organization,
				description: dropResult.payload.description,
				created: this.getUserInfo(),
				createdDate: new Date(),
				createdName: this.getUserInfo().fullName,
				isActive: dropResult.payload.isActive,
				isAuthorizedApproval: dropResult.payload.isAuthorizedApproval,
				isBack: dropResult.payload.isBack,
				isCreateTFSTask: dropResult.payload.isCreateTFSTask,
				isEdit: dropResult.payload.isEdit,
				isExamine: dropResult.payload.isExamine,
				isProcessRecover: dropResult.payload.isProcessRecover,
				isRequestModify: dropResult.payload.isRequestModify,
				isRequiredSignature: dropResult.payload.isRequiredSignature,
				isSendMail: dropResult.payload.isSendMail,
				modified: this.getUserInfo(),
				modifiedDate: new Date(),
				modifiedName: this.getUserInfo().fullName,
				processingTerm: dropResult.payload.processingTerm,
				rank: dropResult.payload.rank,
				optionDeny: -1,
			};
			dropResult.payload = newStep;
			scene = applyDrag(scene, dropResult, true);
			this.modelslt = dropResult.payload;
			console.log("modelslt", this.modelslt);
			this.groups = scene;
			this.clickToEdit(this.groups[dropResult.addedIndex]);
			this.dragg = false;
		},
		onDropStep(groupIndex, dropResult) {
			if (
				dropResult.removedIndex !== null ||
				dropResult.addedIndex !== null
			) {
				if (dropResult.addedIndex != null) {
					this.previousItems = this.groups[groupIndex];
					this.indexA = groupIndex;
				}
				if (dropResult.removedIndex != null) {
					this.nextItems = this.groups[groupIndex];
					this.indexB = groupIndex;
				}
				if (this.previousItems && this.nextItems) {
					let c = this.previousItems;
					this.previousItems = this.nextItems;
					this.nextItems = c;
					Vue.set(this.groups, this.indexA, this.previousItems);
					Vue.set(this.groups, this.indexB, this.nextItems);
					this.previousItems = null;
					this.nextItems = null;
					this.indexItems = this.groups.indexOf(
						this.groups[this.indexB],
					);
					this.clickToEdit(this.groups[this.indexA]);
					return;
				}
			}
			return;
		},
		async saveStep() {
			if (this.modelslt) return console.log("modelslt", this.groups);

			if (this.beforeDelete.length > 0) {
				this.beforeDelete.filter((entry) => {
					this.deleteUserInStepArr.push(entry);
				});
			}
			await this.onClickOutsideProcessingTerm();
			if (!this.modelslt.optionDeny) {
				this.modelslt.optionDeny = 1;
			}
			this.modelslt.stepInProcessName =
				this.modelslt.stepInProcessName.trim();
			this.modelslt.description = this.modelslt.description.trim();
			try {
				for (let key of Object.keys(this.form)) {
					if (!this.form[key]) {
						this.$refs[key].focus();
					}
					this.$refs[key].validate(true);
				}

				if (this.modelslt.processingTerm && this.errFomat) {
					this.errorProcessingTerm = this.$t("message.error_format");
					this.$refs["processingTerm"].focus();
					return;
				}
				if (!this.modelslt.stepInProcessName == "") {
					this.requiredStepInProcessName = "";

					let newStep = Object.assign({}, this.modelslt);
					Vue.set(this.groups, this.indexItems, newStep);
					this.toastSuccess(this.$t("message.update_success"));
				} else {
					this.$refs["stepInProcessName"].focus();
					this.requiredStepInProcessName = this.$t("message.msg_1");
					this.toastError(this.$t("message.update_error"));
				}
			} catch (error) {
				this.groups[this.indexItems] = [];
				this.toastError(this.$t("message.save_error"));
			}
		},
		async save() {
			if (this.deleteStepInProcessArr.length > 0) {
				for (const item of this.deleteStepInProcessArr) {
					let response = await globalService.deleteData_Async(
						administratorAPI.API_UpdateStepInProcess(item.id),
					);
					if (!response || !response.state) {
						return;
					}
				}
			}
			if (this.deleteUserInStepArr.length > 0) {
				for (const item of this.deleteUserInStepArr) {
					if (!item.id) return;
					let response = await globalService.deleteData_Async(
						administratorAPI.API_DeleteUserInStep(item.id),
						// "/api/user-in-steps/" + item.id,
					);
					if (!response || !response.state) {
						return;
					}
				}
			}
			this.deleteUserInStepArr = [];
			this.deleteStepInProcessArr = [];
			try {
				if (this.isSaving || `${this.processes.processName}` == "") {
					this.toastError(this.$t("message.save_error"));
					return;
				}
				this.isSaving = true;
				let stt = 0;
				for (const arr of this.groups) {
					if (arr.stepInProcessName == "") {
						this.toastError(
							this.$t("message.error_step_in_process"),
						);
						this.isSaving = false;
						return;
					}
					if (arr.id == null) {
						arr.stepOrder = stt + 1;
						arr.processInfo = this.processes;
						let responsesip = await globalService.postData_Async(
							administratorAPI.API_CreateStepInProcess(),
							// "/api/step-in-processes",
							arr,
						);
						if (!responsesip || !responsesip.state) {
							this.toastError(this.$t("message.save_error"));
							this.isSaving = false;
							return;
						}
						this.user_in_step.stepInProcess = responsesip.data;
						if (
							arr.userInStepDTOs &&
							arr.userInStepDTOs.length > 0
						) {
							for (const per of arr.userInStepDTOs) {
								this.user_in_step.userInfo = per;
								this.user_in_step.fullName = per.fullName;
								let responseper =
									await globalService.postData_Async(
										administratorAPI.API_CreateUserInStep(),
										this.user_in_step,
									);
								if (!responseper || !responseper.state) {
									this.toastError(
										this.$t("message.save_error"),
									);
									this.isSaving = false;
									return;
								}
							}
						}
					} else {
						let responsesip = await globalService.putData_Async(
							"/api/step-in-processes/" + arr.id,
							arr,
						);
						if (!responsesip || !responsesip.state) {
							this.toastError(this.$t("message.save_error"));
							this.isSaving = false;
							return;
						}
						if (
							arr.userInStepDTOs &&
							arr.userInStepDTOs.length > 0
						) {
							for (const per of arr.userInStepDTOs) {
								let responseper;
								if (!per.userInfo) {
									this.user_in_step.stepInProcess =
										responsesip.data;
									this.user_in_step.userInfo = per;
									this.user_in_step.fullName = per.fullName;
									responseper =
										await globalService.postData_Async(
											administratorAPI.API_CreateUserInStep(),
											this.user_in_step,
										);
									if (!responseper || !responseper.state) {
										this.toastError(
											this.$t("message.save_error"),
										);
										this.isSaving = false;
										return;
									}
								}
							}
						}
					}
					stt++;
				}
				this.toastSuccess(this.$t("message.save_success"));
				this.isSaving = false;
				// this.$router.push({ path: "/administrator/quy-trinh" });
			} catch (e) {
				this.toastError(this.$t("message.save_error"));
				this.isSaving = false;
			}
		},
		async clickToEdit(items) {
			if (!items) return;
			this.modelslt = items;
			this.requiredStepInProcessName = "";
			this.indexItems = this.groups.indexOf(items);
			if (!items.userInStepDTOs || items.userInStepDTOs.length == 0) {
				this.userFilters = Object.assign([], this.NguoiXuLy);
			} else {
				this.userFilters = this.NguoiXuLy.filter((e1) => {
					return !items.userInStepDTOs.some((e2) => {
						if (e2.userInfo && e2.userInfo.id)
							return e2.userInfo.id == e1.id;
					});
				});
			}
		},

		addColumn() {
			this.modelslt = Object.assign({}, this.defaultItem);
			this.groups.push(this.modelslt);
			this.showOrganize.push(false);
			this.showRank.push(false);
			this.showHandler.push(false);
			this.clickToEdit(this.groups[this.groups.length - 1]);
			this.is_add = true;
		},
		removeRow(index) {
			if (this.groups[index].id != null) {
				this.deleteStepInProcessArr.push(this.groups[index]);

				this.groups.splice(index, 1);
				this.showOrganize.splice(index, 1);
				this.showRank.splice(index, 1);
				this.showHandler.splice(index, 1);
			} else {
				this.groups.splice(index, 1);
				this.showOrganize.splice(index, 1);
				this.showRank.splice(index, 1);
				this.showHandler.splice(index, 1);
			}
			if (index > this.groups.length) {
				this.clickToEdit(this.groups[this.groups.length]);
			} else {
				this.clickToEdit(this.groups[index]);
			}
		},
		removeColumn() {
			if (this.groups[this.groups.length - 1].id != null) {
				this.deleteStepInProcessArr.push(
					this.groups[this.groups.length - 1],
				);
				this.groups.pop();
				this.showOrganize.pop();
				this.showRank.pop();
				this.showHandler.pop();
			} else {
				this.groups.pop();
				this.showOrganize.pop();
				this.showRank.pop();
				this.showHandler.pop();
			}
			this.clickToEdit(this.groups[this.groups.length - 1]);
		},
		removeOrganization(index) {
			if (index != null) {
				this.groups[index].rank = null;
				this.groups[index].userInStepDTOs = [];
			}
			this.modelslt.organization = null;
			this.modelslt.rank = null;

			this.modelslt.userInStepDTOs = [];
			this.modelslt.userInStepDTOs = [];
			this.getAllRank();
			this.getAllUser();
		},
		removeRank(index) {
			if (index != null) {
				this.groups[index].rank = null;
				this.groups[index].userInStepDTOs = [];
			}
			this.modelslt.rank = null;
			this.modelslt.userInStepDTOs = [];
			this.modelslt.userInStepDTOs = [];
			this.getAllUser();
		},
		async selectOrganization(item, index) {
			this.groups[index].organization = item;
			this.showOrganize[index] = false;
			this.groups[index].rank = null;
			this.groups[index].userInStepDTOs = [];
			await this.listArrRank.filter((entry) => {
				if (item.id == entry.id) {
					this.listRank = entry.arr;
					this.isRankLoad = true;
				}
			});
			if (!this.isRankLoad) {
				let responseRank = await globalService.getData_Async(
					administratorAPI.API_GetAllRankByOrganizaionId(item.id),
				);
				if (!responseRank || !responseRank.state) {
					this.toastError(this.$t("error.load"));
					return;
				}
				this.listArrRank.push({
					id: item.id,
					arr: responseRank.data.filter((entry) => {
						return !entry.isDelete && entry.isActive;
					}),
				});
				this.listRank = responseRank.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			}
			this.isRankLoad = false;
			this.userFilters = [];
			if (!this.modelslt.rank || !this.modelslt.rank.id) {
				await this.NguoiXuLy.filter((entry) => {
					if (!entry.organizations) {
						return;
					}
					return entry.organizations.some((result) => {
						if (result.id == item.id) {
							this.userFilters.push(entry);
						}
					});
				});
			}

			this.clickToEdit(this.groups[index]);
		},
		async selectRank(item, index) {
			this.groups[index].rank = item;
			this.showRank[index] = false;
			this.groups[index].userInStepDTOs = [];
			this.userFilters = [];
			if (
				!this.groups[index].organization ||
				!this.groups[index].organization.id
			) {
				this.NguoiXuLy.filter((entry) => {
					if (!entry.ranks) {
						return;
					}
					return entry.ranks.some((result) => {
						if (result.id == item.id) {
							this.userFilters.push(entry);
						}
					});
				});
			} else {
				this.NguoiXuLy.filter((entry) => {
					if (!entry.organizations || !entry.ranks) {
						return;
					}
					entry.organizations.some((e1) => {
						entry.ranks.some((e2) => {
							if (
								e1.id == this.groups[index].organization.id &&
								e2.id == item.id
							) {
								this.userFilters.push(entry);
							}
						});
					});
				});
			}

			this.clickToEdit(this.groups[index]);
		},
		selectHandler(item, index) {
			this.groups[index].userInStepDTOs.push(item);
			// this.modelslt.userInStepDTOs.push(item);
			// this.clickToEdit(this.groups[index]);
		},
		async selectOrganizationStep(item) {
			this.modelslt.organization = item;
			this.modelslt.rank = null;
			this.modelslt.userInStepDTOs = [];

			await this.listArrRank.filter((entry) => {
				if (item.id == entry.id) {
					this.listRank = entry.arr;
					this.isRankLoad = true;
				}
			});
			if (!this.isRankLoad) {
				let responseRank = await globalService.getData_Async(
					administratorAPI.API_GetAllRankByOrganizaionId(item.id),
				);
				if (!responseRank || !responseRank.state) {
					this.toastError(this.$t("error.load"));
					return;
				}
				this.listArrRank.push({
					id: item.id,
					arr: await responseRank.data.filter((entry) => {
						return !entry.isDelete && entry.isActive;
					}),
				});
				this.listRank = await responseRank.data.filter((entry) => {
					return !entry.isDelete && entry.isActive;
				});
			}
			this.isRankLoad = false;
			this.userFilters = [];
			if (!this.modelslt.rank || !this.modelslt.rank.id) {
				this.NguoiXuLy.filter((entry) => {
					if (!entry.organizations) {
						return;
					}
					return entry.organizations.some((result) => {
						if (result.id == item.id) {
							this.userFilters.push(entry);
						}
					});
				});
			}
		},
		async selectRankStep(item) {
			this.modelslt.rank = item;
			this.modelslt.userInStepDTOs = [];
			this.userFilters = [];
			if (!this.modelslt.organization || !this.modelslt.organization.id) {
				this.NguoiXuLy.filter((entry) => {
					if (!entry.ranks) {
						return;
					}
					return entry.ranks.some((result) => {
						if (result.id == item.id) {
							this.userFilters.push(entry);
						}
					});
				});
			} else {
				this.NguoiXuLy.filter((entry) => {
					if (!entry.organizations || !entry.ranks) {
						return;
					}
					entry.organizations.some((e1) => {
						entry.ranks.some((e2) => {
							if (
								e1.id == this.modelslt.organization.id &&
								e2.id == item.id
							) {
								this.userFilters.push(entry);
							}
						});
					});
				});
			}
		},
		selectHandlerStep(item) {
			this.modelslt.userInStepDTOs.push(item);
		},
		async removeHandler() {
			this.deleteUserInStepArr = [];
			this.userFilters = Object.assign([], this.NguoiXuLy);
			await this.modelslt.userInStepDTOs.filter((entry) => {
				this.deleteUserInStepArr.push(entry);
			});
			this.modelslt.userInStepDTOs = [];
			this.modelslt.userInStepDTOs = [];
		},
		getElevation(index) {
			return this.indexItems == index ? 2 : 0;
		},
		getClass(index) {
			return this.indexItems == index
				? "grey lighten-2"
				: "grey lighten-3";
		},
		onClickOutside() {
			this.requiredStepInProcessName = "";
			// this.showHandler = [false];
		},
		clickTarget(event) {
			if (!event.target.className.match("v-card__text")) {
				// this.showHandler = [false];
			}
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

		scrollToView(index) {
			let test = document.getElementById("step" + index);
			if (test[0]) test[0].scrollIntoView();
		},
		onchangeProcessingTerm() {
			if (!this.regex.test(this.modelslt.processingTerm)) {
				this.errorProcessingTerm = this.$t("message.error_format");
				this.errFomat = true;
			} else {
				this.errFomat = false;
				this.errorProcessingTerm = "";
			}
		},
		onchangeStepName() {
			this.requiredStepInProcessName = "";
		},
		onClickOutsideProcessingTerm() {
			if (!this.modelslt.processingTerm) {
				this.modelslt.processingTerm = 0;
				this.errFomat = false;
				this.errorProcessingTerm = "";
			}
		},
		returnHover() {
			if (this.dragg) {
				return " rounded py-5 bordered-dashed active";
			}
			return "rounded ";
		},
		o_selectOptionDeny(item) {
			let itemIndex = this.groups.indexOf(item);
			console.log("item deny", itemIndex);
		},
	},
	filters: constant.filters,
};
</script>

<style scoped>
.remove-row {
	top: 0;
	right: 0;
	border-radius: 50%;
	position: absolute;
}
.scroll-area {
	max-height: 100vh;
}
.showAllText {
	white-space: normal !important;
}
.on-hover:hover {
	background-color: #e3f2fd;
}
.gr_button {
	display: grid !important;
	position: absolute;
	top: 9rem;
}
</style>
