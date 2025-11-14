interface AutomationJob {
  id: string
  topic: string
  status: 'pending' | 'script_generated' | 'audio_generated' | 'video_created' | 'published' | 'error'
  script?: string
  audioUrl?: string
  videoUrl?: string
  thumbnailUrl?: string
  seoTitle?: string
  seoDescription?: string
  seoTags?: string[]
  error?: string
  createdAt: string
}

// In-memory storage (for production, use a database)
const jobs: Map<string, AutomationJob> = new Map()

export function createJob(topic: string): AutomationJob {
  const job: AutomationJob = {
    id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    topic,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  jobs.set(job.id, job)
  return job
}

export function updateJob(jobId: string, updates: Partial<AutomationJob>) {
  const job = jobs.get(jobId)
  if (job) {
    Object.assign(job, updates)
    jobs.set(jobId, job)
  }
}

export function getJob(jobId: string): AutomationJob | undefined {
  return jobs.get(jobId)
}

export function getJobs(): AutomationJob[] {
  return Array.from(jobs.values()).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}
