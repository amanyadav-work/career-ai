import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RoadmapCard({ roadmap }) {
  const { _id, roadmapTitle, description, initialNodes, createdAt } = roadmap;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Count nodes for badge
  const nodeCount = initialNodes?.length || 0;

  return (
    <Link href={`/roadmap/${_id}`}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md border-2 hover:border-blue-300">
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1 text-lg font-bold">{roadmapTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Badge variant="outline" className="bg-primary/50 text-white">
            {nodeCount} {nodeCount === 1 ? 'Step' : 'Steps'}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formattedDate}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
