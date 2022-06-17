<template>
	<v-card elevation="0">
		<v-toolbar>
			<v-toolbar-title>{{
				$t("title.template_form_selection")
			}}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="cancel">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<VuePerfectScrollbar class="h-60">
			<v-card-text>
				<v-row>
					<v-col
						v-for="templateForm in templateForms"
						:key="templateForm.id"
						cols="12"
						md="4"
						sm="12"
					>
						<v-card
							elevation="0"
							@click="select(templateForm)"
							:color="
								!!isSelected(templateForm)
									? 'grey accent-1'
									: ''
							"
						>
							<v-badge
								v-if="!!isSelected(templateForm)"
								:icon="isSelected(templateForm)"
								offset-x="-4"
								overlap
							>
							</v-badge>
							<v-card-title>
								{{ templateForm.templateFormName }}
							</v-card-title>
							<v-card-text>
								<VueDocPreview
									:value="downloadUrl(templateForm)"
									type="office"
									:height="40"
								/>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-card-text>
		</VuePerfectScrollbar>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="red darken-2" dark class="rounded" @click="cancel()">
				<v-icon>mdi-close </v-icon>
				{{ $t("button.close") }}
			</v-btn>
			<v-btn color="blue darken-2" dark class="rounded" @click="accept()">
				<v-icon> mdi-check </v-icon>
				{{ $t("button.select") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import constant from "@/common/constant";
import VueDocPreview from "vue-doc-preview";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	name: "TeplateFormGridVue",
	components: { VueDocPreview, VuePerfectScrollbar },
	props: {
		items: [],
		selected: [],
	},
	watch: {
		items(value) {
			this.templateForms = value;
		},
		selected(value) {
			this.old = [...value];
			this.selectedTemplateForms = [...value];
		},
	},
	computed: {},
	data() {
		return {
			templateForms: [],
			selectedTemplateForms: [],
			old: [],
		};
	},
	mounted() {
		this.initialize();
	},
	methods: {
		async initialize() {
			this.templateForms = this.items;
		},
		cancel() {
			this.$emit(constant.keys.save, this.old);
		},
		downloadUrl(templateForm) {
			console.log(templateForm);
			// return encodeURIComponent(`wefree.club/public/doc/test.docx`);
		},
		select(item) {
			if (this.selectedTemplateForms.indexOf(item) == -1) {
				return this.selectedTemplateForms.push(item);
			}
			this.selectedTemplateForms.splice(
				this.selectedTemplateForms.indexOf(item),
				1,
			);
		},
		isSelected(item) {
			return this.selectedTemplateForms.indexOf(item) != -1
				? "mdi-check"
				: "";
		},
		accept() {
			this.$emit(constant.keys.save, this.selectedTemplateForms);
		},
	},
};
</script>

<style></style>
