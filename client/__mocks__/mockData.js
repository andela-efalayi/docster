export const token = "ageneratedtoken";
export const successMessage = "success";
export const currentUser = {
  fullName: "Esther Falayi",
  userName: "esther",
  email: "esther@email.com",
  id: 1,
  roleId: 1,
  updatedAt: new Date()
};
export const dummyUser = {
  user: "esther",
  password: "password"
};
export const publicDocument = {
  id: 1,
  title: 'A public document',
  slug: 'a-public-document',
  content: 'This document should have a very very long content which will '+
  'be truncated by a the SetMaxCharacter function in the /client/utils folder.',
  access: 'public',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};
export const updatedDocument = {
  id: 1,
  title: 'A public document',
  slug: 'a-public-document',
  content: 'This document was updated to a role document',
  access: 'role',
  userId: 1,
  updatedAt: new Date()
};
export const textInputFieldError = 'This field is required';
export const textInputFieldProps = {
  type: 'password',
  name: 'test',
  placeholder: 'Jest client test',
  value: 'Jest client test value'
};
export const pageCount = 10;
