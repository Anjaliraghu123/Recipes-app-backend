const Recipe = require("../models/Recipe");

// CREATE
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    const recipe = new Recipe({
      title,
      ingredients,
      instructions
    });

    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateRecipe = async (req, res) => {
  try {
   const updatedRecipe = await Recipe.findByIdAndUpdate(
  req.params.id,
  req.body,
  { returnDocument: 'after' } 
);

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};