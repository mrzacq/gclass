const { Teacher, Task, Student, StudentTask } = require('../models/index')
const timesince = require('../helper/timesince')
class TaskController{
    static findAll(req, res){
        Task.findAll({
            include: [Teacher, Student],
            order: [['id', 'asc']]
        })
        // .then(data => res.send(data))
        .then(data => res.render('task', { data, timesince }))
        .catch(err => res.send(err))
    }

    static addForm(req, res){
        Student.findAll()
        .then((data) => {
            res.render('taskaddform.ejs', { data })
        })
        .catch((err) => {
            res.send(err)
        })
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

        Task.update(input, {
            where: {
                id: req.params.id
            }
        })
        // .then(data => res.send(data))
        .then(data => res.redirect('/task'))
        .catch(err => res.send(err))
    }

    static delete(req,res){
        const id = req.params.id
        
        Task.destroy({
            where: {id: id}
        })
        .then(data => res.redirect('/task'))
        .catch(err => res.send(err))
    }

    static addFormStudent(req, res){
        const id = +req.params.id
        let task = [];

        Task.findByPk(id, {
            include: Student,
            order: [[{model: Student}, 'id', 'asc']]
        })
        .then((data) => {
            task = data
            return Student.findAll()
        })
        .then((student) => {
            // res.send( { task, student } )
            res.render('addStudentTask.ejs', { task, student } )
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addPostStudent(req, res){
        let idTask = req.params.id
        const { StudentId } = req.body
        const input = { StudentId, TaskId: idTask }

        StudentTask.create(input,{
            individualhooks: true
        })
        .then((data) => {
            res.redirect(`/task/student/add/${idTask}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
}
module.exports = TaskController