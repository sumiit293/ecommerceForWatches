const User = require("./../../modal/UserModal");
const secret = require("./../../config/MyUrl").secrect;
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("./../../Utils/Sendmail")

router.post("/", async (req, res) => {

    try {

        const { email, phone, password, address, name } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ msg: "User with this email allready exist" })
        }
        const newUser = new User({
            email,
            password,
            address,
            phone,
            name
        })
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash

        await newUser.save();


        let payload = {
            id: newUser.id
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

    } catch (error) {
        res.status(500).json({ err: "internal server Error" });
    }
})

router.post("/otp", (req, res) => {

    const { email, otp } = req.body;
    sendMail(otp, email);
})

module.exports = router