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
      setShowButton(false); // Hide the button after click

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

  // Function to stop the video if confetti is not showing
  useEffect(() => {
    if (!showConfetti && videoRef.current) {
      videoRef.current.pause(); // Pause the video when confetti is not showing
      videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
  }, [showConfetti]); // Dependency on showConfetti state

  return (
    
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      di mo naman birthday 😝
      {/* Render Confetti with slow fall (adjusted gravity for slow effect) */}
      {/* {showConfetti && (
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={true} // Stop recycling particles
            numberOfPieces={500} // Increase number of particles
            gravity={0.05} // Slow down the fall speed by reducing gravity
            wind={0} // No wind for straight fall
          />
        </div>
      )} */}
      {/* Conditionally render and play the video */}
      {/* Conditionally render and animate the video and content */}
      {/* <div
        className={`transition-opacity duration-1000 ${
          showConfetti ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h1 className="text-5xl text-center font-bold">Hapi bday, Uzziel!</h1>
        <video
          ref={videoRef}
           loading="lazy"
  preload="metadata"
          width="320"
          playsInline
          autoPlay={false}
          loop
          height="240"
          controls={false}
        >
          <source src="/bdayy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Image src="/danceCat3.gif" alt="alt" width={200} height={200} />
      </div> */}

      {/* Button to trigger Confetti */}
      {/* {showButton && (
        <button
          className="px-4 py-2 text-white bg-pink-500 rounded-lg"
          onClick={triggerConfetti}
        >
          click me!
        </button>
      )} */}
    </div>
  );
}
