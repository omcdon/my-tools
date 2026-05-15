"use client";

import { useState, useCallback, useRef } from "react";
import { ImageUploader } from "@/components/image-uploader";
import { PlatformSelector } from "@/components/platform-selector";
import { OverlayControls } from "@/components/overlay-controls";
import { CanvasPreview } from "@/components/canvas-preview";
import { SafeZoneInfo } from "@/components/safe-zone-info";
import { ActionButtons } from "@/components/action-buttons";
import { ThemeToggle } from "@/components/theme-toggle";
import { PLATFORMS } from "@/lib/platform-data";
import { Shield, Lock } from "lucide-react";

export default function Home() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedPlatformId, setSelectedPlatformId] = useState(PLATFORMS[0].id);
  const [opacity, setOpacity] = useState(0.6);
  const [showDanger, setShowDanger] = useState(true);
  const [showSafe, setShowSafe] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const platform = PLATFORMS.find((p) => p.id === selectedPlatformId) || PLATFORMS[0];

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
  }, []);

  const handleRemove = useCallback(() => {
    setImage(null);
    setFile(null);
  }, []);

  const getCanvas = useCallback(() => {
    const container = canvasContainerRef.current;
    if (!container) return null;
    const el = container.querySelector("canvas");
    return el;
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Safe Zone Checker
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/about"
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              About
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-neutral-100 bg-white px-4 py-8 text-center dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
          Social Media Safe Zone Checker
        </h1>
        <p className="mx-auto max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
          Upload your thumbnail or cover image. See exactly what gets covered by
          platform UI before you post.
        </p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
          <Lock className="h-3 w-3" />
          All processing happens in your browser. Your images never leave your
          device.
        </p>
      </section>

      {/* Main Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-6 dark:bg-neutral-950">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Left: Control Panel */}
          <aside className="space-y-5">
            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <ImageUploader
                onImageLoad={handleImageLoad}
                onRemove={handleRemove}
                currentFile={file}
              />
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <PlatformSelector
                platforms={PLATFORMS}
                selectedId={selectedPlatformId}
                onSelect={setSelectedPlatformId}
              />
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <OverlayControls
                opacity={opacity}
                onOpacityChange={setOpacity}
                showDanger={showDanger}
                onShowDangerChange={setShowDanger}
                showSafe={showSafe}
                onShowSafeChange={setShowSafe}
                showGrid={showGrid}
                onShowGridChange={setShowGrid}
              />
            </div>

            <ActionButtons image={image} platform={platform} getCanvas={getCanvas} />
          </aside>

          {/* Right: Canvas Preview */}
          <div className="space-y-6">
            <div ref={canvasContainerRef}>
              <CanvasPreview
                image={image}
                platform={platform}
                options={{
                  showDanger,
                  showSafe,
                  showGrid,
                  opacity,
                }}
              />
            </div>

            {/* Zone Info */}
            <SafeZoneInfo platform={platform} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-4 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950">
        <p>
          Safe Zone Checker — Free tool for content creators. No data collection.
          No cookies. No tracking.
        </p>
        <p className="mt-1">
          Overlay positions are approximate and based on platform UI as of 2026.
          Always verify on a real device.
        </p>
      </footer>
    </div>
  );
}
