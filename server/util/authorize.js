const jwt = require('jsonwebtoken');

const authorize = (request, response, next) => {
    const jwtString = request.headers['api-token'];
    const secretOrPublicKey = '53f299816358dbffab2e07d6afc22048a768e931d0651f5252635e312dee168c';

    jwt.verify(jwtString, secretOrPublicKey, {}, (err, payload) => {
        if (err) {
            console.log(payload);
            response.statusMessage = "Not authorized";
            return response.status(401).end();
        } else {
            next();
        }
    });
}

module.exports = authorize;
