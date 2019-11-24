const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const BookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  identityCard: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  bookDate: {
    from: Date,
    to: Date
  },
  room: {
    type: Object
  }
});

const bookingModel = mongoose.model("Booking", BookingSchema);
module.exports = bookingModel;
