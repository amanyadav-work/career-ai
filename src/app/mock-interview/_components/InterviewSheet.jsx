'use client';

import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SpeechRecognition from 'react-speech-recognition';

const InterviewSheet = ({ 
  conversation, 
  interviewComplete, 
  listening, 
  processingResponse 
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end'>
          <Button variant="outline" className="bg-black/80! text-white hover:text-white/70 backdrop-blur-sm shadow-md">
              Open Interview Panel
          </Button>
          <div className='flex items-center gap-2'>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                SpeechRecognition.startListening();
              }} 
              variant="secondary" 
              size="sm"
              className='bg-gray-800 text-white hover:bg-gray-700'
            >
              Start Listening
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                SpeechRecognition.stopListening();
              }} 
              variant="secondary" 
              size="sm"
              className='bg-gray-800 text-white hover:bg-gray-700'
            >
              Stop Listening
            </Button>
            <div className="bg-gray-800 text-white p-2 rounded-md text-xs">
              Status: {processingResponse ? 'Processing' : (listening ? 'Listening' : 'Waiting')}
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px]sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Interview Conversation</SheetTitle>
          <SheetDescription>
            Your interview progress and conversation history
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 p-5  space-y-4">
          {conversation.length === 0 ? (
            <p className="text-muted-foreground">Begin speaking to start the interview</p>
          ) : (
            conversation.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${msg.role === 'user' 
                  ? 'bg-blue-100 text-black ml-8' 
                  : 'bg-gray-100 text-black mr-8'}`}
              >
                <p className="font-medium mb-1">{msg.role === 'user' ? 'You' : 'Interviewer'}</p>
                <p>{msg.content}</p>
              </div>
            ))
          )}
        </div>
        
        {interviewComplete && (
          <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
            <h3 className="text-lg font-semibold">Interview Completed</h3>
            <p>Thank you for completing the interview!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default InterviewSheet;
