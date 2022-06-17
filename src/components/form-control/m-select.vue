<template>
	<v-form ref="form">
		<v-select
			dense
			outlined
			:items="items"
			:value="value"
			v-model="m_value"
			:label="label"
			:rules="m_rules"
			:append-icon="append_icon"
			:readonly="readonly"
		>
			<template v-slot:label>
				{{ label }}
				<span v-if="required" class="text-red-600">{{
					$t("label.star")
				}}</span>
			</template>
		</v-select>
	</v-form>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "MSelectVue",
	props: { items: {}, value: {}, append_icon: {}, readonly: {}, label: {} },
	data() {
		return {
			m_value: {},
		};
	},
	watch: {
		value(value) {
			this.$refs.form.reset();
			this.m_value = value;
		},
		m_value(value) {
			this.$emit(constant.keys.value, value);
		},
	},
	computed: {},
	mounted() {
		this.$refs.form.reset();
		this.m_value = this.value;
	},
};
</script>

<style></style>
