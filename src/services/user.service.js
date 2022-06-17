import authService from "@/modules/graph/services/auth.service";
import cryptojsService from "./cryptojs.service";

class UserService {
	static get SECRET() {
		return "+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B&";
	}
	static get KEY() {
		return `APP_AUTH`;
	}
	getUserInfo() {
		let userInfo = null;
		try {
			let encrypted = localStorage.getItem(UserService.KEY);
			if (!encrypted) {
				return null;
			}
			userInfo = JSON.parse(
				cryptojsService.decrypt(encrypted, UserService.SECRET),
			);
			return userInfo;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	setUserInfo(userInfo) {
		try {
			localStorage.setItem(
				UserService.KEY,
				cryptojsService.encrypt(
					JSON.stringify(userInfo),
					UserService.SECRET,
				),
			);
		} catch (e) {
			console.log(e);
		}
	}
	signOut() {
		localStorage.removeItem(UserService.KEY);
		authService.clearLocal();
	}
}

const userService = new UserService();
export default userService;
