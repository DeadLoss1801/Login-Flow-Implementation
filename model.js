const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const link = `mongodb+srv://abhijeet180105:b6a3pTIt0Sk7gMr7@cluster0.jm8wmdw.mongodb.net/?retryWrites=true&w=majority`
//  mongodb+srv://abhijeet180105:<password>@cluster0.jm8wmdw.mongodb.net/
mongoose.connect(link, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(() => console.log('DB connection successful!'));


const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name should be present']
    },
    email: {
        type: String,
        required: true,
        unique: true,

        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: [true, 'password should be present'],
        minLength: 8
    }

})

const userModel = mongoose.model('user', user);

module.exports = userModel;