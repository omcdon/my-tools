"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { PlatformZone } from "@/lib/platform-data";
import { drawOverlay, DrawOptions } from "@/lib/canvas-drawer";
import { Image as ImageIcon } from "lucide-react";

interface CanvasPreviewProps {
  image: HTMLImageElement | null;
  platform: PlatformZone;
  options: DrawOptions;
}

export function CanvasPreview({ image, platform, options }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = containerRef.current;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    if (!image) {
      // Placeholder
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, containerWidth, containerHeight);
      ctx.fillStyle = "#a3a3a3";
      ctx.font = "14px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Upload an image to see platform overlays", containerWidth / 2, containerHeight / 2);
      ctx.textAlign = "start";
      return;
    }

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    drawOverlay(ctx, image, platform, options);
    ctx.restore();
  }, [image, platform, options, zoom, pan]);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setZoom((prev) => Math.max(0.8, Math.min(2, prev + delta)));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Reset pan/zoom when image or platform changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [image, platform.id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Expose canvas ref via container element for export
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      (el as unknown as Record<string, unknown>)._getCanvas = () => canvasRef.current;
    }
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Preview
        </label>
        <span className="text-xs text-neutral-500">
          {zoom !== 1 && `${Math.round(zoom * 100)}%`}
        </span>
      </div>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl border border-neutral-200 bg-[#e5e5e5] dark:border-neutral-700"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #d4d4d4 25%, transparent 25%), linear-gradient(-45deg, #d4d4d4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d4d4d4 75%), linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="block" />
        {!image && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <ImageIcon className="mb-3 h-12 w-12 text-neutral-300" />
            <p className="text-sm font-medium text-neutral-400">
              Upload an image to see platform overlays
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Scroll to zoom, drag to pan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Utility: get canvas element from container for export
export function getCanvasFromContainer(container: HTMLElement | null): HTMLCanvasElement | null {
  if (!container) return null;
  return ((container as unknown as Record<string, unknown>)._getCanvas as (() => HTMLCanvasElement))?.() ?? null;
}
