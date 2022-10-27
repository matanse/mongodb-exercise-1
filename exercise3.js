const { date } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect to mongodb: exercises..."))
  .catch((err) => console.log("Error: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  tags: [String],
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  try {
    return await await Course.find({ isPublished: true })
      .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
      .sort("-price")
      .select("name price isPublished");
  } catch (err) {
    console.log(err);
  }
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
