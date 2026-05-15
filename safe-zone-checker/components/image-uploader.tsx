"use client";

import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageLoad: (img: HTMLImageElement, file: File) => void;
  onRemove: () => void;
  currentFile: File | null;
}

export function ImageUploader({ onImageLoad, onRemove, currentFile }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 10 * 1024 * 1024) return; // 10MB

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => onImageLoad(img, file);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [onImageLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (currentFile) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Uploaded Image
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
          <ImageIcon className="h-5 w-5 text-blue-500" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {currentFile.name}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Upload Image
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
          isDragging
            ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950"
            : "border-neutral-300 bg-neutral-50 hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-600 dark:bg-neutral-800/50 dark:hover:border-blue-600 dark:hover:bg-blue-950/30"
        }`}
      >
        <Upload
          className={`mb-3 h-8 w-8 ${isDragging ? "text-blue-500" : "text-neutral-400"}`}
        />
        <p className="mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Drop image here or click to browse
        </p>
        <p className="text-xs text-neutral-500">JPG, PNG, or WebP — Max 10 MB</p>
        <input
          id="file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
