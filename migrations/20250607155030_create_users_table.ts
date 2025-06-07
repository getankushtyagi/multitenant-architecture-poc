import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email').unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

