import { useState, useEffect, useRef } from 'react';

/**
 * A hook that uses the Web Speech API for speech recognition
 * @param {Object} options - Configuration options
 * @param {function} options.onResult - Callback when results are available
 * @param {boolean} options.continuous - Whether to continuously listen (default: true)
 * @param {string} options.lang - Language for recognition (default: 'en-US')
 * @returns {Object} - Speech recognition control object
 */
const useSpeechRecognition = ({
  onResult = null,
  continuous = true,
  lang = 'en-US'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);

  const recognitionRef = useRef(null);
  const isManuallyStoppedRef = useRef(false);

  // Check for microphone permissions
  const checkMicrophonePermission = async () => {
    try {
      // Request microphone access explicitly before starting speech recognition
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Clean up the stream
      setHasMicrophonePermission(true);
      return true;
    } catch (err) {
      console.error('Microphone permission error:', err);
      setError('Microphone access denied. Please enable microphone permissions.');
      setHasMicrophonePermission(false);
      return false;
    }
  };

  // Function to safely start recognition
  const startRecognition = async () => {
    console.log('[Speech] startRecognition called');
    if (!recognitionRef.current) return;

    if (isManuallyStoppedRef.current) {
      isManuallyStoppedRef.current = false;
      setIsListening(true);
      return
    }
    // Check for permissions first
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) return;

    try {
      isManuallyStoppedRef.current = false;
      setIsListening(true);
      recognitionRef.current.start();
      setError(null);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError(`Failed to start speech recognition: ${err.message}`);
      setIsListening(false);
    }
  };

  // Function to safely stop recognition
  const stopRecognition = () => {
    if (!recognitionRef.current) return;

    try {
      isManuallyStoppedRef.current = true;
      setIsListening(false);
    } catch (err) {
      console.error('Failed to stop speech recognition:', err);
    }
  };

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    // Check if we're in a secure context (HTTPS or localhost)
    if (window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1') {
      setError('Speech recognition requires a secure context (HTTPS)');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    const recognition = recognitionRef.current;
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      // Return early if recognition was manually stopped
      if (isManuallyStoppedRef.current === true) {
        return;
      }

      const current = event.resultIndex;
      const resultObj = event.results[current][0];
      const resultTranscript = resultObj.transcript;
      const isFinal = event.results[current].isFinal;

      setTranscript(resultTranscript);

      if (onResult && typeof onResult === 'function') {
        onResult(resultTranscript, isFinal);
      }
    };


    recognition.onerror = (event) => {
      // Only report actual errors, not just "no-speech" which is common
      if (event.error === 'no-speech') {
        // No speech detected - this is normal and not an error
        console.log('No speech detected, continuing to listen...');
        return;
      }

      if (event.error !== 'aborted') { console.error('Speech recognition error:', event.error) }

      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please enable microphone permissions in your browser settings.');
        setHasMicrophonePermission(false);
      } else if (event.error === 'aborted') {
        console.log('Speech recognition aborted');
      } else if (event.error === 'network') {
        setError('Network error occurred. Please check your internet connection.');
      } else if (event.error === 'audio-capture') {
        setError('Audio capture failed. Please check your microphone.');
      } else if (event.error === 'service-not-allowed') {
        setError('Speech recognition service not allowed.');
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }

      // Only set isListening to false for actual errors, not for no-speech
      if (event.error !== 'no-speech') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      // Set isListening to false when recognition ends
      setIsListening(false);
    };

    // Cleanup function
    return () => {
      if (recognition && isListening) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [continuous, lang, onResult, hasMicrophonePermission]);

  return {
    isListening,
    transcript,
    error,
    hasMicrophonePermission,
    stop: stopRecognition,
    start: startRecognition,
    requestMicrophonePermission: checkMicrophonePermission
  };
};

export default useSpeechRecognition;
