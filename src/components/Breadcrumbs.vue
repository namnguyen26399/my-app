<template>
	<v-card elevation="0" class="px-5">
		<v-card-title>
			<v-breadcrumbs :items="_breadcrumbs" class="pl-0">
				<template v-slot:divider>
					<v-icon>mdi-chevron-right</v-icon>
				</template>
				<template v-slot:item="{ item }">
					<v-breadcrumbs-item
						:disabled="item.disabled"
						:class="item.disabled ? 'text--red' : 'text--grey'"
					>
						{{ item.text }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
			<v-spacer></v-spacer>
			<v-text-field
				dense
				outlined
				append-icon="mdi-magnify"
				class="rounded-pill"
			></v-text-field>
		</v-card-title>
	</v-card>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "BreadcrumbsVue",
	watch: {
		search(value) {
			this.$emit(constant.keys.search, value);
		},
	},
	data() {
		return {
			search: "",
		};
	},
	computed: {
		_breadcrumbs: {
			get() {
				return this.getBreadscrumb();
			},
		},
	},
};
</script>

<style></style>
