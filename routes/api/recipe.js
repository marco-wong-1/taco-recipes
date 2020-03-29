const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const Recipe = require('../../models/Recipe');
const Ingredient = require('../../models/Ingredient');

// @route   GET api/recipe
// @desc    Get all recipes (optional query strings to filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // if there is a search string
    if (req.query.ingredient || req.query.category) {
      const { ingredient = '', category = '' } = req.query;
      const filteredIngredients = await Ingredient.find({
        name: { $regex: ingredient.trim(), $options: 'i' },
        category: { $regex: category.trim(), $options: 'i' }
      }).select('_id');
      const ingredientsId = filteredIngredients.map(ing => {
        return ing._id;
      });
      const recipes = await Recipe.find({
        'ingredients.ingredient': {
          $in: ingredientsId
        }
      }).populate('ingredients.ingredient');
      return res.json(recipes);
    }
    // no query strings, get all
    const recipes = await Recipe.find().populate('ingredients.ingredient');
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/recipe/:recipe_id
// @desc    Get recipe by recipe ID
// @access  Public
router.get('/:recipe_id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipe_id).populate(
      'ingredients.ingredient'
    );
    if (!recipe) return res.status(400).json({ msg: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/recipe
// @desc    Create a new recipe
// @access  Public
router.post(
  '/',
  [
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('desc', 'Description is required')
        .not()
        .isEmpty(),
      check('calories', 'Calories is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, ingredients, image, desc, labels, calories } = req.body;

    // Build recipe object
    const recipeFields = {
      name,
      ingredients,
      image,
      desc,
      labels: Array.isArray(labels)
        ? labels
        : labels.split(',').map(label => ' ' + label.trim()),
      calories
    };
    try {
      // Create
      recipe = new Recipe(recipeFields);
      await recipe.save();
      return res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/recipe/:recipe_id
// @desc    Update a recipe by id
// @access  Public
router.put(
  '/:recipe_id',
  [
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('desc', 'Description is required')
        .not()
        .isEmpty(),
      check('calories', 'Calories is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, ingredients, image, desc, labels, calories } = req.body;

    // Build recipe object
    const recipeFields = {
      name,
      ingredients,
      image,
      desc,
      labels: Array.isArray(labels)
        ? labels
        : labels.split(',').map(label => label.trim()),
      calories
    };
    try {
      let recipe = await Recipe.findById(req.params.recipe_id);
      if (!recipe) return res.status(400).json({ msg: 'Recipe not found' });
      // Update
      recipe = await Recipe.findOneAndUpdate(
        { _id: req.params.recipe_id },
        { $set: recipeFields },
        { new: true }
      );
      return res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/recipe/:recipe_id
// @desc    Delete recipe by id
// @access  Private
router.delete('/:recipe_id', async (req, res) => {
  try {
    await Recipe.findOneAndRemove({ _id: req.params.recipe_id });
    res.json({ msg: 'Recipe deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
