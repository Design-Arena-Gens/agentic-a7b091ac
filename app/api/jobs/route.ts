import { NextResponse } from 'next/server'
import { getJobs } from '@/lib/jobStore'

export async function GET() {
  try {
    const jobs = getJobs()
    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
