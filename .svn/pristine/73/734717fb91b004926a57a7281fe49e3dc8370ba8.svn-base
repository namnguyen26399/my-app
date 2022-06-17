<template>
	<div class="mx-5">
		<v-card>
			<v-card-title>
				<b class="text-h5">
					<h2>
						Phiếu cần xử lý <v-icon color="orange">mdi-sync</v-icon>
					</h2>
				</b>
			</v-card-title>
			<v-card-text class="ma-auto">
				<v-row>
					<!-- <v-card class="rounded-lg mx-5 my-1 green" dark>
						<v-card-actions class="float-right">
							<v-btn icon>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestDrafting }}
						</v-card-title>
						<v-card-text>Đang soạn</v-card-text>
					</v-card> -->
					<v-card class="rounded-lg mx-5 my-1 blue" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">50</v-card-title>
						<v-card-text>Hoàn thành</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 blue" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/phieu-yeu-cau/list-request-handle',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestHandle }}
						</v-card-title>
						<v-card-text>Chờ xử lý</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 orange" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/phieu-yeu-cau',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestExpire }}
						</v-card-title>
						<v-card-text>Sắp hết hạn</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 red" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/phieu-yeu-cau',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestOver }}
						</v-card-title>
						<v-card-text>Quá hạn</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 blue darken-4" dark>
						<v-card-actions class="float-right">
							<v-btn icon>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">50</v-card-title>
						<v-card-text>Thông báo</v-card-text>
					</v-card>
				</v-row>
			</v-card-text>
		</v-card>
		<v-card class="my-5">
			<v-card-title>
				<b class="text-h5">
					<h2>Phiếu gửi đi <v-icon color="blue">mdi-send</v-icon></h2>
				</b>
			</v-card-title>
			<v-card-text class="ma-auto">
				<v-row>
					<v-card class="rounded-lg mx-5 my-1 green" dark>
						<v-card-actions class="float-right">
							<v-btn icon>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestDrafting }}
						</v-card-title>
						<v-card-text>Đang soạn</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 blue" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">50</v-card-title>
						<v-card-text>Hoàn thành</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 blue" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/phieu-yeu-cau/list-request-handle',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestHandle }}
						</v-card-title>
						<v-card-text>Chờ xử lý</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 orange" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/phieu-yeu-cau',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestExpire }}
						</v-card-title>
						<v-card-text>Sắp hết hạn</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 red" dark>
						<v-card-actions class="float-right">
							<v-btn
								icon
								:to="{
									path: '/phieu-yeu-cau',
								}"
							>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">
							{{ countRequestOver }}
						</v-card-title>
						<v-card-text>Quá hạn</v-card-text>
					</v-card>
					<v-card class="rounded-lg mx-5 my-1 blue darken-4" dark>
						<v-card-actions class="float-right">
							<v-btn icon>
								<v-icon
									>mdi-arrow-right-bold-circle-outline</v-icon
								>
							</v-btn>
						</v-card-actions>
						<v-card-title class="text-h1">50</v-card-title>
						<v-card-text>Thông báo</v-card-text>
					</v-card>
				</v-row>
			</v-card-text>
		</v-card>
		<v-row>
			<v-col cols="12" md="12">
				<v-expansion-panels>
					<v-expansion-panel class="mx-0 px-0">
						<v-expansion-panel-header class="mx-0 grey lighten-3">
							Filter
						</v-expansion-panel-header>
						<v-expansion-panel-content class="mx-0 px-0">
							<v-col cols="12" md="12" class="d-flex w-full">
								<v-col cols="12" md="10">
									<div
										class="mx-0 px-0 d-flex"
										v-for="item of optionsFilter"
										:key="item.name"
									>
										<v-col cols="12" md="12" class="d-flex">
											<v-col cols="12" md="3">
												<v-checkbox
													input-value="true"
													:label="item.text"
													:v-model="item.name"
													@change="log(item)"
												>
													{{ item }}
												</v-checkbox>
											</v-col>
											<v-col cols="12" md="3">
												<v-select
													v-model="item.option1"
													:items="listOptions1"
													outlined
													dense
													single-line
													clearable
												>
												</v-select>
											</v-col>

											<v-col
												cols="12"
												md="3"
												v-if="item.option1"
											>
												<v-text-field
													v-model="item.option2"
													outlined
													dense
													single-line
												>
												</v-text-field>
											</v-col>
										</v-col>
									</div>
								</v-col>
								<div class="float-right">
									<v-combobox
										:items="listOptionsFilter"
										dense
										multiple
										:label="'Add filter'"
										clearable
										outlined
										hide-selected
									>
										<template v-slot:item="{ item }">
											<v-list-item
												@click="selectFilter(item)"
												class="m-1"
											>
												{{ item.text }}
											</v-list-item>
										</template>
									</v-combobox>
									<v-select
										label="Loại biểu đồ"
										:items="listTypeChart"
										v-model="typeChart"
										outlined
										dense
										clearable
									>
									</v-select>
									<v-btn
										outlined
										class="blue darken-2 rounded"
										dark
										@click="applyFilter"
										>Apply</v-btn
									>
								</div>
							</v-col>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="12" class="d-flex" v-if="show_donut">
				<v-col cols="12" md="6">
					<v-card class="blue lighten-5 w-full" id="chart_donut">
						<apexchart
							type="donut"
							height="400"
							:options="chartOptions_donut"
							:series="series_donut"
						></apexchart>
					</v-card>
				</v-col>
				<v-col cols="12" md="6">
					<v-card class="blue lighten-5 w-full" id="chart_donut">
						<apexchart
							type="donut"
							height="400"
							:options="chartOptions_donut_right"
							:series="series_donut_right"
						></apexchart>
					</v-card>
				</v-col>
			</v-col>

			<v-col cols="12" md="12" class="d-flex" v-if="show_bar">
				<v-col cols="12" md="6">
					<v-card class="p-5 blue lighten-5" id="chart_bar">
						<apexchart
							type="bar"
							height="400"
							:options="chartOptions_bar"
							:series="series_bar"
						></apexchart>
					</v-card>
				</v-col>
				<v-col cols="12" md="6">
					<v-card class="p-5 blue lighten-5" id="chart_bar">
						<apexchart
							type="bar"
							height="400"
							:options="chartOptions_bar"
							:series="series_bar"
						></apexchart>
					</v-card>
				</v-col>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";
export default {
	name: "DashboardEoffice",
	components: {
		apexchart: VueApexCharts,
	},
	data() {
		return {
			user_infor: this.getUserInfo(),
			countRequestExpire: 0,
			countRequestOver: 0,
			countRequestHandle: 0,
			countRequestDrafting: 0,
			optionsFilter: [],
			listOptionsFilter: [
				{
					name: "createdDate",
					text: "Ngày tạo",
					option1: "",
					option2: "",
				},
				{
					name: "createdName",
					text: "Người tạo",
					option1: "",
					option2: "",
				},
				{
					name: "requestDataCode",
					text: "Mã phiếu",
					option1: "",
					option2: "",
				},
				{
					name: "requestDataName",
					text: "Tên phiếu",
					option1: "",
					option2: "",
				},
				{
					name: "requestGroupCode",
					text: "Mã nhóm phiếu",
					option1: "",
					option2: "",
				},
				{
					name: "requestGroupName",
					text: "Tên nhóm phiếu",
					option1: "",
					option2: "",
				},
				{
					name: "requestTypeCode",
					text: "Mã loại phiếu",
					option1: "",
					option2: "",
				},
				{
					name: "requestTypeName",
					text: "Tên loại phiếu",
					option1: "",
					option2: "",
				},
				{
					name: "statusName",
					text: "Trạng thái",
					option1: "",
					option2: "",
				},
				{
					name: "modifiedDate",
					text: "Ngày sửa",
					option1: "",
					option2: "",
				},
				{
					name: "modifiedName",
					text: "Người sửa",
					option1: "",
					option2: "",
				},
			],
			listTypeChart: ["donut", "bar"],

			listOptions1: [
				"IN",
				"EQUALS",
				"LIKE",
				"GREATER_THAN",
				"LESS_THAN",
				"GREATER_THAN_OR_EQUALS",
				"LESS_THAN_OR_EQUALS",
			],
			listOptions2: [],
			series_bar: [
				{
					name: "Đang soạn",
					data: [53, 32, 33, 52, 13, 43],
				},
				{
					name: "Hoàn thành",
					data: [12, 17, 11, 9, 15, 11],
				},
				{
					name: "Chờ xử lý",
					data: [44, 55, 41, 37, 22, 43],
				},
				{
					name: "Sắp hết hạn",
					data: [53, 32, 33, 52, 13, 43],
				},
				{
					name: "Quá hạn",
					data: [12, 17, 11, 9, 15, 11],
				},
			],
			chartOptions_bar: {
				title: {
					text: "Danh sách",
					align: "left",
					style: {
						fontSize: "20px",
						fontWeight: "bold",
						fontFamily: undefined,
						color: "#263238",
					},
				},
				chart: {
					type: "bar",
					stacked: true,
				},
				plotOptions: {
					bar: {
						horizontal: true,
					},
				},
				xaxis: {
					categories: [
						"Nguyễn Văn A",
						"Nguyễn Văn B",
						"Hoành Anh C",
						"Ngô Trung D",
						"Triệu Vy E",
						"Bạch Thế F",
					],
					labels: {
						style: {
							fontSize: "13px",
						},
					},
				},
				yaxis: {
					labels: {
						style: {
							fontWeight: "bold",
						},
					},
				},
				colors: ["#2196F3", "#4CAF50", "#9C27B0", "#FF9800", "#F44336"],
				fill: {
					opacity: 1,
				},
				legend: {
					position: "top",
					horizontalAlign: "left",
					offsetX: 40,
				},
			},

			series_donut: [0],
			chartOptions_donut: {
				title: {
					text: "Tất cả",
					align: "left",
					style: {
						fontSize: "20px",
						fontWeight: "bold",
						fontFamily: undefined,
						color: "#263238",
					},
				},
				labels: [
					"Đang soạn",
					"Hoàn thành",
					"Chờ xử lý",
					"Sắp hết hạn",
					"Quá hạn",
				],
				fill: {
					opacity: 1,
				},
				colors: ["#2196F3", "#4CAF50", "#9C27B0", "#FF9800", "#F44336"],
				chart: {
					type: "donut",
					stacked: true,
				},
				legend: {
					position: "top",
					horizontalAlign: "left",
					offsetX: 40,
				},
			},
			series_donut_right: [1, 1, 1, 1, 1],
			chartOptions_donut_right: {
				title: {
					text: "Lọc theo đơn vị",
					align: "left",
					style: {
						fontSize: "20px",
						fontWeight: "bold",
						fontFamily: undefined,
						color: "#263238",
					},
				},
				labels: [
					"Đang soạn",
					"Hoàn thành",
					"Chờ xử lý",
					"Sắp hết hạn",
					"Quá hạn",
				],
				fill: {
					opacity: 1,
				},
				colors: ["#2196F3", "#4CAF50", "#9C27B0", "#FF9800", "#F44336"],
				chart: {
					type: "donut",
					stacked: true,
				},
				legend: {
					position: "top",
					horizontalAlign: "left",
					offsetX: 40,
				},
			},
			typeChart: "donut",
			show_bar: false,
			show_donut: true,
		};
	},
	computed: {},
	mounted() {
		this.load();
	},
	methods: {
		async load() {
			await this.countRequestAboutToExpire();
			await this.countRequestOverdue();
			await this.countRequestNeedHandle();
			await this.countRequestDataDrafting();
			this.series_donut = [
				this.countRequestDrafting,
				0,
				this.countRequestHandle,
				this.countRequestExpire,
				this.countRequestOver,
			];
		},
		async countRequestDataDrafting() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetCountRequestDrafting(
					this.user_infor.id,
				),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.countRequestDrafting = response.data;
		},
		async countRequestAboutToExpire() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetCountAboutToExpireByUserId(
					this.user_infor.id,
				),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.countRequestExpire = response.data;
		},
		async countRequestOverdue() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetCountOverDueByUserId(
					this.user_infor.id,
				),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.countRequestOver = response.data;
		},
		async countRequestNeedHandle() {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetCountRequestNeedHandle(
					this.user_infor.id,
				),
			);
			if (!response || !response.state) {
				return this.toastError(this.$t("error.load"));
			}
			this.countRequestHandle = response.data;
		},
		log(item) {
			if (!item) return;
			this.optionsFilter.splice(this.optionsFilter.indexOf(item), 1);
		},
		applyFilter() {
			if (!this.typeChart) {
				this.show_bar = false;
				this.show_donut = false;
			}
			if (this.typeChart == "donut") {
				this.show_bar = false;
				this.show_donut = true;
			}
			if (this.typeChart == "bar") {
				this.show_donut = false;
				this.show_bar = true;
			}
		},
		selectFilter(item) {
			if (this.optionsFilter.indexOf(item) > -1) return;
			this.optionsFilter.push(item);
		},
	},
};
</script>
