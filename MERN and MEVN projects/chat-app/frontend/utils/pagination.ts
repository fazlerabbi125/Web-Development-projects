import { usePagination } from '@mantine/hooks';

export default function getPaginationBtns(totalPages: number) {
    const pagination = usePagination({ total: totalPages, initialPage: 1 });

}