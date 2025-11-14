import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Return mock data for demonstration
  // Google Trends API can be rate-limited and requires specific configuration
  return NextResponse.json({
    trends: [
      { title: 'AI Technology Breakthrough', traffic: '500K+', description: 'Latest developments in artificial intelligence' },
      { title: 'Climate Change Summit', traffic: '300K+', description: 'World leaders meet to discuss climate action' },
      { title: 'New Space Discovery', traffic: '250K+', description: 'Scientists find potentially habitable exoplanet' },
      { title: 'Tech Industry Layoffs', traffic: '200K+', description: 'Major tech companies announce restructuring' },
      { title: 'Cryptocurrency Market Update', traffic: '180K+', description: 'Bitcoin reaches new milestone' },
      { title: 'Electric Vehicle Innovation', traffic: '150K+', description: 'New battery technology revolutionizes EVs' },
      { title: 'Social Media Platform Update', traffic: '120K+', description: 'Major changes to popular social network' },
      { title: 'Gaming Industry News', traffic: '100K+', description: 'Highly anticipated game release announced' },
    ]
  })
}
