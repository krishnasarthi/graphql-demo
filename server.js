import express from 'express';
import GraphQLHTTP from 'express-graphql';
import {schema, resolvers} from './blog';
import mongoose from 'mongoose';
const PORT = 8888;

var app = express()
app.use('/graphql', GraphQLHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log('Running a GraphQL API server at localhost:' + PORT + '/graphql');
});