const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();


//----------------- sign up user -------------------


router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
    if (!Superadmin) {
        return res.send('/users',"You need to Sign Up first..!")
    } else {
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
        return res.send(`Welcome ${Superadmin}`)
    }
      
    } catch (e) {
      res.status(400).send(e);
    }
  });


// --------------------- login user -----------------

router.post("/users/login", async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  });


//--------------- fetch users -----------------------

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
  });



//-------------- Delete User ------------------

router.delete("/users/me", auth, async (req, res) => {
    try {
      await req.user.remove();
      sendCancelationEmail(req.user.email, req.user.name);
      res.send(req.user);
    } catch (e) {
      res.status(500).send();
    }
  });

