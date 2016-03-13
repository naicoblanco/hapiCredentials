'use strict';

// Load modules

const Glue = require('glue');


// Declare internals

const internals = {};


exports.init = (manifest, options, next) => {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        // Start the server

        server.start((err) => {

            return next(err, server);
        });
    });
};
