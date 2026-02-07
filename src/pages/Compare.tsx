import { useCollege } from "@/context/CollegeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAdmissionChance, formatFees, getChanceLevel } from "@/lib/collegeData";
import { Link } from "react-router-dom";
import { ArrowLeft, X, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const CHART_COLORS = [
  "hsl(174, 62%, 38%)",
  "hsl(16, 85%, 60%)",
  "hsl(210, 55%, 50%)",
  "hsl(45, 90%, 50%)",
  "hsl(280, 60%, 50%)",
];

export default function Compare() {
  const { selectedColleges, removeFromCompare, searchParams, clearCompare } = useCollege();

  const examScore = searchParams?.examScore || 200;
  const budget = searchParams?.maxBudget || 500000;

  const chartData = selectedColleges.map((college, index) => ({
    name: college.name.split(" ").slice(0, 2).join(" "),
    value: calculateAdmissionChance(college, examScore, budget),
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  if (selectedColleges.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-6">
              <BarChart3 className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              No Colleges Selected
            </h2>
            <p className="mt-3 text-muted-foreground">
              Select at least two colleges from the Find page to compare them here.
            </p>
            <Link to="/find">
              <Button variant="hero" className="mt-6">
                <ArrowLeft className="h-4 w-4" />
                Find Colleges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (selectedColleges.length === 1) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <BarChart3 className="h-10 w-10 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Need One More College
            </h2>
            <p className="mt-3 text-muted-foreground">
              You've selected <strong>{selectedColleges[0].name}</strong>. 
              Select at least one more college to compare.
            </p>
            <Link to="/find">
              <Button variant="hero" className="mt-6">
                <ArrowLeft className="h-4 w-4" />
                Add More Colleges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Compare Colleges
            </h1>
            <p className="mt-2 text-muted-foreground">
              Comparing {selectedColleges.length} colleges side by side
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearCompare}>
              Clear All
            </Button>
            <Link to="/find">
              <Button variant="default">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Button>
            </Link>
          </div>
        </div>

        {/* Selected Colleges Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedColleges.map((college, index) => (
            <div
              key={college.id}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}20`, color: CHART_COLORS[index % CHART_COLORS.length] }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
              {college.name.split(" ").slice(0, 3).join(" ")}
              <button
                onClick={() => removeFromCompare(college.id)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Admission Chance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Admission Chance"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>College</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Chance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedColleges.map((college, index) => {
                      const chance = calculateAdmissionChance(college, examScore, budget);
                      const level = getChanceLevel(chance);
                      return (
                        <TableRow key={college.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                              />
                              <span className="font-medium text-foreground line-clamp-1">
                                {college.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {college.location.split(",")[0]}
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">
                            {formatFees(college.fees)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "font-bold",
                                level === "high" && "chance-high",
                                level === "medium" && "chance-medium",
                                level === "low" && "chance-low"
                              )}
                            >
                              {chance}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Streams Comparison */}
        <Card className="mt-8 shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Streams Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College</TableHead>
                    <TableHead>Available Streams</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedColleges.map((college, index) => (
                    <TableRow key={college.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                          />
                          <span className="font-medium">{college.name.split(" ").slice(0, 3).join(" ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          {college.streams.map((stream) => (
                            <span
                              key={stream}
                              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                            >
                              {stream}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}