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

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          wishList: wishList
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      
      console.log("=== ANALYSIS RESULT ===");
      console.log(result);
      console.log("======================");
      
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
