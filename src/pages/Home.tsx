import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CollegeCard } from "@/components/CollegeCard";
import { HowItWorks } from "@/components/HowItWorks";
import { colleges } from "@/lib/collegeData";
import { ArrowRight, Sparkles, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  const featuredColleges = colleges.filter((c) => c.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Smart College Matching
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              Find colleges where you{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                actually have a chance
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
              CollegeXed analyzes your academic profile, exam scores, and budget to match you 
              with colleges that fit—complete with personalized admission probabilities.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Link to="/find">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Find My College
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Colleges Listed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Students Helped</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Colleges */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Featured Colleges
              </h2>
              <p className="mt-2 text-muted-foreground">
                Top-rated institutions for your academic journey
              </p>
            </div>
            <Link to="/find">
              <Button variant="outline" className="group">
                View All Colleges
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredColleges.map((college, index) => (
              <div
                key={college.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CollegeCard college={college} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to find your perfect college?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Enter your details and discover colleges that match your profile, budget, and aspirations.
          </p>
          <Link to="/find">
            <Button variant="accent" size="xl" className="mt-8 group">
              Get Started Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}