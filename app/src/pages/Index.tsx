import React, { FC, useState, useEffect } from "react";

import { Recipe, RECIPE_COLLECTION, RecipeStatus } from "@jurijtokarski/reabase-recipes-shared/database/recipe";

import { RouteKey, RoutePath } from "../configs/routes";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { Divider } from "antd";

type ReciptWithId = Recipe & { id: string };

const getRecipes = (): Promise<ReciptWithId[]> => window.firebase.firestore()
  .collection(RECIPE_COLLECTION)
  .where("status", "==", RecipeStatus.ACTIVE)
  .orderBy("created_at", "desc")
  .get()
  .then(result => result.docs.map(item => ({
    ...item.data() as Recipe,
    id: item.id
  })));

export const Index: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<ReciptWithId[]>([]);

  useEffect(() => {
    if (recipes.length || !isLoading) {
      return;
    }

    getRecipes()
      .then(items => setRecipes(items))
      .then(() => setIsLoading(false));
  }, [isLoading, recipes]);

  return (
    <Layout active={RouteKey.INDEX} isLoading={isLoading}>
      {recipes.map(recipe => (
        <>
          <h2>
            <small className="index-item-date">{new Date(recipe.created_at || 0).toLocaleString()}</small><br />
            <Link to={RoutePath[RouteKey.RECIPE].replace(":id", recipe.id)}>
              {recipe.title}
            </Link>
          </h2>
          <Divider />
        </>
      ))}
    </Layout>
  )
}