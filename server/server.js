// let .graphql file can be require
require('graphql-import-node/register');

const {GraphQLServer} = require('graphql-yoga');

const typeDefs = require('./defined.graphql');

const messages = [];

// use resolvers to get the data from typeDefs
const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        postMessage: (parent, {user, content}) => {

            const id = messages.length;
            messages.push({
                id,
                user,
                content,
            });

            return id;
        },
    }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start(({port}) => {

    console.log(`Server on http://localhost:${port}/`);
});