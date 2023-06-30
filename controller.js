const userModel = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


// sign token using secret Key
const signToken = id => {
    return jwt.sign({ id }, 'SECRET_KEY');
};


// sending token using cookie
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // cookie setup
    const cookieOptions = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};



module.exports.signup = async (req, res) => {

    try {
        let password = await bcrypt.hash(req.body.password, 12);
        let email = req.body.email;
        let name = req.body.name;

        const newUser = await userModel.create({
            name,
            email,
            password
        });

        createSendToken(newUser, 201, res);

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}



module.exports.login = async function login(req, res) {
    try {
        console.log('login');
        let data = req.body;
        console.log(data);
        if (data.email) {
            let user = await userModel.findOne({ email: data.email })
            if (user) {
                // data.password = await bcrypt.hash(data.password, 12);
                console.log(user.password, data.password);
                if (await bcrypt.compare(data.password, user.password)) {

                    createSendToken(user, 200, res);

                } else {
                    return res.json({
                        message: "Wrong Credenitals"
                    })
                }

            } else {
                return res.json({
                    message: "User not found"
                })
            }
        } else {
            return res.json({
                message: "User not found"
            })
        }

    } catch (err) {
        console.log("Error");
        return res.json({
            message: err.message
        })
    }
}
