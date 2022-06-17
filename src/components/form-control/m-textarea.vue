<template>
	<v-form ref="form">
		<v-textarea
			ref="m-textarea"
			dense
			outlined
			v-model="m_value"
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
		</v-textarea>
	</v-form>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "MTextareaVue",
	props: {
		value: {},
		label: {},
		required: {
			type: Boolean,
		},
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
	computed: {
		m_rules() {
			let _rules = [];
			if (this.required) {
				_rules.push(this.validatorRules.required);
			}
			_rules.push(this.validatorRules.maxLength500);
			_rules.push(this.validatorRules.notTrim);
			return _rules;
		},
	},
	methods: {},
	mounted() {
		this.$refs.form.reset();
		this.m_value = this.value;
	},
};
</script>

<style></style>
