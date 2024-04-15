const { pool } = require("../config/database");
const asyncHandler = require("express-async-handler");

const fetchMovies = asyncHandler(async (req, res) => {
  // Fetch movies from the database
  const loc = req.query.loc;
  //   if (!loc) {
  //     pool.query(
  //       "SELECT movieId, movieName FROM Movie",
  //       (err, result, fields) => {
  //         if (err) {
  //           // Handle error
  //           console.error(err);
  //           console.log(err);
  //           res.status(500).send("Internal Server Error");
  //           return;
  //         }
  //         // Map the result to an array of movie objects
  //         const movies = result.map((movie) => {
  //           return {
  //             movieId: movie.movieId,
  //             movieName: movie.movieName,
  //           };
  //         });

  //         // Send the list of movies as a JavaScript object
  //         res.json(movies);
  //       }
  //     );

  if (!loc) {
    pool.query("SELECT * FROM Movie", (err, result, fields) => {
      if (err) {
        console.error(err);
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const movies = result.map((movie) => {
        return {
          movieId: movie.movieId,
          movieName: movie.movieName,
          movieDesc: movie.movieDesc,
          duration: movie.duration,
          releaseDate: formatString(movie.releaseDate),
        };
      });

      res.json(movies);
    });
  } else {
    pool.query(
      "SELECT DISTINCT m.movieId, m.movieName FROM Movie m JOIN ScreeningSchedule " +
        "ss ON m.movieId = ss.movieId JOIN Theatre t ON ss.theatreId = t.theatreId " +
        "WHERE t.theatreLoc = ?",
      [loc],
      (err, result, fields) => {
        if (err) {
          // Handle error
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        // Map the result to an array of movie objects
        const movies = result.map((movie) => {
          return {
            movieId: movie.movieId,
            movieName: movie.movieName,
          };
        });

        // Send the list of movies as a JavaScript object
        res.json(movies);
      }
    );
  }
});

const fetchMovieData = asyncHandler(async (req, res) => {
  // Fetch movies from the database
  const movieId = req.params.movieId;

  pool.query(
    "SELECT * FROM Movie WHERE movieId = ?",
    movieId,
    (err, result, fields) => {
      if (err) {
        // Handle error
        console.error(err);
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      // Map the result to an array of movie objects

      const movies = result.map((movie) => {
        return {
          movieId: movie.movieId,
          movieName: movie.movieName,
          movieDesc: movie.movieDesc,
          releaseDate: formatString(result[0].releaseDate),
          duration: movie.duration,
        };
      });

      // Send the list of movies as a JavaScript object
      res.json(movies);
    }
  );
});

const formatString = (string) => {
  const releaseDate = new Date(string);
  const formattedDate = releaseDate.toLocaleDateString("en-GB"); // 'en-GB' for DD-MM-YYYY format
  const [day, month, year] = formattedDate.split("/");
  const dateString = `${day}-${month}-${year}`;
  return dateString;
};

module.exports = { fetchMovies, fetchMovieData };
