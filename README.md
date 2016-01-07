# swapi-graphql-lambda
A [GraphQL](http://graphql.org/)
schema hosted in
[AWS Lambda](https://aws.amazon.com/lambda/)
wrapping http://swapi.co/

Based on https://github.com/graphql/swapi-graphql

# Getting started
1. Install dependencies with
```
npm install
```
1. Bundle the project into one file with
```
npm run build
```
1. Upload the generated `swapiLambda.js` to AWS Lambda
1. Set Lambda handler to `swapiLambda.handler`
1. Test the Lambda function by supplying test event as below
```js
{"query": "query{allPlanets{planets{name}}}"}
```
