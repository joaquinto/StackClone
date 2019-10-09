import faker from 'faker';

const userData = {
  signUpData: {
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  missingDisplayName: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  emptyDisplayName: {
    displayName: '',
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  invalidDisplayName: {
    displayName: 'j',
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  missingEmail: {
    displayName: faker.internet.userName(),
    password: faker.internet.password(),
  },
  emptyEmail: {
    displayName: faker.internet.userName(),
    email: '',
    password: faker.internet.password(),
  },
  invalidEmail: {
    displayName: faker.internet.userName(),
    email: faker.internet.userName(),
    password: faker.internet.password(),
  },
  missingPassword: {
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
  },
  emptyPassword: {
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    password: '',
  },
  invalidPassword: {
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'jj',
  },
  signIn: {
    email: 'johnwheal@gmail.com',
    password: 'johnwheal',
  },
  signInWithInvalidEmail: {
    email: 'johnwhealgmail.com',
    password: 'johnwheal',
  },
  signInwithMissingEmail: {
    password: 'johnwheal',
  },
  signInWithEmptyEmail: {
    email: '',
    password: 'johnwheal',
  },
  signInWithWrongEmail: {
    email: 'johnwhea@gmail.com',
    password: 'johnwheal',
  },
  signInWithWrongPassword: {
    email: 'johnwheal@gmail.com',
    password: 'johnwhea',
  },
  signInWithEmptyPassword: {
    email: 'johnwheal@gmail.com',
    password: '',
  },
  signInwithMissingPassword: {
    email: 'johnwheal@gmail.com',
  },
};

export default userData;
