import invariant from "../jsutils/invariant.mjs";
import isPromise from "../jsutils/isPromise.mjs";
import { parse } from "../language/parser.mjs";
import { execute } from "../execution/execute.mjs";
import { getIntrospectionQuery } from "./getIntrospectionQuery.mjs";
/**
 * Build an IntrospectionQuery from a GraphQLSchema
 *
 * IntrospectionQuery is useful for utilities that care about type and field
 * relationships, but do not need to traverse through those relationships.
 *
 * This is the inverse of buildClientSchema. The primary use case is outside
 * of the server context, for instance when doing schema comparisons.
 */

export function introspectionFromSchema(schema, options) {
  const optionsWithDefaults = {
    directiveIsRepeatable: true,
    schemaDescription: true,
    ...options
  };
  const document = parse(getIntrospectionQuery(optionsWithDefaults));
  const result = execute({
    schema,
    document
  });
  !isPromise(result) && !result.errors && result.data || invariant(0);
  return result.data;
}
