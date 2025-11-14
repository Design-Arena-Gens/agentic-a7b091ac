# 🎬 Viral Shorts Automation Platform

Automate the entire process of creating viral short-form videos from trending topics to published content.

## Features

- 📈 **Google Trends Integration** - Automatically fetch trending topics
- 🤖 **AI Script Generation** - Claude AI generates engaging video scripts
- 🎙️ **Text-to-Speech** - ElevenLabs converts scripts to natural voiceovers
- 🎥 **Video Creation** - Opus Clip auto-edits and animates videos
- 🖼️ **Thumbnail Generation** - AI-generated eye-catching thumbnails
- ✍️ **SEO Optimization** - ChatGPT creates titles, descriptions, and tags
- 📤 **Auto Publishing** - Direct upload to YouTube with full metadata

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys

Create a `.env.local` file with your API credentials:

```env
ANTHROPIC_API_KEY=your_anthropic_key
ELEVENLABS_API_KEY=your_elevenlabs_key
OPENAI_API_KEY=your_openai_key
YOUTUBE_API_KEY=your_youtube_key
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REFRESH_TOKEN=your_refresh_token
OPUS_CLIP_API_KEY=your_opus_key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## API Keys Setup Guide

### Anthropic (Claude)
1. Sign up at https://console.anthropic.com/
2. Create an API key in Settings

### ElevenLabs
1. Sign up at https://elevenlabs.io/
2. Get your API key from Profile Settings

### OpenAI
1. Sign up at https://platform.openai.com/
2. Create an API key in API Keys section

### YouTube Data API
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Generate refresh token using OAuth playground

### Opus Clip (Optional)
1. Sign up at https://www.opus.pro/
2. Get API key from dashboard

## How It Works

1. **Fetch Trends** - Click "Refresh" to get latest trending topics from Google Trends
2. **Select Topic** - Click on a trending topic to select it
3. **Start Automation** - Hit "Start Automation" to begin the process
4. **Watch Progress** - Monitor the automation queue as your video is created
5. **Publish** - Video automatically publishes to YouTube when ready

## Architecture

- **Frontend**: Next.js 14 with React and TailwindCSS
- **Backend**: Next.js API Routes
- **AI Services**: Claude, ChatGPT, ElevenLabs, DALL-E
- **Video Processing**: Opus Clip API
- **Publishing**: YouTube Data API v3

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Deploy to Vercel:

```bash
vercel deploy --prod
```

## License

MIT
