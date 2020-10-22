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
        const pesan = req.app.locals.pesan || ''
        delete req.app.locals.pesan
        res.render('addstudent.ejs', {pesan})
    }

    static addPost(req, res){
        const { firstname, lastname, email, phone } = req.body
        const obj = { firstname, lastname, email, phone }
        Student.create(obj)
        .then((data) => {
            res.redirect('/student')
        })
        .catch((err) => {
            if(err.name === "SequelizeValidationError"){
                if(err.errors){
                    let errors = err.errors.map(elemen => {
                        return elemen.message
                    })
                    req.app.locals.pesan = errors
                }
                res.redirect(`/student/add`)
            }
            else{
                res.send(err)
            }
        })
    }

    static editForm(req, res){
        const id = req.params.id
        const pesan = req.app.locals.pesan || ''
        delete req.app.locals.pesan
        Student.findByPk(id)
        .then((data) => {
            res.render('editstudent.ejs', { data, pesan })
        })
        .catch((err) => {
            res.send(err)
        })

    }

    static editPost(req, res){
        const { firstname, lastname, email, phone } = req.body
        const obj = { firstname, lastname, email, phone }

        Student.update(obj, {
            where: {
                id: req.params.id
            }, 
            individualhooks: true
        })
        .then((data) => {
            res.redirect('/student')
        })
        .catch((err) => {
            if(err.name === "SequelizeValidationError"){
                if(err.errors){
                    let errors = err.errors.map(elemen => {
                        return elemen.message
                    })
                    req.app.locals.pesan = errors
                }
                res.redirect(`/student/edit/${req.params.id}`)
            }
            else{
                res.send(err)
            }
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

    static getListTask(req, res){
        const id = req.params.id

        Student.findByPk(id, {
            include: Task,
            order: [[{model: Task}, 'id', 'asc']]
        })
        .then((data) => {
            // res.send({data})
            res.render('studentlisttask.ejs', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = StudentController