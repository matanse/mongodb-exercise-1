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
  date: { type: Date, default: Date.now },
  tags: [String],
  author: String,
  isPublished: Boolean,
  price: Number,
  _id: String,
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

async function fetchAndUpdateCourse(id) {
  const course = await Course.findById(id);
  // console.log(course);
  // console.log(typeof course);
  course.isPublished = false;
  course.name = "brooo";
  // console.log(course);
  // course.set({
  //   name: "blabla",
  //   author: "blibli",
  //   price: 100,
  // });
  const result = await course.save();
  console.log(result);
}
fetchAndUpdateCourse("5a68fdc3615eda645bc6bdec");

const updateCourse = async (id) => {
  try {
    await Course.updateOne({ _id: id }, { name: "hibijibi", author: "me" });
  } catch (err) {
    console.log("error:", err);
    return;
  }
};

updateCourse("5a68fdc3615eda645bc6bdec");
