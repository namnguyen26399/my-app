<template>
	<v-card elevation="0">
		<vue-breadcrumbs></vue-breadcrumbs>
		<v-dialog v-model="dialog.delete" persistent max-width="fit-content">
			<vue-delete-dialog
				@close="onCloseDialog"
				@confirmDelete="onConfirmDelete"
			></vue-delete-dialog>
		</v-dialog>
		<v-dialog v-model="dialog.edit" persistent max-width="fit-content">
			<v-card>
				<v-toolbar>
					<v-toolbar-title>
						{{ $t("label.information") }}
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="cancel">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
			</v-card>
		</v-dialog>
		<template>
			<v-card-title>
				<v-btn elevation="0" text @click="dialog.edit = true">
					<v-icon>mdi-plus-circle</v-icon>
					{{ $t("button.insert") }}
				</v-btn>
				<v-btn elevation="0" text>
					<v-icon>mdi-cloud-sync-outline </v-icon>
					{{ $t("button.sync") }}
				</v-btn>
				<v-btn v-if="selected.length > 0" elevation="0" text>
					<v-icon>mdi-trash-can-outline</v-icon>
					{{ $t("button.delete_all") }}
				</v-btn>
			</v-card-title>
		</template>
		<v-card-text>
			<v-treeview
				v-model="selected"
				selectable
				:items="root"
				open-on-click
			>
				<template v-slot:prepend="{ item, open }">
					<v-icon v-if="item.children && item.children.length">
						{{ open ? "mdi-folder-open" : "mdi-folder" }}
					</v-icon>
				</template>
				<template v-slot:label="{ item }">
					<span v-if="item.name.length > 50 && !showAllText">
						{{ item.name.slice(0, 50) }}
						<a href="#" @click="showAllText = !showAllText">
							{{ $t("button.details") }}
						</a>
					</span>
					<span
						v-if="item.name.length > 50 && showAllText"
						style="white-space: normal"
					>
						{{ item.name }}
						<a href="#" @click="showAllText = !showAllText">
							{{ $t("button.hide") }}
						</a>
					</span>
					<span v-if="item.name.length <= 50">
						{{ item.name }}
					</span>
					<v-chip v-if="item.sync" color="primary">
						{{ $t("label.ad") }}
					</v-chip>
					<v-menu
						transition="slide-y-transition"
						bottom
						open-on-click
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="grey darken-2"
								dark
								icon
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="createChild(item)">
								<v-list-item-icon>
									<v-icon color="green darken-2">
										mdi-plus-circle
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>{{
									$t("button.insert")
								}}</v-list-item-title>
							</v-list-item>
							<v-list-item @click="editItem(item)">
								<v-list-item-icon>
									<v-icon color="blue darken-2">
										mdi-pencil
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title>{{
									$t("button.edit")
								}}</v-list-item-title>
							</v-list-item>
							<v-list-item @click="deleteItem(item)">
								<v-list-item-icon>
									<v-icon color="red darken-2">
										mdi-trash-can-outline
									</v-icon>
								</v-list-item-icon>
								<v-list-item-title color="red darken-2">{{
									$t("button.delete")
								}}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-divider></v-divider>
				</template>
			</v-treeview>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "OrgchartListVue",
	components: {},
	data() {
		return {
			selected: [],

			root: [
				{
					id: Math.random() * 100,
					name: "Vingroup",
					sync: true,
					children: [
						{
							id: Math.random() * 100,
							name: "Vinhomes",
							sync: true,
							children: [],
						},
						{
							id: Math.random() * 100,
							name: "Vincom Retails",
							sync: true,
							children: [
								{
									id: Math.random() * 100,
									name: "Phòng pháp chế",
									sync: false,
									children: [],
								},
								{
									id: Math.random() * 100,
									name: "Phòng kinh doanh",
									sync: false,
									children: [],
								},
								{
									id: Math.random() * 100,
									name: "Phòng vận hành",
									sync: false,
									children: [],
								},
								{
									id: Math.random() * 100,
									name: "Ban quản lý",
									sync: false,
									children: [],
								},
								{
									id: Math.random() * 100,
									name: "CNTT",
									sync: false,
									children: [],
								},
							],
						},
						{
							id: Math.random() * 100,
							name: "Vinfast",
							sync: true,
							children: [],
						},
						{
							id: Math.random() * 100,
							name: "Vinpearl",
							sync: true,
							children: [],
						},
					],
				},
			],
		};
	},
};
</script>

<style></style>
