import React from "react";
import { Autocomplete, AutocompleteItem } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { fetchData } from "../../hooks/useAxios";
import { withRouter, NextRouter } from "next/router";
import { AxiosError } from "axios";
import { RecipeAutoCompleteType } from "../../pages/api/recipes/autocomplete";

interface SearchResult extends AutocompleteItem {
    slug: string;
}

const RecipeAutoComplete: React.FC<{ router: NextRouter }> = ({ router }) => {
    const [search, setSearch] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

    const [debouncedSearch] = useDebouncedValue(search, 1000);

    const redirectToRecipe = (item: SearchResult) => {
        router.push(`/recipes/${item.slug}`);
        setSearch("");
    };

    React.useEffect(() => {
        let isApiSubscribed = true;
        if (debouncedSearch.length > 0) {
            fetchData("/recipes/autocomplete", {
                search: debouncedSearch,
            })
                .then((data: RecipeAutoCompleteType) => {
                    if (isApiSubscribed) {
                        const results = data.map((elem) => ({
                            slug: elem.slug,
                            value: elem.name,
                        }));
                        setSearchResults(results);
                        console.log(results, searchResults);
                    }
                })
                .catch((err: AxiosError) => {
                    console.log(err.message);
                    setSearchResults([]);
                });
        } else {
            setSearchResults([]);
        }

        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [debouncedSearch]);

    console.log(searchResults);

    return (
        <Autocomplete
            placeholder="Search recipes by name or ingredients"
            radius="xs"
            data={searchResults}
            nothingFound={debouncedSearch ? "No recipes found" : ""}
            value={search}
            limit={searchResults.length}
            onChange={setSearch}
            onItemSubmit={redirectToRecipe}
            className="sm:mr-2 min-w-[17rem]"
            classNames={{
                dropdown: "max-h-60 overflow-y-auto",
            }}
        />
    );
};

export default withRouter(RecipeAutoComplete);
