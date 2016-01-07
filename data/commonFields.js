import { GraphQLString } from 'graphql';


// These two fields appear on all types, so let's only write them once.
export function createdField() {
  return {
    type: GraphQLString,
    description:
      `The ISO 8601 date format of the time that this resource was created.`
  };
}

export function editedField() {
  return {
    type: GraphQLString,
    description:
      `The ISO 8601 date format of the time that this resource was edited.`
  };
}
