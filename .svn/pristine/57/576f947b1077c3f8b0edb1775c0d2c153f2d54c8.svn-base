<template>
	<v-form ref="form">
		<v-text-field
			ref="m-text-field"
			dense
			outlined
			v-model="m_value"
			:rules="m_rules"
			:append-icon="append_icon"
			:readonly="readonly"
			maxlength="255"
		>
			<template v-slot:label>
				{{ label }}
				<span v-if="required" class="text-red-600">{{
					$t("label.star")
				}}</span>
			</template>
		</v-text-field>
	</v-form>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "MTextFieldVue",
	props: {
		value: {},
		label: {},
		required: {},
		append_icon: { type: String },
		readonly: { type: Boolean },
	},
	data() {
		return {
			m_value: "",
		};
	},
	watch: {
		value(value) {
			this.$refs.form.reset();
			this.m_value = value;
		},
		m_value(value) {
			if (!value) {
				this.$emit(constant.keys.value, "");
				return;
			}
			this.$emit(constant.keys.value, `${value}`);
		},
	},
	computed: {},
	methods: {},
	mounted() {
		this.$refs.form.reset();
		this.m_value = this.value;
	},
};
</script>

<style></style>
