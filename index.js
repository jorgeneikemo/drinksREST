const express = require("express");
const bodyParser = require("body-parser");
//const cocktailsRouter = require('./routes/cocktails');
//new
const cocktailRouter = require("./routes/cocktails");
require("dotenv").config();

const PORT = process.env.port;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
//app.use('/cocktails', cocktailsRouter);
//new
app.use("/cocktails", cocktailRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
