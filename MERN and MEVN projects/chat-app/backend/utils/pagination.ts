const getPagination = (page: number, itemsPerPage: number) => {
    return { skip: (page - 1) * itemsPerPage, limit: itemsPerPage }
}

export default getPagination;