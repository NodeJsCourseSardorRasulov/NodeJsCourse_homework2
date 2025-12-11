import supertest from 'supertest';

import app from '../../../app.js';
import { routesConfig } from '../../../configs/index.js';

const { userRoutesPathname, loginRoutesPathname } = routesConfig;

let token;

beforeAll(async () => {
  const response = await supertest(app)
    .post(loginRoutesPathname)
    .set('Accept', 'application/json')
    .send({ username: 'slo_4', password: 'pass' });

  token = response.body.token;
});

describe('Testing User entrity controller methods', () => {
  it('GET /users', async () => {
    const response = await supertest(app)
      .get(userRoutesPathname)
      .set('Accept', 'application/json')
      .set('Authorization', token);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body?.length).toBeGreaterThanOrEqual(0);
  });

  it('GET /users/:loginSubscring?/:limit?', async () => {
    const loginSubstring = 'slo';
    const limit = 1;
    const response = await supertest(app)
      .get(`${userRoutesPathname}/${loginSubstring}/${limit}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject([{
      login: 'slo_4',
      age: 23
    }]);
  });

  it('POST /users', async () => {
    const userData = {
      login: 'NEW_USER',
      age: 90,
      password: 'pass'
    };
    const response = await supertest(app)
      .post(userRoutesPathname)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(userData);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(userData);
  });

  it('PUT /users/:userId', async () => {
    const userDataToEdit = {
      login: 'NEW_USER_UPDATED',
      age: 95,
      password: 'pass'
    };

    const response = await supertest(app)
      .put(`${userRoutesPathname}/8642f95b-d2df-4a84-ac6c-4e760a365e97`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(userDataToEdit);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      message: 'User updated'
    });
  });

  it('DELETE /users/:userId', async () => {
    const response = await supertest(app)
      .delete(`${userRoutesPathname}/8642f95b-d2df-4a84-ac6c-4e760a365e97`)
      .set('Accept', 'application/json')
      .set('Authorization', token);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      message: 'User deleted'
    });
  });
});

