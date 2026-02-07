import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollegeCard } from "@/components/CollegeCard";
import { colleges, streams, exams, formatFees } from "@/lib/collegeData";
import { useCollege } from "@/context/CollegeContext";
import { Search, SlidersHorizontal, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Find() {
  const { searchParams, setSearchParams, searchResults, setSearchResults, selectedColleges } = useCollege();
  
  const [formData, setFormData] = useState({
    studentName: searchParams?.studentName || "",
    stream: searchParams?.stream || "",
    exam: searchParams?.exam || "",
    examScore: searchParams?.examScore || 200,
    budgetRange: [searchParams?.minBudget || 50000, searchParams?.maxBudget || 500000],
  });
  
  const [hasSearched, setHasSearched] = useState(searchResults.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const results = colleges.filter((college) => {
      const matchesStream = !formData.stream || college.streams.includes(formData.stream);
      const matchesBudget = college.fees >= formData.budgetRange[0] && college.fees <= formData.budgetRange[1];
      return matchesStream && matchesBudget;
    });

    setSearchParams({
      studentName: formData.studentName,
      stream: formData.stream,
      exam: formData.exam,
      examScore: formData.examScore,
      minBudget: formData.budgetRange[0],
      maxBudget: formData.budgetRange[1],
    });
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Find Your Perfect College
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Enter your details below and we'll show you colleges that match your profile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 font-display">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stream">Stream / Field of Study</Label>
                    <Select
                      value={formData.stream}
                      onValueChange={(value) => setFormData({ ...formData, stream: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {streams.map((stream) => (
                          <SelectItem key={stream} value={stream}>
                            {stream}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exam">Entrance Exam</Label>
                    <Select
                      value={formData.exam}
                      onValueChange={(value) => setFormData({ ...formData, exam: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {exams.map((exam) => (
                          <SelectItem key={exam} value={exam}>
                            {exam}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="score">Exam Score (out of 300)</Label>
                    <Input
                      id="score"
                      type="number"
                      min={0}
                      max={300}
                      placeholder="Enter your score"
                      value={formData.examScore}
                      onChange={(e) => setFormData({ ...formData, examScore: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Budget Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {formatFees(formData.budgetRange[0])} - {formatFees(formData.budgetRange[1])}
                      </span>
                    </div>
                    <Slider
                      min={10000}
                      max={1000000}
                      step={10000}
                      value={formData.budgetRange}
                      onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                      className="py-2"
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full group">
                    <Search className="h-4 w-4" />
                    Find Colleges
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {!hasSearched ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-2xl gradient-hero flex items-center justify-center mb-6">
                  <GraduationCap className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Start Your Search
                </h3>
                <p className="mt-2 text-muted-foreground max-w-md">
                  Fill in your details on the left and click "Find Colleges" to see matching results
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-muted-foreground">No colleges found matching your criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Found <span className="font-semibold text-foreground">{searchResults.length}</span> colleges
                      {formData.studentName && ` for ${formData.studentName}`}
                    </p>
                  </div>
                  {selectedColleges.length > 1 && (
                    <Link to="/compare">
                      <Button variant="accent" size="sm">
                        Compare Selected
                        <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground">
                          {selectedColleges.length}
                        </Badge>
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {searchResults.map((college, index) => (
                    <div
                      key={college.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CollegeCard
                        college={college}
                        showChance
                        examScore={formData.examScore}
                        budget={formData.budgetRange[1]}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}