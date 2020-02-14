module.exports = {
  secretKey: process.env.SECRET_KEY,
  jwtExpiration: Math.floor(Date.now() / 1000) + +process.env.JWT_EXPIRATION * 60,
  forgotPasswordExpiration: Date.now() + +process.env.FORGOT_PASSWORD_EXPIRATION * 60 * 1000,
  forgotPasswordSize: +process.env.FORGOT_PASSWORD_SIZE,
  socialLogin: ["google", "local"],
  roles: ["admin", "customer"],
  uploadPath: `${__dirname}/../uploads/`,
  orderStatus: {
    pending: -1,
    cancelled: 0,
    confirmed: 1,
    delivered: 2,
  },
};
