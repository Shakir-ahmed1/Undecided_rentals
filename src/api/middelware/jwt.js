const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign({ userId: user.id, userName:user.email }, 
        'pizzaallthewayfam', {expiresIn: '1h',});
    return accessToken;
}

module.exports = { createToken }