const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createUserToken = require('../helper/create-user-token')
const getToken = require('../helper/get-token')
const getUserByToken = require('../helper/get-user-by-token')
const Comment = require('../models/Comment')

module.exports = class UserController {
  static async registerUser(req, res) {
    const { name, email, password, confirmpassword, phone } = req.body

    if(!name){
       res.status(422).json({ message: 'Name is required!'})
      return
    }

    if(!phone)
      return res.status(422).json({ message: 'Phone is required!'})

    if(!email)
      return res.status(422).json({ message: 'Email is required!'})

    if(!password)
      return res.status(422).json({ message: 'Password is required!'})
    if(!password.replace(/[a-z]/g, ""))
      return res.status(422).json({ message: 'Password must contain a uppercase letter!'})
    if(!containsNumber(password))
      return res.status(422).json({ message: 'Password must contain a number!'})
    if(password.length < 8)
      return res.status(422).json({ message: 'Password must be at least 8 characters'})
    if(!confirmpassword)
      return res.status(422).json({ message: 'Confirm password is required!'})
    if(password !== confirmpassword)
      return res.status(422).json ({ message: 'Password does not match!' })

    const emailAlreadyUsed = await User.findOne({email: email})
    if(emailAlreadyUsed)
      return res.status(422).json({ message: 'E-mail already registered!'})

    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)

    const user = new User ({
      name,
      email,
      password: passwordHashed,
      phone
    })

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)

      // return res.status(201).json({ message: 'Registration successful'})
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong!'})
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body

    if(!email || !password)
      return res.status(422).json({ message: 'Fill in all fields!' })

    const user = await User.findOne({ email: email})
    if(!user)
      return res.status(422).json({ message: 'Invalid informations!' })

    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword)
      return res.status(422).json({ message: 'Invalid informations!' })

    if(!user || !checkPassword)
      return res.status(422).json({ message: 'Invalid informations!' })

    await createUserToken(user, req, res)
  }

  static async updateUser(req, res) {
    const id = req.params.id
    const { name, email, password, confirmpassword, phone } = req.body
    let image = ''

    if(req.file) {
      image = req.file.filename
    }
    
    const user = await User.findById(id)

    const token = getToken(req)
    const userByToken = await getUserByToken(token)

    if(String(user._id) !== String(userByToken._id)) {
      req.headers.authorization = undefined
      return res.status(422).json({ message: 'Something went wrong! Please try again'})
    }

    if(!name){
      res.status(422).json({ message: 'Name is required!'})
      return
    }
    if(!email)
      return res.status(422).json({ message: 'Email is required!'})

    if(!password)
      return res.status(422).json({ message: 'Password is required!'})
    if(!password.replace(/[a-z]/g, ""))
      return res.status(422).json({ message: 'Password must contain a uppercase letter!'})
    if(!containsNumber(password))
      return res.status(422).json({ message: 'Password must contain a number!'})
    if(password.length < 8)
      return res.status(422).json({ message: 'Password must be at least 8 characters'})
    if(!confirmpassword)
      return res.status(422).json({ message: 'Confirm password is required!'})
    if(password !== confirmpassword)
      return res.status(422).json ({ message: 'Password does not match!' })
    
    if(!phone)
      return res.status(422).json({ message: 'Phone is required!'})

    const userByEmail = await User.findOne({email: email})
    if(String(user._id) !== String(userByEmail._id))
      return res.status(422).json({ message: 'E-mail already registered!'})

    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)

    user.name = name
    user.email = email
    user.password = passwordHashed
    user.phone = phone
    user.image = image

    const allComments = await Comment.find({'comment.userId': user.id})
    allComments.forEach(comment => {
      comment.image = 'sadfasdfasdf'
    })

    try {
      await User.findOneAndUpdate(
        { _id: user._id }, 
        { $set: user }, 
        { new: true }
      )

      return res.status(200).json({ message: 'User updated successfully'})
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async checkUser(req, res) {
    let user 

    if(req.headers.authorization){
      const token = getToken(req)
      const decoded = jwt.verify(token, 'f1o2g3l4r5')

      user = await User.findById(decoded.id)
    } else {
      user = null
    }

    user.password = undefined
    return res.status(200).send(user)
  }

  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id)

    return res.status(200).send(user)
  }
}

function containsNumber(str) {
  return /\d/.test(str);
}