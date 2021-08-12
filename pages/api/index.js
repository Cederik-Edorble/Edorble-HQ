import { ApolloServer } from '@saeris/apollo-server-vercel';

const md5 = require('md5');
const { contents } = require('../../GraphQL/mockup/contents');
const { screens } = require('../../GraphQL/mockup/screens');
const { regions } = require('../../GraphQL/mockup/region');
const { maps } = require('../../GraphQL/mockup/map');
const { typeDefs } = require('../../GraphQL/schema');
const { users } = require('../../GraphQL/mockup/users');
const { worlds } = require('../../GraphQL/mockup/worlds');

const resolvers = {
  Query: {
    getUsers: () => users,
    getWorlds: () => worlds,
    getWorld: (_, { id }) => worlds.find((w) => w.id === id),
    getMaps: () => maps,
    getRegions: () => regions,
    getUser: (_, { id }) => users.find((u) => u.id === id),
    getUserWorld: (_, { user }) => worlds.filter((w) => w.user === user),
    getUserMaps: (_, { user }) => maps.filter((m) => m.user === user),
    getMapRegion: (_, { map }) => regions.filter((r) => r.map === map),
    getRegionScreen: (_, { region }) => screens.filter((s) => s.region === region),
    getScreenContent: (_, { screen }) => contents.filter((c) => c.screen === screen),
    authUser: (_, { input: { email, password } }) => {
      const user = users.find((u) => u.email === email);
      if (user) {
        const reqPassword = md5(password);
        if (user.password === reqPassword) {
          return user;
        }
      }
      return [];
    },
  },
  Mutation: {
    createUser: (_, { input }) => {
      const id = Math.round(Date.now() / 1000);
      const password = md5(input.password);
      const token = md5(id);
      const user = {
        ...input, id, password, token
      };
      users.push(user);
      return user;
    },
    createWorld: (_, { input }) => {
      const { user } = input;
      const id = Math.round(Date.now() / 1000);
      const accessCode = +id;
      const created = Date.now();
      const world = {
        ...input, id, accessCode, created
      };
      worlds.push(world);
      return worlds.filter((w) => w.user === user);
    },
    updateWorld: (_, { input }) => {
      const { id, user } = input;
      const i = worlds.findIndex((world) => world.id === id && world.user === user);
      if (i >= 0) {
        const temp = { ...worlds[i], ...input };
        worlds.splice(i, 1);
        worlds.unshift(temp);
        return worlds.filter((world) => world.user === user);
      }
      return [];
    },
    deleteWorld(_, { id }) {
      const i = worlds.findIndex((w) => w.id === id);
      const { user } = worlds[i];
      worlds.splice(i, 1);
      return worlds.filter((w) => w.user === user);
    },
    createRegion: (_, { input }) => {
      const { map } = input;
      const id = Math.round(Date.now() / 1000);
      const created = Date.now();
      const region = {
        ...input, id, created
      };
      regions.push(region);
      return regions.filter((r) => r.map === map);
    },
    createScreen: (_, { input }) => {
      const { region } = input;
      const id = Math.round(Date.now() / 1000);
      const created = Date.now();
      const screen = {
        ...input, id, created
      };
      screens.push(screen);
      return screens.filter((s) => s.region === region);
    },
    addContent: (_, { input }) => {
      const { screen } = input;
      // update
      if (input.id) {
        const i = contents.findIndex((s) => s.id === input.id && s.screen === screen);
        if (i >= 0) {
          const temp = { ...contents[i], ...input };
          contents.splice(i, 1, temp);
        }
        return contents.filter((c) => c.screen === screen);
      }
      // add new

      const id = contents.length + 1;
      const created = Date.now();
      const content = {
        ...input, id, created
      };
      contents.push(content);
      return contents.filter((c) => c.screen === screen);
    },
    deleteContent(_, { id }) {
      const i = contents.findIndex((c) => c.id === id);
      const { screen } = contents[i];
      contents.splice(i, 1);
      return contents.filter((c) => c.screen === screen);
    },
    createMap(_, { input }) {
      const created = Date.now();
      const id = Math.round(Date.now() / 1000);
      const map = {
        ...input, created, id
      };
      maps.push(map);
      return maps.filter((m) => m.user === input.user);
    },
    updateMap(_, { input }) {
      const { id, user } = input;
      const i = maps.findIndex((map) => map.id === id && map.user === user);
      if (i >= 0) {
        const temp = { ...maps[i], ...input };
        maps.splice(i, 1);
        maps.unshift(temp);
        return maps.filter((map) => map.user === user);
      }
      return [];
    },
    deleteMap(_, { id }) {
      const i = maps.findIndex((m) => m.id === id);
      const { user } = maps[i];
      maps.splice(i, 1);
      return maps.filter((m) => m.user === user);
    },
    deleteRegion(_, { id }) {
      const i = regions.findIndex((r) => r.id === id);
      const { map } = regions[i];
      regions.splice(i, 1);
      return regions.filter((r) => r.map === map);
    },
    updateRegion(_, { input }) {
      const { id, map } = input;
      const i = regions.findIndex((r) => r.id === id);
      if (i >= 0) {
        const temp = { ...regions[i], ...input };
        regions.splice(i, 1);
        regions.unshift(temp);
        return regions.filter((r) => r.map === map);
      }
      return [];
    },
    updateScreen(_, { input }) {
      const { id, region } = input;
      const i = screens.findIndex((s) => s.id === id);
      if (i >= 0) {
        const temp = { ...screens[i], ...input };
        screens.splice(i, 1);
        screens.unshift(temp);
        return screens.filter((s) => s.region === region);
      }
      return [];
    },
    deleteScreen(_, { id }) {
      const i = screens.findIndex((r) => r.id === id);
      const { region } = screens[i];
      screens.splice(i, 1);
      return screens.filter((s) => s.region === region);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});
export default server.createHandler();
