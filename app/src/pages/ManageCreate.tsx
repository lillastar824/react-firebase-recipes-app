import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Recipe, RECIPE_COLLECTION, RecipeStatus } from "@jurijtokarski/reabase-recipes-shared/database/recipe";

import { RouteKey, RoutePath } from "../configs/routes";
import { Layout } from "../components/Layout";
import { RecipeForm } from "../components/RecipeForm";

type RecipeOrNull = Partial<Recipe> | null;

const createNewRecipe = (newRecipeData: Partial<Recipe>) => {
  const document: Partial<Recipe> = {
    ...newRecipeData,
    status: RecipeStatus.ACTIVE,
    created_at: Date.now(),
    updated_at: Date.now()
  }

  return window.firebase.firestore()
    .collection(RECIPE_COLLECTION)
    .doc()
    .set(document);
}

export const ManageCreate: FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newRecipeData, setNewRecipeData] = useState<RecipeOrNull>(null);

  useEffect(() => {
    if (!newRecipeData) {
      return;
    }

    setIsLoading(true);
    createNewRecipe(newRecipeData)
      .then(() => history.push(RoutePath[RouteKey.MANAGE_LIST]));
  }, [isLoading, newRecipeData, history]);

  return (
    <Layout
      active={RouteKey.MANAGE_CREATE}
      isLoading={isLoading}
    >
      <RecipeForm
        recipe={null}
        onSubmit={setNewRecipeData}
      />
    </Layout>
  )
}