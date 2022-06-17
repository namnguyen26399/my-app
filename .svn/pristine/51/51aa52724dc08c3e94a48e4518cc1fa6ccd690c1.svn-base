<template>
	<v-card elevation="0">
		<v-skeleton-loader
			v-if="!items"
			v-bind="attrs"
			type="list-item-three-line"
		></v-skeleton-loader>
		<v-row v-else>
			<v-col cols="4">
				<v-text-field
					filled
					single-line
					clearable
					append-icon="mdi-magnify"
					v-model="search"
					hide-details
				>
				</v-text-field>
				<VuePerfectScrollbar class="h-80 grey lighten-4">
					<v-list two-line class="pa-0">
						<v-list-item-group v-model="tempSelect" multiple>
							<v-list-item
								v-for="item in filterdItems"
								:key="item[keyName]"
								color="green"
								class="grey lighten-4"
							>
								<template v-slot:default="{ active }">
									<v-list-item-content>
										<v-list-item-title>
											{{ item[valueName] }}
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-icon
											v-if="!active"
											color="grey lighten-1"
										>
											mdi-check-circle-outline
										</v-icon>

										<v-icon v-else color="green darken-3">
											mdi-check-circle
										</v-icon>
									</v-list-item-action>
								</template>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</VuePerfectScrollbar>
			</v-col>
			<v-col cols="1" class="text-center align-center my-auto">
				<p>
					<v-btn icon @click="addAll">
						<v-icon>mdi-chevron-double-right </v-icon>
					</v-btn>
				</p>
				<p>
					<v-btn icon @click="add">
						<v-icon>mdi-chevron-right </v-icon>
					</v-btn>
				</p>
				<p>
					<v-btn icon @click="remove">
						<v-icon>mdi-chevron-left </v-icon>
					</v-btn>
				</p>
				<p>
					<v-btn icon @click="removeAll">
						<v-icon>mdi-chevron-double-left </v-icon>
					</v-btn>
				</p>
			</v-col>
			<v-col cols="4">
				<v-text-field
					filled
					single-line
					clearable
					append-icon="mdi-magnify"
					hide-details
					v-model="searchSelected"
				>
				</v-text-field>
				<VuePerfectScrollbar class="h-80 grey lighten-4">
					<v-list two-line class="pa-0">
						<v-list-item-group v-model="tempRemove" multiple>
							<v-list-item
								v-for="item in filteredSelected"
								:key="item[keyName]"
								color="red"
								class="grey lighten-4"
							>
								<template v-slot:default="{ active }">
									<v-list-item-content>
										<v-list-item-title>
											{{ item[valueName] }}
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-icon
											v-if="!active"
											color="grey lighten-1"
										>
											mdi-close-circle-outline
										</v-icon>

										<v-icon v-else color="red darken-3">
											mdi-close-circle
										</v-icon>
									</v-list-item-action>
								</template>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</VuePerfectScrollbar>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import constant from "@/common/constant";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	name: "SelectListVue",
	components: { VuePerfectScrollbar },
	props: {
		items: { type: Array },
		selected: { type: Array },
		keyName: { type: String },
		valueName: { type: String },
	},
	watch: {
		search(value) {
			if (value) {
				value = value.trim();
			}
			if (!value) {
				this.filterdItems = this.m_items;
				return;
			}
			this.filterdItems = this.m_items.filter((entry) => {
				return this.matchString(`${entry[this.valueName]}`, `${value}`);
			});
		},
		searchSelected(value) {
			if (value) {
				value = value.trim();
			}
			value = value.trim();
			if (!value) {
				this.filteredSelected = this.m_selected;
				return;
			}
			this.filteredSelected = this.m_selected.filter((entry) => {
				return this.matchString(`${entry[this.valueName]}`, `${value}`);
			});
		},
		m_selected(value) {
			this.searchSelected = "";
			this.filteredSelected = value;
		},
		items(value) {
			this.m_items = [];
			if (!value) {
				return;
			}
			for (let item of value) {
				this.m_items.push(Object.assign({}, item));
			}
		},
		m_items(value) {
			this.search = "";
			this.filterdItems = value;
		},
		selected(value) {
			this.m_selected = [];
			if (!value) {
				return;
			}
			for (let item of value) {
				this.m_selected.push(Object.assign({}, item));
			}
		},
	},
	data() {
		return {
			filterdItems: this.items,
			m_selected: [],
			filteredSelected: this.m_selected,
			tempSelect: [],
			tempRemove: [],
			search: "",
			searchSelected: "",
			m_items: [],
		};
	},
	created() {},
	mounted() {
		for (let item of this.items) {
			this.m_items.push(Object.assign({}, item));
			this.filterdItems.push(Object.assign({}, item));
		}
		for (let item of this.selected) {
			this.m_selected.push(Object.assign({}, item));
			this.filteredSelected.push(Object.assign({}, item));
		}
	},
	destroyed() {
		this.m_items = [];
		this.m_selected = [];
		this.resetFilter();
	},
	methods: {
		resetFilter() {
			this.search = "";
			this.searchSelected = "";
			this.tempSelect = [];
			this.tempRemove = [];
		},
		add() {
			if (!this.m_selected) {
				this.m_selected = [];
			}
			for (let item of this.tempSelect) {
				let result = this.m_selected.findIndex(
					(v) =>
						v[this.keyName] ==
						this.filterdItems[item][this.keyName],
				);
				if (result < 0) {
					this.m_selected.push(
						Object.assign({}, this.filterdItems[item]),
					);
				}
			}
			this.resetFilter();
			this.$emit(constant.keys.update, this.m_selected);
		},
		remove() {
			for (let item of this.tempRemove) {
				let result = this.m_selected.findIndex(
					(v) =>
						v[this.keyName] ==
						this.filteredSelected[item][this.keyName],
				);
				if (result >= 0) {
					this.m_selected.splice(result, 1);
				}
			}
			this.resetFilter();
			this.$emit(constant.keys.update, this.m_selected);
		},
		addAll() {
			for (let item of this.filterdItems) {
				let result = this.m_selected.findIndex(
					(v) => v[this.keyName] == item[this.keyName],
				);
				console.log("result", result);

				if (result < 0) {
					this.m_selected.push(Object.assign({}, item));
				}
			}

			this.resetFilter();
			this.$emit(constant.keys.update, this.m_selected);
		},
		removeAll() {
			// for (let item of this.filteredSelected) {
			// 	let result = this.m_selected.findIndex(
			// 		(v) => v[this.keyName] == item[this.keyName],
			// 	);
			// 	if (result >= 0) {
			// 		this.m_selected.splice(result, 1);
			// 	}
			// }
			this.m_selected = this.m_selected.filter(
				(ele) =>
					!this.filteredSelected.some((ele1) => ele.id == ele1.id),
			);
			this.resetFilter();
			this.$emit(constant.keys.update, this.m_selected);
		},
	},
};
</script>
