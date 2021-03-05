const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = `mongodb://heavenSender:5625920@cluster0-shard-00-00.ufhhg.mongodb.net:27017,cluster0-shard-00-01.ufhhg.mongodb.net:27017,cluster0-shard-00-02.ufhhg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ak8l78-shard-0&authSource=admin&retryWrites=true&w=majority`;
//const url = `mongodb://localhost:27017/`;
const dbName = 'user';

function getDbo() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        reject(err);
        return;
      }
      const dbo = db.db(dbName);
      resolve(dbo);
    });
  });
}

function getRealId(id) {
  return ObjectID(id);
}

module.exports = {
  getDbo,
  getRealId
}