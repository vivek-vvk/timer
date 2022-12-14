const express = require("express");
const prorouter = express.Router();
const Project = require("../models/project.model.js");
const cors = require("cors");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;
app.use(cors());

prorouter.get("/api/", (req, res) => {
  Project.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});
// Posting all data

prorouter.post("/api/", (req, res) => {
  let pro = new Project({
    pname: req.body.pname,
    pcategory: req.body.pcategory,
  });
  pro.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

//delete
prorouter.delete("/api/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Project.findByIdAndRemove(req.params.id, (err, doc) => {
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

// updating employee
prorouter.put("/api/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let pro = {
      pname: req.body.pname,
      pcategory: req.body.pcategory,
    };
    Project.findByIdAndUpdate(
      req.params.id,
      { $set: pro },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in updating Data", +err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res
      .status(400)
      .send(`No record found with Project with id ${req.params.id}`);
  }
});

// ////
// // updating employee
// emprouter.put("/:id", (req, res) => {
//   if (objectId.isValid(req.params.id)) {
//     let emp = {
//       ename: req.body.ename,
//       eposition: req.body.eposition,
//       elocation: req.body.elocation,
//       esalary: req.body.esalary,
//     };
//     Employee.findByIdAndUpdate(
//       req.params.id,
//       { $set: emp },
//       { new: true },
//       (err, doc) => {
//         if (err) {
//           console.log("Error in updating data", +err);
//         } else {
//           res.send(doc);
//         }
//       }
//     );
//   } else {
//     return res
//       .status(400)
//       .send(`No record found with Employee with id ${req.params.id}`);
//   }
// });

// //

module.exports = prorouter;
