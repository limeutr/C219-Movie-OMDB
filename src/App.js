import { use } from "react";
import { useEffect, useState } from "react";
const KEY = "a5db3016";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   const controller = new AbortController(); // Create an AbortController instance

  //   if (query.trim() === "") return; // Skip fetching if query is empty

  //   fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal:controller.signal})
  //     .then((res) => res.json())
  //     .then((data) => data.Response === "True" && setMovies(data.Search))
  //     .catch((err)=> console.log(err));

  //     return () => controller.abort();
  //   }, [query]);

  useEffect(() => { 
    const controller = new AbortController(); // Create an AbortController instance
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, 
          { signal: controller.signal, 
          }
        )
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //  if (userName !== "") {
  //   localStorage.setItem("savedUserName", userName);
  //  }
  // });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie.imdbID}>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No movies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
