"use client";

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  className?: string;
}

export function TypedText({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1500,
  startDelay = 0,
  loop = true,
  showCursor = true,
  cursorChar = '|',
  className = '',
}: TypedTextProps) {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed,
      backSpeed,
      backDelay,
      startDelay,
      loop,
      showCursor,
      cursorChar,
    };

    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, backDelay, startDelay, loop, showCursor, cursorChar]);

  return <span className={className} ref={el} />;
}
