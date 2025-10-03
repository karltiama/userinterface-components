import React, { useEffect, useRef } from "react";

interface AnimatedGridHeroProps {
  children?: React.ReactNode;
}

export default function AnimatedGridHero({ children }: AnimatedGridHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 60;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    type Line = { col: number; progress: number; speed: number; delay: number };
    const animatedLines: Line[] = [];

    const countCols = () =>
      Math.max(1, Math.ceil(canvas.getBoundingClientRect().width / gridSize));

    const createAnimatedLine = (): Line => {
      const cols = countCols();
      if (animatedLines.length >= cols) {
        return {
          col: Math.floor(Math.random() * cols),
          progress: 0,
          speed: 0.3,
          delay: Math.random() * 2000,
        };
      }
      let col: number;
      do {
        col = Math.floor(Math.random() * cols);
      } while (animatedLines.some((l) => l.col === col));
      return { col, progress: 0, speed: 0.3, delay: Math.random() * 2000 };
    };

    for (let i = 0; i < 3; i++) animatedLines.push(createAnimatedLine());

    let lastTs = 0;
    let rafId = 0;

    const animate = (ts: number) => {
      const dt = lastTs ? ts - lastTs : 16.7;
      lastTs = ts;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Create gradient background that fades from dark blue to purple
      const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
      bgGradient.addColorStop(0, "rgb(12, 14, 28)"); // Dark blue at top
      bgGradient.addColorStop(0.7, "rgb(12, 14, 28)"); // Keep dark blue until 70%
      bgGradient.addColorStop(1, "rgb(75, 0, 130)"); // Purple at bottom
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      // Draw grid with fading opacity toward bottom
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
      ctx.lineWidth = 1;
      
      // Vertical grid lines - always fully visible
      ctx.globalAlpha = 1;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      
      // Horizontal grid lines - fade out toward bottom
      for (let y = 0; y <= h; y += gridSize) {
        const fadeStart = h * 0.6; // Start fading at 60% of height
        const fadeEnd = h * 0.9; // Complete fade at 90% of height
        
        if (y <= fadeStart) {
          ctx.globalAlpha = 1;
        } else {
          const fadeProgress = Math.min(1, (y - fadeStart) / (fadeEnd - fadeStart));
          ctx.globalAlpha = 1 - fadeProgress;
        }
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1; // Reset alpha

      // Animate vertical lines (top to bottom)
      animatedLines.forEach((line, i) => {
        if (line.delay > 0) {
          line.delay -= dt;
          return;
        }
        const cols = countCols();
        if (line.col >= cols) {
          animatedLines[i] = createAnimatedLine();
          return;
        }

        const x = line.col * gridSize;
        const dashLength = 150;
        const startY = line.progress * h;
        const endY = startY + dashLength;

        // Create vertical gradient for the line
        const gradient = ctx.createLinearGradient(x, startY, x, endY);
        gradient.addColorStop(0, "rgba(59,130,246,0)");
        gradient.addColorStop(0.5, "rgba(59,130,246,0.8)");
        gradient.addColorStop(1, "rgba(59,130,246,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
        ctx.beginPath();
        ctx.moveTo(x, Math.max(0, startY));
        ctx.lineTo(x, Math.min(h, endY));
        ctx.stroke();
        ctx.shadowBlur = 0;

        line.progress += line.speed * (dt / 1000);
        if (line.progress > 1.2) animatedLines[i] = createAnimatedLine();
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "rgb(12, 14, 28)",
        }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-[600px] text-white">
        {children}
      </div>
    </div>
  );
}
