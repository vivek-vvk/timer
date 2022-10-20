const express = require("express");
var app = new express();
const cors = require("cors");
const mongoose = require("./db.js");
const emprouter = require("./routes/employee.routes.js");
const prorouter = require("./routes/project.routes.js");
const trackerrouter = require("./routes/tracker.routes.js");
const path = require('path');
app.use(express.static('./dist/clock-in-system'));

app.use(express.json());
app.use(cors());

app.use("/employees", emprouter);
app.use("/projects", prorouter);
app.use("/trackers", trackerrouter);


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/clock-in-system/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);


 

});


