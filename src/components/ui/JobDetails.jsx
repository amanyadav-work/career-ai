"use client";
import { useEffect } from "react";
import { 
  Building, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Briefcase,
  Globe,
  Users,
  BadgeInfo,
  X
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function JobDetails({ job, onClose }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Generate a map link for the job location
  const getMapLink = (job) => {
    if (job.lats_derived?.[0] && job.lngs_derived?.[0]) {
      return `https://maps.google.com/?q=${job.lats_derived[0]},${job.lngs_derived[0]}`;
    }
    return null;
  };

  // Get organization name from either company or organization field
  const companyName = job.organization || job.company;
  
  // Get job location
  const location = job.locations_derived?.[0] || job.location || "Remote";
  
  // Get map link
  const mapLink = getMapLink(job);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-start justify-between">
            <span>{job.title}</span>
            {job.employment_type && (
              <Badge variant="outline">
                {job.employment_type[0]?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Full-time"}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="flex items-center">
            {job.organization_logo && (
              <img 
                src={job.organization_logo} 
                alt={`${companyName} logo`} 
                className="h-6 w-6 mr-2 rounded-sm" 
              />
            )}
            <span className="text-foreground">{companyName}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1 text-sm">Location</h3>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{location}</span>
                {mapLink && (
                  <Button
                    variant="link"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(mapLink, "_blank", "noopener,noreferrer");
                    }}
                  >
                    (View Map)
                  </Button>
                )}
              </div>
              {job.remote_derived && (
                <Badge variant="secondary" className="mt-1">Remote Position</Badge>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-1 text-sm">Employment Type</h3>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{job.employment_type?.[0]?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Full-time"}</span>
              </div>
              {job.seniority && (
                <Badge variant="outline" className="mt-1">{job.seniority}</Badge>
              )}
            </div>

            {job.organization_url && (
              <div>
                <h3 className="font-medium mb-1 text-sm">Company Website</h3>
                <Button
                  variant="link"
                  className="p-0 h-auto flex items-center text-primary"
                  onClick={() => window.open(job.organization_url, "_blank", "noopener,noreferrer")}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Visit Company Website
                </Button>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1 text-sm">Date Posted</h3>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{formatDate(job.date_posted)}</span>
              </div>
            </div>

            {job.date_validthrough && (
              <div>
                <h3 className="font-medium mb-1 text-sm">Valid Through</h3>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{formatDate(job.date_validthrough)}</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-1 text-sm">Source</h3>
              <div className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="capitalize">{job.source || "Job Board"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        {job.linkedin_org_description && (
          <div className="mt-6">
            <Separator className="my-4" />
            <h3 className="font-medium mb-2">About the Company</h3>
            <p className="text-muted-foreground text-sm">{job.linkedin_org_description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {job.linkedin_org_followers && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Followers:</span> {job.linkedin_org_followers}
                  </span>
                </div>
              )}
              
              {job.linkedin_org_size && (
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Company Size:</span> {job.linkedin_org_size}
                  </span>
                </div>
              )}
              
              {job.linkedin_org_industry && (
                <div className="flex items-center">
                  <BadgeInfo className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Industry:</span> {job.linkedin_org_industry}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {job.url && (
            <Button 
              onClick={() => window.open(job.url, "_blank", "noopener,noreferrer")}
            >
              Apply Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}