// pages/api/analyze.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userName, wishList } = req.body;

  // Validate input
  if (!wishList || wishList.trim().length === 0) {
    return res.status(400).json({ error: 'Wish list is required' });
  }

  if (wishList.length > 500) {
    return res.status(400).json({ error: 'Wish list too long' });
  }

  const prompt = `You are analyzing a wish list for the North Pole Records Department's Nice/Naughty system. This is a FUN, FAMILY-FRIENDLY holiday experience with clever, gentle humor.

CRITICAL SAFETY RULES:
- Keep ALL responses G-rated and wholesome
- ONLY trigger the safety response for genuinely hateful, violent, or explicit sexual content
- Everything else gets a funny, kind poem - even tricky wishes!
- Keep the tone light, silly, and festive

HANDLE THESE TRICKY WISHES WITH HUMOR (NOT safety responses):
- Family wishes (siblings, parents together, sick relatives) → gentle and sweet
- Emotional wishes (friends, loneliness, bullying) → supportive and kind
- Impossible wishes (superpowers, time travel, deceased pets) → whimsical and fun
- Heavy topics (world peace, cure cancer, end hunger) → acknowledge their big heart
- Appearance wishes (taller, prettier) → redirect to inner qualities gently
- Ridiculous greed (million dollars, own a country) → playfully mock them
- Hyperbolic phrases ("school explode", "drugs" for video games) → interpret generously
- Scary stuff (zombies, haunted houses) → lean into the fun

The person's name is: ${userName || 'Friend'}
Their wish list: "${wishList}"

YOUR TASK:
1. Give a NICE or NAUGHTY verdict (60% Nice, 40% Naughty - be playfully unpredictable)
2. Write a SHORT FUNNY POEM (4-8 lines) that WEAVES TOGETHER the specific items from their wish list
   - Must mention actual items they requested
   - Rhyming is good but not required
   - Keep it playful and light
   - Dad-joke level humor is perfect
   - Be KIND even when being funny
3. Add a brief elf recommendation (1 sentence, can be silly)

EXAMPLE STYLES:
"bike, world peace, cookies":
"A bike for speed, world peace for all,
And cookies? Well, we love your call.
The elves say you're ambitious and sweet,
Your wish list can't be beat."

"baseball bat, new sister":
"A baseball bat to swing with pride,
A sister to have by your side.
One takes practice, one takes time,
But both wishes? Pretty sublime."

"million dollars, video games, no homework":
"A million bucks and games galore,
Plus homework never? That's the score?
The elves say you dream really big—
Maybe add 'help around the house' to this gig!"

Respond ONLY with valid JSON in this exact format:
{
  "verdict": "NICE" or "NAUGHTY",
  "poem": "your short funny poem here",
  "elfRecommendation": "your brief recommendation here"
}

DO NOT include any text outside the JSON. DO NOT use markdown code blocks.`;

  try {
    // Call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        //model: "claude-sonnet-4-20250514", 
        model: "claude-haiku-4-20250514",
        max_tokens: 500,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      console.error('Anthropic API error:', response.status);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.content[0].text.trim();
    
    // Strip markdown if present
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    // Parse JSON response
    const result = JSON.parse(responseText);
    
    // Return the result
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error analyzing wish list:', error);
    
    // Return fallback response
    return res.status(200).json({
      verdict: "NICE",
      poem: "Our systems are quite busy today,\nThe elves are working, hip-hip-hooray!\nYour wishes are safe, don't you fear,\nJust try again and we'll be here.",
      elfRecommendation: "Patience is definitely on the Nice List."
    });
  }
}
