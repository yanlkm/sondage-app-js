const {  updateErrors } = require("../errors/auth.error");
const UserClassicSchema = require("../models/User");
const User = require("../models/UserGoogle");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllUsers = async (req, res) => {
  try {
    const users = await UserClassicSchema.find().select("-password");
    const usersGoogle = await User.find().select("-password");
    res.status(201).send({ users, usersGoogle });
  } catch (err) {
    console.log(err);
  }
};

const getOneUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(401).send("ID Unknown : " + req.params.id);
  }

  try {
    let user = await UserClassicSchema.findById(req.params.id).select(
      "-password"
    );
    if (!user) {
      user = await User.findById(req.params.id).select("-password");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {

  const user = res.locals.user;
  const record = {
    displayName : req.body.displayName,
    email : req.body.email,
  };
  if (user) {
    try {
      await UserClassicSchema.findByIdAndUpdate(
        user._id,
        { $set: record },
        { new: true }
      );
      
       res.status(201).json({ message: "Mise à jour" , success: true});
    } catch (err) {
      const errors = updateErrors(err); 
      console.log(err);
      res.status(200).json(errors);
    }
   
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
};
