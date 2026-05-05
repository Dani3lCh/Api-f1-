
const fastify = require("fastify")({ logger: true });
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const pilotoRoutes = require("./routes/app.route");
const PORT = 3000;

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
        url: `http://localhost:${PORT}`,
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
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});

fastify.register(pilotoRoutes, { prefix: "/api" });

fastify.get("/", (req, reply) => {
  reply.send({
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
  });
});

fastify.get("/documentation/json", (req, reply) => {
  reply.send(fastify.swagger());
});


//server
const start = async () => {
  try {
    await fastify.ready();
    await fastify.listen({ port: PORT });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
