<template>
	<div>
		<v-row>
			<v-col cols="2">
				<v-card-text>
					<h2 style="text-align: center">Các thuộc tính</h2>
					<Container
						group-name="column"
						:get-child-payload="
							(itemIndex) => getChildPayload_Selector(itemIndex)
						"
						:should-accept-drop="
							(src, payload) =>
								getShouldAcceptDrop(0, src, payload)
						"
						:should-animate-drop="
							(src, payload) =>
								getShouldAnimateDrop(0, src, payload)
						"
					>
						<Draggable
							v-for="(item, index) in selectors"
							:key="'selectors_' + index"
						>
							<div class="draggable-item">{{ item.data }}</div>
							<v-form v-model="valid">
								<v-jsf
									v-model="item.model"
									:schema="item.schema"
								/>
							</v-form>
						</Draggable>
					</Container>
				</v-card-text>
			</v-col>

			<v-divider vertical></v-divider>
			<v-col cols="8">
				<h2 style="text-align: center">Gắn các thuộc vào biểu mẫu</h2>
				<div v-for="(row, rowIndex) in rows" :key="row.id">
					<v-row :key="row.id">
						<v-col cols="11">
							<div class="columns">
								<Container
									v-for="(items, index) in groups[rowIndex]"
									:key="index"
									class="column"
									:data-index="index"
									group-name="column"
									:get-child-payload="
										(itemIndex) =>
											getChildPayloadInRow(
												rowIndex,
												index,
												itemIndex,
											)
									"
									:should-accept-drop="
										(src, payload) =>
											getShouldAcceptDrop(
												index,
												src,
												payload,
											)
									"
									:should-animate-drop="
										(src, payload) =>
											getShouldAnimateDrop(
												index,
												src,
												payload,
											)
									"
									@drop="
										onDrop(rowIndex, index, $event, false)
									"
								>
									<Draggable
										v-for="item in items"
										:key="item.id"
									>
										<div class="draggable-item">
											{{ item.data }}
										</div>
										<v-form v-model="valid">
											<v-jsf
												v-model="item.model"
												:schema="item.schema"
											/>
										</v-form>
									</Draggable>
								</Container>
							</div>
						</v-col>
						<v-col cols="1">
							<v-btn
								color="primary mb-2"
								small
								@click="addColumn(rowIndex)"
								>Thêm cột</v-btn
							>
							<v-btn
								small
								color="red"
								class="ml-2"
								dark
								@click="removeColumn(rowIndex)"
								>Xóa cột</v-btn
							>
						</v-col>
					</v-row>
				</div>

				<v-row class="mt-4">
					<v-col cols="12">
						<v-btn color="primary mr-2" dark @click="addRows()"
							>Thêm dòng</v-btn
						>
						<v-btn color="red" dark @click="removeRows()"
							>xóa dòng</v-btn
						>
					</v-col>
				</v-row>
			</v-col>
			<v-divider vertical></v-divider>
			<v-col cols="2">
				<h2 style="text-align: center">Xem trước biểu mẫu</h2>
			</v-col>
		</v-row>
		<v-footer class="mt-2">
			<v-btn
				elevation="0"
				color="red"
				dark
				class="rounded-pill"
				@click="saveForm()"
				>{{ $t("button.save") }}</v-btn
			>
			<router-link :to="'list-process'" style="text-decoration: none">
				<v-list-item-title>
					<v-btn color="red" dark class="ml-2">{{
						$t("button.cancel")
					}}</v-btn>
				</v-list-item-title>
			</router-link>
		</v-footer>
	</div>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../../utils/helpers.js";
import Vue from "vue";
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";

let i = 0;

function id() {
	return `item-${++i}`;
}

function generate(num) {
	return generateItems(0, (i) => ({
		id: id(),
		data: `Draggable ${num} - ${i + 1}`,
		model: {},
		schema: "<h1>Duowng</h1>",
	}));
}

export default {
	name: "DnDropV1",
	components: {
		Container,
		Draggable,
		VJsf,
	},

	data() {
		return {
			valid: null,
			groups: [[]],
			rows: [1],
			selectors: [],
			flags: [],
			logs: {
				"get-child-payload": true,
				"should-accept-drop": false,
				"should-animate-drop": false,
				"drag-start": true,
				"drag-end": true,
				"drag-enter": true,
				"drag-leave": true,
				"drop-not-allowed": true,
				drop: true,
			},
			logPayload: true,
		};
	},

	async created() {
		await this.getAllField();
		this.addColumn(0);
	},

	methods: {
		async getAllField() {
			this.selectors = [];
			await this.axios
				.get("http://localhost:3000/fields")
				.then((response) => {
					if (response?.data) {
						response.data.forEach((ele) => {
							this.selectors.push({
								model: {},
								schema: {
									type: "object",
									properties: ele.data,
								},
							});
						});
					}
				})
				.catch((exception) => alert(exception));
		},
		getChildPayload(groupIndex, itemIndex) {
			this.log("get-child-payload", groupIndex, itemIndex);
			return this.groups[groupIndex][itemIndex];
		},
		getChildPayload_Selector(itemIndex) {
			return this.selectors[itemIndex];
		},
		getChildPayloadInRow(rowIndex, columnIndex, itemIndex) {
			return this.groups[rowIndex][columnIndex][itemIndex];
		},
		getShouldAcceptDrop(index, sourceContainerOptions, payload) {
			this.log("should-accept-drop", sourceContainerOptions, payload);
			return this.flags[index]?.drop;
		},

		getShouldAnimateDrop(index, sourceContainerOptions, payload) {
			this.log("should-animate-drop", sourceContainerOptions, payload);
			return this.flags[index]?.animate;
		},
		onDragStart(...args) {
			this.log("drag-start", ...args);
		},

		onDragEnd(...args) {
			this.log("drag-end", ...args);
		},
		onDragEnter(...args) {
			this.log("drag-enter", ...args);
		},

		onDragLeave(...args) {
			this.log("drag-leave", ...args);
		},
		fireRelatedEventsOnly(...args) {
			this.log("fireRelatedEventsOnly", ...args);
		},

		onDrop(rowIndex, columnIndex, dropResult, isNoRemove) {
			let result = applyDrag(
				this.groups[rowIndex][columnIndex],
				dropResult,
				isNoRemove,
			);
			Vue.set(this.groups[rowIndex], columnIndex, result);
		},

		dropNotAllowed(...args) {
			this.log("drop-not-allowed", ...args);
		},
		addColumn(index) {
			if (this.groups[index].length < 3) {
				this.groups[index].push(generate(this.groups.length + 1));
				this.flags.push({ drop: true, animate: true });
			}
		},
		addRows() {
			this.rows.push(parseInt(this.rows[this.rows.length - 1]) + 1);
			this.groups.push([generate(this.groups.length + 1)]);
		},
		removeRows() {
			this.rows.splice(parseInt(this.rows[this.rows.length - 1]) - 1, 1);
			this.groups.splice(this.groups.length - 1, 1);
		},

		removeColumn(index) {
			this.groups[index].pop();
			this.flags.pop();
		},
		log(name, ...args) {
			if (this.logs[name]) {
				this.logPayload
					? console.log(name, ...args)
					: console.log(name);
			}
		},
	},
};
</script>

<style scoped>
.columns {
	display: flex;
	/* display: grid;
	grid-template-columns: 1fr 1fr 1fr ; */
	gap: 0.5rem;
	justify-content: stretch;
}
.column {
	padding: 10px;
	border: 1px solid rgb(196, 196, 196);
	min-height: 4rem;
	margin-bottom: 1rem;
}

.column:hover {
	background: rgb(210, 232, 252);
}

.column {
	flex: 1;
}

.column {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}
</style>
