
const {
  createPiloto,
  deletePiloto,
  getPilotos,
  getPilotoByNumber,
  updatePiloto,
} = require("../controller/pilotos.controller");

const pilotoSchema = {
  type: "object",
  required: ["name", "number", "team", "season"],
  properties: {
    name: { type: "string" },
    number: { type: "number" },
    team: { type: "string" },
    season: { type: "number" },
  },
};

const pilotoBodySchema = {
  type: "object",
  required: ["name", "number", "team", "season"],
  properties: {
    name: { type: "string" },
    number: { type: "number" },
    team: { type: "string" },
    season: { type: "number" },
  },
};

const messageSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

function PilotoRoutes(fastify, options, done) {
  fastify.get("/pilotos", {
    schema: {
      tags: ["Pilotos"],
      summary: "Obtener todos los pilotos",
      description: "Devuelve la lista completa de pilotos de la temporada 2026.",
      response: {
        200: {
          type: "object",
          properties: {
            total: { type: "number" },
            data: {
              type: "array",
              items: pilotoSchema,
            },
          },
        },
      },
    },
    handler: getPilotos,
  });

  fastify.post("/pilotos", {
    schema: {
      tags: ["Pilotos"],
      summary: "Crear un piloto",
      description: "Agrega un nuevo piloto a la coleccion en memoria.",
      body: pilotoBodySchema,
      response: {
        201: pilotoSchema,
        409: messageSchema,
      },
    },
    handler: createPiloto,
  });

  fastify.get("/pilotos/:number", {
    schema: {
      tags: ["Pilotos"],
      summary: "Obtener piloto por numero",
      description: "Busca un piloto por su numero en la parrilla.",
      params: {
        type: "object",
        required: ["number"],
        properties: {
          number: { type: "number" },
        },
      },
      response: {
        200: pilotoSchema,
        404: messageSchema,
      },
    },
    handler: getPilotoByNumber,
  });

  fastify.put("/pilotos/:number", {
    schema: {
      tags: ["Pilotos"],
      summary: "Actualizar un piloto",
      description: "Actualiza toda la informacion de un piloto por numero.",
      params: {
        type: "object",
        required: ["number"],
        properties: {
          number: { type: "number" },
        },
      },
      body: pilotoBodySchema,
      response: {
        200: pilotoSchema,
        404: messageSchema,
        409: messageSchema,
      },
    },
    handler: updatePiloto,
  });

  fastify.delete("/pilotos/:number", {
    schema: {
      tags: ["Pilotos"],
      summary: "Eliminar un piloto",
      description: "Elimina un piloto por su numero.",
      params: {
        type: "object",
        required: ["number"],
        properties: {
          number: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            data: pilotoSchema,
          },
        },
        404: messageSchema,
      },
    },
    handler: deletePiloto,
  });

  done();
}

module.exports = PilotoRoutes;
