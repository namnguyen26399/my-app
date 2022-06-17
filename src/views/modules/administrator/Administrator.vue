<template>
	<v-card elevation="0">
		<router-view></router-view>
	</v-card>
</template>

<script>
export default {
	name: "AdministratorVue",
	components: {},
	data() {
		return {};
	},
	created() {
		this.$Progress.start();
	},
	mounted() {
		this.$Progress.finish();
	},
};
</script>

<style></style>
