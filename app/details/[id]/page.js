import RecipeDetails from "@/components/details/RecipeDetails";
import RecipeSteps from "@/components/details/RecipeSteps";
import { getRecipeById } from "@/dbQueries/queries";

export default async function DetailsPage({ params: { id } }) {
    const getRecipe = await getRecipeById(id);
    return (
        <>
            <RecipeDetails recipe={getRecipe} />
            <RecipeSteps recipeSteps={getRecipe.steps} />
        </>
    );
}
