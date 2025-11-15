export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string[]; // ["Action", "Sci-Fi", "Thriller", etc.]
  releaseYear: number;
  rating: number; // 0-10 (like IMDb)
  director: string;
  cast: string[]; // Main actors
  runtime: number; // in minutes
  poster: string; // image URL
  isPopular: boolean; // featured/popular movies
  language: string;
  awards?: string[]; // Optional: ["Oscar Winner", "Golden Globe", etc.]
}

export const movies: Movie[] = [
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
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
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
  {
    id: 11,
    title: "Whiplash",
    description:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    genre: ["Drama", "Music"],
    releaseYear: 2014,
    rating: 8.5,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
    runtime: 107,
    poster:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400",
    isPopular: false,
    language: "English",
    awards: ["Oscar Winner"],
  },
  {
    id: 12,
    title: "La La Land",
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    genre: ["Musical", "Drama", "Romance"],
    releaseYear: 2016,
    rating: 8.0,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
    runtime: 128,
    poster:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    isPopular: false,
    language: "English",
    awards: ["Oscar Winner", "Golden Globe"],
  },
  {
    id: 13,
    title: "The Grand Budapest Hotel",
    description:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    genre: ["Comedy", "Drama", "Adventure"],
    releaseYear: 2014,
    rating: 8.1,
    director: "Wes Anderson",
    cast: [
      "Ralph Fiennes",
      "F. Murray Abraham",
      "Mathieu Amalric",
      "Adrien Brody",
    ],
    runtime: 99,
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    isPopular: false,
    language: "English",
    awards: ["Oscar Winner", "Golden Globe"],
  },
  {
    id: 14,
    title: "Dune",
    description:
      "Paul Atreides leads a rebellion to restore his family's reign over the desert planet Arrakis while preventing a terrible future only he can foresee.",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    releaseYear: 2021,
    rating: 8.0,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac", "Zendaya"],
    runtime: 155,
    poster:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
    isPopular: true,
    language: "English",
  },
  {
    id: 15,
    title: "Everything Everywhere All at Once",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure in which she alone can save the multiverse by exploring other universes connecting with the lives she could have led.",
    genre: ["Action", "Comedy", "Sci-Fi"],
    releaseYear: 2022,
    rating: 8.1,
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
    runtime: 139,
    poster:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400",
    isPopular: true,
    language: "English",
    awards: ["Oscar Winner"],
  },
  {
    id: 16,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: ["Crime", "Drama"],
    releaseYear: 1972,
    rating: 9.2,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    runtime: 175,
    poster:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    isPopular: true,
    language: "English",
    awards: ["Oscar Winner"],
  },
  {
    id: 17,
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    genre: ["Drama"],
    releaseYear: 1999,
    rating: 8.8,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf"],
    runtime: 139,
    poster:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400",
    isPopular: true,
    language: "English",
  },
  {
    id: 18,
    title: "The Prestige",
    description:
      "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    genre: ["Drama", "Mystery", "Thriller"],
    releaseYear: 2006,
    rating: 8.5,
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Hugh Jackman",
      "Scarlett Johansson",
      "Michael Caine",
    ],
    runtime: 130,
    poster:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    isPopular: false,
    language: "English",
  },
  {
    id: 19,
    title: "Blade Runner 2049",
    description:
      "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    genre: ["Sci-Fi", "Thriller", "Drama"],
    releaseYear: 2017,
    rating: 8.0,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Jared Leto"],
    runtime: 164,
    poster:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    isPopular: false,
    language: "English",
  },
  {
    id: 20,
    title: "Her",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    genre: ["Romance", "Sci-Fi", "Drama"],
    releaseYear: 2013,
    rating: 8.0,
    director: "Spike Jonze",
    cast: ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams", "Rooney Mara"],
    runtime: 126,
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    isPopular: false,
    language: "English",
  },
];
