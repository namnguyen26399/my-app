<template>
	<textarea :name="name"></textarea>
</template>

<script>
import $ from "jquery";

export default {
	name: "SummernoteVue",
	props: {
		model: {},
		name: {},
		configs: {},
	},
	mounted() {
		let vm = this;
		let configs = this.configs;

		configs.callbacks = {
			onInit: function () {
				$(vm.$el).summernote("code", vm.model);
			},

			onChange: function () {
				vm.$emit("change", $(vm.$el).summernote("code"));
			},

			onBlur: function () {
				vm.$emit("change", $(vm.$el).summernote("code"));
			},
		};

		$(this.$el).summernote(configs);
	},
};
</script>

<style></style>
