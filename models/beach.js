const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const beachesSchema = new mongoose.Schema({
  name: { type: String },
  country: { type: String },
  seabed: { type: String },
  waves: { type: String },
  description: { type: String },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

beachesSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

beachesSchema.virtual('src')
  .get(function getImageSRC(){
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `/uploads/${this.image}`;
  });



module.exports = mongoose.model('Beach', beachesSchema);
