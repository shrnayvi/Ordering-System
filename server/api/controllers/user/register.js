const User = require('@models/user');
const pwd = require('@utils/password');
const sendVerificationEmail = require('@emails/user/email-verification');
const validateRegisterInput = require('@validations/user/register');

module.exports = async (req, res, next) => {
  const { error } = validateRegisterInput(req.body);
  try {

    if (error) {
      apiResponse.badRequest({ message: error.name, data: error.details });
    } 

    let data = { ...req.body, method: 'local' };
    const foundUser = await User.countDocuments({ email: data.email });
    if(foundUser) {
      apiResponse.conflict({ message: 'user_exists' });
    }

    if (!data.username) {
      data.username = data.email.split('@')[0];
    }

    data.password = await pwd.generateHash(data.password);

    let userDoc = new User(data),
      newUser = await userDoc.save();


    /* Send verification email */
    const { _id, email, method, role } = newUser;
    if (method === 'local' && role !== 'admin') {
      let emailData = { _id, email, role };
      sendVerificationEmail(emailData)
        .then(_ => {
          console.log('verification email sent');
        })
        .catch(e => {
          console.log(e.message, 'Error sending verification email');
        });
    }

    return apiResponse.success(res, { message: 'registration_successful', data: { _id, role } });
  } catch (e) {
    return next(e);;
  }
}