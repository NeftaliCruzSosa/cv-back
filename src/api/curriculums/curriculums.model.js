const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const curriculumSchema = new Schema(
  {
    basicData: {
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      city: { type: String },
      email: { type: String },
      birthDate: { type: String },
      phone: { type: String },
      profilePic: { type: String },
    },
    social: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    about: [{ type: String }],
    education: [
      {
        name: { type: String},
        where: { type: String},
        year: { type: Number},
      },
    ],
    experience: [
      {
        name: { type: String},
        where: { type: String},
        year: { type: Number },
        time: { type: String },
        description: { type: String},
      },
    ],
    languages: [
      {
        language: { type: String},
        level: { type: String},
      },
    ],
    projects: [
      {
        name: { type: String},
        url: { type: String},
        description: { type: String },
        image: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Curriculum = mongoose.model("curriculums", curriculumSchema);

module.exports = Curriculum;
