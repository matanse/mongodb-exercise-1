const mongoose = require("mongoose");

const collection = "validation-exercise";

mongoose
  .connect(`mongodb://localhost/${collection}`)
  .then(console.log(`connect to ${collection}...`))
  .catch((err) => {
    console.log("failed to connect.\n", `Error: ${err}`);
  });

const newApartmentSchema = new mongoose.Schema({
  address: { type: String, default: "Berlin", required: true },
  contact: {
    type: Object({ name: String, phone: String, email: String }),
    required: true,
  },
  isAvailable: { type: Boolean, required: true, default: true },
  price: {
    type: Boolean,
    required: function () {
      return this.isAvailable;
    },
  },
});

const Apartment = mongoose.model("apartments", newApartmentSchema);

const addNewApartmentToDatabase = async (newApartment) => {
  try {
    const apartment = await newApartment.save();
    console.log(apartment);
  } catch (error) {
    console.log(error);
  }
};

addNewApartmentToDatabase(
  new Apartment({
    contact: { name: "they", phone: "34", email: "fucom" },
    isAvailable: false,
  })
);
