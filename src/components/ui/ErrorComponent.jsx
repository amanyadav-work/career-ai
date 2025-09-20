import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ErrorComponent = ({
  title = "An error occurred",
  message,
  backLink,
  backLinkText = "Go back",
  className = "",
  fullScreen = false,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6",
        fullScreen && "min-h-[70vh]",
        className
      )}
    >
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-5 w-5 mr-2" />
        <AlertTitle>{title}</AlertTitle>
        {message && <AlertDescription>{message}</AlertDescription>}
      </Alert>
      
      {backLink && (
        <Button variant="link" asChild className="mt-4">
          <Link href={backLink}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLinkText}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
