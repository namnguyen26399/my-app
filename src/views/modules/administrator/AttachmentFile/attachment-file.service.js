import globalService from "@/services/global.service";
import administratorAPI from "../administrator.api";

class AttachmentFileService {
	async findAllByTemplateFormId(templateFormId) {
		try {
			let response = await globalService.getData_Async(
				administratorAPI.API_GetAllAttachmentFileByTemplateFormId(
					templateFormId,
				),
			);
			if (!response || !response.state) {
				return null;
			}
			return response.data;
		} catch (error) {
			return null;
		}
	}
	async deleteAllByTemplateFormId(templateFormId) {
		try {
			let response = await globalService.deleteData_Async(
				administratorAPI.API_DeleteAllFiltByTempId(templateFormId),
			);
			if (!response || !response.state) {
				return false;
			}
			return true;
		} catch (error) {
			return false;
		}
	}
}
const attachmentFileService = new AttachmentFileService();
export default attachmentFileService;
