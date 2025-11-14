import OpenAI from 'openai'

export async function generateThumbnail(topic: string, script: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn('OPENAI_API_KEY not configured, returning mock thumbnail')
    return 'https://via.placeholder.com/1280x720/FF0000/FFFFFF?text=' + encodeURIComponent(topic)
  }

  try {
    const openai = new OpenAI({ apiKey })

    // Generate thumbnail using DALL-E
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Create a vibrant, eye-catching YouTube thumbnail for a viral Short about: ${topic}.

      Style: Bold colors, high contrast, dramatic lighting
      Include: Large bold text overlay space
      Aspect ratio: 16:9
      Emotion: Exciting, shocking, curiosity-inducing
      No text in image (text will be added separately)`,
      n: 1,
      size: '1792x1024',
      quality: 'standard'
    })

    return response.data?.[0]?.url || 'https://via.placeholder.com/1280x720'
  } catch (error) {
    console.error('Error generating thumbnail:', error)
    // Return a basic placeholder
    return 'https://via.placeholder.com/1280x720/FF0000/FFFFFF?text=' + encodeURIComponent(topic)
  }
}
