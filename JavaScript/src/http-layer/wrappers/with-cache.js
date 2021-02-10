const withCache = (httpServerHandler, cachableRoutes) => {
  const cache = {};
  return (req, res) => {
    if (cache[req.url] && req.method === 'GET') {
      console.log('Returned response from cache');
      res.writeHead(200);
      res.end(cache[req.url]);
      return;
    }

    if (cache[req.url] && req.method === 'POST') {
      console.log('Cleared cache for', req.url);
      delete cache[req.url];
    }

    let responseCache = '';

    const proxyResponse = new Proxy(res, {
      get(target, prop) {
        if (
          (!cachableRoutes || cachableRoutes.includes(req.url)) &&
          req.method === 'GET'
        ) {
          if (prop === 'write') {
            return value => {
              responseCache += value;
              target[prop](value);
            };
          }
          if (prop === 'end') {
            return value => {
              if (target.statusCode === 200) {
                console.log('Cached response for', req.url);
                cache[req.url] = responseCache + value;
              }

              target[prop](value);
            };
          }
        }
        return target[prop].bind(target);
      },
    });

    httpServerHandler(req, proxyResponse);
  };
};

module.exports = withCache;
