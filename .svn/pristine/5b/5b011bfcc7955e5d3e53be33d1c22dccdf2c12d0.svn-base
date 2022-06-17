key
<template>
	<div v-click-outside="onClickOutside">
		<v-dialog v-model="creating" width="60vw" persistent>
			<NewRequestGroupVue @close="onClose" class="h-4/6" />
		</v-dialog>
		<v-dialog v-model="creating2" width="60vw" persistent>
			<NewRequestGroupV2Vue @close="onClose" class="h-4/6" />
		</v-dialog>
		<v-navigation-drawer
			dark
			color="primary"
			mini-variant
			mini-variant-width="100"
			app
			permanent
		>
			<v-list-item class="px-2">
				<v-list-item-avatar>
					<v-img src="/img/backgrounds/VRE.jpg"></v-img>
				</v-list-item-avatar>
			</v-list-item>

			<v-divider></v-divider>
			<v-list>
				<v-list-item
					v-for="item in modules"
					:key="`${item.title}`"
					@click="showSecondary(item)"
				>
					<v-list-item-action>
						<v-icon class="mx-auto">{{ item.icon }}</v-icon>
						{{ item.title }}
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-list-item class="mx-auto bottom-0" @click="signOut()">
				<v-list-item-action>
					<v-icon>mdi-logout </v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>{{
						$t("label.logout")
					}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-navigation-drawer>
		<v-list
			v-if="hovering"
			color="white"
			style="left: 100px; z-index: 9; position: absolute"
			width="300"
			rounded
			class="grow fixed fill-height drop-shadow-lg"
		>
			<template v-for="child in selected.children">
				<v-list-item
					v-if="!child.children && child.onClick"
					:key="`${child.title}_click`"
					@click="child.onClick"
					:class="child.class"
				>
					<v-list-item-action v-if="child.icon">
						<v-icon :color="child.iconColor">
							{{ child.icon }}
						</v-icon>
					</v-list-item-action>
					<v-list-item-title v-text="child.title"></v-list-item-title>
				</v-list-item>
				<v-list-item
					v-else-if="!child.children"
					:key="`${child.title}_to`"
					:to="child.link"
					@click="hovering = false"
					:class="child.class"
				>
					<v-list-item-action v-if="child.icon">
						<v-icon :color="child.iconColor">
							{{ child.icon }}
						</v-icon>
					</v-list-item-action>
					<v-list-item-title v-text="child.title"></v-list-item-title>
				</v-list-item>
				<v-list-group v-else :key="child.title">
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>{{
								child.title
							}}</v-list-item-title>
						</v-list-item-content>
					</template>
					<v-list-item
						v-for="item in child.children"
						:key="`${item.title}`"
						:to="item.link"
						@click="hovering = false"
						color="primary"
					>
						<v-list-item-title
							v-text="item.title"
						></v-list-item-title>
					</v-list-item>
				</v-list-group>
			</template>
		</v-list>
	</div>
</template>
<script>
import userService from "@/services/user.service";
import NewRequestGroupVue from "../modules/khai-phieu-yeu-cau/RequestForm/NewRequestGroup.vue";
import NewRequestGroupV2Vue from "../modules/khai-phieu-yeu-cau/RequestForm/NewRequestGroupV2.vue";

export default {
	name: "NavigationDrawersVue",
	components: { NewRequestGroupVue, NewRequestGroupV2Vue },
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
	},
	data() {
		return {
			user: () => {
				return this.getUserInfo();
			},
			hovering: false,
			hovering2: false,
			selected: [],
			creating: false,
			creating2: false,
			openRequestData: false,

			modules: [
				{
					title: this.$t("title.dashboard"),
					icon: "mdi-home",
					link: "/",
					// children: [
					// 	{
					// 		title: "Tạo mới phiếu yêu cầu",
					// 		link: "/phieu-yeu-cau/tao-moi",
					// 	},
					// 	{
					// 		title: "Tạo mới",
					// 		link: "/phieu-yeu-cau/tao-moi",
					// 	},
					// 	{
					// 		title: "Toàn bộ",
					// 		link: "/phieu-yeu-cau",
					// 	},
					// 	{
					// 		title: "Cần xử lý",
					// 		link: "/phieu-yeu-cau/list-request-handle",
					// 	},
					// 	{
					// 		title: "Đã ủy quyền",
					// 		link: "/",
					// 	},
					// 	{
					// 		title: "Đang theo dõi",
					// 		link: "/phieu-yeu-cau/list-request-following",
					// 	},

					// ],
				},
				{
					title: this.$t("title.request"),
					icon: "mdi-briefcase",
					link: "/danh-sach-can-xu-ly",
					children: [
						// {
						// 	title: "Tạo mới phiếu yêu cầu",
						// 	link: "/phieu-yeu-cau/tao-moi",
						// },
						{
							title: "Tạo mới",
							link: "/phieu-yeu-cau/tao-moi",
							onClick: this.createNewRequestData2,
						},
						// {
						// 	title: "Tạo mới V2",
						// 	link: "/phieu-yeu-cau/tao-moi",
						// 	onClick: this.createNewRequestData2,
						// },
						{
							title: "Đang soạn",
							link: "/phieu-yeu-cau/dang-soan",
						},
						{
							title: "Cần xử lý",
							link: "/phieu-yeu-cau/list-request-handle",
						},
						{
							title: "Trả lại",
							link: "/phieu-yeu-cau/list-request-give-back",
						},
						{
							title: "Đang theo dõi",
							link: "/phieu-yeu-cau/list-request-following",
						},
						{
							title: "Chờ phê duyệt",
							link: "/phieu-yeu-cau/list-request-wait-approval",
						},
						{
							title: "Đã phê duyệt",
							link: "/phieu-yeu-cau/list-request-approved",
						},
						{
							title: "Được chia sẻ",
							link: "/phieu-yeu-cau/list-request-shared",
						},
						{
							title: "Toàn bộ",
							link: "/phieu-yeu-cau",
						},
					],
					// children: [
					// 	{
					// 		title: this.$t("title.create_request_data"),
					// 		link: "/phieu-yeu-cay/tao-moi",
					// 		class: "grey lighten-2 rounded",
					// 		icon: "mdi-plus-circle",
					// 		iconColor: "blue darken-2",
					// 	},
					// 	{
					// 		title: this.$t("title.draft_request"),
					// 		link: "/danh-sach-dang-soan",
					// 	},
					// 	{
					// 		title: this.$t("title.resolve"),
					// 		link: "/danh-sach-can-xu-ly",
					// 	},
					// 	{
					// 		title: this.$t("title.reject"),
					// 		link: "/danh-sach-tra-lai",
					// 	},
					// ],
				},
				{
					title: this.$t("title.management"),
					icon: "mdi-cog",
					link: "/quan-tri",
					children: [
						{
							title: this.$t("title.user_management"),
							link: "/quan-tri/nguoi-dung",
							children: [
								{
									title: this.$t("title.user"),
									link: "/quan-tri/nguoi-dung/nguoi-dung",
								},
								{
									title: this.$t(
										"title.user_group_management",
									),
									link: "/quan-tri/nguoi-dung/nhom-nguoi-dung/",
								},
								{
									title: this.$t("title.role_management"),
									link: "/quan-tri/nguoi-dung/quyen/",
								},
								{
									title: this.$t("title.title_management"),
									link: "/quan-tri/rank-management",
								},
								{
									title: this.$t(
										"title.list_of_organization",
									),
									link: "/quan-tri/list-organization",
								},
							],
						},
						{
							title: this.$t("title.orgchart_management"),
							link: "/quan-tri/orgchart",
						},

						{
							title: this.$t("title.template_management"),
							link: "/quan-tri/bieu-mau",
						},
						{
							title: this.$t("title.storage_management"),
							link: "/quan-tri/luu-tru",
						},
						{
							title: this.$t("title.category_management"),
							link: "/quan-tri/danh-muc",
						},
						{
							title: this.$t("title.process_management"),
							link: "/quan-tri/quy-trinh",
							children: [
								{
									title: this.$t("title.process_management"),
									link: "/quan-tri/quy-trinh",
								},
								{
									title: this.$t("title.processstep"),
									link: "/quan-tri/list-processstep",
								},
							],
						},
						{
							title: this.$t("title.request_management"),
							link: "/quan-tri/loai-yeu-cau",
							children: [
								{
									title: this.$t(
										"title.list_of_request_group",
									),
									link: "/quan-tri/list-group-request",
								},
								{
									title: this.$t("title.request_type_list"),
									link: "/quan-tri/list-types-request",
								},
								{
									title: this.$t(
										this.$t("title.request_management"),
									),
									link: "/quan-tri/quan-tri-nhom-loai-yeu-cau",
								},
							],
						},
						{
							title: this.$t("title.otp_management"),
							link: "/quan-tri/otp",
						},
						{
							title: this.$t("title.email_management"),
							link: "/quan-tri/email",
						},
						{
							title: "Quản lý sổ công văn",
							link: "/quan-tri/so-cong-van",
						},
						{
							title: "Quản lý danh mục trạng thái",
							link: "/quan-tri/trang-thai",
						},
					],
				},
			],
		};
	},
	methods: {
		hideSecondary() {
			this.hovering = false;
		},
		showPrimary(item) {
			if (!item || !item.link) {
				this.mini = false;
				return;
			}
			this.mini = true;
		},
		showSecondary(item) {
			if (!item) {
				return;
			}
			if (!item.children) {
				this.$router.push({ path: item.link });
			} else {
				this.selected = item;
				this.hovering = true;
			}
		},
		onClickOutside() {
			this.hideSecondary();
		},
		signOut() {
			userService.signOut();
			this.$router.push({
				path: "/sign-in",
			});
		},
		createNewRequestData() {
			this.hovering = false;
			this.creating = true;
		},
		createNewRequestData2() {
			this.hovering2 = false;
			this.creating2 = true;
		},
		onClose(value) {
			if (value) {
				this.creating = false;
				this.creating2 = false;
			}
		},
	},
};
</script>
<!-- <style lang="scss" scoped>
.request {
	height: 45vw;
    width: 75vw;
}
</style> -->
