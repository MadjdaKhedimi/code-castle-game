import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, Crown, Key, Book, Gem, Droplet, Coins, Castle, Award, Code, Wand2, Brain, Palette, Zap, MessageCircle, Lightbulb, Trophy, Map } from 'lucide-react';

export default function CodeCastleGame() {
  const [scene, setScene] = useState('start');
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({ wisdom: 0, creativity: 0, skills: 0 });
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [visitedScenes, setVisitedScenes] = useState(new Set(['start']));
  const [showHint, setShowHint] = useState(false);

  const addToInventory = (item) => {
    setInventory([...inventory, item]);
    setScore(score + 10);
    checkAchievements();
  };

  const addStat = (stat, value) => {
    setStats({ ...stats, [stat]: stats[stat] + value });
    setScore(score + 5);
  };

  const checkAchievements = () => {
    const newAchievements = [];
    
    if (stats.wisdom >= 20 && !achievements.includes('Wise Scholar')) {
      newAchievements.push('Wise Scholar');
    }
    if (stats.creativity >= 20 && !achievements.includes('Creative Genius')) {
      newAchievements.push('Creative Genius');
    }
    if (stats.skills >= 25 && !achievements.includes('Master Coder')) {
      newAchievements.push('Master Coder');
    }
    if (inventory.length >= 2 && !achievements.includes('Collector')) {
      newAchievements.push('Collector');
    }
    if (visitedScenes.size >= 5 && !achievements.includes('Explorer')) {
      newAchievements.push('Explorer');
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  useEffect(() => {
    checkAchievements();
  }, [stats, inventory, visitedScenes]);

  const navigateToScene = (newScene) => {
    setScene(newScene);
    setVisitedScenes(new Set([...visitedScenes, newScene]));
    setShowHint(false);
  };

  const resetGame = () => {
    setScene('start');
    setInventory([]);
    setStats({ wisdom: 0, creativity: 0, skills: 0 });
    setScore(0);
    setAchievements([]);
    setVisitedScenes(new Set(['start']));
    setShowHint(false);
  };

  const getHint = (currentScene) => {
    const hints = {
      start: "🎯 Tip: Both paths lead to adventure, but they offer different rewards!",
      mainDoor: "📚 The library holds ancient knowledge - choose wisely between skill and wisdom!",
      garden: "🌸 The fountain grants power, but wishes can lead to victory...",
      finalChallenge: "🤔 Think about what makes a developer great - it's not just the tools!"
    };
    return hints[currentScene] || "✨ Explore and discover your own path!";
  };

  const renderScene = () => {
    switch(scene) {
      case 'start':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Castle className="w-24 h-24 mx-auto text-pink-400 mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-pink-600 mb-4">Welcome to the Code Castle! 🏰</h2>
              <p className="text-lg text-gray-700 mb-6">
                You're a developer on a quest to find the legendary <span className="text-yellow-500 font-bold">Golden Algorithm</span> 👑
              </p>
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">You stand before a magnificent castle. The entrance is adorned with glowing crystals and blooming flowers. What path will you choose?</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                  <Map className="w-4 h-4" />
                  <span>Your choices shape your journey!</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigateToScene('mainDoor')}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Book className="w-6 h-6" />
                Enter through the Main Door
              </button>
              <button
                onClick={() => navigateToScene('garden')}
                className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-6 h-6" />
                Take the Garden Path
              </button>
            </div>
          </div>
        );

      case 'mainDoor':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Book className="w-20 h-20 mx-auto text-purple-500 mb-4" />
              <h2 className="text-2xl font-bold text-purple-600 mb-4">The Grand Library 📚</h2>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800">You walk through the main door and find yourself in a grand library filled with ancient coding books! The air smells of old paper and magic. Two items catch your eye...</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  addToInventory('Silver Key 🔑');
                  addStat('skills', 15);
                  navigateToScene('pythonBook');
                }}
                className="bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Code className="w-6 h-6" />
                Read the Python Book
              </button>
              <button
                onClick={() => {
                  addStat('wisdom', 10);
                  navigateToScene('crystalBall');
                }}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Gem className="w-6 h-6" />
                Examine the Crystal Ball
              </button>
            </div>
          </div>
        );

      case 'pythonBook':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Key className="w-20 h-20 mx-auto text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Python Mastery! 🐍</h2>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">Great choice! You learned a powerful spell:</p>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm mb-4 text-left overflow-x-auto">
{`def unlock_secret():
    return "✨ You found a key! ✨"`}
                </pre>
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-bold">🎉 You obtained: Silver Key 🔑</p>
                  <p className="text-yellow-800">+15 Skills!</p>
                </div>
                <p className="text-gray-800">The key glows with magical energy. It might unlock something important later...</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigateToScene('secretDoor')}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Key className="w-6 h-6" />
                Use the Silver Key on a Mysterious Door
              </button>
              <button
                onClick={() => navigateToScene('start')}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Return to Castle Entrance
              </button>
            </div>
          </div>
        );

      case 'crystalBall':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Gem className="w-20 h-20 mx-auto text-purple-500 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Vision of the Future 🔮</h2>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">The crystal ball glows and shows you visions of the future! You see yourself mastering Machine Learning and AI! 🤖✨</p>
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4 mb-4">
                  <p className="text-purple-800 font-bold">🧙‍♀️ You gained +10 Wisdom!</p>
                  <p className="text-purple-700 text-sm mt-2">The wisdom of ages flows through you...</p>
                </div>
                <p className="text-gray-800">The crystal ball whispers: "Seek the garden where inspiration blooms..." 🌸</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigateToScene('garden')}
                className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-6 h-6" />
                Follow the Vision to the Garden
              </button>
              <button
                onClick={() => navigateToScene('start')}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Return to Castle Entrance
              </button>
            </div>
          </div>
        );

      case 'garden':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-20 h-20 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-4">The Enchanted Garden 🌸</h2>
              <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">You walk through a beautiful garden full of magical flowers and butterflies! ✨ In the center, you find a glowing fountain with sparkling water. 🌸⛲</p>
                <p className="text-gray-800 italic">"Choose wisely, young developer..." whispers the fountain.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  addStat('creativity', 15);
                  addStat('skills', 10);
                  navigateToScene('drinkFountain');
                }}
                className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Droplet className="w-6 h-6" />
                Drink from the Fountain
              </button>
              <button
                onClick={() => {
                  addToInventory('Golden Algorithm 👑');
                  navigateToScene('goldenAlgorithm');
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Coins className="w-6 h-6" />
                Toss a Coin and Make a Wish
              </button>
            </div>
          </div>
        );

      case 'drinkFountain':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Droplet className="w-20 h-20 mx-auto text-cyan-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-cyan-600 mb-4">Fountain of Inspiration! 💧</h2>
              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">The water tastes like pure inspiration! ✨ You feel energy flowing through you!</p>
                <div className="bg-cyan-100 border-2 border-cyan-400 rounded-lg p-4 mb-4 space-y-2">
                  <p className="text-cyan-800 font-bold">🎨 You gained Creative Vision +15!</p>
                  <p className="text-cyan-800 font-bold">💡 You gained Problem-Solving Skills +10!</p>
                  <p className="text-cyan-800 font-bold">🌈 Your Design Aesthetics improved!</p>
                </div>
                <p className="text-gray-800 mb-4">You feel ready to tackle any coding challenge! 💪</p>
                <p className="text-gray-700 italic">But wait... there's one more challenge ahead!</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigateToScene('finalChallenge')}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Zap className="w-6 h-6" />
                Face the Final Challenge
              </button>
              <button
                onClick={() => navigateToScene('start')}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Return to Castle Entrance
              </button>
            </div>
          </div>
        );

      case 'secretDoor':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Key className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">The Secret Chamber! 🗝️</h2>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">You use the Silver Key and unlock a hidden door! Inside, you find a chamber filled with ancient scrolls of legendary code! 📜✨</p>
                <div className="bg-orange-100 border-2 border-orange-400 rounded-lg p-4 mb-4">
                  <p className="text-orange-800 font-bold">📜 You discovered Ancient Coding Secrets!</p>
                  <p className="text-orange-700 text-sm mt-2">Knowledge of algorithms and data structures floods your mind!</p>
                </div>
                <p className="text-gray-800">One scroll glows brighter than the others... it leads to the final test!</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigateToScene('finalChallenge')}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Star className="w-6 h-6" />
                Read the Glowing Scroll
              </button>
            </div>
          </div>
        );

      case 'finalChallenge':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="w-20 h-20 mx-auto text-purple-500 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-purple-600 mb-4">The Final Challenge! 🧩</h2>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">A magical guardian appears! "To claim the Golden Algorithm, answer this riddle:"</p>
                <div className="bg-white border-2 border-purple-400 rounded-lg p-4 mb-4">
                  <p className="text-purple-800 font-bold italic">"I am always learning, never perfect, but constantly improving. What am I?"</p>
                </div>
                {showHint && (
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 mb-4">
                    <p className="text-blue-800 text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      {getHint('finalChallenge')}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  addToInventory('Golden Algorithm 👑');
                  navigateToScene('goldenAlgorithm');
                }}
                className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Code className="w-6 h-6" />
                A Developer!
              </button>
              <button
                onClick={() => navigateToScene('wrongAnswer')}
                className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                An Algorithm
              </button>
            </div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          </div>
        );

      case 'wrongAnswer':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-20 h-20 mx-auto text-gray-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Not Quite... 💭</h2>
              <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4">The guardian smiles kindly. "Close, but remember - the algorithm is the tool, but YOU are the one who grows and learns!"</p>
                <p className="text-gray-700 italic">"Try again, brave developer!"</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigateToScene('finalChallenge')}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        );

      case 'goldenAlgorithm':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Crown className="w-24 h-24 mx-auto text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-yellow-600 mb-4">🎉 CONGRATULATIONS! 🎉</h2>
              <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-6 rounded-lg mb-6">
                <p className="text-gray-800 mb-4 text-xl">You found the <span className="text-yellow-600 font-bold">Golden Algorithm</span>! 👑✨</p>
                <pre className="bg-gray-800 text-yellow-400 p-4 rounded-lg text-sm mb-4 text-left overflow-x-auto">
{`function goldenAlgorithm() {
    return "🌟 Success! You've mastered" +
           " the art of elegant code! 🌟";
}`}
                </pre>
                <div className="bg-pink-100 border-2 border-pink-400 rounded-lg p-4 mb-4">
                  <p className="text-pink-800 font-bold text-lg">🏆 VICTORY! 🏆</p>
                  <p className="text-pink-700">You've proven yourself as a true developer!</p>
                  <p className="text-pink-600 text-sm mt-2">Final Score: {score} points</p>
                </div>
                <p className="text-gray-800 mb-4">
                  The castle celebrates your achievement! Flowers bloom, crystals glow, and magical sparkles fill the air! ✨🌸💖
                </p>
                <p className="text-gray-700 italic">
                  "Remember," says the guardian, "the real treasure was the knowledge and skills you gained along the way!"
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-6 h-6" />
                Play Again
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Code Castle Adventure ✨
              </h1>
              <p className="text-gray-600 mt-1">An interactive coding quest!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-lg border-2 border-yellow-400">
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold text-yellow-600">{score}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-800">Wisdom</span>
              </div>
              <div className="bg-purple-300 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-purple-600 h-full transition-all duration-500"
                  style={{ width: `${Math.min(stats.wisdom * 2, 100)}%` }}
                />
              </div>
              <p className="text-right text-sm text-purple-700 mt-1">{stats.wisdom}</p>
            </div>
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-pink-600" />
                <span className="font-bold text-pink-800">Creativity</span>
              </div>
              <div className="bg-pink-300 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-pink-600 h-full transition-all duration-500"
                  style={{ width: `${Math.min(stats.creativity * 2, 100)}%` }}
                />
              </div>
              <p className="text-right text-sm text-pink-700 mt-1">{stats.creativity}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">Skills</span>
              </div>
              <div className="bg-blue-300 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${Math.min(stats.skills * 2, 100)}%` }}
                />
              </div>
              <p className="text-right text-sm text-blue-700 mt-1">{stats.skills}</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800">Achievements Unlocked</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 px-4 py-2 rounded-lg text-purple-800 font-semibold flex items-center gap-2 animate-pulse"
                >
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Inventory */}
        {inventory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800">Inventory</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {inventory.map((item, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 px-4 py-2 rounded-lg text-yellow-800 font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Game Scene */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {renderScene()}
        </div>

        {/* Game Info */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-bold text-gray-800">Game Progress</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Scenes Explored</p>
              <p className="text-2xl font-bold text-purple-600">{visitedScenes.size}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Items Found</p>
              <p className="text-2xl font-bold text-orange-600">{inventory.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Stats</p>
              <p className="text-2xl font-bold text-teal-600">{stats.wisdom + stats.creativity + stats.skills}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-cyan-600">{achievements.length}/5</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by Madjda Khedimi
          </p>
          <p className="text-sm text-gray-500 mt-2">
            🎮 An interactive coding adventure • Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
}