const router = require('express').Router()
const TeacherController = require('../controllers/teacher.js')

router.get('/', TeacherController.findAll)
router.get('/add', TeacherController.addForm)
router.post('/add', TeacherController.addPost)
router.get('/delete/:id', TeacherController.delete)
module.exports = router