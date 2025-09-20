"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, BookOpen, Award, AlertCircle, TrendingUp, Clock, Star, Brain } from "lucide-react";

const SkillGap = () => {
  const targetRole = {
    title: "Senior Full-Stack Engineer",
    company: "Tech Unicorn",
    match: 78
  };

  const skillGaps = [
    {
      skill: "System Design",
      current: 40,
      required: 85,
      priority: "Critical",
      timeToLearn: "3-4 months",
      resources: ["System Design Interview", "Designing Data-Intensive Applications"],
      category: "Architecture"
    },
    {
      skill: "TypeScript",
      current: 70,
      required: 90,
      priority: "High",
      timeToLearn: "1-2 months",
      resources: ["TypeScript Deep Dive", "Advanced TypeScript Course"],
      category: "Programming"
    },
    {
      skill: "AWS/Cloud",
      current: 30,
      required: 75,
      priority: "High",
      timeToLearn: "2-3 months",
      resources: ["AWS Certified Developer", "Cloud Architecture Patterns"],
      category: "Infrastructure"
    },
    {
      skill: "GraphQL",
      current: 20,
      required: 70,
      priority: "Medium",
      timeToLearn: "1-2 months",
      resources: ["GraphQL with React", "Apollo Client Mastery"],
      category: "API"
    },
    {
      skill: "Microservices",
      current: 25,
      required: 80,
      priority: "Medium",
      timeToLearn: "3-4 months",
      resources: ["Microservices Patterns", "Docker & Kubernetes"],
      category: "Architecture"
    }
  ];

  const strengthSkills = [
    { skill: "React.js", level: 95, category: "Frontend" },
    { skill: "JavaScript", level: 90, category: "Programming" },
    { skill: "Node.js", level: 85, category: "Backend" },
    { skill: "Git/GitHub", level: 90, category: "Tools" },
    { skill: "REST APIs", level: 85, category: "API" }
  ];

  const learningPath = [
    {
      phase: "Phase 1 (Month 1-2)",
      skills: ["TypeScript Advanced", "System Design Basics"],
      focus: "Foundation Building",
      status: "current"
    },
    {
      phase: "Phase 2 (Month 3-4)",
      skills: ["AWS Fundamentals", "System Design Intermediate"],
      focus: "Cloud & Architecture",
      status: "upcoming"
    },
    {
      phase: "Phase 3 (Month 5-6)",
      skills: ["Microservices", "GraphQL", "Advanced System Design"],
      focus: "Advanced Concepts",
      status: "future"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getGapPercentage = (current, required) => {
    return Math.round(((required - current) / required) * 100);
  };

  return (
    <div className="gap-4 md:grid-cols-3 border rounded-sm">
      <div className="flex container mx-auto py-10 flex-col space-y-8">
        {/* Welcome Section */}
        <div className="mb-8 px-4 md:px-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Skill Gap Analysis</h2>
              <p className="text-muted-foreground">Identify missing skills and create your learning plan</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1 flex items-center">
              <Brain className="w-4 h-4 mr-1" />
              Pro Plan
            </Badge>
          </div>
        </div>

        {/* Target Role Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Target Role Analysis
                </CardTitle>
                <CardDescription className="text-base">
                  {targetRole.title} at {targetRole.company}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{targetRole.match}%</div>
                <div className="text-sm text-muted-foreground">Current Match</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Progress value={targetRole.match} className="flex-1" />
              <span className="text-sm font-medium">{targetRole.match}%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You're close to meeting the requirements! Focus on the critical skills below to boost your match score to 95%+
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="gaps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gaps" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Skill Gaps
            </TabsTrigger>
            <TabsTrigger value="strengths" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Strengths
            </TabsTrigger>
            <TabsTrigger value="path" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Path
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gaps" className="space-y-6">
            <div className="grid gap-6">
              {skillGaps.map((gap, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {gap.skill}
                          <Badge variant="outline" className="text-xs">
                            {gap.category}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Gap: {getGapPercentage(gap.current, gap.required)}% to close
                        </CardDescription>
                      </div>
                      <Badge className={getPriorityColor(gap.priority)}>
                        {gap.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level</span>
                        <span>{gap.current}%</span>
                      </div>
                      <Progress value={gap.current} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Required Level</span>
                        <span>{gap.required}%</span>
                      </div>
                      <Progress value={gap.required} className="h-2 opacity-30" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Time to Learn</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{gap.timeToLearn}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Recommended Resources</span>
                        </div>
                        <div className="space-y-1">
                          {gap.resources.map((resource, resourceIndex) => (
                            <p key={resourceIndex} className="text-sm text-muted-foreground">
                              • {resource}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Learning {gap.skill}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {strengthSkills.map((strength, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {strength.skill}
                          <Badge variant="outline" className="text-xs">
                            {strength.category}
                          </Badge>
                        </CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{strength.level}%</div>
                        <div className="text-xs text-muted-foreground">Proficient</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={strength.level} className="mb-3" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      <span>This is one of your key strengths</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Leverage Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Your strong foundation in React.js and JavaScript gives you a competitive edge. 
                  Consider mentoring others in these areas while you develop your weaker skills.
                </p>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Explore Mentoring Opportunities
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="path" className="space-y-6">
            <div className="space-y-6">
              {learningPath.map((phase, index) => (
                <Card key={index} className={phase.status === 'current' ? 'ring-2 ring-primary/20 bg-primary/5' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{phase.phase}</CardTitle>
                      <Badge 
                        className={
                          phase.status === 'current' 
                            ? 'bg-primary/10 text-primary' 
                            : phase.status === 'upcoming'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {phase.status === 'current' ? 'Current' : 
                         phase.status === 'upcoming' ? 'Upcoming' : 'Future'}
                      </Badge>
                    </div>
                    <CardDescription>{phase.focus}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Skills to Develop:</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {phase.status === 'current' && (
                        <Button className="w-full">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Continue Current Phase
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardHeader>
                <CardTitle>Estimated Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Following this learning path, you can expect to reach 95%+ role match in approximately 6 months 
                  with consistent daily practice (1-2 hours/day).
                </p>
                <Button>
                  <Target className="w-4 h-4 mr-2" />
                  Create Personalized Schedule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillGap;
