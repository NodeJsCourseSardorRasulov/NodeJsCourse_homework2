export class GroupService {
  constructor(groupModel) {
    this.groupModel = groupModel;
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
}
