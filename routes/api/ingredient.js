const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Recipe = require('../../models/Recipe');
const Ingredient = require('../../models/Ingredient');

// @route   GET api/ingredient
// @desc    Get all ingredients (optional query strings to filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // set default if no query strings
    const { ingredient = '', category = '' } = req.query;
    const ingredients = await Ingredient.find({
      name: { $regex: ingredient.trim(), $options: 'i' },
      category: { $regex: category.trim(), $options: 'i' },
    });
    return res.json(ingredients);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/ingredient/:ingredient_id
// @desc    Get ingredient by id
// @access  Public
router.get('/:ingredient_id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.ingredient_id);
    if (!ingredient)
      return res.status(400).json({ msg: 'Ingredient not found' });
    res.json(ingredient);
  } catch (err) {
    console.error(err);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Ingredient not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/ingredient
// @desc    Create a new ingredient
// @access  Public
router.post(
  '/',
  [[check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category } = req.body;

    // Build ingredient object
    const ingredientFields = {
      name,
      category: Array.isArray(category)
        ? category
        : category.split(',').map(label => label.trim()),
    };
    // console.log(ingredientFields);
    try {
      // Create
      ingredient = new Ingredient(ingredientFields);
      await ingredient.save();
      return res.json(ingredient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api//:ingredient_id
// @desc    Update a ingredient by id
// @access  Public
router.put(
  '/:ingredient_id',
  [[check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category } = req.body;

    // Build ingredient object
    const ingredientFields = {
      name,
      category: Array.isArray(category)
        ? category
        : category.split(',').map(label => ' ' + label.trim()),
    };
    try {
      let ingredient = await Ingredient.findById(req.params.ingredient_id);
      if (!ingredient)
        return res.status(400).json({ msg: 'Ingredient not found' });
      // Update
      ingredient = await Ingredient.findOneAndUpdate(
        { _id: req.params.ingredient_id },
        { $set: ingredientFields },
        { new: true }
      );
      return res.json(ingredient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/ingredient/:ingredient_id
// @desc    Delete ingredient by id
// @access  Private
router.delete('/:ingredient_id', async (req, res) => {
  try {
    // Find if ingredient is in an existing recipe
    let recipe = await Recipe.find({
      ingredients: {
        $elemMatch: {
          ingredient: req.params.ingredient_id,
        },
      },
    });

    if (recipe.length) {
      return res
        .status(400)
        .json({ msg: 'Ingredient is in an existing recipe' });
    }
    await Ingredient.findOneAndRemove({ _id: req.params.ingredient_id });
    res.json({ msg: 'Ingredient deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
