import ROLE from "@/common/ROLE";
const ListGroupRequestVue = () =>
	import("../views/modules/administrator/Request/ListGroupRequest.vue");
const ListTypeRequestVue = () =>
	import("../views/modules/administrator/Request/ListTypeRequest.vue");
const ListProcessStep = () =>
	import("../views/modules/administrator/ProcessStep/ListProcessStep.vue");
const ListDataFieldVue = () =>
	import("../views/modules/administrator/Form/ListDataField.vue");
const ListFormVue = () =>
	import("../views/modules/administrator/Form/ListForm.vue");
const RankManagementVue = () =>
	import(
		"../views/modules/administrator/DecentralizedManagement/RankManagement.vue"
	);
const RoleManagementVue = () =>
	import(
		"../views/modules/administrator/DecentralizedManagement/RoleManagement.vue"
	);
const ListProcess = () =>
	import("../views/modules/administrator/ProcessStep/ListProcess.vue");
const CreateFormV2Vue = () =>
	import("../views/modules/administrator/Form/CreateFormV2.vue");
const ListUserInfo = () =>
	import("@/views/modules/administrator/UserInfo/ListUserInfo.vue");
const CreateRequestType = () =>
	import("@/views/modules/administrator/Request/CreateRequestType.vue");
const ListRequest = () =>
	import("@/views/modules/administrator/Request/ListRequest.vue");

const ViewRequest = () =>
	import("@/views/modules/administrator/Request/ViewRequest.vue");

const ListOrganzation = () =>
	import(
		"@/views/modules/administrator/DecentralizedManagement/OrganizationsManagement"
	);
const QuanTriNhomloaiYeuCau = () =>
	import(
		"@/views/modules/administrator/QuanTriNhomLoaiYeuCau/QuanTriNhomLoaiYeucau"
	);
/**
 * @var {VueRouter} quantriRoutes
 */
const quantriRoutes = [
	{
		path: "nguoi-dung",
		name: "Quản trị người dùng",
		component: () =>
			import("@/views/modules/administrator/UserInfo/UserInfo"),
		meta: {
			requiresAuth: true,
			roles: [ROLE.ROLE_ADMINISTRATOR],
		},
		children: [
			{
				path: "nguoi-dung",
				name: "Danh sách người dùng",
				component: () =>
					import(
						"@/views/modules/administrator/UserInfo/ListUserInfo"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
			{
				path: "nhom-nguoi-dung",
				name: "Quản trị nhóm người dùng",
				component: () =>
					import("@/views/modules/administrator/UserGroup/UserGroup"),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [
					{
						path: "",
						name: "Quản trị nhóm người dùng",
						component: () =>
							import(
								"@/views/modules/administrator/UserGroup/UserGroupList"
							),
						meta: {
							requiresAuth: true,
							roles: [ROLE.ROLE_ADMINISTRATOR],
						},
					},
					{
						path: "tao-moi",
						name: "Tạo mới nhóm người dùng",
						component: () =>
							import(
								"@/views/modules/administrator/UserGroup/EditUserGroup"
							),
						meta: {
							requiresAuth: true,
							roles: [ROLE.ROLE_ADMINISTRATOR],
						},
					},
					{
						path: ":id(\\d+)",
						name: "Chỉnh sửa nhóm người dùng",
						component: () =>
							import(
								"@/views/modules/administrator/UserGroup/EditUserGroup"
							),
						meta: {
							requiresAuth: true,
							roles: [ROLE.ROLE_ADMINISTRATOR],
						},
					},
				],
			},
			{
				path: "quyen",
				name: "Quản trị quyền",
				component: () =>
					import(
						"@/views/modules/administrator/DecentralizedManagement/RoleManagement.vue"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
		],
	},
	{
		path: "bieu-mau",
		name: "Quản trị biểu mẫu",
		component: () =>
			import("@/views/modules/administrator/TemplateForm/TemplateForm"),
		meta: {
			requiresAuth: true,
			roles: [ROLE.ROLE_ADMINISTRATOR],
		},
		children: [
			{
				path: "",
				name: "Danh sách biểu mẫu",
				component: () =>
					import(
						"@/views/modules/administrator/TemplateForm/ListForm"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
			{
				path: "tao-moi",
				name: "Tạo mới biểu mẫu",
				component: () =>
					import(
						"@/views/modules/administrator/TemplateForm/EditTemplateFormV2"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
			{
				path: ":id(\\d+)",
				name: "Chỉnh sửa biểu mẫu",
				component: () =>
					import(
						"@/views/modules/administrator/TemplateForm/EditTemplateFormV2"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
		],
	},
	{
		path: "email",
		name: "Quản trị mẫu mail",
		component: () =>
			import("@/views/modules/administrator/TemplateMail/TemplateMail"),
		meta: {
			requiresAuth: true,
			roles: [ROLE.ROLE_ADMINISTRATOR],
		},
		children: [
			{
				path: "",
				name: "Danh sách mẫu mail",
				component: () =>
					import(
						"@/views/modules/administrator/TemplateMail/ListTemplateMail"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
			{
				path: "tao-moi",
				name: "Tạo mới biểu mẫu",
				component: () =>
					import(
						"@/views/modules/administrator/TemplateMail/EditTemplateMailV2"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
			{
				path: ":id(\\d+)",
				name: "Chỉnh sửa biểu mẫu",
				component: () =>
					import(
						"@/views/modules/administrator/TemplateMail/EditTemplateMailV2"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
				children: [],
			},
		],
	},
	{
		path: "list-processstep",
		name: "Quản lý Bước thực hiện",
		component: ListProcessStep,
	},
	{
		path: "danh-muc",
		name: "Quản lý danh mục",
		component: () =>
			import("../views/modules/administrator/Category/Category.vue"),
		meta: {
			requiresAuth: true,
			roles: [ROLE.ROLE_ADMINISTRATOR],
		},
		children: [
			{
				path: "",
				name: "Quản lý cây danh mục",
				component: () =>
					import(
						"../views/modules/administrator/Category/CategoryList.vue"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
			},
			{
				path: ":id(\\d+)",
				name: "Chỉnh sửa danh mục",
				component: () =>
					import(
						"../views/modules/administrator/Category/EditCategory.vue"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
			},
			{
				path: "tao-moi",
				name: "Tạo mới danh mục",
				component: () =>
					import(
						"../views/modules/administrator/Category/EditCategory.vue"
					),
				meta: {
					requiresAuth: true,
					roles: [ROLE.ROLE_ADMINISTRATOR],
				},
			},
		],
	},
	{
		path: "bieu-mau",
		name: "Quản lý Biểu mẫu",
		component: ListFormVue,
	},
	{
		path: "rank-management",
		name: "Quản lý Chức danh",
		component: RankManagementVue,
	},
	{
		path: "role-management",
		name: "Quản lý Vai trò",
		component: RoleManagementVue,
	},
	{
		path: "list-user-info",
		name: "Quản lý Người dùng",
		component: ListUserInfo,
	},
	{
		path: "otp",
		name: "Quản trị OTP",
		component: () => import("../views/modules/administrator/OTP/ListOTP"),
	},
	{
		path: "so-cong-van",
		name: "Quản lý sổ công văn",
		component: () =>
			import("../views/modules/administrator/InCommingBook/ListBook"),
	},
	{
		path: "quy-trinh",
		name: "Quản lý Quy trình",
		component: () =>
			import("../views/modules/administrator/ProcessInfo/ProcessInfo"),
		children: [
			{
				path: "",
				name: "Quản lý Quy trình",
				component: ListProcess,
			},
			{
				path: "tao-moi-v2",
				name: "Tạo mới quy trình",
				component: () =>
					import(
						"@/views/modules/administrator/ProcessInfo/EditProcessInfo"
					),
			},
			{
				path: ":id(\\d+)",
				name: "Quản lý Quy trình",
				component: () =>
					import(
						"@/views/modules/administrator/ProcessInfo/EditProcessInfo"
					),
			},
		],
	},
	{
		path: "list-group-request",
		name: "Quản lý Nhóm yêu cầu",
		component: ListGroupRequestVue,
	},
	{
		path: "list-types-request",
		name: "Quản lý danh mục loại yêu cầu",
		component: ListTypeRequestVue,
	},
	{
		path: "list-processstep",
		name: "Quản lý Bước thực hiện",
		component: ListProcessStep,
	},
	{
		path: "list-organization",
		name: "Quản lý Đơn vị",
		component: ListOrganzation,
	},
	{
		path: "list-datafield",
		name: "ListDataField",
		component: ListDataFieldVue,
	},
	{
		path: "list-form",
		name: "Quản lý Biểu mẫu",
		component: ListFormVue,
	},
	{
		path: "rank-management",
		name: "Quản lý Chức danh",
		component: RankManagementVue,
	},
	{
		path: "role-management",
		name: "Quản lý Vai trò",
		component: RoleManagementVue,
	},
	{
		path: "list-user-info",
		name: "Quản lý Người dùng",
		component: ListUserInfo,
	},
	{
		path: "list-form/create-v2/:id",
		name: "Chỉnh sửa loại yêu cầu",
		component: CreateFormV2Vue,
	},
	{
		path: "list-form/create-v2",
		name: "Thêm mới loại yêu cầu",
		component: CreateFormV2Vue,
	},
	{
		path: "create-request-type",
		name: "Thêm mới Loại yêu cầu",
		component: CreateRequestType,
	},
	{
		path: "list-request",
		name: "Quản lý Loại yêu cầu",
		component: ListRequest,
	},
	{
		path: "quan-tri-nhom-loai-yeu-cau",
		name: "Quản lý Loại yêu cầu",
		component: QuanTriNhomloaiYeuCau,
	},

	{
		path: "loai-yeu-cau",
		name: "Quản lý Loại yêu cầu",
		component: () =>
			import("@/views/modules/administrator/Request/Request"),
		children: [
			{
				path: "",
				name: "Quản lý Loại yêu cầu",
				component: ListRequest,
			},
			{
				path: ":id(\\d+)",
				name: "Chỉnh sửa loại yêu cầu",
				component: () =>
					import("@/views/modules/administrator/Request/EditRequest"),
			},
			{
				path: "tao-moi",
				name: "Thêm mới loại yêu cầu",
				component: () =>
					import("@/views/modules/administrator/Request/EditRequest"),
			},
			{
				path: "view/:id",
				name: "Xem chi tiết loại yêu cầu",
				component: ViewRequest,
			},
		],
	},
	{
		path: "luu-tru",
		name: "Quản trị lưu trữ",
		component: () =>
			import("@/views/modules/administrator/FileManager/FileManager"),
	},
	{
		path: "orgchart",
		name: "Quản trị Orgchart",
		component: () =>
			import("@/views/modules/administrator/Orgchart/Orgchart"),
		children: [
			{
				path: "",
				name: "Cây Orgchart",
				component: () =>
					import(
						"@/views/modules/administrator/Orgchart/OrgchartList"
					),
				children: [],
			},
		],
	},
	{
		path: "trang-thai",
		name: "Quản lý danh mục trạng thái",
		component: () =>
			import("@/views/modules/administrator/Status/ListStatus"),
	},
];
export default quantriRoutes;
