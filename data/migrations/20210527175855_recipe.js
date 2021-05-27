exports.up = function (knex) {
    return (
        knex.schema
            // Ingredient Table first because NO FOREIGN KEYS
            .createTable('ingredients', (tbl) => {
                tbl.increments('ingredient_id')
                tbl.string('ingredient_name').notNullable().unique()
                tbl.integer('quantity')
            })
            // Steps Table Next
            //TODO: Verify that Ingredients works appropriately!!
            .createTable('steps', (tbl) => {
                tbl.increments('step_id')
                tbl.integer('step_number').notNullable()
                tbl.string('step_instructions').notNullable()
                tbl.foreign('array_ingredient_id')
                    .references('ingredients.ingredient_id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
            // Recipe Table
            // TODO: Verify That Steps array works!
            .createTable('recipes', (tbl) => {
                tbl.increments('recipe_id')
                tbl.string('recipe_name').notNullable().unique()
                tbl.timestamp('created_at').notNullable()
                tbl.foreign('array_step_id')
                    .references('steps.step_id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
    )
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('recipes')
}
