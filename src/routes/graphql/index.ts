import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import { rootQuery } from './schemas/query.js';
import { rootMutation } from './schemas/mutation.js';

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
      const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation,
      })

      const source = req.body.query
      const variableValues = req.body.variables

      const result = await graphql({schema, source, variableValues, contextValue: prisma })
      return result;
    },
  });
};

export default plugin;
