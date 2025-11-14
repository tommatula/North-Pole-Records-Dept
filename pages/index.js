import React, { useState, useEffect } from 'react';
import { FileText, Sparkles } from 'lucide-react';

export default function NorthPoleRecords() {
  const [wishList, setWishList] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Animate results entrance
  useEffect(() => {
    if (analysis) {
      setTimeout(() => setShowResults(true), 100);
    } else {
      setShowResults(false);
    }
  }, [analysis]);

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
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 relative overflow-hidden">
        {/* Twinkling Stars background */}
        <div className="stars-enhanced"></div>

        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
            <div className="animate-bounce-slow mb-6">
              <img src="/logo.jpg" alt="North Pole Records Dept" className="w-48 h-48 mx-auto rounded-full shadow-xl border-4 border-red-500" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-3">
              North Pole Records Department
            </h1>
            <p className="text-gray-600 mb-8 text-lg">Official Nice & Naughty List Processing Center</p>
            
            <div className="text-left mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                What should we call you? 🎅
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowNameInput(false);
                  }
                }}
                placeholder="Your first name"
                maxLength={30}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all text-lg"
              />
            </div>
            
            <button
              onClick={() => setShowNameInput(false)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg active:scale-95 text-lg"
            >
              Enter the Records Department ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 relative overflow-hidden">
        {/* Twinkling Stars */}
        <div className="stars-enhanced"></div>

        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
            <div className="text-center mb-8">
              <img src="/logo.jpg" alt="North Pole Records Dept" className="w-32 h-32 mx-auto mb-4 rounded-full shadow-xl border-4 border-red-500" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
                North Pole Records Department
              </h1>
              <p className="text-gray-600 text-lg">Official Nice & Naughty List Analysis</p>
              {userName && <p className="text-sm text-red-600 mt-2 font-semibold">Welcome, {userName}! 🎄</p>}
            </div>

            <div className="bg-gradient-to-br from-red-50 to-green-50 border-2 border-red-200 rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="text-red-600 mt-1 flex-shrink-0" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Submit Your Wish List 📝</h2>
                  <p className="text-sm text-gray-600">Our advanced elf technology will analyze your wishes for Nice/Naughty classification.</p>
                </div>
              </div>
              
              <textarea
                value={wishList}
                onChange={(e) => setWishList(e.target.value)}
                placeholder="Example: A new bike, world peace, unlimited cookies, help with homework..."
                maxLength={500}
                rows={6}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-200 resize-none transition-all text-lg"
              />
              <div className="text-right text-sm text-gray-500 mt-2 font-medium">
                {wishList.length}/500 characters
              </div>
            </div>

            <button
              onClick={analyzeWishList}
              disabled={!wishList.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="animate-spin" size={24} />
                  <span className="animate-pulse">Elves Analyzing...</span>
                </>
              ) : (
                <>
                  <FileText size={24} />
                  Submit for Analysis
                </>
              )}
            </button>

            <div className="mt-6 text-center text-sm text-white drop-shadow-lg">
              <p>🎄 Est. North Pole Time: {new Date().toLocaleTimeString()} 🎄</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 relative overflow-hidden p-4">
      {/* Twinkling Stars */}
      <div className="stars-enhanced"></div>

      <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-700 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Analysis Results */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-6">
            <div className={`text-8xl mb-4 animate-bounce-slow ${analysis.verdict === 'NICE' ? 'filter drop-shadow-lg' : ''}`}>
              {analysis.verdict === 'NICE' ? '⭐' : '🎭'}
            </div>
            <h2 className="text-6xl font-bold mb-3 drop-shadow-lg" style={{
              color: analysis.verdict === 'NICE' ? '#16a34a' : '#dc2626'
            }}>
              {analysis.verdict} LIST
            </h2>
            <p className="text-gray-600 text-lg font-medium">Official Classification for {userName || 'Friend'}</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-4 shadow-inner border-2 border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
              <span className="text-2xl">📜</span> Official Analysis:
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line italic text-lg">{analysis.poem}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
              <span className="text-2xl">🧝</span> Elf Recommendation:
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{analysis.elfRecommendation}</p>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="text-center mt-6 mb-6">
          <button
            onClick={startOver}
            className="bg-white hover:bg-gray-50 text-red-700 font-bold py-4 px-10 rounded-xl shadow-xl transition-all transform hover:scale-110 hover:shadow-2xl active:scale-95 text-lg"
          >
            📝 Submit New Wish List
          </button>
        </div>

        {/* Donation Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 mb-6">
          <p className="text-gray-700 mb-4 text-lg font-medium">
            ☕ Enjoyed the app? Help keep Santa's elves caffeinated!
          </p>
          <a
            href="https://ko-fi.com/northpolerecordsdept"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-110 hover:shadow-xl active:scale-95 text-lg"
          >
            ☕ Buy Santa's Elves a Coffee
          </a>
          <p className="text-xs text-gray-500 mt-4">
            Your support helps cover hosting and AI costs. Thank you! 🎄
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Questions? <a href="mailto:northpolerecordsdept@gmail.com" className="text-blue-600 hover:underline font-medium">northpolerecordsdept@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
