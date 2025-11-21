import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, Crown, Key, Book, Gem, Droplet, Coins, Castle, Award, Code, Brain, Palette, Zap, MessageCircle, Lightbulb, Trophy, Map } from 'lucide-react';

export default function App() {
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