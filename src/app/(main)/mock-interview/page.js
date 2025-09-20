'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import FormField from '@/components/ui/FormField';
import { Plus, BarChart3, Target, Brain } from 'lucide-react';
import useFetch from '@/hooks/useFetch';

const MockInterviewPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    jobRole: '',
    skills: '',
    difficulty: 'Intermediate',
    notes: ''
  });

  // Use fetch hook for getting interviews
  const { 
    isLoading: fetchingInterviews, 
    error: fetchError, 
    refetch: fetchInterviews 
  } = useFetch({
    url: '/api/mock-interview',
    onSuccess: (data) => {
      setInterviews(data);
    },
    onError: (error) => {
      console.error('Error fetching interviews:', error);
    }
  });

  // Use fetch hook for creating interviews
  const { 
    isLoading: isSubmitting, 
    error: submitError, 
    refetch: submitInterview 
  } = useFetch({
    url: '/api/mock-interview',
    method: 'POST',
    onSuccess: () => {
      setFormData({
        title: '',
        jobRole: '',
        skills: '',
        difficulty: 'Intermediate',
        notes: ''
      });
      fetchInterviews();
    },
    onError: (error) => {
      console.error('Error creating interview:', error);
    }
  });

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Transform skills from string to array
    const formattedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };
    
    submitInterview({ payload: formattedData });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Mock Interviews</h2>
            <p className="text-muted-foreground">Practice your interview skills with AI-powered mock interviews</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1 flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            Interview Hub
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Interview</CardTitle>
              <CardDescription>Set up your mock interview session</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  id="title"
                  name="title"
                  label="Interview Title"
                  placeholder="e.g., Frontend Developer Practice"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                
                <FormField
                  id="jobRole"
                  name="jobRole"
                  label="Job Role"
                  placeholder="e.g., Frontend Developer, Data Scientist"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  required
                />

                <FormField
                  id="skills"
                  name="skills"
                  label="Skills (comma separated)"
                  placeholder="e.g., React, JavaScript, CSS"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                />

                <div className="grid w-full gap-1">
                  <label htmlFor="difficulty" className="pb-1">Difficulty Level</label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleSelectChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <FormField
                  id="notes"
                  name="notes"
                  label="Notes (optional)"
                  placeholder="Add any specific areas you want to focus on"
                  value={formData.notes}
                  onChange={handleInputChange}
                  isTextArea={true}
                  rows={3}
                />

                <Button 
                  type="submit" 
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Creating...' : 'Create Interview'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Interview Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Total Interviews</span>
                </div>
                <span className="font-medium">{interviews.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Completed</span>
                </div>
                <span className="font-medium">
                  {interviews.filter(i => i.status === 'completed').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview List Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Interview Sessions</CardTitle>
              <CardDescription>View and manage your mock interview sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {fetchingInterviews ? (
                <div className="text-center py-10">Loading interviews...</div>
              ) : interviews.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No mock interviews yet. Create your first one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {interviews.map((interview, index) => (
                    <React.Fragment key={interview._id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{interview.title}</h3>
                          <p className="text-muted-foreground text-sm">
                            Role: {interview.jobRole} • {interview.difficulty} level
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Skills:</span> {interview.skills.join(', ')}
                            </p>
                            {interview.notes && (
                              <p className="text-sm">
                                <span className="font-medium">Notes:</span> {interview.notes}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Created: {formatDate(interview.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button 
                            variant="default"
                            onClick={() => window.location.href = `/mock-interview/${interview._id}`}
                          >
                            Start Interview
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;