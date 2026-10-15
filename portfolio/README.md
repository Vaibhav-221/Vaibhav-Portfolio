# Aditya Chauhan — Interactive macOS Portfolio (Next.js App Router)

A faithfully migrated, modern, high-performance web portfolio styled as an authentic macOS Sonoma desktop environment, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

### 1. macOS Sonoma Lock Screen
- Dynamic 12-hour clock, weekday, and date formatting (`Thu Jul 17`).
- Mobile quick action buttons (flashlight and camera).
- Swipe up or click anywhere to unlock with smooth macOS zoom & blur transition.

### 2. Glassmorphic Desktop & Vector Wallpaper System
- Preset wallpapers including image wallpapers (Default, Batman, Dark Scenery, 4K Space, Aesthetic), animated SVG Aurora ribbon, and modern gradient presets (Nebula, Sunset, Ocean, Forest, Candy, Volcano, Galaxy, Rose, Arctic).
- Custom wallpaper upload support via browser object URLs.
- Dynamic canvas luminance analysis that automatically flips between Dark and Light mode for optimal contrast and readability.
- Manual Light/Dark theme toggle.

### 3. macOS Top Menubar & Status Bar
- Apple logo menu with system actions (About This Mac, System Settings, Lock Screen, Log Out).
- Navigation menu dropdowns (Portfolio, Resume, About, Projects, Experience, Skills, Contact, Help).
- Status bar with live clock, Wi-Fi icon, Spotlight trigger (`⌘K`), and Control Centre.

### 4. Spotlight Search Overlay
- Instant search across portfolio sections, applications, and social links.
- Keyboard navigation with Arrow keys, Enter, and Escape.

### 5. Control Centre Panel
- Interactive toggles for Wi-Fi, Bluetooth, and Airplane Mode.
- Interactive Display Brightness and Sound Volume sliders.

### 6. Interactive Dock
- Parabolic hover magnification curve.
- Icon click bounce animation with tooltips.
- Quick navigation links (About, Projects, Resume, Experience, Skills, Contact).
- App launchers: GitHub, Gmail, LinkedIn, Instagram, Free Rider HD game, Apple Music player, Wallpaper Picker.

### 7. Vinyl Turntable Music Player Widget
- Interactive spinning vinyl disc with Seedhe Maut album art.
- Animated tonearm with rotation physics during play/pause states.
- Track controls (Play/Pause, Next, Previous).

### 8. Multi-Window Manager
- Draggable macOS application windows with boundary constraints.
- Window controls: Close, Minimize, Maximize / Restore.
- Z-index management and bring-to-front focus.
- Embedded apps: Free Rider HD solid window, Apple Music player.

### 9. Apple Music Player (`/apple-music`)
- Standalone route and windowed player.
- Playlist with 6 focus tracks with dynamic duration updates and playback states:
  1. *After Hours* — The Weeknd
  2. *Flashing Lights* — Kanye West
  3. *RED* — Seedhe Maut
  4. *Runaway* — Kanye West
  5. *Sunflower* — Post Malone & Swae Lee
  6. *The Less I Know The Better* — Tame Impala

### 10. Portfolio Sections & Modals
- **About Me**: Professional summary, background, and service specializations.
- **Projects**: Filterable showcase (Peyebouste, AyitiBook, Peelr Sticker Store, Service Management SaaS, Vulcan-Pro, Employee Management System, Vulcan Security Scanner).
- **Experience**: Timeline (SYPNOWEB Founder & CEO, ASDN Cybernetics Intern, Freelance Designer).
- **Skills**: Core expertise progress bars & technology tag cloud.
- **Resume**: Full career & academic summary with direct PDF download (`aditya-resume.pdf`).
- **Contact**: Email and location details, a validated contact form, and private callback requests for manual follow-up.

### 11. Mobile-Optimized Capsule Navigation
- Scroll-direction aware capsule bar that smoothly slides away on scroll down and reappears on scroll up.
- Touch-friendly 48px+ tap targets and zero horizontal overflow.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 & Custom Glassmorphism CSS variables
- **Fonts**: Oswald, Bubblegum Sans, Coiny, System UI (SF Pro)
- **Audio Engine**: HTML5 Audio API

## EmailJS Contact and Callback Setup

The contact form uses `EMAILJS_TEMPLATE_ID`. Callback requests use a separate EmailJS template configured with `EMAILJS_CALLBACK_TEMPLATE_ID`. Both use the same service, public key, and server-only private key. Keep `EMAILJS_PRIVATE_KEY` out of client-side code and do not prefix it with `NEXT_PUBLIC_`.

Add these values to `.env.local`:

```env
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_CALLBACK_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```

In the callback EmailJS template, set the recipient to your private inbox and use `{{reply_to}}` as the reply-to address. The request provides these dynamic variables:

- `{{subject}}`
- `{{full_name}}`
- `{{from_email}}` and `{{reply_to}}`
- `{{phone_number}}`
- `{{call_reason}}`
- `{{preferred_callback_date}}`
- `{{preferred_callback_time}}`
- `{{time_zone}}`
- `{{submitted_at}}`

Callback submissions are requests for manual follow-up, not confirmed appointments. Restart the app after changing `.env.local`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Linting
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

### 5. Start Production Server
```bash
npm run start
```
