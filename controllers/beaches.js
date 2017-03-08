const Beach = require('../models/beach');

function indexRoute(req, res, next) {
  Beach
    .find()
    .populate('createdBy')
    .exec()
    .then((beaches) => res.render('beaches/index', { beaches }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('beaches/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;
  if(req.file) req.body.image = req.file.filename;

  Beach
    .create(req.body)
    .then(() => res.redirect('/beaches'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/beaches/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Beach
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then((beach) => {
      if(!beach) return res.notFound();
      return res.render('beaches/show', { beach });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Beach
    .findById(req.params.id)
    .exec()
    .then((beach) => {
      return res.render('beaches/edit', { beach });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Beach
    .findById(req.params.id)
    .exec()
    .then((beach) => {
      if(!beach) return res.notFound();

      for(const field in req.body) {
        beach[field] = req.body[field];
      }

      return beach.save();
    })
    .then(() => res.redirect(`/beaches/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/beaches/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Beach
    .findById(req.params.id)
    .exec()
    .then((beach) => {
      if(!beach) return res.notFound();
      return beach.remove();
    })
    .then(() => res.redirect('/beaches'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Beach
    .findById(req.params.id)
    .exec()
    .then((beach) => {
      if(!beach) return res.notFound();

      beach.comments.push(req.body); // create an embedded record
      return beach.save();
    })
    .then((beach) => res.redirect(`/beaches/${beach.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Beach
    .findById(req.params.id)
    .exec()
    .then((beach) => {
      if(!beach) return res.notFound();
      // get the embedded record by its id
      const comment = beach.comments.id(req.params.commentId);
      comment.remove();

      return beach.save();
    })
    .then((beach) => res.redirect(`/beaches/${beach.id}`))
    .catch(next);
}



module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute

};
