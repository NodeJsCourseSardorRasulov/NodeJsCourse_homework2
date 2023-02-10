import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

import { getAutoSuggestUsers } from './src/utils/index.js';
import { userMiddlewareValidator } from './src/validation/index.js';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is launched on port ${port}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  {
    id:uuidv4(),
    login: 'login',
    age: 20,
    password: 'password',
    isDeleted: false
  }
];

app.get('/users/:loginSubstring?/:limit?', (req, res) => {
  const { loginSubstring, limit } = req.params || {};
  const activeUsers = users.filter(({ isDeleted }) => !isDeleted);
  const filteredAndSortedUsers = getAutoSuggestUsers.call(activeUsers, loginSubstring, limit);

  res.status(200).send(filteredAndSortedUsers);
});

app.post('/users', userMiddlewareValidator, (req, res) => {
  const user = req.body;
  const newUser = {
    ...user,
    id: uuidv4(),
    isDeleted: false
  };

  users.push(newUser);
  res.status(201).send(newUser);
});

app.put('/users/:userId', userMiddlewareValidator, (req, res) => {
  const { userId } = req.params;
  const updatedUser = req.body;
  const updatingUserPosition = users.findIndex(({ id }) => id === userId);

  users[updatingUserPosition] = {
    ...users[updatingUserPosition],
    ...updatedUser
  };

  res.status(201).send(users[updatingUserPosition]);
});


app.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const deletingUserPosition = users.findIndex(({ id }) => id === userId);

  users[deletingUserPosition].isDeleted = true;

  res.status(200).send('File deleted');
});
