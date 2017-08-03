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
  nonExistingUser: {
    user: 'notauser@email.com',
    password: 'doesnotexist'
  },
  userWithInvalidEmail: {
    email: faker.date.month()
  },
  administrator: {
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminToken: generateToken({
    id: 10,
    email: 'dummy.admin@mail.com',
    fullName: 'admin fullname',
    userName: 'username',
    roleId: 1
  }),
  newDocumentTitle: faker.lorem.sentence(),
  newFullName: faker.name.findName(),
  userRole: {
    roleType: "technical consultant"
  },
  newPublicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  documentWithNoTitle: {
    content: faker.lorem.paragraph()
  }
};

export default serverData;
