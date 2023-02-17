const express = require('express')
const router = express.Router()
require('../db/conn')
const bcrypt = require('bcrypt')
const Register = require('../models/register')
const jwt = require('jsonwebtoken')
const userAuthentication = require('../userAuthentication/userAuthentication')

// ***********using promises

// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: 'All fields are required' })
//     } else {

//         //  left email:jo user field main enter kr rha hai
//         //   right email:jo hmne define ki hai body main
//         //    agr yeh dono same hojayen tau error dena hai

//         Register.findOne({ email: email })
//             .then((userExist) => {
//                 if (userExist) {
//                     return res.status(422).json({ error: 'email already exist' })
//                 }
//                 const user = new Register({ name, email, phone, work, password, cpassword })
//                 user.save()
//                     .then(() => {
//                         res.status(201).json({ message: "user registered successfully" })
//                     })
//                     .catch((error) => {
//                         res.status(500).json({ error: 'failed to register' })
//                     })
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
// })

// ***********Using Async/Await
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'All fields are required' })
    }

    try {
        const userExist = await Register.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: 'email already exist' })
        }
        else if (password === cpassword) {
            const user = new Register({ name, email, phone, work, password, cpassword })
            await user.save()
            res.status(201).json({ message: "user registered successfully" })
        }
        else {
            return res.status(422).json({ error: 'password and confirm password not match' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'failed to register' })
    }
})

// ***********USER LOGIN

// post method use krenge q k data ko front-end 
// se bhej rhe hain backend main match krne k liye 

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(422).json({ error: "all fields are required" })
        }
        else {
            // left email jo database main hai right email jo user enter 
            // kr rha hai login krte mai 

            const userLogin = await Register.findOne({ email: email })

            if (userLogin) {

                // left password jo user login hote waqt enter kr rha hai
                // right password jo database main mojud hai

                const passMatch = await bcrypt.compare(password, userLogin.password)

                const token = await userLogin.generateAuthToken()
                console.log(token)

                // generating token in cookies

                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 5259600000), //expires in 2 months from current date
                    httpOnly: true
                })

                if (!passMatch) {
                    res.status(400).json({ error: "Invalid Credentials" })
                }
                else {
                    res.status(201).json({ message: "signin successfull" })
                }

            } else {
                res.status(400).json({ error: "Invalid Credentials" })
            }

        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/about', userAuthentication, (req, res) => {
    res.send(req.user)
})
router.get('/home', userAuthentication, (req, res) => {
    res.send(req.user)
})
router.get('/getContact', userAuthentication, (req, res) => {
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send("user logout")
})

router.post('/contact', userAuthentication, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body

        if (!name || !email || !phone || !message) {
            console.log('please fill the fields before send')
            return res.json({ err: 'Please fill the Fields' })
        }

        const userContact = await Register.findOne({ _id: req.userId })
        if (userContact) {
            const usermessage = await userContact.sendMessage(name, email, phone, message)
            await userContact.save()
            res.status(201).json({ message: "user message has been sent" })
        }
    } catch (err) {
        console.log(`${err} arha hai `)
    }
})

module.exports = router;