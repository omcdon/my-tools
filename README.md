# Free Online Tools / 免费在线工具

Bilingual (EN/ZH) free online tools site, ready for AdSense monetization.

## Directory Structure

```
my-tools/
├── index.html          ← 工具导航首页
├── calorie/            ← 卡路里计算器
│   └── index.html
├── color/              ← 颜色转换器
│   └── index.html
└── README.md
```

## Tools

| Directory | Tool | URL |
|-----------|------|-----|
| `calorie/` | Calorie Calculator | `/calorie/` |
| `color/` | Color Converter | `/color/` |

## Features
- BMR calculation (Mifflin-St Jeor)
- TDEE with activity multiplier
- Goals: lose / maintain / gain
- Macro breakdown (carb/protein/fat)
- Metric / Imperial unit toggle
- Color picker + live preview
- HEX / RGB / HSL / CMYK / RGBA conversion
- WCAG contrast checker (AA Large / AA Normal / AAA)
- Complementary color palette generator
- EN ↔ ZH language switch (all tools)
- AdSense ad slots pre-placed

## Deploy to Vercel (static site)

1. Push `my-tools/` folder to GitHub
2. Import repo on vercel.com
3. Framework: **"Other"** (plain HTML)
4. Root directory: `./my-tools`
5. No build command needed

> Vercel auto-routes subdirectories — `index.html` in each subfolder becomes `/calorie/`, `/color/` etc.

## Custom Domain (subdomain or subpath)

### Subpath (recommended — single domain)
- Vercel Dashboard → Domains → add `tools.example.com`
- All tools under one domain: `tools.example.com/calorie/`, `tools.example.com/color/`

### Subdomain (separate per tool)
- Vercel supports multiple projects per account
- Create one project per tool: `calorie-tools/` → deploy to `calorie.example.com`
- Or use redirect rules in vercel.json

## AdSense Integration
Replace the `<div class="ad-slot ...">` placeholders with actual AdSense `<ins>` tags after approval.

## Adding New Tools
1. Create a new subdirectory under `my-tools/`, e.g. `unit/`
2. Save the tool as `unit/index.html`
3. Add a card to `my-tools/index.html` (follow existing pattern)
4. Vercel auto-deploys on push
