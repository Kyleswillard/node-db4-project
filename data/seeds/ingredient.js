exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('table_name')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('ingredients').insert([
                { ingredient_name: 'Olive Oil', quantity: 0.005 },
                { ingredient_name: 'Tomato', quantity: 1 },
                { ingredient_name: 'Beef', quantity: 1.5 }
            ])
        })
}
