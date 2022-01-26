const express = require("express");
//const mongo = require("/usr/bin/mongo");
const next = require("next");
const bodyparser = require("body-parser");
const fs = require("fs");

const participants = require("./participantsBase.json");
const events = require("./eventBase.json");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyparser.json());

  server.get("/events", (req, res) => {
    res.send(events);
  });
  server.get("/eventById/:id", (req, res) => {
    res.send(events.filter((event) => event.id == req.params.id));
  });

  server.get("/participants", (req, res) => {
    if (req.query.search)
      res.send(
        participants.filter((participant) =>
          participant.name.startsWith(req.query.search)
        )
      );
    else res.send(participants);
  });

  server.post("/deleteEvent", (req, res) => {
    if (req.body.id != 0) {
      const index = events.map((ev) => ev.id.toString()).indexOf(req.body.id);
      if (index != -1) {
        events.splice(index, 1);
        fs.writeFile("./eventBase.json", JSON.stringify(events), "utf8");
      }
    }
    res.json(req.body);
  });

  server.post("/event", (req, res) => {
    events.push(req.body);
    res.json(req.body);
    fs.writeFile("./eventBase.json", JSON.stringify(events), "utf8");
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
