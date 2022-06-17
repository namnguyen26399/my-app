const StepDataDto = {
	id: null,
	stepDataCode: "",
	stepDataName: "",
	timeActive: new Date(),
	processingTerm: null,
	precessingTermTime: new Date(),
	isRequiredSignature: null,
	isBack: null,
	isAuthorizedApproval: null,
	isExamine: null,
	isEdit: null,
	isRequestModify: null,
	isSendMail: null,
	isProcessRecover: null,
	isCreateTfsTask: null,
	organizationCode: "",
	organizationName: "",
	rankCode: "",
	rankName: "",
	description: "",
	createdName: "",
	createdDate: new Date(),
	modifiedName: "",
	modifiedDate: new Date(),
	isActive: false,
	isDelete: true,
	tennantCode: "",
	tennantName: "",
	nextStep: null,
	processData: null,
	requestData: null,
	tennant: null,
	created: null,
	modified: null,
	stepInProcess: null,
	stepOrder: "",
	userInfos: [],
};
export default StepDataDto;
