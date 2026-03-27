export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookTime: number; // minutes
  servings: number;
  rating: number;
  ratingCount: number;
  likes: number;
  commentsCount: number;
  author: string;
  authorAvatar: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

export interface Comment {
  id: number;
  recipeId: number;
  author: string;
  authorAvatar: string;
  text: string;
  date: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Grandmother's Classic Spaghetti Carbonara",
    description:
      "A rich, creamy Italian pasta made with eggs, Pecorino Romano, crispy guanciale, and freshly cracked black pepper. No cream needed — just the perfect emulsion.",
    image: "/assets/generated/recipe-carbonara.dim_600x450.jpg",
    category: "Non-Veg",
    cuisine: "Italian",
    difficulty: "Medium",
    cookTime: 25,
    servings: 4,
    rating: 4.9,
    ratingCount: 342,
    likes: 1240,
    commentsCount: 87,
    author: "Marco Rossi",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
    ingredients: [
      "400g spaghetti",
      "200g guanciale or pancetta",
      "4 large eggs",
      "100g Pecorino Romano, finely grated",
      "50g Parmesan, finely grated",
      "Freshly cracked black pepper",
      "Salt for pasta water",
    ],
    steps: [
      "Bring a large pot of heavily salted water to a boil. Add spaghetti and cook until al dente.",
      "Meanwhile, cut guanciale into small cubes and render in a cold pan over medium heat until crispy.",
      "Whisk together eggs, Pecorino Romano, Parmesan, and generous black pepper in a bowl.",
      "Reserve 1 cup of pasta water before draining. Drain pasta and add immediately to the guanciale pan off heat.",
      "Add egg mixture to the pan, tossing vigorously while adding pasta water gradually until creamy.",
      "Serve immediately with extra Pecorino and black pepper.",
    ],
    tags: ["Italian", "Pasta", "Quick"],
  },
  {
    id: 2,
    title: "Creamy Butter Chicken (Murgh Makhani)",
    description:
      "Tender chicken thighs marinated in yogurt and spices, simmered in a velvety tomato-butter sauce with aromatic fenugreek. Pure comfort in a bowl.",
    image: "/assets/generated/recipe-chicken-tikka.dim_600x450.jpg",
    category: "Non-Veg",
    cuisine: "Indian",
    difficulty: "Medium",
    cookTime: 50,
    servings: 4,
    rating: 4.8,
    ratingCount: 512,
    likes: 2100,
    commentsCount: 134,
    author: "Priya Sharma",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    ingredients: [
      "800g chicken thighs, boneless",
      "1 cup plain yogurt",
      "2 tsp tandoori masala",
      "400g crushed tomatoes",
      "100ml heavy cream",
      "3 tbsp butter",
      "1 onion, finely chopped",
      "4 garlic cloves",
      "1 tsp dried fenugreek leaves",
      "Salt and pepper to taste",
    ],
    steps: [
      "Marinate chicken in yogurt, tandoori masala, salt and pepper for at least 30 minutes.",
      "Grill or pan-fry chicken until cooked through and slightly charred. Set aside.",
      "In a large pan, sauté onion in butter until golden. Add garlic and cook 1 minute.",
      "Add crushed tomatoes and simmer 15 minutes until sauce thickens.",
      "Blend sauce until smooth, then return to pan over medium heat.",
      "Add cream, fenugreek leaves, and chicken. Simmer 10 minutes and serve with naan.",
    ],
    tags: ["Indian", "Curry", "Comfort Food"],
  },
  {
    id: 3,
    title: "Rainbow Buddha Bowl with Tahini",
    description:
      "A nourishing, vibrant bowl packed with roasted sweet potatoes, crispy chickpeas, avocado, and a dreamy lemon-tahini dressing.",
    image: "/assets/generated/recipe-buddha-bowl.dim_600x450.jpg",
    category: "Veg",
    cuisine: "Mediterranean",
    difficulty: "Easy",
    cookTime: 35,
    servings: 2,
    rating: 4.7,
    ratingCount: 289,
    likes: 876,
    commentsCount: 56,
    author: "Sofia Martinez",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    ingredients: [
      "1 cup cooked quinoa",
      "1 sweet potato, cubed",
      "400g canned chickpeas, drained",
      "1 avocado, sliced",
      "100g cherry tomatoes",
      "2 cups mixed greens",
      "3 tbsp tahini",
      "1 lemon, juiced",
      "1 garlic clove, minced",
      "2 tbsp olive oil",
    ],
    steps: [
      "Preheat oven to 200°C. Toss sweet potato and chickpeas with olive oil, salt, and cumin.",
      "Roast for 25 minutes until sweet potato is tender and chickpeas are crispy.",
      "Whisk tahini with lemon juice, garlic, and 3 tbsp water until smooth and pourable.",
      "Divide quinoa into bowls, arrange roasted veggies, fresh tomatoes, avocado, and greens.",
      "Drizzle generously with tahini dressing and sprinkle with sesame seeds.",
    ],
    tags: ["Vegan", "Healthy", "Bowl"],
  },
  {
    id: 4,
    title: "Molten Chocolate Lava Cake",
    description:
      "Individual rich chocolate cakes with a perfectly runny center — served warm with vanilla ice cream and a dusting of cocoa powder.",
    image: "/assets/generated/recipe-chocolate-cake.dim_600x450.jpg",
    category: "Desserts",
    cuisine: "French",
    difficulty: "Medium",
    cookTime: 20,
    servings: 4,
    rating: 4.9,
    ratingCount: 621,
    likes: 3200,
    commentsCount: 198,
    author: "Claire Dubois",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Claire",
    ingredients: [
      "200g dark chocolate (70%)",
      "100g unsalted butter",
      "3 eggs",
      "3 egg yolks",
      "100g caster sugar",
      "50g all-purpose flour",
      "Cocoa powder for dusting",
      "Vanilla ice cream to serve",
    ],
    steps: [
      "Preheat oven to 220°C. Butter and dust 4 ramekins with cocoa powder.",
      "Melt chocolate and butter together in a double boiler. Let cool slightly.",
      "Whisk eggs, yolks, and sugar until pale and thick (about 3 minutes).",
      "Fold chocolate mixture into eggs, then sift in flour and fold gently.",
      "Pour batter into prepared ramekins. Refrigerate up to 24 hours or bake immediately.",
      "Bake 10-12 minutes until edges are set but center still wobbles. Serve immediately.",
    ],
    tags: ["Dessert", "Chocolate", "French"],
  },
  {
    id: 5,
    title: "Fluffy Blueberry Buttermilk Pancakes",
    description:
      "Cloud-like stacks of golden pancakes bursting with fresh blueberries, served with real maple syrup and whipped honey butter.",
    image: "/assets/generated/recipe-pancakes.dim_600x450.jpg",
    category: "Breakfast",
    cuisine: "American",
    difficulty: "Easy",
    cookTime: 20,
    servings: 4,
    rating: 4.6,
    ratingCount: 445,
    likes: 1560,
    commentsCount: 72,
    author: "Emma Johnson",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tsp baking powder",
      "1/2 tsp baking soda",
      "2 tbsp sugar",
      "1/2 tsp salt",
      "1.5 cups buttermilk",
      "2 eggs",
      "3 tbsp melted butter",
      "1 cup fresh blueberries",
      "Maple syrup to serve",
    ],
    steps: [
      "Whisk together flour, baking powder, baking soda, sugar, and salt in a large bowl.",
      "In another bowl, whisk buttermilk, eggs, and melted butter together.",
      "Pour wet ingredients into dry and fold gently — lumps are okay, don't overmix.",
      "Fold in blueberries. Let batter rest 5 minutes.",
      "Heat a lightly greased griddle over medium heat. Pour 1/4 cup batter per pancake.",
      "Cook until bubbles form and edges set (~2 min), flip and cook 1 more minute. Serve warm.",
    ],
    tags: ["Breakfast", "Sweet", "Quick"],
  },
  {
    id: 6,
    title: "Classic Fresh Guacamole",
    description:
      "Perfectly chunky guacamole with ripe Hass avocados, fresh lime, jalapeño, and cilantro. Ready in 10 minutes, pairs with everything.",
    image: "/assets/generated/recipe-guacamole.dim_600x450.jpg",
    category: "Veg",
    cuisine: "Mexican",
    difficulty: "Easy",
    cookTime: 10,
    servings: 4,
    rating: 4.8,
    ratingCount: 378,
    likes: 940,
    commentsCount: 43,
    author: "Carlos Rivera",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    ingredients: [
      "3 ripe Hass avocados",
      "1 lime, juiced",
      "1/2 jalapeño, seeded and minced",
      "1/4 red onion, finely diced",
      "2 tbsp fresh cilantro, chopped",
      "1/2 tsp sea salt",
      "1 small tomato, diced",
    ],
    steps: [
      "Halve and pit avocados. Scoop flesh into a bowl.",
      "Mash avocado with a fork to desired chunkiness.",
      "Add lime juice and salt. Mix well.",
      "Fold in jalapeño, red onion, cilantro, and tomato.",
      "Taste and adjust seasoning. Serve immediately with tortilla chips.",
    ],
    tags: ["Mexican", "Dip", "Quick Meals"],
  },
  {
    id: 7,
    title: "Gourmet Avocado Toast with Poached Eggs",
    description:
      "Thick sourdough slices loaded with smashed avocado, perfectly poached eggs, chili flakes, and microgreens — the ultimate power breakfast.",
    image: "/assets/generated/recipe-avocado-toast.dim_600x450.jpg",
    category: "Breakfast",
    cuisine: "Modern",
    difficulty: "Easy",
    cookTime: 15,
    servings: 2,
    rating: 4.5,
    ratingCount: 267,
    likes: 720,
    commentsCount: 31,
    author: "Lily Chen",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
    ingredients: [
      "2 thick slices sourdough bread",
      "2 ripe avocados",
      "2 eggs",
      "1 tbsp white vinegar",
      "1 lemon, juiced",
      "Chili flakes",
      "Microgreens or arugula",
      "Sea salt and black pepper",
    ],
    steps: [
      "Toast sourdough until golden and crispy.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Bring a pot of water to a gentle simmer. Add vinegar.",
      "Crack each egg into a small cup. Create a gentle whirlpool in water and slide egg in.",
      "Poach 3 minutes for runny yolk. Remove with slotted spoon.",
      "Spread avocado on toast, top with poached egg, microgreens, chili flakes, and sea salt.",
    ],
    tags: ["Breakfast", "Healthy", "Quick Meals"],
  },
  {
    id: 8,
    title: "Thai Green Curry with Jasmine Rice",
    description:
      "Fragrant, coconut-rich Thai green curry with seasonal vegetables and fresh kaffir lime leaves — restaurant quality at home.",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
    category: "Veg",
    cuisine: "Thai",
    difficulty: "Medium",
    cookTime: 40,
    servings: 4,
    rating: 4.7,
    ratingCount: 198,
    likes: 650,
    commentsCount: 28,
    author: "Nong Kachanat",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nong",
    ingredients: [
      "400ml coconut milk",
      "3 tbsp green curry paste",
      "2 cups mixed vegetables (zucchini, bell pepper, peas)",
      "4 kaffir lime leaves",
      "1 lemongrass stalk",
      "1 tbsp fish sauce (or soy sauce for vegan)",
      "1 tsp sugar",
      "Fresh Thai basil",
      "2 cups jasmine rice",
    ],
    steps: [
      "Cook jasmine rice according to package directions.",
      "Heat a wok over high heat. Add 1/2 can coconut milk and cook until oil separates.",
      "Add curry paste and fry 2 minutes until fragrant.",
      "Add remaining coconut milk, lemongrass, and lime leaves. Bring to simmer.",
      "Add vegetables and cook 8-10 minutes until tender.",
      "Season with fish sauce and sugar. Top with Thai basil. Serve over rice.",
    ],
    tags: ["Thai", "Curry", "Vegetarian"],
  },
];

export const SAMPLE_COMMENTS: Comment[] = [
  {
    id: 1,
    recipeId: 1,
    author: "Julia K.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julia",
    text: "Made this last night and my family loved it! The trick with the pasta water is genius.",
    date: "2 days ago",
  },
  {
    id: 2,
    recipeId: 1,
    author: "Tom B.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    text: "Authentic recipe. I used guanciale imported from Rome and it made all the difference.",
    date: "1 week ago",
  },
  {
    id: 3,
    recipeId: 2,
    author: "Anita R.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    text: "Better than takeout! I added a bit more cream and it was absolutely heavenly.",
    date: "3 days ago",
  },
];

export const CATEGORIES = [
  "All",
  "Veg",
  "Non-Veg",
  "Desserts",
  "Breakfast",
  "Quick Meals",
];
export const CUISINES = [
  "All",
  "Italian",
  "Indian",
  "Mexican",
  "Thai",
  "French",
  "American",
  "Mediterranean",
  "Modern",
];
export const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
