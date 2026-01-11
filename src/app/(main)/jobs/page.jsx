"use client";
import { useState, useEffect } from "react";
import JobList from "@/components/ui/jobLists";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Simple filter/search UI
function JobSearchFilter({ onFilter, filters }) {
    const [query, setQuery] = useState(filters.query || "");
    const [location, setLocation] = useState(filters.location || "");
    const [company, setCompany] = useState(filters.company || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ query, location, company });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label className='text-[13px] mb-1'>Search</Label>
                <Input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="e.g. React"
                    className="w-full "
                />
            </div>
            <div>
                <Label className='text-[13px] mb-1'>Location</Label>
                <Input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. remote, Bangalore"
                    className="w-full "
                />
            </div>
            <div>
                <Label className='text-[13px] mb-1'>Company</Label>
                <Input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full "

                />
            </div>
            <Button type="submit" className="w-full">Search Jobs</Button>
        </form>
    );
}

export default function JobsPage() {
    // State for filters
    const [filters, setFilters] = useState({
        query: "",
        location: "",
        company: ""
    });

    // State for jobs data
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);

    // Build API URL
    const buildApiUrl = () => {
        const baseUrl = "https://vector-search-fupy.onrender.com/getjobs";
        const params = new URLSearchParams();
        if (filters.query) params.append("query", filters.query);
        if (filters.location) params.append("location", filters.location);
        if (filters.company) params.append("company", filters.company);
        return `${baseUrl}?${params.toString()}`;
    };

    // Fetch jobs from API
    const fetchJobs = async () => {
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch(buildApiUrl());
            if (!res.ok) throw new Error("Failed to fetch jobs");
            const json = await res.json();
            setJobs(json.results || [
                {
                    "id": 1,
                    "title": "React Developer",
                    "description": "We are hiring a React Developer. Required skills include Django, React, Docker, TypeScript, Node.js, Hibernate. Experience with scalable systems and teamwork is expected.",
                    "location": "onsite",
                    "company": "E-commerce Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 2,
                    "title": "Python Developer",
                    "description": "We are hiring a Python Developer. Required skills include Hibernate, Flask, PostgreSQL, Express, AWS, CI/CD. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Google",
                    "Link": "Link to apply"
                },
                {
                    "id": 3,
                    "title": "DevOps Engineer",
                    "description": "We are hiring a DevOps Engineer. Required skills include Flask, Docker, SQL, CI/CD, React. Experience with scalable systems and teamwork is expected.",
                    "location": "hybrid",
                    "company": "Startup",
                    "Link": "Link to apply"
                },
                {
                    "id": 4,
                    "title": "DevOps Engineer",
                    "description": "We are hiring a DevOps Engineer. Required skills include React, Flask, Kubernetes, Python, TypeScript, AWS. Experience with scalable systems and teamwork is expected.",
                    "location": "onsite",
                    "company": "E-commerce Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 5,
                    "title": "React Developer",
                    "description": "We are hiring a React Developer. Required skills include SQL, React, Node.js, MongoDB, HTML, Hibernate. Experience with scalable systems and teamwork is expected.",
                    "location": "onsite",
                    "company": "Amazon",
                    "Link": "Link to apply"
                },
                {
                    "id": 6,
                    "title": "ML Engineer",
                    "description": "We are hiring a ML Engineer. Required skills include Node.js, Kubernetes, Hibernate. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "E-commerce Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 7,
                    "title": "Python Developer",
                    "description": "We are hiring a Python Developer. Required skills include Hibernate, Java, Kubernetes, JavaScript, TypeScript. Experience with scalable systems and teamwork is expected.",
                    "location": "hybrid",
                    "company": "E-commerce Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 8,
                    "title": "Data Engineer",
                    "description": "We are hiring a Data Engineer. Required skills include AWS, JavaScript, PostgreSQL. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Microsoft",
                    "Link": "Link to apply"
                },
                {
                    "id": 9,
                    "title": "Software Engineer",
                    "description": "We are hiring a Software Engineer. Required skills include HTML, CSS, Python. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Microsoft",
                    "Link": "Link to apply"
                },
                {
                    "id": 10,
                    "title": "React Developer",
                    "description": "We are hiring a React Developer. Required skills include Java, Node.js, JavaScript, HTML. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Amazon",
                    "Link": "Link to apply"
                },
                {
                    "id": 11,
                    "title": "DevOps Engineer",
                    "description": "We are hiring a DevOps Engineer. Required skills include Express, Spring Boot, CSS, HTML, SQL. Experience with scalable systems and teamwork is expected.",
                    "location": "hybrid",
                    "company": "E-commerce Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 12,
                    "title": "DevOps Engineer",
                    "description": "We are hiring a DevOps Engineer. Required skills include Flask, Java, Hibernate, Python, HTML, Docker. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Startup",
                    "Link": "Link to apply"
                },
                {
                    "id": 13,
                    "title": "Full Stack Developer",
                    "description": "We are hiring a Full Stack Developer. Required skills include JavaScript, MongoDB, Python, CSS. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Microsoft",
                    "Link": "Link to apply"
                },
                {
                    "id": 14,
                    "title": "Data Engineer",
                    "description": "We are hiring a Data Engineer. Required skills include Docker, JavaScript, CSS. Experience with scalable systems and teamwork is expected.",
                    "location": "onsite",
                    "company": "FinTech Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 15,
                    "title": "Data Engineer",
                    "description": "We are hiring a Data Engineer. Required skills include Node.js, Docker, Django, Java, PostgreSQL. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "FinTech Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 16,
                    "title": "Full Stack Developer",
                    "description": "We are hiring a Full Stack Developer. Required skills include Spring Boot, PostgreSQL, SQL, Python, JavaScript. Experience with scalable systems and teamwork is expected.",
                    "location": "hybrid",
                    "company": "FinTech Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 17,
                    "title": "Frontend Engineer",
                    "description": "We are hiring a Frontend Engineer. Required skills include MongoDB, React, JavaScript, TypeScript. Experience with scalable systems and teamwork is expected.",
                    "location": "onsite",
                    "company": "Microsoft",
                    "Link": "Link to apply"
                },
                {
                    "id": 18,
                    "title": "React Developer",
                    "description": "We are hiring a React Developer. Required skills include Node.js, Hibernate, Java, Spring Boot, AWS, Kubernetes. Experience with scalable systems and teamwork is expected.",
                    "location": "hybrid",
                    "company": "FinTech Company",
                    "Link": "Link to apply"
                },
                {
                    "id": 19,
                    "title": "Software Engineer",
                    "description": "We are hiring a Software Engineer. Required skills include PostgreSQL, CI/CD, Node.js, Kubernetes, Hibernate. Experience with scalable systems and teamwork is expected.",
                    "location": "remote",
                    "company": "Netflix",
                    "Link": "Link to apply"
                },
                {
                    "id": 20,
                    "title": "Data Engineer",
                    "description": "We are hiring a Data Engineer. Required skills include Kubernetes, Spring Boot, Django, PostgreSQL, JavaScript. Experience with scalable systems and teamwork is expected.",
                    "location": "hybrid",
                    "company": "Startup",
                    "Link": "Link to apply"
                }
            ]);
            setCount(json.count || 0);
        } catch (err) {
            setError(err.message || "Unknown error");
            setJobs([]);
            setCount(0);
        }
        setIsLoading(false);
    };

    // Initial and filter change fetch
    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line
    }, [filters]);

    // Handle filter/search
    const handleFilter = (newFilters) => {
        setFilters({
            query: newFilters.query || "",
            location: newFilters.location || "",
            company: newFilters.company || ""
        });
    };

    // Refresh handler
    const handleRefresh = () => {
        fetchJobs();
    };

    return (
        <div className="4xl:border rounded-sm ">
            <img
                src={"/job-bg.jpg"}
                className="w-full saturate-50 max-h-[40vh] object-cover object-center rounded-sm"
            />
            <div className="container mx-auto py-10 xl:px-5 3xl:px-0 flex flex-col space-y-8">
                {/* Header Section */}
                <div className="mb-2 px-4 md:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Smart Job Search (Semantic Powered)</h2>
                            <p className="text-muted-foreground">
                                Discover and apply to relevant jobs to kickstart your career.  Our smart search understands your intent, helping you find the best matches—even if you don't use exact keywords.<br />
                            </p>
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
                                <CardTitle>Filter Jobs</CardTitle>
                                <CardDescription>
                                    Refine your search to find the perfect match.<br />
                                    <span className="text-xs text-muted-foreground">
                                        (Powered by advanced matching—just describe what you want!)
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <JobSearchFilter onFilter={handleFilter} filters={filters} />
                                {/* Results count and active filter summary */}
                                {!isLoading && !error && (
                                    <div className="mt-4">
                                        <p className="text-sm text-muted-foreground">
                                            Found {count} job{count !== 1 ? 's' : ''}
                                            {filters.query && ` matching "${filters.query}"`}
                                            {filters.location && ` in ${filters.location}`}
                                            {filters.company && ` at ${filters.company}`}
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
                                    <CardTitle className='mb-1'>Available Jobs</CardTitle>
                                    <CardDescription>
                                        Browse through jobs that match your criteria using our intelligent, meaning-based search.
                                    </CardDescription>
                                </div>
                                {!isLoading && !error && jobs.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRefresh}
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
                                    <Loader text="Loading jobs" className='min-h-[300px]' />
                                )}
                                {/* Error state */}
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Error loading jobs: {error}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* Job listings */}
                                {!isLoading && !error && (
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-4">
                                            Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''}
                                            {filters.query && ` for "${filters.query}"`}
                                        </div>
                                        <JobList jobs={jobs} />
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
