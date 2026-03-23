// server/services/aiService.js
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateContent({ productName, description, brandVoice, audience, platform, includeReel, imageBase64, imageMimeType }) {
  const voiceGuide = {
    'Gen Z': 'casual, relatable, uses lowercase, emojis, "fr", "ngl", "literally", "obsessed" — like a cool friend texting',
    'Luxury': 'refined, understated, elegant — never pushy, evokes exclusivity and craftsmanship',
    'Minimal': 'clean, direct, no fluff — short sentences, confident, lets the product speak',
    'Corporate': 'professional, benefit-focused, ROI-minded, uses bullet points and strong verbs',
    'Playful': 'fun, punny, bright energy — exclamation points, alliteration, upbeat and friendly',
    'Bold': 'punchy, confident, disruptive — short sentences, strong claims, no apologies',
  };

  const systemPrompt = `You are an expert marketing copywriter for e-commerce and social media. 
Your brand voice for this task: ${voiceGuide[brandVoice] || voiceGuide['Gen Z']}.
Target audience: ${audience}.
Platform focus: ${platform}.
You must return ONLY valid JSON with exactly these keys: seo, instagram, linkedin, hashtags${includeReel ? ', reel' : ''}.
No markdown, no code blocks, no extra text — pure JSON only.`;

  const userPrompt = `Product: "${productName}"
Details: ${description || 'No additional details provided.'}

Generate marketing content in this exact JSON format:
{
  "seo": "2-3 paragraph SEO product description with natural keywords, benefits-focused, 150-200 words",
  "instagram": "Instagram caption with line breaks, emojis fitting the brand voice, CTA at end, 80-120 words",
  "linkedin": "Professional LinkedIn post, story-driven, 100-150 words, ends with a question or CTA",
  "hashtags": "20 relevant hashtags as a single space-separated string, all starting with #, mix of popular and niche"${includeReel ? `,
  "reel": "Short-form video script with HOOK (0-3s), BODY (3-20s), and CTA (20-30s) sections, formatted with labels"` : ''}
}`;

  const messages = [];

  if (imageBase64 && imageMimeType) {
    messages.push({
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: imageMimeType, data: imageBase64 },
        },
        { type: 'text', text: userPrompt },
      ],
    });
  } else {
    messages.push({ role: 'user', content: userPrompt });
  }

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1500,
    system: systemPrompt,
    messages,
  });

  const raw = response.content[0].text.trim();
  // Strip any accidental markdown fences
  const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(clean);
}

module.exports = { generateContent };
