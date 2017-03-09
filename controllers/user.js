function showRoute(req, res) {
  res.render('users/show');
}

function newImageRoute(req, res) {
  res.render('users/newImage');
}

function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;


  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/user'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}

function deleteImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;


  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/user'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}



module.exports = {

  show: showRoute,
  newImage: newImageRoute,
  createImage: createImageRoute,
  deleteImage: deleteImageRoute

};
