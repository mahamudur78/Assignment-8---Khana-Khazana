"use server";
import { redirect } from "next/navigation";

const {
    getAllRecipe,
    createUser,
    fundUserByCredentials,
    updatefavourite,
} = require("@/dbQueries/queries");

async function getCategoryList() {
    const allRecipe = await getAllRecipe();
    const categoryList = [
        ...new Set(allRecipe.map((recipe) => recipe.category)),
    ];

    return categoryList;
}

async function registerUser(userData) {
    const user = Object.fromEntries(userData);
    const created = await createUser(user);
    console.log("sdfsd", user, created);
    redirect("/login");
}

async function performLogin(formData) {
    try {
        const credential = {};
        credential.email = formData.get("email");
        credential.password = formData.get("password");
        const found = await fundUserByCredentials(credential);
        return JSON.parse(JSON.stringify(found));
    } catch (error) {
        throw error;
    }
}

async function addFavouriteRecipe(recipeId, authId, currentPath) {
    try {
        await updatefavourite(recipeId, authId);
    } catch (error) {
        throw error;
    }

    // revalidatePath(currentPath);
}

export { addFavouriteRecipe, getCategoryList, performLogin, registerUser };
