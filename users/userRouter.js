const router = require('express').Router();
const Users = require('./userSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secrets.js').jwtSecret
const restricted = require('../middleware/restricted-middleware.js')


const generateToken = (user) => {
    const payload = {
      subject: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    const options = {
      expiresIn: '10m'
    }
    return jwt.sign(payload, secret, options)
}

//Creates a user in the DB
router.post('/users', async (req, res) => {
    const createUser = req.body
    //creates bcrypt hashed password and sets user password to hash
    const hash = bcrypt.hashSync(createUser.password, 10)
    createUser.password = hash
    
    try{
        const createdUser = await Users.create(createUser)
        res.status(201).json(createdUser)
    }
    catch{
        res.status(400).json({message: 'There was an error creating your user.'})
    }
})

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
  
    try{
        const user = await Users.findOne({"email": email})
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
          //generates the webtoken for the user.
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.firstName}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
      catch{
        res.status(500).json({message: "There was an error locating this user"});
      };
  });

  //retrieves all users in DB
router.get('/users', restricted, async (req, res) => {
    const allUsers = await Users.find({})
    .lean()
    .exec()
    res.status(200).json(allUsers)
})

//retrieve a user in DB
router.get('/user/:id', async (req, res) => {
    const findUser = req.params.id
    try{
        const user = await Users.findById(findUser)
        .lean()
        .exec()
        res.status(200).json(user)
    }
    catch{
        res.status(404).json({message: "The user with this ID does not exist"})
    }
})

//ALWAYS REMEMBER TO EXPORT ROUTER
module.exports = router;