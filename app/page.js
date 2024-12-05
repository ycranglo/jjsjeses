'use client';

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import Image from "next/image";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showButton, setShowButton] = useState(true); // Track button visibility
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showVideo, setShowVideo] = useState(false); // Track video visibility

  const videoRef = useRef(null); // Reference to the video element

  // Update window dimensions on resize, only on client-side
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    if (typeof window !== 'undefined') {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerConfetti = () => {
    // Hide the button after click
    setShowButton(false);

    // Reset state before triggering confetti again
    setShowConfetti(false);
    setFadeOut(false);

    // Ensure React recognizes the reset by using a small timeout
    setTimeout(() => {
      setShowConfetti(true);

      // Show the video after the button is clicked
      setShowVideo(true);

      // Play the video
      if (videoRef.current) {
        videoRef.current.play();
      }

      // Trigger fade-out after 15 seconds
      setTimeout(() => {
        setFadeOut(true);
      }, 15000); // 15,000ms = 15 seconds

      // Completely remove confetti after fade-out ends (18 seconds total)
      setTimeout(() => {
        setShowConfetti(false);
      }, 18000); // 15 seconds visible + 3 seconds fade-out
    }, 50); // 50ms delay to reset the state properly
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Render Confetti with slow falling speed */}
      {showConfetti && (
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={true} // Stop recycling particles
            numberOfPieces={800} // Increase number of particles
            gravity={0.05} // Slow down the fall speed by reducing gravity
            wind={Math.random() * 0.2 - 0.1} // Random wind for variety
          />
        </div>
      )}

      {/* Conditionally render the video */}
      {showVideo && (
        <div className="">
          <video
            ref={videoRef} // Attach the video ref here
            width="320"
            playsInline
            autoPlay={false} // Disable autoplay initially
            loop
            height="240"
            controls={false} // Hide controls
            preload="none"
          >
            <source src="/bdayy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Button to trigger Confetti */}
      {showButton && (
        <button
          className="px-4 py-2 text-white bg-pink-500 rounded-lg"
          onClick={triggerConfetti}
        >
          click me
        </button>
      )}
    </div>
  );
}
