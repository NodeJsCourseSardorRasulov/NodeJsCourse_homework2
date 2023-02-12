import { Op } from 'sequelize';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getAll(loginSubstring, limit) {
    const users = await this.userModel.findAll({
      where: {
        isDeleted: false,
        login: {
          [Op.startsWith]: loginSubstring
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
    const updatedUser = await this.userModel.update(user, {
      where: {
        id: userId
      }
    });

    return updatedUser;
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
}
