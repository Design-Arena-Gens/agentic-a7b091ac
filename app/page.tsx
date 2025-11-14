'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface TrendingTopic {
  title: string
  traffic: string
  description: string
}

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

export default function Home() {
  const [trends, setTrends] = useState<TrendingTopic[]>([])
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<AutomationJob[]>([])
  const [selectedTrend, setSelectedTrend] = useState<string>('')

  const fetchTrends = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/trends')
      setTrends(response.data.trends)
    } catch (error) {
      console.error('Error fetching trends:', error)
    }
    setLoading(false)
  }

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs')
      setJobs(response.data.jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  useEffect(() => {
    fetchTrends()
    fetchJobs()
    const interval = setInterval(fetchJobs, 5000)
    return () => clearInterval(interval)
  }, [])

  const startAutomation = async (topic: string) => {
    try {
      const response = await axios.post('/api/automate', { topic })
      setJobs([response.data.job, ...jobs])
      setSelectedTrend('')
    } catch (error) {
      console.error('Error starting automation:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-200 text-gray-800'
      case 'script_generated': return 'bg-blue-200 text-blue-800'
      case 'audio_generated': return 'bg-purple-200 text-purple-800'
      case 'video_created': return 'bg-green-200 text-green-800'
      case 'published': return 'bg-green-500 text-white'
      case 'error': return 'bg-red-200 text-red-800'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending'
      case 'script_generated': return 'Script Ready'
      case 'audio_generated': return 'Audio Ready'
      case 'video_created': return 'Video Ready'
      case 'published': return 'Published'
      case 'error': return 'Error'
      default: return status
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🎬 Viral Shorts Automation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trending Topics Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">📈 Trending Topics</h2>
              <button
                onClick={fetchTrends}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {trends.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-8">Click refresh to fetch trending topics</p>
            )}

            <div className="space-y-3">
              {trends.map((trend, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTrend === trend.title
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedTrend(trend.title)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{trend.title}</h3>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {trend.traffic}
                    </span>
                  </div>
                  {trend.description && (
                    <p className="text-sm text-gray-600">{trend.description}</p>
                  )}
                </div>
              ))}
            </div>

            {selectedTrend && (
              <button
                onClick={() => startAutomation(selectedTrend)}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                🚀 Start Automation
              </button>
            )}
          </div>

          {/* Automation Jobs Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">⚙️ Automation Queue</h2>

            {jobs.length === 0 && (
              <p className="text-gray-500 text-center py-8">No automation jobs yet</p>
            )}

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{job.topic}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    {new Date(job.createdAt).toLocaleString()}
                  </p>

                  {job.error && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                      <p className="text-sm text-red-700">{job.error}</p>
                    </div>
                  )}

                  {job.script && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Script:</p>
                      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                        {job.script}
                      </p>
                    </div>
                  )}

                  {job.seoTitle && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">SEO Title:</p>
                      <p className="text-xs text-gray-600">{job.seoTitle}</p>
                    </div>
                  )}

                  {job.seoDescription && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Description:</p>
                      <p className="text-xs text-gray-600">{job.seoDescription}</p>
                    </div>
                  )}

                  {job.seoTags && job.seoTags.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {job.seoTags.map((tag, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.audioUrl && (
                    <div className="mb-2">
                      <audio controls className="w-full h-8">
                        <source src={job.audioUrl} type="audio/mpeg" />
                      </audio>
                    </div>
                  )}

                  {job.videoUrl && (
                    <div className="mb-2">
                      <video controls className="w-full rounded">
                        <source src={job.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  {job.thumbnailUrl && (
                    <div className="mb-2">
                      <img src={job.thumbnailUrl} alt="Thumbnail" className="w-full rounded" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configuration Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-800 mb-2">⚙️ Configuration Required</h3>
          <p className="text-sm text-yellow-700 mb-2">
            To enable full automation, configure your API keys in the environment variables:
          </p>
          <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
            <li><strong>ANTHROPIC_API_KEY</strong> - For script generation with Claude</li>
            <li><strong>ELEVENLABS_API_KEY</strong> - For text-to-speech conversion</li>
            <li><strong>OPENAI_API_KEY</strong> - For SEO optimization with ChatGPT</li>
            <li><strong>YOUTUBE_API_KEY</strong> - For publishing videos to YouTube</li>
            <li><strong>OPUS_CLIP_API_KEY</strong> (Optional) - For advanced video editing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
