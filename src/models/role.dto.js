import TennantDto from "./tennant.dto";

const RoleDto = {
	createdDate: new Date(),
	createdName: "",
	id: 0,
	isActive: true,
	isDelete: false,
	modifiedDate: new Date(),
	modifiedName: "",
	roleCode: "",
	roleName: "",
	tennant: TennantDto,
	tennantCode: "",
	tennantName: "",
};
export default RoleDto;
