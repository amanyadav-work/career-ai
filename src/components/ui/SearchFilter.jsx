"use client";
import { useState } from "react";
import { Search, MapPin, Filter, X, AlignLeft, Calendar, Building } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    title_filter: "",
    advanced_title_filter: "",
    location_filter: "",
    description_filter: "",
    description_type: "",
    remote: false,
    agency: false,
    date_filter: "",
    offset: 0
  });
  
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchType, setSearchType] = useState("basic"); // basic or advanced

  // Apply filters
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert filters to the format expected by the API
    const apiFilters = {
      ...filters,
      remote: filters.remote ? "true" : "",
      agency: filters.agency ? "true" : "",
      // Make sure we're only sending title_filter OR advanced_title_filter, not both
      title_filter: searchType === "basic" ? filters.title_filter : "",
      advanced_title_filter: searchType === "advanced" ? filters.advanced_title_filter : "",
    };
    
    // Update active filters for badge display
    const newActiveFilters = [];
    
    // Add the appropriate title filter based on search type
    if (searchType === "basic" && filters.title_filter) {
      newActiveFilters.push({ type: 'title_filter', value: filters.title_filter });
    } else if (searchType === "advanced" && filters.advanced_title_filter) {
      newActiveFilters.push({ type: 'advanced_title_filter', value: `Advanced: ${filters.advanced_title_filter}` });
    }
    
    // Add other filters
    if (filters.location_filter) newActiveFilters.push({ type: 'location_filter', value: filters.location_filter });
    if (filters.description_filter) newActiveFilters.push({ type: 'description_filter', value: `Description: ${filters.description_filter}` });
    if (filters.remote) newActiveFilters.push({ type: 'remote', value: 'Remote Only' });
    if (filters.agency) newActiveFilters.push({ type: 'agency', value: 'Agency Jobs' });
    if (filters.date_filter) newActiveFilters.push({ type: 'date_filter', value: filters.date_filter });
    if (filters.description_type) newActiveFilters.push({ type: 'description_type', value: 'Include full description' });
    
    setActiveFilters(newActiveFilters);
    onFilter(apiFilters);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value === "any" ? "" : value
    }));
  };

  // Remove a specific filter
  const removeFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: filterType === 'remote' || filterType === 'agency' ? false : ""
    }));
    
    setActiveFilters(prev => prev.filter(filter => filter.type !== filterType));
    
    // Apply the updated filters
    const updatedFilters = {
      ...filters,
      [filterType]: filterType === 'remote' || filterType === 'agency' ? "" : "",
    };
    
    onFilter(updatedFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    const emptyFilters = {
      title_filter: "",
      advanced_title_filter: "",
      location_filter: "",
      description_filter: "",
      description_type: "",
      remote: false,
      agency: false,
      date_filter: "",
      offset: 0
    };
    setFilters(emptyFilters);
    setActiveFilters([]);
    onFilter(emptyFilters);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4 -mt-2">
        <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="basic">Basic Search</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className=" space-y-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title_filter"
                  name="title_filter"
                  placeholder="Job title, keywords, or company"
                  value={filters.title_filter}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location_filter"
                  name="location_filter"
                  placeholder="City, state, or country (e.g., United States)"
                  value={filters.location_filter}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              
              <Button type="submit" className="shrink-0">
                Search
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="advanced_title_filter" className="text-sm font-medium">
                  Advanced Title Search
                </Label>
                <div className="text-xs text-muted-foreground mb-2">
                  Use operators: & (AND), | (OR), ! (NOT), &lt;-&gt; (FOLLOWED BY), &#39; &#39; (phrases), :* (prefix)
                </div>
                <Input
                  id="advanced_title_filter"
                  name="advanced_title_filter"
                  placeholder="Example: (engineer | developer) & 'machine learning':*"
                  value={filters.advanced_title_filter}
                  onChange={handleChange}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location_filter"
                  name="location_filter"
                  placeholder="United States OR United Kingdom OR India"
                  value={filters.location_filter}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Search with Advanced Filters
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced-filters">
            <AccordionTrigger className="text-sm font-medium py-1">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Additional Filters
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-2">
     
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="description_filter" className="text-sm font-medium">
                      Description Keywords
                    </label>
                    <div className="relative">
                      <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="description_filter"
                        name="description_filter"
                        placeholder="Keywords in job description"
                        value={filters.description_filter}
                        onChange={handleChange}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="date_filter" className="text-sm font-medium">
                      Posted Since (Date Filter)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date_filter"
                        name="date_filter"
                        type="date"
                        value={filters.date_filter}
                        onChange={handleChange}
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Filter jobs posted after this date (YYYY-MM-DD)
                    </p>
                  </div>
                </div>
                           <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remote"
                      checked={filters.remote}
                      onCheckedChange={(checked) => {
                        setFilters(prev => ({ ...prev, remote: checked }));
                      }}
                    />
                    <label htmlFor="remote" className="text-sm font-medium cursor-pointer">
                      Remote positions only
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="agency"
                      checked={filters.agency}
                      onCheckedChange={(checked) => {
                        setFilters(prev => ({ ...prev, agency: checked }));
                      }}
                    />
                    <label htmlFor="agency" className="text-sm font-medium cursor-pointer">
                      Include agency jobs
                    </label>
                  </div>
                </div>
                
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter.type} variant="secondary" className="flex items-center gap-1">
              {filter.value}
              <button 
                onClick={() => removeFilter(filter.type)}
                className="ml-1 rounded-full hover:bg-muted"
                aria-label={`Remove ${filter.value} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
