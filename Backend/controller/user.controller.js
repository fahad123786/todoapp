const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const Salt = 10;
var jwt = require('jsonwebtoken');



exports.store = async (req, res) => {
    try {
        const { password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, Salt);
        req.body.password = encryptedPassword;
        const user = await User.create(req.body);
        res.json({ status: 200, message: "User Created Successfully", user });
    }
    catch (err) {
        console.log("Error in Creating user", err);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (comparePassword) {
                var token = jwt.sign({ id: user._id }, 'abcd123');
                 return res.json({ status: 200, message: "User Logged in Successfully",success: true, token: token });

            }
            else {
                return res.json({ message: "Please Enter Correct Password" });
            }
        }
        else{
            return res.json({message:"User not found"});
        }

    }

    catch (err) {
        console.log(err);
    }
}


exports.index = async (req, res) => {
    try {

        const user = await User.find({});
        res.json({ status: 200, message: "Users fetched Successfully", user });
    }

    catch (err) {
        console.log(err);
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.json({ status: 404, message: "Couldn't find user" });
        }
        res.json({ status: 200,success:true, message: "User Fetched Successfully", user })
    }

    catch (err) {
        console.log(err);
    }
}