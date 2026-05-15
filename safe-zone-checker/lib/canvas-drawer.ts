import { PlatformZone, DangerZone } from "./platform-data";

export interface DrawOptions {
  showDanger: boolean;
  showSafe: boolean;
  showGrid: boolean;
  opacity: number; // 0-1
}

function adjustOpacity(color: string, opacity: number): string {
  return color.replace(/[\d.]+\)$/, `${opacity})`);
}

export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  platform: PlatformZone,
  options: DrawOptions
) {
  const canvas = ctx.canvas;
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Calculate contain dimensions
  const scale = Math.min(w / img.width, h / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const offsetX = (w - drawW) / 2;
  const offsetY = (h - drawH) / 2;

  // 1. Draw checkerboard background in image area
  const squareSize = 16;
  ctx.fillStyle = "#e5e5e5";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#d4d4d4";
  for (let x = 0; x < w; x += squareSize * 2) {
    for (let y = 0; y < h; y += squareSize * 2) {
      ctx.fillRect(x, y, squareSize, squareSize);
      ctx.fillRect(x + squareSize, y + squareSize, squareSize, squareSize);
    }
  }

  // 2. Draw user image
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

  // 3. Draw danger zones (red semi-transparent overlays)
  if (options.showDanger) {
    platform.dangerZones.forEach((zone: DangerZone) => {
      const zx = offsetX + zone.x * drawW;
      const zy = offsetY + zone.y * drawH;
      const zw = zone.w * drawW;
      const zh = zone.h * drawH;

      ctx.fillStyle = adjustOpacity(zone.color, options.opacity);
      ctx.fillRect(zx, zy, zw, zh);

      // Label background
      ctx.font = "bold 13px Inter, system-ui, sans-serif";
      const textMetrics = ctx.measureText(zone.label);
      const labelPadX = 8;
      const labelH = 20;
      const labelW = textMetrics.width + labelPadX * 2;

      ctx.fillStyle = "rgba(220, 38, 38, 0.85)";
      ctx.fillRect(zx + 4, zy + 4, labelW, labelH);

      // Label text
      ctx.fillStyle = "white";
      ctx.fillText(zone.label, zx + 4 + labelPadX, zy + 4 + 15);
    });
  }

  // 4. Draw safe zone (green dashed border)
  if (options.showSafe) {
    const sx = offsetX + platform.safeTextZone.x * drawW;
    const sy = offsetY + platform.safeTextZone.y * drawH;
    const sw = platform.safeTextZone.w * drawW;
    const sh = platform.safeTextZone.h * drawH;

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 6]);
    ctx.strokeRect(sx, sy, sw, sh);
    ctx.setLineDash([]);

    // Safe zone background
    ctx.fillStyle = "rgba(34, 197, 94, 0.05)";
    ctx.fillRect(sx, sy, sw, sh);

    // Label
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 14px Inter, system-ui, sans-serif";
    ctx.fillText("SAFE ZONE", sx + 10, sy - 8);

    // Corner markers
    const cornerLen = 16;
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

    // Top-left
    ctx.beginPath();
    ctx.moveTo(sx, sy + cornerLen);
    ctx.lineTo(sx, sy);
    ctx.lineTo(sx + cornerLen, sy);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(sx + sw - cornerLen, sy);
    ctx.lineTo(sx + sw, sy);
    ctx.lineTo(sx + sw, sy + cornerLen);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(sx, sy + sh - cornerLen);
    ctx.lineTo(sx, sy + sh);
    ctx.lineTo(sx + cornerLen, sy + sh);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(sx + sw - cornerLen, sy + sh);
    ctx.lineTo(sx + sw, sy + sh);
    ctx.lineTo(sx + sw, sy + sh - cornerLen);
    ctx.stroke();
  }

  // 5. Draw rule-of-thirds grid lines
  if (options.showGrid) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    // Vertical lines
    ctx.moveTo(offsetX + drawW / 3, offsetY);
    ctx.lineTo(offsetX + drawW / 3, offsetY + drawH);
    ctx.moveTo(offsetX + (2 * drawW) / 3, offsetY);
    ctx.lineTo(offsetX + (2 * drawW) / 3, offsetY + drawH);
    // Horizontal lines
    ctx.moveTo(offsetX, offsetY + drawH / 3);
    ctx.lineTo(offsetX + drawW, offsetY + drawH / 3);
    ctx.moveTo(offsetX, offsetY + (2 * drawH) / 3);
    ctx.lineTo(offsetX + drawW, offsetY + (2 * drawH) / 3);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
