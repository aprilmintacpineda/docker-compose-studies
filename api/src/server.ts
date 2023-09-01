require("dotenv").config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const fastify = Fastify();

// Declare a route
fastify.get("/", async function handler(request, reply) {
  reply.send("hello world");
});

const client = new MongoClient(process.env.MONGDB_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  await fastify.register(cors, {});

  fastify.listen({ port: 3000, host: "0.0.0.0" }, (error, address) => {
    if (!error) console.log(address);
    else throw error;
  });
})();
