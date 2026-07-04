"use client";

import { useEffect, useRef } from "react";

export default function FireEmberBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Particle layers configuration
  const layers = [
    {
      count: 600,
      speed: 0.4,
      size: [1, 3],
      drift: 0.3,
      trail: 0.2,
      alpha: 0.7,
    },
    {
      count: 400,
      speed: 0.8,
      size: [2, 5],
      drift: 0.5,
      trail: 0.4,
      alpha: 0.9,
    },
    {
      count: 200,
      speed: 1.2,
      size: [3, 7],
      drift: 0.8,
      trail: 0.6,
      alpha: 1.0,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let width, height;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
      dimensionsRef.current = { width, height };
    };

    // Initialize particles
    const createParticles = () => {
      const allParticles = [];
      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          const size =
            layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]);
          const brightness = 0.7 + Math.random() * 0.3;
          const driftX = (Math.random() - 0.5) * layer.drift;
          const driftY = (Math.random() - 0.5) * layer.drift * 0.3;
          const trailLength =
            Math.floor(5 + Math.random() * 15) * (layer.trail / 0.4);
          allParticles.push({
            x: Math.random() * width,
            y: -Math.random() * height * 2,
            size: size,
            speed: layer.speed * (0.7 + Math.random() * 0.6),
            driftX: driftX,
            driftY: driftY,
            alpha: 0.6 + Math.random() * 0.4,
            brightness: brightness,
            layer: layerIndex,
            trail: [],
            maxTrail: trailLength,
            flickerSpeed: 0.01 + Math.random() * 0.03,
            flickerOffset: Math.random() * 100,
          });
        }
      });
      return allParticles;
    };

    // Smoke/fog gradient
    const drawSmoke = () => {
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.7,
      );
      gradient.addColorStop(0, "rgba(180, 80, 30, 0.03)");
      gradient.addColorStop(0.4, "rgba(120, 50, 20, 0.02)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    let particles = createParticles();

    const animate = () => {
      if (!ctx) return;

      // Clear with semi-transparent black for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.92)";
      ctx.fillRect(0, 0, width, height);

      // Draw smoke/fog
      drawSmoke();

      // Update and draw particles
      const now = Date.now() / 1000;
      particles.forEach((p) => {
        // Movement
        p.y += p.speed * 0.6;
        p.x += Math.sin(now * 0.5 + p.driftX * 10) * p.driftX * 0.3;
        p.x += Math.cos(now * 0.3 + p.driftY * 8) * p.driftY * 0.2;
        // Drift
        p.x += (Math.random() - 0.5) * 0.15;
        p.y += (Math.random() - 0.5) * 0.05;

        // Reset when off screen
        if (p.y > height + 20) {
          p.y = -Math.random() * 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Trail
        p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > p.maxTrail) p.trail.shift();

        // Flicker
        const flicker =
          0.7 + 0.3 * Math.sin(now * p.flickerSpeed * 15 + p.flickerOffset);
        const currentAlpha =
          p.alpha *
          flicker *
          (0.8 + 0.2 * Math.sin(now * 0.5 + p.flickerOffset * 2));

        // Draw trail
        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const t = i / p.trail.length;
            const trailAlpha = t * currentAlpha * 0.3;
            const trailSize = p.size * (0.3 + 0.7 * t);
            const gradient = ctx.createRadialGradient(
              p.trail[i].x,
              p.trail[i].y,
              0,
              p.trail[i].x,
              p.trail[i].y,
              trailSize,
            );
            gradient.addColorStop(0, `rgba(255, 160, 50, ${trailAlpha * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 80, 20, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.trail[i].x, p.trail[i].y, trailSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Glow
        const glowSize = p.size * 3;
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowSize,
        );
        gradient.addColorStop(0, `rgba(255, 200, 100, ${currentAlpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(255, 140, 50, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 80, 20, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        const coreSize = p.size;
        ctx.fillStyle = `rgba(255, 220, 150, ${currentAlpha * 0.9})`;
        ctx.shadowColor = `rgba(255, 140, 50, ${currentAlpha * 0.8})`;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, coreSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Bright center
        ctx.fillStyle = `rgba(255, 255, 220, ${currentAlpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, coreSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      resize();
      particles = createParticles();
    };

    // Handle reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) {
      // Fallback: static gradient
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.7,
      );
      gradient.addColorStop(0, "rgba(180, 80, 30, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    resize();
    particles = createParticles();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
