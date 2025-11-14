import Anthropic from '@anthropic-ai/sdk'

export async function generateScript(topic: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    console.warn('ANTHROPIC_API_KEY not configured, returning mock script')
    return `🔥 ${topic} - You Won't Believe This!\n\nHey everyone! Today we're diving into ${topic}.\n\nThis is absolutely mind-blowing and you need to hear this.\n\n[Hook] Did you know that ${topic} is trending right now?\n\n[Main Content] Here's what's happening: This trend is taking over the internet and everyone is talking about it.\n\n[Call to Action] Make sure to like and follow for more trending content!\n\n#viral #trending #shorts`
  }

  try {
    const anthropic = new Anthropic({ apiKey })

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Create an engaging 45-60 second script for a viral YouTube Short about: ${topic}

Requirements:
- Start with a powerful hook in the first 3 seconds
- Use simple, conversational language
- Include emotional triggers and curiosity gaps
- Format for vertical video (9:16)
- End with a strong call-to-action
- Keep it under 150 words
- Make it energetic and fast-paced
- Include strategic pauses marked with [PAUSE]

The script should be optimized for maximum retention and virality.`
      }]
    })

    const script = message.content[0].type === 'text' ? message.content[0].text : ''
    return script
  } catch (error) {
    console.error('Error generating script:', error)
    throw new Error('Failed to generate script')
  }
}
