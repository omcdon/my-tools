"use client";

import { PlatformZone } from "@/lib/platform-data";

interface PlatformSelectorProps {
  platforms: PlatformZone[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PlatformSelector({
  platforms,
  selectedId,
  onSelect,
}: PlatformSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Platform
      </label>
      <div className="grid grid-cols-2 gap-1.5">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
              selectedId === p.id
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-300"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
