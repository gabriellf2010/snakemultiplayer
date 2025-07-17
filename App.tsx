import React, { useState, useCallback, useRef, useEffect } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import Help from './components/Help';
import { GameState, Player, GameMode } from './types';
import AudioControls from './components/AudioControls';
import { AUDIO_URLS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [players, setPlayers] = useState<[Player, Player]>([
    { id: 1, name: 'Jogador 1', scoreHistory: [] },
    { id: 2, name: 'Jogador 2', scoreHistory: [] },
  ]);
  const [gameMode, setGameMode] = useState<GameMode>('MULTI');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);

  const bgMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const musicElement = bgMusicRef.current;
    if (musicElement) {
      musicElement.volume = volume;
      musicElement.muted = isMuted;
    }
  }, [volume, isMuted]);
  
  const handleStartGame = useCallback((player1Name: string, player2Name: string, mode: GameMode) => {
    setPlayers([
      { ...players[0], name: player1Name || 'Jogador 1' },
      { ...players[1], name: player2Name || 'Jogador 2' },
    ]);
    setGameMode(mode);
    setGameState('PLAYING');
  }, [players]);

  const handleSessionEnd = useCallback((finalScores: { player1: number; player2: number }) => {
    setPlayers(prevPlayers => {
       const newHistory1 = gameMode === 'SINGLE' ? [...prevPlayers[0].scoreHistory, finalScores.player1] : prevPlayers[0].scoreHistory;
       const newHistory2 = gameMode === 'MULTI' ? [...prevPlayers[1].scoreHistory, finalScores.player2] : prevPlayers[1].scoreHistory;

       return [
        { ...prevPlayers[0], scoreHistory: gameMode === 'SINGLE' ? [...prevPlayers[0].scoreHistory, finalScores.player1] : [...prevPlayers[0].scoreHistory, finalScores.player1] },
        { ...prevPlayers[1], scoreHistory: gameMode === 'MULTI' ? [...prevPlayers[1].scoreHistory, finalScores.player2] : prevPlayers[1].scoreHistory },
       ]
    });
    setGameState('MENU');
  }, [gameMode]);

  const handleShowHelp = useCallback(() => {
    setGameState('HELP');
  }, []);

  const handleBackToMenu = useCallback(() => {
    setGameState('MENU');
  }, []);
  
  const renderGameState = () => {
    switch(gameState) {
      case 'PLAYING':
        return <Game players={players} onSessionEnd={handleSessionEnd} gameMode={gameMode} isMuted={isMuted} volume={volume}/>;
      case 'HELP':
        return <Help onBack={handleBackToMenu} />;
      case 'MENU':
      default:
        return <Menu onStart={handleStartGame} onShowHelp={handleShowHelp} players={players} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans relative">
      <audio ref={bgMusicRef} src={AUDIO_URLS.background} loop autoPlay />
      <div className="absolute top-4 right-4 z-20">
        <AudioControls isMuted={isMuted} setIsMuted={setIsMuted} volume={volume} setVolume={setVolume} />
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-4">
          <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-500">
            Snake Multiplayer Offline
          </h1>
        </header>
        <main className="bg-gray-800/50 rounded-2xl shadow-2xl p-2 md:p-4 border border-gray-700">
          {renderGameState()}
        </main>
      </div>
    </div>
  );
};

export default App;