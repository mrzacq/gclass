const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
class UserController{
    static register(req,res){
        res.render('auth-pages/register')
    }

    static registerPost(req, res){
        const { username, email, password } = req.body
        const input = { username, email, password }

        User.create(input)
        .then((newUser) => {
            res.redirect('/login')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static login(req, res){
        const error = req.query.error
        res.render('auth-pages/login', { error })
    }

    static loginPost(req, res){
        const { username, password } = req.body
        User.findOne({
            where: {
                username
            }
        })
        .then((data) => {
            if(data){
                const samePassword = bcrypt.compareSync(password, data.password)
                if(samePassword){

                    req.session.userId = data.id
                    return res.redirect('/')
                }
                else{
                    const err = 'invalid password'
                    return res.redirect(`/login?error=${err}`)
                }
            }
            else{
                const err = 'invalid password/username'
                return res.redirect(`/login?error=${err}`)
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static logout(req, res){
        req.session.destroy((err) => {
            if(err){
                res.send(err)
            }
            else{
                res.redirect('/login')
            }
        })
    }
}

module.exports = UserController