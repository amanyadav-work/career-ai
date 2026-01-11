'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import MockVR from '../_components/VR-renderer';
import useFetch from '@/hooks/useFetch';
import { useParams } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import ErrorComponent from '@/components/ui/ErrorComponent';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import InterviewSheet from '../_components/InterviewSheet';

const MockInterviewPage = () => {
    const params = useParams();
    const interviewId = params.id;
    const [currentAnimation, setCurrentAnimation] = useState('idle');
    const [conversation, setConversation] = useState([]);
    const [interviewComplete, setInterviewComplete] = useState(false);
    const [processingResponse, setProcessingResponse] = useState(false);
    const timeoutRef = useRef(null);
    const audioRef = useRef(new Audio());

    const allAnimations = ["idle", "clap", "talk", "talk2"];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const { refetch: sendTranscript } = useFetch({
        url: '/api/mock-interview/conversation',
        method: 'POST',
        auto: false,
        onSuccess: (data) => {
            console.log('AI response received:', data);
            if (data.aiResponse) {
                setCurrentAnimation(data.aiResponse.animationToPlay || 'talk');
                setConversation(data.conversation);

                if (data.aiResponse.isCompleted) {
                    setInterviewComplete(true);
                }

                // Play audio if available, regardless of completion status
                if (data.audioBase64) {
                    playResponseAudio(data.audioBase64);
                } else {
                    // If no audio, handle next steps
                    if (data.aiResponse.isCompleted) {
                        setProcessingResponse(false);
                    } else {
                        // If not completed and no audio, re-enable speech recognition after delay
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                        timeoutRef.current = setTimeout(() => {
                            console.log('No audio, re-enabling speech recognition after delay');
                            SpeechRecognition.startListening();
                        }, 2000);
                        setProcessingResponse(false);
                    }
                }
            }
        },
        onError: (err) => {
            console.error('Error in conversation:', err);
            // Re-enable speech in case of error, but with a delay
            setProcessingResponse(false);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                SpeechRecognition.startListening();
            }, 2000);
        }
    });

    // Function to play audio from base64 string
    const playResponseAudio = useCallback((audioBase64) => {
        try {
            // Stop any currently playing audio
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            
            // Convert base64 to blob
            const byteCharacters = atob(audioBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/mp3' });
            
            // Create URL and set it as audio source
            const url = URL.createObjectURL(blob);
            audioRef.current.src = url;
            
            // Play audio and handle events
            audioRef.current.play();
            
            audioRef.current.onended = () => {
                console.log('Audio playback finished, enabling speech recognition');
                URL.revokeObjectURL(url); // Clean up
                setProcessingResponse(false);
                setCurrentAnimation('idle');
                if (!interviewComplete) {
                    SpeechRecognition.startListening();
                }
            };
            
            audioRef.current.onerror = () => {
                console.error('Audio playback error');
                URL.revokeObjectURL(url); // Clean up
                setProcessingResponse(false);
                setCurrentAnimation('idle');
                if (!interviewComplete) {
                    SpeechRecognition.startListening();
                }
            };
        } catch (error) {
            console.error('Error playing audio:', error);
            setProcessingResponse(false);
            setCurrentAnimation('idle');
            if (!interviewComplete) {
                SpeechRecognition.startListening();
            }
        }
    }, [interviewComplete]);


    const handleTranscriptFinalized = useCallback((transcript) => {
        if (!transcript || processingResponse) return;
        setProcessingResponse(true);
        console.log('Sending transcript to API:', transcript);
        // Send the transcript to the API
        sendTranscript({
            payload: {
                interviewId,
                transcript,
                allAnimations
            }
        });
    }, [interviewId, sendTranscript, allAnimations, processingResponse]);


    const { data: interviewData, error, isLoading } = useFetch({
        url: `/api/mock-interview/${interviewId}`,
        method: 'GET',
        auto: true,
        onSuccess: (data) => {
            console.log('Interview details loaded:', data);
            if (data.conversation && data.conversation.length > 0) {
                setConversation(data.conversation);
            }
            if (data.status === 'completed') {
                setInterviewComplete(true);
            } else {
                SpeechRecognition.startListening()
            }
        },
        onError: (err) => {
            console.error('Error loading interview details:', err);
        }
    });


    useEffect(() => {
        if (!listening) {
            console.log('Current transcript:', transcript);
            handleTranscriptFinalized(transcript);
        }
    }, [listening])

    useEffect(() => {
        // Cleanup audio on component unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (isLoading) {
        return (
            <Loader
                text="Loading interview details"
                fullScreen
            />
        );
    }

    if (error) {
        return (
            <ErrorComponent
                title="Failed to load interview"
                message={error}
                backLink="/mock-interview"
                backLinkText="Back to Mock Interviews"
            />
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <MockVR interviewData={interviewData} currentAnimation={currentAnimation} />

            <InterviewSheet 
                conversation={conversation}
                interviewComplete={interviewComplete}
                listening={listening}
                processingResponse={processingResponse}
            />

            {interviewComplete && (
                <div className="mt-4 p-4 border-yellow-500 bg-background rounded-lg">
                    <h3 className="text-lg font-semibold">Interview Completed</h3>
                    <p>Thank you for completing the interview!</p>
                </div>
            )}
        </div>
    );
};

export default MockInterviewPage;