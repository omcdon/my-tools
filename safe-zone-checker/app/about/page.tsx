import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Social Media Safe Zone Checker",
  description:
    "Learn how the Safe Zone Checker works and why it matters for your social media thumbnails and cover images.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100"
          >
            <svg
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Safe Zone Checker
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          About Safe Zone Checker
        </h1>

        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <div className="space-y-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                How It Works
              </h2>
              <p>
                This tool overlays approximate UI layouts from popular social media
                platforms onto your uploaded image. The colored zones show where
                platform elements (buttons, text, navigation) will appear on top of
                your content.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>
                  <strong className="text-red-600">Red zones</strong> are areas that
                  will be covered by platform UI
                </li>
                <li>
                  <strong className="text-green-600">Green zone</strong> is the
                  recommended safe area for text and key visuals
                </li>
                <li>
                  <strong className="text-neutral-600">Grid lines</strong> help with
                  rule-of-thirds composition
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950">
              <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Privacy
              </h2>
              <p>
                Your images are processed entirely in your browser using the HTML5
                Canvas API. Nothing is uploaded to any server. No data is collected,
                no cookies are set, and no tracking is used.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950">
              <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Accuracy Disclaimer
              </h2>
              <p>
                This tool overlays approximate UI layouts based on current platform
                designs (2026). Social media platforms update their UI frequently
                — the safe zones shown are estimates based on typical layouts. Always
                double-check your thumbnails and covers on a real device before
                publishing.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Supported Platforms
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  "YouTube Thumbnail",
                  "TikTok Cover",
                  "Instagram Post",
                  "Instagram Story",
                  "X / Twitter Card",
                  "Facebook Cover",
                  "LinkedIn Article",
                  "YouTube Shorts",
                ].map((name) => (
                  <div
                    key={name}
                    className="rounded-lg bg-neutral-50 px-3 py-2 text-center text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 text-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                &larr; Back to Checker
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
