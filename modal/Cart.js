const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const cartSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "_user"
    },
    cart:
        [{
            productId: {
                type: String,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            productPrice: {
                type: Number,
                required: true
            },
            imagePath: {
                type: String,
                required: true
            }
        }]
    ,
    orders: [{


        order:
        {

            TotalPrice: {
                type: Number,
                required: true,
            },
            paymentId: {
                type: String,
                required: true
            },
            details: [{
                productId: {
                    type: String,
                    required: true
                },
                productName: {
                    type: String,
                    required: true
                },
                productPrice: {
                    type: Number,
                    required: true
                },
                imagePath: {
                    type: String,
                    required: true
                }
            }]



        }


    }]




})

module.exports = mongoose.model("_cart", cartSchema);