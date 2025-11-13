import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';

export default function NorthPoleRecords() {
  const [wishList, setWishList] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);

  const analyzeWishList = async () => {
    if (!wishList.trim()) return;
    
    setIsAnalyzing(true);
    
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
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await response.json();
      let responseText = data.content[0].text.trim();
      
      // DEBUG: Log the raw response
      console.log("=== RAW API RESPONSE ===");
      console.log(responseText);
      console.log("========================");
      
      // Strip markdown if present
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      console.log("=== AFTER MARKDOWN STRIP ===");
      console.log(responseText);
      console.log("============================");
      
      const result = JSON.parse(responseText);
      console.log("=== PARSED RESULT ===");
      console.log(result);
      console.log("====================");
      
      setAnalysis(result);
    } catch (error) {
      console.error("=== ANALYSIS ERROR ===");
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);
      console.error("Full error:", error);
      console.error("=====================");
      
      setAnalysis({
        verdict: "NICE",
        poem: "Our systems are quite busy today,\nThe elves are working, hip-hip-hooray!\nYour wishes are safe, don't you fear,\nJust try again and we'll be here.",
        elfRecommendation: "Patience is definitely on the Nice List."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startOver = () => {
    setWishList('');
    setAnalysis(null);
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-700 via-green-700 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
          <img src="/logo.jpg" alt="North Pole Records Dept" className="w-48 h-48 mx-auto mb-4 rounded-full" />
          <h1 className="text-3xl font-bold text-red-700 mb-2">North Pole Records Department</h1>
          <p className="text-gray-600 mb-6">Official Nice & Naughty List Processing Center</p>
          
          <div className="text-left mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your first name"
              maxLength={30}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>
          
          <button
            onClick={() => setShowNameInput(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Enter the Records Department
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-700 via-green-700 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <img src="/logo.jpg" alt="North Pole Records Dept" className="w-32 h-32 mx-auto mb-4 rounded-full" />
            <h1 className="text-4xl font-bold text-red-700 mb-2">North Pole Records Department</h1>
            <p className="text-gray-600">Official Nice & Naughty List Analysis</p>
            {userName && <p className="text-sm text-gray-500 mt-2">Welcome, {userName}!</p>}
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="text-red-600 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Submit Your Wish List</h2>
                <p className="text-sm text-gray-600">Our advanced elf technology will analyze your wishes for Nice/Naughty classification.</p>
              </div>
            </div>
            
            <textarea
              value={wishList}
              onChange={(e) => setWishList(e.target.value)}
              placeholder="Example: A new bike, world peace, unlimited cookies, help with homework..."
              maxLength={500}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 resize-none"
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {wishList.length}/500 characters
            </div>
          </div>

          <button
            onClick={analyzeWishList}
            disabled={!wishList.trim() || isAnalyzing}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="animate-spin" size={20} />
                Elves Analyzing...
              </>
            ) : (
              <>
                <FileText size={20} />
                Submit for Analysis
              </>
            )}
          </button>

          <div className="mt-6 text-center text-sm text-white">
            <p>🎄 Est. North Pole Time: {new Date().toLocaleTimeString()} 🎄</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 via-green-700 to-red-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Analysis Results */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {analysis.verdict === 'NICE' ? '⭐' : '🎭'}
            </div>
            <h2 className="text-5xl font-bold mb-2" style={{
              color: analysis.verdict === 'NICE' ? '#16a34a' : '#dc2626'
            }}>
              {analysis.verdict} LIST
            </h2>
            <p className="text-gray-600">Official Classification for {userName || 'Friend'}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <h3 className="font-bold text-gray-800 mb-2">📜 Official Analysis:</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line italic">{analysis.poem}</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-2">🧝 Elf Recommendation:</h3>
            <p className="text-gray-700 leading-relaxed">{analysis.elfRecommendation}</p>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="text-center mt-6">
          <button
            onClick={startOver}
            className="bg-white hover:bg-gray-100 text-red-700 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
          >
            📝 Submit New Wish List
          </button>
        </div>

        {/* Donation Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 text-center">
          <p className="text-gray-700 mb-4">
            ☕ Enjoyed the app? Help keep Santa's elves caffeinated!
          </p>
          <a
            href="https://ko-fi.com/northpolerecordsdept"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ☕ Buy Santa's Elves a Coffee
          </a>
          <p className="text-xs text-gray-500 mt-3">
            Your support helps cover hosting and AI costs. Thank you! 🎄
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Questions? <a href="mailto:northpolerecordsdept@gmail.com" className="text-blue-500 hover:underline">northpolerecordsdept@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
