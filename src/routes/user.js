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
      res.send(req.user);
    } catch (e) {
      res.status(500).send();
    }
  });


// ----------- logout user -------------------

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});


// ------------------- Get invoice ---------------------


router.get("/user", async (req, res) => {
  try {
    await req.user.invoice;
      res.send(req.user);
  } catch (e) {
      res.status(500).send();
    }
});


// ------------------ Get Specific user ---------------------








//   // ----------------- Get all users -------------------

//   exports.getUsers = async (req, res, next) => {
//     const users = await User.find({});
//     res.status(200).json({
//      data: users
//     });
//    }
    



//   //-------------------Get user -------------------------

//    exports.getUser = async (req, res, next) => {
//     try {
//      const userId = req.params.userId;
//      const user = await User.findById(userId);
//      if (!user) return next(new Error('User does not exist'));
//       res.status(200).json({
//       data: user
//      });
//     } catch (error) {
//      next(error)
//     }
//    }
    

    

  