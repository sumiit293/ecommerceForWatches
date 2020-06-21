const express = require("express");
const app = express();
const path = require("path");
const PORT = 5000 || process.env.PORT;




// middleware for parsing form value
app.use(express.json({ extended: false }));


// connecting to databse
const connectionString = require("./config/MyUrl").connectionString;
const connectToDb = require("./config/ConnectDb");
connectToDb(connectionString);



// getiing the user api
const user = require("./routes/api/User");
app.use("/api/user", user);

//getting the auth api
const auth = require("./routes/api/Auth");
app.use("/api/auth", auth);

//getting the cart api
const cart = require("./routes/api/Cart");
app.use("/api/cart", cart);

//getting all the instamojo api
const instamojo = require("./routes/api/InstaMojo");
app.use("/api/instamojo", instamojo);

//sending the test mail
const sendmail = require('./Utils/Sendmail');
//targets.map((target => { let count = 1; sendmail(target); console.log("  " + count++) }));

if (process.env.NODE_ENV === "production") {

    app.use(express.static('myapp/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "myapp", "build", "index.html"))
    })
}



app.listen(PORT, () => console.log("app is ruuning on port  " + PORT))


