const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const UserModel = require("../model/userModel");
class UserController {
  constructor() {}

  async index(req, res) {
    const users = await UserModel.getAllUsers();
    res.render("index/index.html", { users });
  }

  async New(req, res) {
    res.render("new/new.html");
  }

  async Show(req, res) {
    try {
      const id = req.params.id;
      const user = await UserModel.getUserInfo(id);
  
      res.render("show/show.html", { user });
    } catch (err) {
      res.render("error/error.html", { error: err });
    }
  }

  async Update(req, res) {
    try {
      const { name, email, status, gender } = req.body;
      const { id } = req.params;
      const updateRes = await UserModel.updateUser({
        name,
        id,
        email,
        status,
        gender
      });
      res.redirect(`/index`);
    } catch(err) {
      res.render("error/error.html", { error: err });
    }
  }

  async Create(req, res) {
    try {
      const { name, email, status, gender } = req.body;
      let addRes = await UserModel.addUser({ name, email, status, gender });
      res.redirect("/index");
    } catch (err) {
      res.render("error/error.html", { error: err });
    }
  }

  async root(req, res) {
    res.redirect("/index");
  }

  async Delete(req, res) {
    try {
      const { id } = req.params;
      const delRes = await UserModel.deleteUser(Number(id));
      res.redirect("/index");
    } catch(err) {
      res.render("error/error.html", { error: err });
    }
  }
}

module.exports = new UserController();
