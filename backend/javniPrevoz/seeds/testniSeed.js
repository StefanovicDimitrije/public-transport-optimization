//test knex seeds
//fills a table with initial values
//install on PC and use DB Browser for SQL Lite for checking databases and table values
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('testTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('testTable').insert([
        {id: 1, test1: 'rowValue1', test2: '10'},
        {id: 2, test1: 'rowValue2', test2: '20'},
        {id: 3, test1: 'rowValue3', test2: '30'}
      ]);
    });
};
