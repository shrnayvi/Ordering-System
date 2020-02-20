const fs = require('fs');
const Attachment = require('@models/attachment');

module.exports = async (req, res, next) => {
	try {
		let attachment = await Attachment.findOneAndRemove({ _id: req.params._id });
		if (!attachment) {
			apiResponse.notFound({});
		}

		/** Remove the file if exists */
		const {
			uploadPath: dest
		} = require('@config/constants');
		fs.unlink(`${dest}${attachment.filename}`, (err) => {
			if (err) {
				log('Error removing attachment', err.message);
			}
		});

		logger.info({ message: `Media with _id ${req.params._id} deleted` });

		return apiResponse.success(res, { message: 'deleted_attachment', data: attachment });

	} catch (e) {
		logger.error({ 
			message: 'Error removing media',
			data: e,
		});
		return next(e);;
	}
}