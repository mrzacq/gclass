const router = require('express').Router()
const TaskController = require('../controllers/task.js')

router.get('/', TaskController.findAll)
router.get('/add', TaskController.addForm)
router.post('/add', TaskController.addPost)
router.get('/edit/:id', TaskController.editForm)
router.post('/edit/:id', TaskController.editPost)
router.get('/delete/:id', TaskController.delete)

module.exports = router