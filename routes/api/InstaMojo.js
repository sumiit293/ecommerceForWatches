const router = require("express").Router();
const User = require("./../../modal/UserModal");
const Cart = require("./../../modal/Cart");
const auth = require("./../../middleware/Auth")
const axios = require("axios")

// path api/instamojo/
//@DESC for creating the payment request
// PRIVATE
router.post("/", auth, async (req, res) => {

    try {

        console.log(req.body);
        const { config, data } = req.body;
        const response = await axios.post("https://www.instamojo.com/api/1.1/payment-requests/", data, config);
        res.send(response.data);

    } catch (error) {

        console.log(error);
    }


})



module.exports = router
