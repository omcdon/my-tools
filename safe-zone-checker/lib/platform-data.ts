export interface DangerZone {
  id: string;
  label: string;
  x: number; // 0-1, relative to width
  y: number; // 0-1, relative to height
  w: number; // 0-1
  h: number; // 0-1
  color: string; // rgba base color
}

export interface PlatformZone {
  id: string;
  name: string;
  aspectRatio: number; // width / height
  icon: string;
  dangerZones: DangerZone[];
  safeTextZone: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tips: string[];
}

export const PLATFORMS: PlatformZone[] = [
  {
    id: "youtube_thumbnail",
    name: "YouTube Thumbnail",
    aspectRatio: 16 / 9,
    icon: "youtube",
    dangerZones: [
      {
        id: "duration",
        label: "Video Duration",
        x: 0.78,
        y: 0.82,
        w: 0.20,
        h: 0.13,
        color: "rgba(0,0,0,0.7)",
      },
      {
        id: "bottom_bar",
        label: "Bottom Gradient",
        x: 0,
        y: 0.75,
        w: 1,
        h: 0.25,
        color: "rgba(0,0,0,0.4)",
      },
    ],
    safeTextZone: { x: 0.05, y: 0.10, w: 0.90, h: 0.65 },
    tips: [
      "Keep main text in the upper 60%",
      "Bottom-right is covered by duration badge",
      "YouTube adds a dark gradient at bottom",
    ],
  },
  {
    id: "tiktok_cover",
    name: "TikTok Video Cover",
    aspectRatio: 9 / 16,
    icon: "tiktok",
    dangerZones: [
      {
        id: "bottom_caption",
        label: "Username & Caption",
        x: 0,
        y: 0.78,
        w: 0.82,
        h: 0.20,
        color: "rgba(0,0,0,0.6)",
      },
      {
        id: "right_buttons",
        label: "Action Buttons",
        x: 0.82,
        y: 0.55,
        w: 0.18,
        h: 0.40,
        color: "rgba(0,0,0,0.5)",
      },
      {
        id: "top_status",
        label: "Top Status Bar",
        x: 0,
        y: 0,
        w: 1,
        h: 0.05,
        color: "rgba(0,0,0,0.3)",
      },
    ],
    safeTextZone: { x: 0.08, y: 0.15, w: 0.72, h: 0.55 },
    tips: [
      "Avoid the right 18% (like/comment/share buttons)",
      "Bottom 20% is for username and caption",
      "Center-left is safest for key text",
    ],
  },
  {
    id: "instagram_post",
    name: "Instagram Post",
    aspectRatio: 1,
    icon: "instagram",
    dangerZones: [
      {
        id: "top_nav",
        label: "Top Nav Bar",
        x: 0,
        y: 0,
        w: 1,
        h: 0.08,
        color: "rgba(0,0,0,0.3)",
      },
      {
        id: "bottom_actions",
        label: "Action Bar",
        x: 0,
        y: 0.88,
        w: 1,
        h: 0.12,
        color: "rgba(0,0,0,0.3)",
      },
    ],
    safeTextZone: { x: 0.10, y: 0.15, w: 0.80, h: 0.70 },
    tips: [
      "Center 70% is safe for text",
      "Top and bottom edges may have UI overlay in feed view",
    ],
  },
  {
    id: "instagram_story",
    name: "Instagram Story / Reels",
    aspectRatio: 9 / 16,
    icon: "instagram",
    dangerZones: [
      {
        id: "top_bar",
        label: "Story Progress & Header",
        x: 0,
        y: 0,
        w: 1,
        h: 0.10,
        color: "rgba(0,0,0,0.4)",
      },
      {
        id: "bottom_input",
        label: "Message Input",
        x: 0,
        y: 0.88,
        w: 1,
        h: 0.12,
        color: "rgba(0,0,0,0.4)",
      },
      {
        id: "right_emoji",
        label: "Reaction Panel",
        x: 0.85,
        y: 0.40,
        w: 0.15,
        h: 0.30,
        color: "rgba(0,0,0,0.3)",
      },
    ],
    safeTextZone: { x: 0.10, y: 0.18, w: 0.75, h: 0.65 },
    tips: [
      "Top 10% has progress bars",
      "Bottom 12% is message input area",
      "Keep key visuals in center 65%",
    ],
  },
  {
    id: "twitter_card",
    name: "X / Twitter Card",
    aspectRatio: 16 / 9,
    icon: "twitter",
    dangerZones: [
      {
        id: "bottom_bar",
        label: "Engagement Bar",
        x: 0,
        y: 0.82,
        w: 1,
        h: 0.18,
        color: "rgba(0,0,0,0.5)",
      },
      {
        id: "menu_btn",
        label: "More Menu",
        x: 0.90,
        y: 0.02,
        w: 0.10,
        h: 0.08,
        color: "rgba(0,0,0,0.3)",
      },
    ],
    safeTextZone: { x: 0.08, y: 0.12, w: 0.84, h: 0.65 },
    tips: [
      "Bottom 18% is covered by reply/retweet/like counts",
      "Top-right has overflow menu",
      "Place key text in upper-middle area",
    ],
  },
  {
    id: "facebook_cover",
    name: "Facebook Cover",
    aspectRatio: 820 / 312,
    icon: "facebook",
    dangerZones: [
      {
        id: "bottom_gradient",
        label: "Profile Overlay",
        x: 0,
        y: 0.55,
        w: 1,
        h: 0.45,
        color: "rgba(0,0,0,0.6)",
      },
      {
        id: "profile_pic",
        label: "Profile Picture Cutout",
        x: 0.02,
        y: 0.45,
        w: 0.25,
        h: 0.50,
        color: "rgba(255,255,255,0.3)",
      },
    ],
    safeTextZone: { x: 0.30, y: 0.10, w: 0.65, h: 0.35 },
    tips: [
      "Bottom 45% is covered by profile name and buttons",
      "Bottom-left has profile picture cutout",
      "Only top 35% is truly safe",
    ],
  },
  {
    id: "linkedin_article",
    name: "LinkedIn Article Cover",
    aspectRatio: 1200 / 627,
    icon: "linkedin",
    dangerZones: [
      {
        id: "bottom_fade",
        label: "Title Fade Overlay",
        x: 0,
        y: 0.60,
        w: 1,
        h: 0.40,
        color: "rgba(0,0,0,0.5)",
      },
    ],
    safeTextZone: { x: 0.10, y: 0.15, w: 0.80, h: 0.40 },
    tips: [
      "LinkedIn puts article title over bottom 40%",
      "Keep main visuals in upper 50%",
      "Avoid text in bottom half",
    ],
  },
  {
    id: "youtube_shorts",
    name: "YouTube Shorts",
    aspectRatio: 9 / 16,
    icon: "youtube",
    dangerZones: [
      {
        id: "bottom_title",
        label: "Title & Subtitles",
        x: 0,
        y: 0.75,
        w: 0.80,
        h: 0.22,
        color: "rgba(0,0,0,0.6)",
      },
      {
        id: "right_buttons",
        label: "Like / Sub / Share",
        x: 0.82,
        y: 0.50,
        w: 0.18,
        h: 0.45,
        color: "rgba(0,0,0,0.5)",
      },
      {
        id: "top_search",
        label: "Search / Nav",
        x: 0,
        y: 0,
        w: 1,
        h: 0.08,
        color: "rgba(0,0,0,0.3)",
      },
    ],
    safeTextZone: { x: 0.10, y: 0.15, w: 0.70, h: 0.55 },
    tips: [
      "Right side is all buttons",
      "Bottom 22% has title and subtitles",
      "Center-left is your only safe zone",
    ],
  },
];
