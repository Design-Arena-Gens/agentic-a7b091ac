import axios from 'axios'

export async function generateAudio(script: string): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!apiKey) {
    console.warn('ELEVENLABS_API_KEY not configured, returning mock audio URL')
    return 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }

  try {
    // Clean script for TTS (remove formatting markers)
    const cleanScript = script
      .replace(/\[PAUSE\]/g, '...')
      .replace(/\[.*?\]/g, '')
      .replace(/#\w+/g, '')
      .trim()

    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', // Default voice ID
      {
        text: cleanScript,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    )

    // In production, save to cloud storage (S3, etc.)
    // For now, return a base64 data URL
    const audioBase64 = Buffer.from(response.data).toString('base64')
    return `data:audio/mpeg;base64,${audioBase64}`
  } catch (error) {
    console.error('Error generating audio:', error)
    throw new Error('Failed to generate audio')
  }
}
