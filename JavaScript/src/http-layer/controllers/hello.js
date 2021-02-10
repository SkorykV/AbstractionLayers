const parseCookies = require('../request/cookies');

async function hello(req, res) {
  const cookies = parseCookies(req);
  res.writeHead(200, {
    'Set-Cookie': 'mycookie=test',
    'Content-Type': 'text/html',
  });
  const ip = req.connection.remoteAddress;
  res.write(`<h1>Welcome</h1>Your IP: ${ip}`);
  return `<pre>${JSON.stringify(cookies)}</pre>`;
}

module.exports = hello;
