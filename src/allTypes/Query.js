const { queryType } = require('@nexus/schema');

exports.Query = queryType({
  definition(t) {
    t.string('name', () => 'Jim Moriarty');
    t.date('date', () => new Date());
    t.int('score', {
      resolve: (_, args, ctx) => {
        console.log(ctx.req);
        console.log(ctx.res);
        console.log(ctx.pubsub);
        return 11;
      }
    })
  },
});
