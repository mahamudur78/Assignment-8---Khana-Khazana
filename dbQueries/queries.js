import { recipesModel } from "@/models/recipes-model";
import { userModel } from "@/models/user-model";
import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

async function getAllRecipe() {
    const allRecipe = await recipesModel.find().lean();
    return replaceMongoIdInArray(allRecipe);
}

async function getRecipeById(recipeId) {
    const recipe = await recipesModel.findById(recipeId).lean();
    return replaceMongoIdInObject(recipe);
}

async function getRecipeByCategory(categoryName) {
    const recipe = await recipesModel.find({ category: categoryName }).lean();
    return replaceMongoIdInArray(recipe);
}

async function createUser(user) {
    return await userModel.create(user);
}

async function fundUserByCredentials(credentials) {
    const user = await userModel.findOne(credentials).lean();

    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

async function updatefavourite(recipeId, authId) {
    const user = await userModel.findById(authId);

    if (user) {
        const foundRecipe = user.favourites.find(
            (id) => id.toString() === recipeId
        );

        if (foundRecipe) {
            user.favourites.pull(new mongoose.Types.ObjectId(recipeId));
        } else {
            user.favourites.push(new mongoose.Types.ObjectId(recipeId));
        }
        await user.save();
    }
}

export {
    createUser,
    fundUserByCredentials,
    getAllRecipe,
    getRecipeByCategory,
    getRecipeById,
    updatefavourite,
};