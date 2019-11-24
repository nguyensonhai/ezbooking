const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  lastModifiedAt: {
    type: Date
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
