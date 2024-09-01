const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
    try {

        // Get the email and password off req body
        const { email, password } = req.body;

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create a user with the data
        await User.create({ email, password: hashedPassword });

        // respond
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

async function login(req, res) {
    try {
        // Get the email and password of req body
        const { email, password } = req.body;
    
        // Find the user with requested email
        const user = await User.findOne({ email });
        if (!user) return res.sendStatus(401) // user not found
    
        // Compare sent in password with found user password hash
        const matched = bcrypt.compareSync(password, user.password);
        if (!matched) return res.sendStatus(401); // unauthorized
    
        // Create a jwt towken
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    
        // Set the cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
    
        // Send it
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

function checkAuth(req, res) {
    try {
        res.sendStatus(200);
    } catch(error) {
        return res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
}