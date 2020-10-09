const express = require('express');
const next = require('next');
const { ApolloServer, PubSub } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const http = require('http');
const { schema } = require('./src/schema');
require('colors');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const pubsub = new PubSub();

const app = express();
const apolloServer = new ApolloServer({
  schema,
  context: ({req,res}) => ({req, res, pubsub}),
});

const ws = http.createServer(app);

nextApp.prepare().then(() => {

  apolloServer.applyMiddleware({app, ws});

  app.get('/api', (req, res) => {
    res
      .status(200)
      .json({ success: true, msg: 'Custom express server up and running' });
  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  ws.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.green.bold);
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server: ws,
      path: '/graphql',
    });
  });
});
