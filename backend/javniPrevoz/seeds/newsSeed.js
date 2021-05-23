
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('News').del()
    .then(function () {
      // Inserts seed entries
      return knex('News').insert([
        { 
          id: 1, 
          Date: '2019-02-26', 
          Title: 'Change of route for Line 706', 
          Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          Cover: 'bg6.jpg'
        },
        { 
          id: 2, 
          Date: '2021-02-02', 
          Title: 'Change of route for Line 77', 
          Text: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          Cover: 'bg6.jpg'
        }, 
        { 
          id: 3, 
          Date: '2021-05-30', 
          Title: 'New Covid measures for safe travel', 
          Text: 'Lorem labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          Cover: 'bg6.jpg'
        }
      ]);
    });
};
