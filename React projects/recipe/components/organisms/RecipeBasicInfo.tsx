import React from "react";
import { RecipeDetailsType } from "../../pages/api/recipes/[recipeSlug]";
import {
  Card,
  Title,
  Text,
  Button as MButton,
  Image as MImage,
} from "@mantine/core";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export interface RecipeInfoSectionProps {
  styles: {
    readonly [key: string]: string;
  };
  recipe: RecipeDetailsType;
}

const RecipeBasicInfo = ({ styles, recipe }: RecipeInfoSectionProps) => {
  return (
    <React.Fragment>
      <Title className={styles.recipe_details__card__header}>
        {recipe.name}
      </Title>
      <Card.Section p="md" className="border border-solid border-gray-400 mb-8">
        {recipe.tags.length > 0 ? (
          <>
            <Text size={21} weight={600}>
              Tags:
            </Text>
            <div className={styles.recipe_details__card__tags}>
              {recipe.tags.map((tag) => (
                <MButton color="dark" radius="xl" key={tag.id}>
                  {tag.display_name}
                </MButton>
              ))}
            </div>
          </>
        ) : (
          <Text size={21} weight={600}>
            Tags: N/A
          </Text>
        )}
      </Card.Section>
      <div>
        <MImage
          src={recipe.thumbnail_url}
          alt={recipe.thumbnail_alt_text}
          width={"80%"}
          className="mx-auto mb-4"
          classNames={{
            image: "mx-auto",
          }}
        />
        <Text className={`${inter.className}`}>
          <span className="font-bold">Description:</span>{" "}
          {recipe.description || "N/A"}
        </Text>
      </div>
    </React.Fragment>
  );
};

export default RecipeBasicInfo;
