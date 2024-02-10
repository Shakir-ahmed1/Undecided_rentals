const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    confimPassowrd: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('User', userSchema);
