<template>
	<li>
		<v-list-item v-if="!isFolder" class="cursor-pointer" :to="item.link">
			<v-list-item-icon>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-item-icon>
			<v-list-item-title>
				{{ item.title }}
			</v-list-item-title>
		</v-list-item>
		<v-list-group v-if="isFolder" @click="toggle">
			<template v-slot:activator>
				<v-list-item-icon>
					<v-icon>
						{{ item.icon }}
					</v-icon>
				</v-list-item-icon>
				<v-list-item-title>{{ item.title }}</v-list-item-title>
			</template>
			<ul>
				<nav-item
					v-for="(child, index) in item.children"
					:key="index"
					:item="child"
					@toggle="$emit('toggle', $event)"
				></nav-item>
			</ul>
		</v-list-group>
	</li>
</template>

<script>
export default {
	name: "NavItemVue",
	props: {
		item: Object,
	},
	data: function () {
		return {
			isOpen: false,
		};
	},
	watch: {
		item() {
			this.isOpen = false;
		},
	},
	computed: {
		isFolder: function () {
			return this.item && this.item.children && this.item.children.length;
		},
	},
	mounted() {
		this.m_item = this.item;
	},
	methods: {
		async toggle() {
			this.isOpen = !this.isOpen;
		},
	},
};
</script>

<style></style>
