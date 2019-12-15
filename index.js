const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  type Query {
    clients: [Client]
  }
  type Client {
    _id: String
    first_name: String
  	last_name: String
  	coming_from: String
  	date_of_birth  :String
  	civil_status  :String
  	amount_of_children : Int
  	home_address :String
  	foreign_address :String
  	email :String
  	telephone :String
}
`;
const resolvers = {
  Query: {
    clients: async ()=> {
      return await axios.get('http://127.0.0.1:8888/client/').then(results=>{
        console.log(results);
        return results.data
      }).catch(err=>console.log(err))
    },
  }
}
const server = new ApolloServer({typeDefs,resolvers});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
