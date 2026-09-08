//#region src/database/migrations/20260727A-add-default-save-action.ts
async function up(knex) {
	await knex.schema.alterTable("directus_settings", (table) => {
		table.string("default_save_action").notNullable().defaultTo("save-and-quit");
	});
}
async function down(knex) {
	await knex.schema.alterTable("directus_settings", (table) => {
		table.dropColumn("default_save_action");
	});
}

//#endregion
export { down, up };