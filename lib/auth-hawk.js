'use strict';

// Load modules


// Declare internals

const internals = {
    credentials: {
        d74s3nz2873n: {
            key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
            algorithm: 'sha256'
        }
    }
};

internals.getCredentialsFunc = function (id, callback) {

    return callback(null, internals.credentials[id]);
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
