'use strict';

// Load modules

const Hoek = require('hoek');
const Boom = require('boom');
const Joi = require('joi');
const Users = require('../users.json');
// const Apps = require('../apps.json');


// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be executed
    // after Auth plugin has been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.route upon registration with auth:'basic' config would fail and make
    // the server crash if the basic strategy is not previously registered by Auth.

    server.dependency('AuthHawk', internals.after);

    return next();
};

exports.register.attributes = {
    name: 'User'
};


internals.after = (server, next) => {

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            auth: { strategy: 'hawk', mode: 'try' },
            validate: {
                payload: { // payload for POST, query for GET
                    username: Joi.string().min(3).max(6).required(),
                    password: Joi.string().min(3).max(7).required()
                }
            },
            description: 'Authenticates user credentials.',
            handler: (request, reply) => {

                if (request.auth.credentials) {
                    return reply(request.auth.credentials);
                }

                internals.getUser(request.payload, (err, user) => {

                    if (err) {
                        return reply(Boom.unauthorized(err)); // "oh, no!"
                    }

                    const userAccount = Hoek.clone(user);

                    return reply(userAccount);
                });
            }
        }
    });

    return next();
};

internals.getUser = (payload, callback) => {


    let account = null;

    account = Users[payload.username];

    // joi also validates this error.

    if (!payload.username ||
        !payload.password) {

        return callback('Invalid username or password', null);
    }

    account = Users[payload.username];

    if (!account ||
        account.password !== payload.password) {

        return callback('Invalid username or password', null);
    }

    // Remove sensitive data from user cookie info

    const accountCopy = Hoek.clone(account);
    delete accountCopy.password;

    // promise resolved

    return callback(null, accountCopy);
};
