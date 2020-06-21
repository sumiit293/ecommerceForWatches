const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/Auth");
const Cart = require("./../../modal/Cart");



// api/cart/count/items
// @desc counting the total no of items in cart
// PRIVATE
router.get("/count/items", auth, async (req, res) => {

    try {
        // Checking if the user has cart
        var caart = await Cart.findOne({ name: req.userId });

        if (!caart) {
            console.log("No cart found")
            return res.json(Number(0));
        }

        let { cart } = caart;
        var count = 0;
        cart.map((product => (count++)));

        return res.json(Number(count));

    } catch (err) {
        console.log(err)
        if (res.status) {
            return res.status;
        }
    }

})
// api/cart/cartinfo
// @desc getting all items in cart
// PRIVATE
router.get("/cartinfo", auth, async (req, res) => {

    try {

        const caart = await Cart.findOne({ name: req.userId });
        if (!caart) {
            return res.status(404).json("Cart is empty");
        }

        // Grabbing the list of all product in cart
        let { cart } = caart;
        return res.json(cart)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Unknown error occured" });
    }
})

// api/cart
// @desc adding the item to cart
// PRIVATE

router.post("/", auth, async (req, res) => {

    //checking if the user has cart

    var cart = await Cart.findOne({ name: req.userId });

    //if not create a cart for him
    if (!cart) {

        const nwCart = new Cart();
        nwCart.name = req.userId;
        await nwCart.save();

    }

    // database stuff
    try {

        const newCart = await Cart.findOne({ name: req.userId });

        // extracting the product from req ,to add to cart
        const Product = {
            productName: req.body.title,
            imagePath: req.body.image,
            productId: req.body.id,
            productPrice: req.body.price
        };

        // checking if the product is allready in the cart

        if (newCart.cart.length !== 0) {
            var allredayAvailable = false;
            for (let I = 0; I < newCart.cart.length; I++) {
                if (newCart.cart[I].productId == Product.productId) {
                    allredayAvailable = true
                    break;
                }

            }

            if (allredayAvailable) {
                res.json("All ready in cart");
                return;
            }
        }

        // if new product, saving to cart database
        await newCart.cart.unshift(Product);
        await newCart.save();
        res.json("Product added to cart");
    } catch (err) {
        console.log("error in adding to cart", err)
        res.status(500).json({ msg: "couldn't add to cart for now" })
    }
})
// api/cart/remove/:productId
// @desc adding the item to cart
// PRIVATE
router.delete("/remove/:productId", auth, async (req, res) => {

    try {

        var newCart = await Cart.findOne({ name: req.userId });
        if (!newCart) {
            return res.json("No item in cart");
        }

        newCart.cart = newCart.cart.filter((product) => {


            return product.productId != req.params.productId
        });
        await newCart.save();
        res.json("Removed from cart");
    } catch (err) {
        res.json({ msg: "Couldn't remove from cart something went wrong" });
    }
})
router.delete("/clear", auth, async (req, res) => {




    try {

        var newCart = await Cart.findOne({ name: req.userId });
        if (!newCart) {
            return res.json("No item in cart");
        }

        newCart.cart = newCart.cart.filter((product) => {


            return product.productId === "id"
        });
        await newCart.save();
        res.json("Removed from cart");
    } catch (err) {
        res.json({ msg: "Couldn't remove from cart something went wrong" });
    }
})
//api/cart/order
// @desc placing the order
//Private

router.post("/order", auth, async (req, res) => {

    try {
        //checking if the user has cart
        var cart = await Cart.findOne({ name: req.userId });


        const { totalSum, orderDetails } = req.body
        const ordersArrayUnit = {
            order: {
                TotalPrice: totalSum,
                details: orderDetails
            }
        }
        await cart.orders.unshift(ordersArrayUnit);
        const bulean = await cart.save();

        res.json("Order success");
    } catch (error) {
        res.status(400).json({ msg: "Couldn't place order, something went wrong" })
    }
})
// api/cart/orderinfo
// @desc getting all order user has made 
// PRIVATE
router.get("/orderinfo", auth, async (req, res) => {

    try {

        const caart = await Cart.findOne({ name: req.userId });
        if (!caart) {
            return res.status(404).json("Cart is empty");
        }

        // Grabbing the list of all product in cart
        let { orders } = caart;
        return res.json(orders)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Unknown error occured" });
    }
})
module.exports = router;