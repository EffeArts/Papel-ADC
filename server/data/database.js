const { Pool } = require("pg");

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

const signup = (request, response) => {
  const {
    fname,
    lname,
    email,
    username,
    password,
    isadmin,
    role
  } = request.body;

  //   response.send(request.body);

  pool.query(
    "INSERT INTO users (fname, lname, email, username, password, isadmin, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [fname, lname, email, username, password, isadmin, role],
    (error, result) => {
      if (error) {
        throw error;
      }
      // const reply = {
      //   status: 201,
      //   data: results.rows
      // };
      response.status(201).send(result.insertId);
    }
  );
};

const login = (request, response) => {
  const { username, password } = request.body;

  pool.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password],
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

const createAccount = (request, response) => {
  const { accnumber, createdon, owner, type, status, balance } = request.body;

  //   response.send(request.body);

  pool.query(
    "INSERT INTO accounts (accnumber, createdon, owner, type, status, balance) VALUES ($1, $2, $3, $4, $5, $6)",
    [accnumber, createdon, owner, type, status, balance],
    (error, result) => {
      if (error) {
        throw error;
      }
      // const reply = {
      //   status: 201,
      //   data: results.rows
      // };
      response.status(201).send(result.insertId);
    }
  );
};

const deleteAccount = (request, response) => {
  const accnumber = parseInt(request.params.accnumber);

  pool.query(
    "DELETE FROM accounts WHERE accnumber = $1",
    [accnumber],
    (error, results) => {
      if (error) {
        throw error;
      }
      const reply = {
        status: 200,
        message: "Account successfully deleted"
      };
      response.status(200).send(reply);
    }
  );
};

const UpdateAccStatus = (request, response) => {
  const accnumber = parseInt(request.params.accnumber);
  const { accstatus } = request.body;

  pool.query(
    "UPDATE accounts SET status = $1 WHERE accnumber = $2",
    [accstatus, accnumber],
    (error, results) => {
      if (error) {
        throw error;
      }
      const reply = {
        status: 200,
        data: {
          accountnumber: accnumber,
          status: accstatus
        }
      };
      response.status(200).send(reply);
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
  getUserAccounts,
  signup,
  login,
  createAccount,
  deleteAccount,
  UpdateAccStatus
};
