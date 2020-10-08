const { decorateType } = require('@nexus/schema');
const { GraphQLDate } = require('graphql-scalars');

exports.GQLDATE = decorateType(GraphQLDate, {
  rootTyping: 'Date',
  asNexusMethod: 'date',
});
