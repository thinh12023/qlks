const {
  Image,
} = require("../models");

//add images
const addImages = async ({ images, idRoomType }) => {
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    await Image.create({ ...img, idRoomType });
  }
}

//update images
const updateImages = async (images, idRoomType) => {
  if (!images || images.length == 0) return;
  let newImages = (images || []).filter(item => !item.id);
  for (let i = 0; i < newImages.length; i++) {
    const image = newImages[i];
    await Image.create({
      idRoomType,
      path: image.name,
    });
  }
}

module.exports = {
  addImages,
  updateImages,
}