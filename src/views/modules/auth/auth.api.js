export default class AuthAPI {
	static API_GetUserByMicrosoftUsername(username) {
		return `/api/microsoft/${username}/_all/user-infos`;
	}
	static API_SaveUser() {
		return `/api/user-infos`;
	}
}
