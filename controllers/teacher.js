const { Teacher } = require('../models/index')

class TeacherController{
    static findAll(req, res){
        Teacher.findAll()
        .then(data => res.render('teacher.ejs', { data }))
        .catch(err => res.send(err))
    }
}
module.exports = TeacherController