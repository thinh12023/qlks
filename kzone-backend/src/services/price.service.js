const {
  Price,
  Sequelize
} = require("../models");
const { Op } = Sequelize;

//create new 
const createNewPrice = async (price, idRoomType) => {
  await Price.create({ ...price, idRoomType });
}

//add prices
const addPrices = async (prices, idRoomType) => {
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    await Price.create({ ...price, idRoomType });
  }
}

//update prices
const updatePrices = async (prices, idRoomType) => {
  if (!prices) return;
  const allPrices = await Price.findAll({
    where: {
      idRoomType: {
        [Op.eq]: idRoomType,
      }
    }
  });
  const newPrices = prices.filter(price => !price.id);
  const oldPrices = prices.filter(price => price.id);
  const deletedPrices = allPrices.filter(price => !oldPrices.map(i => i.id).includes(price.id));
  //remove prices:
  if (deletedPrices.length > 0) await removePrices(deletedPrices);
  //add new prices:
  if (newPrices.length > 0) await addPrices(newPrices, idRoomType);
  //update old prices:
  if (oldPrices.length > 0) await updateOldPrices(oldPrices);
}

//remove prices
const removePrices = async (prices) => {
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    await Price.destroy({
      where: {
        id: {
          [Op.eq]: price.id,
        }
      },
    });
  }
}

//update old prices
const updateOldPrices = async (prices) => {
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    const { rate, number, id } = price;
    await Price.update({ rate, number }, {
      where: { id },
    });
  }
}

module.exports = {
  addPrices,
  createNewPrice,
  updatePrices,
}