export const pageCount = 10;
export const successMessage = "success";
export const textInputFieldError = 'This field is required';
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Iml'+
'kIjoxLCJlbWFpbCI6ImFkbWluQGRvY3N0ZXIuY29tIiwiZnVsbE5hbWUiOiJFc3RoZXIg'+
'RmFsYXlpIiwidXNlck5hbWUiOiJmdW5taSIsInJvbGVJZCI6MX0sImlhdCI6MTUwMDk4N'+
'TU0OSwiZXhwIjoxNTAxMDcxOTQ5fQ.dbUz5oJw1qZ-X3IQPTHqVPvbg53mFOvYY19rsyO-H4I';
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
export const publicDocument = {
  id: 1,
  title: 'A public document',
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
  title: 'A public document',
  slug: 'a-public-document',
  content: 'This public document was updated to a role document',
  access: 'role',
  userId: 1,
  updatedAt: new Date()
};
export const textInputFieldProps = {
  type: 'password',
  name: 'test',
  placeholder: 'Jest client test',
  value: 'Jest client test value'
};
