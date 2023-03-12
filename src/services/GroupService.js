import { sequelize } from '../models/index.js';

export class GroupService {
  constructor(groupModel, userModel) {
    this.groupModel = groupModel;
    this.userModel = userModel;
  }

  async getAll(limit) {
    const groups = await this.groupModel.findAll({ limit });

    return groups;
  }

  async create(group) {
    const createdGroup = await this.groupModel.create(group);

    return createdGroup;
  }

  async update(group, groupId) {
    const result = await this.groupModel.update(group, {
      where: {
        id: groupId
      }
    });

    return result;
  }

  async hardDelete(groupId) {
    const res = await this.groupModel.destroy({
      where: {
        id: groupId
      }
    });

    return res;
  }

  // async addUserToGroups(t) {
  //   const group = await this.groupModel.findByPk(groupId, {
  //     transaction: t
  //   });

  //   const user = await this.userModel.findByPk(userId, {
  //     transaction: t
  //   });

  //   return group.addUser(user, { transaction: t });
  // }

  async addUsersToGroup(groupId, userId) {
    async function cb(t) {
      const group = await this.groupModel.findByPk(groupId, {
        transaction: t
      });

      const user = await this.userModel.findByPk(userId, {
        transaction: t
      });

      return group.addUser(user, { transaction: t });
    }

    const cbWithContextBound = cb.bind(this);

    try {
      const res = await sequelize.transaction(cbWithContextBound);

      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
