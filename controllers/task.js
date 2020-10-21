const { Teacher, Task, Student } = require('../models/index')

class TaskController{
    static findAll(req, res){
        Task.findAll({
            include: [Teacher, Student]
        })
        // .then(data => res.send(data))
        .then(data => res.render('task', { data }))
        .catch(err => res.send(err))
    }

    static addForm(req, res){
        res.render('taskaddform.ejs')
    }

    static addPost(req, res){
        const { taskname, deadline } = req.body
        const obj = { taskname, deadline }

        Task.create(obj)
        .then(data => res.redirect('/task'))
        .catch(err => res.send(err))
    }

    static editForm(req, res){
        const id = req.params.id
        let target;
        Task.findByPk(id)
        .then(dat => {
            target = dat
            return Teacher.findAll({order: [['id', 'asc']]})
        })
        .then(teacher => res.render('taskeditform.ejs', { data: target, teacher }))
        .catch(err => res.send(err))
    }

    static editPost(req, res){
        const { taskname, deadline, TeacherId } = req.body
        const input = { taskname, deadline, TeacherId }

        Task.update(input)
        .then(data => res.send(data))
        // .then(data => res.redirect('/task'))
        .catch(err => res.send(err))
    }

    static delete(req,res){
        const id = req.params.id
        
        Task.destroy({
            where: {id: id}
        })
        .then(data => res.redirect('/task'))
        .catch(err => res.send(data))
    }
}
module.exports = TaskController