// Librerías requeridas
const { define } = require('typeorm-seeding');

// Módulos de la aplicación requeridos
const User = require('../../app/Models/User');

// Definiciones de tipo
/** @typedef {import('faker')} Faker */

define(User,
/**
 *
 * @param {Faker} faker
 */
(faker) => {
  const username = faker.username();
  const email = faker.email();
  const password = faker.password();

  const user = new user(username, email, password);

  return user;
});
