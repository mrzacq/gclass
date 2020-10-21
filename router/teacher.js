const router = require('express').Router()
const TeacherController = require('../controllers/teacher.js')

router.get('/', TeacherController.findAll)

module.exports = router