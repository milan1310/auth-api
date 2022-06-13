const router = require("express").Router();
const User = require("../models/user");
const auth = require('../controllers/auth')

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log(token);
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {

    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send("There are problem in server :" + error);
  }
});

router.get('/readprofile', auth, (req,res)=>{
    res.send(req.user);
});

router.post('/logout', auth, async( req,res)=> {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.send("logged out")
    } catch (error) {
        res.send(500).send();
    }
})

module.exports = router;
