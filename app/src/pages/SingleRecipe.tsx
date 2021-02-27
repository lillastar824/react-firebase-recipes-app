import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RECIPE_COLLECTION, Recipe } from "@jurijtokarski/reabase-recipes-shared/database/recipe";

import { RouteKey } from "../configs/routes";
import { Layout } from "../components/Layout";
import { Divider } from "antd";

type RecipeOrNull = Partial<Recipe> | null;

const getRecipeById = (id: string): Promise<Recipe> => window.firebase.firestore()
  .collection(RECIPE_COLLECTION)
  .doc(id)
  .get()
  .then(result => result.data() as Recipe);

export const SingleRecipe: FC = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<RecipeOrNull>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (recipeData) {
      return;
    }

    getRecipeById(id)
      .then(recipe => setRecipeData(recipe))
      .then(() => setIsLoading(false));
  }, [id, recipeData]);

  const content = recipeData ? (
    <>
      <h1>{recipeData.title}</h1>
      <Divider />
      {recipeData.content?.split("\n").map(line => <p>{line}</p>)}
      <Divider />
      <small><em>Created at {new Date(recipeData.created_at || 0).toLocaleString()}</em></small>
    </>
  ) : null;

  return (
    <Layout
      active={RouteKey.RECIPE}
      isLoading={isLoading}
    >
      {content}
    </Layout>
  )
}