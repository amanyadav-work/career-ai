'use client';

import { useParams } from "next/navigation";
import RoadmapFlow from "./_components/RoadmapFlow";
import useFetch from '@/hooks/useFetch';
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import Loader from "@/components/ui/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Reusable card component for roadmap metadata
function RoadmapInfoCard({ title, value, description }) {
  return (
    <Card className="shadow-sm gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold text-primary">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function RoadmapPage() {
  const params = useParams();
  const id = params?.id;
  const { data, error, isLoading } = useFetch({
    url: id ? `/api/roadmap?id=${id}` : '',
    method: 'GET',
    auto: true,
    withAuth: true,
  });

  // Format creation date if available
  const formattedDate = data?.createdAt 
    ? new Date(data.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <div className="border rounded-sm">
      <div className="container mx-auto py-10 flex flex-col space-y-8">
        {isLoading && (
          <Loader text="Loading roadmap data..." />
        )}
        
        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}
        
        {data && (
          <div className="space-y-8">
            {/* Roadmap Header - Styled like dashboard welcome section */}
            <div className="mb-8 px-4 md:px-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{data.roadmapTitle || 'Career Roadmap'}</h2>
                  {data.description && (
                    <p className="text-muted-foreground">{data.description}</p>
                  )}
                </div>
                <Badge variant="secondary" className="px-3 py-1 flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  Career Plan
                </Badge>
              </div>
            </div>
            
            {/* Roadmap Metadata - Using the reusable component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.duration && (
                <RoadmapInfoCard
                  title="Duration"
                  value={data.duration}
                  description="Estimated completion time"
                />
              )}
              
              {formattedDate && (
                <RoadmapInfoCard
                  title="Created"
                  value={formattedDate}
                  description="Roadmap creation date"
                />
              )}
              
              {data._id && (
                <RoadmapInfoCard
                  title="Roadmap ID"
                  value={data._id}
                  description="Unique identifier"
                />
              )}
            </div>
            
            {/* Roadmap Visualization - Styled like dashboard card */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Roadmap Visualization</CardTitle>
                <CardDescription>Visual representation of your career journey</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                {data.initialNodes && data.initialEdges ? (
                  <div className="border rounded-lg bg-accent/50 min-h-[500px]">
                    <RoadmapFlow
                      initialNodes={data.initialNodes}
                      initialEdges={data.initialEdges}
                    />
                  </div>
                ) : (
                  <div className="text-muted-foreground p-8 text-center bg-muted rounded-lg">
                    No roadmap visualization available.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {!isLoading && !error && (!data || !data.roadmapTitle) && (
          <Card>
            <CardHeader>
              <CardTitle>No Roadmap Found</CardTitle>
              <CardDescription>The requested roadmap could not be found or is not available</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground pt-4 pb-8">
              The roadmap you're looking for doesn't exist or you may not have permission to view it.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
