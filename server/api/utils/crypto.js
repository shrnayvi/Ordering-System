const crypto = require('crypto');

module.exports = {
  createRandomBytes: size => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(size, (err ,  buf) => {
        if(err) {
          reject(err);
        } else {
          resolve(buf.toString('hex'));
        }
      })
    });
  },

}