import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Recipe, RECIPE_COLLECTION } from "@jurijtokarski/reabase-recipes-shared/database/recipe";

import { RouteKey, RoutePath } from "../configs/routes";
import { Layout } from "../components/Layout";
import { RecipeForm } from "../components/RecipeForm";

type RecipeOrNull = Partial<Recipe> | null;

const getRecipeById = (id: string): Promise<Recipe> => window.firebase.firestore()
  .collection(RECIPE_COLLECTION)
  .doc(id)
  .get()
  .then(result => result.data() as Recipe);

const updateRecipe = (id: string, updateRecipeData: Partial<Recipe>) => {
  const document: Partial<Recipe> = {
    ...updateRecipeData,
    updated_at: Date.now()
  }

  return window.firebase.firestore()
    .collection(RECIPE_COLLECTION)
    .doc(id)
    .set(document, { merge: true });
}

export const ManageEdit: FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const [recipeData, setRecipeData] = useState<RecipeOrNull>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (recipeData) {
      return;
    }

    getRecipeById(id)
      .then(recipe => setRecipeData(recipe))
      .then(() => setIsLoading(false));
  }, [isLoading, recipeData, id]);

  useEffect(() => {
    if (!recipeData || !shouldSubmit) {
      return;
    }

    setIsLoading(true);
    updateRecipe(id, recipeData)
      .then(() => history.push(RoutePath[RouteKey.MANAGE_LIST]));
  }, [shouldSubmit, recipeData, id, history]);

  const handleFormSubmit = (values: Partial<Recipe>) => {
    setRecipeData(values);
    setShouldSubmit(true);
  }

  return (
    <Layout
      active={RouteKey.MANAGE_EDIT}
      isLoading={isLoading}
    >
      <RecipeForm
        recipe={recipeData}
        onSubmit={handleFormSubmit}
      />
    </Layout>
  )
}