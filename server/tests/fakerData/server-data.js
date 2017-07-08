import faker from 'faker';

const serverData = {
  appUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  documentOwner: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 4
  },
  newUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  regularUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  administrator: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  newDocumentContent: faker.lorem.paragraph(),
  newFullName: faker.name.findName(),
  userRole: {
    roleType: "technical consultant"
  },
  newPublicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  newPrivateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },
  newRoleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role'
  }
};

export default serverData;
