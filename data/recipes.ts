export interface Recipe {
  id: number;
  slug: string;
  name: string;
  description: string;
  ingredients: string[];
  time: number;
  steps: string[];
  imageUrl: string;
}

export const recipes: Recipe[] = [
  {
    id: 1,
    slug: "classic-margherita-pizza",
    name: "Classic Margherita Pizza",
    description:
      "Thin-crust pizza topped with tomato sauce, mozzarella, and basil.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh mozzarella",
      "Fresh basil",
      "Olive oil",
      "Sea salt",
    ],
    time: 45,
    steps: [
      "Preheat the oven to 475°F (245°C) and place a pizza stone inside if you have one.",
      "Stretch the pizza dough into a thin circle and place it on a lightly floured peel or baking sheet.",
      "Spread tomato sauce evenly over the dough, leaving a small border for the crust.",
      "Top with torn fresh mozzarella and drizzle with olive oil.",
      "Bake until the crust is golden and the cheese is bubbly, then garnish with fresh basil and a pinch of sea salt.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1564936281291-294551497d81?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1052",
  },
  {
    id: 2,
    slug: "lemon-herb-salmon",
    name: "Lemon Herb Salmon",
    description: "Oven-baked salmon fillet with fresh lemon and herbs.",
    ingredients: [
      "Salmon fillet",
      "Lemon",
      "Fresh dill",
      "Garlic cloves",
      "Olive oil",
      "Sea salt",
      "Black pepper",
    ],
    time: 15,
    steps: [
      "Preheat the oven to 400°F (205°C) and line a baking sheet with parchment.",
      "Pat the salmon dry and season with sea salt and black pepper.",
      "Mix olive oil, minced garlic, chopped dill, and lemon zest in a small bowl.",
      "Brush the herb mixture over the salmon and top with lemon slices.",
      "Bake for 12–15 minutes, until the salmon flakes easily with a fork.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1625229466790-62bae5ab4ff4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 3,
    slug: "garden-quinoa-salad",
    name: "Garden Quinoa Salad",
    description:
      "Light salad with quinoa, crisp vegetables, and lemon vinaigrette.",
    ingredients: [
      "Quinoa",
      "Cucumber",
      "Cherry tomatoes",
      "Red onion",
      "Fresh parsley",
      "Lemon juice",
      "Olive oil",
      "Sea salt",
      "Black pepper",
    ],
    time: 35,
    steps: [
      "Rinse quinoa under cold water, then simmer in water until fluffy; let cool.",
      "Chop cucumber, cherry tomatoes, red onion, and parsley into bite-sized pieces.",
      "Whisk together lemon juice, olive oil, sea salt, and black pepper to make a vinaigrette.",
      "Combine cooled quinoa with the vegetables in a large bowl.",
      "Toss with the vinaigrette until everything is evenly coated, then chill before serving.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1563910004-b5c9930de2a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
  },
  {
    id: 4,
    slug: "hearty-chickpea-curry",
    name: "Hearty Chickpea Curry",
    description: "Creamy coconut-based curry loaded with chickpeas and spices.",
    ingredients: [
      "Chickpeas",
      "Coconut milk",
      "Yellow onion",
      "Garlic cloves",
      "Fresh ginger",
      "Curry powder",
      "Ground cumin",
      "Ground coriander",
      "Tomato paste",
      "Fresh cilantro",
      "Sea salt",
    ],
    time: 20,
    steps: [
      "Sauté diced onion in oil over medium heat until translucent.",
      "Add minced garlic and grated ginger, cooking until fragrant.",
      "Stir in curry powder, cumin, coriander, and tomato paste; cook for 1 minute.",
      "Pour in coconut milk and stir in chickpeas, then simmer for 10 minutes.",
      "Finish with chopped cilantro and season with sea salt to taste before serving.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1640542509430-f529fdfce835?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 5,
    slug: "blueberry-overnight-oats",
    name: "Blueberry Overnight Oats",
    description:
      "Make-ahead breakfast with oats, yogurt, and fresh blueberries.",
    ingredients: [
      "Rolled oats",
      "Greek yogurt",
      "Milk of choice",
      "Fresh blueberries",
      "Chia seeds",
      "Honey or maple syrup",
      "Vanilla extract",
    ],
    time: 50,
    steps: [
      "Combine rolled oats, chia seeds, and a pinch of sea salt in a jar or bowl.",
      "Stir in milk, Greek yogurt, honey, and vanilla extract until fully mixed.",
      "Fold in fresh blueberries, then cover and refrigerate overnight.",
      "In the morning, stir the oats to loosen the texture and add more milk if needed.",
      "Top with extra blueberries or your favorite nuts before serving.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1584908125631-d537dc63120d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=709",
  },
];
