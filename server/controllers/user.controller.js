const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (request, response) => {
    User.create(request.body)
        .then(registeredUser => {
            const secretOrPublicKey = `53f299816358dbffab2e07d6afc22048a768e931d0651f5252635e312dee168c`;
            const payload = {_id: registeredUser._id}
            jwt.sign(payload, secretOrPublicKey, {expiresIn: '20m'}, (err, token) => {
                response.status(201).json({token})
            })
        })
        .catch(err => {
            response.statusMessage = `There was an error executing create: ${err}`;
            return response.status(400).json(err);
        });
}

const login = (request, response) => {
    User.findOne({email: request.body.email})
        .then(user => {
            if (user === null) {
                response.statusMessage = `User with email: ${request.body.email}, not found!`;
                return response.status(404).end();
            } else {
                bcrypt.compare(request.body.password, user.password)
                    .then(passwordIsValid => {
                        if (passwordIsValid) {
                            const secretOrPublicKey = `53f299816358dbffab2e07d6afc22048a768e931d0651f5252635e312dee168c`;
                            const payload = {_id: user._id}
                            jwt.sign(payload, secretOrPublicKey, {expiresIn: '20m'}, (err, token) => {
                                return response.status(200).json({
                                    message: `Welcome back ${request.body.email}`,
                                    token
                                });
                            });
                        } else {
                            response.statusMessage = `Incorrect password!`;
                            return response.status(400).end();
                        }
                    })
                    .catch(err => {
                        response.statusMessage = `There was an error executing create: ${err}`;
                        return response.status(400).json(err);
                    });
            }
        })
        .catch(err => response.json(err));
}

const authorize = (request, response) => {
    const jwtString = request.headers['api-token'];
    const secretOrPublicKey = `53f299816358dbffab2e07d6afc22048a768e931d0651f5252635e312dee168c`;
    jwt.verify(jwtString, secretOrPublicKey, {}, (err, payload) => {
        if (err) {
            response.statusMessage = `Token has expired or is invalid.`;
            return response.status(406).end();
        } else {
            return response.status(202).json(payload);
        }
    });
}

const UserController = {
    register,
    login,
    authorize
}

module.exports = UserController;
