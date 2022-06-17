import vue from "@/main";
import store from "@/store";
import * as msal from "@azure/msal-browser";
class AuthService {
	constructor() {
		this.configured = false;
		this.msalApp = null;
	}
	async configure(clientId) {
		if (this.configured) {
			return;
		}

		if (!clientId) {
			return;
		}

		const config = {
			auth: {
				clientId: clientId,
				redirectUri: window.location.origin,
				authority: "https://login.microsoftonline.com/common",
			},
			cache: {
				cacheLocation: "localStorage",
			},
		};

		this.msalApp = new msal.PublicClientApplication(config);
		this.configured = true;
	}

	clientId() {
		if (!this.msalApp) {
			return null;
		}

		return this.msalApp.config.auth.clientId;
	}

	async login(scopes = ["user.read", "openid", "profile", "email"]) {
		if (!this.isConfigured) {
			this.configure(store.state.config.azureAppId);
		}
		if (!this.msalApp) {
			return;
		}

		await this.msalApp.loginPopup({
			scopes,
			prompt: "select_account",
		});
	}

	logout() {
		if (!this.msalApp) {
			return;
		}

		this.msalApp.logoutPopup();
	}

	user() {
		if (!this.msalApp) {
			return null;
		}

		const currentAccounts = this.msalApp.getAllAccounts();
		if (!currentAccounts || currentAccounts.length === 0) {
			// No user signed in
			return null;
		} else if (currentAccounts.length > 1) {
			return currentAccounts[0];
		} else {
			return currentAccounts[0];
		}
	}

	async acquireToken(scopes = ["user.read"]) {
		if (!this.msalApp) {
			return null;
		}

		const accessTokenRequest = {
			scopes,
			account: this.user(),
		};

		let tokenResp;
		try {
			tokenResp = await this.msalApp.acquireTokenSilent(
				accessTokenRequest,
			);
		} catch (err) {
			tokenResp = await this.msalApp.acquireTokenPopup(
				accessTokenRequest,
			);
		}

		if (!tokenResp.accessToken) {
			throw new Error(vue.$t("error.access_token"));
		}

		return tokenResp.accessToken;
	}
	clearLocal() {
		if (this.msalApp) {
			for (let entry of Object.entries(localStorage)) {
				let key = entry[0];
				if (key.includes("login.windows")) {
					localStorage.removeItem(key);
				}
			}
		}
	}
	get isConfigured() {
		return this.configured;
	}
}
const authService = new AuthService();
export default authService;
