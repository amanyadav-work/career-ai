"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";
import RoadmapDialog from "./_components/RoadmapDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Target,
  Calendar,
  ArrowUpRight,
  Brain,
  Users,
  Award,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Page() {
  const { user } = useUser()
  const recentActivities = [
    { action: "Completed React Advanced course", time: "2 hours ago", type: "learning" },
    { action: "Applied to Senior Developer position", time: "1 day ago", type: "application" },
    { action: "Updated skill assessment", time: "3 days ago", type: "assessment" },
    { action: "Viewed market trends in AI/ML", time: "1 week ago", type: "research" },
  ];

  const skillProgress = [
    { skill: "React.js", current: 85, target: 95 },
    { skill: "TypeScript", current: 70, target: 90 },
    { skill: "Node.js", current: 60, target: 80 },
    { skill: "System Design", current: 40, target: 75 },
  ];

  return (
    <>
      <div className=" gap-4  md:grid-cols-3  4xl:border rounded-sm xl:px-5">
        {/* Left two columns combined for dashboard content */}
        <div className="flex container mx-auto py-10 flex-col space-y-8">
          {/* Welcome Section */}
          <div className="mb-8 px-4 md:px-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                <p className="text-muted-foreground">Here's your career progress overview</p>
              </div>
              <Badge variant="secondary" className="px-3 py-1 flex items-center">
                <Brain className="w-4 h-4 mr-1" />
                Pro Plan
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Career Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">87/100</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">24</div>
                <p className="text-xs text-muted-foreground">+3 this quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">156</div>
                <p className="text-xs text-muted-foreground">+23 new matches</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">42h</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skill Progress */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Skill Development Progress</CardTitle>
                      <CardDescription>Track your progress towards career goals</CardDescription>
                    </div>
                    <Link href="/skill-gap" passHref>
                      <Button as="a" variant="ghost" size="sm">
                        View All <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillProgress.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.skill}</span>
                        <span className="text-muted-foreground">{item.current}% / {item.target}%</span>
                      </div>
                      <Progress value={item.current} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Career Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Career Insights</CardTitle>
                  <CardDescription>Personalized recommendations for your growth</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">High Demand Skills Detected</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on current market trends, focusing on System Design and AWS will increase your job prospects by 40%.
                        </p>
                        <Link href="/roadmap" passHref>
                          <Button as="a" size="sm" variant="outline">View Roadmap</Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Upcoming Career Milestone</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          You're 2 months away from reaching Senior Developer level. Complete your TypeScript certification to accelerate progress.
                        </p>
                        <Link href="google.com/search?q=new milestone in ai" passHref>
                          <Button as="a" size="sm" variant="outline">View Path</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/skill-gap" passHref>
                    <Button as="a" variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Analyze Skill Gap
                    </Button>
                  </Link>
                  <Link href="/career-path" passHref>
                    <Button as="a" variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Explore Career Paths
                    </Button>
                  </Link>
                  <Link href="/market-trends" passHref>
                    <Button as="a" variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Market Insights
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
