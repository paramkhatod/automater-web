"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({
  text,
  speed = 160,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'center',
  useOriginalCharsOnly = false,
  characters = '01X#$@&*',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
  intervalDelay = 10000, 
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const containerRef = useRef(null);

  // 1. UPDATED EFFECT: The 10s "Pulse" Logic
  useEffect(() => {
    const triggerEffect = () => {
      // Step 1: Clear current state to force a "Re-Secure" animation
      setRevealedIndices(new Set());
      setIsHovering(false);

      // Step 2: Small delay then trigger the Decrypt scramble
      setTimeout(() => {
        setIsHovering(true);
      }, 500); 

      // Step 3: Animation cleanup
      const duration = sequential ? text.length * speed : maxIterations * speed;
      setTimeout(() => {
        setIsHovering(false);
      }, duration + 1000);
    };

    triggerEffect(); // Initial Run
    const timer = setInterval(triggerEffect, intervalDelay);
    return () => clearInterval(timer);
  }, [text, speed, sequential, maxIterations, intervalDelay]);

  // 2. CORE DECRYPT ENGINE (Optimized for Center-Out Reveal)
  useEffect(() => {
    let interval;
    const availableChars = characters.split('');

    const shuffleText = (originalText, currentRevealed) => {
      return originalText.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      }).join('');
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices(prev => {
          if (prev.size < text.length) {
            const nextIndex = getNextIndex(prev, text.length, revealDirection);
            const newRevealed = new Set(prev).add(nextIndex);
            setDisplayText(shuffleText(text, newRevealed));
            return newRevealed;
          }
          clearInterval(interval);
          setIsScrambling(false);
          return prev;
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => clearInterval(interval);
  }, [isHovering, text, speed, revealDirection, characters]);

  // Helper for reveal direction logic
  const getNextIndex = (revealedSet, len, direction) => {
    if (direction === 'center') {
      const middle = Math.floor(len / 2);
      const offset = Math.floor(revealedSet.size / 2);
      return revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
    }
    return revealedSet.size; // Default to start
  };

  return (
    <motion.span ref={containerRef} className={`inline-block ${parentClassName}`} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex">
        {displayText.split('').map((char, i) => (
          <span key={i} className={revealedIndices.has(i) || !isScrambling ? className : encryptedClassName}>
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}