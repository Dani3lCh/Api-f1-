const fastifyFactory = require("fastify");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const pilotoRoutes = require("./routes/app.route");

function buildApp() {
  const fastify = fastifyFactory({ logger: true });

  fastify.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "API REST de Pilotos F1",
        description: "Documentacion de la API para consultar pilotos de Formula 1.",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Servidor local",
        },
      ],
      tags: [
        {
          name: "Pilotos",
          description: "Endpoints relacionados con pilotos",
        },
      ],
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });

  fastify.register(pilotoRoutes, { prefix: "/api" });

  fastify.get("/", async () => ({
    message: "API REST de pilotos F1",
    endpoints: [
      "GET /api/pilotos",
      "POST /api/pilotos",
      "GET /api/pilotos/:number",
      "PUT /api/pilotos/:number",
      "DELETE /api/pilotos/:number",
      "GET /documentation",
      "GET /documentation/json",
    ],
  }));

  fastify.get("/documentation/json", async () => fastify.swagger());

  return fastify;
}

const app = buildApp();
let isReady = false;

async function handler(req, res) {
  if (!isReady) {
    await app.ready();
    isReady = true;
  }

  app.server.emit("request", req, res);
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  const start = async () => {
    try {
      await app.ready();
      await app.listen({ port: PORT });
    } catch (error) {
      app.log.error(error);
      process.exit(1);
    }
  };

  start();
}
module.exports = async (req, res) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
}
module.exports = handler;
