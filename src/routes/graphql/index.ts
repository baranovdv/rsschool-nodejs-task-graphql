import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, rootQuery } from './schemas.js';
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
      const schema = new GraphQLSchema({
        query: rootQuery
      })

      const source = req.body.query
      const variableValues = req.body.variables

      console.log(req.body.variables)

      const result = await graphql({schema, source, variableValues, contextValue: prisma })
      return result;
    },
  });
};

export default plugin;
