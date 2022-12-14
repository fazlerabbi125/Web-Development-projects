import React from 'react'
import { useAxios } from "../hooks/useAxios";
import { usePagination } from '@mantine/hooks';

interface RecipeListProps {
    tags?: string;
}

const RecipeList = (props: RecipeListProps) => {
    const itemsPerPage = 20;
    const [page, setPage] = React.useState<number>(1);
    const { data, error, isLoading } = useAxios("/recipes/list", {
        from: page - 1,
        size: itemsPerPage,
        tags: props.tags || "",
    });
    const total = React.useMemo(() => data?.count || 0, [data?.count]);
    const pagination = usePagination({ total, initialPage: 1 });
    console.log(data, total)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) return <div>{error.message}</div>

    return (
        <React.Fragment>
            <div>RecipeList</div>
        </React.Fragment>
    )
}

export default RecipeList