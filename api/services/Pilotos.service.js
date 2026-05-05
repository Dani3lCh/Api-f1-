const F1Grid = require("../data/F1Grid");

function mapDriversFromGrid() {
  return Object.values(F1Grid.teams).flatMap((team) =>
    team.drivers.map((driver) => ({
      ...driver,
      team: team.name,
      season: F1Grid.season,
    }))
  );
}

let drivers = mapDriversFromGrid();

function GetAllDriver() {
  return drivers;
}

function GetDriverByNumber(number) {
  return drivers.find((driver) => driver.number === Number(number));
}

function CreateDriver(driverData) {
  const existingDriver = GetDriverByNumber(driverData.number);

  if (existingDriver) {
    return null;
  }

  const newDriver = {
    name: driverData.name,
    number: Number(driverData.number),
    team: driverData.team,
    season: Number(driverData.season),
  };

  drivers.push(newDriver);
  return newDriver;
}

function UpdateDriver(number, driverData) {
  const index = drivers.findIndex((driver) => driver.number === Number(number));

  if (index === -1) {
    return undefined;
  }

  const duplicatedNumber = drivers.find(
    (driver, driverIndex) =>
      driver.number === Number(driverData.number) && driverIndex !== index
  );

  if (duplicatedNumber) {
    return null;
  }

  const updatedDriver = {
    name: driverData.name,
    number: Number(driverData.number),
    team: driverData.team,
    season: Number(driverData.season),
  };

  drivers[index] = updatedDriver;
  return updatedDriver;
}

function DeleteDriver(number) {
  const index = drivers.findIndex((driver) => driver.number === Number(number));

  if (index === -1) {
    return undefined;
  }

  const deletedDriver = drivers[index];
  drivers.splice(index, 1);
  return deletedDriver;
}

module.exports = {
  CreateDriver,
  DeleteDriver,
  GetAllDriver,
  GetDriverByNumber,
  UpdateDriver,
};
