<template>
	<li>
		<v-list-item v-if="!isFolder" @click="select" class="cursor-pointer">
			<v-list-item-icon>
				<v-icon v-if="!item.isFolder">{{
					m_files_icon[item.contentType]
				}}</v-icon>
				<v-icon v-else color="yellow darken-2">{{
					m_files_icon[""]
				}}</v-icon>
			</v-list-item-icon>
			<v-list-item-title>
				{{ item.fileName }}
			</v-list-item-title>
		</v-list-item>
		<v-divider v-if="!isFolder"></v-divider>
		<v-list-group v-if="isFolder" @click="toggle">
			<template v-slot:activator>
				<v-list-item-icon>
					<v-icon v-if="!item.isFolder">
						{{ m_files_icon[item.contentType] }}
					</v-icon>
					<v-icon v-else-if="isOpen">
						mdi-folder-open-outline
					</v-icon>
					<v-icon v-else color="yellow darken-2">
						{{ m_files_icon[""] }}
					</v-icon>
				</v-list-item-icon>
				<v-list-item-title>{{ item.fileName }}</v-list-item-title>
			</template>
			<ul>
				<tree-item
					v-for="(child, index) in item.children"
					:key="index"
					:item="child"
					@toggle="$emit('toggle', $event)"
					@select="$emit('select', $event)"
				></tree-item>
			</ul>
		</v-list-group>
	</li>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "OrgchartTreeVue",
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
			this.$emit(constant.keys.toggle, this.item);
		},
		async select() {
			this.$emit(constant.keys.select, this.item);
		},
	},
};
</script>

<style></style>
