const router = require('express').Router()
const StudentController = require('../controllers/student.js')

router.get('/', StudentController.findAll)
router.get('/add', StudentController.addForm)
router.post('/add', StudentController.addPost)
router.get('/edit/:id', StudentController.editForm)
router.post('/edit/:id', StudentController.editPost)
router.get('/delete/:id', StudentController.delete)

module.exports = router