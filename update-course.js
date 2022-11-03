const { date } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connect to mongodb: exercises..."))
  .catch((err) => console.log("Error: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  date: { type: date, default: Date.now },
  tags: [String],
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  try {
    return await Course.find({ name: "Angular Course" }).select({
      name: 1,
      author: 1,
    });
  } catch (err) {
    console.log(err);
  }
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// run();

async function updateCourse() {
  const course = await Course.find({ name: "Angular Course" });
  if (!course) {
    console.log("course was not found!");
    return;
  }
  console.log(course);
  console.log(typeof course);
  course[0].isPublished = true;
  course[0].name = "brooo";
  console.log(course);
  // course.set({
  //   name: "blabla",
  //   author: "blibli",
  //   price: 100,
  // });
  const results = await course.save();
  console.log(results);
}
updateCourse();
