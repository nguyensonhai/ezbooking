const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  option: {
    kitchen: Boolean,
    internet: Boolean,
    pool: Boolean,
    bathroom: Boolean,
    tv: Boolean,
    fridge: Boolean,
    microwave: Boolean
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: Array,
    required: true
  },
  comment: [
    {
      content: {
        type: String,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: new Date()
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

const RoomsModel = mongoose.model("rooms", RoomSchema);
module.exports = RoomsModel;
