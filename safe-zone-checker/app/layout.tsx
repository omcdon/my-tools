import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Social Media Safe Zone Checker | Thumbnail & Cover Overlay Tool",
  description:
    "Preview how YouTube, TikTok, Instagram, and X UI covers your thumbnails. Protect your text and visuals before posting. Free, private, browser-based tool.",
  keywords: [
    "safe zone checker",
    "thumbnail checker",
    "social media overlay",
    "YouTube thumbnail safe zone",
    "TikTok cover checker",
    "Instagram story safe zone",
    "cover image checker",
    "thumbnail preview",
  ],
  openGraph: {
    title: "Social Media Safe Zone Checker",
    description:
      "See exactly what gets covered by platform UI before you post your thumbnail or cover image.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Safe Zone Checker",
    description:
      "See exactly what gets covered by platform UI before you post your thumbnail or cover image.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a safe zone on social media?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A safe zone is the area of your thumbnail, cover, or profile image that remains visible and uncovered by platform UI elements such as buttons, text overlays, and navigation bars. Placing important text and visuals within the safe zone ensures your content is seen by viewers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which platforms does this tool support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "This tool supports YouTube Thumbnails (16:9), TikTok Video Covers (9:16), Instagram Posts (1:1), Instagram Stories/Reels (9:16), X/Twitter Cards (16:9), Facebook Covers (820x312), LinkedIn Article Covers (1.91:1), and YouTube Shorts (9:16).",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is my image data private?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. All image processing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded to any server. Nothing leaves your device.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How accurate are the safe zone overlays?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The overlays are based on current platform UI layouts as of 2026. Social media platforms update their designs frequently, so always double-check your thumbnails on a real device before publishing.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
