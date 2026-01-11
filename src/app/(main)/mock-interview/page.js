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
    <div className="container mx-auto py-10 xl:px-15 3xl:px-0">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex  flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">
             <span className="text-bold">AI-Powered VR Experience</span>
            </h2>
            <p className="text-muted-foreground">
              Immerse yourself in realistic, AI-driven virtual reality interviews. Sharpen your skills and boost your confidence—anytime, anywhere.
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1 flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            VR Interview Hub
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg border-2 border-blue-100 dark:border-zinc-800 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Launch a New VR Interview</CardTitle>
              <CardDescription className="text-base">
                Personalize your virtual interview session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <label htmlFor="difficulty" className="pb-1 font-medium">Difficulty Level</label>
                  <Select 
                    value={formData.difficulty}
                    onValueChange={(value) => handleSelectChange('difficulty', value)}
                  >
                    <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700">
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
                  className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600"
                  disabled={isSubmitting}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Creating...' : 'Create Interview'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="shadow border-2 border-purple-100 dark:border-zinc-800 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Your VR Interview Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Total VR Sessions</span>
                </div>
                <span className="font-bold text-lg">{interviews.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Completed Sessions</span>
                </div>
                <span className="font-bold text-lg">
                  {interviews.filter(i => i.status === 'completed').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview List Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-2 border-blue-100 dark:border-zinc-800 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Your VR Interview Sessions</CardTitle>
              <CardDescription className="text-base">
                Review, manage, and relaunch your immersive AI-powered VR mock interviews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fetchingInterviews ? (
                <div className="text-center py-10 text-lg text-muted-foreground">Loading your VR interviews...</div>
              ) : interviews.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground text-lg">
                    No VR interviews yet. <span className="text-primary font-semibold">Start your first AI-powered virtual session now!</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {interviews.map((interview, index) => (
                    <React.Fragment key={interview._id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex flex-col sm:flex-row gap-6 bg-white/60 dark:bg-zinc-900/60 rounded-lg p-5 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow transition">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-primary">{interview.title}</h3>
                          <p className="text-muted-foreground text-sm mb-1">
                            <span className="font-medium">Role:</span> {interview.jobRole} &nbsp;•&nbsp; {interview.difficulty} level
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
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600"
                            onClick={() => window.location.href = `/mock-interview/${interview._id}`}
                          >
                            Enter VR Interview
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