import store from "@/store";

class AdministratorAPI {
	API_GetAllCategoryGroup() {
		return `/api/_all/category-groups`;
	}
	API_CreateCategoryGroup() {
		return `/api/category-groups`;
	}
	API_UpdateCategoryGroup(id) {
		return `/api/category-groups/${id}`;
	}
	API_GetCategoryGroup(id) {
		return `/api/category-groups/${id}`;
	}
	API_DeleteCategoryGroup(id) {
		return `/api/category-groups/${id}`;
	}
	API_SaveAllCategoryGroup() {
		return `/api/_save/category-groups`;
	}
	API_GetAllChildByParentId(id) {
		return `/api/_all-child/${id}/category-groups`;
	}
	API_GetAllCategoryDataByCategoryGroupId(id) {
		return `/api/category-groups/${id}/_all/category-data`;
	}
	API_CreateCategoryData() {
		return `/api/category-data`;
	}
	API_UpdateCategoryData(id) {
		return `/api/category-data/${id}`;
	}
	API_SaveAllCategoryData() {
		return `/api/_save/category-data`;
	}
	API_DeleteCategoryData(id) {
		return `/api/category-data/${id}`;
	}
	API_DeleteAllCategoryData() {
		return `/api/_delete/category-data`;
	}
	API_FindAllOrganization() {
		return `/api/_all/organizations`;
	}
	API_SaveAllOrganization() {
		return `/api/_save/organizations`;
	}
	API_CreateOrganization() {
		return `/api/organizations`;
	}
	API_DeleteOrganization(id) {
		return `/api/organizations/${id}`;
	}
	API_UpdateOrganization(id) {
		return `/api/organizations/${id}`;
	}
	API_SaveProcessInfo() {
		return `/api/process-infos`;
	}
	API_UpdateProcessInfo(id) {
		return `/api/process-infos/${id}`;
	}
	API_SaveAllRequest() {
		return `/api/_save/requests`;
	}
	API_GetAllProcessInfo() {
		return `/api/_all/process-infos`;
	}
	API_GetAllRequestGroup() {
		return `/api/_all/request-groups`;
	}
	API_GetAllRequestType() {
		return `/api/_all/request-types`;
	}
	API_GetAllRequest() {
		return `/api/_all/requests`;
	}
	API_CreateRequest() {
		return `/api/requests`;
	}
	API_SaveRequest(id) {
		return `/api/requests/${id}`;
	}
	API_GetAllTemplateForm() {
		return `/api/_all/template-forms`;
	}
	API_GetRequest(id) {
		return `/api/requests/${id}`;
	}
	API_CreateRequestGroup() {
		return `/api/request-groups`;
	}
	API_CreateRequestType() {
		return `/api/request-types`;
	}
	API_CreateTemplateForm() {
		return `/api/template-forms`;
	}
	API_SaveTemplateForm(id) {
		return `/api/template-forms/${id}`;
	}
	Route_EditCategroupGroup(id) {
		return `/administrator/danh-muc/${id}`;
	}
	Route_CategroupGroupList() {
		return `/administrator/danh-muc`;
	}
	API_SaveRequestData(id) {
		return `/api/request-data/${id}`;
	}
	API_CreateRequestData() {
		return `/api/request-data/`;
	}
	API_FindOneRequesrtByID(id) {
		return `/api/request-types/${id}/requests`;
	}
	API_CreateProcessData() {
		return `/api/process-data`;
	}
	API_CreateFormData() {
		return `/api/form-data`;
	}
	API_CreateStepData() {
		return `/api/step-data`;
	}
	API_FindStepInProcessesByID(id) {
		return `/api/process-infos/${id}/_all/step-in-processes`;
	}
	API_GetRequestDataByID(id) {
		return `/api/request-data/${id}`;
	}
	API_GetFormDataById(id) {
		return `/api/request-data/${id}/_all/form-data`;
	}
	API_UpdateFormData(id) {
		return `/api/form-data/${id}`;
	}
	API_FindProcessesDataByID(id) {
		return `/api/request-data/${id}/_all/process-data`;
	}
	API_FindStepDataByID(id) {
		return `/api/request-data/${id}/_all/step-data`;
	}
	API_FindFieldInForm(id) {
		return `/api/forms/${id}/_all/field-in-form`;
	}
	API_CreateFieldData() {
		return `/api/field-data`;
	}
	API_GetFieldDataByIdRequest(id) {
		return `/api/request-data/${id}/_all/field-data`;
	}
	API_GetSteepDataByIdRequest(id) {
		return `/api/request-data/${id}/_all/step-data`;
	}
	API_GetSteepDataByIdStepInProcessId(id) {
		return `/api/step-in-processes/${id}/_all/user-in-steps`;
	}
	API_GetAllRequestData() {
		return `/api/_all/request-data`;
	}
	API_DeleteAllProcessInfo() {
		return `/api/_save/process-infos`;
	}
	API_UploadFile() {
		return `/api/file/upload`;
	}
	API_UploadFile365() {
		return `/api/file/office365/upload`;
	}
	API_SaveAttachmentFile(id) {
		return `/api/attachment-files/${id}`;
	}
	API_GetAllAttachmentFileByTemplateFormId(templateFormId) {
		return `/api/template-form/${templateFormId}/_all/attachment-files`;
	}
	API_GetAllAttachmentFileByManageStampInfoId(manageStampInfoId) {
		return `/api/manage-stamp-info/${manageStampInfoId}/_all/attachment-files`;
	}
	API_GetAllStepInProcessByProcessInfoId(processInfoId) {
		return `/api/process-infos/${processInfoId}/_all/step-in-processes`;
	}
	API_DownloadFile(fileId, fileExtension, contentType) {
		return `/api/file/download/${fileId}.${fileExtension}?type=${contentType}`;
	}
	FullAPI_DownloadFile(fileId, fileName, fileExtension, contentType) {
		let apiUrl = store.state.config.apiUrl;
		return `${apiUrl}/api/file/download/${fileId}/${fileName}.${fileExtension}?type=${contentType}`;
	}
	API_DownloadFileById(fileId, contentType) {
		return `/api/file/download/${fileId}?type=${contentType}`;
	}
	FullAPI_DownloadFileById(fileId, contentType) {
		let apiUrl = store.state.config.apiUrl;
		return `${apiUrl}/api/file/v1/download/${fileId}?type=${contentType}`;
	}
	API_GetFolderContent(id) {
		return `/api/folder/${id}`;
	}
	API_CreateFolder() {
		return `/api/folder/`;
	}
	API_RenameFolder(id, folderName) {
		return `/api/folder/${id}?folderName=${folderName}`;
	}
	API_DeleteFolder(id) {
		return `/api/file/${id}`;
	}
	API_GetAllRank() {
		return `/api/_all/ranks`;
	}
	API_GetAllSteps() {
		return `/api/_all/steps`;
	}
	API_CreateStep() {
		return `/api/steps/`;
	}
	API_UpdateStep(id) {
		return `/api/steps/${id}`;
	}
	API_DeleteAllStep() {
		return `/api/_save/steps`;
	}
	API_GetAllRankByOrganizaionId(id) {
		return `/api/organization/_all/${id}/rank`;
	}
	API_GetAllUserInfo() {
		return `/api/_all/user-infos`;
	}
	API_SaveAllUserInfo() {
		return `/api/_save/user-infos`;
	}
	API_GetAllByProcessInfoId(id) {
		return `/api/process-infos/${id}/_all/step-in-processes`;
	}
	API_GetAllByStepInProcessId(id) {
		return `/api/step-in-processes/${id}/_all/user-in-steps`;
	}
	API_UpdateStepInProcess(id) {
		return `/api/step-in-processes/${id}`;
	}
	API_CreateUserInStep() {
		return `/api/user-in-steps`;
	}
	API_DeleteUserInStep(id) {
		return `/api/user-in-steps/${id}`;
	}
	API_UpdateUserInStep(id) {
		return `/api/user-in-steps/${id}`;
	}
	API_CreateStepInProcess() {
		return `/api/step-in-processes`;
	}
	API_DeleteRequestData(id) {
		return `/api/request-data/${id}`;
	}
	API_DeleteAllRequestData() {
		return `/api/_delete/request-data`;
	}
	API_GetAttachmentFile(id) {
		return `/api/template-form/${id}/_all/attachment-files`;
	}
	API_CopyFile() {
		return `/api/file/copy-file`;
	}
	API_CreateAttachmentFile() {
		return `/api/attachment-files`;
	}
	API_UpdateAttachmentFile(id) {
		return `/api/attachment-files/${id}`;
	}
	API_GetAllAttachmentFileByRequestDataId(id) {
		return `/api/request-data/${id}/_all/attachment-files`;
	}
	API_UpdateRequestData(id) {
		return `/api/request-data/${id}`;
	}
	API_GetAllByUserIdRequestData(id) {
		return `/api/v2/user/${id}/_all/request-data`;
	}
	API_GetAllRequestNeedHandlerByUserId(id) {
		return `/api/v2/user/${id}/_all_need_handle/request-data`;
	}
	API_GetAllByUserIdRequestDataV2(id) {
		return `/api/v1/user/${id}/_all/request-data`;
	}
	API_GetAllUserInfos() {
		return `/api/_all/user-infos`;
	}
	API_DeleteAllFiltByTempId(id) {
		return `/api/template-form/${id}/_all/attachment-files`;
	}
	API_CheckCodeProcessInfo() {
		return `/api/check_code/process-infos`;
	}
	API_GetAllRequestDataNeedHandle(id) {
		return `/api/user/${id}/_all_need_handle/request-data`;
	}
	API_UpdateFile(id, fileName = false) {
		return (
			`/api/file/update-file/${id}` +
			(!fileName ? "" : `?fileName=${fileName}`)
		);
	}
	API_UpDateStepData(id) {
		return `/api/step-data/${id}`;
	}
	API_GetRequestAboutToExpireByUserId(id) {
		return `/api/user/${id}/_all_about_to_expire/request-data`;
	}
	API_GetRequestOverDueByUserId(id) {
		return `/api/user/${id}/_all_overdue/request-data`;
	}
	API_GetCountAboutToExpireByUserId(id) {
		return `/api/user/${id}/_count_about_to_expire/request-data`;
	}
	API_GetCountOverDueByUserId(id) {
		return `/api/user/${id}/_count_overdue/request-data`;
	}
	API_GetCountInProcessingByUserId(id) {
		return `/api/user/${id}/_count_in_processing_time/request-data`;
	}
	API_GetCountRequestNeedHandle(id) {
		return `/api/user/${id}/_count_need_handle/request-data`;
	}
	API_GetAllRole() {
		return `/api/_all/roles`;
	}
	API_GetRequestDataSharedByUserId(id) {
		return `/api/user/${id}/_all_shared_to_user/request-data`;
	}
	API_GetRequestInProcessing(id) {
		return `/api/user/${id}/_all_in_processing_time/request-data`;
	}
	API_ApproveRequest() {
		return `/api/approve/request-data`;
	}
	API_GetRequestDrafting(id) {
		return `/api/v2/user/${id}/_all_drafting/request-data`;
	}
	API_GetRequestFollowing(id) {
		return `/api/v2/user/${id}/_all_following/request-data`;
	}
	API_GetRequestApproved(id) {
		return `/api/v2/user/${id}/_all_approved/request-data`;
	}
	API_GetRequestSharedToUser(id) {
		return `/api/v2/user/${id}/_all_share_to_user/request-data`;
	}
	API_GetRequestGiveBack(id) {
		return `/api/v2/user/${id}/_all_give_back/request-data`;
	}
	API_GetRequestWaitApproval(id) {
		return `/api/v2/user/${id}/_all_wait_approval/request-data`;
	}
	API_GetCountRequestDrafting(id) {
		return `/api/user/${id}/_count_drafting/request-data`;
	}
	API_GetAllRequestTypeByRequestGroupId(id) {
		return `/api/request_group/${id}/_all/request-types`;
	}
	API_GetRequestNeedProcess(id) {
		return `/api/v2/user/${id}/_all_need_handle/request-data`;
	}
	API_GetRequestDataFollowing(id) {
		return `/api/user/${id}/_all_following/request-data`;
	}
	API_GetAllUserGroup() {
		return `/api/_all/user-groups`;
	}
	API_GetAllSignatureInformation(userId) {
		return `/api/user/${userId}/_all/signature-infomations`;
	}
	API_CreateSignatureInformation() {
		return `/api/signature-infomations`;
	}
	API_SaveSignatureInformation(id) {
		return `/api/signature-infomations/${id}`;
	}
	API_GetTemplateForm(id) {
		return `/api/template-forms/${id}`;
	}
	API_UploadTemplateFileCloud(id) {
		return `/api/file/office365/upload?templateFormId=${id}`;
	}
	API_UploadManageStampCloud(id) {
		return `/api/file/office365/upload?requestDataId=${id}`;
	}
	API_GetPreviewLink(id) {
		return `/api/file/office365/preview/${id}`;
	}
	API_DeleteTemplateForm(id) {
		return `/api/template-forms/${id}`;
	}
	API_GetAllMailTemplate() {
		return `/api/_all/mail-templates`;
	}
	API_GetMailTemplate(id) {
		return `/api/mail-templates/${id}`;
	}
	API_CreateMailTemplate() {
		return `/api/mail-templates`;
	}
	API_SaveMailTemplate(id) {
		return `/api/mail-templates/${id}`;
	}
	API_GetAllOTP() {
		return `/api/_all/opts`;
	}
	API_DeleteAllOTP() {
		return `/api/_delete/opts`;
	}
	API_UpdateOTP(id) {
		return `/api/opts/${id}`;
	}
	API_GetBook() {
		return `/api/_all/dispatch-books`;
	}
	API_CreateUserGroup() {
		return `/api/user-groups`;
	}
	API_SaveUserGroup(id) {
		return `/api/user-groups/${id}`;
	}
	API_GetUserGroup(id) {
		return `/api/user-groups/${id}`;
	}
	API_CreateInComingBook() {
		return `/api/incoming-books`;
	}
	API_UpdateInComingBook(id) {
		return `/api/incoming-books/${id}`;
	}
	API_DeleteAllInComingBook() {
		return `/api/_save/incoming-books`;
	}
	API_GetAllStatus() {
		return `/api/_all/status`;
	}
	API_CreateStatus() {
		return `/api/status`;
	}
	API_UpdateStatus(id) {
		return `/api/status/${id}`;
	}
	API_GetStepDataByIdProcessData(id) {
		return `/api/process-data/${id}/_all/step-data`;
	}
	API_DeleteAttachmentFile(id) {
		return `/api/attachment-files/${id}`;
	}
	API_CreateReqdataProcessHis() {
		return `/api/reqdata-process-his`;
	}
	API_GetReqdataProcessHisByID(id) {
		return `/api/request-data/${id}/_all/reqdata-process-his`;
	}
	API_GetUserInfo(id) {
		return `/api/user-infos/${id}`;
	}
	API_GetAllUserByRequest(id) {
		return `/api/v1/user/${id}/_all/request-data`;
	}
	API_Approve() {
		return `/api/process/request-data`;
	}
	API_GetAllRequestApprovedById(id) {
		return `/api/v2/user/${id}/_all_approved/request-data`;
	}
	API_GetRootFolder() {
		return `/api/folder/office365/root/folder`;
	}
	API_Get365FolderContent(id) {
		return `/api/folder/office365/${id}`;
	}
	API_Create365Folder() {
		return `/api/folder/office365/`;
	}
	API_Save365Folder(id, name) {
		return `/api/folder/office365/rename/${id}?folderName=${name}`;
	}
	API_Delete365Folder(id) {
		return `/api/folder/office365/${id}`;
	}
	API_Delete365File(id) {
		return `/api/file/office365/${id}`;
	}
	API_GetAllSignDataByRequestData(id) {
		return `/api/request-data/${id}/_all/sign-data`;
	}
	API_updateSignData(id) {
		return `/api/sign-data/${id}`;
	}
	API_GetAllManageStampInfoByRequestData(id) {
		return `/api/request-data/${id}/_all/manage-stamp-infos`;
	}
	API_updateManageStampInfo(id) {
		return `/api/manage-stamp-infos/${id}`;
	}
	API_createManageStampInfo() {
		return `/api/manage-stamp-infos`;
	}
	API_createSignData() {
		return `/api/sign-data`;
	}
	API_SaveAllUserGroup() {
		return `/api/_save/user-groups`;
	}
	API_GetAllSignature() {
		return `/api/_all/signature-infomations`;
	}
}
const administratorAPI = new AdministratorAPI();
export default administratorAPI;
