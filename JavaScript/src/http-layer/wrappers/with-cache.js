const sendResponse = require('../response/send-response');

const withCache = (httpServerHandler, cachableRoutes) => {
  const cache = {};
  console.log('cachableRoutes', cachableRoutes);
  return (req, res) => {
    if (cache[req.url] && req.method === 'GET') {
      console.log('I return response from cache');
      sendResponse(res, 200, cache[req.url]);
      return;
    }

    const proxyResponse = new Proxy(res, {
      get(target, prop) {
        if (
          prop === 'end' &&
          (!cachableRoutes || cachableRoutes.includes(req.url)) &&
          req.method === 'GET'
        ) {
          return value => {
            console.log('target.statusCode', target.statusCode);
            if (target.statusCode === 200) {
              console.log('Cached response for', req.url);
              cache[req.url] = value;
            }

            target[prop](value);
          };
        }
        return target[prop].bind(target);
      },
    });

    httpServerHandler(req, proxyResponse);
  };
};

module.exports = withCache;
