import OpenAI from 'openai'

interface SEOContent {
  title: string
  description: string
  tags: string[]
}

export async function generateSEO(topic: string, script: string): Promise<SEOContent> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn('OPENAI_API_KEY not configured, returning mock SEO')
    return {
      title: `${topic} - Viral Short #Shorts`,
      description: `Watch this viral video about ${topic}! You won't believe what happens next. Subscribe for more trending content! #viral #trending #shorts`,
      tags: ['viral', 'trending', 'shorts', topic.toLowerCase().replace(/\s+/g, '')]
    }
  }

  try {
    const openai = new OpenAI({ apiKey })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: `Create SEO-optimized YouTube metadata for a Short video about: ${topic}

Script: ${script}

Generate:
1. A compelling title (max 100 characters) optimized for CTR
2. A detailed description (max 5000 characters) with keywords and hashtags
3. 10-15 relevant tags

Format as JSON:
{
  "title": "...",
  "description": "...",
  "tags": ["tag1", "tag2", ...]
}`
      }],
      response_format: { type: 'json_object' }
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')
    return {
      title: result.title || `${topic} #Shorts`,
      description: result.description || `About ${topic}`,
      tags: result.tags || ['shorts', 'viral']
    }
  } catch (error) {
    console.error('Error generating SEO:', error)
    throw new Error('Failed to generate SEO content')
  }
}
