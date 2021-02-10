'use strict';

// Dependencies
const http = require('http');

const withCache = require('./src/http-layer/wrappers/with-cache');
const withLogger = require('./src/http-layer/wrappers/with-logger');
const HttpError = require('./src/http-layer/errors');
const { routes, serializers } = require('./src/http-layer/routes/routes');

// HTTP Server
http
  .createServer(
    withLogger(
      withCache(async (req, res) => {
        try {
          const data = routes[req.url] && routes[req.url][req.method];
          const type = typeof data;
          const serializer = serializers[type];
          const result = await serializer(data, req, res);
          res.end(result);
        } catch (error) {
          if (error instanceof HttpError) {
            res.writeHead(error.code);
          } else {
            res.writeHead(500);
          }
          res.end(error.message);
        }
      })
      //['/person']
    )
  )
  .listen(8000);
