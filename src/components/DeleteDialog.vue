<template>
	<v-card elevation="30" min-width="500" class="rounded-lg">
		<v-toolbar elevation="0">
			<!-- <v-toolbar-title>{{ $t("title.system") }}</v-toolbar-title> -->
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-card-text>
			<v-container class="text-center text-xl font-bold">
				{{ $t("label.confirm_delete") }}
			</v-container>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				elevation="0"
				color="blue darken-2"
				dark
				class="rounded-0"
				@click="confirmDeleteDialog()"
			>
				{{ $t("button.ok") }}
			</v-btn>
			<v-btn
				elevation="0"
				color="grey lighten-4"
				class="rounded-0"
				@click="closeDialog()"
			>
				{{ $t("button.cancel") }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "DeleteDialogVue",
};
</script>

<style></style>
