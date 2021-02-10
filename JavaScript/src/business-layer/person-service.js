const PersonRepository = require('../data-layer/person-repository');

const MILISECONDS_IN_YEAR = 31536000000;

class PersonService {
  static async get() {
    const person = await PersonRepository.get();
    person.age = PersonService._calculateAge(person);
    delete person.birth;
    return person;
  }

  static async save(personData) {
    if (personData.name) personData.name = personData.name.trim();
    await PersonRepository.save(personData);
  }

  static _calculateAge(person) {
    const birthdayTimestamp = new Date(person.birth);
    const difference = new Date() - birthdayTimestamp;
    return Math.floor(difference / MILISECONDS_IN_YEAR);
  }
}

module.exports = PersonService;
