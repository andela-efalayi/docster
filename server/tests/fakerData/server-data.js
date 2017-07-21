import faker from 'faker';
import { generateToken } from '../../auth/token';

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
  dummyAdmin: {
    fullName: "Dummy Admin",
    userName: "da",
    email: "admin@dummy.com",
    password: "dummypassword",
    roleId: 1
  },
  adminToken: generateToken({
    id: 8,
    userName: "admin",
    roleId: 1
  }),
  newDocumentContent: faker.lorem.paragraph(),
  newFullName: faker.name.findName(),
  userRole: {
    roleType: "technical consultant"
  },
  newPublicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  }
};

export default serverData;
