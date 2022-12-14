const express = require("express");
const trackerrouter = express.Router();
const Tracker = require("../models/tracker.model.js");
const cors = require("cors");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;
app.use(cors());

// getting all data
trackerrouter.get("/api/", (req, res) => {
  Tracker.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// posting data
trackerrouter.post("/api/", (req, res) => {
  let track = new Tracker({
    empmail: req.body.empmail,
    tdate: req.body.tdate,
    tproject: req.body.tproject,
    ttask: req.body.ttask,
    tmode: req.body.tmode,
    tdesc: req.body.tdesc,
    ttime: req.body.ttime,
  });
  track.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

// deleting data
trackerrouter.delete("/api/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Tracker.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Deleting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with Employee with id ${req.params.id}`);
  }
});
module.exports = trackerrouter;
