const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFound } = require('../errors');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

exports.createTask = async (req, res) => {
  console.log(req.body);
  const {
    body: { name },
  } = req;

  if (name === '') {
    throw new BadRequest('You must provide the name field');
  }
  const task = await Task.create(req.body);

  res.status(StatusCodes.OK).json({ task });
};

exports.getTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    throw new NotFound(`No task with id ${taskID}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

exports.updateTask = async (req, res) => {
  const {
    params: { id: taskID },
    body: { name },
  } = req;

  // console.log(name, taskID);
  if (name === '') {
    throw new BadRequest('name field cannot be empty');
  }
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new NotFound(`No task with id ${taskID}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

exports.deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    throw new NotFound(`No task with id ${taskID}`);
  }
  res.status(StatusCodes.OK).json({ task });
};
