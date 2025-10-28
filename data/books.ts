interface books {
  slug: string;
  title: string;
  author: string;
  description: string;
}

export const books = [
  {
    slug: "the-hobbit",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A hobbit’s journey to reclaim a stolen treasure guarded by a dragon.",
  },
  {
    slug: "1984",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian story of surveillance, control, and rebellion.",
  },
  {
    slug: "harry-potter",
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    description: "A young wizard discovers his destiny at Hogwarts.",
  },
];
