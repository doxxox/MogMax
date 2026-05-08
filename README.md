# MOG ARENA // PRODUCTION-GRADE AI FACE BATTLE PLATFORM

![Version](https://img.shields.io/badge/VERSION-1.0.0-3B82F6?style=for-the-badge)
![Status](https://img.shields.io/badge/STATUS-DEPLOY_READY-22C55E?style=for-the-badge)

## 🚀 OVERVIEW
Mog Arena is a hyper-competitive AI face battle platform. Strangers face off in live webcam matches, analyzed in realtime by our biometric AI system to determine who "mogs" who.

## 🛠 TECH STACK
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **AI Core**: MediaPipe Face Mesh, TensorFlow.js
- **Backend**: Socket.IO, WebRTC, Supabase (PostgreSQL)
- **Community**: Discord.js Ecosystem

## 📦 SETUP INSTRUCTIONS

### 1. PREREQUISITES
- Node.js 20+
- Supabase Account
- Discord Developer Portal App

### 2. INSTALLATION
```bash
# Install root dependencies
npm install

# Install bot dependencies
cd bot
npm install
cd ..
```

### 3. ENVIRONMENT VARIABLES
Copy `.env.example` to `.env` and fill in your credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DISCORD_CLIENT_ID`
- `DISCORD_BOT_TOKEN`

### 4. DATABASE SETUP
Run the SQL found in `supabase/schema.sql` in your Supabase SQL Editor.

### 5. RUNNING LOCALLY
```bash
# Start the web app
npm run dev

# Start the Discord bot (in separate terminal)
cd bot
npm run start
```

## 🎮 DISCORD BOT COMMANDS
- `/profile`: View your arena stats
- `/leaderboard`: View global rankings
- `/set-elo [user] [amount]`: (Admin Only) Adjust user ELO

## 🚢 DEPLOYMENT
1. Push to GitHub.
2. Connect to **Vercel**.
3. Add environment variables to Vercel project settings.
4. For the Discord Bot, host on a VPS (like Railway, DigitalOcean, or Heroku).

---
**MOG OR BE MOGGED.**
