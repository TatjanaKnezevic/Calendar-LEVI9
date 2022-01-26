const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("events", EventSchema);
