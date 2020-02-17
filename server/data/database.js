const {
   Pool
} = require("pg");

const pool = new Pool({
   user: "admin",
   host: "localhost",
   database: "papel",
   password: "root",
   port: 5433
});

const getAccounts = (request, response) => {
   pool.query("SELECT * FROM accounts ORDER BY id ASC", (error, results) => {
      if (error) {
         throw error;
      }
      const reply = {
         status: 200,
         data: results.rows
      };
      response.send(reply);
   });
};

const getTransactions = (request, response) => {
   pool.query("SELECT * FROM transactions ORDER BY id ASC", (error, results) => {
      if (error) {
         throw error;
      }
      const reply = {
         status: 200,
         data: results.rows
      };
      response.send(reply);
   });
};

const getTransactionsByAcc = (request, response) => {
   const acc_num = parseInt(request.params.acc_num);

   pool.query(
      "SELECT * FROM transactions WHERE accnumber = $1",
      [acc_num],
      (error, results) => {
         if (error) {
            throw error;
         }
         const reply = {
            status: 200,
            data: results.rows
         };
         response.send(reply);
      }
   );
};

const getTransactionById = (request, response) => {
   const id = parseInt(request.params.id);

   pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id],
      (error, results) => {
         if (error) {
            throw error;
         }
         const reply = {
            status: 200,
            data: results.rows
         };
         response.send(reply);
      }
   );
};

module.exports = {
   getAccounts,
   getTransactionsByAcc,
   getTransactions,
   getTransactionById
};