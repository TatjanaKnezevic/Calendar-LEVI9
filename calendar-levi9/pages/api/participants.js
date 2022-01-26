const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CalendarDataBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("../../models/Participants");

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      await User.deleteOne({ _id: req.query.id });
      res.status(200).json({});
      break;
    case "POST":
      // res.status(200).json(req.body);
      console.log("post ", req.body);
      const user = new User(req.body);
      user.save();
    case "GET":
    default:
      const users = await User.find({}).exec();
      res.status(200).json(users);
  }
}
