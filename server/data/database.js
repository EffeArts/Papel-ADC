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

module.exports = {
   getAccounts,
   getTransactionsByAcc
};