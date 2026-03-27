import RecipeCard from "@/components/RecipeCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RECIPES } from "@/data/recipes";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import { Camera, Edit2, LogOut, Save } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    bio: "Home cook & food enthusiast. I love experimenting with flavors from around the world.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  });
  const [editForm, setEditForm] = useState(profile);

  const myRecipes = RECIPES.slice(0, 3);
  const savedRecipes = RECIPES.slice(3, 6);

  const handleSave = () => {
    setProfile(editForm);
    setEditing(false);
    toast.success("Profile updated!");
  };

  if (!isLoggedIn) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">👨‍🍳</div>
        <h2 className="font-display text-2xl font-bold mb-3">Your Profile</h2>
        <p className="text-muted-foreground mb-6">
          Log in to view your profile, uploaded recipes, and saved collection.
        </p>
        <Button
          className="rounded-full px-8"
          onClick={() => login()}
          data-ocid="profile.primary_button"
        >
          Login to Continue
        </Button>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Profile Card */}
        <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback className="text-2xl">
                  {profile.name[0]}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                data-ocid="profile.edit_button"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Display Name</Label>
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="rounded-xl mt-1"
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Bio</Label>
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, bio: e.target.value }))
                      }
                      rows={2}
                      className="rounded-xl resize-none mt-1"
                      data-ocid="profile.textarea"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="rounded-full gap-1.5"
                      onClick={handleSave}
                      data-ocid="profile.save_button"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setEditing(false)}
                      data-ocid="profile.cancel_button"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="font-display text-2xl font-bold mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {profile.bio}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>
                      <strong className="text-foreground">
                        {myRecipes.length}
                      </strong>{" "}
                      recipes
                    </span>
                    <span>
                      <strong className="text-foreground">
                        {savedRecipes.length}
                      </strong>{" "}
                      saved
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full gap-1.5"
                      onClick={() => setEditing(true)}
                      data-ocid="profile.edit_button"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full gap-1.5 text-destructive"
                      onClick={() => {
                        clear();
                        navigate({ to: "/" });
                      }}
                      data-ocid="profile.delete_button"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-recipes">
          <TabsList className="rounded-full mb-6">
            <TabsTrigger
              value="my-recipes"
              className="rounded-full"
              data-ocid="profile.tab"
            >
              My Recipes
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="rounded-full"
              data-ocid="profile.tab"
            >
              Saved Recipes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-recipes">
            {myRecipes.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="profile.empty_state"
              >
                <div className="text-4xl mb-3">🍳</div>
                <p className="text-muted-foreground">
                  No recipes uploaded yet.
                </p>
                <Button
                  className="rounded-full mt-4"
                  onClick={() => navigate({ to: "/upload" })}
                  data-ocid="profile.primary_button"
                >
                  Upload Your First Recipe
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {myRecipes.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={i} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedRecipes.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="profile.empty_state"
              >
                <div className="text-4xl mb-3">🔖</div>
                <p className="text-muted-foreground">No saved recipes yet.</p>
                <Button
                  className="rounded-full mt-4"
                  onClick={() =>
                    navigate({
                      to: "/recipes",
                      search: { q: undefined, category: undefined },
                    })
                  }
                  data-ocid="profile.secondary_button"
                >
                  Browse Recipes
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedRecipes.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={i} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
