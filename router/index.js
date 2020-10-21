const router = require('express').Router()
const teacherRouter = require('./teacher')
const taskRouter = require('./task')
// const studentRouter = require('./student')

router.get('/', (req, res) => {
    res.render('home.ejs')
})
router.use('/teacher', teacherRouter)
router.use('/task', taskRouter)
// router.use('/student', studentRouter)

module.exports = router