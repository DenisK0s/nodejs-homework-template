const express = require("express");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const { authenticate } = require("../../middlewares");
const { User, schemas } = require("../../models/user");

const router = express.Router();
const {SECRET_KEY} = process.env;


router.patch('/', authenticate, async(req, res,next) => {
  
  try {
    const {_id } = req.user;
    const { subscription } = req.body
    const { error } = schemas.updateSubscriptionStatus.validate({subscription});
    if (error) {
      throw createError(400, "Wrong subscription status !");
    }
    const result = await User.findByIdAndUpdate( _id, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const {error} = schemas.register.validate(req.body);
    if(error) {
      throw createError(400, error.message); 
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
  
    if(user) {
      throw createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({email, password: hashedPassword});

    res.status(201).json({
      user: {
        email,
        subscription: "starter"
      }
    })
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const {error} = schemas.register.validate(req.body);
    if(error) {
      throw createError(400, error.message); 
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
  
    if(!user) {
      throw createError(401, "Email or password is wrong");
    }
    const comparePass = await bcrypt.compare(password, user.password);
    
    if(!comparePass){
      throw createError(401, "Email or password is wrong"); 
    }
  
    const payload = {
      id: user._id,
    }
  
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(user._id, {token});
  
    res.status(201).json({
      token,
      user: {
        email,
        subscription: "starter"
      }
    })
    } catch (error) {
      next(error);
    }
});


router.get('/logout', authenticate, async(req, res,next) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});
  res.status(204).send()
});

router.get('/current', authenticate, async(req, res, next) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription
  })
});

module.exports = router;