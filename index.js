/* eslint-disable linebreak-style */
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./server/data/database");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // eslint-disable-next-line linebreak-style
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API"
  });
});

app.get("/accounts", db.getAccounts);
app.get("/accounts/:acc_num", db.getAccountByNumber);
app.get("/accounts/:acc_num/transactions", db.getTransactionsByAcc);

app.get("/transactions", db.getTransactions);
app.get("/transactions/:id", db.getTransactionById);

app.get("/users", db.getUsers);
app.get("/users/:email/accounts", db.getUserAccounts);

app.post("/auth/signup", db.signup);
app.post("/auth/signin", db.login);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
