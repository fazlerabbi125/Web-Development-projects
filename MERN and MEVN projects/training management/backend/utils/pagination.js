const getPagination = (page, itemsPerPage) => {
    return { skip: (page - 1) * itemsPerPage, limit: itemsPerPage }
}

module.exports = getPagination;