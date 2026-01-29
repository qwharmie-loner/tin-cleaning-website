"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  interval?: number;
}

export default function AnimatedCarousel({ images, interval = 2800 }: Props) {
  const [index, setIndex] = useState(0);
  const [srcList, setSrcList] = useState<string[]>(
    images.map((_, i) => `/images/carousel/${i + 1}.jpg`)
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(node);
    return () => {
      obs.disconnect();
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => stop();
  }, []);

  function start() {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">Our Work</h2>
      <div className="relative h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
        {srcList.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`gallery-${i}`}
            onError={() => {
              // fall back to provided remote image if local missing
              setSrcList((prev) => {
                const next = [...prev];
                next[i] = images[i] || next[i];
                return next;
              });
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 transform ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ willChange: "opacity, transform" }}
          />
        ))}
      </div>
    </div>
  );
}
