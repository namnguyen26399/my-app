<template>
	<v-card class="ma-auto mt-15" max-width="500">
		<v-img
			class="elevation-4"
			contain
			src="/img/backgrounds/VRE.jpg"
		></v-img>
		<v-card-title>{{ $t("title.sign_in") }}</v-card-title>
		<v-card-text>
			<v-container class="p-5">
				<v-row>
					<v-btn
						elevation="0"
						width="100%"
						class="blue darken-1 rounded-pill"
						dark
						x-large
						@click="signInOnMicrosoft"
					>
						{{ $t("button.sign_in_microsoft") }}
						<v-icon> mdi-microsoft-windows </v-icon>
					</v-btn>
				</v-row>
				<v-row class="mt-6">
					<v-col cols="4">
						<v-divider class="mt-2"></v-divider>
					</v-col>
					<v-col cols="4">
						<span>{{ $t("label.sign_in_with_username") }} </span>
					</v-col>
					<v-col cols="4">
						<v-divider class="mt-2"></v-divider>
					</v-col>
				</v-row>
				<v-form
					ref="form"
					v-model="valid"
					lazy-validation
					@submit="signIn($event)"
				>
					{{ $t("title.email") }}
					<span class="text-red-600">
						{{ $t("label.star") }}
					</span>
					<v-text-field
						v-model="username"
						:value="safeUsername"
						:error-messages="usernameError"
						dense
						outlined
					>
					</v-text-field>
					{{ $t("title.password") }}
					<span class="text-red-600">
						{{ $t("label.star") }}
					</span>
					<v-text-field
						v-model="password"
						:value="safePassword"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						:error-messages="passwordError"
						@click:append="showPassword = !showPassword"
						dense
						outlined
					></v-text-field>
					<v-checkbox :label="$t('label.remember_me')"></v-checkbox>
					<v-btn
						color="primary darken-1"
						dark
						class="rounded-pill"
						width="100%"
						x-large
						@click="signIn"
					>
						{{ $t("button.sign_in") }}
						<!-- <v-icon> mdi-arrow-right </v-icon> -->
					</v-btn>
				</v-form>
			</v-container>
		</v-card-text>
	</v-card>
</template>

<script>
import globalService from "@/services/global.service";
import userService from "@/services/user.service";
import authService from "@/modules/graph/services/auth.service";
import AuthAPI from "./auth.api";
import UserInfoDto from "@/models/user-info.dto";
import constant from "@/common/constant";
export default {
	name: "SignInVue",
	data() {
		return {
			valid: true,
			username: "",
			password: "",
			rememberMe: false,
			showPassword: false,
			selection: 1,
			askPassword: false,
			file: null,
			usernameError: "",
			passwordError: "",
		};
	},
	watch: {
		username(value) {
			if (!value) {
				this.usernameError = this.$t("error.required");
			} else if (!this.validateUsername(value)) {
				this.usernameError = this.$t("error.invalid_username");
			} else if (`${value}`.length > constant.values.MAX_LENGTH) {
				this.usernameError = this.$t("validator.max_length_255");
			} else {
				this.usernameError = "";
			}
			this.username = `${value}`
				.trim()
				.substring(0, constant.values.MAX_LENGTH - 1);
		},
		password(value) {
			if (!value) {
				this.passwordError = this.$t("error.required");
			} else if (!this.validatePassword(value)) {
				this.passwordError = this.$t("error.invalid_password");
			} else if (`${value}`.length > constant.values.MAX_LENGTH) {
				this.passwordError = this.$t("validator.max_length_255");
			} else {
				this.passwordError = "";
			}
			this.password = `${value}`
				.trim()
				.substring(0, constant.values.MAX_LENGTH - 1);
		},
	},
	computed: {
		safeUsername() {
			return `${this.username}`
				.trim()
				.substring(0, constant.values.MAX_LENGTH - 1);
		},
		safePassword() {
			return `${this.password}`
				.trim()
				.substring(0, constant.values.MAX_LENGTH - 1);
		},
	},
	mounted() {},
	methods: {
		back() {
			this.askPassword = false;
		},
		async signIn(event = false) {
			event.preventDefault();
			if (!this.askPassword) {
				this.askPassword = !!this.username;
				return;
			}
			let response;
			try {
				response = await globalService.getData_Async(
					"/api/user-infos/1",
				);
				if (!response) {
					return;
				}
				if (!response.state) {
					return;
				}
				userService.setUserInfo(response.data);
				this.$router.push({ path: "/" });
			} catch (error) {
				console.log(error);
			}
		},
		async signInOnMicrosoft() {
			try {
				await authService.login();
				let token = await authService.acquireToken();
				if (!token) {
					return;
				}
				let user = authService.user();
				let response = await globalService.getData_Async(
					AuthAPI.API_GetUserByMicrosoftUsername(user.username),
				);
				if (!response || !response.state) {
					return this.toastError("error.fetch_microsoft_user");
				}
				if (!response.data.length) {
					let userDto = UserInfoDto;
					userDto.idInMicrosoft = user.username;
					userDto.infoInMicrosoft = JSON.stringify(user);
					userDto.fullName = user.name;
					let createUserResponse = await globalService.postData_Async(
						AuthAPI.API_SaveUser(),
						userDto,
					);
					if (!createUserResponse) {
						return this.toastError(this.$t("error.login"));
					}
					if (!createUserResponse.state) {
						return this.toastError(createUserResponse.message);
					}
					userService.setUserInfo(createUserResponse.data);
					this.$router.push({ path: "/" });
					return;
				}
				userService.setUserInfo(response.data[0]);
				this.$router.push({ path: "/" });
			} catch (err) {
				console.log(err);
				this.toastError(err);
			}
		},
	},
};
</script>
