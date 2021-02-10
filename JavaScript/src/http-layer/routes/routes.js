const hello = require('../controllers/hello');
const { getPerson, postPerson } = require('../controllers/person');
const HttpError = require('../errors');

const routes = {
  '/': {
    GET: hello,
  },
  '/person': {
    GET: getPerson,
    POST: postPerson,
  },
};

const serializers = {
  function: async (func, req, res) => (await func(req, res)).toString(),
  undefined: () => {
    throw new HttpError(404, 'Not Found');
  },
};

module.exports = {
  routes,
  serializers,
};
