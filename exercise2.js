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
      .or([{ tags: "frontend" }, { tags: "backend" }])
      .sort("-price")
      .select("name author price");
    // return await Course.find({
    //   isPublished: true,
    //   tags: { $in: ["frontend", "backend"] },
    // })
    //   .sort({ price: -1 })
    //   .select({ name: 1, author: 1, price: 1 });
  } catch (err) {
    console.log(err);
  }
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}
run();
