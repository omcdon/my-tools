"use client";

interface OverlayControlsProps {
  opacity: number;
  onOpacityChange: (v: number) => void;
  showDanger: boolean;
  onShowDangerChange: (v: boolean) => void;
  showSafe: boolean;
  onShowSafeChange: (v: boolean) => void;
  showGrid: boolean;
  onShowGridChange: (v: boolean) => void;
}

export function OverlayControls({
  opacity,
  onOpacityChange,
  showDanger,
  onShowDangerChange,
  showSafe,
  onShowSafeChange,
  showGrid,
  onShowGridChange,
}: OverlayControlsProps) {
  return (
    <div className="space-y-4">
      {/* Opacity Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Overlay Opacity
          </label>
          <span className="text-xs font-medium text-neutral-500">{Math.round(opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min={0.2}
          max={0.9}
          step={0.05}
          value={opacity}
          onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-[10px] text-neutral-400">
          <span>20%</span>
          <span>90%</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <ToggleRow
          label="Danger Zones"
          color="red"
          checked={showDanger}
          onChange={onShowDangerChange}
        />
        <ToggleRow
          label="Safe Zones"
          color="green"
          checked={showSafe}
          onChange={onShowSafeChange}
        />
        <ToggleRow
          label="Grid Lines"
          color="blue"
          checked={showGrid}
          onChange={onShowGridChange}
        />
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  color,
  checked,
  onChange,
}: {
  label: string;
  color: "red" | "green" | "blue";
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const dotColor =
    color === "red"
      ? "bg-red-500"
      : color === "green"
      ? "bg-green-500"
      : "bg-blue-500";

  return (
    <label className="flex cursor-pointer items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotColor}`} />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
      </div>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`h-5 w-9 rounded-full transition-colors ${
            checked ? "bg-blue-500" : "bg-neutral-300 dark:bg-neutral-600"
          }`}
        >
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              checked ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
    </label>
  );
}
