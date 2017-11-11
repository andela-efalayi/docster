import faker from 'faker';
import ActionTypes from '../../constants/ActionTypes';

export const pageCount = 10;
export const successMessage = "success";
export const textInputFieldError = 'This field is required';
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Iml'+
'kIjoxLCJlbWFpbCI6ImFkbWluQGRvY3N0ZXIuY29tIiwiZnVsbE5hbWUiOiJFc3RoZXIg'+
'RmFsYXlpIiwidXNlck5hbWUiOiJmdW5taSIsInJvbGVJZCI6MX0sImlhdCI6MTUwMDk4N'+
'TU0OSwiZXhwIjoxNTAxMDcxOTQ5fQ.dbUz5oJw1qZ-X3IQPTHqVPvbg53mFOvYY19rsyO-H4I';

export const textInputFieldProps = {
  type: 'password',
  name: 'test',
  placeholder: 'Jest client test',
  value: 'Jest client test value'
};

export const dummyUser = {
  user: "esther",
  password: "password"
};

export const currentUser = {
  fullName: "Esther Falayi",
  userName: "funmi",
  email: "admin@docster.com",
  id: 1,
  roleId: 1
};

export const newUser = {
  fullName: faker.name.findName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export const existingUser1 = {
  fullName: faker.name.findName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  id: 2,
  roleId: 3
};

export const existingUser2 = {
  fullName: faker.name.findName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  id: 3,
  roleId: 2
};

export const newPublicDocument = {
  title: faker.lorem.word(),
  content: faker.lorem.paragraph(),
  access: 'public'
};

export const publicDocument = {
  id: 1,
  title: 'a public document',
  slug: 'a-public-document',
  content: 'Eiusmod duis consectetur dolore occaecat nulla. Esse '+
  'adipisicing pariatur sit nostrud do elit aliquip '+
  'exercitation. Reprehenderit exercitation nisi adipisicing '+
  'deserunt fugiat labore labore laborum adipisicing culpa '+
  'consectetur eiusmod.Elit nisi ullamco dolor quis quis non '+
  'officia. Minim ipsum cupidatat sunt aliqua sint occaecat dolore'+
  ' in anim sit.Est labore nostrud aliquip aliquip ipsum eiusmod '+
  'consectetur proident ut aute.Sint dolor tempor laborum nostrud incididunt.',
  access: 'public',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const updatedDocument = {
  id: 1,
  title: 'a role document',
  slug: 'a-role-document',
  content: 'This public document was updated to a role document',
  access: 'role',
  userId: 1,
  updatedAt: new Date()
};

export const privateDocument = {
  id: 2,
  title: 'a private document',
  slug: 'a-private-document',
  content: 'Eiusmod duis consectetur dolore occaecat nulla. Esse '+
  'adipisicing pariatur sit nostrud do elit aliquip '+
  'exercitation. Reprehenderit exercitation nisi adipisicing '+
  'deserunt fugiat labore labore laborum adipisicing culpa '+
  'consectetur eiusmod.Elit nisi ullamco dolor quis quis non '+
  'officia. Minim ipsum cupidatat sunt aliqua sint occaecat dolore'+
  ' in anim sit.Est labore nostrud aliquip aliquip ipsum eiusmod '+
  'consectetur proident ut aute.Sint dolor tempor laborum nostrud incididunt.',
  access: 'private',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const roleDocument = {
  id: 3,
  title: 'a role document',
  slug: 'a-role-document',
  content: 'Eiusmod duis consectetur dolore occaecat nulla. Esse '+
  'adipisicing pariatur sit nostrud do elit aliquip '+
  'exercitation. Reprehenderit exercitation nisi adipisicing '+
  'deserunt fugiat labore labore laborum adipisicing culpa '+
  'consectetur eiusmod.Elit nisi ullamco dolor quis quis non '+
  'officia. Minim ipsum cupidatat sunt aliqua sint occaecat dolore'+
  ' in anim sit.Est labore nostrud aliquip aliquip ipsum eiusmod '+
  'consectetur proident ut aute.Sint dolor tempor laborum nostrud incididunt.',
  access: 'role',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const facilitator = {
  id: 1,
  roleType: 'facilitator',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const error = {
  response: {
    status: 400,
    message: 'an error occurred'
  }
};

export const authAction = {
  type: ActionTypes.SET_CURRENT_USER,
  currentUser
};

export const defaultAction = {
  type: 'DEFAULT_ACTION'
};

export const getUsersAction = {
  type: ActionTypes.GET_ALL_USERS,
  users: {
    count: 2,
    rows: [
      currentUser,
      existingUser1,
      existingUser2
    ]
  }
};

export const createDocumentAction = {
  type: ActionTypes.CREATE_DOCUMENT,
  newPublicDocument 
};

export const getPublicDocumentsAction = {
  type: ActionTypes.GET_PUBLIC_DOCUMENTS,
  documents: {
    count: 1,
    rows: [
      publicDocument
    ]
  }
};

export const getRoleDocumentsAction = {
  type: ActionTypes.GET_ROLE_DOCUMENTS,
  documents: {
    count: 1,
    rows: [
      roleDocument
    ]
  }
};

export const getUserDocumentsAction = {
  type: ActionTypes.GET_USER_DOCUMENTS,
  documents: {
    count: 3,
    rows: [
      publicDocument,
      roleDocument,
      privateDocument
    ]
  }
};

export const updateDocumentAction = {
  type: ActionTypes.UPDATE_DOCUMENT,
  document: updatedDocument
};

export const deleteDocumentAction = {
  type: ActionTypes.DELETE_DOCUMENT,
  document: updatedDocument
};

export const getRolesAction = {
  type: ActionTypes.GET_ALL_ROLES,
  roles: {
    count: 1,
    rows: [
      facilitator
    ]
  }
};

export const searchUsersAction = {
  type: ActionTypes.SEARCH_ALL_USERS,
  users: {
    count: 2,
    rows: [
      existingUser1,
      existingUser2
    ]
  }
};

export const searchDocumentsAction = {
  type: ActionTypes.SEARCH_ALL_DOCUMENTS,
  documents: {
    count: 2,
    rows: [
      roleDocument,
      privateDocument
    ]
  }
};

export const updateUserRoleAction = {
  type: ActionTypes.UPDATE_USER_ROLE,
  user: {
    fullName: existingUser1.fullName,
    userName: existingUser1.userName,
    email: existingUser1.email,
    id: existingUser1.id,
    roleId: 4
  }
};
