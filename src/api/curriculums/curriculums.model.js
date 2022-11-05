const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const curriculumSchema = new Schema(
  {
  },
  {
    timestamps: true,
  }
);


const Curriculum = mongoose.model("curriculums", curriculumSchema);

module.exports = Curriculum;