const HttpError = require('../errors');
const PersonService = require('../../business-layer/person-service');

async function getPerson(req, res) {
  try {
    const person = await PersonService.get();
    return JSON.stringify(person);
  } catch (e) {
    console.log(e);
    throw new HttpError(500, 'Read error');
  }
}

function postPerson(req, res) {
  return new Promise((resolve, reject) => {
    const body = [];
    req
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', async () => {
        let person;
        try {
          const data = Buffer.concat(body).toString();
          person = JSON.parse(data);
        } catch (e) {
          reject(new HttpError(400, 'Parsing Error'));
          return;
        }
        try {
          await PersonService.save(person);
          resolve('File saved');
        } catch (e) {
          reject(new HttpError(500, 'Write error'));
        }
      });
  });
}

module.exports = {
  getPerson,
  postPerson,
};
