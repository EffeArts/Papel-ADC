const {
   Pool,
} = require('pg');

const pool = new Pool({
   user: 'admin',
   host: 'localhost',
   database: 'papel',
   password: 'root',
   port: 5433,
});

const getAccounts = (request, response) => {
   pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
      if (error) {
         throw error;
      }
      response.status(200).json(results.rows);
   });
};

module.exports = {
   getAccounts,
};