<template>
	<v-card>
		<v-toolbar color="grey lighten-4">
			<v-toolbar-title> Tạo OTP </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text class="mt-4">
			<v-container>
				<v-row>
					<v-col>
						<v-textarea outlined>
							<template v-slot:label>
								Nội dung <span class="red--text">(*)</span>
							</template>
						</v-textarea>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-file-input
							truncate-length="15"
							multiple
							label="File input"
						></v-file-input>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn elevation="0" color="blue darken-2" dark class="rounded-0">
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
export default {};
</script>

<style></style>
