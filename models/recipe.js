const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  label: {type: String, required: true},
  uri: String,
  image: String,
  source: String,
  url: String,
  healthLabels: String,
  ingredientLines: Array,
  instructions: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

//adds 'createdAt' and 'updatedAt' fields
recipeSchema.set('timestamps', true);

recipeSchema.set('toObject', {
  virtuals: true, //includes built in virtual 'id'
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});
