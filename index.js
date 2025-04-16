const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
const PORT = 3000;
const SALT =10;
const regex = require('regex');

async function validateRequest(req, res, next) {
    try {
        let email =req.body.email;
        let matchEmail = email.match(regex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'));
        if (!matchEmail) {
            return res.json({
                message:'invalid email'
            })
        }
        if (req.pasword.length < 8) return res.json({
            message:'invalid password length'
        });
        next();
    } catch (error) {
        throw error;
    }
    }

async function hashPassword(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, SALT, function(err, hash) {
            console.log('hashed password', hashedPassword);
            next();
        });
        
    } catch (error) {
        console.log('an error occured while hashing the password', error);
        throw error;
    }
}
// app.use(validateRequest);
app.use(hashPassword);
app.post('/register', function log(req, res) {
    console.log()
})
const startServer = async (PORT) => {
    app.listen(PORT, ()=> {
        console.log(`server started on ${PORT}`);
    })
}
startServer(PORT);