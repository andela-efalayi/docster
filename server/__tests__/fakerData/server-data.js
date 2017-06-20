import faker from 'faker';

const serverData = {
  newUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  appUser: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 4
  },
  documentOwner: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 4
  },
  newDocumentContent: faker.lorem.paragraph(),
  newFullName: faker.name.findName(),
  userRole: {
    roleType: faker.name.jobType()
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
