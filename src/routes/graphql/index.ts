import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, getRootQuery, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;



  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const rootQuery = getRootQuery(prisma)

      const schema = new GraphQLSchema({
        query: rootQuery
      })

      const source = req.body.query
      console.log(req.body.query)

      const result = await graphql({schema, source })
      return result;
    },
  });
};

export default plugin;
