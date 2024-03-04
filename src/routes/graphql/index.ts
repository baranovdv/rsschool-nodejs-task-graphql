import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas/schemas.js';
import { ExecutionResult, GraphQLSchema, graphql, parse, validate } from 'graphql';
import { rootQuery } from './schemas/query.js';
import { rootMutation } from './schemas/mutation.js';
import depthLimit from 'graphql-depth-limit';
import { ObjMap } from 'graphql/jsutils/ObjMap.js';

const QUERY_DEPTH_LIMIT = 5;

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

      const validationResult = validate(schema, parse(source), [depthLimit(QUERY_DEPTH_LIMIT)])


      if (validationResult.length !== 0) {
        const result: ExecutionResult<ObjMap<unknown>, ObjMap<unknown>> = {
          errors: validationResult
        }

        return result
      }

      const result = await graphql({schema, source, variableValues, contextValue: prisma })
      return result;
    },
  });
};

export default plugin;
