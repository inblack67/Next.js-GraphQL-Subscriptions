const express = require('express');
const next = require('next');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./src/schema');
require('colors');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const apolloServer = new ApolloServer({
  schema,
});

nextApp.prepare().then(() => {
  apolloServer.applyMiddleware({ app });

  app.get('/api', (req, res) => {
    res
      .status(200)
      .json({ success: true, msg: 'Custom express server up and running' });
  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${port}`.green.bold);
  });
});
