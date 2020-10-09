const { subscriptionType } = require('@nexus/schema');
const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();
const CHANNEL_NAME = 'COUNT';

exports.Subscription = subscriptionType({
  definition(t) {
    t.string('name', () => 'Jim Moriarty');
    t.date('date', () => new Date());
    t.int('count', {
        subscribe: (parent, args, ctx) => {
          console.log(ctx);
            let count = 0;
            setInterval(() => {
                count+=1;
                pubsub.publish(CHANNEL_NAME, {
                    count
                })
            }, 1000)
            return pubsub.asyncIterator(CHANNEL_NAME)
        }
    })
  },
});
