# RecipeShare

## Current State
New project — empty backend and frontend scaffolding.

## Requested Changes (Diff)

### Add
- Full Recipe Sharing Platform with multiple pages
- Landing page with hero, featured recipes, trending categories, search bar
- Recipe listing page with grid layout and filters
- Recipe detail page with ingredients, steps, ratings, reviews, bookmark
- Upload recipe page with form (title, ingredients, steps, image, category)
- User profile page with bio, uploaded recipes, saved recipes
- Navigation bar: Logo, Home, Recipes, Categories, Upload Recipe, Profile, Login/Signup
- Dark mode toggle
- Like, comment, share functionality
- Notifications bell icon
- Mobile responsive design

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend
- Recipe entity: id, title, description, ingredients[], steps[], category, imageUrl, authorId, authorName, likes, cookTime, difficulty, cuisine, createdAt
- User entity: id, name, bio, avatarUrl, savedRecipes[]
- CRUD for recipes: createRecipe, getRecipes, getRecipeById, likeRecipe, deleteRecipe
- Comment entity and addComment, getComments
- saveRecipe / unsaveRecipe for bookmarking
- Seed data with 12+ sample recipes across categories

### Frontend Pages
1. Landing Page (/) — Hero section, search bar, featured recipes, trending categories
2. Recipes Page (/recipes) — Grid with filter sidebar/tabs
3. Recipe Detail Page (/recipe/:id) — Full detail with comments
4. Upload Recipe Page (/upload) — Form with all fields
5. Profile Page (/profile) — Bio, uploaded, saved recipes

### Components
- Navbar with dark mode toggle and notification bell
- RecipeCard component (image, title, rating, cookTime, likes)
- CategoryBadge
- StarRating
- CommentSection
- SearchBar
