"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Users, Briefcase, BarChart3, Target, AlertCircle, Brain } from "lucide-react";

const MarketTrends = () => {
  const trendingSkills = [
    {
      skill: "AI/Machine Learning",
      trend: "up",
      growth: "+45%",
      avgSalary: "$145,000",
      demand: "Very High",
      description: "Explosive growth in AI adoption across industries"
    },
    {
      skill: "React/Next.js",
      trend: "up",
      growth: "+28%",
      avgSalary: "$125,000",
      demand: "High",
      description: "Continued dominance in frontend development"
    },
    {
      skill: "TypeScript",
      trend: "up",
      growth: "+35%",
      avgSalary: "$120,000",
      demand: "High",
      description: "Becoming standard for JavaScript development"
    },
    {
      skill: "Cloud Architecture",
      trend: "up",
      growth: "+40%",
      avgSalary: "$155,000",
      demand: "Very High",
      description: "Critical as companies move to cloud-first strategies"
    },
    {
      skill: "DevOps/SRE",
      trend: "up",
      growth: "+30%",
      avgSalary: "$140,000",
      demand: "High",
      description: "Essential for modern software delivery"
    },
    {
      skill: "jQuery",
      trend: "down",
      growth: "-15%",
      avgSalary: "$85,000",
      demand: "Low",
      description: "Being replaced by modern frameworks"
    }
  ];

  const industryTrends = [
    {
      industry: "Technology",
      hiring: "+25%",
      avgSalary: "$135,000",
      hotRoles: ["AI Engineer", "Full-Stack Developer", "DevOps Engineer"],
      outlook: "Excellent"
    },
    {
      industry: "Healthcare Tech",
      hiring: "+35%",
      avgSalary: "$128,000",
      hotRoles: ["Health Data Analyst", "Telemedicine Developer", "AI Researcher"],
      outlook: "Excellent"
    },
    {
      industry: "Fintech",
      hiring: "+20%",
      avgSalary: "$142,000",
      hotRoles: ["Blockchain Developer", "Security Engineer", "Data Scientist"],
      outlook: "Very Good"
    },
    {
      industry: "E-commerce",
      hiring: "+18%",
      avgSalary: "$118,000",
      hotRoles: ["Frontend Developer", "Platform Engineer", "Mobile Developer"],
      outlook: "Good"
    }
  ];

  const salaryTrends = [
    {
      role: "Senior Software Engineer",
      location: "San Francisco",
      salary: "$165,000 - $220,000",
      change: "+12%",
      trend: "up"
    },
    {
      role: "Senior Software Engineer",
      location: "New York",
      salary: "$145,000 - $190,000",
      change: "+8%",
      trend: "up"
    },
    {
      role: "Senior Software Engineer",
      location: "Austin",
      salary: "$125,000 - $165,000",
      change: "+15%",
      trend: "up"
    },
    {
      role: "Senior Software Engineer",
      location: "Remote",
      salary: "$130,000 - $175,000",
      change: "+20%",
      trend: "up"
    }
  ];

  const emergingTechnologies = [
    {
      tech: "Large Language Models",
      adoptionRate: "85%",
      timeToLearn: "3-6 months",
      demandScore: 95,
      description: "Revolutionizing software development and automation"
    },
    {
      tech: "Edge Computing",
      adoptionRate: "60%",
      timeToLearn: "2-4 months",
      demandScore: 80,
      description: "Processing data closer to its source for better performance"
    },
    {
      tech: "WebAssembly",
      adoptionRate: "35%",
      timeToLearn: "4-6 months",
      demandScore: 70,
      description: "Running high-performance code in web browsers"
    },
    {
      tech: "Quantum Computing",
      adoptionRate: "15%",
      timeToLearn: "12+ months",
      demandScore: 60,
      description: "Next-generation computing for complex problem solving"
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case "Very High":
        return "bg-green-100 text-green-800 border-green-200";
      case "High":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="gap-4 md:grid-cols-3 border rounded-sm">
      <div className="flex container mx-auto py-10 flex-col space-y-8">
        {/* Welcome Section */}
        <div className="mb-8 px-4 md:px-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Market Trends</h2>
              <p className="text-muted-foreground">Explore current job market insights and salary information</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1 flex items-center">
              <Brain className="w-4 h-4 mr-1" />
              Pro Plan
            </Badge>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Market Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+22%</div>
              <p className="text-xs text-muted-foreground">Tech jobs this quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Salary Increase</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">+15%</div>
              <p className="text-xs text-muted-foreground">Year over year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remote Opportunities</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">68%</div>
              <p className="text-xs text-muted-foreground">Of tech positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Gap</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2.3M</div>
              <p className="text-xs text-muted-foreground">Unfilled positions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Trending Skills</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="salaries">Salaries</TabsTrigger>
            <TabsTrigger value="emerging">Emerging Tech</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid gap-6">
              {trendingSkills.map((skill, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTrendIcon(skill.trend)}
                        <div>
                          <CardTitle className="text-lg">{skill.skill}</CardTitle>
                          <CardDescription>{skill.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getDemandColor(skill.demand)}>
                        {skill.demand} Demand
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-green-600">{skill.growth}</div>
                        <div className="text-sm text-muted-foreground">Growth Rate</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-primary">{skill.avgSalary}</div>
                        <div className="text-sm text-muted-foreground">Avg Salary</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button variant="outline" size="sm">
                          <Target className="w-4 h-4 mr-2" />
                          Learn This Skill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="industries" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {industryTrends.map((industry, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{industry.industry}</CardTitle>
                      <Badge variant={industry.outlook === 'Excellent' ? 'default' : 'secondary'}>
                        {industry.outlook}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-green-600">{industry.hiring}</div>
                        <div className="text-sm text-muted-foreground">Hiring Growth</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-primary">{industry.avgSalary}</div>
                        <div className="text-sm text-muted-foreground">Avg Salary</div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Hot Roles:</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.hotRoles.map((role, roleIndex) => (
                          <Badge key={roleIndex} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Explore {industry.industry} Jobs
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="salaries" className="space-y-6">
            <div className="space-y-4">
              {salaryTrends.map((salary, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{salary.role}</CardTitle>
                        <CardDescription>{salary.location}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <Badge className="bg-green-100 text-green-800">
                          {salary.change} YoY
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary mb-2">{salary.salary}</div>
                    <p className="text-sm text-muted-foreground">
                      Base salary range based on recent market data
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardHeader>
                <CardTitle>Salary Negotiation Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  With the current market trends showing strong growth, it's a great time to negotiate. 
                  Highlight your skills in high-demand areas like AI/ML and cloud technologies.
                </p>
                <Button>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Get Personalized Salary Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emerging" className="space-y-6">
            <div className="grid gap-6">
              {emergingTechnologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tech.tech}</CardTitle>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{tech.demandScore}/100</div>
                        <div className="text-xs text-muted-foreground">Demand Score</div>
                      </div>
                    </div>
                    <CardDescription>{tech.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-blue-600">{tech.adoptionRate}</div>
                        <div className="text-sm text-muted-foreground">Adoption Rate</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-orange-600">{tech.timeToLearn}</div>
                        <div className="text-sm text-muted-foreground">Time to Learn</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Badge 
                          variant={tech.demandScore > 80 ? 'default' : tech.demandScore > 60 ? 'secondary' : 'outline'}
                        >
                          {tech.demandScore > 80 ? 'Hot' : tech.demandScore > 60 ? 'Growing' : 'Emerging'}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Learn More About {tech.tech}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Future-Proof Your Career</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">
                  Stay ahead of the curve by investing time in emerging technologies. 
                  Early adoption of these skills can significantly boost your career prospects.
                </p>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                  <Target className="w-4 h-4 mr-2" />
                  Get Personalized Tech Recommendations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketTrends;
