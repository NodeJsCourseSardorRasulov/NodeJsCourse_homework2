import { Op } from 'sequelize';
import Jwt from 'jsonwebtoken';

import { authSecret } from '../configs/index.js';

export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getAll(loginSubstring, limit) {
    const users = await this.userModel.findAll({
      where: {
        login: {
          [Op.startsWith]: loginSubstring || ''
        }
      },
      order: [
        ['login', 'DESC']
      ],
      limit
    });

    return users;
  }

  async create(user) {
    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async update(user, userId) {
    const result = await this.userModel.update(user, {
      where: {
        id: userId
      }
    });

    return result;
  }

  async softDelete(userId) {
    const res = await this.userModel.destroy({
      where: {
        id: userId
      }
    });

    return res;
  }

  async hardDelete(userId) {
    const res = await this.userModel.destroy({
      force: true,
      where: {
        id: userId
      }
    });

    return res;
  }

  async findUser(username) {
    const user = await this.userModel.findOne({
      where: {
        login: username
      }
    });

    return user;
  }

  async login(username, password) {
    const user = await this.findUser(username);

    if (!user || user.password !== password || user.isDeleted) {
      return false;
    }

    const payload = { username: user.login };
    const token = Jwt.sign(payload, authSecret, { expiresIn: '10m' });

    return token;
  }
}
