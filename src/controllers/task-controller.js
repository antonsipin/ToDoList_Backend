require('dotenv').config()
const Task = require('../models/task.model')
const User = require('../models/user.model')
const response = require('../types/response')

const addTask = async (req, res) => {
  try {
    const { email } = req.session.user
    const { taskName, taskDescription } = req.body
    const user = await User.findOne({ email }).lean()
    const existTasks = user.tasks
    
    if (taskName) {
      if (!existTasks.some((task) => task.name === taskName)) {
        const id = Math.floor(Math.random()*100000).toString()
        const newTask = new Task({
          id,
          name: taskName,
          status: false,
          isUpdate: false,
          isLoaded: false,
          message: taskDescription || ''
        })
      
      await User.findOneAndUpdate({ email }, { tasks: [...existTasks, newTask] })
      res.status(201).json(response('Successfully', '', newTask))
        
      } else {
        res.status(400).json(response('Error', 'The task already exists'))
      }
    } else {
        res.status(400).json(response('Error', 'Can not add empty task'))
    }
    } catch (e) {
    res.status(500).json(response('Error', String(e)))
  }
}

const deleteTask = async (req, res) => {

  try {
    const { id } = req.params
    const { email } = req.session.user
    const user = await User.findOne({ email }).lean()
    const updatedTasks = user.tasks.filter((task) => task.id !== id)

    await User.findOneAndUpdate({ email }, { tasks: updatedTasks})
    res.status(200).json(response('Successfully', '', { id }))

  } catch (e) {
    res.status(500).json(response('Error', String(e)))
  }
}

const resolveTask = async (req, res) => {

  try {
    const { id } = req.body
    const { email } = req.session.user
    const user = await User.findOne({ email }).lean()
    const updatedTasks = user.tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status
      }
      return task
    })
    await User.findOneAndUpdate({ email }, { tasks: updatedTasks })
    res.status(200).json(response('Successfully', '', { id }))

  } catch (e) {
    res.status(500).json(response('Error', String(e)))
  }
}

const getTasks = async (req, res) => {
  try {
    if (req.session.user) {
      const { email } = req.session.user
      const user = await User.findOne({ email }).lean()
      const tasks = user.tasks
      res.status(200).json(response('Successfully', '', tasks))
    } else {
      res.status(404).json(response('Error', 'The user is not found'))
    }
    
  } catch (e) {
    res.status(500).json(response('Error123', String(e)))
  }
}

const updateTask = async (req, res) => {
  try {
    const { id, taskName, taskDescription } = req.body
    const { email } = req.session.user
    const user = await User.findOne({ email }).lean()
    if (user.tasks.some((task) => task.name === taskName && task.message === taskDescription)) {
      res.status(400).json(response('Error', 'The task already exists'))
    } else {
      const updatedTasks = user.tasks.map((task) => {
        if (task.id === id) {
          task.name = taskName
          task.message = taskDescription
        }
        return task
      })
      await User.findOneAndUpdate({ email }, { tasks: updatedTasks })
      res.status(200).json(response('Successfully', '', { id, name: taskName, message: taskDescription }))
    }
  } catch (e) {
    res.status(500).json(response('Error', String(e)))
  }
}

module.exports = {
  addTask,
  deleteTask,
  resolveTask,
  getTasks,
  updateTask
}
