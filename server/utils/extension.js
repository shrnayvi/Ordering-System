/**
 * Get the extension of the attachment from the mimetype 
 * @param {string} mimetype
 */
function getExtension(mimetype) {
   switch(mimetype) {
      case 'application/pdf':
         return 'pdf';
      case 'image/jpeg':
         return 'jpeg';
      case 'image/png':
         return 'png';
      case 'image/gif':
         return 'gif';
      default:
         return '';
   }
}

module.exports = getExtension;