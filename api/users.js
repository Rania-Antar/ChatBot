var express = require('express')
var router = express.Router()
var Users = require('../models/users')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')
var auth = require('../api/auth')
const JSON = require('circular-json')
var mongoose = require('mongoose');
var deasync = require('deasync');
const storage = require('node-sessionstorage')

router.get('/',function (req,res) {
    console.log(req.session.userId)
    console.log(req.session.password)
    res.render('chatbot.twig');
})

router.post('/sign-up', function (req,res) {

    var user = new Users.model({
        email: req.body.email,
        cin: req.body.cin,
        identification : req.body.identification,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        birthday: req.body.birthday,
        registration_date: req.body.registration_date,
        role: req.body.role,
    })

    user.save(function (err, u) {
        if(err){
            res.send(err)
        }
        else {
            res.send(u)
        }
    })
    
})

router.get('/all-users', auth.authenticate, function (req,res) {
    Users.model.find(function(err, users){
        if(err){
            res.send(err)
        }
        else{
            res.json(users)
        }
    })
})

router.delete('/delete/:id',function (req,res) {
    var id = req.params.id
    Users.model.findOneAndDelete(id, function (err, usr) {
        if(err){
            res.send(err)
        }
        if(!usr){
            res.status(401).json(usr)
        }
        else {
            res.send('deleted')
        }
    })
})
router.post('/login',function (req,res,next) {
    console.log(req.body.email)
    console.log(req.body.password)
    Users.model.findOne({email: req.body.email},function (err, usr) {
        if(err){
            res.send(err)
        }
        if(!usr){
            res.status(401).json({err:'Unauthorized or wrong password'})

        }
        else{
            if(bcrypt.compareSync(req.body.password, usr.password)){

                storage.setItem('user', usr)
                req.session.userId = usr._id
                req.session.password = usr.password
                var token = jwt.sign({email: usr.email}, 'secret', {expiresIn: 3600})
                var u = new Users.model()
                u = usr
                u.password=null
                console.log(u)
                res.status(200).json({success: true, token: token, user: u})
            }
            else{
                console.log(usr.password + " usr password")
                console.log(usr.password + " input password")
                res.status(401).json({err:'Unauthorized or wrong password'})
            }
        }
    })
})

router.get('/get_connected_user', function(req, res, next) {
    var id = storage.getItem(('user'))._id ;
        Users.model.findById(id).exec((err,usr)=> {
        if(err){
            res.status(401).json({err: err})
        }
        if(!usr){
            res.status(401).json({err:'User not found'})
        }
        else{
            for (var i = 0; i < usr.skills.length; i++)
            {
                 console.log(usr.skills[i].title)
            }
            res.status(200).json({user: usr})
        }
    })
});


router.get('/logout', function(req, res, next) {
    if (storage.getItem('user') != '') {
        storage.setItem('user', '')
        res.status(200).json({msg: 'Logged out'})
    }
    else{
        console.log("no session")
        res.status(401).json({msg: 'Sorry no session yet'})
    }
});


module.exports = router