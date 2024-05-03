"use server";
// import { revalidatePath } from 'next/cache'
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

async function performLogin(fromData) {
    try {
        const credential = {};
        credential.email = fromData.get("email");
        credential.password = fromData.get("password");
        const found = await fundUserByCredentials(credential);
        return found;
    } catch (error) {
        throw error;
    }
}

async function addInterestedRecipe(recipeId, authId) {
    try {
        await updatefavourite(recipeId, authId);
    } catch (error) {
        throw error;
    }
    // revalidatePath("/");
}

export { addInterestedRecipe, getCategoryList, performLogin, registerUser };
