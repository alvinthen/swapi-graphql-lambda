import 'babel-polyfill';

import Schema from './data/index';
import { graphql }  from 'graphql';

exports.handler = function(options, context) {
  (async () => {
    var result = await (graphql(Schema, options.query));
    context.succeed(result);
  })();
}
