import { NextResponse } from 'next/server'
import { createJob, updateJob } from '@/lib/jobStore'
import { generateScript } from '@/lib/scriptGenerator'
import { generateAudio } from '@/lib/audioGenerator'
import { generateSEO } from '@/lib/seoGenerator'
import { createVideo } from '@/lib/videoGenerator'
import { generateThumbnail } from '@/lib/thumbnailGenerator'
import { publishToYouTube } from '@/lib/youtubePublisher'

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // Create initial job
    const job = createJob(topic)

    // Start automation in background
    automateVideoCreation(job.id, topic).catch(error => {
      console.error('Automation error:', error)
      updateJob(job.id, {
        status: 'error',
        error: error.message
      })
    })

    return NextResponse.json({ job })
  } catch (error: any) {
    console.error('Error starting automation:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function automateVideoCreation(jobId: string, topic: string) {
  try {
    // Step 1: Generate script using Claude
    console.log(`[${jobId}] Generating script for: ${topic}`)
    const script = await generateScript(topic)
    updateJob(jobId, { status: 'script_generated', script })

    // Step 2: Generate SEO content using ChatGPT
    console.log(`[${jobId}] Generating SEO content`)
    const seo = await generateSEO(topic, script)
    updateJob(jobId, {
      seoTitle: seo.title,
      seoDescription: seo.description,
      seoTags: seo.tags
    })

    // Step 3: Generate audio using ElevenLabs
    console.log(`[${jobId}] Generating audio`)
    const audioUrl = await generateAudio(script)
    updateJob(jobId, { status: 'audio_generated', audioUrl })

    // Step 4: Create video with visuals
    console.log(`[${jobId}] Creating video`)
    const videoUrl = await createVideo(script, audioUrl, topic)
    updateJob(jobId, { status: 'video_created', videoUrl })

    // Step 5: Generate thumbnail
    console.log(`[${jobId}] Generating thumbnail`)
    const thumbnailUrl = await generateThumbnail(topic, script)
    updateJob(jobId, { thumbnailUrl })

    // Step 6: Publish to YouTube
    console.log(`[${jobId}] Publishing to YouTube`)
    await publishToYouTube({
      title: seo.title,
      description: seo.description,
      tags: seo.tags,
      videoPath: videoUrl,
      thumbnailPath: thumbnailUrl
    })
    updateJob(jobId, { status: 'published' })

    console.log(`[${jobId}] Automation completed successfully`)
  } catch (error: any) {
    console.error(`[${jobId}] Automation failed:`, error)
    throw error
  }
}
