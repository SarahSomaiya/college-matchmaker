import { ClipboardList, Search, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Enter Your Details",
    description: "Fill in your academic info, exam scores, and budget preferences.",
  },
  {
    icon: Search,
    title: "We Analyze & Match",
    description: "Our algorithm finds colleges that fit your profile and requirements.",
  },
  {
    icon: BarChart3,
    title: "View Your Chances",
    description: "See personalized admission probabilities and compare colleges.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Three simple steps to find your perfect college match
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl gradient-hero shadow-lg">
                <step.icon className="h-9 w-9 text-primary-foreground" />
              </div>
              
              <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                {index + 1}
              </div>
              
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}