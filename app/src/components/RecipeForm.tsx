import React, { FC } from "react";
import { Button, Form, Input } from "antd";

import { Recipe } from "@jurijtokarski/reabase-recipes-shared/database/recipe";

export interface RecipeFormProps {
  recipe: Partial<Recipe> | null;
  onSubmit: (data: Partial<Recipe>) => void;
}

export const RecipeForm: FC<RecipeFormProps> = props => (
  <>
    <Form
      name="recipe"
      layout="vertical"
      initialValues={props.recipe || {}}
      onFinish={props.onSubmit}
      size="large"
    >
      <Form.Item
        label="Title"
        required={true}
        name="title"
        rules={[
          {
            required: true,
            message: "Please provide a recipe title",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        required={true}
        rules={[
          {
            required: true,
            message: "Please provide a recipe content",
          },
        ]}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
        >
          Save recipe
        </Button>
      </Form.Item>
    </Form>
  </>
)