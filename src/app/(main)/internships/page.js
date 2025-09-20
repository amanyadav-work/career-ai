"use client";
import { useState, useEffect } from "react";
import JobList from "@/components/ui/jobLists";
import SearchFilter from "@/components/ui/SearchFilter";
import useFetch from "@/hooks/useFetch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, BriefcaseIcon, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Loader from "@/components/ui/Loader";
import { Badge } from "@/components/ui/badge";

export default function InternshipsPage() {
  // State for API query parameters - updated to include all possible parameters
  const [apiParams, setApiParams] = useState({
    title_filter: "",
    advanced_title_filter: "",
    location_filter: "",
    description_filter: "",
    description_type: "",
    remote: "",
    agency: "",
    date_filter: "",
    offset: 0
  });

  // State to track if this is the initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // State to store all accumulated internships
  const [allInternships, setAllInternships] = useState([]);

  // Create the URL with query parameters
  const buildApiUrl = () => {
    const baseUrl = "https://internships-api.p.rapidapi.com/active-jb-7d";
    const queryParams = new URLSearchParams();
    
    // Only add parameters that have values
    Object.entries(apiParams).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // fetch API data
  const { data, isLoading, error, refetch } = useFetch({
    auto: true,
    url: buildApiUrl(),
    headers: {
      'x-rapidapi-key': '4c51d2645fmsh9871730fb9e2a06p16c564jsn990294cdf7d9',
      'x-rapidapi-host': 'internships-api.p.rapidapi.com'
    },
  });

  // Process data when it's received from the API
  useEffect(() => {
    if (data) {
      if (apiParams.offset === 0) {
        // Reset data on new search
        setAllInternships(data);
      } else {
        // Append data when loading more
        setAllInternships(prev => [...prev, ...data]);
      }
    }
  }, [data]);

  // Refetch when apiParams change (except on initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      refetch({ url: buildApiUrl() });
    } else {
      setIsInitialLoad(false);
    }
  }, [apiParams]);

  // API response example for testing/fallback
  const sampleApiResponse = [
    {
      "id": "1872893685",
      "date_posted": "2025-09-19T14:03:18",
      "date_created": "2025-09-19T14:06:39.732581",
      "title": "Digital Data Science Analyst Intern",
      "organization": "True Northon",
      "organization_url": "https://www.linkedin.com/company/truenorthon",
      "date_validthrough": "2026-03-18T14:03:18",
      "locations_raw": [
        {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "streetAddress": null
          },
          "latitude": 41.88323,
          "longitude": -87.6324
        }
      ],
      "location_type": "TELECOMMUTE",
      "location_requirements_raw": [
        {
          "@type": "Country",
          "name": "Chicago, Illinois, United States"
        }
      ],
      "salary_raw": null,
      "employment_type": [
        "INTERN"
      ],
      "url": "https://www.linkedin.com/jobs/view/digital-data-science-analyst-intern-at-true-northon-4301075824",
      "source_type": "jobboard",
      "source": "linkedin",
      "source_domain": "linkedin.com",
      "organization_logo": "https://media.licdn.com/dms/image/v2/D4D0BAQGiCYHbZ-pw_A/company-logo_200_200/B4DZkKpJUbHwAM-/0/1756820183067/clickmorph_digital_logo?e=2147483647&v=beta&t=HuoPucnDttRJsF-G_T_qpXQU35DJf7JUJUs44WaxM_s",
      "cities_derived": [
        "Chicago"
      ],
      "counties_derived": [
        "Cook County"
      ],
      "regions_derived": [
        "Illinois"
      ],
      "countries_derived": [
        "United States"
      ],
      "locations_derived": [
        "Chicago, Illinois, United States"
      ],
      "timezones_derived": [
        "America/Chicago"
      ],
      "lats_derived": [
        41.8755616
      ],
      "lngs_derived": [
        -87.6244212
      ],
      "remote_derived": true,
      "seniority": "Internship"
    }
  ];

  // dummy job data fallback
  const dummyJobs = [
    { id: 1, title: "Frontend Developer Intern", company: "Google", location: "Remote" },
    { id: 2, title: "Backend Engineer Intern", company: "Amazon", location: "Bangalore" },
    { id: 3, title: "Full Stack Developer Intern", company: "Microsoft", location: "Hyderabad" },
    { id: 4, title: "Data Analyst Intern", company: "TCS", location: "Pune" },
  ];

  // use accumulated internships if available, otherwise fallback to the response or dummy data
  const jobs = allInternships.length > 0 
    ? allInternships 
    : (data || sampleApiResponse || dummyJobs);

  // Handle the search and filter from the SearchFilter component
  const handleFilter = (filters) => {
    // Create a new parameters object with all possible API filters
    const newParams = {
      offset: 0 // Reset pagination when filters change
    };
    
    // Apply all filter parameters directly - they're already in the correct format
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams[key] = value;
      }
    });
    
    // Remove undefined or empty string values
    Object.keys(newParams).forEach(key => 
      !newParams[key] && delete newParams[key]
    );
    
    // Clear accumulated internships when filters change
    setAllInternships([]);
    setApiParams(newParams);
  };

  // Handle pagination - append data rather than replace
  const loadMore = () => {
    setApiParams(prev => ({
      ...prev,
      offset: prev.offset + 10 // Assuming each page has 10 results
    }));
  };

  return (
    <div className="border rounded-sm">
       <img 
          src={"/job-banner.png"}
          className="w-full h-fit object-contain"
        />
        
      <div className="container mx-auto py-10 flex flex-col space-y-8">
        {/* Header Section - Styled like dashboard welcome section */}
        <div className="mb-2 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Internship Opportunities</h2>
              <p className="text-muted-foreground">Discover and apply to relevant internships to kickstart your career</p>
            </div>
            
            <Badge variant="secondary" className="px-3 py-1 flex items-center">
              <BriefcaseIcon className="w-4 h-4 mr-1" />
              Job Search
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column - Filters */}
          <div className="md:col-span-1">
            <Card className="sticky top-10">
              <CardHeader className="pb-3">
                <CardTitle>Filter Internships</CardTitle>
                <CardDescription>
                  Refine your search to find the perfect match
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SearchFilter onFilter={handleFilter} />
                
                {/* Results count and active filter summary */}
                {!isLoading && !error && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Found {jobs.length} internship{jobs.length !== 1 ? 's' : ''}
                      {(apiParams.title_filter || apiParams.advanced_title_filter) && 
                        ` matching "${apiParams.title_filter || apiParams.advanced_title_filter}"`}
                      {apiParams.location_filter && ` in ${apiParams.location_filter}`}
                      {apiParams.remote === "true" && ` (Remote)`}
                      {apiParams.description_filter && ` with "${apiParams.description_filter}" in description`}
                      {apiParams.date_filter && ` posted since ${apiParams.date_filter}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Job Listings */}
          <div className="md:col-span-3">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Available Internships</CardTitle>
                  <CardDescription>Browse through internships that match your criteria</CardDescription>
                </div>
                {!isLoading && !error && jobs.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setIsInitialLoad(true);
                      // Clear accumulated internships on refresh
                      setAllInternships([]);
                      setApiParams(prev => ({ ...prev, offset: 0 }));
                      refetch({ url: buildApiUrl() });
                    }}
                    className="flex items-center"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Refresh
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {/* Loading state */}
                {isLoading && (
                    <Loader text="Loading internships" className='min-h-[300px]'/>
                )}
                
                {/* Error state */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Error loading internships: {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                {/* Job listings */}
                {!isLoading && !error && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Showing {jobs.length} internship{jobs.length !== 1 ? 's' : ''}
                      {(apiParams.title_filter || apiParams.advanced_title_filter) && 
                        ` for "${apiParams.title_filter || apiParams.advanced_title_filter}"`}
                    </div>
                    <JobList jobs={jobs} />
                  </div>
                )}
                
                {/* Load more button */}
                {jobs.length >= 10 && !isLoading && (
                  <div className="mt-6 text-center">
                    <Button onClick={loadMore} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader size={16} color="#ffffff" />
                        </>
                      ) : (
                        "Load More Internships"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
