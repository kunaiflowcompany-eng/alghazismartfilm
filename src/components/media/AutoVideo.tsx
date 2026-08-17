"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  /** Lighter encode served to narrow viewports */
  srcSm?: string;
  poster: string;
  alt: string;
  className?: string;
  /** Load and play immediately instead of waiting for the viewport (hero only) */
  eager?: boolean;
  /** Rendered above the video, e.g. a scrim */
  children?: React.ReactNode;
};

/**
 * Muted, looping architectural video with a poster fallback.
 *
 * - Source is only attached once the element is near the viewport.
 * - Playback pauses when scrolled away.
 * - Under prefers-reduced-motion the poster frame is shown and no video loads.
 */
export function AutoVideo({ src, srcSm, poster, alt, className, eager = false, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const pick = () => (srcSm && window.matchMedia("(max-width: 767px)").matches ? srcSm : src);
    const node = wrapRef.current;
    if (!node) return;

    // A single observer covers both cases: an eager (above-the-fold) video is
    // already intersecting, so the callback runs on the first frame anyway.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSource((current) => current ?? pick());
            void videoRef.current?.play().catch(() => {});
          } else if (!eager) {
            videoRef.current?.pause();
          }
        }
      },
      { rootMargin: eager ? "1200px 0px" : "300px 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [src, srcSm, eager]);

  // The wrapper establishes its own positioning context. Don't pass `absolute`
  // here — it would collide with `relative` and collapse the box to zero height.
  // Wrap this component in a positioned element instead and pass `h-full w-full`.
  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden bg-charcoal", className)}>
      {/* Poster paints first and remains the fallback if video never loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-brand)]",
          ready ? "opacity-0" : "opacity-100",
        )}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />

      {source && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-brand)]",
            ready ? "opacity-100" : "opacity-0",
          )}
          src={source}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={alt}
          onCanPlay={() => setReady(true)}
          // If decoding fails (unsupported codec, blocked request) fall back to the poster
          onError={() => setReady(false)}
        />
      )}

      {children}
    </div>
  );
}
