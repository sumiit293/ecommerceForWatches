const User = require("./../../modal/UserModal");
const secret = require("./../../config/MyUrl").secrect;
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./../../middleware/Auth");

//@route GET api/auth/user
//@desc Getting th elogged in user
//@access Private

router.get("/user", auth, async (req, res) => {
    try {

        const user = await User.findById(req.userId).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json({ err: "Internal Server error" })
    }
})


//@route  POST api/auth
//@desc   Auth user and get token
//@access Public
router.post("/", async (req, res) => {

    try {

        const { email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(400).json({ msg: "Email not registerd" })
        }

        const isMatch = await bcrypt.compare(password, oldUser.password);

        if (isMatch) {

            let payload = {
                id: oldUser.id
            }
            //creating the tokens
            jwt.sign(payload, secret, {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    res.json({ error: err })
                    return;
                }
                return res.json({ token: token })
            })
        } else {

            return res.status(400).json({ msg: "Invalid password" });
        }



    } catch (error) {
        res.status(500).json({ err: "internal server Error" });
    }
})

module.exports = router