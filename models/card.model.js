const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  position: Number,
  description: String,
  imageUrl: String,
  label: String,
  title: String,
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }

  }
});



const Card = mongoose.model('Card', cardSchema);
module.exports = Card;