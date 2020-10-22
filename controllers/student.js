const { Student, Task } = require('../models/index')

class StudentController{
    static findAll(req, res){
        Student.findAll({
            include: Task,
            order: [['firstname', 'asc']]
        })
        .then((data) => {
            res.render('student.ejs', { data })
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addForm(req, res){
        res.render('addstudent.ejs')
    }

    static addPost(req, res){
        const { firstname, lastname, email, phone } = req.body
        const obj = { firstname, lastname, email, phone }
        Student.create(obj)
        .then((data) => {
            res.redirect('/student')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static editForm(req, res){
        const id = req.params.id

        Student.findByPk(id)
        .then((data) => {
            res.render('editstudent.ejs', { data })
        })
        .catch((err) => {
            res.send(err)
        })

    }

    static editPost(req, res){
        const { firstname, lastname, email, phone } = req.body
        const obj = { firstname, lastname, email, phone }

        Student.update({
            where: {
                id: req.params.id
            }, 
            individualshooks: true
        })
        .then((data) => {
            res.redirect('/student')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static delete(req, res){
        Student.destroy({
            where: {
                id:req.params.id
            }
        })
        .then((data) => {
            res.redirect('/student')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = StudentController