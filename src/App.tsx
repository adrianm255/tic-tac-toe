import './App.css'
import { GameProvider } from './contexts/GameContext';
import GameWrapper from './components/GameWrapper';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <GameWrapper />
      </GameProvider>
    </div>
  )
}

export default App;
