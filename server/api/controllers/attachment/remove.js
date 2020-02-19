const fs = require('fs');
const Attachment = require('@models/attachment');

module.exports = async (req, res, next) => {
	try {
		let attachment = await Attachment.findOneAndRemove({ _id: req.params._id });
		if (!attachment) {
			apiResponse.notFound({});
		}
		apiResponse.success(res, { message: 'deleted_attachment', data: attachment });

		/** Remove the file if exists */
		const {
			uploadPath: dest
		} = require('@config/constants');
		fs.unlink(`${dest}${attachment.filename}`, (err) => {
			if (err) {
				log('Error removing attachment', err.message);
			}
		});

	} catch (e) {
		return next(e);;
	}
}