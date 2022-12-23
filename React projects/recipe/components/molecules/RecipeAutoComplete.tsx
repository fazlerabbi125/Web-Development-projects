import React from "react";
import { Autocomplete, AutocompleteItem } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { fetchData } from "../../hooks/useAxios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { RecipeAutoCompleteType } from "../../pages/api/recipes/autocomplete";

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
        setSearch("")
    };

    React.useEffect(() => {
        if (debouncedSearch.length > 0) {
            fetchData("/recipes/autocomplete", {
                search: debouncedSearch,
            })
                .then((data: RecipeAutoCompleteType) => {
                    const results = data.map((elem) => ({
                        slug: elem.slug,
                        value: elem.name,
                    }));
                    // console.log(data);
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
            placeholder="Search recipes"
            radius="xs"
            data={searchResults}
            nothingFound={debouncedSearch ? "No recipes found" : ""}
            value={search}
            limit={searchResults.length}
            onChange={setSearch}
            onItemSubmit={redirectToRecipe}
            className="sm:mr-2 min-w-[105%]"
            classNames={{
                dropdown: "max-h-60 overflow-y-auto",
            }}
        />
    );
};

export default RecipeAutoComplete;
