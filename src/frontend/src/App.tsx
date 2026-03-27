import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import ProfilePage from "@/pages/ProfilePage";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import RecipesPage from "@/pages/RecipesPage";
import UploadPage from "@/pages/UploadPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

// Root layout route
const rootRoute = createRootRoute({
  component: function RootLayout() {
    const [darkMode, setDarkMode] = useState(() => {
      return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
      document.documentElement.classList.toggle("dark", darkMode);
      localStorage.setItem("darkMode", String(darkMode));
    }, [darkMode]);

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
        />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    );
  },
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const recipesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipes",
  component: RecipesPage,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || undefined,
    category: (search.category as string) || undefined,
  }),
});

const recipeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipe/$id",
  component: RecipeDetailPage,
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: UploadPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  recipesRoute,
  recipeDetailRoute,
  uploadRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
