<template>
	<v-app-bar dense elevation="0" flat app shrink-on-scroll prominent>
		<v-avatar class="h-100 w-auto">
			<img class="h-100" contain src="/img/icons/vsm.jpg" alt="logo" />
		</v-avatar>
		<v-spacer></v-spacer>
		<v-btn icon @click.stop="signOut()">
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import userService from "@/services/user.service";

export default {
	name: "AppBar",
	components: {},
	props: {
		attrs: {
			type: Object,
			default: () => ({}),
		},
	},
	data: () => {
		return {};
	},
	methods: {
		signOut() {
			userService.signOut();
			this.$router.push({
				path: "/sign-in",
			});
		},
	},
};
</script>

<style>
.h-100 {
	height: 100% !important;
}
.w-auto {
	width: auto !important;
}
</style>
