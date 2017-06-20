import faker from 'faker';

const testData = {
  appUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  newUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  newUserWithNoUsername: {
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  newUserWithNoEmail: {
    fullName: faker.name.findName(),
    password: faker.internet.password(),
    roleId: 3
  },
  newUserWithNoPassword: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    roleId: 3
  },
  newDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  newDocumentWithoutTitle: {
    content: faker.lorem.paragraph(),
    slug: 'some slug'
  },
  newRole: {
    roleType: faker.name.jobType()
  }
};

export default testData;
