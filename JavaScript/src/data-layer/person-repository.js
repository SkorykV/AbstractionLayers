const fs = require('fs').promises;

class PersonRepository {
  static async get() {
    return JSON.parse(await fs.readFile('./person.json'));
  }
  static async save(person) {
    const data = JSON.stringify(person);
    await fs.writeFile('./person.json', data);
  }
}

module.exports = PersonRepository;
