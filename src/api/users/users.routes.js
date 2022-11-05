const express = require("express");
const User = require("./users.model");
const router = express.Router();
const {isAdmin } = require("../../middlewares/auth");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");

router.get("/", [isAdmin], async (req, res, next) => {

    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
      return next(error);
    }

});

router.post("/login", async (req, res, next) => {

    try {
        const userDB = await User.findOne({email: req.body.email});
        if (bcrypt.compareSync(req.body.password, userDB.password)){
            const token = generateSign(userDB._id, userDB.email);
            return res.status(200).json({token, userDB});
        } else {
            return res.status(200).json("User or Password is invalid");
        }
    } catch (error) {
      return next(error);
    }

});

router.post("/logout", async (req, res, next) => {

    try {
        const token = null;
        return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }

});

router.post("/create", async (req, res, next) => {
    try {
      const user = req.body;
      const newUser = new User(user);
      if (newUser.rol === "user") {
          const created = await newUser.save();
          return res.status(201).json(created);
      }else {
          return res.status(500).json("Only db owner is allowed to set admin rol")
      } 
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
    try {
      const id = req.params.id;
      const userDeleted = await User.findByIdAndDelete(id);
      return res.status(200).json(`User deleted succesfully --> ${userDeleted}`);
    } catch (error) {
      return next(error);
    }
  });
  
  router.put("/edit/:id", [isAdmin], async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = req.body;
      const userModify = new User(user);
      userModify._id = id;
      await User.findByIdAndUpdate(id, userModify);
      return res.status(200).json("User edited succesfully");
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
