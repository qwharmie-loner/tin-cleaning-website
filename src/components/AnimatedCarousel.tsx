"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  interval?: number;
}

export default function AnimatedCarousel({ images, interval = 2800 }: Props) {
  const [index, setIndex] = useState(0);
  const [srcList, setSrcList] = useState<string[]>(
    images.map((_, i) => `/images/carousel/${i + 1}.jpg`)
  );
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
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
      <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg bg-gray-900">
        {srcList.map((src, i) => {
          // Use Image for local files, fallback img for remote URLs
          const isLocal = src.startsWith("/images/carousel");
          
          return isLocal ? (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={src}
                alt={`gallery-${i}`}
                fill
                quality={95}
                priority={i === 0}
                className="object-cover"
                style={{ willChange: "opacity", filter: "brightness(1.05) contrast(1.1) saturate(1.05)" }}
                onError={() => {
                  // Fallback to provided remote image if local missing
                  setSrcList((prev) => {
                    const next = [...prev];
                    next[i] = images[i] || next[i];
                    return next;
                  });
                }}
              />
            </div>
          ) : (
            <img
              key={i}
              src={src}
              alt={`gallery-${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 transform ${
                i === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ willChange: "opacity, transform", filter: "brightness(1.05) contrast(1.1) saturate(1.05)" }}
            />
          );
        })}
      </div>
    </div>
  );
}
