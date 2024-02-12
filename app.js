require('dotenv').config();
require('express-async-errors');
const express = require('express');
const taskRoute = require('./routes/task');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', taskRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is lestening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
