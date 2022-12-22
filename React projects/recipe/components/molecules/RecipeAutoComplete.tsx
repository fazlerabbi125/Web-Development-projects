import React from "react";
import { Autocomplete, AutocompleteItem } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { fetchData } from "../../hooks/useAxios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { RecipeListType } from "../../pages/api/recipes";

interface SearchResult extends AutocompleteItem {
    slug: string;
}

const RecipeAutoComplete: React.FC = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState("");
    const [debouncedSearch] = useDebouncedValue(search, 500);
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

    const redirectToRecipe = (item: SearchResult) => {
        router.push(`/recipes/${item.slug}`);
    };

    React.useEffect(() => {
        if (debouncedSearch.length > 0) {
            fetchData("/recipes", {
                tags: debouncedSearch,
            })
                .then((data: RecipeListType) => {
                    const results = data.results.map((elem) => ({
                        slug: elem.slug,
                        value: elem.name,
                    }));
                    console.log(data);
                    setSearchResults(results);
                })
                .catch((err: AxiosError) => {
                    console.log(err.message);
                    setSearchResults([]);
                });
        } else setSearchResults([]);
    }, [debouncedSearch]);

    return (
        <Autocomplete
            placeholder="Search recipes by name/tag"
            radius="xs"
            data={searchResults}
            nothingFound={debouncedSearch ? "No recipes found" : ""}
            value={search}
            onChange={setSearch}
            onItemSubmit={redirectToRecipe}
            className="sm:mr-3 min-w-[100%]"
        />
    );
};

export default RecipeAutoComplete;
