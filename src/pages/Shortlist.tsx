import { useCollege } from "@/context/CollegeContext";
import { CollegeCard } from "@/components/CollegeCard";
import { GraduationCap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Shortlist() {
  const { shortlist } = useCollege();

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto h-16 w-16 mb-4 flex items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <Heart className="h-8 w-8 fill-current" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Your Shortlist
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Colleges you have saved across sessions
          </p>
        </div>

        {shortlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <GraduationCap className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              No colleges saved yet
            </h3>
            <p className="mt-2 mb-6 text-muted-foreground max-w-md">
              Start exploring and click the heart icon to save colleges you are interested in.
            </p>
            <Link to="/find">
              <Button variant="hero">Explore Colleges</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlist.map((college, index) => (
              <div
                key={college.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CollegeCard college={college} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
