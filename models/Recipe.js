const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
      }
    }
  ],
  desc: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  labels: {
    type: [String]
  },
  calories: {
    type: Number
  }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
