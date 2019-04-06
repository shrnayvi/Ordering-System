class Mail {
   constructor() {
      let { google } = require('googleapis');
      this.google = google;
      this.ejs = require('ejs');
      this.keys = require('@config/keys');
      this.config = require('@config/config');
      this.nodemailer = require('nodemailer');
      this.redirectURL = 'https://developers.google.com/oauthplayground';
      this.refreshToken = '1/hEeiFHeldbNgXqy12LEX7GHbtbOg_WgpeDwPMMv4sdo';
   }

   /**
    * Transporter object for sending emails
    */
   async transporter() {
      const {
         googleClientID: id, 
         googleClientSecret: secret
      } = this.keys;

      const accessToken = await this.getAccessToken(id, secret, this.redirectURL);
      const transporter = this.nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
            type: 'OAuth2',
            user: this.config.email.user,
            clientId: id,
            clientSecret: secret,
            refreshToken: this.refreshToken,
            accessToken,
         },
      });

      return transporter;
   }

   /**
    * @param {String} id - google Client ID
    * @param {String} secret - google Client Secret
    * @param {String} redirectURL - Redirect URL for google
    */
   async getAccessToken(id, secret, redirectURL) {
      const google2Client = new this.google.auth.OAuth2(
         id,
         secret,
         redirectURL,
      );

      google2Client.setCredentials({
         refresh_token: this.refreshToken,
      });

      const authorizationHeader = await google2Client.getRequestHeaders()
      if(authorizationHeader) {
         return authorizationHeader.Authorization.split(' ')[1];
      }
      return '';
   }

   /**
    * Get the template for the email 
    * @param {Object} emailData - Contains the content of email
    * @param {String} emailData.heading- Email Heading
    * @param {String} emailData.bodyData - Body of email
    */
   template(emailData) {
      const { bodyData, heading } = emailData;
      return new Promise((resolve, reject) => {
         this.ejs.renderFile(`${__dirname}/template.ejs`, { 
            bodyData, heading
         }, (err, file) => {
            if(err) {
               return reject(err);
            } 
            return resolve(file);
         })

      })

   }

   /**
    * Send the email using transporter object
    * @param {Object} args - Mail data
    * @param {Object} emailData - Contains the content required for email
    * @param {String} emailData.to - Receiver email
    * @param {String} emailData.subject - Subject of email
    */
   async send(args) {
      try {
         const { emailData } = args,
            file = await this.template(emailData),
            transporter = await this.transporter();

         const mailOptions = {
            from: this.config.from, 
            to: emailData.to,
            subject: emailData.subject, 
            html: file,
         };


         //send mail and return the response
         return await transporter.sendMail(mailOptions);

      } catch(e) {
         return { error: e.message };
      }
   }

}

module.exports = new Mail();