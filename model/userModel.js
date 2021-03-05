const { getDbo, getRealId } = require("../db/db");
class UserModel {
  constructor() {}

  async getAllUsers() {
    const dbo = await getDbo();
    return new Promise((resolve, reject) => {
      dbo
        .collection("user")
        .find()
        .toArray(function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  async generateUserId() {
    const dbo = await getDbo();
    return new Promise((resolve, reject) => {
      dbo
        .collection("user")
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray(function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          if (res.length === 0) {
            resolve(1);
          } else {
            resolve(Number(res[res.length - 1].id) + 1);
          }
        });
    });
  }

  async getUserInfo(id) {
    const dbo = await getDbo();
    return new Promise((resolve, reject) => {
      dbo
        .collection("user")
        .findOne({ id: Number(id) }, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  async addUser(user) {
    const dbo = await getDbo();
    const userId = await this.generateUserId();
    return new Promise((resolve, reject) => {
      user.id = Number(userId);
      dbo.collection("user").insertOne(user, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async updateUser(user) {
    const dbo = await getDbo();
    user.id = Number(user.id);
    return new Promise((resolve, reject) => {
      dbo
        .collection("user")
        .updateOne(
          { id: Number(user.id) },
          { $set: user },
          function (err, res) {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          }
        );
    });
  }

  async deleteUser(id) {
    const dbo = await getDbo();
    return new Promise((resolve, reject) => {
      dbo
        .collection("user")
        .deleteOne({ id }, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
    });
  }
}

module.exports = new UserModel();
