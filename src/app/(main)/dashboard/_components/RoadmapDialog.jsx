import { useState } from 'react';
import FormField from '@/components/ui/FormField';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, X } from 'lucide-react';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export default function RoadmapDialog({ children }) {
    const [position, setPosition] = useState('');
    const [skills, setSkills] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    
    const { data, error, isLoading, refetch } = useFetch({
        url: '/api/roadmap',
        method: 'POST',
        auto: false,
        payload: { position, skills },
        onSuccess: (result) => {
            setOpen(false);
            // Redirect here
            if (result?._id) {
                router.push(`/roadmap/${result._id}`);
            }
        },
        onError: () => { },
    });

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button 
                        variant="default" 
                        onClick={handleDialogOpen}
                        className="shrink-0"
                    >
                        <Plus className="h-4 w-4" />
                        Generate Roadmap
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Generate Career Roadmap
                    </DialogTitle>
                    <DialogDescription>
                        Enter your target position and current skills to create a personalized career roadmap.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <FormField
                        id="position"
                        label="Target Position"
                        placeholder="e.g. Frontend Developer"
                        value={position}
                        onChange={e => setPosition(e.target.value)}
                        required
                    />
                    <FormField
                        id="skills"
                        label="Current Skills"
                        placeholder="Comma separated skills e.g. JavaScript, React, CSS"
                        value={skills}
                        onChange={e => setSkills(e.target.value)}
                        isTextArea={true}
                        required
                    />
                    
                    {error && (
                        <div className="text-sm text-destructive rounded-md py-2 px-3 bg-destructive/10">
                            {error}
                        </div>
                    )}
                    
                    <DialogFooter className="mt-6 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleDialogClose}
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !position || !skills}
                        >
                            {isLoading ? (
                                <>
                                    <Loader size={16} color="#ffffff" />
                                    <span className="ml-2">Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
