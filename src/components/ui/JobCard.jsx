import { Calendar, ExternalLink, Users } from "lucide-react";

export default function JobCard({ job, onClick }) {
  // Format the date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    // Format as "Sep 25, 11:00 AM" without the year
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ", " + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get organization name from either company or organization field
  const companyName = job.organization || job.company;

  // Calculate deadline date with better formatting
  const deadline = job.date_validthrough ? formatDeadline(job.date_validthrough) : "by 2 Oct";

  // Job type (webinar, hiring challenge)
  const jobType = job.event_type || "Webinar";
  const isChallenge = job.title?.toLowerCase().includes('challenge') || false;
  const isChallengeOrOffer = isChallenge || job.employment_type?.[0]?.includes("INTERN");

  // Enrollment count
  const enrolledCount = job.linkedin_org_employees || job.linkedin_org_followers || Math.floor(Math.random() * 200) + 1;

  // Get tags/skills
  const tags = ['Windows Server', 'Scripting', 'DNS', 'SQL'];

  // Format date with time (like "25 Sep, 11:00 AM")
  const formattedDate = job.date_posted ? formatDate(job.date_posted) : "Sep 19, 11:00 AM";

  // Determine if we have a full description to display
  const hasFullDescription = job.description && job.description.length > 0;
  const randomImgs = () => {
    const imgs = ['https://www.openaccessgovernment.org/wp-content/uploads/2019/03/dreamstime_s_113807824.jpg','/post-banner.jpg', 'https://www.cv-library.co.uk/career-advice/wp-content/uploads/2018/06/What-is-it-like-working-in-IT-e1651761435165.jpg','https://blog.naiop.org/wp-content/uploads/2022/09/Coworking-space-800px-2.jpg','https://workspacestrat.com/wp-content/uploads/2018/03/shutterstock_525266194.jpg'];
    return imgs[Math.floor(Math.random() * imgs.length)];
  }
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(job)}
    >
      {/* Top image section */}
      <div className="relative h-40 overflow-hidden">
        {/* Background image */}
        <img
          src={job.banner_image || randomImgs()}
          alt={job.title}
          className="w-full h-fit  object-cover object-center"
        />

        {/* Dark overlay */}

        {/* Entry closes tag */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-md">
          Entry closes {deadline}
        </div>

        {/* Job type tag */}
        <div className="absolute top-4 right-4 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-md shadow-sm">
          {isChallenge ? "Hiring challenge" : jobType}
        </div>
      </div>

      {/* Company logo & title section */}
      <div className="p-4 flex items-start gap-3">
        <div className="h-10 w-10 bg-white rounded-md shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
          {job.organization_logo ? (
            <img
              src={job.organization_logo}
              alt={companyName}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              {companyName?.charAt(0) || "C"}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium text-base leading-tight mb-1">{job.title || "Cloud Operation Engineering hiring challenge"}</h3>
          <p className="text-sm text-gray-600">{companyName || "PowerSchool India"}</p>
        </div>
      </div>

      {/* Tags section */}
      <div className="px-4 flex flex-wrap gap-2 mt-1">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Date and enrollment */}
      <div className="px-4 py-3 mt-2 flex items-center gap-4 text-gray-600 text-sm">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span>{enrolledCount} Enrolled</span>
        </div>
      </div>

      {/* If we have a full description due to description_type=text, add a preview */}
      {hasFullDescription && (
        <div className="px-4 py-2 border-t border-gray-100">
          <h4 className="text-xs font-medium mb-1 text-gray-700">Job Description Preview:</h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {job.description}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto px-4 py-3 flex justify-between items-center border-t border-gray-100">
        <div className={`text-xs font-medium uppercase px-2 py-1 rounded ${isChallengeOrOffer ? "bg-blue-100 text-blue-800" : "border border-gray-300 text-gray-700"}`}>
          {isChallengeOrOffer ? "Job offer" : "Learn from experts"}
        </div>

        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            window.open(job.url || "#", '_blank', 'noopener,noreferrer');
          }}
        >
          View details
          <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </button>
      </div>
    </div>
  );
}

// Helper function for deadline formatting
function formatDeadline(dateString) {
  if (!dateString) return "soon";

  const deadline = new Date(dateString);
  const today = new Date();

  // If it's today
  if (deadline.toDateString() === today.toDateString()) {
    return "today";
  }

  // If it's within a week
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return `in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  }

  // Just show the date like "by 25 Sep"
  return `by ${deadline.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short'
  })}`;
}
