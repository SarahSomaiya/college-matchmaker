import { College, formatFees, getChanceLevel, calculateAdmissionChance } from "@/lib/collegeData";
import { placeholderImage } from "@/lib/collegeImages";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Check, Plus, TrendingUp, Wallet, Users, Heart, ExternalLink } from "lucide-react";
import { useCollege } from "@/context/CollegeContext";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CollegeCardProps {
  college: College;
  showChance?: boolean;
  examScore?: number;
  budget?: number;
}

export function CollegeCard({ college, showChance = false, examScore = 0, budget = 0 }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isSelected, addToShortlist, removeFromShortlist, isShortlisted } = useCollege();
  const selected = isSelected(college.id);
  const shortlisted = isShortlisted(college.id);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const admissionChance = showChance ? calculateAdmissionChance(college, examScore, budget) : 0;
  const chanceLevel = getChanceLevel(admissionChance);

  const handleToggleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college);
    }
  };

  const handleToggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shortlisted) {
      removeFromShortlist(college.id);
    } else {
      addToShortlist(college);
    }
  };

  const websiteUrl = `https://www.google.com/search?q=${encodeURIComponent(college.name + " official website")}`;

  return (
    <Card
      onClick={() => navigate(`/college/${college.id}`)}
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-card-hover shadow-card border-border/50 cursor-pointer flex flex-col",
        selected && "ring-2 ring-primary"
      )}
    >
      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={imageError ? placeholderImage : college.image}
          alt={college.name}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {college.featured && (
          <Badge className="absolute top-3 left-3 gradient-accent border-0">Featured</Badge>
        )}
        
        <button
          onClick={handleToggleShortlist}
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md transition-colors hover:bg-background/80 z-10 hover:scale-110"
        >
          <Heart className={cn("h-4 w-4 transition-colors", shortlisted ? "fill-red-500 text-red-500" : "text-foreground")} />
        </button>
        
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1 text-primary-foreground">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-semibold">{college.rating}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {college.name}
        </h3>
        
        <div className="mt-2 flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span>{college.location}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {college.streams.slice(0, 3).map((stream) => (
            <Badge key={stream} variant="secondary" className="text-xs font-medium">
              {stream}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">Fees</span>
            <p className="font-display text-lg font-bold text-primary">{formatFees(college.fees)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              title="Official Website"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <Button
              variant={selected ? "default" : "outline"}
              size="sm"
              onClick={handleToggleSelect}
              className="gap-1"
            >
              {selected ? (
                <>
                  <Check className="h-4 w-4" /> Selected
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Compare
                </>
              )}
            </Button>
          </div>
        </div>

        {showChance && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Admission Chance</span>
              <span
                className={cn(
                  "font-display text-lg font-bold",
                  chanceLevel === "high" && "chance-high",
                  chanceLevel === "medium" && "chance-medium",
                  chanceLevel === "low" && "chance-low"
                )}
              >
                {admissionChance}%
              </span>
            </div>
            <Progress
              value={admissionChance}
              className={cn(
                "h-2",
                chanceLevel === "high" && "[&>div]:bg-chance-high",
                chanceLevel === "medium" && "[&>div]:bg-chance-medium",
                chanceLevel === "low" && "[&>div]:bg-chance-low"
              )}
            />
            
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span>
                  Score {examScore >= college.examScoreRange.min ? "meets" : "below"} requirement ({college.examScoreRange.min}-{college.examScoreRange.max})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-primary" />
                <span>
                  Budget {budget >= college.fees ? "covers" : "below"} fees
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>{college.acceptanceRate}% acceptance rate</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}