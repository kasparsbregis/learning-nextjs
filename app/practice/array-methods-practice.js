// JavaScript Array Methods Practice
// This file works with Node.js - just run: node app/practice/array-methods-practice.js

const { includes } = require("zod");

// Movies data (10 movies for practice)
const movies = [
  {
    id: 1,
    title: "Inception",
    description:
      "A skilled thief is given a chance at redemption if he can complete the impossible task of inception - planting an idea in someone's mind.",
    genre: ["Sci-Fi", "Action", "Thriller"],
    releaseYear: 2010,
    rating: 8.8,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"],
    runtime: 148,
    poster:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400",
    isPopular: true,
    language: "English",
    awards: ["Oscar Winner", "BAFTA Winner"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    description:
      "Batman faces his greatest challenge yet when the Joker wreaks havoc on Gotham City, testing the limits of justice and heroism.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    rating: 9.0,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman"],
    runtime: 152,
    poster:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400",
    isPopular: true,
    language: "English",
    awards: ["Oscar Winner"],
  },
  {
    id: 3,
    title: "Parasite",
    description:
      "A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.",
    genre: ["Thriller", "Drama", "Comedy"],
    releaseYear: 2019,
    rating: 8.5,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    runtime: 132,
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    isPopular: true,
    language: "Korean",
    awards: ["Oscar Winner", "Palme d'Or"],
  },
  {
    id: 4,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    releaseYear: 2014,
    rating: 8.6,
    director: "Christopher Nolan",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine",
    ],
    runtime: 169,
    poster:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
    isPopular: true,
    language: "English",
    awards: ["Oscar Winner"],
  },
  {
    id: 5,
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    genre: ["Sci-Fi", "Action"],
    releaseYear: 1999,
    rating: 8.7,
    director: "Lana Wachowski, Lilly Wachowski",
    cast: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
    ],
    runtime: 136,
    poster:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400",
    isPopular: true,
    language: "English",
  },
  {
    id: 6,
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: ["Crime", "Drama"],
    releaseYear: 1994,
    rating: 8.9,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    runtime: 154,
    poster:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    isPopular: true,
    language: "English",
    awards: ["Palme d'Or", "Oscar Winner"],
  },
  {
    id: 7,
    title: "Spirited Away",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    genre: ["Animation", "Adventure", "Fantasy"],
    releaseYear: 2001,
    rating: 8.6,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naitō"],
    runtime: 125,
    poster:
      "https://images.unsplash.com/photo-1607604274033-02c8c49c2c0a?w=400",
    isPopular: true,
    language: "Japanese",
    awards: ["Oscar Winner"],
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: ["Drama"],
    releaseYear: 1994,
    rating: 9.3,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    runtime: 142,
    poster:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400",
    isPopular: true,
    language: "English",
  },
  {
    id: 9,
    title: "Mad Max: Fury Road",
    description:
      "In a post-apocalyptic wasteland, Max teams up with a mysterious woman, Furiosa, to escape from a tyrannical warlord.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2015,
    rating: 8.1,
    director: "George Miller",
    cast: [
      "Tom Hardy",
      "Charlize Theron",
      "Nicholas Hoult",
      "Hugh Keays-Byrne",
    ],
    runtime: 120,
    poster:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    isPopular: false,
    language: "English",
    awards: ["Oscar Winner"],
  },
  {
    id: 10,
    title: "Get Out",
    description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his uneasiness about their reception of him eventually reaches a boiling point.",
    genre: ["Horror", "Mystery", "Thriller"],
    releaseYear: 2017,
    rating: 7.8,
    director: "Jordan Peele",
    cast: [
      "Daniel Kaluuya",
      "Allison Williams",
      "Catherine Keener",
      "Bradley Whitford",
    ],
    runtime: 104,
    poster:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    isPopular: false,
    language: "English",
    awards: ["Oscar Winner"],
  },
];

// ============================================
// TASK 1: FILTER - Start here!
// ============================================

// Task 1.1: Filter movies from 2010
// FIX: releaseYear is a NUMBER, not a string! Use === 2010 (not === "2010")
const movies2010 = movies.filter((movie) => movie.releaseYear === 2010);
// console.log("Task 1.1 - Movies from 2010:");
// console.log(movies2010);
// console.log("---");

// Task 1.2: Filter movies with rating above 8.5
const highRating = movies.filter((movie) => Number(movie.rating) > 8.5);
// console.log(highRating);
// Write your code here:
// const highRatedMovies = movies.filter(???);
// console.log("Task 1.2 - High rated movies:", highRatedMovies);

// Task 1.3: Filter popular movies
const popularMovies = movies.filter((movie) => movie.isPopular === true);
// console.log(popularMovies);
// Write your code here:
// const popularMovies = movies.filter(???);
// console.log("Task 1.3 - Popular movies:", popularMovies);

// Task 1.4: Filter movies in English
const englishMovies = movies.filter((movie) => movie.language === "English");
// console.log(englishMovies);
// Write your code here:
// const englishMovies = movies.filter(???);
// console.log("Task 1.4 - English movies:", englishMovies);

// ============================================
// TASK 2: MAP - Transform data
// ============================================

// Task 2.1: Get only movie titles
const movieTitles = movies.map((movie) => movie.title);
// console.log(movieTitles);
// Write your code here:
// const titles = movies.map(???);
// console.log("Task 2.1 - Titles:", titles);

// Task 2.2: Get only ratings
const ratings = movies.map((movie) => movie.rating);
// console.log(ratings);
// Write your code here:
// const ratings = movies.map(???);
// console.log("Task 2.2 - Ratings:", ratings);

// ============================================
// Continue with more tasks from the guide!
// ============================================

// Task 2.3: Get title and year together
const titleAndYear = movies.map(
  (movie) => movie.title + " " + movie.releaseYear
);
// console.log(titleAndYear);

// Task 2.4: Get movie info as objects
// Write ONE line that creates objects with only title and rating
const titleAndRating = movies.map((movie) => ({
  title: movie.title,
  rating: movie.rating,
}));
// console.log(titleAndRating);

// Task 3.1: Find movie with title "Inception"
const findInception = movies.find((movie) => movie.title === "Inception");
// console.log(findInception);

// Task 3.2: Find first movie with rating 9.0
const firstHighRating = movies.find((movie) => Number(movie.rating) === 9.0);
// console.log(firstHighRating);

// Task 3.3: Find movie directed by Christopher Nolan
const christopherNolan = movies.find(
  (movie) => movie.director === "Christopher Nolan"
);
// console.log(christopherNolan);

// Task 4.1: Check if ANY movie has rating 10
const hasPerfect = movies.some((movie) => Number(movie.rating) === 10);
// console.log(hasPerfect);

// Task 4.2: Check if ALL movies are in English
const allEnglish = movies.some((movie) => movie.language === "English");
// console.log(allEnglish);

// Task 4.3: Check if ANY movie is from 2023
const movie2023 = movies.some((movie) => movie.releaseYear === "2023");
// console.log(movie2023);

// Task 5.1: Sort movies by release year (oldest first)
const moviesAscending = [...movies].sort(
  (a, b) => a.releaseYear - b.releaseYear
);
// console.log(moviesAscending);

// Task 5.2: Sort movies by rating (highest first)
const sortByRating = [...movies].sort((a, b) => b.rating - a.rating);
// console.log(sortByRating);

// Task 5.3: Sort movies by title (A-Z)
const sortByTitle = [...movies].sort((a, b) => a.title.localeCompare(b.title));
// console.log(sortByTitle);

// Task 6.1: Calculate total runtime of all movies
const totalRuntime = movies.reduce((total, movie) => total + movie.runtime, 0);
// console.log(totalRuntime);

// Task 6.2: Calculate average rating
const averageRating =
  movies.reduce((total, movie) => total + movie.rating, 0) / movies.length;
// console.log(averageRating.toFixed(2));

// Task 6.3: Count movies by language
const movieCountByLanguage = movies.reduce((total, movie) => {
  total[movie.language] = (total[movie.language] || 0) + 1;
  return total;
}, {});
// console.log(movieCountByLanguage);

// Task 7.1: Find movies with "Action" genre
const hasAction = movies.filter((movie) => movie.genre.includes("Action"));
// console.log(hasAction);

// Task 7.2: Find movies with Leonardo DiCaprio
const hasLeo = movies.filter((movie) =>
  movie.cast.includes("Leonardo DiCaprio")
);
// console.log(hasLeo);

// Task 8.1: Get titles of high-rated movies
// Write ONE line that: filters movies with rating > 8.5, then gets their titles
const highRatedTitles = movies
  .filter((movie) => movie.rating > 8.5)
  .map((movie) => movie.title);

// console.log(highRatedTitles);

// ### Task 8.2: Get average rating of popular movies
// Write ONE line that: filters popular movies, gets their ratings, calculates average

const avgPopularRating =
  movies
    .filter((movie) => movie.isPopular)
    .reduce((total, movie) => total + movie.rating, 0) /
  movies.filter((movie) => movie.isPopular).length;

// console.log(avgPopularRating.toFixed(2));

// Task 8.3: Get sorted titles of English movies

const sortedEnglishTitles = movies
  .filter((movie) => movie.language === "English")
  .map((movie) => movie.title)
  .sort((a, b) => a.localeCompare(b));

// console.log(sortedEnglishTitles, sortedEnglishTitles.length + " movies");

// Task 9.1: Get all unique genres

const allGenres = movies.map((movie) => movie.genre);
const flatGenres = allGenres.flat();
const uniqueGenres = [...new Set(flatGenres)];
// console.log(uniqueGenres);

// Task 9.2: Get all cast members

const allActors = movies.flatMap((movie) => movie.cast);
// console.log(allActors);

// Task 10.1: Log each movie title
// const allMovieTitles = movies.forEach((movie) => console.log(movie.title));
// console.log(allMovieTitles);

// Task 10.2: Count movies per decade
const decadeCount = {};
movies.forEach((movie) => {
  const decade = Math.floor(movie.releaseYear / 10) * 10;
  decadeCount[decade] = (decadeCount[decade] || 0) + 1;
});
// console.log(decadeCount);

// Task 11.1: Get first 5 movies
const firstFive = movies.slice(0, 5);
// console.log(firstFive);

// Task 11.2: Get last 3 movies
const lastThree = movies.slice(-3);
// console.log(lastThree);

// Task 12.1: Find index of "Inception"
const inceptionIndex = movies.findIndex((movie) => movie.title === "Inception");
// console.log(inceptionIndex);

// Task 13.1: Search movies by title
function searchMovie(searchTerm) {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
// console.log(searchMovie("dark"));

// Task 13.2: Filter by multiple criteria
// Write a function that filters by genre AND minimum rating

function filterCriteria(genre, minRating) {
  return movies.filter(
    (movie) => movie.genre.includes(genre) && movie.rating >= minRating
  );
}
// console.log(filterCriteria("Adventure", 8.5));
