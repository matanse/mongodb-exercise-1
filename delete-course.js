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

const deleteCourse = async (id) => {
  try {
    await Course.findByIdAndRemove(id);
  } catch (err) {
    console.log("Error: ", err);
  }
};

deleteCourse("5a68fdc3615eda645bc6bdec");

const deleteCoursesByAuthor = async (name) => {
  try {
    await Course.deleteMany({ author: name });
  } catch (err) {
    console.log("Error: ", err);
  }
};

// deleteCoursesByAuthor("Mosh");
