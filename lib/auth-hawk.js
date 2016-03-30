'use strict';

// Load modules

const Hoek = require('hoek');
// const Users = require('./users.json');


// Declare internals

const internals = {
    credentials: {
        d74s3nz2873n: {
            key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
            algorithm: 'sha256',
            username: 'Pepe'
        }
    }
};

internals.getCredentialsFunc = function (id, callback) {

    // => Mirar la respuesta de Stackoverflow para sacar la app de un usuario con este ID
    // if (!Users.credentials[id]) {
    //     return callback(null, false);
    // }

    const credentials = Hoek.clone(internals.credentials[id]);

    return callback(null, credentials);
};


exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after hapi-auth-basic has been registered.  It's triggered by
    // server.start, and runs before actual starting of the server.  It's done because
    // the call to server.auth.strategy upon registration would fail and make the
    // server crash if the basic scheme is not previously registered by hapi-auth-basic.

    server.dependency('hapi-auth-hawk', internals.after);

    return next();
};

exports.register.attributes = {
    name: 'AuthHawk'
};


internals.after = (server, next) => {

    server.auth.strategy('hawk', 'hawk', { getCredentialsFunc: internals.getCredentialsFunc });

    return next();
};
