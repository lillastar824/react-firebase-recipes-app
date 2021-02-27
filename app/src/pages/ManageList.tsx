import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import { Recipe, RECIPE_COLLECTION, RecipeStatus } from "@jurijtokarski/reabase-recipes-shared/database/recipe";

import { RouteKey, RoutePath } from "../configs/routes";
import { Layout } from "../components/Layout";

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

export const ManageList: FC = () => {
  const history = useHistory();
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
    <Layout
      active={RouteKey.MANAGE_LIST}
      isLoading={isLoading}
    >
      <Table
        bordered={true}
        dataSource={recipes}
        rowKey="id"
        loading={isLoading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            key: "title"
          },
          {
            dataIndex: "id",
            key: "actions",
            width: 100,
            render: (id: string) => (
              <div style={{ textAlign: "center" }}>
                <Button
                  type="dashed"
                  block={true}
                  onClick={() => history.push(RoutePath[RouteKey.MANAGE_EDIT].replace(":id", id))}
                >
                  Edit recipe
                </Button>
              </div>
            )
          },
        ]}
      />
    </Layout>
  )
}