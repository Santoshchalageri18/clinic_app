This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
App: https://clinic-app-sepia.vercel.app/

Date: Nov 12 2025
Tool: Google PageSpeed Insights (Mobile)

Metric	        Before	- After	 -Improvement
Performance	    98	      100	    ✅ +2
Accessibility	  93	      93	      —
Best Practices	100     	100     	—
SEO	            100	      100     	—
FCP	            1.4 s   	0.8 s	  ✅ Faster
LCP	            1.7 s     1.7 s   	—
TBT	            10 ms	    0 ms	  ✅ Perfect
CLS	            0       	0     	✅ Perfect
Speed Index   	3.9 s	    0.8 s	  ✅ Much faster

Key Improvements Implemented

✅ Used next/image with WebP + AVIF for image optimization.

✅ Added dynamic imports (next/dynamic) for heavy components (Calendar, PatientList).

✅ Preloaded fonts and used font-display: swap.

✅ Removed unused JavaScript and console logs.

✅ Enabled compression & caching via Next config.

✅ Added client-side JS obfuscation (webpack-obfuscator) for production build.

✅ Moved viewport config to generate-viewport.ts (fixed metadata warnings).

✅ Added subtle animations and micro-interactions using Framer Motion.

Remaining To-Do

 Add aria-label for icon buttons to improve Accessibility (target score 100).

Attachments

📎 pagespeed-before.png / .pdf

📎 pagespeed-after.png / .pdf