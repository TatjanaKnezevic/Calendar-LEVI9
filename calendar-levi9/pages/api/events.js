const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/cal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Event = require("../../models/Event");

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      await Event.deleteOne({ _id: req.query.id });
      res.status(200).json({});
      break;
    case "POST":
      // res.status(200).json(req.body);
      console.log("post ", req.body);
      const event = new Event(req.body);
      event.save();
    case "GET":
    default:
      const events = await Event.find({}).exec();
      res.status(200).json(events);
  }
}
