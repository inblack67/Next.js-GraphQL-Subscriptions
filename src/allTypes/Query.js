const { queryType } = require('@nexus/schema');

exports.Query = queryType({
  definition(t) {
    t.string('name', () => 'Jim Moriarty');
    t.date('date', () => new Date());
  },
});
