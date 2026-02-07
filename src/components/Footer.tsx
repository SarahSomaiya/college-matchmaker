import { GraduationCap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">CollegeXed</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/find" className="text-muted-foreground hover:text-primary transition-colors">
              Find Colleges
            </Link>
            <Link to="/compare" className="text-muted-foreground hover:text-primary transition-colors">
              Compare
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for students
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> Admission probabilities are indicative and not guaranteed. 
            Actual admissions depend on multiple factors.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} CollegeXed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}