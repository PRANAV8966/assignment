const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = 3000;
const SALT =10;

async function validateRequest(req, res, next) {
    try {
        let email =req.body.email;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email'
            });
        }
        if (req.body.password.length < 8) return res.json({
            message:'invalid password length'
        });
        next();
    } catch (error) {
        next(error);
    }
}
async function hashPassword(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, SALT, function(err, hash) {
            console.log('hashed password', hashedPassword);
            return res.status(200).json({
                success:true,
                message:'successfully created user',
                data:{
                    password: hashedPassword,
                    email: req.body.email,
                    user: req.body.UserName
                }
            })
        });
        next();
        
    } catch (error) {
        console.log('an error occured while hashing the password', error);
        throw error;
    }
}
app.use(validateRequest);
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