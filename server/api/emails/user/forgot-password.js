const mail = require('@emails/mail');

/**
 * @param {Object} data - user document 
 * @param {String} data.email - Receipent Email
 * @param {String} data.token - Reset Token
 */
function sendToken(data) {
   const args = {
      emailData: {
         to: data.email,
         subject: 'Reset Password',
         heading: 'Reset Password',
         bodyData: `
         <p> Please use the following token to reset the password: </p> 
         <p>
            <b>Reset Token:</b> ${data.token}
         </p>
         `,
      }
   }

   return mail.send(args);
}

module.exports = sendToken;