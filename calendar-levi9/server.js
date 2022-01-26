const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const bodyparser = require("body-parser");
const fs = require("fs");

const participants = require("./participantsBase.json");
const events = require("./eventBase.json");

mongoose.connect("mongodb://localhost:27017/calendar-js", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const eventBase = require("./models/Event");
const participantsBase = require("./models/Participants");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyparser.json());

  server.get("/events", async (req, res) => {
    const ev = await eventBase.find().exec();
    //console.log(ev);
    res.send(ev);
  });
  server.get("/eventById/:id", async (req, res) => {
    const ev = await eventBase.find({ id: req.params.id }).exec();
    //console.log(ev);
    res.send(ev);
    //res.send(events.filter((event) => event.id == req.params.id));
  });

  server.get("/participants", async (req, res) => {
    // if (req.query.search)
    //   res.send(
    //     participants.filter((participant) =>
    //       participant.name.startsWith(req.query.search)
    //     )
    //   );
    // else res.send(participants);
    const p = await participantsBase.find().exec();
    if (req.query.search)
      res.send(
        p.filter((participant) => participant.name.startsWith(req.query.search))
      );
    else {
      res.send(p);
    }
  });

  server.post("/deleteEvent", async (req, res) => {
    // if (req.body.id != 0) {
    //   const index = events.map((ev) => ev.id.toString()).indexOf(req.body.id);
    //   if (index != -1) {
    //     events.splice(index, 1);
    //     fs.writeFile("./eventBase.json", JSON.stringify(events), "utf8");
    //   }
    // }
    if (req.body.id != 0) {
      const ev = await eventBase.deleteOne({ id: req.body.id }).exec();
    }

    res.json(req.body);
  });

  server.post("/event", async (req, res) => {
    // events.push(req.body);
    // res.json(req.body);
    // fs.writeFile("./eventBase.json", JSON.stringify(events), "utf8");
    const ev = await eventBase.insertMany(req.body).exec();
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
