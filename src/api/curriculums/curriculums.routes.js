const express = require("express");
const Curriculum = require("./curriculums.model");
const User = require("../users/users.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const deleteFile = require("../../middlewares/deleteFile");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const curriculumToFind = await Curriculum.findById(id);
    return res.status(200).json(curriculumToFind);
  } catch (error) {
    return next(error);
  }
});


router.post("/create", [isAuth], upload.single("img"), async (req, res, next) => {
  try {
    const curriculum = req.body;
    if (req.file) {
      curriculum.profilePic = req.file.path;
    }
    const newCurriculum = new Curriculum(curriculum);
    const curriculumCreated = await newCurriculum.save();
    const userID = req.user._id.toString()
    const oldUser = await User.findById(userID)
    if(oldUser.curriculum){
        const oldCurriculum = oldUser.curriculum.toHexString()
        const deleted = await Curriculum.findByIdAndDelete(oldCurriculum);
        console.log(deleted)
    }
    oldUser.curriculum = curriculumCreated
    const userModify = new User(oldUser);
    userModify._id = userID;
    await User.findByIdAndUpdate(userID, userModify);
    return res.status(201).json(curriculumCreated);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
  try {
    const id = req.params.id;
    const curriculum = await Curriculum.findById(id);
    if (curriculum.profilePic) {
      deleteFile(curriculum.profilePic);
    }
    const curriculumToDelete = await Curriculum.findByIdAndDelete(id);
    return res.status(200).json(`Deleted --> ${curriculumToDelete.name}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", [isAdmin], upload.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const curriculum = req.body;
    const curriculumModify = new Curriculum(curriculum);
    curriculumModify._id = id;
    await Curriculum.findByIdAndUpdate(id, curriculumModify);
    return res.status(200).json("Modified");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
