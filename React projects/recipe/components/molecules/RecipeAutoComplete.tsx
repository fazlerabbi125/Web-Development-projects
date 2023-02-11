import React from "react";
import { Autocomplete, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { fetchData } from "../../hooks/useAxios";
import { withRouter, NextRouter } from "next/router";
import { RecipeAutoCompleteTypeItem } from "../../pages/api/recipes/autocomplete";

const RecipeAutoComplete: React.FC<{ router: NextRouter }> = ({ router }) => {
    const [search, setSearch] = React.useState("");
    const [suggestions, setSuggestions] = React.useState<
        RecipeAutoCompleteTypeItem[]
    >([]);
    const [loading, setLoading] = React.useState(false);

    const [debouncedSearch] = useDebouncedValue(search, 1000);

    const redirectToRecipe = (item: RecipeAutoCompleteTypeItem) => {
        router.push(`/recipes/${item.slug}`);
        setSearch("");
    };

    React.useEffect(() => {
        // Make API call and update suggestions
        let isApiSubscribed = true;

        const fetchSuggestions = async () => {
            if (isApiSubscribed) {
                try {
                    const data = await fetchData("/recipes/autocomplete", {
                        search: debouncedSearch,
                    });
                    setLoading(false);
                    setSuggestions(data);
                } catch (err: any) {
                    console.log(err.message);
                    setLoading(false);
                    setSuggestions([]);
                }
            }
        };

        if (debouncedSearch.length > 0) {
            setLoading(true);
            fetchSuggestions();
        } else {
            setLoading(false);
            setSuggestions([]);
        }

        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [debouncedSearch]);

    console.log(suggestions);

    return (
        <Autocomplete
            placeholder="Search recipes by name or ingredients"
            radius="xs"
            data={suggestions}
            nothingFound={!loading && debouncedSearch ? "No recipes found" : ""}
            value={search}
            limit={suggestions.length}
            onChange={(value) => setSearch(value)}
            rightSection={loading ? <Loader size={16} color="gray" /> : null}
            onItemSubmit={redirectToRecipe}
            className="sm:mr-2 sm:min-w-[17rem]"
            classNames={{
                dropdown: "max-h-60 overflow-y-auto",
            }}
        />
    );
};

export default withRouter(RecipeAutoComplete);
