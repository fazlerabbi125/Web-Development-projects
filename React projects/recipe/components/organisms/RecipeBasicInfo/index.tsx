import React from "react";
import { Ubuntu } from "@next/font/google";
import {
  Text,
  List,
  Image as MImage,
} from "@mantine/core";
import Image from "next/image";
import { RecipeDetailsType } from "../../../pages/api/recipes/[recipeSlug]";
import styles from "./RecipeBasicInfo.module.scss";

const ubuntu = Ubuntu({ weight: "500", subsets: ["latin"] });

export interface RecipeInfoSectionProps {
  recipe: RecipeDetailsType;
}

const RecipeBasicInfo = ({ recipe }: RecipeInfoSectionProps) => {
  const ingredients = recipe.sections.flatMap((section) => {
    return section.components.map((component: any) => ({
      name: component.raw_text,
      id: component.id,
    }));
  });
  return (
    <React.Fragment>
      <div className="mb-6">
        {/* <div className="mx-auto mb-4 w-[80%] relative">
          <Image
            src={recipe.thumbnail_url}
            alt={recipe.thumbnail_alt_text}
            fill
            className={styles["recipe_basic-info__photo"]}
          />
        </div> */}
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
      <div className={styles["recipe_basic-info__ingredients"]}>
        <Text className={styles["recipe_basic-info__ingredients__heading"]}>
          Ingredients
        </Text>
        <List className={styles["recipe_basic-info__ingredients__list"]}>
          {ingredients.map((elem) => (
            <List.Item key={elem.id}>{elem.name}</List.Item>
          ))}
        </List>
      </div>
    </React.Fragment>
  );
};

export default RecipeBasicInfo;
