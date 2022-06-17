<template>
	<v-chip color="white">
		<v-avatar left color="red darken-2">
			<v-icon color="white">
				{{
					m_item
						? getAvatarText(m_item.fullName)
						: "mdi-account-circle"
				}}
			</v-icon>
		</v-avatar>
		{{ `${m_item.fullName}` }}
	</v-chip>
</template>

<script>
import globalService from "@/services/global.service";
import administratorAPI from "@/views/modules/administrator/administrator.api";

export default {
	name: "UserChipVue",
	props: { item: {} },
	data() {
		return {
			m_item: {},
		};
	},
	watch: {
		async item(value) {
			await this.update(value);
		},
	},
	async mounted() {
		await this.update(this.item);
	},
	methods: {
		async update(value) {
			let response;
			try {
				response = await globalService.getData_Async(
					administratorAPI.API_GetUserInfo(value.id),
				);
				if (!response || !response.state) {
					return;
				}
				this.m_item = response.data;
			} catch (error) {
				console.log(error);
				this.m_item = value;
			}
		},
	},
};
</script>

<style></style>
