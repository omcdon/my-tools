"use client";

import { Download, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { PlatformZone } from "@/lib/platform-data";

interface ActionButtonsProps {
  image: HTMLImageElement | null;
  platform: PlatformZone;
  getCanvas: () => HTMLCanvasElement | null;
}

export function ActionButtons({ image, platform, getCanvas }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${platform.id}-safe-zone-check.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [getCanvas, platform.id]);

  const handleCopy = useCallback(async () => {
    const info = `Platform: ${platform.name}\n\nDanger Zones:\n${platform.dangerZones.map((z) => `  - ${z.label}: ${Math.round(z.w * 100)}% x ${Math.round(z.h * 100)}%`).join("\n")}\n\nSafe Zone: ${Math.round(platform.safeTextZone.x * 100)}%–${Math.round((platform.safeTextZone.x + platform.safeTextZone.w) * 100)}% wide, ${Math.round(platform.safeTextZone.y * 100)}%–${Math.round((platform.safeTextZone.y + platform.safeTextZone.h) * 100)}% tall\n\nTips:\n${platform.tips.map((t) => `  - ${t}`).join("\n")}`;

    try {
      await navigator.clipboard.writeText(info);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = info;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [platform]);

  const disabled = !image;

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownload}
        disabled={disabled}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        <Download className="h-4 w-4" />
        Download
      </button>
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {copied ? "Copied!" : "Copy Info"}
      </button>
    </div>
  );
}
