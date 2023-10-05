import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { fetchMovies, searchMovies } from "../../api";
import CarouselHome from "../components/Carousel";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchData();
  }, []);

  const search = async () => {
    try {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
      } else {
        const results = await searchMovies(searchTerm); // Gunakan fungsi pencarian
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error searching movies: ", error);
    }
  };

  const handleSearchClick = () => {
    search();
  };

  return (
    <>
      <div className="navbar w-100 d-flex justify-content-between align-items-center px-4 bg-transparent position-absolute">
        <a
          className="text-decoration-none text-danger fs-1 fw-bold cursor-pointer"
          href="#"
        >
          Movielist
        </a>
        <div className="navbar-search shadow position-relative overflow-hidden w-25">
          <input
            className="w-100 h-25 text-white rounded-5 py-2 ps-2 fs-6 border-danger"
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="search-icon text-white fs-5 bg-transparent border-0 position-absolute top-0 end-0 me-1"
            onClick={handleSearchClick}
          >
            <HiSearch />
          </button>
        </div>
        <div>
          <button className="btn border border-danger rounded-5 bg-transparent text-danger fw-bold py-1 px-4 fs-6 me-2">
            Login
          </button>
          <button className="btn rounded-5 border-danger bg-danger rounded-5 text-white py-1 px-3 fs-6">
            Register
          </button>
        </div>
      </div>
      <div className="hero-section">
        <CarouselHome />
      </div>
      <div className="movie-section ps-4">
        <h1 className="my-4 mx-5 fw-bold">Popular Movies</h1>
        <div className="movie-container w-100 d-flex gap-4 flex-wrap justify-content-start py-3 ps-5">
          {searchResults.length > 0
            ? searchResults.map((movie) => (
                <div
                  className="movie-wrapper d-flex flex-column align-items-center rounded-4 position-relative"
                  key={movie.id}
                >
                  <Link to={`/detail/${movie.id}`}>
                    <img
                      className="movie-image"
                      src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="movie-hover text-white position-absolute top-0 start-0 py-4 px-3">
                      <div className="movie-title fs-2 fw-bold mb-3">
                        {movie.title}
                      </div>
                      <div className="movie-date">
                        Release: {movie.release_date}
                      </div>
                      <div className="movie-rate fw-bold mt-2 d-flex align-items-center gap-1">
                        <AiOutlineStar className="rate-star" />
                        {movie.vote_average}/10
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : movies.map((movie) => (
                <div
                  className="movie-wrapper d-flex flex-column align-items-center rounded-4 position-relative"
                  key={movie.id}
                >
                  <Link to={`/detail/${movie.id}`}>
                    <img
                      className="movie-image"
                      src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="movie-hover text-white position-absolute top-0 start-0 py-4 px-3">
                      <div className="movie-title fs-2 fw-bold mb-3">
                        {movie.title}
                      </div>
                      <div className="movie-date">
                        Release: {movie.release_date}
                      </div>
                      <div className="movie-rate fw-bold mt-2 d-flex align-items-center gap-1">
                        <AiOutlineStar className="rate-star" />
                        {movie.vote_average} / 10
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
