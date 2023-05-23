const express = require('express');
const bodyParser = require('body-parser');
const cocktailsRouter = require('./routes/cocktails');
require('dotenv').config()
require('./redis')

const PORT = process.env.port;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/cocktails', cocktailsRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});