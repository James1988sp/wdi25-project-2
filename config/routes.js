const router = require('express').Router();
const sessionsController = require('../controllers/sessions');
const beachesController = require('../controllers/beaches');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/user');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/beaches')
 .get(beachesController.index)
 .post(secureRoute, upload.single('image'), beachesController.create);

router.route('/beaches/new')
 .get(secureRoute, beachesController.new);

router.route('/beaches/:id')
 .get(beachesController.show)
 .put(secureRoute, beachesController.update)
 .delete(secureRoute, beachesController.delete);

router.route('/beaches/:id/edit')
 .get(secureRoute, beachesController.edit);

router.route('/beaches/:id/comments')
 .post(secureRoute, beachesController.createComment);

router.route('/beaches/:id/comments/:commentId')
 .delete(secureRoute, beachesController.deleteComment);

router.route('/user')
  .get(secureRoute, users.show);

router.route('/user/images/new')
  .get(secureRoute, users.newImage);

router.route('/user/images')
  .post(secureRoute, upload.single('filename'), users.createImage);



router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessionsController.new)
.post(sessions.create);

router.route('/logout')
 .get(sessionsController.delete);

router.route('/oauth/github')
 .get(oauth.github);


router.all('*', (req, res) => res.notFound());

module.exports = router;
