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

const getUsers = (request, response) => {
   pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
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

const getUserAccounts = (request, response) => {
   const email = request.params.email;

   pool.query(
      "SELECT accounts.createdOn, accounts.accnumber, accounts.type, accounts.status, accounts.balance  FROM accounts INNER JOIN users ON accounts.owner = users.id  WHERE users.email = $1",
      [email],
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

const getAccounts = (request, response) => {

   if (Object.keys(request.query).length === 0) {
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
   } else {

      const status = request.query.status;
      pool.query(
         "SELECT * FROM accounts WHERE status = $1",
         [status],
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

   }

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

const getAccountByNumber = (request, response) => {
   const acc_num = parseInt(request.params.acc_num);

   pool.query(
      "SELECT * FROM accounts WHERE accnumber = $1",
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
   getTransactionById,
   getAccountByNumber,
   getUsers,
   getUserAccounts
};