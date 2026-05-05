const {
  CreateDriver,
  DeleteDriver,
  GetAllDriver,
  GetDriverByNumber,
  UpdateDriver,
} = require("../services/Pilotos.service");

function getPilotos(request, reply) {
  const pilotos = GetAllDriver();
  reply.send({
    total: pilotos.length,
    data: pilotos,
  });
}

function getPilotoByNumber(request, reply) {
  const { number } = request.params;
  const piloto = GetDriverByNumber(number);

  if (!piloto) {
    return reply.code(404).send({
      message: "Piloto no encontrado",
    });
  }

  return reply.send(piloto);
}

function createPiloto(request, reply) {
  const piloto = CreateDriver(request.body);

  if (!piloto) {
    return reply.code(409).send({
      message: "Ya existe un piloto con ese numero",
    });
  }

  return reply.code(201).send(piloto);
}

function updatePiloto(request, reply) {
  const { number } = request.params;
  const piloto = UpdateDriver(number, request.body);

  if (piloto === undefined) {
    return reply.code(404).send({
      message: "Piloto no encontrado",
    });
  }

  if (piloto === null) {
    return reply.code(409).send({
      message: "Ya existe un piloto con ese numero",
    });
  }

  return reply.send(piloto);
}

function deletePiloto(request, reply) {
  const { number } = request.params;
  const piloto = DeleteDriver(number);

  if (!piloto) {
    return reply.code(404).send({
      message: "Piloto no encontrado",
    });
  }

  return reply.send({
    message: "Piloto eliminado correctamente",
    data: piloto,
  });
}

module.exports = {
  createPiloto,
  deletePiloto,
  getPilotos,
  getPilotoByNumber,
  updatePiloto,
};
