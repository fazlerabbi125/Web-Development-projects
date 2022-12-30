import React from "react";
import { RecipeDetailsType } from "../../pages/api/recipes/[recipeSlug]";
import {
  Text,
  Image as MImage,
  List,
} from "@mantine/core";
import { Ubuntu } from "@next/font/google";

const ubuntu = Ubuntu({ weight: "500", subsets: ["latin", "greek"] });

export interface RecipeInfoSectionProps {
  styles: {
    readonly [key: string]: string;
  };
  recipe: RecipeDetailsType;
}

const RecipeBasicInfo = ({ styles, recipe }: RecipeInfoSectionProps) => {
  const ingredients = recipe.sections.flatMap((section) => {
    return section.components.map((component: any) => ({
      name: component.raw_text,
      id: component.id,
    }));
  });
  return (
    <React.Fragment>
      <div className="mb-6">
        <MImage
          src={recipe.thumbnail_url}
          alt={recipe.thumbnail_alt_text}
          width={"80%"}
          className="mx-auto mb-4"
          classNames={{
            image: "mx-auto",
          }}
        />
        <Text className={ubuntu.className}>
          <strong>Description:</strong> {recipe.description || "N/A"}
        </Text>
      </div>
      <Text className={styles.recipe_details__card__ingredients__heading}>
        Ingredients
      </Text>
      <List className={styles.recipe_details__card__ingredients__list}>
        {ingredients.map((elem) => (
          <List.Item key={elem.id}>{elem.name}</List.Item>
        ))}
      </List>
    </React.Fragment>
  );
};

export default RecipeBasicInfo;
