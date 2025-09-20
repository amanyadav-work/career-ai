'use client'

import Head from 'next/head'
import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip } from 'recharts'
import { Navbar1 } from '@/components/ui/Header'
import { Hero1 } from '@/components/hero1'
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Target,
  Map,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
const features = [
  {
    icon: Brain,
    title: "AI-Powered Career Guidance",
    description: "Get personalized career recommendations based on your skills, interests, and market trends.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description: "Identify the skills you need to develop to reach your career goals.",
  },
  {
    icon: Map,
    title: "Personalized Roadmaps",
    description: "Follow step-by-step career advancement plans tailored to your aspirations.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description: "Stay updated with the latest industry trends and job market dynamics.",
  },
];

const stats = [
  { value: "50K+", label: "Career Paths Analyzed" },
  { value: "95%", label: "Success Rate" },
  { value: "1000+", label: "Companies" },
  { value: "24/7", label: "AI Support" },
];

export default function Home() {
  const patientGrowth = [
    { month: 'Jan', patients: 120 },
    { month: 'Feb', patients: 200 },
    { month: 'Mar', patients: 250 },
    { month: 'Apr', patients: 300 },
    { month: 'May', patients: 350 },
    { month: 'Jun', patients: 400 },
  ]
  const revenue = [
    { month: 'Jan', revenue: 5 },
    { month: 'Feb', revenue: 8 },
    { month: 'Mar', revenue: 12 },
    { month: 'Apr', revenue: 15 },
    { month: 'May', revenue: 18 },
    { month: 'Jun', revenue: 22 },
  ]
  const chartConfig1 = { growth: { label: 'Patients', color: 'var(--chart-1)' } }
  const chartConfig2 = { rev: { label: 'Revenue ($k)', color: 'var(--chart-2)' } }

  return (
    <>
      <Head>
        <title>HealthSync Analytics</title>
        <meta name="description" content="Healthcare SaaS dashboard using shadcn UI and Tailwind CSS" />
      </Head>
      <header className='w-full mx-auto fixed bg-background z-50 shadow-md'>
        <Navbar1 />
      </header>
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/30 to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNhODU1ZjciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjMiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="container mx-auto px-4 py-20 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit">
                    <Zap className="w-3 h-3 mr-1" />
                    Powered by AI
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Unlock Your{" "}
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Career Potential
                    </span>{" "}
                    with AI
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Navigate your career journey with AI-powered insights, personalized roadmaps, and real-time market intelligence.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="group">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" size="lg">
                      View Demo
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
                <img
                  src="/career-ai-hero.jpg"
                  alt="Career AI Platform"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Career AI?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform combines cutting-edge technology with career expertise to guide you towards success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-blue-600/10 to-purple-600/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of professionals who are already using Career AI to accelerate their career growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="group">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/pages/careerpath">
                  <Button variant="outline" size="lg">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
