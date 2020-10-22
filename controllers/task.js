const { Teacher, Task, Student } = require('../models/index')
const studenttask = require('../models/studenttask')
const task = require('../models/task')

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
        .catch(err => res.send(data))
    }

    static addFormStudent(req, res){
        const id = req.params.id
        let target;

        Task.findByPk(id,{
            include: Student
        })
        .then(data=> {
             target = data
             return Student.findAll()
        }
        )
        .then(data2=>{
            res.render('addStudentTask', {data = target, data2})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addPostStudent(req, res){
        const idStudent = req.params.id
        const {StudentId, TaskId} = req.body

        const input = {StudentId, TaskId}
        StudentTask.create(input,{
            individualhooks = true
        })
        .then()
    }
}
module.exports = TaskController