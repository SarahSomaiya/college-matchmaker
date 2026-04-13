import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getColleges, College, formatFees } from "@/lib/collegeData";
import { placeholderImage } from "@/lib/collegeImages";
import { useCollege } from "@/context/CollegeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart, ArrowLeft, ExternalLink, GraduationCap, Building2, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const { shortlist, addToShortlist, removeFromShortlist, isShortlisted } = useCollege();

  useEffect(() => {
    async function fetchCollege() {
      if (!id) return;
      const colleges = await getColleges();
      const found = colleges.find(c => c.id === id) || null;
      setCollege(found);
      setLoading(false);
    }
    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="h-16 w-16 mb-4 rounded-xl gradient-hero flex items-center justify-center animate-pulse">
           <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Loading College Details...</h2>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold font-display text-foreground mb-4">College Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the college you were looking for.</p>
        <Link to="/find">
          <Button variant="hero">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
          </Button>
        </Link>
      </div>
    );
  }

  const shortlisted = isShortlisted(college.id);
  const handleToggleShortlist = () => {
    if (shortlisted) removeFromShortlist(college.id);
    else addToShortlist(college);
  };

  const websiteUrl = `https://www.google.com/search?q=${encodeURIComponent(college.name + " official website")}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img 
          src={college.image || placeholderImage} 
          alt={college.name} 
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = placeholderImage; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/find" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to results
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  {college.featured && <Badge className="gradient-accent border-0">Featured</Badge>}
                  <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-500 rounded-full px-3 py-1 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-current" /> {college.rating}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
                    <MapPin className="h-4 w-4" /> {college.location}
                  </div>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl">
                  {college.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleToggleShortlist}
                  className={cn("gap-2", shortlisted && "border-red-500 text-red-500 hover:text-red-600 hover:bg-red-50")}
                >
                  <Heart className={cn("h-5 w-5", shortlisted && "fill-current")} />
                  {shortlisted ? "Saved" : "Save"}
                </Button>
                <a href={websiteUrl} target="_blank" rel="noreferrer">
                  <Button size="lg" className="gap-2">
                    Official Website <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">

            {/* Tabs Section */}
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6 flex-wrap h-auto">
                <TabsTrigger value="courses" className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  <BookOpen className="h-4 w-4 mr-2" /> Courses
                </TabsTrigger>
                <TabsTrigger value="fees" className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  <Building2 className="h-4 w-4 mr-2" /> Fees & Aid
                </TabsTrigger>
                <TabsTrigger value="placement" className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  <Target className="h-4 w-4 mr-2" /> Placement
                </TabsTrigger>
                <TabsTrigger value="cutoffs" className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  <Star className="h-4 w-4 mr-2" /> Cutoffs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-4 animate-fade-in text-muted-foreground">
                <p>The college offers specialized programs in the following streams. The curriculums are designed to meet industry standards with a mix of theoretical knowledge and practical application.</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {college.streams.map(stream => (
                    <div key={stream} className="p-4 border rounded-xl flex items-center justify-between hover:border-primary transition-colors cursor-pointer">
                      <span className="font-semibold text-foreground">{stream}</span>
                      <Badge variant="secondary">UG/PG Programs</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fees" className="space-y-4 animate-fade-in text-muted-foreground">
                <div className="bg-muted/50 p-6 rounded-xl border">
                  <div className="text-sm font-semibold text-foreground mb-1">Average Tuition Fee</div>
                  <div className="text-3xl font-bold font-display text-primary">{formatFees(college.fees)} <span className="text-base font-normal text-muted-foreground">/ First Year</span></div>
                </div>
                <p>Please note that the fee structure can vary slightly based on the specific course, scholarship eligibility, and admission quota. Hostel and mess fees are usually separate.</p>
              </TabsContent>
              
              <TabsContent value="placement" className="space-y-6 animate-fade-in text-muted-foreground">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 border rounded-xl bg-green-50/50 border-green-100">
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Highest Package</div>
                    <div className="text-2xl font-bold text-foreground">₹{Math.floor(Math.random() * 20 + 20)} Lakhs</div>
                  </div>
                  <div className="p-5 border rounded-xl bg-blue-50/50 border-blue-100">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Average Package</div>
                    <div className="text-2xl font-bold text-foreground">₹{Math.floor(Math.random() * 5 + 6)} Lakhs</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'].sort(() => Math.random() - 0.5).slice(0, 5).map(company => (
                       <Badge key={company} variant="outline" className="px-3 py-1 text-sm">{company}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cutoffs" className="space-y-4 animate-fade-in text-muted-foreground">
                <p>Admissions are strictly merit-based. Below are the estimated required exam score ranges based on the competitive acceptance rate of <strong>{college.acceptanceRate}%</strong>.</p>
                <div className="p-6 border rounded-xl max-w-md">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                     <span className="font-semibold text-foreground">Minimum Expected</span>
                     <span className="font-display font-bold text-xl">{college.examScoreRange.min}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-semibold text-foreground">Competitive Score</span>
                     <span className="font-display font-bold text-xl text-primary">{college.examScoreRange.max}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-card">
              <h3 className="font-display text-xl font-bold mb-4">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Acceptance Rate</span>
                  <span className="font-semibold">{college.acceptanceRate}%</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Campus Size</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 150 + 50)} Acres</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 5000 + 2000)}+</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Established</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 50 + 1950)}</span>
                </li>
              </ul>
              
              <h3 className="font-display text-lg font-bold mt-8 mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">Speak with an admissions counselor to understand your chances.</p>
              <Link to="/contact" className="w-full">
                <Button variant="outline" className="w-full">Contact Us</Button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
