const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const bodyparser = require("body-parser");
const fs = require("fs");

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

  server.all("/event", async (req, res) => {
    switch (req.method) {
      case "DELETE":
        {
          if (req.body.id != 0) {
            const ev = await eventBase.deleteOne({ id: req.body.id }).exec();
          }

          res.json(req.body);
        }
        break;
      case "POST":
        {
          const ev = await eventBase.create(req.body);
          res.json(ev);
        }
        break;
      case "GET":
        {
          const ev = await eventBase.find().exec();
          res.send(ev);
        }
        break;
    }
  });
  server.get("/eventById/:id", async (req, res) => {
    const ev = await eventBase.find({ id: req.params.id }).exec();
    res.send(ev);
  });

  server.get("/participants", async (req, res) => {
    const p = await participantsBase.find().exec();
    if (req.query.search)
      res.send(
        p.filter((participant) => participant.name.startsWith(req.query.search))
      );
    else {
      res.send(p);
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
