const router = module.exports = require('express').Router();

const authorize = require('@middlewares/authorize');
const checkToken = require('@middlewares/authenticate');
const eventController = require('@controllers/event');

router.get('/:slug', 
  [checkToken, authorize(cap['fetch_event'])],
  eventController.getBySlug
);
router.get('/', 
  [checkToken, authorize(cap['fetch_event'])],
  eventController.get
);

router.post('/',
  [checkToken, authorize(cap['add_event'])],
  eventController.create
);

router.put(
  '/:_id',
  [checkToken, authorize(cap['edit_event'])],
  eventController.update
);

router.delete(
  '/:_id',
  [checkToken, authorize(cap['remove_event'])],
  eventController.remove
);