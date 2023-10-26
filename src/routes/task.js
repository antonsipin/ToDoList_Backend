const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task-controller')

router
  .route('/')
  .get(taskController.getTasks)

router
  .route('/delete/:id')
  .delete(taskController.deleteTask)

router
  .route('/add')
  .post(taskController.addTask)

router
  .route('/resolve')
  .put(taskController.resolveTask)

router
  .route('/update')
  .put(taskController.updateTask)

module.exports = router
