"use client";

import { PlatformZone } from "@/lib/platform-data";
import { AlertTriangle, Shield, Lightbulb } from "lucide-react";

interface SafeZoneInfoProps {
  platform: PlatformZone;
}

export function SafeZoneInfo({ platform }: SafeZoneInfoProps) {
  return (
    <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {platform.name} — Safe Zone Guide
      </h3>

      {/* Danger Zones */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
            Danger Zones
          </span>
        </div>
        {platform.dangerZones.map((zone) => (
          <div
            key={zone.id}
            className="ml-6 flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-red-400" />
            <span>
              <strong>{zone.label}</strong> — covers{" "}
              {Math.round(zone.w * 100)}% x {Math.round(zone.h * 100)}% of the image
            </span>
          </div>
        ))}
      </div>

      {/* Safe Zone */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
            Safe Zone
          </span>
        </div>
        <div className="ml-6 text-sm text-neutral-600 dark:text-neutral-400">
          <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-green-400 mr-2" />
          Place your title and key text within the green dashed area:
          <br />
          <span className="font-mono text-xs text-neutral-500">
            {Math.round(platform.safeTextZone.x * 100)}%–
            {Math.round((platform.safeTextZone.x + platform.safeTextZone.w) * 100)}% wide, {" "}
            {Math.round(platform.safeTextZone.y * 100)}%–
            {Math.round((platform.safeTextZone.y + platform.safeTextZone.h) * 100)}% tall
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
            Tips
          </span>
        </div>
        {platform.tips.map((tip, i) => (
          <div
            key={i}
            className="ml-6 flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            <span className="mt-0.5 text-amber-400">*</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
