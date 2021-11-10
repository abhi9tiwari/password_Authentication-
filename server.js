const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport')

// const initializePassport = require('./passport-config')
// initializePassport(passport)

const users = []

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended : false}))

app.get('/', (req,res) => {
    res.render('index.ejs', {name : 'Abhinav'})
})

app.get('/login', (req,res) =>{
    res.render('login.ejs')
})

app.get('/register', (req,res) =>{
    res.render('register.ejs')
})

app.post('/register', async (req,res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id : Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        res.redirect('/login')
    } catch{
        res.redirect('/register')
    } 
    console.log(users)
})

app.post('/login', async (req,res) =>{
    const user = users.find(user => user.email === req.body.email)
    if(user == null){
        return res.status(400).send('cannot find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.redirect('/');
        }
        else{
            res.redirect('/register')
        }
    } catch{
        res.status(500).send('success');
    }
})


app.listen(3000);