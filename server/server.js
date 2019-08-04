const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./Controllers/register');
const login = require('./Controllers/signIn');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smart_brain'
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', login.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', image.handleApiCall())

app.listen(process.env.PORT || 3000, () => {
    console.log(`listen on port`); 
})
