<template>
	<v-card>
		<v-toolbar>
			<v-toolbar-title>
				{{ $t("tab.general_information") }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-row class="p-3">
				<v-col cols="12" md="6">
					<v-list-item-content>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.step_name") }}</b
							>:
							<i>{{ m_editedItem.stepName }}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.processingTerm") }}</b
							>:
							<i
								>{{
									m_editedItem.processingTerm
										? m_editedItem.processingTerm
										: 0
								}}
								{{ $t("label.hours") }}</i
							>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.description") }}</b
							>:
							<i>{{ m_editedItem.description }}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.organization") }}</b
							>:
							<i
								v-if="
									m_editedItem.organization &&
									m_editedItem.organization.organizationName
								"
								>{{
									m_editedItem.organization.organizationName
								}}
							</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.rank") }}</b
							>:
							<i
								v-if="
									m_editedItem.rank &&
									m_editedItem.rank.rankName
								"
								>{{ m_editedItem.rank.rankName }}</i
							>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.created_name") }}</b
							>:
							<i>{{ m_editedItem.createdName }}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.created_date") }}</b
							>:
							<i>{{ m_editedItem.createdDate | dateToString }}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.modified_name") }}</b
							>:
							<i>{{ m_editedItem.modifiedName }}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.modified_date") }}</b
							>:
							<i>{{
								m_editedItem.modifiedDate | dateToString
							}}</i>
						</v-list-item-title>
						<v-list-item-title>
							<v-checkbox
								class="mx-0"
								readonly
								v-model="m_editedItem.isActive"
								:label="$t('label.is_active')"
							>
							</v-checkbox>
						</v-list-item-title>
					</v-list-item-content>
				</v-col>
				<v-col cols="12" md="6">
					<v-list-item-content>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.is_examine") }}</b
							>:
							<i>{{
								m_editedItem.isExamine
									? $t("button.yes")
									: $t("button.no")
							}}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.is_request_modify") }}</b
							>:
							<i>
								{{
									m_editedItem.isRequestModify
										? $t("button.yes")
										: $t("button.no")
								}}</i
							>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.is_process_recover") }}</b
							>:
							<i>{{
								m_editedItem.isProcessRecover
									? $t("button.yes")
									: $t("button.no")
							}}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.required_tfs") }}</b
							>:
							<i>{{
								m_editedItem.isCreateTFSTask
									? $t("button.yes")
									: $t("button.no")
							}}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.allow_send_email") }}</b
							>:
							<i>{{
								m_editedItem.isSendMail
									? $t("button.yes")
									: $t("button.no")
							}}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.is_required_signature") }}</b
							>:
							<i>{{
								m_editedItem.isRequiredSignature
									? $t("button.yes")
									: $t("button.no")
							}}</i>
						</v-list-item-title>
						<v-list-item-title class="mb-4 pt-2">
							<b>{{ $t("label.is_authorized_approval") }}</b
							>:
							<i>{{
								m_editedItem.isAuthorizedApproval
									? $t("button.yes")
									: $t("button.no")
							}}</i>
						</v-list-item-title>
					</v-list-item-content>
				</v-col>
			</v-row>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="error" class="rounded-pill" dark @click="closeDialog">
				<v-icon>mdi-close</v-icon>
				{{ $t("button.close") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "ViewProcessStep",
	props: { editedItem: {} },
	data() {
		return { m_editedItem: {} };
	},
	watch: {
		editedItem(value) {
			this.m_editedItem = value;
		},
	},
	mounted() {
		this.initialize();
	},
	methods: {
		async initialize() {
			this.m_editedItem = this.editedItem;
		},
	},
};
</script>

<style></style>
