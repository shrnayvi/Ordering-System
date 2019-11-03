const User = require('@models/user');
const sendVerificationEmail = require('@emails/user/email-verification');
const validateRegisterInput = require('@validations/user/register');

module.exports = async (req, res) => {
  const { error } = validateRegisterInput(req.body);
  if (error) {
    res.send({ status: 400, message: error.name, error: error.details });
  } else {
    try {
      let data = { ...req.body, method: 'local' },
        userDoc = new User(data),
        newUser = await userDoc.save();


      /* Send verification email */
      const { _id, email, method, role } = newUser;
      if (method === 'local' && role !== 'admin' && data.status !== 1) {
        let emailData = { _id, email, role };
        sendVerificationEmail(emailData)
          .then(response => {
            console.log('verification email sent');
          })
          .catch(e => {
            console.log(e);
            console.log(e.message, 'Error sending verification email');
          });
      }

      return apiResponse.success(res, { message: 'registration_successful', data: newUser });
    } catch (e) {
      if ('exists' in e && e.exists) {
        return apiResponse.badRequest(res, { message: e.message, data: e.message });
      }
      return apiResponse.serverError(res, { data: e.message });
    }
  }
}