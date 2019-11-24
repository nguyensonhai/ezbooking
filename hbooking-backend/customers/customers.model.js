const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const CustomerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  identityCard: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  room: {
    type: Object
  }
});

const CustomerModel = mongoose.model("customers", CustomerSchema);
module.exports = CustomerModel;
