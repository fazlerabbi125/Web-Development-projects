import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useContext } from "react";
import styles from "./MovieList.module.css";
import poster from "../../assets/poster-not-available.jpg";
import { axInstance, SERVER_URL } from "../../hooks/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { fetchList } from "../../store/features/watchlistSlice";
import MessageContext from "../../contexts/MessageContext";
import { getTokens } from "../../utils/handleStorage";
import SearchForm from "../SearchForm";

const MovieList = ({ data, query, setQuery, itemsPerPage, setPageNumber }) => {
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);
  const auth = useSelector((state) => state.authUser.userData);

  function handleQuery(event) {
    const name = event.target.name;
    const value = event.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  }

  const dispatch = useDispatch();
  const { data: watchlist } = useSelector((state) => state.userWatchlist);

  useEffect(() => {
    if (auth && !auth.isAdmin) dispatch(fetchList());
  }, [auth, dispatch]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const totalPages = Math.ceil(data.movieCount / itemsPerPage);

  const handleList = async function (id, isAdded) {
    try {
      if (isAdded) {
        await axInstance.delete(`/delete-from-list/${id}`, {
          headers: {
            Authorization: `Bearer ${getTokens().accessToken}`,
          },
        });
        setMessage("Item has been removed from your watchlist");
      } else {
        await axInstance.post(
          "/add-to-list",
          { id },
          {
            headers: {
              Authorization: `Bearer ${getTokens().accessToken}`,
            },
          }
        );
        setMessage("Item has been added to your watchlist");
      }
      navigate("/watchlist");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <SearchForm query={query} handleQuery={handleQuery} />
      {data?.movieCount === 0 ? (
        <h2 className="text-center mt-4">No movie found</h2>
      ) : (
        <div className="card mx-auto w-75 my-5 data">
          <ul className="list-group list-group-flush">
            {data.movies.map((item) => (
              <li className="list-group-item" key={item._id}>
                <div className="row">
                  <img
                    src={
                      !item.imgUrl
                        ? poster
                        : item.imgUrl.startsWith("/uploads/")
                          ? SERVER_URL + item.imgUrl
                          : item.imgUrl
                    }
                    alt="Poster"
                    className="data__img mb-2 img-fluid col-3"
                  />
                  <div className="col-8">
                    <h3>{item.title} </h3>
                    <div>
                      <span className="data__property--muted">Genre:</span>{" "}
                      {item.genre}
                    </div>
                    <div>
                      <span className="data__property--muted">
                        Release year:
                      </span>{" "}
                      {item.year}
                    </div>
                    <div className="my-1">
                      <Link
                        to={`/movie-series/${item._id}`}
                        className="btn btn-dark"
                      >
                        View Details
                      </Link>
                    </div>
                    {auth && !auth.isAdmin && (
                      <div>
                        {watchlist.find(
                          (elem) => elem.movie._id === item._id
                        ) ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => handleList(item._id, true)}
                          >
                            Remove from WatchList
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => handleList(item._id, false)}
                          >
                            Add to WatchList
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName={styles.paginationBttns}
          pageLinkClassName={styles.paginationBttns__link}
          disabledClassName={styles.paginationBttns__disabled}
          activeClassName={styles.paginationBttns__active}
          breakLabel="..."
          breakClassName={styles.paginationBttns__breakLabel}
          renderOnZeroPageCount={() => null}
          marginPagesDisplayed={1}
        />
      </div>
    </>
  );
};

export default MovieList;
