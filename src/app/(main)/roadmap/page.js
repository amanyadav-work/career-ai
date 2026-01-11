// filepath: e:\Personal\Google Hackathon\Googlethon\src\app\(main)\roadmap\page.js
"use client";

import { useState, useEffect } from 'react';
import FormField from "@/components/ui/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoadmapCard from './_components/RoadmapCard';
import RoadmapDialog from '../dashboard/_components/RoadmapDialog';
import Loader from "@/components/ui/Loader";
import { SearchIcon, MapIcon, RefreshCw, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useFetch from '@/hooks/useFetch';

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use fetch hook for getting roadmaps
  const {
    isLoading,
    error,
    refetch: fetchRoadmaps
  } = useFetch({
    url: `/api/roadmap${debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : ''}`,
    onSuccess: (data) => {
      setRoadmaps(data.roadmaps || []);
    },
    onError: (error) => {
      console.error('Error fetching roadmaps:', error);
    }
  });

  // Refetch roadmaps when search term changes
  useEffect(() => {
    fetchRoadmaps();
  }, [debouncedSearch]);

  return (
    <div className="4xl:border rounded-sm">
      <img
        src={"/vr.jpg"}
        className="w-full saturate-50 max-h-[40vh] object-cover object-center rounded-sm"
      />
      <div className="container mx-auto py-10 flex flex-col space-y-8 xl:px-5">
        {/* Header Section - Styled like dashboard welcome section */}
        <div className="mb-2 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Career Roadmaps</h2>
              <p className="text-muted-foreground">Browse and create personalized career development paths</p>
            </div>

            <Badge variant="secondary" className="px-3 py-1 flex items-center">
              <MapIcon className="w-4 h-4 mr-1" />
              Career Planning
            </Badge>
          </div>
        </div>

        {/* Search and Create Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Find or Create Roadmaps</CardTitle>
            <CardDescription>
              Search for existing roadmaps or create your own custom career path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FormField
                  id="roadmap-search"
                  placeholder="Search roadmaps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<SearchIcon className="h-4 w-4" />}
                  className="w-full"
                />
              </div>
              <RoadmapDialog>
                <Button variant="default">
                  <Plus className="h-4 w-4" />
                  Create Roadmap
                </Button>
              </RoadmapDialog>
            </div>
          </CardContent>
        </Card>

        {/* Roadmaps Grid */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Available Roadmaps</CardTitle>
              <CardDescription>Career paths to help guide your professional development</CardDescription>
            </div>
            {!isLoading && !error && roadmaps.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fetchRoadmaps()}
                className="flex items-center"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Refresh
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="min-h-[400px] relative">
                <Loader text="Loading roadmaps..." size={30} />
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-destructive">Error: {error}</p>
                <Button variant="outline" className="mt-4" onClick={() => fetchRoadmaps()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            ) : roadmaps.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed rounded-xl">
                <h3 className="text-xl font-semibold mb-2">No roadmaps found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? 'Try a different search term or create a new roadmap.' : 'Get started by creating your first roadmap.'}
                </p>
                <RoadmapDialog>
                  <Button variant="default" size="lg">
                    <Plus className="h-4 w-4" />
                    Create Your First Roadmap
                  </Button>
                </RoadmapDialog>
              </div>
            ) : (
              <div>
                <div className="text-sm text-muted-foreground mb-4">
                  Found {roadmaps.length} roadmap{roadmaps.length !== 1 ? 's' : ''}
                  {searchTerm && ` matching "${searchTerm}"`}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roadmaps.map(roadmap => (
                    <RoadmapCard key={roadmap._id} roadmap={roadmap} />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}