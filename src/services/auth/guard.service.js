import userService from "../user.service";

class GuardService {
	canAccess(to) {
		if (to.path.match("sign-in")) {
			userService.signOut();
			return true;
		}
		if (to.meta.roles) {
			let userInfo = userService.getUserInfo();
			if (!userInfo) {
				return false;
			}
			if (!userInfo.roles) {
				return false;
			}
			if (
				!userInfo.roles.filter((role) => {
					return to.meta.roles.includes(role.id);
				})
			) {
				return false;
			}
			return true;
		}
		if (to.meta.requiresAuth) {
			return userService.getUserInfo();
		}
		return true;
	}
}

const guardService = new GuardService();
export default guardService;
