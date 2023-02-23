import React from "react";
import { Pagination } from "@mantine/core";

interface ListPaginationProps {
    page: number;
    onPageChange: React.Dispatch<React.SetStateAction<number>> | (() => void);
    totalPages: number;
    className?: string;
    itemClassName?: string;
}

const ListPagination: React.FC<ListPaginationProps> = (props) => {
    return (
        <Pagination
            page={props.page}
            onChange={props.onPageChange}
            total={props.totalPages}
            className={props.className}
            position="center"
            withEdges
            classNames={{
                item: props.itemClassName,
            }}
        />
    );
};

export default ListPagination;
