'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');
const Config = require('./config');


// Declare internals

const internals = {};

internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    registrations: [
        {
            plugin: './auth-jwt'
        },
        {
            plugin: './auth-hawk'
        },
        {
            plugin: 'hapi-auth-jwt'
        },
        {
            plugin: 'hapi-auth-hawk'
        }
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};


Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);

    const webTls = server.select('web-tls');

    console.log('WebTLS server started at: ' + webTls.info.uri);
});
