const router = require('express').Router()
const teacherRouter = require('./teacher')
const taskRouter = require('./task')
const studentRouter = require('./student')
const UserController = require('../controllers/user')


router.get('/register', UserController.register)
router.post('/register', UserController.registerPost)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)
router.get('/logout', UserController.logout)


router.use((req,res,next) => { //// middleware
    if(req.session.userId){
        next()
    }else{
        res.redirect('/login')
    }
})

router.get('/', (req, res) => {
    res.render('home.ejs')
})

router.use('/teacher', teacherRouter)
router.use('/task', taskRouter)
router.use('/student', studentRouter)

module.exports = router