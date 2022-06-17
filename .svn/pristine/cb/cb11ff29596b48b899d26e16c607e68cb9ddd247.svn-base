<template>
	<v-form ref="form">
		<v-menu
			ref="m_date_menu"
			v-model="showPicker"
			:close-on-content-click="false"
			:return-value.sync="showPicker"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					ref="m_date_text"
					:value="formatValue"
					dense
					outlined
					:append-icon="m_icon"
					readonly
					v-bind="attrs"
					v-on="on"
					:rules="m_rules"
				>
					<template v-slot:label>
						{{ label }}
						<span v-if="required" class="text-red-600">{{
							$t("label.star")
						}}</span>
					</template>
				</v-text-field>
			</template>
			<v-date-picker
				ref="m_date_picker"
				v-model="tempValue"
				scrollable
				no-title
				@input="showPicker = false"
			>
			</v-date-picker>
		</v-menu>
	</v-form>
</template>

<script>
import constant from "@/common/constant";
export default {
	name: "MDatePickerVue",
	props: {
		label: {},
		icon: {},
		format: {},
		value: {},
		required: {},
	},
	data() {
		return {
			showPicker: false,
			tempValue: "",
			m_format: "DD/MM/yyyy",
			m_icon: "mdi-calendar",
		};
	},
	watch: {
		format(value) {
			if (!value) {
				this.m_format = constant.format.vi_date;
				return;
			}
			this.m_format = value;
		},
		tempValue(value) {
			this.$emit(constant.keys.value, value);
		},
		icon(value) {
			this.m_icon = value;
		},
		value(value) {
			if (!value) return;
			this.$refs.form.reset();
			this.tempValue = value;
		},
	},
	computed: {},
	mounted() {
		this.$refs.form.reset();
		this.m_format = this.format;
		this.tempValue = this.value;
	},
};
</script>

<style></style>
