const resolvers = {
  Query: {
    testLocal() {
      return { code: "TEST LOCAL CACHE" };
    },
  },
};

export default resolvers;
