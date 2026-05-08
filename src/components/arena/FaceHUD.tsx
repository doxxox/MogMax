"use client";

import { useEffect, useRef } from "react";
import type { Results } from "@mediapipe/face_mesh";

interface FaceHUDProps {
  results: Results | null;
  width: number;
  height: number;
  isAnalyzing?: boolean;
}

export function FaceHUD({ results, width, height, isAnalyzing }: FaceHUDProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !results) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        // 1. Draw Wireframe Mesh (Subtle)
        ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
        ctx.lineWidth = 0.5;
        
        // Simplified mesh drawing for performance and aesthetic
        // We'll just draw some key connections
        drawMesh(ctx, landmarks, width, height);

        // 2. Highlight Jawline
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#3B82F6";
        drawJawline(ctx, landmarks, width, height);

        // 3. Eye Tracking Reticles
        drawEyeReticles(ctx, landmarks, width, height);

        // 4. Scan Lines (If analyzing)
        if (isAnalyzing) {
          drawScanLines(ctx, width, height);
        }
        
        // 5. HUD Circles around face
        drawHUDCircles(ctx, landmarks, width, height);
      }
    }
  }, [results, width, height, isAnalyzing]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

function drawMesh(ctx: CanvasRenderingContext2D, landmarks: any, w: number, h: number) {
  // Logic to draw a futuristic mesh grid
  // Just a few triangles for the 'tech' look
  const keyPoints = [1, 33, 263, 61, 291, 199];
  ctx.beginPath();
  keyPoints.forEach((p, i) => {
    const pt = landmarks[p];
    if (i === 0) ctx.moveTo(pt.x * w, pt.y * h);
    else ctx.lineTo(pt.x * w, pt.y * h);
  });
  ctx.closePath();
  ctx.stroke();
}

function drawJawline(ctx: CanvasRenderingContext2D, landmarks: any, w: number, h: number) {
  const jawIndices = [234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454];
  ctx.beginPath();
  jawIndices.forEach((idx, i) => {
    const pt = landmarks[idx];
    if (i === 0) ctx.moveTo(pt.x * w, pt.y * h);
    else ctx.lineTo(pt.x * w, pt.y * h);
  });
  ctx.stroke();
}

function drawEyeReticles(ctx: CanvasRenderingContext2D, landmarks: any, w: number, h: number) {
  const leftEye = landmarks[468]; // Center of iris
  const rightEye = landmarks[473];

  [leftEye, rightEye].forEach(eye => {
    if (!eye) return;
    const x = eye.x * w;
    const y = eye.y * h;
    
    ctx.strokeStyle = "#EC4899";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.stroke();
    
    // Crosshair
    ctx.beginPath();
    ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y);
    ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5);
    ctx.stroke();
  });
}

function drawScanLines(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const time = Date.now() / 1000;
  const scanY = (Math.sin(time * 2) + 1) / 2 * h;
  
  ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#3B82F6";
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(w, scanY);
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function drawHUDCircles(ctx: CanvasRenderingContext2D, landmarks: any, w: number, h: number) {
  const nose = landmarks[1];
  const x = nose.x * w;
  const y = nose.y * h;
  const time = Date.now() / 1000;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.setLineDash([5, 15]);
  ctx.beginPath();
  ctx.arc(x, y, 150, time, time + Math.PI * 1.5);
  ctx.stroke();
  ctx.setLineDash([]);
}
