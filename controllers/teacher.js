const { Teacher } = require('../models/index')

class TeacherController{
    static findAll(req, res){
        Teacher.findAll()
        .then(data => res.render('teacher.ejs', { data }))
        .catch(err => res.send(err))
    }

    static addForm(req, res){
        const pesan = req.app.locals.pesan || ''
        delete req.app.locals.pesan
        res.render('addteacher.ejs', {pesan})
    }

    static addPost(req, res){
        const { fullname, email, phone } = req.body
        const obj = { fullname, email, phone }

        Teacher.create(obj,{individualhooks: true})
        .then((data) => {
            res.redirect('/teacher')
        })
        .catch((err) => {
            if(err.name === "SequelizeValidationError"){
                if(err.errors){
                    let errors = err.errors.map(elemen => {
                        return elemen.message
                    })
                    req.app.locals.pesan = errors
                }
                res.redirect(`/teacher/add`)
            }
            else{
                res.send(err)
            }
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