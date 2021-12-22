const { validateEmptyInput, createResponse } = require("../utils/common");
const { roomService } = require("../services");
const { Room, Sequelize ,RoomType,Price} = require("../models");
const { Op } = Sequelize;
/**[POST] */
//create
const create = async (req, res, next) => {
  try {
    const payload = req.body;
    //validate input
    const { errors, valid } = validateEmptyInput(payload);
    if (!valid) {
      return res.status(422).json({ code: 0, data: {}, message: errors });
    }
    //call service
    const room = await roomService.addRoom(payload);
    if (room) {
      return res.status(200).json(createResponse(1, room, "Create successfully!"))
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Create failed!"))
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
/**[PUT] */
//update all
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active, idRoomType,square,image } = req.body;
    const room = await Room.findOne({ where: { id } });
    if (room) {
      await Room.update({ active, idRoomType,square,image, }, {
        where: {
          id: {
            [Op.eq]: room.get().id,
          }
        }
      });
      return res.status(200).json(createResponse(1, room, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Room is not exist!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
//update active
const updateActive = async (req, res, next) => {
  try {

  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
/**[DELETE] */
//delete room
const remove = async (req, res, next) => {
  try {

  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
/**[GET] */
//search
const search = async (req, res, next) => {
  try {
    const { page, size, id, status, idRoomType, idFloor, name, active,square,image } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await roomService.searchById({ id });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message
      ));
    }
    else {
      const { data: { count, rows }, message } = await roomService.search({ status, idRoomType, idFloor, page, size, name, active,square,image });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message,
      ));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

const getRoomAvailableByDate = async (req, res, next) => {
  try {
    const { checkinDate, checkoutDate } = req.params;
    const { data, message } = await roomService.getRoomAvailableByDate(checkinDate, checkoutDate);
    return res.status(200).json(createResponse(1, data, message));
  } catch (error) {
    return res.sendStatus(500);
  }
}


const updateStatus = async (req, res, next) => {
  try {
    const { id, status } = req.params;
    const result = await roomService.updateStatus(id, status);
    if (result) {
      return res.status(200).json(createResponse(1, result, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, result, "Failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}


const getRoomReady = async (req,res,next)=>{
  try{
    const {count,rows}= await Room.findAndCountAll(
      {
        where:{
          status:0
        }
      }
    );
    if(rows){
      return  res.status(200).json(createResponse(1,count, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, count, "Failed!"));
    }
  }catch (error) {
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

const getRoomInUse = async (req,res,next)=>{
  try{
    const {count,rows}= await Room.findAndCountAll(
      {
        where:{
          status:4
        }
      }
    );
    if(rows){
      return  res.status(200).json(createResponse(1,count, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, count, "Failed!"));
    }
  }catch (error) {
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

const getRoomPreoder = async (req,res,next)=>{
  try{
    const {count,rows}= await Room.findAndCountAll(
      {
        where:{
          status:1
        }
      }
    );
    if(rows){
      return  res.status(200).json(createResponse(1,count, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, count, "Failed!"));
    }
  }catch (error) {
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
const getRoomNotReady = async (req,res,next)=>{
  try{
    const {count,rows}= await Room.findAndCountAll(
      {
        where:{
          [Op.or]: [{status:2}, {status:3}]
        }
      }
    );
    if(rows){
      return  res.status(200).json(createResponse(1,count, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0,count, "Failed!"));
    }
  }catch (error) {
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
module.exports = {
  create,
  update,
  updateActive,
  updateStatus,
  remove,
  search,
  getRoomAvailableByDate,
  getRoomReady,
  getRoomInUse,
  getRoomPreoder,
  getRoomNotReady,
}