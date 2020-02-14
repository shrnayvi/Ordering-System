const mail = require('@emails/mail');
const { generateToken }= require('@utils/JWT');
const { clientUrl } = require('@config/constants');

/**
 * @param {Object} data - user document 
 * @param {String} data.email - Receipent Email
 * @param {String} data.role - Receipent Role
 */
module.exports = async ({ _id, email, role }) => {
   const token = generateToken({ _id, role });
   const args = {
      emailData: {
         to: email,
         subject: 'Email Verification',
         heading: 'Thank you for registering on our site.',
         bodyData: `
         <p>Please click on the following link to verify your email: </p> 
         <a href="${clientUrl}?verify=${token}">Verify Email</a>
         `,
      }
   }
   try{
      return await mail.send(args);
   } catch(e) {
      return (e.message);
   }
}