/* eslint-disable no-unused-vars */
import supertest from 'supertest';

import app from '../../../app.js';
import { routesConfig } from '../../../configs/index.js';

const { groupRoutesPathname, loginRoutesPathname } = routesConfig;

let token = '';

beforeAll(async () => {
  const response = await supertest(app)
    .post(loginRoutesPathname)
    .send({ username: 'slo_4', password: 'pass' });

  token = response.body.token;
});

describe('Testing Group entity controller methods', () => {
  it('GET /groups', async () => {
    const response = await supertest(app)
      .get(groupRoutesPathname)
      .set('Accept', 'application/json')
      .set('Authorization', token);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body?.length).toBeGreaterThanOrEqual(0);
  });

  it('POST /groups', async () => {
    const groupData = {
      name: 'NEW_GROUP',
      permissions: 'READ'
    };
    const response = await supertest(app)
      .post(groupRoutesPathname)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(groupData);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      ...groupData,
      permissions: 0
    });
  });

  it('POST /groups/addUserToGroup', async () => {
    const userToGroupData = {
      userId: '87278455-cb0a-40f2-a6a9-9af2efb27e46',
      groupId: 'bacc7c1d-dff5-4132-b392-e5692944aabb'
    };
    const response = await supertest(app)
      .post(`${groupRoutesPathname}/addUserToGroup`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(userToGroupData);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: false,
      message: 'User wasn\'t added to a group'
    });
  });

  it('PUT /groups/:groupId', async () => {
    const groupDataToEdit = {
      name: 'NEW_GROUP_UPDATE',
      permissions: 'WRITE'
    };
    const response = await supertest(app)
      .put(`${groupRoutesPathname}/38965d1b-d330-4433-b963-94863ef2d88f`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(groupDataToEdit);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      message: 'Group updated'
    });
  });

  it('DELETE /groups/:groupId', async () => {
    const response = await supertest(app)
      .delete(`${groupRoutesPathname}/38965d1b-d330-4433-b963-94863ef2d88f`)
      .set('Accept', 'application/json')
      .set('Authorization', token);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      message: 'Group deleted'
    });
  });
});
