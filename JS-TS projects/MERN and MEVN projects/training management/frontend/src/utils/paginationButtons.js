const paginationButtons = (page, count, itemsPerPage, setPage) => {
  const handlePageClick = (page) => {
    setPage(page);
  };
  let btn = [];
  if (count > 0) {
    const totalPage = Math.ceil(count / itemsPerPage);
    if (totalPage > 1) {
      if (page > 1 && page <= totalPage) {
        btn.push(
          <li
            className="page-item"
            key={"Start"}
            onClick={() => {
              handlePageClick(1);
            }}
          >
            <span className="page-link text-secondary fw-bold" role="button">
              <i class="fa-solid fa-angles-left"></i>
            </span>
          </li>
        );
      }
      if (page - 1 > 0) {
        btn.push(
          <li
            className="page-item"
            key={"Previous"}
            onClick={() => {
              handlePageClick(page - 1);
            }}
          >
            <span className="page-link text-secondary fw-bold" role="button">
              <i class="fa-solid fa-angle-left"></i>
            </span>
          </li>
        );
      }
      for (let i = 1; i <= totalPage; i++) {
        if (i === page) {
          btn.push(
            <li className="page-item active" key={i} aria-current="page">
              <span
                className="page-link bg-dark text-light border-dark"
                role="button"
              >
                {i}
              </span>
            </li>
          );
        } else if (i >= page - 1 && i <= page + 1) {
          btn.push(
            <li
              className="page-item"
              key={i}
              onClick={() => {
                handlePageClick(i);
              }}
            >
              {" "}
              <span className="page-link text-dark" role="button">
                {i}
              </span>{" "}
            </li>
          );
        }
      }
      if (page + 1 <= totalPage) {
        btn.push(
          <li
            className="page-item"
            key={"Next"}
            onClick={() => {
              handlePageClick(page + 1);
            }}
          >
            <span className="page-link text-secondary fw-bold" role="button">
              <i class="fa-solid fa-angle-right"></i>
            </span>
          </li>
        );
      }
      if (page >= 1 && page < totalPage) {
        btn.push(
          <li
            className="page-item"
            key={"Start"}
            onClick={() => {
              handlePageClick(totalPage);
            }}
          >
            <span className="page-link text-secondary fw-bold" role="button">
              <i class="fa-solid fa-angles-right"></i>
            </span>
          </li>
        );
      }
    }
  }
  return btn;
};

export default paginationButtons;
