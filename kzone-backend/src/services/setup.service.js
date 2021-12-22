const { sequelize, RoomType, Floor, Room } = require("../models");
const build = async (numberOfFloor, maxRoomOfFloor) => {
  // await sequelize.transaction(async (t) => {
  //create a default room type
  const defaultRoomType = await RoomType.create({
    name: "Phòng Đơn",
    numberOfBed: 1,
    numberOfPerson: 2,
    dailyRate: 0,
    overnightRate: 0,
    monthlyRate: 0,
    groupRate: 0,
    overGuestNumberRate: 0,
    hourlyRate: 0,
    familyRate: 0,
    thumb: "no-image.jpg",
  });
  //create floor
  await createFloor({ numberOfFloor, idRoomType: defaultRoomType.id, maxRoomOfFloor });
  // });
  return true;
}

const createFloor = async ({ numberOfFloor, idRoomType, maxRoomOfFloor }) => {
  let floors = [], rooms = [];
  for (let i = 0; i < numberOfFloor; i++) {
    floors.push(i + 1);
  }
  for (let i = 0; i < maxRoomOfFloor; i++) {
    rooms.push(i + 1);
  }
  floors.map(async f => {
    const floor = await Floor.create({
      name: `Tầng ${f}`,
      order: f,
      active: true,
    });
    rooms.forEach(async r => {
      await Room.create({
        name: `${floor.order}0${r}`,
        active: true,
        status: 0,
        idRoomType,
        idFloor: floor.id,
      })
    });
  });
}

module.exports = {
  build,
}