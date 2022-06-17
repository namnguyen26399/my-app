import CryptoJS from "crypto-js";

class CryptoJsService {
	encrypt(value, secret) {
		return CryptoJS.AES.encrypt(value, secret).toString();
	}
	decrypt(encrypted, secret) {
		return CryptoJS.AES.decrypt(encrypted, secret).toString(
			CryptoJS.enc.Utf8,
		);
	}
}

const cryptojsService = new CryptoJsService();

export default cryptojsService;
