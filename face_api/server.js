const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'carl',
            email: 'cj@gmail.com',
            password: 'carl123',
            enteries: 2,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            password: 'sally123',
            enteries: 0,
            joined: new Date()
        }
    ],
    login: {
        id: '123',
        hash: 'carl123',
        email: 'cj@gmail.com'
    }

}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else{
        res.status(400).json('error loggin in');
    }
})

app.post('/register', (req, res) => {
    const {name, email} = req.body;

    const user = {
     name : name,
     email : email,
     enteries: 0,
     joined: new Date()
}
    database.users.push(user);
    res.json(database.users.length -1)
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    }) 
    if(!found){
        res.status(404).json('not found');
    }
})

app.put('/image', (req,res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.enteries++;
            return res.json(user.enteries);
        }
    }) 
    if(!found){
        res.status(404).json('not found');
    }
})

app.listen(3000, () => {
    console.log('listen on port 3000');
})
