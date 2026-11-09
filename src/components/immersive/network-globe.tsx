"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  z: number;
  size: number;
  hub: boolean;
  pulse: number;
};

/**
 * A rotating network sphere drawn with a hand-rolled 3D→2D projection on a
 * 2D canvas. Deliberately dependency-free: no Three.js bundle, no WebGL
 * context loss, ~4KB of runtime work per frame.
 *
 * Behaviour:
 *  - Nodes are distributed with a Fibonacci sphere so coverage is even.
 *  - Edges connect only nearest neighbours, attenuated by depth.
 *  - Pointer movement tilts the sphere; touch drag rotates it.
 *  - Pauses when scrolled out of view, and renders a single static frame
 *    when the user prefers reduced motion.
 */
export function NetworkGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const COUNT = 190;
    const nodes: Node[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      nodes.push({
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        size: Math.random() * 0.9 + 0.5,
        hub: i % 17 === 0,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Precompute nearest-neighbour edges once — O(n²) at 190 nodes is trivial.
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    nodes.forEach((a, i) => {
      const distances = nodes
        .map((b, j) => ({
          j,
          d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2,
        }))
        .filter((d) => d.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 2);
      distances.forEach(({ j, d }) => {
        if (d > 0.09) return;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push([i, j]);
      });
    });

    let rotY = 0;
    let rotX = -0.28;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let lastPointer = { x: 0, y: 0 };
    let running = true;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = pointerX * 0.55;
      targetTiltX = -0.28 + pointerY * 0.35;
      if (dragging) {
        rotY += (e.clientX - lastPointer.x) * 0.006;
        lastPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastPointer = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerUp = () => {
      dragging = false;
    };

    const project = (n: Node) => {
      // Rotate Y then X.
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      let x = n.x * cosY - n.z * sinY;
      let z = n.x * sinY + n.z * cosY;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      let y = n.y * cosX - z * sinX;
      z = n.y * sinX + z * cosX;

      const perspective = 2.6 / (2.6 - z);
      const radius = Math.min(width, height) * 0.36;

      return {
        x: width / 2 + x * radius * perspective,
        y: height / 2 + y * radius * perspective,
        z,
        scale: perspective,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.016;

      const projected = nodes.map(project);

      // Edges
      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = projected[i];
        const b = projected[j];
        const depth = (a.z + b.z) / 2;
        if (depth < -0.35) continue;
        const alpha = Math.max(0, (depth + 0.55) / 1.5) * 0.24;
        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Latitude bands for structure
      ctx.strokeStyle = "rgba(146, 158, 174, 0.055)";
      for (let lat = -2; lat <= 2; lat++) {
        const r = Math.sqrt(Math.max(0, 1 - (lat / 2.6) ** 2));
        ctx.beginPath();
        for (let s = 0; s <= 64; s++) {
          const ang = (s / 64) * Math.PI * 2;
          const p = project({
            x: Math.cos(ang) * r,
            y: lat / 2.6,
            z: Math.sin(ang) * r,
            size: 0,
            hub: false,
            pulse: 0,
          });
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Nodes, far to near
      const order = projected
        .map((p, i) => ({ ...p, i }))
        .sort((a, b) => a.z - b.z);

      for (const p of order) {
        const node = nodes[p.i];
        const depthAlpha = Math.max(0.08, (p.z + 1.2) / 2.2);

        if (node.hub) {
          const pulse = (Math.sin(t * 1.7 + node.pulse) + 1) / 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.4 * p.scale + pulse * 2.4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(57, 255, 136, ${0.28 * depthAlpha * (1 - pulse * 0.5)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.9 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(57, 255, 136, ${0.95 * depthAlpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 5.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(57, 255, 136, ${0.055 * depthAlpha})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, node.size * p.scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 217, 255, ${0.78 * depthAlpha})`;
          ctx.fill();
        }
      }

      // Atmospheric rim
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.26,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.52,
      );
      grad.addColorStop(0, "rgba(0, 217, 255, 0)");
      grad.addColorStop(0.7, "rgba(0, 217, 255, 0.035)");
      grad.addColorStop(1, "rgba(0, 217, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    };

    const loop = () => {
      if (!running) return;
      if (!dragging) rotY += 0.0016 + pointerX * 0.0022;
      rotX += (targetTiltX - rotX) * 0.045;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          loop();
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    if (reduced) {
      draw();
    } else {
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full touch-none ${className}`}
    />
  );
}
