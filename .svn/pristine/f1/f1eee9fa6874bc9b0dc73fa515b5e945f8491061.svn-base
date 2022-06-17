<template>
	<v-card elevation="0">
		<BreadcrumbsVue />
		<TabVue
			:tab="tab"
			:tabs="tabs"
			:buttons="buttons"
			@buttonClick="handleButtonClick"
			@tab="handleTab"
		/>
		<!-- <v-tabs v-model="tab" background-color="transparent">
			<v-tab key="general_information">
				{{ $t("tab.general_information") }}
			</v-tab>
			<v-tab key="detail">
				{{ $t("tab.detail") }}
			</v-tab>
		</v-tabs>
		<div class="d-flex justify-end">
			<v-btn color="blue" dark class="rounded-pill" @click="saveAll()">
				<v-icon> mdi-content-save </v-icon>
				{{ $t("button.save") }}
			</v-btn>
			<v-btn
				color="red"
				dark
				class="rounded-pill ml-2"
				to="/administrator/quy-trinh"
			>
				<v-icon>mdi-close</v-icon>
				{{ $t("button.close") }}
			</v-btn>
		</div>-->
		<v-tabs-items v-model="tab">
			<v-tab-item key="general_information">
				<EditProcessInfoGeneralInformationVue
					:processInfoDto="processInfoDto"
					:isSaved="isSaving"
					@state="onChaneSave"
					@onSaveProcessInfoDto="onSaveProcessInfoDto"
				/>
			</v-tab-item>
			<v-tab-item key="detail">
				<EditProcessInfoDetailVue
					:processInfoDto="processInfoDto"
					:isSaved="isSaving"
				/>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>
<script>
import ProcessInfoDTO from "@/models/process-info.dto";
import globalService from "@/services/global.service";
import BreadcrumbsVue from "@/components/Breadcrumbs.vue";
import TabVue from "@/components/Tab.vue";
import EditProcessInfoGeneralInformationVue from "./EditProcessInfoGeneralInformation.vue";
import EditProcessInfoDetailVue from "./EditProcessInfoDetail.vue";
export default {
	name: "EditProcessInfoVue",
	components: {
		BreadcrumbsVue,
		TabVue,
		EditProcessInfoDetailVue,
		EditProcessInfoGeneralInformationVue,
	},
	data() {
		return {
			tab: 0,
			processInfoDto: ProcessInfoDTO,
			isSaving: {
				state: 0,
			},
			tabs: [
				{
					key: "general_information",
					title: this.$t("label.information"),
				},
				{
					key: "detail",
					title: "Cấu hình trường dữ liệu",
				},
			],
			buttons: [
				{
					icon: "mdi-content-save",
					title: this.$t("button.save"),
					color: "blue",
					transparent: true,
					dark: true,
					event: this.saveAll,
				},
				{
					icon: "mdi-trash-can-outline",
					title: this.$t("button.close"),
					color: "black",
					transparent: true,
					dark: false,
					event: this.back,
				},
			],
		};
	},
	watch: {
		processInfoDto(val) {
			val || ProcessInfoDTO;
		},
	},
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
		this.initialize();
	},
	methods: {
		async handleButtonClick(event) {
			await event();
		},
		onChaneSave(value) {
			this.isSaving = value;
		},
		async initialize() {
			try {
				if (!this.$route.params.id) {
					this.processInfoDto = ProcessInfoDTO;
					this.processInfoDto.processName = "";
					this.processInfoDto.processCode = "";
					this.processInfoDto.organizations = [];
					this.processInfoDto.description = "";
					return;
				} else {
					let response = await globalService.getData_Async(
						"/api/process-infos/" + this.$route.params.id,
					);
					if (!response || !response.state) {
						return;
					}
					this.processInfoDto = response.data;
					return;
				}
			} catch (error) {
				this.processInfoDto = ProcessInfoDTO;
				console.log("Error", error);
			}
		},
		onSaveProcessInfoDto(value) {
			this.processInfoDto = value;
			this.tab = 1;
		},
		saveAll() {
			this.isSaving = { state: 1 };
		},
		back() {
			this.$router.push({ path: "/quan-tri/quy-trinh" });
		},
		handleTab(value) {
			this.tab = value;
		},
	},
};
</script>
