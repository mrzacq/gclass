const { Teacher } = require('../models/index')

class TeacherController{
    static findAll(req, res){
        Teacher.findAll()
        .then(data => res.render('teacher.ejs', { data }))
        .catch(err => res.send(err))
    }

    static addForm(req, res){
        res.render('addteacher.ejs')
    }

    static addPost(req, res){
        const { fullname, email, phone } = req.body
        const obj = { fullname, email, phone }

        Teacher.create(obj,{individualhooks: true})
        .then((data) => {
            res.redirect('/teacher')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static delete(req, res){
        Teacher.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            res.redirect('/teacher')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}
module.exports = TeacherController