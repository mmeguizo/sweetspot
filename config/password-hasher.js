let bcrypt = require("bcryptjs");

module.exports.encryptPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        else {
          resolve(hash);
        }
      });
    });
  });
};

module.exports.comparePassword = function (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });
};
