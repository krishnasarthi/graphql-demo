import express from 'express';
import GraphQLHTTP from 'express-graphql';
// import {
//   schema,
//   resolvers
// } from './blog';
// import mongoose from 'mongoose';
import Account from './mysql/accountService';
import {
  schema,
  resolvers
} from './accounts';
const PORT = 8888;

var app = express()
app.use('/graphql', GraphQLHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));



app.use('/account', function (req, res) {
  var acc = new Account();

  // console.log(acc.getAccounts());
  acc.getAccountsAsync('m4dev.megameeting.com').then(function (data) {
    res.json({
      'accounts': data
    });
  }).catch(function (err) {
    console.log(err);
  })
});

app.listen(PORT, () => {
  console.log('Running a GraphQL API server at localhost:' + PORT + '/graphql');
});