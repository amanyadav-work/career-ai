"use client";
import { useState } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JobList({ jobs }) {
  const [selectedJob, setSelectedJob] = useState(null);

  if (!jobs || jobs.length === 0) {
    return (
      <Alert variant="default" className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No jobs found matching your search criteria. Try adjusting your filters.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard 
            key={job.id || `${job.title}-${job.company}`} 
            job={job}
            onClick={(job) => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}
