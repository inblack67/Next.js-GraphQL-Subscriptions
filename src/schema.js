const { makeSchema } = require('@nexus/schema');
const path = require('path');
const { GQLDATE } = require('./allTypes/index');
const { Query } = require('./allTypes/Query');

exports.schema = makeSchema({
  types: {
    GQLDATE,
    Query,
  },
  outputs: {
    schema: path.join(process.cwd()) + '/src/nexus/schema.graphql',
    typegen: path.join(process.cwd()) + '/src/nexus/typings.ts',
  },
});
