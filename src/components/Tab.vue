<template>
	<v-card elevation="0">
		<v-row>
			<v-col cols="6">
				<v-tabs v-model="m_tab" color="blue">
					<v-tab v-for="tab in tabs" :key="tab.key" color="blue">
						<span class="text-black">
							{{ tab.title }}
						</span>
					</v-tab>
				</v-tabs>
			</v-col>
			<v-col cols="6">
				<v-btn
					v-for="button in buttons"
					elevation="0"
					:key="button.title"
					:text="button.transparent"
					:color="button.color"
					:dark="button.dark"
					@click="$emit('buttonClick', button.event)"
					class="rounded-0 mt-2 float-right"
				>
					<v-icon v-if="!!button.icon">{{ button.icon }}</v-icon>
					{{ button.title }}
				</v-btn>
			</v-col>
		</v-row>
		<v-divider></v-divider>
	</v-card>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "TabVue",
	props: {
		tab: {},
		tabs: { default: { key: "", title: "" } },
		buttons: {
			default: {
				icon: "",
				title: "",
				color: "",
				transparent: true,
				dark: false,
				event: function () {
					console.log("event");
				},
			},
		},
	},
	watch: {
		tab(value) {
			this.m_tab = value;
		},
		m_tab(value) {
			this.$emit(constant.keys.tab, value);
		},
	},
	data() {
		return { m_tab: {} };
	},
};
</script>

<style></style>
