"use client";

import { useEffect, useRef } from "react";

const LINK_DIST = 150; // px between nodes before a line is drawn
const CURSOR_DIST = 200;
const AREA_PER_NODE = 22000; // px² of viewport per node: ~60 on desktop, ~12 on phones

type Node = { x: number; y: number; vx: number; vy: number };

// Drifting node network. Sections paint their own black backgrounds, so this sits on top
// with mix-blend-mode: screen: lines show on black, vanish under white text.
export const BackgroundGraph = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1e4, y: -1e4 };
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / AREA_PER_NODE);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const line = (a: { x: number; y: number }, b: { x: number; y: number }, max: number, alpha: number) => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > max) return;
      ctx.strokeStyle = `rgba(255,255,255,${alpha * (1 - d / max)})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      // ponytail: O(n²) pairs, fine at ≤ ~120 nodes; grid buckets if the count ever grows
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) line(a, nodes[j], LINK_DIST, 0.14);
        line(a, pointer, CURSOR_DIST, 0.3);
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
      }
    };

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
    };
    // stop the loop in background tabs
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !still) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      resize();
      if (still) draw();
    };

    resize();
    if (still) draw();
    else frame = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full mix-blend-screen"
    />
  );
};
